import { CSVRow } from "@/types/csv";

export function getCSVHeaders(rows: CSVRow[]): string[] {
  if (rows.length === 0) {
    return [];
  }

  return Object.keys(rows[0]);
}

export function getCSVRowCount(rows: CSVRow[]): number {
  return rows.length;
}

export function getCSVColumnCount(rows: CSVRow[]): number {
  if (rows.length === 0) {
    return 0;
  }

  return Object.keys(rows[0]).length;
}

export function removeEmptyRows(rows: CSVRow[]): CSVRow[] {
  return rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
}

export function removeDuplicateRows(
  rows: CSVRow[]
): CSVRow[] {
  return Array.from(
    new Map(
      rows.map((row) => [
        JSON.stringify(row),
        row,
      ])
    ).values()
  );
}

export function getColumnData(
  rows: CSVRow[],
  column: string
): string[] {
  return rows.map((row) =>
    String(row[column] ?? "")
  );
}

export function hasColumn(
  rows: CSVRow[],
  column: string
): boolean {
  if (rows.length === 0) {
    return false;
  }

  return Object.keys(rows[0]).includes(column);
}

export function getPreview(
  rows: CSVRow[],
  limit = 5
): CSVRow[] {
  return rows.slice(0, limit);
}