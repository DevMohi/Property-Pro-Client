/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { getMyListingsRequests } from "@/services/PropertyService";
import { useEffect, useState } from "react";

const RequestList = () => {
  const handleResponse = async (
    requestId: string,
    status: "Approved" | "Rejected"
  ) => {
    // try {
    //   await respondToRequest({ requestId, data: { status } }).unwrap();
    // } catch (err) {
    //   console.error("Failed to respond to request:", err);
    // }
    // console.log("hello");
    console.log("hello");
  };

  const [requests, setRequests] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const res = await getMyListingsRequests();
        console.log("Inside res", res);
        setRequests(res?.data); // Update this if your API shape is different
      } catch (err) {
        console.error("Error fetching listing", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request: any) => (
        <div
          key={request._id}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-6 space-y-2">
            {/* Tenant Information */}
            <div>
              <p className="font-semibold">Tenant: {request.tenantId?.name}</p>
              <p className="text-sm text-muted-foreground">
                {request.tenantId?.email} | {request.tenantId?.phone}
              </p>
            </div>

            {/* Property Information */}
            <div>
              <p className="font-semibold">
                Property: {request.rentalHouseId?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Rent: ${request.rentalHouseId?.rent} | Location:{" "}
                {request.rentalHouseId?.location}
              </p>
            </div>

            {/* Request Details */}
            <div>
              <p className="text-sm">Message: {request.message}</p>
              <p className="text-sm">
                Payment:{" "}
                <span className="text-muted-foreground">
                  {request.paymentStatus ?? "N/A"}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium text-primary">
                  {request.status}
                </span>
              </p>

              {request.status === "Pending" ? (
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResponse(request._id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleResponse(request._id, "Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Button
                    size="sm"
                    variant={
                      request.status === "Approved" ? "outline" : "destructive"
                    }
                    disabled
                  >
                    {request.status}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
