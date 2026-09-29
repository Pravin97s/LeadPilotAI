"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
  color?: string;
};

export default function MetricCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
  color = "text-blue-500",
}: MetricCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl bg-slate-800 ${color}`}>
          <Icon size={24} />
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            positive ? "text-green-400" : "text-red-400"
          }`}
        >
          {positive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {change}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            positive
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          style={{
            width: positive ? "82%" : "35%",
          }}
        />
      </div>
    </div>
  );
}