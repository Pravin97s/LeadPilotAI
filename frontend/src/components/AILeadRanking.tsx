"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

type RankedLead = {
  index: number;
  score: number;
  row: Record<string, any>;
};

export default function AILeadRanking() {
  const { rows } = useDashboard();

  const ranked = useMemo(() => {
    if (!rows.length) return [];

    return rows
      .map((row, index) => {
        let score = 50;

        Object.values(row).forEach((value) => {
          const text = String(value).toLowerCase();

          if (
            text.includes("won") ||
            text.includes("closed") ||
            text.includes("paid")
          )
            score += 20;

          if (
            text.includes("linkedin") ||
            text.includes("website")
          )
            score += 15;

          if (
            text.includes("facebook") ||
            text.includes("instagram")
          )
            score += 8;

          if (
            text.includes("cold") ||
            text.includes("lost")
          )
            score -= 15;
        });

        score = Math.max(0, Math.min(100, score));

        return {
          index,
          score,
          row,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [rows]);

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        Upload a CSV to rank leads.
      </div>
    );
  }

  const headers = Object.keys(rows[0]).slice(0, 3);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-bold mb-6">
        AI Lead Ranking
      </h2>

      <div className="overflow-auto rounded-xl border border-slate-800">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3">Rank</th>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
              <th className="px-4 py-3">
                AI Score
              </th>
            </tr>
          </thead>

          <tbody>
            {ranked.map((lead, i) => (
              <tr
                key={i}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="px-4 py-3 font-bold">
                  #{i + 1}
                </td>

                {headers.map((h) => (
                  <td key={h} className="px-4 py-3">
                    {String(lead.row[h])}
                  </td>
                ))}

                <td
                  className={`px-4 py-3 font-bold ${
                    lead.score >= 80
                      ? "text-green-400"
                      : lead.score >= 60
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {lead.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}