"use client";

import { useFilter } from "@/context/FilterContext";

export default function RevenueFilter() {
  const {
    minRevenue,
    maxRevenue,
    setMinRevenue,
    setMaxRevenue,
  } = useFilter();

  return (
    <div className="flex gap-3">
      <input
        type="number"
        placeholder="Min Revenue"
        value={minRevenue}
        onChange={(e) =>
          setMinRevenue(Number(e.target.value))
        }
        className="w-40 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
      />

      <input
        type="number"
        placeholder="Max Revenue"
        value={maxRevenue}
        onChange={(e) =>
          setMaxRevenue(Number(e.target.value))
        }
        className="w-40 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
      />
    </div>
  );
}