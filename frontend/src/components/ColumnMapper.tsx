"use client";

import { useDashboard } from "@/providers/DashboardProvider";

const requiredFields = [
  "Lead Name",
  "Email",
  "Phone",
  "Company",
  "Source",
];

export default function ColumnMapper() {
  const {
    headers,
    columnMapping,
    setColumnMapping,
  } = useDashboard();

  if (headers.length === 0) {
    return null;
  }

  function handleChange(
    field: string,
    value: string
  ) {
    setColumnMapping({
      ...columnMapping,
      [field]: value,
    });
  }

  const completed =
    Object.keys(columnMapping).length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Column Mapping
        </h2>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
          {completed}/{requiredFields.length}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {requiredFields.map((field) => (
          <div key={field}>
            <label className="mb-2 block font-medium">
              {field}
            </label>

            <select
              value={columnMapping[field] || ""}
              onChange={(e) =>
                handleChange(
                  field,
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
            >
              <option value="">
                Select CSV Column
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
        disabled={
          completed !== requiredFields.length
        }
        className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        Continue
      </button>
    </div>
  );
}