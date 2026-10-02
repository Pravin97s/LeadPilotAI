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

    async function generateInsights() {
      setLoading(true);

      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `
You are an expert sales analyst.

Analyze the following sales dataset.

Dataset Summary:
- Total Rows: ${analytics.totalRows}
- Missing Values: ${analytics.missingValues}
- Duplicate Rows: ${analytics.duplicateRows}
- Total Revenue: ₹${analytics.totalRevenue}
- Average Revenue: ₹${analytics.averageRevenue}
- Highest Revenue: ₹${analytics.highestRevenue}
- Lowest Revenue: ₹${analytics.lowestRevenue}

Generate:

• Key business insights
• Data quality observations
• Sales trends
• Revenue opportunities
• Marketing recommendations

Return only short bullet points.
`,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          setInsights(["Failed to generate AI insights."]);
          return;
        }

        const lines = data.text
          .split("\n")
          .map((line: string) =>
            line.replace(/^[-*•0-9.]\s*/, "").trim()
          )
          .filter((line: string) => line.length > 0);

        setInsights(lines);
      } catch (error) {
        console.error(error);
        setInsights(["Unable to connect to Gemini API."]);
      } finally {
        setLoading(false);
      }
    }

    generateInsights();
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
            Gemini AI is analyzing your dataset...
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