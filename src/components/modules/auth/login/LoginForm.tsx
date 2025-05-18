"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types";

type LoginData = { email: string; password: string };

const CREDENTIALS: Record<
  "tenant" | "landlord" | "admin",
  { email: string; password: string }
> = {
  tenant: { email: "tenant1@gmail.com", password: "12345678" },
  landlord: { email: "jomidar@gmail.com", password: "12345678" },
  admin: { email: "admin@gmail.com", password: "12345678" },
};

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<LoginData>();
  const [role, setRole] = useState<"tenant" | "landlord" | "admin">("tenant");
  const { setUser } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  useEffect(() => {
    const creds = CREDENTIALS[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
  }, [role, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }
      toast.success(res.message);
      const token = res.data.accessToken;
      if (token) {
        try {
          const decoded = jwtDecode<IUser>(token);
          setUser(decoded);
        } catch {
          toast.error("Invalid token");
          return;
        }
      }
      if (protectedRoutes.some((r) => pathname.match(r))) {
        router.push(redirectPath);
      }
    } catch {
      toast.error("Unexpected error");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left pane */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?q=80&w=1935&auto=format&fit=crop"
          alt="House"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
          <h2 className="text-white text-4xl font-bold mb-2">Property Pro</h2>
          <p className="text-white text-center max-w-xs">
            Easily find your next home or list your property for rent. Log in or
            sign up to get started.
          </p>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back Home</span>
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Welcome Back <span>👋</span>
            </h1>
            <p className="text-gray-600 mt-1">Enter Login Details</p>
          </div>

          {/* Role buttons */}
          <div className="flex justify-center gap-2">
            {(["tenant", "landlord", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded ${
                  role === r
                    ? "bg-[#00A99D] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {r[0].toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                type="text"
                {...register("email")}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00A99D] text-white py-2 rounded hover:bg-[#008F85]"
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account yet?{" "}
            <Link href="/register" className="text-[#00A99D] hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
