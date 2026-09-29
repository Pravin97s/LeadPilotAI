import { CSVRow } from "@/types/csv";

export interface RevenueSummary {
  totalRevenue: number;
  averageRevenue: number;
  highestRevenue: number;
  lowestRevenue: number;
}

export function calculateRevenue(
  rows: CSVRow[],
  column = "value"
): RevenueSummary {
  const values = rows
    .map((row) => Number(row[column] ?? 0))
    .filter((value) => !isNaN(value));

  if (values.length === 0) {
    return {
      totalRevenue: 0,
      averageRevenue: 0,
      highestRevenue: 0,
      lowestRevenue: 0,
    };
  }

  const totalRevenue = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return {
    totalRevenue,
    averageRevenue: Number(
      (totalRevenue / values.length).toFixed(2)
    ),
    highestRevenue: Math.max(...values),
    lowestRevenue: Math.min(...values),
  };
}

export function monthlyRevenue(
  rows: CSVRow[],
  dateColumn = "createdAt",
  valueColumn = "value"
) {
  const revenue: Record<string, number> = {};

  rows.forEach((row) => {
    const date = String(row[dateColumn] ?? "");

    if (!date) return;

    const month = new Date(date).toLocaleString("default", {
      month: "short",
    });

    revenue[month] =
      (revenue[month] || 0) +
      Number(row[valueColumn] ?? 0);
  });

  return Object.entries(revenue).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );
}

export function totalRevenue(
  rows: CSVRow[],
  column = "value"
) {
  return rows.reduce(
    (sum, row) =>
      sum + Number(row[column] ?? 0),
    0
  );
}