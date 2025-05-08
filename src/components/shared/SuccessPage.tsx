"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { verifyPayment } from "@/services/TenantService";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Dynamic import to disable SSR for this page (only client-side)
const SuccessPageContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (orderId) {
      const verifyOrderPayment = async () => {
        setIsVerifying(true);
        try {
          const result = await verifyPayment(orderId);
          console.log("Payment verification result:", result);

          if (!result.success) {
            throw new Error(result?.message || "Payment verification failed");
          }
        } catch (error: any) {
          console.error("Error verifying payment:", error);
          setVerificationError(
            error?.message || "An error occurred while verifying payment."
          );
        } finally {
          setIsVerifying(false);
        }
      };

      verifyOrderPayment();
    }
  }, [orderId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-5">
            <Check className="size-40 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Payment Successful {orderId}
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Thank you for your payment! Your payment has been processed
            successfully and notified to the owner.
          </p>

          {verificationError && (
            <div className="text-red-500 text-center mb-4">
              {verificationError}
            </div>
          )}

          {isVerifying ? (
            <p className="text-center text-gray-600">
              Verifying your payment...
            </p>
          ) : (
            <Link href="/tenant/payments">
              <Button>See Your Payments</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
