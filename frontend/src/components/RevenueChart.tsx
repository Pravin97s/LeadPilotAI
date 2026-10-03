"use client";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
import { monthlyRevenue } from "@/utils/revenue";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function RevenueChart() {
  const { columnMapping } = useDashboard();

  const rows = useFilteredRows();

  const data = monthlyRevenue(
    rows,
    columnMapping["Date"] || "createdAt",
    columnMapping["Revenue"] || "value"
  );

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold">
          Monthly Revenue
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
        Monthly Revenue
      </h2>

      <div className="chart-frame mt-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={1}
          minHeight={260}
        >
          <LineChart data={data} margin={{ top: 8, right: 14, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" />

            <XAxis dataKey="month" tick={{ fill: "var(--muted)", fontSize: 12 }} />

            <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4c91ff"
              strokeWidth={3}
              dot={{ r: 3, fill: "#4c91ff" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
