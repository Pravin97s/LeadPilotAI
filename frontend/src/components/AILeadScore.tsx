"use client";

import useDashboard from "@/hooks/useDashboard";

export default function AILeadScore() {
  const { rows } = useDashboard();

  if (rows.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold mb-4">
          AI Lead Scoring
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to generate AI lead scores.
        </p>
      </section>
    );
  }

  const getValue = (
    row: any,
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

  const scoredRows = rows.map((row) => {
    const revenue = Number(
      getValue(row, [
        "Revenue",
        "revenue",
        "Amount",
        "amount",
        "Sales",
      ])
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

    if (revenue > 180000) score += 40;
    else if (revenue > 120000) score += 30;
    else if (revenue > 70000) score += 20;
    else if (revenue > 30000) score += 10;

    if (status.includes("won"))
      score += 25;
    else if (status.includes("pending"))
      score += 12;
    else if (status.includes("lost"))
      score += 0;

    if (source.includes("linkedin"))
      score += 15;
    else if (source.includes("facebook"))
      score += 10;
    else if (source.includes("instagram"))
      score += 8;

    score = Math.min(score, 100);

    return {
      row,
      score,
    };
  });

  const topLeads = [...scoredRows]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-6">
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
                AI Rating
              </th>
            </tr>
          </thead>

          <tbody>

            {topLeads.map(({ row, score }, index) => {

              const name = getValue(row, [
                "Name",
                "name",
                "Customer",
                "customer",
                "Customer Name",
                "Lead Name",
                "Client",
                "Full Name",
              ]);

              const revenue = getValue(row, [
                "Revenue",
                "revenue",
                "Amount",
              ]);

              const status = getValue(row, [
                "Status",
                "status",
              ]);

              const source = getValue(row, [
                "Source",
                "source",
              ]);

              let badge = "Poor";
              let color = "bg-red-500";

              if (score >= 90) {
                badge = "Excellent";
                color = "bg-green-500";
              } else if (score >= 75) {
                badge = "High";
                color = "bg-emerald-500";
              } else if (score >= 60) {
                badge = "Medium";
                color = "bg-yellow-500";
              } else if (score >= 40) {
                badge = "Low";
                color = "bg-orange-500";
              }

              return (
                <tr
                  key={index}
                  className="border-t border-slate-800"
                >

                  <td className="px-4 py-3 font-medium">
                    {name || "Unknown Lead"}
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

                      <div className="w-36 h-2 rounded-full bg-slate-700">

                        <div
                          className={`${color} h-2 rounded-full`}
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>

                      <span className="font-semibold">
                        {score}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${color}`}
                      >
                        {badge}
                      </span>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </section>
  );
}