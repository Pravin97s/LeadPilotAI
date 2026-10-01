"use client";

import { DashboardProvider } from "@/providers/DashboardProvider";
import { SearchProvider } from "@/providers/SearchProvider";
import { FilterProvider } from "@/context/FilterContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <SearchProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </SearchProvider>
    </DashboardProvider>
  );
}