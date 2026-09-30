import { CSVRow } from "@/types/csv";

export interface RevenueSummary {
  totalRevenue: number;
  averageRevenue: number;
  highestRevenue: number;
  lowestRevenue: number;
}

export function calculateRevenue(
  rows: CSVRow[],
  column: string = "value"
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
  dateColumn: string = "createdAt",
  valueColumn: string = "value"
) {
  const revenue: Record<string, number> = {};

  rows.forEach((row) => {
    const rawDate = row[dateColumn];

    if (!rawDate) return;

    const parsed = new Date(String(rawDate));

    if (isNaN(parsed.getTime())) return;

    const month = parsed.toLocaleString("default", {
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
  column: string = "value"
) {
  return rows.reduce(
    (sum, row) =>
      sum + Number(row[column] ?? 0),
    0
  );
}