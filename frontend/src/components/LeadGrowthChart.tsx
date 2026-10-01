"use client";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
import { generateMonthlyChart } from "@/utils/chartData";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function LeadGrowthChart() {
  const { columnMapping } = useDashboard();

  const rows = useFilteredRows();

  const data = generateMonthlyChart(
    rows,
    columnMapping["Date"] || "createdAt"
  );

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold">
          Monthly Lead Growth
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
        Monthly Lead Growth
      </h2>

      <div className="mt-6 h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.25}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}