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
  Settings,
  X,
} from "lucide-react";

const menus = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Upload, label: "Upload CSV", id: "upload" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: PieChart, label: "Charts", id: "charts" },
  { icon: Table2, label: "Leads", id: "leads" },
  { icon: Brain, label: "AI Insights", id: "insights" },
  { icon: Download, label: "Export", id: "export" },
  { icon: Settings, label: "Settings", id: "ai-dashboard-settings" },
];

export default function Sidebar({ open = false, onClose = () => {} }: { open?: boolean; onClose?: () => void }) {
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
    onClose();
  };

  return (
    <>
    <button aria-label="Close navigation" className={`sidebar-scrim ${open ? "is-visible" : ""}`} onClick={onClose} />
    <aside className={`app-sidebar ${open ? "is-open" : ""}`}>
      <div className="sidebar-brand-row"><div className="brand-mark">L</div><div><h1 className="text-xl font-bold">LeadPilot</h1><p className="brand-caption">AI workspace</p></div><button className="sidebar-close" aria-label="Close navigation" onClick={onClose}><X size={19}/></button></div>

      <p className="text-slate-400 text-sm mt-2">
        AI Sales Dashboard
      </p>

      <nav className="sidebar-nav mt-10 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              aria-current={active === item.id ? "page" : undefined}
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
    </>
  );
}
