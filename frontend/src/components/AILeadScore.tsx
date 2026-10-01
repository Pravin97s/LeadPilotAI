"use client";

import useDashboard from "@/hooks/useDashboard";

export default function AILeadScore() {
  const { rows } = useDashboard();

  if (rows.length === 0) {
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

  const scoredRows = rows.map((row) => {
    let score = 50;

    const revenue = Number(row.Revenue ?? row.revenue ?? 0);

    const status = String(
      row.Status ?? row.status ?? ""
    ).toLowerCase();

    const source = String(
      row.Source ?? row.source ?? ""
    ).toLowerCase();

    if (revenue > 100000) score += 20;
    else if (revenue > 50000) score += 10;

    if (status === "won") score += 20;
    if (status === "pending") score += 10;
    if (status === "lost") score -= 15;

    if (source.includes("linkedin")) score += 10;
    if (source.includes("facebook")) score += 5;

    score = Math.max(0, Math.min(score, 100));

    return {
      ...row,
      score,
    };
  });

  const topLeads = [...scoredRows]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

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
                Name
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
            {topLeads.map((lead, index) => (
              <tr
                key={index}
                className="border-t border-slate-800"
              >
                <td className="px-4 py-3">
                  {String(
                    lead.Name ??
                      lead.name ??
                      "-"
                  )}
                </td>

                <td className="px-4 py-3">
                  {String(
                    lead.Source ??
                      lead.source ??
                      "-"
                  )}
                </td>

                <td className="px-4 py-3">
                  ₹
                  {String(
                    lead.Revenue ??
                      lead.revenue ??
                      "-"
                  )}
                </td>

                <td className="px-4 py-3">
                  {String(
                    lead.Status ??
                      lead.status ??
                      "-"
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-36 rounded-full bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${
                          lead.score >= 80
                            ? "bg-green-500"
                            : lead.score >= 60
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${lead.score}%`,
                        }}
                      />
                    </div>

                    <span className="font-bold">
                      {lead.score}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}