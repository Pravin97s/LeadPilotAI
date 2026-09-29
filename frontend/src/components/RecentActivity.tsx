"use client";

import {
  UserPlus,
  FileSpreadsheet,
  BrainCircuit,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "CSV uploaded successfully",
    description: "sales_data.csv imported",
    time: "2 min ago",
    icon: FileSpreadsheet,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "AI generated new insights",
    description: "5 recommendations available",
    time: "5 min ago",
    icon: BrainCircuit,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "25 new leads added",
    description: "Lead database updated",
    time: "12 min ago",
    icon: UserPlus,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Campaign completed",
    description: "Email campaign finished",
    time: "25 min ago",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
];

export default function RecentActivity() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <Clock3
          size={22}
          className="text-slate-400"
        />
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b border-slate-800 pb-5 last:border-none last:pb-0"
            >
              <div className="rounded-xl bg-slate-800 p-3">
                <Icon
                  size={22}
                  className={activity.color}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="text-slate-400 mt-1 text-sm">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}