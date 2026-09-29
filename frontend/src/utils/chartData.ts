import { CSVRow } from "@/types/csv";

export function generateStatusChart(rows: CSVRow[]) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const status = String(row.status ?? "Unknown");

    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function generateSourceChart(rows: CSVRow[]) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const source = String(row.source ?? "Unknown");

    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function generateMonthlyChart(rows: CSVRow[]) {
  const months: Record<string, number> = {};

  rows.forEach((row) => {
    const value = String(row.createdAt ?? "");

    if (!value) return;

    const month = new Date(value).toLocaleString("default", {
      month: "short",
    });

    months[month] = (months[month] || 0) + 1;
  });

  return Object.entries(months).map(([month, leads]) => ({
    month,
    leads,
  }));
}

export function generateRevenueChart(rows: CSVRow[]) {
  const revenue: Record<string, number> = {};

  rows.forEach((row) => {
    const value = Number(row.value ?? 0);

    const date = String(row.createdAt ?? "");

    if (!date) return;

    const month = new Date(date).toLocaleString("default", {
      month: "short",
    });

    revenue[month] = (revenue[month] || 0) + value;
  });

  return Object.entries(revenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));
}