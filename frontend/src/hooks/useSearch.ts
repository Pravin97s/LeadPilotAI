"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { globalSearch } from "@/utils/search";

export default function useSearch() {
  const { rows } = useDashboard();

  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    return globalSearch(rows, query);
  }, [rows, query]);

  return {
    query,
    setQuery,
    filteredRows,
  };
}