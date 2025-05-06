import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, "Phone number must be at least 10 digits"),

    address: z
      .string({
        required_error: "Address is required",
      })
      .min(2, "Address must be at least 10 characters"),

    city: z
      .string({
        required_error: "City is required",
      })
      .min(2, "City must be at least 10 characters"),

    role: z
      .enum(["tenant", "landlord"], {
        required_error: "Role is required",
      })
      .transform((val) => val.toLowerCase() as "tenant" | "landlord"),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),

    passwordConfirm: z
      .string({
        required_error: "Please confirm your password",
      })
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
