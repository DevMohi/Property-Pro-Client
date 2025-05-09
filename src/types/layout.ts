export const landlordItems: {
  title: string;
  icon:
    | "Home"
    | "Building2"
    | "ClipboardList"
    | "User"
    | "Settings"
    | "PlusSquare";

  href: string;
}[] = [
  { title: "Dashboard", icon: "Home", href: "/landlord/dashboard" },
  { title: "Properties", icon: "Building2", href: "/landlord/properties" },
  {
    title: "Create Properties",
    icon: "PlusSquare",
    href: "/landlord/properties/add-property",
  },
  {
    title: "Rental Requests",
    icon: "ClipboardList",
    href: "/landlord/requests",
  },
  {
    title: "Profile",
    icon: "User",
    href: "/landlord/profile",
  },
];

export const tenantItems: {
  title: string;
  icon: "Home" | "ClipboardList" | "CreditCard" | "User";
  href: string;
}[] = [
  { title: "Dashboard", icon: "Home", href: "/tenant/dashboard" },
  {
    title: "Properties Requested",
    icon: "ClipboardList",
    href: "/tenant/requests",
  },
  { title: "Payments", icon: "CreditCard", href: "/tenant/payments" },
  {
    title: "Profile",
    icon: "User",
    href: "/tenant/profile",
  },
];

export const adminItems: {
  title: string;
  icon: "Building2" | "ClipboardList" | "User" | "Settings" | "CreditCard";
  href: string;
}[] = [
  { title: "All Listings", icon: "Building2", href: "/admin/listings" },
  { title: "Users", icon: "User", href: "/admin/users" },
  { title: "Settings", icon: "Settings", href: "/admin/settings" },
  {
    title: "Profile",
    icon: "User",
    href: "/admin/profile",
  },
];
