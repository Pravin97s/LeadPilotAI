"use client";

import SearchBar from "./SearchBar";
import SourceFilter from "./SourceFilter";
import StatusFilter from "./StatusFilter";
import DateFilter from "./DateFilter";
import RevenueFilter from "./RevenueFilter";
import { useFilter } from "@/context/FilterContext";

export default function DashboardFilters() {
  const { clearFilters } = useFilter();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Dashboard Filters
        </h2>

        <button
          onClick={clearFilters}
          className="rounded-xl bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <SearchBar />
        <SourceFilter />
        <StatusFilter />
        <DateFilter />
        <RevenueFilter />
      </div>
    </section>
  );
}