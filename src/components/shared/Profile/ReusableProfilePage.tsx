// app/components/profile/ReusableProfilePage.tsx
"use client";

import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProfileSidebar from "./ProfileSidebar";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

type Props = {
  profileInfo: any;
  onSubmit: (
    v: z.infer<typeof import("./ProfileForm").profileFormSchema>
  ) => void;
  isSubmitting: boolean;
  passForm: any;
  handlePasswordSubmit: (v: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
};

export default function ReusableProfilePage({
  profileInfo,
  onSubmit,
  isSubmitting,
  passForm,
  handlePasswordSubmit,
}: Props) {
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal info</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ProfileSidebar profileInfo={profileInfo} />

        <div className="md:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm
                    defaultValues={profileInfo}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-4">
              <PasswordForm
                passForm={passForm}
                handlePasswordSubmit={handlePasswordSubmit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
