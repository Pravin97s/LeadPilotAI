"use client";

import { useMemo } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { useFilter } from "@/context/FilterContext";

export default function useFilteredRows() {
  const { rows } = useDashboard();

  const {
    search,
    source,
    status,
    company,
    minRevenue,
    maxRevenue,
    startDate,
    endDate,
  } = useFilter();

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const entries = Object.entries(row);

      // Global Search
      if (search) {
        const found = entries.some(([_, value]) =>
          String(value ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        if (!found) return false;
      }

      // Source Filter
      if (source) {
        const sourceKey = Object.keys(row).find((key) =>
          key.toLowerCase().includes("source")
        );

        if (
          !sourceKey ||
          String(row[sourceKey]).toLowerCase() !==
            source.toLowerCase()
        ) {
          return false;
        }
      }

      // Status Filter
      if (status) {
        const statusKey = Object.keys(row).find((key) =>
          key.toLowerCase().includes("status")
        );

        if (
          !statusKey ||
          String(row[statusKey]).toLowerCase() !==
            status.toLowerCase()
        ) {
          return false;
        }
      }

      // Company Filter
      if (company) {
        const companyKey = Object.keys(row).find((key) =>
          key.toLowerCase().includes("company")
        );

        if (
          !companyKey ||
          !String(row[companyKey])
            .toLowerCase()
            .includes(company.toLowerCase())
        ) {
          return false;
        }
      }

      // Revenue Filter
      const revenueKey = Object.keys(row).find(
        (key) =>
          key.toLowerCase().includes("revenue") ||
          key.toLowerCase().includes("amount") ||
          key.toLowerCase().includes("price")
      );

      if (revenueKey) {
        const revenue = Number(
          String(row[revenueKey]).replace(/[^\d.-]/g, "")
        );

        if (!isNaN(revenue)) {
          if (revenue < minRevenue) return false;
          if (revenue > maxRevenue) return false;
        }
      }

      // Date Filter
      const dateKey = Object.keys(row).find(
        (key) =>
          key.toLowerCase().includes("date") ||
          key.toLowerCase().includes("created")
      );

      if (dateKey) {
        const value = new Date(String(row[dateKey]));

        if (startDate) {
          if (value < new Date(startDate)) return false;
        }

        if (endDate) {
          if (value > new Date(endDate)) return false;
        }
      }

      return true;
    });
  }, [
    rows,
    search,
    source,
    status,
    company,
    minRevenue,
    maxRevenue,
    startDate,
    endDate,
  ]);

  return filteredRows;
}