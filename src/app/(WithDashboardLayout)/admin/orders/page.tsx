"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { getAllOrders } from "@/services/AdminService";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";
import { useSearchParams } from "next/navigation";

type Order = {
  _id: string;
  transaction: {
    id: string;
    bank_status: string;
    date_time: string;
    method: string;
  };
  rentalHouseId: {
    _id: string;
    title: string;
  };
  tenantId: {
    email: string;
  };
  landlordId: {
    name: string;
  };
  amount: string;
  status: string;
};

export default function AdminOrdersPage() {
  const { setIsLoading } = useUser();
  const params = useSearchParams();
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "3";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter states
  const [titleFilter, setTitleFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getAllOrders(pageParam, limitParam);
        setOrders(res.data);
        setTotalPage(res.meta.totalPage);
        setTotalCount(res.meta.total);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [setIsLoading, pageParam, limitParam]);

  if (loading) {
    return <p className="p-6 text-center">Loading orders…</p>;
  }

  if (!orders.length) {
    return <p className="p-6 text-center">No orders available</p>;
  }

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    if (
      titleFilter &&
      !order.rentalHouseId.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase())
    )
      return false;
    if (
      emailFilter &&
      !order.tenantId.email.toLowerCase().includes(emailFilter.toLowerCase())
    )
      return false;
    if (statusFilter && order.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rental Orders</h1>

      {/* ============ FILTER BAR ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="House Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* ============ MOBILE CARDS ============ */}
      <div className="space-y-4 sm:hidden">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <Link href={`/listings/${order.rentalHouseId?._id}`}>
                  <p className="font-semibold text-gray-900 underline">
                    House: {order.rentalHouseId?.title || "N/A"}
                  </p>
                </Link>
                <p className="text-sm text-gray-600">
                  Tenant: {order.tenantId.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <strong>Landlord:</strong> {order.landlordId.name || "N/A"}
              </div>
              <div>
                <strong>Amount:</strong> ${order.amount}
              </div>
              <div className="col-span-2">
                <strong>Status:</strong> {order.status}
              </div>
              <div className="col-span-2">
                <strong>Payment Method:</strong> {order.transaction.method}
              </div>
              <div className="col-span-2">
                <strong>Transaction ID:</strong> {order.transaction.id}
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
                House
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Landlord
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <Link href={`/listings/${order.rentalHouseId?._id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 underline">
                    {order.rentalHouseId?.title || "N/A"}
                  </td>
                </Link>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.tenantId.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.landlordId.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      order.status === "Paid"
                        ? "secondary"
                        : order.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      order.transaction.method === "Success"
                        ? "outline"
                        : order.transaction.method === "Failure"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {order.transaction.method}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.transaction.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        Showing {orders.length} of {totalCount} listings
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
}
