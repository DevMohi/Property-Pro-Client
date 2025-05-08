import DashboardLayoutPage from "@/components/modules/dashboard-layout";
import type { ReactNode } from "react";

export default function LandlordLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayoutPage>
      {children}
    </DashboardLayoutPage>
  );
}
