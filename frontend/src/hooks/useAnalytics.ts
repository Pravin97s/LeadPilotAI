"use client";

import { useMemo } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import useFilteredRows from "@/hooks/useFilteredRows";
import { generateDashboard } from "@/utils/dashboard";
import { calculateRevenue } from "@/utils/revenue";
import { getStatusSummary } from "@/utils/status";
import { getSourceSummary } from "@/utils/source";

export default function useAnalytics() {
  const { columnMapping } = useDashboard();

  const rows = useFilteredRows();

  const analytics = useMemo(() => {
    const dashboard = generateDashboard(rows);

    const revenue = calculateRevenue(
      rows,
      columnMapping["Revenue"] || "value"
    );

    const statusSummary = getStatusSummary(
      rows,
      columnMapping["Status"] || "status"
    );

    const sourceSummary = getSourceSummary(
      rows,
      columnMapping["Source"] || "source"
    );

    return {
      ...dashboard,

      totalRevenue: revenue.totalRevenue,
      averageRevenue: revenue.averageRevenue,
      highestRevenue: revenue.highestRevenue,
      lowestRevenue: revenue.lowestRevenue,

      statusSummary,
      sourceSummary,
    };
  }, [rows, columnMapping]);

  return analytics;
}