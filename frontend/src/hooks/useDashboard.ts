"use client";

import { useDashboard as useDashboardContext } from "@/providers/DashboardProvider";

export default function useDashboard() {
  return useDashboardContext();
}