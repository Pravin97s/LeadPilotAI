"use client";

import { useMemo } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { generateDashboard } from "@/utils/dashboard";

export default function useAnalytics() {
  const { rows } = useDashboard();

  const analytics = useMemo(() => {
    return generateDashboard(rows);
  }, [rows]);

  return analytics;
}