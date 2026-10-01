"use client";

import { useMemo } from "react";
import useFilteredRows from "@/hooks/useFilteredRows";

export default function AILeadScore() {
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

  const topLeads = useMemo(() => {
    if (!rows.length) return [];

    return rows
      .map((row) => {
        const revenue = Number(
          String(
            getValue(row, [
              "Revenue",
              "revenue",
              "Amount",
              "amount",
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
          row,
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
          AI Lead Scoring
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to generate AI lead scores.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        AI Lead Scoring
      </h2>

      <div className="overflow-auto rounded-xl border border-slate-800">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left">
                Lead
              </th>

              <th className="px-4 py-3 text-left">
                Source
              </th>

              <th className="px-4 py-3 text-left">
                Revenue
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                AI Score
              </th>
            </tr>
          </thead>

          <tbody>
            {topLeads.map(
              ({ row, score }, index) => {
                const name = getValue(row, [
                  "Name",
                  "Lead Name",
                  "Customer",
                  "Client",
                  "Full Name",
                ]);

                const revenue =
                  getValue(row, [
                    "Revenue",
                    "Amount",
                  ]);

                const status =
                  getValue(row, [
                    "Status",
                  ]);

                const source =
                  getValue(row, [
                    "Source",
                  ]);

                let badge = "Low";
                let color =
                  "bg-orange-500";

                if (score >= 90) {
                  badge = "Excellent";
                  color =
                    "bg-green-500";
                } else if (
                  score >= 75
                ) {
                  badge = "High";
                  color =
                    "bg-emerald-500";
                } else if (
                  score >= 60
                ) {
                  badge = "Medium";
                  color =
                    "bg-yellow-500";
                } else if (
                  score >= 40
                ) {
                  badge = "Fair";
                  color =
                    "bg-blue-500";
                }

                return (
                  <tr
                    key={index}
                    className="border-t border-slate-800"
                  >
                    <td className="px-4 py-3 font-medium">
                      {name ||
                        "Unknown Lead"}
                    </td>

                    <td className="px-4 py-3">
                      {source}
                    </td>

                    <td className="px-4 py-3">
                      ₹{revenue}
                    </td>

                    <td className="px-4 py-3">
                      {status}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-36 rounded-full bg-slate-700">
                          <div
                            className={`${color} h-2 rounded-full`}
                            style={{
                              width: `${score}%`,
                            }}
                          />
                        </div>

                        <span className="w-10 font-bold">
                          {score}
                        </span>

                        <span
                          className={`${color} rounded-full px-3 py-1 text-xs font-semibold`}
                        >
                          {badge}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}