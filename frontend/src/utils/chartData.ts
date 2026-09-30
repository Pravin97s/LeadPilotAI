import { CSVRow } from "@/types/csv";

export function generateStatusChart(
  rows: CSVRow[],
  column: string = "status"
) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const status = String(row[column] ?? "Unknown");

    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}

export function generateSourceChart(
  rows: CSVRow[],
  column: string = "source"
) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const source = String(row[column] ?? "Unknown");

    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}

export function generateMonthlyChart(
  rows: CSVRow[],
  dateColumn: string = "createdAt"
) {
  const months: Record<string, number> = {};

  rows.forEach((row) => {
    const rawDate = row[dateColumn];

    if (!rawDate) return;

    const parsed = new Date(String(rawDate));

    if (isNaN(parsed.getTime())) return;

    const month = parsed.toLocaleString("default", {
      month: "short",
    });

    months[month] = (months[month] || 0) + 1;
  });

  return Object.entries(months).map(
    ([month, leads]) => ({
      month,
      leads,
    })
  );
}

export function generateRevenueChart(
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