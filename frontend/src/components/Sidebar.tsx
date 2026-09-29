"use client";

import {
  LayoutDashboard,
  Upload,
  BarChart3,
  PieChart,
  Table2,
  Brain,
  Download,
} from "lucide-react";

const menus = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: Upload,
    label: "Upload CSV",
  },
  {
    icon: BarChart3,
    label: "Analytics",
  },
  {
    icon: PieChart,
    label: "Charts",
  },
  {
    icon: Table2,
    label: "Leads",
  },
  {
    icon: Brain,
    label: "AI Insights",
  },
  {
    icon: Download,
    label: "Export",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-blue-500">
        LeadPilot AI
      </h1>

      <p className="text-slate-400 text-sm mt-2">
        AI Sales Dashboard
      </p>

      <nav className="mt-10 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-slate-800 transition"
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}