import { CSVRow } from "@/types/csv";

export function searchRows(
  rows: CSVRow[],
  keyword: string
): CSVRow[] {
  if (!keyword.trim()) {
    return rows;
  }

  const value = keyword.toLowerCase();

  return rows.filter((row) =>
    Object.values(row).some((cell) =>
      String(cell)
        .toLowerCase()
        .includes(value)
    )
  );
}

export function filterByColumn(
  rows: CSVRow[],
  column: string,
  value: string
): CSVRow[] {
  if (!column || !value) {
    return rows;
  }

  return rows.filter(
    (row) =>
      String(row[column]).toLowerCase() ===
      value.toLowerCase()
  );
}

export function sortRows(
  rows: CSVRow[],
  column: string,
  ascending = true
): CSVRow[] {
  return [...rows].sort((a, b) => {
    const first = String(a[column] ?? "");
    const second = String(b[column] ?? "");

    return ascending
      ? first.localeCompare(second)
      : second.localeCompare(first);
  });
}

export function paginateRows(
  rows: CSVRow[],
  page: number,
  pageSize: number
): CSVRow[] {
  const start = (page - 1) * pageSize;

  return rows.slice(start, start + pageSize);
}

export function totalPages(
  rows: CSVRow[],
  pageSize: number
): number {
  return Math.ceil(rows.length / pageSize);
}