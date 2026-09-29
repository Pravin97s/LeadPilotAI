import { CSVRow } from "@/types/csv";

export interface SourceSummary {
  source: string;
  count: number;
}

export function getSourceSummary(
  rows: CSVRow[],
  column = "source"
): SourceSummary[] {
  const sources: Record<string, number> = {};

  rows.forEach((row) => {
    const source = String(row[column] ?? "Unknown");

    sources[source] = (sources[source] || 0) + 1;
  });

  return Object.entries(sources)
    .map(([source, count]) => ({
      source,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function topSource(
  rows: CSVRow[],
  column = "source"
) {
  const data = getSourceSummary(rows, column);

  return data.length > 0
    ? data[0]
    : {
        source: "Unknown",
        count: 0,
      };
}

export function totalSources(
  rows: CSVRow[],
  column = "source"
) {
  return getSourceSummary(rows, column).length;
}

export function sourceChartData(
  rows: CSVRow[],
  column = "source"
) {
  return getSourceSummary(rows, column).map((item) => ({
    name: item.source,
    value: item.count,
  }));
}