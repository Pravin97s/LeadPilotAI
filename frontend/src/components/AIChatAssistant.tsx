"use client";

import { useState } from "react";
import useDashboard from "@/hooks/useDashboard";
import type { CSVRow } from "@/types/csv";

function summarizeDataset(rows: CSVRow[], columnMapping: Record<string, string>) {
  const columns = Object.keys(rows[0] ?? {});
  const summaries = columns.map((column) => {
    const values = rows.map((row) => row[column]);
    const present = values.filter((value) => value !== null && value !== undefined && String(value).trim() !== "");
    const privateColumn = /(name|email|phone|mobile|address|contact|customer.?id|lead.?id)/i.test(column);
    if (privateColumn) return { column, kind: "private", count: present.length };
    const numbers = present.map((value) => {
      if (typeof value === "boolean") return Number.NaN;
      return Number(String(value).replace(/[^\d.-]/g, ""));
    });
    const numericValues = numbers.filter(Number.isFinite);
    const looksNumeric = present.length > 0 && numericValues.length >= Math.ceil(present.length * 0.8);

    if (looksNumeric) {
      const total = numericValues.reduce((sum, value) => sum + value, 0);
      return {
        column,
        kind: "number",
        count: numericValues.length,
        total: Number(total.toFixed(2)),
        average: Number((total / numericValues.length).toFixed(2)),
        minimum: Math.min(...numericValues),
        maximum: Math.max(...numericValues),
      };
    }

    if (/date|created|updated|time/i.test(column)) {
      const dates = present.map((value) => new Date(String(value))).filter((date) => Number.isFinite(date.getTime()));
      if (dates.length) {
        const times = dates.map((date) => date.getTime());
        return {
          column,
          kind: "date",
          count: dates.length,
          earliest: new Date(Math.min(...times)).toISOString().slice(0, 10),
          latest: new Date(Math.max(...times)).toISOString().slice(0, 10),
        };
      }
    }

    const counts = new Map<string, number>();
    present.forEach((value) => {
      const label = String(value).trim();
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    const distinctCount = counts.size;
    return {
      column,
      kind: "category",
      count: present.length,
      distinctCount,
      ...(distinctCount > 50
        ? {}
        : { mostCommon: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([value, count]) => ({ value, count })) }),
    };
  });

  return {
    totalRows: rows.length,
    columns,
    columnMapping,
    summaries,
    note: "This is aggregate data only. Names, emails, phone numbers, and row-level records are not included.",
  };
}

function answerExactDatasetQuestion(question: string, rows: CSVRow[], mapping: Record<string, string>): string | null {
  const query = question.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  const revenueColumn = mapping.Revenue;
  const sourceColumn = mapping.Source;
  const statusColumn = mapping.Status;
  const leadColumn = mapping["Lead Name"];
  const money = (value: number) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  const numberFrom = (value: unknown) => {
    const raw = String(value ?? "").trim();
    return raw ? Number(raw.replace(/[^\d.-]/g, "")) : Number.NaN;
  };

  if (rows.length && /\b(how many|number of|count|total)\b.*\b(leads?|rows?|records?)\b/.test(query)) {
    return `Your uploaded dataset contains ${rows.length.toLocaleString("en-IN")} leads.`;
  }
  if (rows.length && /\b(how many|number of|count|total)\b.*\b(columns?|headers?)\b/.test(query)) {
    return `Your uploaded dataset contains ${Object.keys(rows[0]).length} columns.`;
  }
  if (rows.length && /\b(average|avg|mean)\b.*\b(revenue|sales)\b/.test(query)) {
    if (!revenueColumn) return "I can't calculate average revenue because no Revenue column is mapped.";
    const values = rows.map((row) => numberFrom(row[revenueColumn])).filter(Number.isFinite);
    if (!values.length) return "There are no usable values in the mapped Revenue column.";
    return `Average revenue is ${money(values.reduce((sum, value) => sum + value, 0) / values.length)} across ${values.length.toLocaleString("en-IN")} records with a revenue value.`;
  }
  if (rows.length && /\b(total|sum|how much)\b.*\b(revenue|sales)\b|\b(revenue|sales)\b.*\b(total|overall)\b/.test(query)) {
    if (!revenueColumn) return "I can't calculate total revenue because no Revenue column is mapped.";
    const values = rows.map((row) => numberFrom(row[revenueColumn])).filter(Number.isFinite);
    if (!values.length) return "There are no usable values in the mapped Revenue column.";
    return `Total revenue is ${money(values.reduce((sum, value) => sum + value, 0))}, calculated from ${values.length.toLocaleString("en-IN")} records.`;
  }
  if (rows.length && /\b(top|best|most common|leading)\b.*\b(source|channel)\b/.test(query)) {
    if (!sourceColumn) return "I can't identify the top source because no Source column is mapped.";
    const counts = new Map<string, number>();
    rows.forEach((row) => {
      const source = String(row[sourceColumn] ?? "Unknown").trim() || "Unknown";
      counts.set(source, (counts.get(source) ?? 0) + 1);
    });
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0]} is the top source with ${top[1].toLocaleString("en-IN")} leads.` : "No source data is available.";
  }
  if (rows.length && /\b(conversion rate|converted leads?|won leads?)\b/.test(query)) {
    if (!statusColumn) return "I can't calculate conversion rate because no Status column is mapped.";
    const converted = rows.filter((row) => /won|converted|closed/i.test(String(row[statusColumn] ?? ""))).length;
    return `The conversion rate is ${((converted / rows.length) * 100).toFixed(1)}% (${converted.toLocaleString("en-IN")} of ${rows.length.toLocaleString("en-IN")} leads marked won, converted, or closed).`;
  }
  if (rows.length && /\b(highest|largest|maximum|top)\b.*\b(revenue|value|sale)\b.*\b(lead|customer|record)?\b|\bwhich lead\b.*\b(revenue|value)\b/.test(query)) {
    if (!revenueColumn || !leadColumn) return "I can't identify the highest-revenue lead because the Revenue and Lead Name columns must both be mapped.";
    const best = rows.reduce<CSVRow | null>((currentBest, row) => {
      const value = numberFrom(row[revenueColumn]);
      const bestValue = currentBest ? numberFrom(currentBest[revenueColumn]) : Number.NEGATIVE_INFINITY;
      return Number.isFinite(value) && value > bestValue ? row : currentBest;
    }, null);
    return best ? `${String(best[leadColumn] ?? "Unnamed lead")} has the highest revenue at ${money(numberFrom(best[revenueColumn]))}.` : "There are no usable values in the mapped Revenue column.";
  }
  if (rows.length && /\bmissing values?\b/.test(query)) {
    const missing = rows.reduce((total, row) => total + Object.values(row).filter((value) => value === null || value === undefined || String(value).trim() === "").length, 0);
    return `The dataset has ${missing.toLocaleString("en-IN")} missing cells across ${rows.length.toLocaleString("en-IN")} rows.`;
  }
  if (rows.length && /\bduplicate rows?\b/.test(query)) {
    const seen = new Set<string>();
    let duplicates = 0;
    rows.forEach((row) => {
      const key = JSON.stringify(row);
      if (seen.has(key)) duplicates++;
      else seen.add(key);
    });
    return `The dataset contains ${duplicates.toLocaleString("en-IN")} duplicate rows.`;
  }
  return null;
}

function simplifyAnswer(value: string) {
  return value
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(?:p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<(?:p|div|li|h[1-6])\b[^>]*>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, "")
    .replace(/^\s*\|\s*/gm, "")
    .replace(/\s*\|\s*/g, " · ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function AIChatAssistant() {
  const { rows, columnMapping } = useDashboard();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI(customQuestion?: string) {
    const query = (customQuestion ?? question).trim();
    if (!query || loading) return;

    const exactAnswer = answerExactDatasetQuestion(query, rows, columnMapping);
    if (exactAnswer) {
      setAnswer(exactAnswer);
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const datasetContext = summarizeDataset(rows, columnMapping);
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query, datasetContext }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The AI service could not answer right now.");
      }

      setAnswer(simplifyAnswer(result.text || "I couldn't generate an answer. Please try rephrasing your question."));
    } catch (error) {
      setAnswer(error instanceof Error ? error.message : "The AI service could not answer right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Chat Assistant
      </h2>
      <p className="mb-5 text-sm text-slate-400">Ask general questions or ask Groq to analyze the aggregate data in your uploaded CSV.</p>

      <div className="flex gap-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void askAI();
            }
          }}
          placeholder="Ask about your dataset..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
        />

        <button
          onClick={() => void askAI()}
          disabled={loading || !question.trim()}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          {loading ? "Thinking…" : "Ask AI"}
        </button>
      </div>

      <div className="mt-6 min-h-[100px] whitespace-pre-wrap break-words rounded-xl bg-slate-800 p-5 leading-7">
        {loading ? "Groq is thinking…" : answer || "Ask a question to begin."}
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
              void askAI(item);
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
