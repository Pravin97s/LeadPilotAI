"use client";

import { useState } from "react";
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
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Upload, label: "Upload CSV", id: "upload" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: PieChart, label: "Charts", id: "charts" },
  { icon: Table2, label: "Leads", id: "leads" },
  { icon: Brain, label: "AI Insights", id: "insights" },
  { icon: Download, label: "Export", id: "export" },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const handleClick = (id: string) => {
    setActive(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6 sticky top-0">
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
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                active === item.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
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