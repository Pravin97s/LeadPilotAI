"use client";

import { useMemo } from "react";
import { Trophy } from "lucide-react";
import useFilteredRows from "@/hooks/useFilteredRows";

export default function AILeadRanking() {
  const rows = useFilteredRows();

  const getValue = (
    row: Record<string, any>,
    keys: string[]
  ) => {
    for (const key of keys) {
      if (
        row[key] !== undefined &&
        row[key] !== null &&
        String(row[key]).trim() !== ""
      ) {
        return row[key];
      }
    }

    return "";
  };

  const rankedLeads = useMemo(() => {
    if (!rows.length) return [];

    return rows
      .map((row) => {
        const name = getValue(row, [
          "Lead Name",
          "Name",
          "Customer Name",
          "Customer",
          "Client",
          "Full Name",
        ]);

        const revenue = Number(
          String(
            getValue(row, [
              "Revenue",
              "Amount",
              "Sales",
              "Value",
            ])
          ).replace(/[^\d.-]/g, "")
        );

        const status = String(
          getValue(row, [
            "Status",
            "status",
          ])
        ).toLowerCase();

        const source = String(
          getValue(row, [
            "Source",
            "source",
          ])
        ).toLowerCase();

        let score = 20;

        if (revenue >= 200000) score += 40;
        else if (revenue >= 150000) score += 35;
        else if (revenue >= 100000) score += 25;
        else if (revenue >= 50000) score += 15;
        else if (revenue > 0) score += 8;

        if (
          status.includes("won") ||
          status.includes("closed")
        ) {
          score += 25;
        } else if (
          status.includes("qualified")
        ) {
          score += 18;
        } else if (
          status.includes("pending")
        ) {
          score += 10;
        }

        if (
          source.includes("linkedin")
        ) {
          score += 15;
        } else if (
          source.includes("facebook")
        ) {
          score += 10;
        } else if (
          source.includes("instagram")
        ) {
          score += 8;
        } else if (
          source.includes("website")
        ) {
          score += 6;
        }

        score = Math.min(score, 100);

        return {
          name: name || "Unknown Lead",
          revenue,
          status,
          source,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [rows]);

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          AI Lead Ranking
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to view AI rankings.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-400" />

        <h2 className="text-2xl font-bold">
          AI Lead Ranking
        </h2>
      </div>

      <div className="space-y-4">
        {rankedLeads.map((lead, index) => {
          const medal =
            index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : index === 2
              ? "🥉"
              : `#${index + 1}`;

          let badge = "Low";
          let color =
            "bg-orange-500";

          if (lead.score >= 90) {
            badge = "Excellent";
            color =
              "bg-green-500";
          } else if (
            lead.score >= 75
          ) {
            badge = "High";
            color =
              "bg-emerald-500";
          } else if (
            lead.score >= 60
          ) {
            badge = "Medium";
            color =
              "bg-yellow-500";
          } else if (
            lead.score >= 40
          ) {
            badge = "Fair";
            color =
              "bg-blue-500";
          }

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {medal}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {lead.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {lead.source ||
                      "Unknown Source"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {lead.status}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-green-400">
                  {lead.score}/100
                </p>

                <p className="text-sm text-slate-300">
                  ₹
                  {lead.revenue.toLocaleString()}
                </p>

                <span
                  className={`${color} mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold`}
                >
                  {badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}