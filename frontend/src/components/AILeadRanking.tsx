"use client";

import { useMemo } from "react";
import { Trophy } from "lucide-react";
import useDashboard from "@/hooks/useDashboard";

export default function AILeadRanking() {
  const {
    rows,
    columnMapping,
  } = useDashboard();

  const rankedLeads = useMemo(() => {
    const revenueColumn =
      columnMapping["Revenue"];

    const statusColumn =
      columnMapping["Status"];

    const sourceColumn =
      columnMapping["Source"];

    const leadColumn =
      columnMapping["Lead Name"];

    if (!leadColumn) return [];

    return rows
      .map((row) => {
        let score = 0;

        const revenue = Number(
          row[revenueColumn] ?? 0
        );

        if (revenue > 100000) score += 40;
        else if (revenue > 50000) score += 30;
        else if (revenue > 10000) score += 20;
        else score += 10;

        const status = String(
          row[statusColumn] ?? ""
        ).toLowerCase();

        if (
          status.includes("won") ||
          status.includes("converted")
        )
          score += 30;

        if (
          status.includes("qualified")
        )
          score += 20;

        const source = String(
          row[sourceColumn] ?? ""
        ).toLowerCase();

        if (
          source.includes("linkedin")
        )
          score += 15;

        if (
          source.includes("facebook")
        )
          score += 12;

        if (
          source.includes("google")
        )
          score += 10;

        return {
          name: String(
            row[leadColumn] ?? "Unknown"
          ),
          revenue,
          score,
          status,
          source,
        };
      })
      .sort(
        (a, b) => b.score - a.score
      )
      .slice(0, 10);
  }, [rows, columnMapping]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-400" />
        <h2 className="text-2xl font-bold">
          AI Lead Ranking
        </h2>
      </div>

      {rankedLeads.length === 0 ? (
        <p className="text-slate-400">
          Upload a CSV to view lead rankings.
        </p>
      ) : (
        <div className="space-y-3">
          {rankedLeads.map(
            (lead, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {lead.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {lead.status}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-400">
                    {lead.score}/100
                  </p>

                  <p className="text-xs text-slate-400">
                    ₹
                    {lead.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}