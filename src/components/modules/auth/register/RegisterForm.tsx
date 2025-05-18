"use client";

import React, { Suspense } from "react";
import { User, Mail, Phone, MapPin, Lock, ChevronLeft } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "@/services/AuthService";
import { registrationSchema } from "./RegisterValidation";
import Image from "next/image";

type TRegisterForm = z.infer<typeof registrationSchema>;

function RegisterForm() {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registrationSchema),
  });
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
  } = form;
  const router = useRouter();

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const onSubmit: SubmitHandler<TRegisterForm> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-white flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10 space-y-2">
        <div></div>
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back Home</span>
          </Link>
          <h1 className="text-2xl font-extrabold">Create Account</h1>
          <p className="text-gray-500 mt-1">Join us and start your journey!</p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="Your name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="you@example.com"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="01234 567890"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="123 Main St"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="Your city"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a role</option>
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        type="password"
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        type="password"
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage>Password does not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2  bg-[#00A99D] text-white  rounded hover:bg-[#008F85]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering…" : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <div className="min-h-screen flex">
        {/* Left image pane */}
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
              Easily find your next home or list your property for rent. Sign up
              to get started!
            </p>
          </div>
        </div>
        {/* Right form pane */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-6">
          <div className="w-full max-w-md ">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
