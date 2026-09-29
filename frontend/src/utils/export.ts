import Papa from "papaparse";
import { CSVRow } from "@/types/csv";

export function exportToCSV(
  rows: CSVRow[],
  fileName = "leadpilot-export.csv"
) {
  if (rows.length === 0) return;

  const csv = Papa.unparse(rows);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function exportJSON(
  rows: CSVRow[],
  fileName = "leadpilot-export.json"
) {
  const blob = new Blob(
    [JSON.stringify(rows, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}