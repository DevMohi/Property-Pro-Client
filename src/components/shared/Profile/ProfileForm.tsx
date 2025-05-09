// app/components/profile/ProfileForm.tsx
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "@/components/ui/card";

export const profileFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: {
  defaultValues: ProfileFormValues;
  onSubmit: (v: ProfileFormValues) => Promise<void>;
  isSubmitting: boolean;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {(["name","email","phone","address","city"] as const).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.charAt(0).toUpperCase()+field.slice(1)}</FormLabel>
                  <FormControl>
                    <Input {...f} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-[120px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CardFooter className="flex justify-end px-0">
          <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
