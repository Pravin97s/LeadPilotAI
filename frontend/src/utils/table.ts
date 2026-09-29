import { CSVRow } from "@/types/csv";

export function getHeaders(rows: CSVRow[]): string[] {
  if (rows.length === 0) {
    return [];
  }

  return Object.keys(rows[0]);
}

export function getColumnValues(
  rows: CSVRow[],
  column: string
): string[] {
  return rows.map((row) => String(row[column] ?? ""));
}

export function getUniqueValues(
  rows: CSVRow[],
  column: string
): string[] {
  return [...new Set(getColumnValues(rows, column))];
}

export function columnExists(
  rows: CSVRow[],
  column: string
): boolean {
  if (rows.length === 0) {
    return false;
  }

  return column in rows[0];
}

export function getCell(
  row: CSVRow,
  column: string
): string {
  return String(row[column] ?? "");
}