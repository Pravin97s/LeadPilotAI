"use client";

import { RotateCcw, Settings } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AIDashboardSettings() {
  const {
    darkMode,
    compactView,
    animations,
    autoRefresh,
    setDarkMode,
    setCompactView,
    setAnimations,
    setAutoRefresh,
    resetSettings,
  } = useSettings();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-8 flex items-center gap-3">
        <Settings className="text-blue-400" size={30} />

        <div>
          <h2 className="text-3xl font-bold">
            Dashboard Settings
          </h2>

          <p className="text-slate-400">
            Customize your dashboard experience.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <SettingRow
          title="Dark Mode"
          value={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />

        <SettingRow
          title="Compact View"
          value={compactView}
          onChange={() =>
            setCompactView(!compactView)
          }
        />

        <SettingRow
          title="Animations"
          value={animations}
          onChange={() =>
            setAnimations(!animations)
          }
        />

        <SettingRow
          title="Auto Refresh"
          value={autoRefresh}
          onChange={() =>
            setAutoRefresh(!autoRefresh)
          }
        />

      </div>

      <button
        onClick={resetSettings}
        className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
      >
        <RotateCcw size={18} />
        Reset Settings
      </button>
    </section>
  );
}

function SettingRow({
  title,
  value,
  onChange,
}: {
  title: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">
      <span className="font-medium">
        {title}
      </span>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          value
            ? "bg-green-500"
            : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            value
              ? "left-8"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}