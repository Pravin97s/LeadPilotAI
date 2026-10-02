"use client";

import { DashboardProvider } from "@/providers/DashboardProvider";
import { FilterProvider } from "@/context/FilterContext";
import { SettingsProvider } from "@/context/SettingsContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <DashboardProvider>
  <FilterProvider>
    {children}
  </FilterProvider>
</DashboardProvider>
    </SettingsProvider>
  );
}