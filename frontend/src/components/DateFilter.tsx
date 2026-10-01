"use client";

import { useFilter } from "@/context/FilterContext";

export default function DateFilter() {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useFilter();

  return (
    <div className="flex gap-3">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
      />
    </div>
  );
}