"use client";

import { useState } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIChatAssistant() {
  const { rows, columnMapping } = useDashboard();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI(customQuestion?: string) {
    const query = (customQuestion ?? question)
      .trim()
      .toLowerCase();

    if (!rows.length) {
      setAnswer("Please upload a CSV file first.");
      return;
    }

    const revenueColumn = columnMapping["Revenue"];
    const sourceColumn = columnMapping["Source"];
    const statusColumn = columnMapping["Status"];
    const leadColumn = columnMapping["Lead Name"];

    if (
      query.includes("rows") ||
      query.includes("records") ||
      query.includes("leads")
    ) {
      setAnswer(`Your dataset contains ${rows.length} leads.`);
      return;
    }

    if (
      query.includes("columns") ||
      query.includes("headers")
    ) {
      setAnswer(
        `Your dataset contains ${
          Object.keys(rows[0]).length
        } columns.`
      );
      return;
    }

    if (
      query.includes("revenue") ||
      query.includes("sales")
    ) {
      if (!revenueColumn) {
        setAnswer("Revenue column is not mapped.");
        return;
      }

      let total = 0;

      rows.forEach((row) => {
        const value = Number(
          String(row[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) {
          total += value;
        }
      });

      setAnswer(
        `Total revenue is ₹${total.toLocaleString()}.`
      );
      return;
    }

    if (
      query.includes("average revenue")
    ) {
      if (!revenueColumn) {
        setAnswer("Revenue column is not mapped.");
        return;
      }

      let total = 0;

      rows.forEach((row) => {
        const value = Number(
          String(row[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) {
          total += value;
        }
      });

      const avg = total / rows.length;

      setAnswer(
        `Average revenue is ₹${avg.toFixed(2)}.`
      );

      return;
    }

    if (
      query.includes("top source") ||
      query.includes("best source")
    ) {
      if (!sourceColumn) {
        setAnswer("Source column is not mapped.");
        return;
      }

      const counts: Record<string, number> = {};

      rows.forEach((row) => {
        const source = String(
          row[sourceColumn] ?? "Unknown"
        );

        counts[source] =
          (counts[source] || 0) + 1;
      });

      const best = Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )[0];

      setAnswer(
        `${best[0]} generated ${best[1]} leads.`
      );

      return;
    }

    if (
      query.includes("conversion")
    ) {
      if (!statusColumn) {
        setAnswer("Status column is not mapped.");
        return;
      }

      let converted = 0;

      rows.forEach((row) => {
        const status = String(
          row[statusColumn] ?? ""
        ).toLowerCase();

        if (
          status.includes("won") ||
          status.includes("converted") ||
          status.includes("closed")
        ) {
          converted++;
        }
      });

      const rate = (
        (converted / rows.length) *
        100
      ).toFixed(1);

      setAnswer(
        `Current conversion rate is ${rate}%.`
      );

      return;
    }

    if (
      query.includes("highest revenue")
    ) {
      if (!revenueColumn || !leadColumn) {
        setAnswer("Required columns are not mapped.");
        return;
      }

      const best = rows.reduce((prev, current) => {
        const prevRevenue = Number(
          String(prev[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        const currentRevenue = Number(
          String(current[revenueColumn] ?? "").replace(/[^\d.-]/g, "")
        );

        return currentRevenue > prevRevenue
          ? current
          : prev;
      });

      setAnswer(
        `${best[leadColumn]} has the highest revenue of ₹${Number(
          String(best[revenueColumn]).replace(/[^\d.-]/g, "")
        ).toLocaleString()}.`
      );

      return;
    }

    setAnswer(
      "I couldn't understand that question. Try asking about leads, revenue, conversion, top source, highest revenue, or columns."
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Chat Assistant
      </h2>

      <div className="flex gap-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askAI();
            }
          }}
          placeholder="Ask about your dataset..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
        />

        <button
          onClick={() => askAI()}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Ask AI
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-slate-800 p-5 min-h-[100px]">
        {answer || "Ask a question to begin."}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {[
          "How many leads?",
          "Total revenue",
          "Average revenue",
          "Top source",
          "Conversion rate",
          "Highest revenue",
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setQuestion(item);
              askAI(item);
            }}
            className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}