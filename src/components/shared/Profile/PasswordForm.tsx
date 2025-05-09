// app/components/profile/PasswordForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Values = z.infer<typeof passwordFormSchema>;

export default function PasswordForm({
  passForm,
  handlePasswordSubmit,
}: {
  passForm: any;
  handlePasswordSubmit: (v: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: passForm,
  });

  const onSubmit = async (data: Values) => {
    setIsSubmitting(true);
    await handlePasswordSubmit({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Enter a new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {(
              ["currentPassword", "newPassword", "confirmPassword"] as const
            ).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>
                      {field === "confirmPassword"
                        ? "Confirm Password"
                        : field.replace(/([A-Z])/g, " $1")}
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <CardFooter className="flex justify-end px-0">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSubmitting ? "Updating…" : "Update Password"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
