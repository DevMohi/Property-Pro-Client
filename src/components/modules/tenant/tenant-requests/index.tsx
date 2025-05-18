"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { getMyRentalRequests, paymentInitiate } from "@/services/TenantService";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";
import { useSearchParams } from "next/navigation";

type Request = {
  _id: string;
  rentalHouseId: {
    _id: string;
    title: string;
    location: string;
    description: string;
    rent: string;
    imageUrls: string[];
  };
  message: string;
  status: string;
  phone: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  createdAt: string;
};

export default function MyRequestsPage() {
  const { setIsLoading } = useUser();
  const params = useSearchParams();
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "2";

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getMyRentalRequests(pageParam, limitParam);
        setRequests(res.data || []);
        setTotalPage(res.meta.totalPage);
      } catch (err) {
        console.error("Error fetching rental requests:", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [pageParam, limitParam, setIsLoading]);

  const handleSubmit = async (rentalRequestId: string) => {
    try {
      const response = await paymentInitiate({ rentalRequestId });
      if (response?.data) window.open(response.data, "_blank");
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to initiate payment.");
    }
  };

  if (loading) {
    return <p className="text-center py-12">Loading requests…</p>;
  }
  if (!requests.length) {
    return <p className="text-center py-12">No requests available</p>;
  }

  return (
    <div className="px-4 md:p-6 lg:p-8">
      {requests.map((r) => {
        const p = r.rentalHouseId;
        return (
          <div
            key={r._id}
            className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden mb-6"
          >
            <div className="w-full md:w-60 h-48 md:h-auto">
              <Image
                src={(p.imageUrls?.[0] || "/placeholder.png").trim()}
                alt={p.title}
                width={240}
                height={180}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-between p-4 flex-1">
              <div className="space-y-2">
                <h2 className="text-lg md:text-xl font-bold">{p.title}</h2>
                <p className="text-xs md:text-sm text-gray-600">{p.location}</p>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
                  {p.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Rent:</strong> ${p.rent}
                  </p>
                  <p className="col-span-2">
                    <strong>Message:</strong> {r.message}
                  </p>
                  <p className="col-span-2">
                    <strong>Status:</strong> {r.status}
                  </p>
                  <p className="col-span-2">
                    <strong>Phone:</strong> {r.phone || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                {r.paymentStatus && (
                  <div
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      r.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : r.paymentStatus === "Pending"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Payment: {r.paymentStatus}
                  </div>
                )}
                <Button
                  size="sm"
                  disabled={
                    r.status !== "Approved" || r.paymentStatus === "Paid"
                  }
                  onClick={() => handleSubmit(r._id)}
                >
                  {r.paymentStatus === "Paid" ? "Paid" : "Pay Now"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 flex justify-end text-sm text-gray-500">
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
}
