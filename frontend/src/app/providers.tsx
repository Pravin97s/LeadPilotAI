"use client";

import { DashboardProvider } from "@/providers/DashboardProvider";
import { SearchProvider } from "@/providers/SearchProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </DashboardProvider>
  );
}