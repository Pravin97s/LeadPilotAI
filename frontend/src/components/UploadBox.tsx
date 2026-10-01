"use client";

import { Upload, CheckCircle2, Loader2 } from "lucide-react";
import useCSV from "@/hooks/useCSV";
import useDashboard from "@/hooks/useDashboard";

export default function UploadBox() {
  const { uploadCSV, loading, error } = useCSV();

  const {
    selectedFile,
    rows,
    headers,
    autoAnalyze,
  } = useDashboard();

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    uploadCSV(file);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">
        Upload CSV
      </h2>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-12 transition hover:border-blue-500">
        <Upload
          size={52}
          className="text-blue-500"
        />

        <p className="mt-4 text-lg font-semibold">
          Click to Upload CSV
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Supported format: .csv
        </p>

        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {loading && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-blue-950/40 p-4 text-blue-400">
          <Loader2
            className="animate-spin"
            size={22}
          />
          Parsing CSV...
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-950/40 p-4 text-red-400">
          {error}
        </div>
      )}

      {selectedFile && !loading && (
        <div className="mt-6 rounded-xl border border-green-700 bg-green-950/30 p-5">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={20} />
            <span className="font-semibold">
              Upload Successful
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-slate-400">
                File:
              </span>{" "}
              {selectedFile}
            </p>

            <p>
              <span className="text-slate-400">
                Rows:
              </span>{" "}
              {rows.length}
            </p>

            <p>
              <span className="text-slate-400">
                Columns:
              </span>{" "}
              {headers.length}
            </p>

            <p>
              <span className="text-slate-400">
                Auto Analyze:
              </span>{" "}
              <span
                className={
                  autoAnalyze
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {autoAnalyze
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}