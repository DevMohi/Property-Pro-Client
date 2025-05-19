"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUsers, getAllUsers } from "@/services/AdminService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";

export default function Page() {
  const { setIsLoading } = useUser();
  const params = useSearchParams();

  // read page & limit from URL, fallback to "1"/"5"
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "5";

  const [users, setUsers] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // whenever page or limit changes, refetch
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getAllUsers(pageParam, limitParam);
        setUsers(result.data);
        setTotalPage(result.meta.totalPage);
        setTotalCount(result.meta.total);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [pageParam, limitParam, setIsLoading]);

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteUsers(id);
      if (res.success) {
        toast.success(res.message || "User Deleted Successfully");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        toast.error(res.message || "Could not delete user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading Users…</p>;
  }

  if (!users.length) {
    return <p className="p-6 text-center">No Users available</p>;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      {/* MOBILE CARDS */}
      <div className="space-y-4 sm:hidden">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">
                  {u.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <h2 className="font-medium text-gray-900">{u.name}</h2>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {u.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Role:</strong>{" "}
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  u.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : u.role === "manager"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {u.role}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {u.phone || "N/A"}
            </p>
            <div className="mt-2 flex justify-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={u.role === "admin"}
                    size="sm"
                    className="text-red-600 hover:text-red-900 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete user “{u.name}”?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteUser(u._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Role", "Phone", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-600">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "manager"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.phone || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={user.role === "admin"}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete user “{user.name}”?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        Showing {users.length} of {totalCount} users
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
}
