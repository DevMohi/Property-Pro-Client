"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getMyRentalRequests } from "@/services/TenantService";

// Import the server-side function to get rental requests

const MyRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isPaying, setIsPaying] = useState(false); // Payment state

  // Fetch rental requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyRentalRequests();
        console.log("Inside tenant", data);
        setRequests(data?.data || []);
      } catch (error) {
        console.error("Error fetching rental requests:", error);
        // Handle any error from the server
      } finally {
        setIsLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchRequests();
  }, []);

  // Handle payment button click
  const handleSubmit = async (tenantRequestId: string) => {
    console.log(tenantRequestId);
    try {
      setIsPaying(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payment/initiate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tenantRequestId }),
        }
      );
      const paymentLink = await response.json();
      if (paymentLink?.data) {
        window.open(paymentLink?.data, "_blank"); // Open payment URL
      }
    } catch (error) {
      alert("Payment initiation failed");
      console.error("Payment initiation failed", error);
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 lg:gap-8">
      {requests?.map((request: any) => {
        const product = request?.rentalHouseId;

        return (
          <div
            key={request._id}
            className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden w-full"
          >
            {/* Image Section - Full width on mobile, fixed width on larger screens */}
            <div className="w-full md:w-60 h-48 md:h-auto">
              <Image
                src={(product?.imageUrls?.[0] || "/placeholder.png").trim()}
                alt="Property"
                width={240}
                height={180}
                className="object-cover h-full w-full"
                priority={false}
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-4 flex-1">
              <div className="space-y-2">
                <h2 className="text-lg md:text-xl font-bold">
                  {product?.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600">
                  {product?.location}
                </p>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
                  {product?.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Rent:</strong> ${product?.rent}
                  </p>
                  <p className="col-span-2">
                    <strong>Message:</strong> {request.message}
                  </p>
                  <p className="col-span-2">
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p className="col-span-2">
                    <strong>Phone:</strong> {request.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* Payment Status and Button Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                {request?.paymentStatus && (
                  <div
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      request.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : request.paymentStatus === "Pending"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Payment: {request.paymentStatus}
                  </div>
                )}

                <div className="">
                  <Button
                    className="w-full sm:w-auto"
                    disabled={
                      request?.status !== "Approved" ||
                      isPaying ||
                      request.paymentStatus === "Paid"
                    }
                    onClick={() => handleSubmit(request._id)}
                    size="sm"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyRequestsPage;
