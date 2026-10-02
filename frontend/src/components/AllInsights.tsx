"use client";

import { useMemo } from "react";
import useFilteredRows from "@/hooks/useFilteredRows";

type Row = Record<string, any>;

export default function AllInsights() {
  const rows = useFilteredRows();

  const insights = useMemo(() => {
    const result: string[] = [];

    if (!rows || rows.length === 0) {
      result.push("No records match the current filter.");
      return result;
    }

    const totalRows = rows.length;

    const columns = Object.keys(rows[0] ?? {});

    let missingValues = 0;
    let filledValues = 0;

    rows.forEach((row) => {
      columns.forEach((column) => {
        const value = row[column];

        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          missingValues++;
        } else {
          filledValues++;
        }
      });
    });

    const completionRate =
      filledValues + missingValues === 0
        ? 100
        : Math.round(
            (filledValues / (filledValues + missingValues)) * 100
          );

    const duplicateRows =
      totalRows -
      new Set(rows.map((row) => JSON.stringify(row))).size;

    const revenueKey = columns.find((column) =>
      column.toLowerCase().includes("revenue")
    );

    let totalRevenue = 0;
    let highestRevenue = 0;
    let lowestRevenue = 0;
    let averageRevenue = 0;

    if (revenueKey) {
      const revenues = rows
        .map((row) =>
          Number(
            String(row[revenueKey] ?? "").replace(/[^0-9.-]/g, "")
          )
        )
        .filter((value) => !isNaN(value));

      if (revenues.length > 0) {
        totalRevenue = revenues.reduce(
          (sum, value) => sum + value,
          0
        );

        highestRevenue = Math.max(...revenues);
        lowestRevenue = Math.min(...revenues);
        averageRevenue = totalRevenue / revenues.length;
      }
    }

    result.push(
      `Filtered dataset contains ${totalRows.toLocaleString()} records.`
    );

    result.push(
      `${completionRate}% of all fields are complete.`
    );

    result.push(
      `${duplicateRows} duplicate records detected.`
    );

    result.push(
      `${missingValues} missing values found.`
    );

    if (totalRevenue > 0) {
      result.push(
        `Total revenue is ₹${totalRevenue.toLocaleString()}.`
      );

      result.push(
        `Average revenue per record is ₹${averageRevenue.toFixed(2)}.`
      );

      result.push(
        `Highest revenue is ₹${highestRevenue.toLocaleString()}.`
      );

      result.push(
        `Lowest revenue is ₹${lowestRevenue.toLocaleString()}.`
      );
    }

    if (completionRate < 80) {
      result.push(
        "Dataset quality is below 80%. Consider cleaning missing values."
      );
    }

    if (duplicateRows > 0) {
      result.push(
        "Duplicate records should be removed before analysis."
      );
    }

    if (duplicateRows === 0 && missingValues === 0) {
      result.push(
        "Dataset quality looks excellent."
      );
    }

    return result;
  }, [rows]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Dataset Insights
      </h2>

      <div className="mt-6 space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-800 bg-slate-800 p-4"
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}