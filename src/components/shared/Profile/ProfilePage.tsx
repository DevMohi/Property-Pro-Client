"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import ReusableProfilePage from "./ReusableProfilePage";
import { profileFormSchema } from "./ProfileForm";
import {
  getSingleUser,
  updateProfile,
  changePassword,
} from "@/services/ProfileService";
import { toast } from "sonner";
import { logout } from "@/services/AuthService";

export default function ProfilePage() {
  const { user, setIsLoading, setUser } = useUser();
  const userId = user?.id;
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // load profile once
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setIsLoading(true);
        const result = await getSingleUser(userId);
        setProfileInfo(result.data ?? result);
      } catch (err) {
        console.error("load failed", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, setIsLoading]);

  console.log(profileInfo);

  // react-hook-form for general info
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: async (values) => {
      try {
        profileFormSchema.parse(values);
        return { values, errors: {} };
      } catch (err: any) {
        return { values: {}, errors: err.formErrors.fieldErrors };
      }
    },
    defaultValues: profileInfo ?? {},
  });

  // submit general info
  const handleProfileSubmit = async (
    values: z.infer<typeof profileFormSchema>
  ) => {
    setIsSubmitting(true);
    try {
      const res = await updateProfile({ payload: { id: userId, ...values } });
      console.log("Inside profile", res);
      setProfileInfo(res.data ?? res);
      if (res?.success) {
        toast.success(res?.message || "Profile Updated");
      } else {
        toast.error(res?.message || "Profile Updating Failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
    // console.log("hello", values);
  };

  // submit password change
  const handlePasswordSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setIsSubmitting(true);
    try {
      const res = await changePassword({
        data: {
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      });
      console.log("Inside res", res);
      if (res.success) {
        toast.success(
          "Password changed successfully, login with new credentials"
        );
        await logout();
        setUser(null);
        router.push("/login");
      } else {
        toast.error(res?.message || "Password Changing Failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profileInfo) return <p>Loading profile…</p>;

  return (
    <ReusableProfilePage
      profileInfo={profileInfo}
      onSubmit={handleProfileSubmit}
      isSubmitting={isSubmitting}
      passForm={form}
      handlePasswordSubmit={handlePasswordSubmit}
    />
  );
}
