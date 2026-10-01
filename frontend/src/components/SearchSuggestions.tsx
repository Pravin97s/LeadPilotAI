"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";
import useSearch from "@/hooks/useSearch";

export default function SearchSuggestions() {
  const { rows } = useDashboard();
  const { query, setQuery } = useSearch();

  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    const values = new Set<string>();

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        const text = String(value ?? "").trim();

        if (
          text &&
          text.toLowerCase().includes(search)
        ) {
          values.add(text);
        }
      });
    });

    return [...values].slice(0, 6);
  }, [rows, query]);

  if (!query.trim() || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 top-full mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden z-50">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => setQuery(item)}
          className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}