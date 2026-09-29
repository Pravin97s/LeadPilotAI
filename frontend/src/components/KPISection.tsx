"use client";

import useAnalytics from "@/hooks/useAnalytics";
import { formatCurrency } from "@/utils";

export default function KPISection() {
  const analytics = useAnalytics();

  const items = [
    {
      title: "Total Rows",
      value: analytics.totalRows,
    },
    {
      title: "Total Columns",
      value: analytics.totalColumns,
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
    },
    {
      title: "Missing Values",
      value: analytics.missingValues,
    },
    {
      title: "Duplicate Rows",
      value: analytics.duplicateRows,
    },
    {
      title: "Average Revenue",
      value: formatCurrency(
        analytics.averageRevenue
      ),
    },
    {
      title: "Highest Revenue",
      value: formatCurrency(
        analytics.highestRevenue
      ),
    },
    {
      title: "Lowest Revenue",
      value: formatCurrency(
        analytics.lowestRevenue
      ),
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        KPI Overview
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-slate-800 p-5"
          >
            <p className="text-sm text-slate-400">
              {item.title}
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}