"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import useAnalytics from "@/hooks/useAnalytics";

export default function AIInsights() {
  const analytics = useAnalytics();

  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    if (analytics.totalRows === 0) return;

    const controller = new AbortController();

    async function generateInsights() {
      setLoading(true);

      try {
        const res = await fetch("/api/insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ analytics }),
          signal: controller.signal,
        });

        const data = await res.json() as { insights?: unknown; error?: string };

        if (!res.ok || typeof data.insights !== "string") {
          setInsights([data.error || "Failed to generate AI insights."]);
          return;
        }

        const lines = data.insights
          .split("\n")
          .map((line: string) =>
            line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim()
          )
          .filter((line: string) => line.length > 0);

        setInsights(lines.length > 0 ? lines : ["No insights were returned. Please try again."]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error(error);
        setInsights(["Unable to connect to Groq. Check the server API key and try again."]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    generateInsights();

    return () => controller.abort();
  }, [analytics]);

  if (analytics.totalRows === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="text-blue-500" />
          AI Insights
        </h2>

        <p className="mt-6 text-slate-400">
          Upload a CSV file to generate AI-powered insights.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <Sparkles className="text-blue-500" />
        AI Insights
      </h2>

      {loading ? (
        <div className="space-y-3">
          <div className="h-10 animate-pulse rounded bg-slate-800" />
          <div className="h-10 animate-pulse rounded bg-slate-800" />
          <div className="h-10 animate-pulse rounded bg-slate-800" />
          <p className="text-slate-400">
            Groq is analyzing your dataset...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200"
            >
              • {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
