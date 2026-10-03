"use client";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
import { statusChartData } from "@/utils/status";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ConversionChart() {
  const { columnMapping } = useDashboard();

  const rows = useFilteredRows();

  const data = statusChartData(
    rows,
    columnMapping["Status"] || "status"
  );

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold">
          Lead Status
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">
        Lead Status
      </h2>

      <div className="chart-frame mt-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={1}
          minHeight={260}
        >
          <BarChart data={data} margin={{ top: 8, right: 14, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" />

            <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12 }} />

            <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#4c91ff"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
