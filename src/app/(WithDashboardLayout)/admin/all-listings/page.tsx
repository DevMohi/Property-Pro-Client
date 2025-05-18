/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

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
import { deleteListing, getAllListings } from "@/services/PropertyService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";

export default function Page() {
  const { setIsLoading } = useUser();
  const params = useSearchParams();
  const router = useRouter();

  // read page & limit from URL query (fallback to "1"/"5")
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "5";

  const [listings, setListings] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getAllListings(pageParam, limitParam);
        setListings(result.data);
        setTotalPage(result.meta.totalPage);
        setTotalCount(result.meta.total);
      } catch (err) {
        console.error("load failed", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [pageParam, limitParam, setIsLoading]);

  const handleDeleteListing = async (id: string) => {
    try {
      const res = await deleteListing(id);
      if (res.success) {
        toast.success(res.message || "Listing deleted");
        setListings((prev) => prev.filter((l) => l._id !== id));
      } else {
        toast.error(res.message || "Could not delete listing");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditListing = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  if (loading) {
    return <p className="p-6 text-center">Loading Listings…</p>;
  }

  if (!listings.length) {
    return <p className="p-6 text-center">No Listings available</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Property Listings
      </h1>

      {/* MOBILE CARDS */}
      <div className="space-y-4 sm:hidden">
        {listings.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
          >
            {/* image */}
            <div className="w-full h-40 relative rounded-md overflow-hidden">
              <Image
                src={l.imageUrls[0]?.trim() || "/placeholder.jpg"}
                alt="Property"
                fill
                className="object-cover"
              />
            </div>
            {/* details */}
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-gray-900">{l.title}</h2>
              <h2 className="text-sm font-medium text-gray-900">
                {l.location}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {l.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-green-100 rounded-full font-semibold">
                  Rent: {l.rent}
                </span>
                <span className="px-2 py-1 bg-blue-100 rounded-full font-semibold">
                  Status: {l.houseStatus}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full font-semibold">
                  Beds: {l.bedrooms}
                </span>
              </div>
            </div>
            {/* actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                onClick={() => handleEditListing(l._id)}
              >
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-900 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteListing(l._id)}
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
              {[
                "Title",
                "Image",
                "Location",
                "Description",
                "Rent",
                "Status",
                "Bedrooms",
                "Actions",
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
            {listings.map((l) => (
              <tr key={l._id} className="hover:bg-gray-50 transition-colors">
                {/* Image */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-16 w-24 relative rounded-md overflow-hidden">
                    <Image
                      src={l.imageUrls[0]?.trim() || "/placeholder.jpg"}
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                {/* Title */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{l.title}</span>
                </td>
                {/* Location */}
                <td className="px-6 py-4 whitespace-nowrap">{l.location}</td>
                {/* Description */}
                <td className="px-6 py-4">
                  <div className="text-gray-600 max-w-xs truncate">
                    {l.description}
                  </div>
                </td>
                {/* Rent */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {l.rent}
                  </span>
                </td>
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      l.houseStatus === "rented"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {l.houseStatus}
                  </span>
                </td>
                {/* Bedrooms */}
                <td className="px-6 py-4 whitespace-nowrap">{l.bedrooms}</td>
                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditListing(l._id)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this listing?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteListing(l._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer & pagination */}
      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        Showing {listings.length} of {totalCount} listings
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
}
