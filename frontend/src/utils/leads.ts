import { CSVRow } from "@/types/csv";

export function totalLeads(rows: CSVRow[]) {
  return rows.length;
}

export function convertedLeads(
  rows: CSVRow[],
  column = "status"
) {
  return rows.filter(
    (row) =>
      String(row[column]).toLowerCase() ===
      "converted"
  ).length;
}

export function pendingLeads(
  rows: CSVRow[],
  column = "status"
) {
  return rows.filter(
    (row) =>
      String(row[column]).toLowerCase() ===
      "pending"
  ).length;
}

export function contactedLeads(
  rows: CSVRow[],
  column = "status"
) {
  return rows.filter(
    (row) =>
      String(row[column]).toLowerCase() ===
      "contacted"
  ).length;
}

export function lostLeads(
  rows: CSVRow[],
  column = "status"
) {
  return rows.filter(
    (row) =>
      String(row[column]).toLowerCase() ===
      "lost"
  ).length;
}

export function conversionRate(
  rows: CSVRow[],
  column = "status"
) {
  if (rows.length === 0) {
    return 0;
  }

  return Number(
    (
      (convertedLeads(rows, column) / rows.length) *
      100
    ).toFixed(2)
  );
}