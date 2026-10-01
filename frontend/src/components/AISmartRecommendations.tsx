"use client";

import { useMemo } from "react";
import useFilteredRows from "@/hooks/useFilteredRows";

export default function AISmartRecommendations() {
  const rows = useFilteredRows();

  const recommendations = useMemo(() => {
    if (!rows.length) return [];

    const result: string[] = [];

    const sourceCount: Record<string, number> = {};
    const statusCount: Record<string, number> = {};

    let totalRevenue = 0;
    let revenueRows = 0;
    let missingCells = 0;
    let totalCells = 0;

    rows.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        const field = key.toLowerCase();
        const text = String(value ?? "").trim();

        totalCells++;

        if (text === "") {
          missingCells++;
        }

        if (
          field.includes("source")
        ) {
          sourceCount[text || "Unknown"] =
            (sourceCount[text || "Unknown"] || 0) + 1;
        }

        if (
          field.includes("status")
        ) {
          statusCount[text || "Unknown"] =
            (statusCount[text || "Unknown"] || 0) + 1;
        }

        if (
          field.includes("revenue") ||
          field.includes("amount") ||
          field.includes("value")
        ) {
          const revenue = Number(
            text.replace(/[^\d.-]/g, "")
          );

          if (!isNaN(revenue)) {
            totalRevenue += revenue;
            revenueRows++;
          }
        }
      });
    });

    const topSource =
      Object.entries(sourceCount).sort(
        (a, b) => b[1] - a[1]
      )[0];

    const topStatus =
      Object.entries(statusCount).sort(
        (a, b) => b[1] - a[1]
      )[0];

    const averageRevenue =
      revenueRows > 0
        ? totalRevenue / revenueRows
        : 0;

    const completeness =
      ((totalCells - missingCells) /
        totalCells) *
      100;

    if (topSource) {
      result.push(
        `Focus more marketing budget on "${topSource[0]}" since it contributes the highest number of leads (${topSource[1]}).`
      );
    }

    if (
      topStatus &&
      topStatus[0].toLowerCase().includes("pending")
    ) {
      result.push(
        "A large number of leads are still pending. Follow up with these leads to improve conversions."
      );
    }

    if (
      averageRevenue > 100000
    ) {
      result.push(
        "Your average revenue per lead is high. Prioritize high-value leads for faster business growth."
      );
    } else {
      result.push(
        "Average revenue is relatively low. Consider targeting premium customers."
      );
    }

    if (
      completeness < 95
    ) {
      result.push(
        "Several records have missing values. Cleaning the dataset will improve AI predictions."
      );
    }

    if (
      rows.length > 1000
    ) {
      result.push(
        "Large dataset detected. Consider segmenting leads by source and status for deeper insights."
      );
    }

    if (
      result.length === 0
    ) {
      result.push(
        "Your dataset appears healthy. Continue collecting quality lead information."
      );
    }

    return result;
  }, [rows]);

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          AI Smart Recommendations
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to receive AI-powered recommendations.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Smart Recommendations
      </h2>

      <div className="space-y-4">
        {recommendations.map(
          (item, index) => (
            <div
              key={index}
              className="rounded-xl border border-blue-800 bg-blue-900/20 p-5"
            >
              <div className="flex gap-4">
                <div className="text-2xl">
                  💡
                </div>

                <p className="leading-7">
                  {item}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}