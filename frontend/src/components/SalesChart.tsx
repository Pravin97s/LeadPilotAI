"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const salesData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 25000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 34000 },
  { month: "Jun", revenue: 41000 },
  { month: "Jul", revenue: 47000 },
  { month: "Aug", revenue: 53000 },
  { month: "Sep", revenue: 61000 },
  { month: "Oct", revenue: 69000 },
  { month: "Nov", revenue: 76000 },
  { month: "Dec", revenue: 85000 },
];

export default function SalesChart() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Sales Revenue
          </h2>

          <p className="text-slate-400 mt-1">
            Monthly Revenue Overview
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-3xl font-bold text-green-400">
            ₹8.5L
          </h3>

          <p className="text-sm text-green-500">
            +18.6%
          </p>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={salesData}>
            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}