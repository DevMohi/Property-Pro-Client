import DashboardLayout from "@/components/shared/DashboardLayout";
import type { ReactNode } from "react";

export default function LandlordLayout({ children }: { children: ReactNode }) {
  const navItems: {
    title: string;
    icon: "Home" | "Building2" | "ClipboardList" | "User" | "Settings";
    href: string;
  }[] = [
    { title: "Dashboard", icon: "Home", href: "/landlord/dashboard" },
    { title: "Properties", icon: "Building2", href: "/landlord/properties" },
    {
      title: "Rental Requests",
      icon: "ClipboardList",
      href: "/landlord/requests",
    },
  ];

  return (
    <DashboardLayout basePath="/landlord" navItems={navItems}>
      {children}
    </DashboardLayout>
  );
}
