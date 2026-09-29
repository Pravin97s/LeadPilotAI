"use client";

import { Download } from "lucide-react";

type ExportButtonProps = {
  data: Record<string, any>[];
  fileName?: string;
};

export default function ExportButton({
  data,
  fileName = "leadpilot-data.csv",
}: ExportButtonProps) {
  const exportCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) =>
            JSON.stringify(row[header] ?? "")
          )
          .join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      disabled={data.length === 0}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
    >
      <Download size={18} />
      Export CSV
    </button>
  );
}