// app/admin/requests/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getAllRentalRequests } from "@/services/TenantService";
import Link from "next/link";

// Update types
type Request = {
  _id: string;
  rentalHouseId: {
    _id: string;
    location: string;
    title: string;
  } | null;
  tenantId: {
    email: string;
  };
  moveInDate: string;
  rentalDuration: string;
  message: string;
  phone: string;
  status: "Pending" | "Approved" | "Rejected";
  paymentStatus: "Paid" | "Pending" | "Failed";
  createdAt: string;
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useUser();

  // filter state
  const [houseTitleFilter, setHouseTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getAllRentalRequests();
        const data: Request[] = res.data ?? res;
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRequests(data);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [setIsLoading]);

  if (loading) {
    return <p className="p-6 text-center">Loading requests…</p>;
  }

  // apply filters
  const filtered = requests.filter((r) => {
    if (
      houseTitleFilter &&
      (!r.rentalHouseId?.title ||
        !r.rentalHouseId?.title.includes(houseTitleFilter))
    )
      return false;
    if (
      locationFilter &&
      (!r.rentalHouseId ||
        !r.rentalHouseId.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase()))
    )
      return false;
    if (
      emailFilter &&
      !r.tenantId.email.toLowerCase().includes(emailFilter.toLowerCase())
    )
      return false;
    if (statusFilter && r.status !== statusFilter) return false;
    if (paymentStatusFilter && r.paymentStatus !== paymentStatusFilter)
      return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rental Requests</h1>

      {/* ============ FILTER BAR ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="House Title"
          value={houseTitleFilter}
          onChange={(e) => setHouseTitleFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Tenant Email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* ============ REQUESTS LIST ============ */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req._id}
            className="border rounded p-4 shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <p>
                <strong>House Title:</strong>{" "}
                {req.rentalHouseId?.title || "N/A"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {req.rentalHouseId?.location || "N/A"}
              </p>
              <p>
                <strong>Tenant Email:</strong> {req.tenantId.email}
              </p>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
              <p>
                <strong>Payment:</strong> {req.paymentStatus}
              </p>
            </div>

            {/* View Property Button */}
            <div>
              {req.rentalHouseId?._id && (
                <Link
                  href={`/listings/${req.rentalHouseId._id}`}
                  className="bg-blue-600 text-white  px-2 py-2 text-sm rounded transition"
                >
                  View Property
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
