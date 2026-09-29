import Papa from "papaparse";

export type CSVRow = Record<string, string>;

export function parseCSV(
  file: File
): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete(results) {
        resolve(results.data);
      },

      error(error) {
        reject(error);
      },
    });
  });
}

export function getHeaders(
  rows: CSVRow[]
): string[] {
  if (rows.length === 0) return [];
  return Object.keys(rows[0]);
}

export function countColumns(
  rows: CSVRow[]
): number {
  return getHeaders(rows).length;
}

export function countRows(
  rows: CSVRow[]
): number {
  return rows.length;
}

export function exportCSV(
  rows: CSVRow[],
  filename = "export.csv"
) {
  if (rows.length === 0) return;

  const csv = Papa.unparse(rows);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}