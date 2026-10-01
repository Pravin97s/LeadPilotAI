"use client";

import SearchBar from "./SearchBar";
import SourceFilter from "./SourceFilter";
import StatusFilter from "./StatusFilter";
import DateFilter from "./DateFilter";
import RevenueFilter from "./RevenueFilter";
import { useFilter } from "@/context/FilterContext";

export default function DashboardFilters() {
  const {
    clearFilters,
    company,
    setCompany,
  } = useFilter();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Dashboard Filters
        </h2>

        <button
          onClick={clearFilters}
          className="rounded-xl bg-red-600 px-5 py-2 font-semibold transition hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SearchBar />

        <SourceFilter />

        <StatusFilter />

        <DateFilter />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
        />

        <RevenueFilter />
      </div>
    </section>
  );
}