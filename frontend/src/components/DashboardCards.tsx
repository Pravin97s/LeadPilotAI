"use client";

import useAnalytics from "@/hooks/useAnalytics";
import { formatCurrency } from "@/utils";
import {
  Users,
  CheckCircle2,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function DashboardCards() {
  const analytics = useAnalytics();

  const cards = [
    {
      title: "Total Leads",
      value: analytics.totalRows,
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
      icon: CheckCircle2,
      color: "bg-green-600",
    },
    {
      title: "Revenue",
      value: formatCurrency(
        analytics.totalRevenue
      ),
      icon: IndianRupee,
      color: "bg-purple-600",
    },
    {
      title: "Duplicate Rows",
      value: analytics.duplicateRows,
      icon: TrendingUp,
      color: "bg-orange-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} rounded-xl p-3`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}