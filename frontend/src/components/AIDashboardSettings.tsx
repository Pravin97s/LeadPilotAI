"use client";

import { useState } from "react";
import {
  Moon,
  Zap,
  LayoutGrid,
  RotateCw,
  Trash2,
} from "lucide-react";

export default function AIDashboardSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [message, setMessage] = useState("");

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function refreshDashboard() {
    window.location.reload();
  }

  function resetDashboard() {
    if (
      !window.confirm(
        "Reset dashboard settings?"
      )
    ) {
      return;
    }

    setDarkMode(true);
    setAutoAnalyze(true);
    setCompactView(false);

    showMessage("Dashboard settings reset.");
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Dashboard Settings
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Moon className="text-blue-400" />
            <div>
              <p className="font-semibold">
                Dark Mode
              </p>
              <p className="text-sm text-slate-400">
                Enable dark dashboard theme
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400" />
            <div>
              <p className="font-semibold">
                Auto Analyze
              </p>
              <p className="text-sm text-slate-400">
                Analyze CSV immediately after upload
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={autoAnalyze}
            onChange={() =>
              setAutoAnalyze(!autoAnalyze)
            }
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <LayoutGrid className="text-green-400" />
            <div>
              <p className="font-semibold">
                Compact View
              </p>
              <p className="text-sm text-slate-400">
                Reduce dashboard spacing
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={compactView}
            onChange={() =>
              setCompactView(!compactView)
            }
            className="h-5 w-5"
          />
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-4">

        <button
          onClick={refreshDashboard}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
        >
          <RotateCw size={18} />
          Refresh Dashboard
        </button>

        <button
          onClick={resetDashboard}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
        >
          <Trash2 size={18} />
          Reset Settings
        </button>

      </div>

      {message && (
        <div className="mt-6 rounded-xl border border-green-600 bg-green-900/20 p-4 text-green-400">
          {message}
        </div>
      )}
    </section>
  );
}