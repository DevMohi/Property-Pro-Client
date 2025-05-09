"use client";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useUser } from "@/context/UserContext";
import { adminItems, landlordItems, tenantItems } from "@/types/layout";
import React, { ReactNode } from "react";

const DashboardLayoutPage = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  if (user?.role === "landlord") {
    return (
      <DashboardLayout basePath="/landlord" navItems={landlordItems}>
        {children}
      </DashboardLayout>
    );
  } else if (user?.role === "tenant") {
    return (
      <DashboardLayout basePath="/tenant" navItems={tenantItems}>
        {children}
      </DashboardLayout>
    );
  } else if (user?.role === "admin") {
    return (
      <DashboardLayout basePath="/admin" navItems={adminItems}>
        {children}
      </DashboardLayout>
    );
  }
};

export default DashboardLayoutPage;
