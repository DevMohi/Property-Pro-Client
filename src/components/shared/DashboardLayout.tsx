"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Building2,
  ClipboardList,
  CreditCard,
  Home,
  Settings,
  User,
  PlusSquare,
  Grid,
  Info,
} from "lucide-react";
import { NavUser } from "./NavUser";

export const iconMap = {
  Home,
  Building2,
  ClipboardList,
  User,
  Settings,
  CreditCard,
  PlusSquare,
  Grid,
  Info,
};

export type NavItem = {
  title: string;
  icon: keyof typeof iconMap;
  href: string;
};

export type DashboardLayoutProps = {
  children: React.ReactNode;
  basePath: string;
  navItems: NavItem[];
};

export default function DashboardLayout({
  children,
  navItems,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // static quick links
  const staticLinks: NavItem[] = [
    { title: "Home", icon: "Home", href: "/" },
    { title: "All Listings", icon: "Grid", href: "/listings" },
    { title: "About Us", icon: "Info", href: "/about" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar>
          <Link href="/">
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-8 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <Home className="h-4 w-4" />
                </div>
                <div className="font-semibold">PropertyPro</div>
              </div>
            </SidebarHeader>
          </Link>

          <SidebarContent className="overflow-hidden h-full">
            {/* dynamic navItems */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* static quick links */}
            <SidebarGroup>
              <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {staticLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === link.href}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{link.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <NavUser />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col flex-1 bg-white">
            <header className="flex h-16 items-center gap-4 border-b px-6 bg-background">
              <SidebarTrigger />
              <div className="font-semibold">
                {navItems.find((item) => pathname.startsWith(item.href))
                  ?.title || "Dashboard"}
              </div>
            </header>
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
