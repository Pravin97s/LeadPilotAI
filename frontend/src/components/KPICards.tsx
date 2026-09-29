"use client";

import {
  Users,
  UserCheck,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    title: "Total Leads",
    value: "0",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Conversions",
    value: "0",
    icon: UserCheck,
    color: "text-green-400",
  },
  {
    title: "Revenue",
    value: "₹0",
    icon: IndianRupee,
    color: "text-yellow-400",
  },
  {
    title: "Growth",
    value: "0%",
    icon: TrendingUp,
    color: "text-purple-400",
  },
];

export default function KPICards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-card hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className="h-14 w-14 rounded-xl bg-slate-800 flex items-center justify-center">
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>
            </div>

            <div className="mt-6 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-blue-500"></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}