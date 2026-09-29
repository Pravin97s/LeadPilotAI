import { CSVRow } from "@/types/csv";

export function isCSVFile(file: File): boolean {
  return (
    file.name.toLowerCase().endsWith(".csv") ||
    file.type === "text/csv"
  );
}

export function validateCSVFile(file: File): string | null {
  if (!file) {
    return "Please select a CSV file.";
  }

  if (!isCSVFile(file)) {
    return "Only CSV files are allowed.";
  }

  if (file.size > 10 * 1024 * 1024) {
    return "Maximum allowed file size is 10 MB.";
  }

  return null;
}

export function validateRows(rows: CSVRow[]): boolean {
  return rows.length > 0;
}

export function removeEmptyRows(
  rows: CSVRow[]
): CSVRow[] {
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
  const unique = new Map<string, CSVRow>();

  rows.forEach((row) => {
    unique.set(JSON.stringify(row), row);
  });

  return [...unique.values()];
}

export function countMissingValues(
  rows: CSVRow[]
): number {
  let count = 0;

  rows.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        count++;
      }
    });
  });

  return count;
}

export function countDuplicateRows(
  rows: CSVRow[]
): number {
  return (
    rows.length -
    removeDuplicateRows(rows).length
  );
}