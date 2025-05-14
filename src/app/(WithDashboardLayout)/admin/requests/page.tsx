"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { getAllRentalRequests } from "@/services/TenantService";

type Request = {
  _id: string;
  rentalHouseId: {
    _id: string;
    title: string;
  };
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
      !r.rentalHouseId?.title
        .toLowerCase()
        .includes(houseTitleFilter.toLowerCase())
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
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* ============ MOBILE CARDS ============ */}
      <div className="space-y-4 sm:hidden">
        {filtered.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">
                  House: {request.rentalHouseId?.title || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Tenant: {request.tenantId.email || "N/A"}
                </p>
              </div>
              <Link href={`/admin/requests/${request._id}`}>
                <Button size="sm">View</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <strong>Move In:</strong>{" "}
                {new Date(request.moveInDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Duration:</strong> {request.rentalDuration}
              </div>
              <div className="col-span-2">
                <strong>Message:</strong> {request.message}
              </div>
              <div>
                <strong>Phone:</strong> {request.phone}
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    request.status === "Approved"
                      ? "outline"
                      : request.status === "Pending"
                      ? "default"
                      : "destructive"
                  }
                >
                  {request.status}
                </Badge>
                <Badge
                  variant={
                    request.paymentStatus === "Paid"
                      ? "outline"
                      : request.paymentStatus === "Pending"
                      ? "default"
                      : "destructive"
                  }
                >
                  {request.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============ DESKTOP TABLE ============ */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                House Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Move In Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rental Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.rentalHouseId?.title || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.tenantId.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(request.moveInDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.rentalDuration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.phone || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "outline"
                        : request.status === "Pending"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {request.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      request.paymentStatus === "Paid"
                        ? "outline"
                        : request.paymentStatus === "Pending"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {request.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "request" : "requests"}
      </div>
    </div>
  );
}
