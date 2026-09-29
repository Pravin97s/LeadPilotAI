import { CSVRow } from "@/types/csv";

export interface DatasetStats {
  totalRows: number;
  totalColumns: number;
  totalCells: number;
  emptyCells: number;
  filledCells: number;
  completionRate: number;
}

export function getDatasetStats(
  rows: CSVRow[]
): DatasetStats {
  const totalRows = rows.length;

  const totalColumns =
    totalRows > 0 ? Object.keys(rows[0]).length : 0;

  const totalCells = totalRows * totalColumns;

  let emptyCells = 0;

  rows.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        emptyCells++;
      }
    });
  });

  const filledCells = totalCells - emptyCells;

  const completionRate =
    totalCells === 0
      ? 0
      : Number(
          (
            (filledCells / totalCells) *
            100
          ).toFixed(2)
        );

  return {
    totalRows,
    totalColumns,
    totalCells,
    emptyCells,
    filledCells,
    completionRate,
  };
}

export function getColumnNames(
  rows: CSVRow[]
): string[] {
  if (rows.length === 0) {
    return [];
  }

  return Object.keys(rows[0]);
}

export function getUniqueRowCount(
  rows: CSVRow[]
): number {
  return new Set(
    rows.map((row) => JSON.stringify(row))
  ).size;
}

export function getDuplicateRowCount(
  rows: CSVRow[]
): number {
  return (
    rows.length - getUniqueRowCount(rows)
  );
}