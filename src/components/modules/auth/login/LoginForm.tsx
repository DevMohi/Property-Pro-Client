"use client"; // This ensures the component is treated as client-side only

import React, { Suspense } from "react";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./LoginValidation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useUser } from "@/context/UserContext";
import { IUser } from "@/types";
import { protectedRoutes } from "@/constants";

const LoginForm = () => {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const {
    formState: { isSubmitting },
  } = form;

  // User context and routing
  const { setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  // Submit handler for form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (!res?.success) {
        toast.error(res?.message || "Login failed");
        return;
      }

      // Handle success case
      const token = res?.data?.accessToken;
      if (token) {
        try {
          const decodedUser = jwtDecode<IUser>(token);
          setUser(decodedUser); // Update user context
        } catch (error) {
          console.error("Token decoding failed", error);
          toast.error("Invalid token received");
          return;
        }
      }

      // Redirect after login
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push(redirectPath);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <Logo />
      <div className="mb-3">
        <div className="flex items-center space-x-4 mb-2">
          <h1>Login</h1>
          <p className="font-medium text-sm text-gray-500">Welcome Back!</p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account?
        <Link href="/register" className="text-primary ml-1">
          Register
        </Link>
      </p>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading Login Page...</div>}>
      <LoginForm />
    </Suspense>
  );
}
