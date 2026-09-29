"use client";

import { Upload } from "lucide-react";
import useCSV from "@/hooks/useCSV";

export default function UploadBox() {
  const { uploadCSV, loading, error } = useCSV();

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    uploadCSV(file);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">
        Upload CSV
      </h2>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-12 transition hover:border-blue-500">
        <Upload
          size={50}
          className="text-blue-500"
        />

        <p className="mt-4 text-lg font-medium">
          Click to Upload CSV
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Supported format: .csv
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {loading && (
        <p className="mt-4 text-blue-400">
          Uploading...
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}