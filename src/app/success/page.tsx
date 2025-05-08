"use client";
import { Button } from "@/components/ui/button";
import { verifyPayment } from "@/services/TenantService";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      const verifyOrderPayment = async () => {
        try {
          const result = await verifyPayment(orderId);
          console.log("result", result);
        } catch (error) {
          console.error("Error verifying payment:", error);
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

          <Link href="/tenant/payments">
            <Button>See Your Payments</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
