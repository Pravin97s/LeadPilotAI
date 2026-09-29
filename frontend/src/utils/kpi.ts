import { CSVRow } from "@/types/csv";

export interface KPIData {
  totalRows: number;
  totalColumns: number;
  duplicateRows: number;
  missingValues: number;
  completionRate: number;
}

export function calculateKPI(rows: CSVRow[]): KPIData {
  const totalRows = rows.length;

  const totalColumns =
    totalRows > 0 ? Object.keys(rows[0]).length : 0;

  let missingValues = 0;

  rows.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        missingValues++;
      }
    });
  });

  const duplicateRows =
    totalRows -
    new Set(
      rows.map((row) => JSON.stringify(row))
    ).size;

  const totalCells = totalRows * totalColumns;

  const completionRate =
    totalCells === 0
      ? 0
      : Number(
          (
            ((totalCells - missingValues) /
              totalCells) *
            100
          ).toFixed(2)
        );

  return {
    totalRows,
    totalColumns,
    duplicateRows,
    missingValues,
    completionRate,
  };
}

export function averageCompletion(
  rows: CSVRow[]
): number {
  return calculateKPI(rows).completionRate;
}

export function totalMissing(
  rows: CSVRow[]
): number {
  return calculateKPI(rows).missingValues;
}

export function totalDuplicates(
  rows: CSVRow[]
): number {
  return calculateKPI(rows).duplicateRows;
}