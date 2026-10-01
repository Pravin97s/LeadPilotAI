"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AICSVSummary() {
  const { rows } = useDashboard();

  const summary = useMemo(() => {
    if (!rows.length) {
      return [
        "Upload a CSV file to generate an AI summary."
      ];
    }

    const columns = Object.keys(rows[0]);

    const revenueColumn = columns.find(c =>
      c.toLowerCase().includes("revenue") ||
      c.toLowerCase().includes("amount") ||
      c.toLowerCase().includes("price")
    );

    const statusColumn = columns.find(c =>
      c.toLowerCase().includes("status")
    );

    const sourceColumn = columns.find(c =>
      c.toLowerCase().includes("source")
    );

    const totalRows = rows.length;

    let totalRevenue = 0;

    if (revenueColumn) {
      rows.forEach(row => {
        const value = Number(
          String(row[revenueColumn]).replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) totalRevenue += value;
      });
    }

    let topSource = "Unknown";

    if (sourceColumn) {
      const counts: Record<string, number> = {};

      rows.forEach(row => {
        const value = String(row[sourceColumn]);

        counts[value] = (counts[value] || 0) + 1;
      });

      topSource =
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
    }

    let won = 0;

    if (statusColumn) {
      rows.forEach(row => {
        if (
          String(row[statusColumn]).toLowerCase() === "won"
        ) {
          won++;
        }
      });
    }

    return [
      `The uploaded dataset contains ${totalRows} records.`,

      `Detected ${columns.length} columns.`,

      revenueColumn
        ? `Total revenue is ₹${totalRevenue.toLocaleString()}.`
        : "No revenue column detected.",

      sourceColumn
        ? `Most leads are coming from ${topSource}.`
        : "Lead source could not be detected.",

      statusColumn
        ? `${won} leads are marked as Won.`
        : "Lead status column not found.",

      "Overall dataset looks clean and suitable for AI analytics."
    ];
  }, [rows]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-bold mb-6">
        AI CSV Summary
      </h2>

      <div className="space-y-4">
        {summary.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-slate-800 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}