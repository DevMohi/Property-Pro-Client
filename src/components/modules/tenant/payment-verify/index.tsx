"use client";

import React, { useState, useEffect } from "react";
import { getMyOrders, paymentInitiate } from "@/services/TenantService";

const PaymentVerificationPage = () => {
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [isPaying, setIsPaying] = useState<boolean>(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getMyOrders();
        setOrdersData(orders?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle retry payment
  const handleRetryPayment = async (order: any) => {
    if (!order?.rentalRequestId) {
      alert("Missing tenant request ID.");
      return;
    }

    try {
      setIsPaying(true);
      const paymentResponse = await paymentInitiate({
        rentalRequestId: order.rentalRequestId,
      });
      if (paymentResponse?.data) {
        window.open(paymentResponse.data, "_blank");
      }
    } catch (error) {
      console.error("Failed to resume payment", error);
      alert("Failed to resume payment.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Payments</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Previous Orders
        </h2>

        {ordersData.length > 0 ? (
          <div className="space-y-6">
            {ordersData.map((order: any) => {
              console.log("Order", ordersData);
              const isPaid = order.status === "Paid";
              const bankStatus = order.transaction?.bank_status;

              return (
                <div
                  key={order._id}
                  className="flex justify-between items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Property : {order.rentalHouseId?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Location : {order.rentalHouseId?.location}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      Owner : {order.landlordId?.name}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Rent:</strong> ${order.amount}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          isPaid
                            ? "bg-green-100 text-green-700"
                            : bankStatus === "Cancel"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Paid at:</strong>{" "}
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Transaction ID:</strong> {order.transaction?.id}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Method:</strong> {order.transaction?.method}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Bank Status:</strong>{" "}
                      {order.transaction?.bank_status}
                    </p>
                  </div>

                  {order.status !== "Paid" && (
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleRetryPayment(order)}
                        disabled={isPaying}
                        className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg"
                      >
                        {order.status === "Cancelled"
                          ? "Retry Payment"
                          : order.status === "Pending"
                          ? "Resume Payment"
                          : "Complete Payment"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">No previous payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentVerificationPage;
