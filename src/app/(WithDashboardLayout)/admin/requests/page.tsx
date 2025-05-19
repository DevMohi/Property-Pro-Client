"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { getAllRentalRequests } from "@/services/TenantService";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";
import { useSearchParams } from "next/navigation";

type Request = {
  _id: string;
  rentalHouseId: { _id: string; title: string };
  tenantId: { email: string };
  moveInDate: string;
  rentalDuration: string;
  message: string;
  phone: string;
  status: "Pending" | "Approved" | "Rejected";
  paymentStatus: "Paid" | "Pending" | "Failed";
  createdAt: string;
};

export default function AdminRequestsPage() {
  const { setIsLoading } = useUser();
  const params = useSearchParams();
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "5";

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter states
  const [houseFilter, setHouseFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setIsLoading(true);

        const res = await getAllRentalRequests(pageParam, limitParam);
        // sort newest first
        const sorted = res.data.sort(
          (a: Request, b: Request) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRequests(sorted);
        setTotalPage(res.meta.totalPage);
        setTotalCount(res.meta.total);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [pageParam, limitParam, setIsLoading]);

  if (loading) {
    return <p className="p-6 text-center">Loading requests…</p>;
  }
  if (!requests.length) {
    return <p className="p-6 text-center">No requests available</p>;
  }

  const filtered = requests.filter((r) => {
    if (
      houseFilter &&
      !r.rentalHouseId.title.toLowerCase().includes(houseFilter.toLowerCase())
    )
      return false;
    if (
      emailFilter &&
      !r.tenantId.email.toLowerCase().includes(emailFilter.toLowerCase())
    )
      return false;
    if (statusFilter && r.status !== statusFilter) return false;
    if (paymentFilter && r.paymentStatus !== paymentFilter) return false;
    return true;
  });

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Rental Requests</h1>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="House Title"
          className="border px-3 py-2 rounded"
          value={houseFilter}
          onChange={(e) => setHouseFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tenant Email"
          className="border px-3 py-2 rounded"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          className="border px-3 py-2 rounded"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-4 sm:hidden">
        {filtered.map((r) => (
          <div
            key={r._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">
                  {r.rentalHouseId.title}
                </p>
                <p className="text-sm text-gray-600">
                  Tenant: {r.tenantId.email}
                </p>
              </div>
              <Link href={`/admin/requests/${r._id}`}>
                <Button size="sm">View</Button>
              </Link>
            </div>
            <p className="text-sm">
              <strong>Move In:</strong>{" "}
              {new Date(r.moveInDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <strong>Duration:</strong> {r.rentalDuration}
            </p>
            <p className="text-sm">
              <strong>Message:</strong> {r.message}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {r.phone}
            </p>
            <div className="flex gap-2">
              <Badge
                variant={
                  r.status === "Approved"
                    ? "outline"
                    : r.status === "Pending"
                    ? "default"
                    : "destructive"
                }
              >
                {r.status}
              </Badge>
              <Badge
                variant={
                  r.paymentStatus === "Paid"
                    ? "outline"
                    : r.paymentStatus === "Pending"
                    ? "default"
                    : "destructive"
                }
              >
                {r.paymentStatus}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "House Title",
                "Tenant Email",
                "Move In",
                "Duration",
                "Phone",
                "Status",
                "Payment Status",
              ].map((hdr) => (
                <th
                  key={hdr}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {hdr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.rentalHouseId.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.tenantId.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(r.moveInDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {r.rentalDuration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {r.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      r.status === "Approved"
                        ? "outline"
                        : r.status === "Pending"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      r.paymentStatus === "Paid"
                        ? "outline"
                        : r.paymentStatus === "Pending"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {r.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER & PAGINATION */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>
          Showing {filtered.length} of {totalCount} requests
        </span>
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
}
