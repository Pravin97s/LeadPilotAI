"use client";

import useAnalytics from "@/hooks/useAnalytics";

export default function AllInsights() {
  const analytics = useAnalytics();

  const insights: string[] = [];

  if (analytics.totalRows === 0) {
    insights.push("Upload a CSV file to generate insights.");
  } else {
    insights.push(
      `Dataset contains ${analytics.totalRows} total records.`
    );

    insights.push(
      `${analytics.completionRate}% of all fields are complete.`
    );

    insights.push(
      `${analytics.duplicateRows} duplicate records detected.`
    );

    insights.push(
      `${analytics.missingValues} missing values found.`
    );

    if (analytics.totalRevenue > 0) {
      insights.push(
        `Total revenue is ₹${analytics.totalRevenue.toLocaleString()}.`
      );

      insights.push(
        `Average revenue per record is ₹${analytics.averageRevenue.toFixed(
          2
        )}.`
      );

      insights.push(
        `Highest revenue is ₹${analytics.highestRevenue.toLocaleString()}.`
      );

      insights.push(
        `Lowest revenue is ₹${analytics.lowestRevenue.toLocaleString()}.`
      );
    }

    if (analytics.completionRate < 80) {
      insights.push(
        "Dataset quality is below 80%. Consider cleaning missing values."
      );
    }

    if (analytics.duplicateRows > 0) {
      insights.push(
        "Duplicate records should be removed before analysis."
      );
    }

    if (
      analytics.duplicateRows === 0 &&
      analytics.missingValues === 0
    ) {
      insights.push(
        "Dataset quality looks excellent."
      );
    }
  }

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