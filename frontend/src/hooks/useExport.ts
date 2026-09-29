"use client";

import { useCallback } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { exportJSON, exportToCSV } from "@/utils/export";
import { generateDownloadName } from "@/utils/file";

export default function useExport() {
  const { rows } = useDashboard();

  const exportCsv = useCallback(() => {
    exportToCSV(
      rows,
      generateDownloadName("leadpilot")
    );
  }, [rows]);

  const exportJson = useCallback(() => {
    exportJSON(rows, "leadpilot.json");
  }, [rows]);

  return {
    exportCsv,
    exportJson,
  };
}