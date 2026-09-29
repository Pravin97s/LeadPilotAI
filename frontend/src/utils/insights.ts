import { CSVRow } from "@/types/csv";

export interface Insight {
  title: string;
  description: string;
}

export function generateInsights(
  rows: CSVRow[]
): Insight[] {
  if (rows.length === 0) {
    return [];
  }

  const insights: Insight[] = [];

  insights.push({
    title: "Dataset Size",
    description: `The uploaded dataset contains ${rows.length} records.`,
  });

  const headers = Object.keys(rows[0]);

  insights.push({
    title: "Columns Detected",
    description: `${headers.length} columns were found in the uploaded CSV.`,
  });

  const missing = rows.reduce((count, row) => {
    return (
      count +
      Object.values(row).filter(
        (value) =>
          value === "" ||
          value === null ||
          value === undefined
      ).length
    );
  }, 0);

  insights.push({
    title: "Missing Values",
    description: `${missing} missing values were detected.`,
  });

  const duplicate =
    rows.length -
    new Set(rows.map((row) => JSON.stringify(row))).size;

  insights.push({
    title: "Duplicate Records",
    description: `${duplicate} duplicate rows were found.`,
  });

  return insights;
}

export function topColumn(
  rows: CSVRow[],
  column: string
) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const value = String(row[column] ?? "Unknown");

    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts).sort(
    (a, b) => b[1] - a[1]
  )[0];
}

export function uniqueCount(
  rows: CSVRow[],
  column: string
) {
  return new Set(
    rows.map((row) => row[column])
  ).size;
}