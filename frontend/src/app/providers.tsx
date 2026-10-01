"use client";

import { DashboardProvider } from "@/providers/DashboardProvider";
import { SearchProvider } from "@/providers/SearchProvider";
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
        <SearchProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </SearchProvider>
      </DashboardProvider>
    </SettingsProvider>
  );
}