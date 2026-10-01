"use client";

import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  Zap,
  Grid2X2,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

export default function AIDashboardSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAuto = localStorage.getItem("autoAnalyze");
    const savedCompact = localStorage.getItem("compactView");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    if (savedAuto !== null) {
      setAutoAnalyze(savedAuto === "true");
    }

    if (savedCompact !== null) {
      setCompactView(savedCompact === "true");
    }
  }, []);

  function toggleDark() {
    const value = !darkMode;
    setDarkMode(value);

    if (value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function toggleAutoAnalyze() {
    const value = !autoAnalyze;
    setAutoAnalyze(value);
    localStorage.setItem("autoAnalyze", String(value));
  }

  function toggleCompactView() {
    const value = !compactView;
    setCompactView(value);
    localStorage.setItem("compactView", String(value));

    window.dispatchEvent(
      new CustomEvent("compact-view", {
        detail: value,
      })
    );
  }

  function refreshDashboard() {
    window.dispatchEvent(new Event("refresh-dashboard"));
  }

  function resetDashboard() {
    if (!confirm("Reset all dashboard settings?")) return;

    localStorage.removeItem("theme");
    localStorage.removeItem("autoAnalyze");
    localStorage.removeItem("compactView");

    document.documentElement.classList.add("dark");

    setDarkMode(true);
    setAutoAnalyze(true);
    setCompactView(false);

    window.dispatchEvent(new Event("reset-dashboard"));
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-4xl font-bold text-white">
        AI Dashboard Settings
      </h2>

      <div className="space-y-5">
        <SettingCard
          icon={
            darkMode ? (
              <Moon className="h-6 w-6 text-blue-400" />
            ) : (
              <Sun className="h-6 w-6 text-yellow-400" />
            )
          }
          title="Dark Mode"
          description="Enable dark dashboard theme"
          checked={darkMode}
          onChange={toggleDark}
        />

        <SettingCard
          icon={<Zap className="h-6 w-6 text-yellow-400" />}
          title="Auto Analyze"
          description="Analyze CSV immediately after upload"
          checked={autoAnalyze}
          onChange={toggleAutoAnalyze}
        />

        <SettingCard
          icon={<Grid2X2 className="h-6 w-6 text-green-400" />}
          title="Compact View"
          description="Reduce dashboard spacing"
          checked={compactView}
          onChange={toggleCompactView}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={refreshDashboard}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Dashboard
        </button>

        <button
          onClick={resetDashboard}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <RotateCcw className="h-5 w-5" />
          Reset Settings
        </button>
      </div>
    </div>
  );
}

type SettingCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function SettingCard({
  icon,
  title,
  description,
  checked,
  onChange,
}: SettingCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">
      <div className="flex items-center gap-4">
        {icon}

        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          <p className="text-sm text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}