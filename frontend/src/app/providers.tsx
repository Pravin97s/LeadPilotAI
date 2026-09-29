"use client";

import { DashboardProvider } from "@/providers/DashboardProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  );
}