"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIDataQuality() {
  const { rows } = useDashboard();

  const stats = useMemo(() => {
    if (!rows.length) {
      return {
        score: 0,
        missing: 0,
        duplicates: 0,
        filled: 0,
        verdict: "Upload a dataset",
      };
    }

    const duplicateSet = new Set<string>();

    let duplicates = 0;
    let missing = 0;
    let total = 0;

    rows.forEach((row) => {
      const key = JSON.stringify(row);

      if (duplicateSet.has(key)) duplicates++;
      duplicateSet.add(key);

      Object.values(row).forEach((value) => {
        total++;

        if (
          value === null ||
          value === undefined ||
          String(value).trim() === ""
        ) {
          missing++;
        }
      });
    });

    const filled = ((total - missing) / total) * 100;

    let score =
      100 -
      duplicates * 2 -
      (missing / total) * 100;

    score = Math.max(0, Math.round(score));

    let verdict = "Poor";

    if (score >= 90) verdict = "Excellent";
    else if (score >= 75) verdict = "Good";
    else if (score >= 60) verdict = "Average";

    return {
      score,
      missing,
      duplicates,
      filled: filled.toFixed(1),
      verdict,
    };
  }, [rows]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Data Quality
      </h2>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Quality Score
          </p>

          <h3 className="mt-3 text-4xl font-bold">
            {stats.score}%
          </h3>

          <div className="mt-4 h-3 rounded-full bg-slate-700">
            <div
              className="h-3 rounded-full bg-green-500"
              style={{
                width: `${stats.score}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Missing Values
          </p>

          <h3 className="mt-4 text-4xl font-bold">
            {stats.missing}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Rows
          </p>

          <h3 className="mt-4 text-4xl font-bold">
            {stats.duplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Filled Cells
          </p>

          <h3 className="mt-4 text-4xl font-bold">
            {stats.filled}%
          </h3>

          <p className="mt-3 text-green-400 font-semibold">
            {stats.verdict}
          </p>
        </div>

      </div>
    </section>
  );
}