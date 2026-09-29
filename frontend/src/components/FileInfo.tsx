"use client";

import { FileText } from "lucide-react";
import { useDashboard } from "@/providers/DashboardProvider";

export default function FileInfo() {
  const { rows, selectedFile } = useDashboard();

  const totalRows = rows.length;
  const totalColumns = rows.length > 0 ? Object.keys(rows[0]).length : 0;
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-blue-500" size={28} />
        <h2 className="text-xl font-semibold">Uploaded File</h2>
      </div>

      {selectedFile ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">File Name</p>
            <p className="text-lg font-medium text-white">
              {selectedFile}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Rows</p>
              <p className="mt-1 text-2xl font-bold">
                {totalRows}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Columns</p>
              <p className="mt-1 text-2xl font-bold">
                {totalColumns}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400 mb-2">
              Headers
            </p>

            <div className="flex flex-wrap gap-2">
              {headers.map((header) => (
                <span
                  key={header}
                  className="rounded-full bg-blue-600/20 border border-blue-500 px-3 py-1 text-sm text-blue-300"
                >
                  {header}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-700">
          <div className="text-center">
            <FileText
              size={50}
              className="mx-auto text-slate-500"
            />
            <p className="mt-4 text-lg font-medium text-slate-300">
              No CSV Uploaded
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Upload a CSV file to view its details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}