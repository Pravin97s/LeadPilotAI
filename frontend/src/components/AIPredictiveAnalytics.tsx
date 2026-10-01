"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIPredictiveAnalytics() {
  const { rows } = useDashboard();

  const prediction = useMemo(() => {
    if (!rows.length) {
      return {
        revenue: 0,
        leads: 0,
        growth: 0,
        conversion: 0,
      };
    }

    const totalLeads = rows.length;

    const revenueColumn = Object.keys(rows[0]).find(
      (key) =>
        key.toLowerCase().includes("revenue") ||
        key.toLowerCase().includes("amount") ||
        key.toLowerCase().includes("price")
    );

    let totalRevenue = 0;

    if (revenueColumn) {
      rows.forEach((row) => {
        const value = Number(
          String(row[revenueColumn]).replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) {
          totalRevenue += value;
        }
      });
    }

    const predictedRevenue = Math.round(totalRevenue * 1.12);
    const predictedLeads = Math.round(totalLeads * 1.08);
    const predictedGrowth = 12;
    const predictedConversion = 78;

    return {
      revenue: predictedRevenue,
      leads: predictedLeads,
      growth: predictedGrowth,
      conversion: predictedConversion,
    };
  }, [rows]);

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
            Expected Conversion
          </p>

          <h3 className="mt-3 text-3xl font-bold text-purple-400">
            {prediction.conversion}%
          </h3>
        </div>
      </div>
    </section>
  );
}