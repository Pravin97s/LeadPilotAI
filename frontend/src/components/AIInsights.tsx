"use client";

import { Sparkles } from "lucide-react";
import useAnalytics from "@/hooks/useAnalytics";

export default function AIInsights() {
  const analytics = useAnalytics();

  if (analytics.totalRows === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="text-blue-500" />
          AI Insights
        </h2>

        <p className="mt-6 text-slate-400">
          Upload a CSV file to generate AI insights.
        </p>
      </section>
    );
  }

  const insights: string[] = [];

  insights.push(`Dataset contains ${analytics.totalRows} records.`);

  insights.push(
    `${analytics.totalColumns} columns were detected automatically.`
  );

  insights.push(
    `${analytics.completionRate}% of the dataset is complete.`
  );

  if (analytics.duplicateRows > 0) {
    insights.push(
      `${analytics.duplicateRows} duplicate rows detected.`
    );
  } else {
    insights.push("No duplicate rows detected.");
  }

  if (analytics.totalRevenue > 0) {
    insights.push(
      `Estimated total revenue is ₹${analytics.totalRevenue.toLocaleString()}.`
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <Sparkles className="text-blue-500" />
        AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}