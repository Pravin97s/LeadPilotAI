import { CSVRow } from "@/types/csv";

export interface StatusSummary {
  status: string;
  count: number;
}

export function getStatusSummary(
  rows: CSVRow[],
  column: string = "status"
): StatusSummary[] {
  const statusMap: Record<string, number> = {};

  rows.forEach((row) => {
    const value = row[column];

    const status =
      value === null ||
      value === undefined ||
      String(value).trim() === ""
        ? "Unknown"
        : String(value);

    statusMap[status] =
      (statusMap[status] || 0) + 1;
  });

  return Object.entries(statusMap)
    .map(([status, count]) => ({
      status,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function totalStatus(
  rows: CSVRow[],
  column: string = "status"
) {
  return getStatusSummary(rows, column).length;
}

export function topStatus(
  rows: CSVRow[],
  column: string = "status"
) {
  const list = getStatusSummary(rows, column);

  return list.length > 0
    ? list[0]
    : {
        status: "Unknown",
        count: 0,
      };
}

export function statusChartData(
  rows: CSVRow[],
  column: string = "status"
) {
  return getStatusSummary(rows, column).map(
    (item) => ({
      name: item.status,
      value: item.count,
    })
  );
}