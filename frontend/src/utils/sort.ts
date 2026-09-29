import { CSVRow } from "@/types/csv";

export type SortDirection = "asc" | "desc";

export function sortByColumn(
  rows: CSVRow[],
  column: string,
  direction: SortDirection = "asc"
): CSVRow[] {
  return [...rows].sort((a, b) => {
    const first = String(a[column] ?? "").toLowerCase();
    const second = String(b[column] ?? "").toLowerCase();

    if (first < second) {
      return direction === "asc" ? -1 : 1;
    }

    if (first > second) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}

export function sortNumeric(
  rows: CSVRow[],
  column: string,
  direction: SortDirection = "asc"
): CSVRow[] {
  return [...rows].sort((a, b) => {
    const first = Number(a[column] ?? 0);
    const second = Number(b[column] ?? 0);

    return direction === "asc"
      ? first - second
      : second - first;
  });
}

export function sortDate(
  rows: CSVRow[],
  column: string,
  direction: SortDirection = "asc"
): CSVRow[] {
  return [...rows].sort((a, b) => {
    const first = new Date(
      String(a[column] ?? "")
    ).getTime();

    const second = new Date(
      String(b[column] ?? "")
    ).getTime();

    return direction === "asc"
      ? first - second
      : second - first;
  });
}