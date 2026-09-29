import { CSVRow } from "@/types/csv";

export function totalRows(rows: CSVRow[]) {
  return rows.length;
}

export function totalColumns(rows: CSVRow[]) {
  if (rows.length === 0) return 0;

  return Object.keys(rows[0]).length;
}

export function duplicateRows(rows: CSVRow[]) {
  const set = new Set<string>();

  let duplicate = 0;

  rows.forEach((row) => {
    const value = JSON.stringify(row);

    if (set.has(value)) {
      duplicate++;
    } else {
      set.add(value);
    }
  });

  return duplicate;
}

export function missingValues(rows: CSVRow[]) {
  let missing = 0;

  rows.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        missing++;
      }
    });
  });

  return missing;
}

export function completionRate(rows: CSVRow[]) {
  if (rows.length === 0) return 0;

  const totalCells =
    totalRows(rows) * totalColumns(rows);

  const missing = missingValues(rows);

  return Number(
    (((totalCells - missing) / totalCells) * 100).toFixed(2)
  );
}

export function datasetSummary(rows: CSVRow[]) {
  return {
    rows: totalRows(rows),
    columns: totalColumns(rows),
    duplicates: duplicateRows(rows),
    missing: missingValues(rows),
    completion: completionRate(rows),
  };
}