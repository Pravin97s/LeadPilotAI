"use client";

import { useState } from "react";
import useDashboard from "@/hooks/useDashboard";

export default function AIChatAssistant() {
  const { rows } = useDashboard();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {
    if (!rows.length) {
      setAnswer("Please upload a CSV file first.");
      return;
    }

    const q = question.toLowerCase();

    if (q.includes("rows") || q.includes("records")) {
      setAnswer(`Dataset contains ${rows.length} records.`);
      return;
    }

    if (q.includes("columns")) {
      setAnswer(
        `Dataset contains ${
          Object.keys(rows[0]).length
        } columns.`
      );
      return;
    }

    if (q.includes("revenue")) {
      const revenueKey = Object.keys(rows[0]).find(
        key =>
          key.toLowerCase().includes("revenue") ||
          key.toLowerCase().includes("amount")
      );

      if (!revenueKey) {
        setAnswer("Revenue column not found.");
        return;
      }

      let total = 0;

      rows.forEach(row => {
        const value = Number(
          String(row[revenueKey]).replace(/[^\d.-]/g, "")
        );

        if (!isNaN(value)) total += value;
      });

      setAnswer(
        `Total revenue is ₹${total.toLocaleString()}.`
      );

      return;
    }

    if (q.includes("duplicate")) {
      const unique = new Set(
        rows.map(r => JSON.stringify(r))
      );

      setAnswer(
        `${rows.length - unique.size} duplicate rows found.`
      );

      return;
    }

    if (q.includes("source")) {
      const sourceKey = Object.keys(rows[0]).find(key =>
        key.toLowerCase().includes("source")
      );

      if (!sourceKey) {
        setAnswer("Source column not found.");
        return;
      }

      const counts: Record<string, number> = {};

      rows.forEach(row => {
        const source = String(row[sourceKey]);

        counts[source] = (counts[source] || 0) + 1;
      });

      const best = Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )[0];

      setAnswer(
        `${best[0]} is the top lead source with ${best[1]} leads.`
      );

      return;
    }

    setAnswer(
      "Sorry, I don't understand that question yet."
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
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about your dataset..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
        />

        <button
          onClick={askAI}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Ask AI
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-slate-800 p-5 min-h-[90px]">
        {answer || "Ask a question to begin."}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setQuestion("How many rows?");
            setTimeout(askAI, 0);
          }}
          className="rounded-lg bg-slate-700 px-4 py-2"
        >
          Rows
        </button>

        <button
          onClick={() => {
            setQuestion("Total revenue");
            setTimeout(askAI, 0);
          }}
          className="rounded-lg bg-slate-700 px-4 py-2"
        >
          Revenue
        </button>

        <button
          onClick={() => {
            setQuestion("Duplicate rows");
            setTimeout(askAI, 0);
          }}
          className="rounded-lg bg-slate-700 px-4 py-2"
        >
          Duplicates
        </button>

        <button
          onClick={() => {
            setQuestion("Top source");
            setTimeout(askAI, 0);
          }}
          className="rounded-lg bg-slate-700 px-4 py-2"
        >
          Top Source
        </button>
      </div>
    </section>
  );
}