import { CSVRow } from "@/types/csv";

export interface AISummary {
  totalLeads: number;
  totalRevenue: number;
  averageRevenue: number;
  bestSource: string;
  highestLead: string;
  highestRevenue: number;
  recommendation: string;
}

export default function aiSummary(
  rows: CSVRow[]
): AISummary {
  if (rows.length === 0) {
    return {
      totalLeads: 0,
      totalRevenue: 0,
      averageRevenue: 0,
      bestSource: "-",
      highestLead: "-",
      highestRevenue: 0,
      recommendation:
        "Upload a CSV file to generate AI insights.",
    };
  }

  let totalRevenue = 0;
  let highestRevenue = 0;
  let highestLead = "-";

  const sourceRevenue: Record<string, number> = {};

  rows.forEach((row) => {
    const revenue = Number(
      String(row["Revenue"] ?? 0).replace(/,/g, "")
    );

    totalRevenue += revenue;

    if (revenue > highestRevenue) {
      highestRevenue = revenue;
      highestLead = String(
        row["Lead Name"] ?? "-"
      );
    }

    const source = String(
      row["Source"] ?? "Unknown"
    );

    sourceRevenue[source] =
      (sourceRevenue[source] ?? 0) + revenue;
  });

  const bestSource =
    Object.entries(sourceRevenue).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

  return {
    totalLeads: rows.length,
    totalRevenue,
    averageRevenue:
      Math.round(totalRevenue / rows.length),
    bestSource,
    highestLead,
    highestRevenue,
    recommendation:
      "Focus more on " +
      bestSource +
      " campaigns because they generate the highest revenue.",
  };
}