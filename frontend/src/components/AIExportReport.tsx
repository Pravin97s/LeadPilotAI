"use client";

import useDashboard from "@/hooks/useDashboard";

export default function AIExportReport() {
  const { rows } = useDashboard();

  const exportJSON = () => {
    if (!rows.length) return;

    const blob = new Blob(
      [JSON.stringify(rows, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "leadpilot-report.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!rows.length) return;

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) =>
            `"${String(row[header] ?? "")}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "leadpilot-report.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Export Report
      </h2>

      <p className="mb-6 text-slate-400">
        Download your analyzed dataset.
      </p>

      <div className="flex gap-4">
        <button
          onClick={exportCSV}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Export CSV
        </button>

        <button
          onClick={exportJSON}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
        >
          Export JSON
        </button>
      </div>
    </section>
  );
}