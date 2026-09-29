import { CSVRow } from "@/types/csv";
import { calculateKPI } from "./kpi";
import { calculateRevenue } from "./revenue";
import { getStatusSummary } from "./status";
import { getSourceSummary } from "./source";

export interface DashboardSummary {
  totalRows: number;
  totalColumns: number;
  completionRate: number;
  duplicateRows: number;
  missingValues: number;
  totalRevenue: number;
  averageRevenue: number;
  highestRevenue: number;
  lowestRevenue: number;
  statusSummary: ReturnType<typeof getStatusSummary>;
  sourceSummary: ReturnType<typeof getSourceSummary>;
}

export function generateDashboard(
  rows: CSVRow[]
): DashboardSummary {
  const kpi = calculateKPI(rows);

  const revenue = calculateRevenue(rows);

  const statusSummary =
    getStatusSummary(rows);

  const sourceSummary =
    getSourceSummary(rows);

  return {
    totalRows: kpi.totalRows,
    totalColumns: kpi.totalColumns,
    completionRate: kpi.completionRate,
    duplicateRows: kpi.duplicateRows,
    missingValues: kpi.missingValues,
    totalRevenue: revenue.totalRevenue,
    averageRevenue: revenue.averageRevenue,
    highestRevenue: revenue.highestRevenue,
    lowestRevenue: revenue.lowestRevenue,
    statusSummary,
    sourceSummary,
  };
}

export function hasData(rows: CSVRow[]) {
  return rows.length > 0;
}

export function isEmpty(rows: CSVRow[]) {
  return rows.length === 0;
}