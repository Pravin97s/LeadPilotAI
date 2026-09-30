"use client";

import { useDashboard } from "@/providers/DashboardProvider";

interface Props {
  onContinue: () => void;
}

const requiredFields = [
  "Name",
  "Email",
  "Phone",
  "Company",
  "Revenue",
  "Status",
];

export default function ColumnMapper({
  onContinue,
}: Props) {
  const {
    headers,
    columnMapping,
    setColumnMapping,
  } = useDashboard();

  function handleChange(
    field: string,
    value: string
  ) {
    setColumnMapping({
      ...columnMapping,
      [field]: value,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Map CSV Columns
      </h2>

      <p className="mt-2 text-slate-400">
        Select which CSV column corresponds
        to each field.
      </p>

      <div className="mt-6 space-y-5">
        {requiredFields.map((field) => (
          <div
            key={field}
            className="flex items-center justify-between gap-4"
          >
            <span className="font-medium w-36">
              {field}
            </span>

            <select
              value={
                columnMapping[field] ?? ""
              }
              onChange={(e) =>
                handleChange(
                  field,
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <option value="">
                Select column
              </option>

              {headers.map((header) => (
                <option
                  key={header}
                  value={header}
                >
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={onContinue}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}