"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";
import { useFilter } from "@/context/FilterContext";

export default function SearchSuggestions() {
  const { rows } = useDashboard();

  const { search, setSearch } = useFilter();

  const suggestions = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return [];

    const values = new Set<string>();

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        const text = String(value ?? "").trim();

        if (
          text &&
          text.toLowerCase().includes(searchText)
        ) {
          values.add(text);
        }
      });
    });

    return [...values].slice(0, 6);
  }, [rows, search]);

  if (!search.trim() || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => setSearch(item)}
          className="w-full px-4 py-3 text-left transition hover:bg-slate-800"
        >
          {item}
        </button>
      ))}
    </div>
  );
}