import { CSVRow } from "@/types/csv";

export function globalSearch(
  rows: CSVRow[],
  keyword: string
): CSVRow[] {
  if (!keyword.trim()) {
    return rows;
  }

  const search = keyword.toLowerCase();

  return rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value)
        .toLowerCase()
        .includes(search)
    )
  );
}

export function searchByColumn(
  rows: CSVRow[],
  column: string,
  keyword: string
): CSVRow[] {
  if (!keyword.trim()) {
    return rows;
  }

  return rows.filter((row) =>
    String(row[column] ?? "")
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );
}

export function containsKeyword(
  row: CSVRow,
  keyword: string
): boolean {
  return Object.values(row).some((value) =>
    String(value)
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );
}