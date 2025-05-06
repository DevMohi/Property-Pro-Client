"use client";
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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";

import { toast } from "sonner";
import { loginSchema } from "./LoginValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useUser } from "@/context/UserContext";
import { IUser } from "@/types";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  console.log(redirect);
  const router = useRouter();
  console.log(reCaptchaStatus);

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      console.log(res);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);

        // ✅ Decode the token and update user context
        const token = res?.data?.accessToken;
        if (token) {
          const decodedUser = jwtDecode<IUser>(token);
          setUser(decodedUser); // <- This makes the UI reflect user state instantly
        }

        router.push(redirect ?? "/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <Logo />
      <div className="mb-3">
        <div className="flex items-center space-x-4 mb-2 ">
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
          <div className="flex w-full mt-3">
            <ReCAPTCHA
              className="mx-auto"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
            />
          </div>
          ,
          <Button
            disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account?
        <Link href="/register" className="text-primary ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

//

export default LoginForm;
