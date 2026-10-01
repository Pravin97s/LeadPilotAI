"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIPredictiveAnalytics() {
  const { rows, columnMapping } = useDashboard();

  const prediction = useMemo(() => {
    if (!rows.length) {
      return {
        revenue: 0,
        leads: 0,
        growth: 0,
        conversion: 0,
        bestSource: "-",
        hotLeads: 0,
        coldLeads: 0,
        confidence: 0,
      };
    }

    const revenueColumn = columnMapping["Revenue"];
    const statusColumn = columnMapping["Status"];
    const sourceColumn = columnMapping["Source"];

    let totalRevenue = 0;
    let converted = 0;
    let hotLeads = 0;

    const sourceCount: Record<string, number> = {};

    rows.forEach((row) => {
      if (revenueColumn) {
        const revenue = Number(
          String(row[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        if (!isNaN(revenue)) {
          totalRevenue += revenue;

          if (revenue >= 50000) {
            hotLeads++;
          }
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
          converted++;
        }
      }

      if (sourceColumn) {
        const source = String(
          row[sourceColumn] ?? "Unknown"
        );

        sourceCount[source] =
          (sourceCount[source] || 0) + 1;
      }
    });

    const bestSource =
      Object.entries(sourceCount).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] ?? "-";

    const conversion = Number(
      ((converted / rows.length) * 100).toFixed(1)
    );

    const predictedRevenue = Math.round(
      totalRevenue * 1.12
    );

    const predictedLeads = Math.round(
      rows.length * 1.08
    );

    const growth = Number(
      (
        ((predictedRevenue - totalRevenue) /
          Math.max(totalRevenue, 1)) *
        100
      ).toFixed(1)
    );

    const confidence = Math.min(
      99,
      Math.round(
        60 +
          (rows.length / 100) * 20 +
          conversion / 5
      )
    );

    return {
      revenue: predictedRevenue,
      leads: predictedLeads,
      growth,
      conversion,
      bestSource,
      hotLeads,
      coldLeads: rows.length - hotLeads,
      confidence,
    };
  }, [rows, columnMapping]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Predictive Analytics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Predicted Revenue
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹{prediction.revenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Expected Leads
          </p>

          <h3 className="mt-3 text-3xl font-bold text-blue-400">
            {prediction.leads}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Growth Forecast
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            {prediction.growth}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Conversion Rate
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            {prediction.conversion}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Best Lead Source
          </p>

          <h3 className="mt-3 text-xl font-bold text-cyan-400">
            {prediction.bestSource}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Hot Leads
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            {prediction.hotLeads}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Cold Leads
          </p>

          <h3 className="mt-3 text-3xl font-bold text-orange-400">
            {prediction.coldLeads}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            AI Confidence
          </p>

          <h3 className="mt-3 text-3xl font-bold text-emerald-400">
            {prediction.confidence}%
          </h3>
        </div>
      </div>
    </section>
  );
}