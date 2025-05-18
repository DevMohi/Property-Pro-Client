"use client";

import { Button } from "@/components/ui/button";
import {
  getMyListingsRequests,
  respondToListing,
} from "@/services/PropertyService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RequestList = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await getMyListingsRequests();
      setRequests(res?.data || []);
    } catch (err) {
      console.error("Error fetching listing", err);
      toast.error("Failed to fetch rental requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = async (
    requestId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      setUpdatingId(requestId);
      const res = await respondToListing({ requestId, data: { status } });
      if (res?.success) {
        toast.success(res.message);

        // ✅ Optimistically update request status in local state
        setRequests((prev) =>
          prev.map((req) => (req._id === requestId ? { ...req, status } : req))
        );
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to respond to request:", err);
      toast.error("Request update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground">
        Loading rental requests...
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground">
        No rental requests found.
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      {requests.map((request) => (
        <div
          key={request._id}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-6 space-y-2">
            {/* Tenant Info */}
            <div>
              <p className="font-semibold">
                Tenant: {request.tenantId?.name || "Unknown"}
              </p>
              <p className="text-sm text-muted-foreground">
                {request.tenantId?.email} | {request.tenantId?.phone}
              </p>
            </div>

            {/* Property Info */}
            <div>
              <p className="font-semibold">
                Property: {request.rentalHouseId?.title || "Unknown"}
              </p>
              <p className="text-sm text-muted-foreground">
                Rent: ${request.rentalHouseId?.rent} | Location:{" "}
                {request.rentalHouseId?.location}
              </p>
            </div>

            {/* Request Message */}
            <div>
              <p className="text-sm">Message: {request.message}</p>
              <p className="text-sm">
                Payment:{" "}
                <span className="text-muted-foreground">
                  {request.paymentStatus ?? "N/A"}
                </span>
              </p>
            </div>

            {/* Status / Actions */}
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
                    disabled={updatingId === request._id}
                    onClick={() => handleResponse(request._id, "Approved")}
                  >
                    {updatingId === request._id ? "Approving..." : "Approve"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={updatingId === request._id}
                    onClick={() => handleResponse(request._id, "Rejected")}
                  >
                    {updatingId === request._id ? "Rejecting..." : "Reject"}
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
