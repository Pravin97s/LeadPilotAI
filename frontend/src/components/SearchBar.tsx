"use client";

import { useFilter } from "@/context/FilterContext";

export default function SearchBar() {
  const { search, setSearch } = useFilter();

  return (
    <input
      type="text"
      placeholder="Search leads..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
    />
  );
}