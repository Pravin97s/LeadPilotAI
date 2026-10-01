"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { CSVRow } from "@/types/csv";

type SearchContextType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredRows: CSVRow[];
};

const SearchContext = createContext<SearchContextType | null>(null);

function normalize(text: string) {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { rows } = useDashboard();

  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const searchTerm = normalize(query);

    if (!searchTerm) {
      return rows;
    }

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        normalize(String(value ?? "")).includes(searchTerm)
      )
    );
  }, [rows, query]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filteredRows,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used inside SearchProvider"
    );
  }

  return context;
}