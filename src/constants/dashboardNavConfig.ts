// constants/dashboardNavConfig.ts

import { NavItem } from "@/components/shared/DashboardLayout";

export const dashboardNavConfig: Record<string, NavItem[]> = {
  landlord: [
    { title: "Dashboard", icon: "Home", href: "/landlord" },
    { title: "Properties", icon: "Building2", href: "/landlord/properties" },
    {
      title: "Rental Requests",
      icon: "ClipboardList",
      href: "/landlord/requests",
    },
  ],
  tenant: [
    { title: "Dashboard", icon: "Home", href: "/tenant" },
    { title: "My Rentals", icon: "ClipboardList", href: "/tenant/rentals" },
    { title: "Profile", icon: "User", href: "/tenant/profile" },
  ],
  admin: [
    { title: "Dashboard", icon: "Home", href: "/admin" },
    { title: "Manage Users", icon: "User", href: "/admin/users" },
    {
      title: "Manage Properties",
      icon: "Building2",
      href: "/admin/properties",
    },
  ],
};
