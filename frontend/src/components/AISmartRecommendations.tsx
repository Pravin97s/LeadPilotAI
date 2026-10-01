"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AISmartRecommendations() {
  const { rows } = useDashboard();

  const recommendations = useMemo(() => {
    if (!rows.length) {
      return [
        {
          title: "No Dataset",
          message: "Upload a CSV file to generate AI recommendations.",
          color: "bg-slate-800",
        },
      ];
    }

    const totalRows = rows.length;

    let missing = 0;

    const duplicateSet = new Set<string>();
    let duplicates = 0;

    const sourceRevenue: Record<string, number> = {};

    const statusCount: Record<string, number> = {};

    rows.forEach((row) => {
      const key = JSON.stringify(row);

      if (duplicateSet.has(key)) duplicates++;
      duplicateSet.add(key);

      Object.values(row).forEach((value) => {
        if (
          value === null ||
          value === undefined ||
          String(value).trim() === ""
        ) {
          missing++;
        }
      });

      const source =
        String(row.Source || row.source || "Unknown");

      const revenue = Number(
        row.Revenue ||
          row.revenue ||
          0
      );

      sourceRevenue[source] =
        (sourceRevenue[source] || 0) + revenue;

      const status =
        String(row.Status || row.status || "Unknown");

      statusCount[status] =
        (statusCount[status] || 0) + 1;
    });

    const bestSource =
      Object.entries(sourceRevenue).sort(
        (a, b) => b[1] - a[1]
      )[0];

    const bestStatus =
      Object.entries(statusCount).sort(
        (a, b) => b[1] - a[1]
      )[0];

    return [
      {
        title: "🚀 Revenue Opportunity",
        message: `${bestSource?.[0] ?? "Unknown"} generates the highest revenue.`,
        color: "bg-green-900/40 border-green-500",
      },

      {
        title: "📊 Dataset Quality",
        message:
          missing === 0
            ? "No missing values detected."
            : `${missing} missing values found.`,
        color: "bg-blue-900/40 border-blue-500",
      },

      {
        title: "📋 Duplicate Check",
        message:
          duplicates === 0
            ? "No duplicate rows detected."
            : `${duplicates} duplicate rows detected.`,
        color: "bg-yellow-900/40 border-yellow-500",
      },

      {
        title: "🏆 Lead Status",
        message: `${bestStatus?.[0] ?? "Unknown"} is the dominant lead status.`,
        color: "bg-purple-900/40 border-purple-500",
      },

      {
        title: "🤖 AI Suggestion",
        message:
          totalRows > 1000
            ? "Large dataset detected. Consider filtering before detailed analysis."
            : "Dataset size is ideal for AI analytics.",
        color: "bg-pink-900/40 border-pink-500",
      },
    ];
  }, [rows]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Smart Recommendations
      </h2>

      <div className="space-y-4">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border p-5 ${item.color}`}
          >
            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-slate-300">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}