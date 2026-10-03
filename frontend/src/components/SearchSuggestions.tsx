"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";
import { useFilter } from "@/context/FilterContext";
import { useSettings } from "@/context/SettingsContext";

export default function SearchSuggestions() {
  const { rows } = useDashboard();

  const { search, setSearch } = useFilter();
  const { darkMode } = useSettings();

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
    <div className={`absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-xl ${darkMode ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => setSearch(item)}
          className={`w-full px-4 py-3 text-left transition ${darkMode ? "text-slate-100 hover:bg-slate-800" : "text-slate-900 hover:bg-slate-100"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
