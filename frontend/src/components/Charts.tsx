"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", leads: 120 },
  { month: "Feb", leads: 180 },
  { month: "Mar", leads: 260 },
  { month: "Apr", leads: 220 },
  { month: "May", leads: 340 },
  { month: "Jun", leads: 420 },
  { month: "Jul", leads: 510 },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Lead Growth
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="leads"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Monthly Performance
        </h2>

        <div className="flex h-80 items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-blue-500">
              94%
            </h1>

            <p className="mt-3 text-slate-400">
              Overall Conversion Efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}