"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIPredictiveAnalytics() {
  const { rows, columnMapping } = useDashboard();

  const analytics = useMemo(() => {
    if (!rows.length) {
      return null;
    }

    const revenueColumn = columnMapping["Revenue"];
    const statusColumn = columnMapping["Status"];

    let totalRevenue = 0;
    let won = 0;

    rows.forEach((row) => {
      if (revenueColumn) {
        const revenue = Number(
          String(row[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        if (!isNaN(revenue)) {
          totalRevenue += revenue;
        }
      }

      if (statusColumn) {
        const status = String(
          row[statusColumn] ?? ""
        ).toLowerCase();

        if (
          status.includes("won") ||
          status.includes("converted") ||
          status.includes("closed")
        ) {
          won++;
        }
      }
    });

    const totalLeads = rows.length;

    const avgRevenue =
      totalLeads === 0
        ? 0
        : totalRevenue / totalLeads;

    const conversionRate =
      totalLeads === 0
        ? 0
        : (won / totalLeads) * 100;

    const predictedLeads = Math.round(
      totalLeads * 1.15
    );

    const predictedRevenue = Math.round(
      predictedLeads * avgRevenue
    );

    const growth = Math.round(
      ((predictedRevenue - totalRevenue) /
        Math.max(totalRevenue, 1)) *
        100
    );

    const confidence =
      conversionRate >= 70
        ? 94
        : conversionRate >= 50
        ? 88
        : conversionRate >= 30
        ? 80
        : 72;

    let trend = "Stable";

    if (growth > 10) {
      trend = "Growing";
    } else if (growth < 0) {
      trend = "Declining";
    }

    let recommendation =
      "Continue current marketing strategy.";

    if (conversionRate < 30) {
      recommendation =
        "Improve lead qualification to increase conversions.";
    } else if (avgRevenue < 5000) {
      recommendation =
        "Focus on acquiring higher-value customers.";
    } else if (growth > 20) {
      recommendation =
        "Increase marketing budget to sustain growth.";
    }

    return {
      totalRevenue,
      predictedRevenue,
      predictedLeads,
      avgRevenue,
      conversionRate,
      confidence,
      growth,
      trend,
      recommendation,
    };
  }, [rows, columnMapping]);

  if (!analytics) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          AI Predictive Analytics
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to generate AI predictions.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Predictive Analytics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Predicted Revenue
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹{analytics.predictedRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Predicted Leads
          </p>

          <h3 className="mt-3 text-3xl font-bold text-blue-400">
            {analytics.predictedLeads}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Revenue / Lead
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            ₹{Math.round(
              analytics.avgRevenue
            ).toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Conversion Rate
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            {analytics.conversionRate.toFixed(1)}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            AI Confidence
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            {analytics.confidence}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Growth Forecast
          </p>

          <h3
            className={`mt-3 text-3xl font-bold ${
              analytics.growth >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {analytics.growth}%
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-800 p-6">

        <h3 className="text-xl font-semibold">
          AI Business Forecast
        </h3>

        <p className="mt-4 text-slate-300">
          Trend:
          <span className="ml-2 font-bold text-blue-400">
            {analytics.trend}
          </span>
        </p>

        <p className="mt-3 text-slate-300">
          Recommendation:
        </p>

        <p className="mt-2 rounded-lg bg-slate-700 p-4">
          {analytics.recommendation}
        </p>

      </div>
    </section>
  );
}