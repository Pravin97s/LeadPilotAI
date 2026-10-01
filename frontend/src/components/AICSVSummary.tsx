"use client";

import { useMemo } from "react";
import useFilteredRows from "@/hooks/useFilteredRows";

export default function AICSVSummary() {
  const rows = useFilteredRows();

  const summary = useMemo(() => {
    if (!rows.length) {
      return {
        totalRows: 0,
        totalColumns: 0,
        missingValues: 0,
        duplicateRows: 0,
        completeness: 0,
        totalRevenue: 0,
        averageRevenue: 0,
        topSource: "N/A",
        topStatus: "N/A",
        dateRange: "N/A",
        columns: [],
        insights: [
          "Upload a CSV file to generate an AI summary.",
        ],
      };
    }

    const columns = Object.keys(rows[0]);

    let missingValues = 0;
    let totalCells = 0;

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        totalCells++;

        if (
          value === null ||
          value === undefined ||
          String(value).trim() === ""
        ) {
          missingValues++;
        }
      });
    });

    const duplicateRows =
      rows.length -
      new Set(
        rows.map((row) => JSON.stringify(row))
      ).size;

    const completeness = Number(
      (
        ((totalCells - missingValues) /
          totalCells) *
        100
      ).toFixed(1)
    );

    const revenueColumn = columns.find(
      (c) =>
        c.toLowerCase().includes("revenue") ||
        c.toLowerCase().includes("amount") ||
        c.toLowerCase().includes("price") ||
        c.toLowerCase().includes("value")
    );

    let totalRevenue = 0;
    let averageRevenue = 0;

    if (revenueColumn) {
      rows.forEach((row) => {
        const value = Number(
          String(
            row[revenueColumn]
          ).replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) {
          totalRevenue += value;
        }
      });

      averageRevenue =
        totalRevenue / rows.length;
    }

    const sourceColumn = columns.find((c) =>
      c.toLowerCase().includes("source")
    );

    let topSource = "N/A";

    if (sourceColumn) {
      const count: Record<string, number> = {};

      rows.forEach((row) => {
        const value =
          String(
            row[sourceColumn]
          ).trim() || "Unknown";

        count[value] =
          (count[value] || 0) + 1;
      });

      topSource =
        Object.entries(count).sort(
          (a, b) => b[1] - a[1]
        )[0][0];
    }

    const statusColumn = columns.find((c) =>
      c.toLowerCase().includes("status")
    );

    let topStatus = "N/A";

    if (statusColumn) {
      const count: Record<string, number> = {};

      rows.forEach((row) => {
        const value =
          String(
            row[statusColumn]
          ).trim() || "Unknown";

        count[value] =
          (count[value] || 0) + 1;
      });

      topStatus =
        Object.entries(count).sort(
          (a, b) => b[1] - a[1]
        )[0][0];
    }

    const dateColumn = columns.find(
      (c) =>
        c.toLowerCase().includes("date") ||
        c.toLowerCase().includes("created")
    );

    let dateRange = "N/A";

    if (dateColumn) {
      const dates = rows
        .map((row) =>
          new Date(
            String(row[dateColumn])
          )
        )
        .filter(
          (date) =>
            !isNaN(date.getTime())
        )
        .sort(
          (a, b) =>
            a.getTime() -
            b.getTime()
        );

      if (dates.length) {
        dateRange = `${dates[0].toLocaleDateString()} → ${dates[
          dates.length - 1
        ].toLocaleDateString()}`;
      }
    }

    const insights: string[] = [];

    insights.push(
      `Dataset contains ${rows.length} records across ${columns.length} columns.`
    );

    insights.push(
      `Data completeness is ${completeness}% with ${missingValues} missing values.`
    );

    if (revenueColumn) {
      insights.push(
        `Total revenue is ₹${totalRevenue.toLocaleString()} with an average of ₹${averageRevenue.toFixed(
          0
        )} per record.`
      );
    }

    if (sourceColumn) {
      insights.push(
        `Top lead source is "${topSource}".`
      );
    }

    if (statusColumn) {
      insights.push(
        `Most leads are currently "${topStatus}".`
      );
    }

    if (duplicateRows === 0) {
      insights.push(
        "No duplicate rows detected."
      );
    } else {
      insights.push(
        `${duplicateRows} duplicate rows detected.`
      );
    }

    return {
      totalRows: rows.length,
      totalColumns: columns.length,
      missingValues,
      duplicateRows,
      completeness,
      totalRevenue,
      averageRevenue,
      topSource,
      topStatus,
      dateRange,
      columns,
      insights,
    };
  }, [rows]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI CSV Summary
      </h2>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Rows
          </p>
          <h3 className="mt-2 text-3xl font-bold">
            {summary.totalRows}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Columns
          </p>
          <h3 className="mt-2 text-3xl font-bold">
            {summary.totalColumns}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Completeness
          </p>
          <h3 className="mt-2 text-3xl font-bold text-green-400">
            {summary.completeness}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Duplicate Rows
          </p>
          <h3 className="mt-2 text-3xl font-bold text-orange-400">
            {summary.duplicateRows}
          </h3>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-slate-800 p-5">
        <h3 className="mb-3 text-xl font-semibold">
          Dataset Details
        </h3>

        <div className="space-y-2 text-slate-300">
          <p>
            <strong>Columns:</strong>{" "}
            {summary.columns.join(", ")}
          </p>

          <p>
            <strong>Top Source:</strong>{" "}
            {summary.topSource}
          </p>

          <p>
            <strong>Top Status:</strong>{" "}
            {summary.topStatus}
          </p>

          <p>
            <strong>Date Range:</strong>{" "}
            {summary.dateRange}
          </p>

          <p>
            <strong>Total Revenue:</strong> ₹
            {summary.totalRevenue.toLocaleString()}
          </p>

          <p>
            <strong>Average Revenue:</strong> ₹
            {summary.averageRevenue.toFixed(0)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {summary.insights.map(
          (item, index) => (
            <div
              key={index}
              className="rounded-xl border border-blue-800 bg-blue-900/20 p-4"
            >
              🤖 {item}
            </div>
          )
        )}
      </div>
    </section>
  );
}