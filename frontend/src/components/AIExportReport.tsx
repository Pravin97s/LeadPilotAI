"use client";

import { Download } from "lucide-react";
import useDashboard from "@/hooks/useDashboard";
import {
  exportCSV,
  exportJSON,
  exportExcel,
} from "@/utils/exportReport";

export default function AIExportReport() {
  const { rows } = useDashboard();

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          AI Export Report
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to export reports.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Download className="text-blue-400" size={30} />

        <div>
          <h2 className="text-3xl font-bold">
            AI Export Report
          </h2>

          <p className="text-slate-400">
            Export your analyzed dataset in multiple formats.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <button
          onClick={() => exportCSV(rows)}
          className="rounded-xl bg-blue-600 p-5 font-semibold transition hover:bg-blue-700"
        >
          Export CSV
        </button>

        <button
          onClick={() => exportExcel(rows)}
          className="rounded-xl bg-green-600 p-5 font-semibold transition hover:bg-green-700"
        >
          Export Excel (.xlsx)
        </button>

        <button
          onClick={() => exportJSON(rows)}
          className="rounded-xl bg-purple-600 p-5 font-semibold transition hover:bg-purple-700"
        >
          Export JSON
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-slate-800 p-5">
        <h3 className="mb-3 text-xl font-semibold">
          Export Summary
        </h3>

        <ul className="space-y-2 text-slate-300">
          <li>• Total Records: {rows.length}</li>
          <li>• Available Formats: CSV, Excel, JSON</li>
          <li>• Export includes all uploaded columns</li>
          <li>• Excel report preserves tabular structure</li>
        </ul>
      </div>
    </section>
  );
}