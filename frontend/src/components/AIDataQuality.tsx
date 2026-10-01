"use client";

import { useMemo } from "react";
import useFilteredRows from "@/hooks/useFilteredRows";

export default function AIDataQuality() {
  const rows = useFilteredRows();

  const stats = useMemo(() => {
    if (!rows.length) {
      return {
        score: 0,
        missing: 0,
        duplicates: 0,
        invalidEmails: 0,
        invalidPhones: 0,
        emptyRows: 0,
        filled: 0,
        verdict: "Upload a dataset",
        suggestions: [],
      };
    }

    const duplicateSet = new Set<string>();

    let duplicates = 0;
    let missing = 0;
    let totalCells = 0;
    let invalidEmails = 0;
    let invalidPhones = 0;
    let emptyRows = 0;

    rows.forEach((row) => {
      const key = JSON.stringify(row);

      if (duplicateSet.has(key)) {
        duplicates++;
      } else {
        duplicateSet.add(key);
      }

      let rowEmpty = true;

      Object.entries(row).forEach(([column, value]) => {
        totalCells++;

        const text = String(value ?? "").trim();

        if (text !== "") {
          rowEmpty = false;
        }

        if (text === "") {
          missing++;
        }

        const field = column.toLowerCase();

        if (field.includes("email") && text !== "") {
          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(text)) {
            invalidEmails++;
          }
        }

        if (
          (field.includes("phone") ||
            field.includes("mobile") ||
            field.includes("contact")) &&
          text !== ""
        ) {
          const digits = text.replace(/\D/g, "");

          if (digits.length < 10) {
            invalidPhones++;
          }
        }
      });

      if (rowEmpty) {
        emptyRows++;
      }
    });

    const filled =
      ((totalCells - missing) / totalCells) *
      100;

    let score =
      filled -
      duplicates * 2 -
      invalidEmails -
      invalidPhones;

    score = Math.max(
      0,
      Math.min(100, Math.round(score))
    );

    let verdict = "Poor";

    if (score >= 90) {
      verdict = "Excellent";
    } else if (score >= 75) {
      verdict = "Good";
    } else if (score >= 60) {
      verdict = "Average";
    }

    const suggestions: string[] = [];

    if (missing > 0) {
      suggestions.push(
        "Fill missing values to improve analysis."
      );
    }

    if (duplicates > 0) {
      suggestions.push(
        "Remove duplicate records."
      );
    }

    if (invalidEmails > 0) {
      suggestions.push(
        "Correct invalid email addresses."
      );
    }

    if (invalidPhones > 0) {
      suggestions.push(
        "Fix invalid phone numbers."
      );
    }

    if (
      suggestions.length === 0
    ) {
      suggestions.push(
        "Dataset looks clean and ready for AI analysis."
      );
    }

    return {
      score,
      missing,
      duplicates,
      invalidEmails,
      invalidPhones,
      emptyRows,
      filled: filled.toFixed(1),
      verdict,
      suggestions,
    };
  }, [rows]);

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          AI Data Quality
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to analyze data quality.
        </p>
      </section>
    );
  }

  const progressColor =
    stats.score >= 90
      ? "bg-green-500"
      : stats.score >= 70
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Data Quality
      </h2>

      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Quality Score
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {stats.score}%
          </h3>

          <div className="mt-4 h-3 rounded-full bg-slate-700">
            <div
              className={`h-3 rounded-full ${progressColor}`}
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

          <h3 className="mt-3 text-3xl font-bold">
            {stats.missing}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Rows
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {stats.duplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Invalid Emails
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {stats.invalidEmails}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Invalid Phones
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {stats.invalidPhones}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Filled Cells
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {stats.filled}%
          </h3>

          <p className="mt-2 font-semibold text-green-400">
            {stats.verdict}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-5">
        <h3 className="mb-4 text-xl font-semibold">
          AI Suggestions
        </h3>

        <ul className="space-y-3">
          {stats.suggestions.map(
            (item, index) => (
              <li
                key={index}
                className="flex gap-3"
              >
                <span>✅</span>
                <span>{item}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}