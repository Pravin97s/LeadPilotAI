"use client";

import useDashboard from "@/hooks/useDashboard";
import aiSummary from "@/utils/aiSummary";

export default function AISummary() {
  const { rows } = useDashboard();

  const summary = aiSummary(rows);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-2xl font-bold">
        🤖 AI Lead Summary
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>Total Leads</div>
        <div>{summary.totalLeads}</div>

        <div>Total Revenue</div>
        <div>
          ₹
          {summary.totalRevenue.toLocaleString()}
        </div>

        <div>Average Revenue</div>
        <div>
          ₹
          {summary.averageRevenue.toLocaleString()}
        </div>

        <div>Best Source</div>
        <div>{summary.bestSource}</div>

        <div>Highest Revenue Lead</div>
        <div>{summary.highestLead}</div>
      </div>

      <div className="mt-6 rounded-xl bg-blue-950 p-4">
        <p className="font-semibold">
          💡 AI Recommendation
        </p>

        <p className="mt-2 text-slate-300">
          {summary.recommendation}
        </p>
      </div>
    </section>
  );
}