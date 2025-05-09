// app/components/profile/ProfileSidebar.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

interface ProfileInfo {
  name: string;
  role: string;
  email: string;
  city: string;
  phone: string;
  address: string;
  imageUrl?: string;
}

export default function ProfileSidebar({
  profileInfo,
}: {
  profileInfo: ProfileInfo;
}) {
  const { name, role, email, phone, address, imageUrl, city } = profileInfo;

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your public profile info</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 mb-4">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={name} />
          ) : (
            <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <div className="mt-6 w-full space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{city}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
