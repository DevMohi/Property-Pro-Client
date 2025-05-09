/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const { setIsLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getAllListings();
        setData(result.data ?? result);
      } catch (err) {
        console.error("load failed", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading]);

  const handleDeleteListing = async (id: string) => {
    try {
      const res = await deleteListing(id);
      if (res.success) {
        toast.success(res.message || "Listing deleted");
        setData((prev) => prev.filter((l) => l._id !== id));
      } else {
        toast.error(res.message || "Could not delete listing");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditListing = (id: string) => {
    // adjust this path to wherever your edit page lives
    router.push(`/admin/edit/${id}`);
  };

  if (!data.length)
    return <div className="text-center py-8">No listings available</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Property Listings
      </h1>

      {/*========== CARD VIEW (mobile) ==========*/}
      <div className="space-y-4 sm:hidden">
        {data.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
          >
            <div className="w-full h-40 relative rounded-md overflow-hidden">
              <Image
                src={l.imageUrls[0]?.trim() || "/placeholder.jpg"}
                alt="Property"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-gray-900 ">{l.title}</h2>
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

      {/*========== TABLE VIEW (sm and up) ==========*/}
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
            {data.map((l) => (
              <tr key={l._id} className="hover:bg-gray-50 transition-colors">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {l.title}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {l.location}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600 max-w-xs truncate">
                    {l.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {l.rent}
                  </span>
                </td>
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
                <td className="px-6 py-4 whitespace-nowrap">{l.bedrooms}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEditListing(l._id)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-900 cursor-pointer"
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

      <div className="mt-4 text-sm text-gray-500">
        Showing {data.length} {data.length === 1 ? "listing" : "listings"}
      </div>
    </div>
  );
}
