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
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Building2, ClipboardList, Home, Settings, User } from "lucide-react";

export const iconMap = {
  Home,
  Building2,
  ClipboardList,
  User,
  Settings,
};

type NavItem = {
  title: string;
  icon: keyof typeof iconMap;
  href: string;
};

type DashboardLayoutProps = {
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-8 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Home className="h-4 w-4" />
              </div>
              <div className="font-semibold">PropertyPro</div>
            </div>
          </SidebarHeader>

          <SidebarContent>
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
                          <Link href={item.href}>
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{item.title}</span>
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
            {/* Future profile menu */}
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col flex-1 min-h-screen bg-white">
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
