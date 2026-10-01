"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface FilterContextType {
  search: string;
  setSearch: (value: string) => void;

  source: string;
  setSource: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  company: string;
  setCompany: (value: string) => void;

  minRevenue: number;
  setMinRevenue: (value: number) => void;

  maxRevenue: number;
  setMaxRevenue: (value: number) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  clearFilters: () => void;
}

const FilterContext =
  createContext<FilterContextType | null>(null);

export function FilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const [source, setSource] = useState("");

  const [status, setStatus] = useState("");

  const [company, setCompany] = useState("");

  const [minRevenue, setMinRevenue] =
    useState(0);

  const [maxRevenue, setMaxRevenue] =
    useState(100000000);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  function clearFilters() {
    setSearch("");
    setSource("");
    setStatus("");
    setCompany("");
    setMinRevenue(0);
    setMaxRevenue(100000000);
    setStartDate("");
    setEndDate("");
  }

  const value = useMemo(
    () => ({
      search,
      setSearch,

      source,
      setSource,

      status,
      setStatus,

      company,
      setCompany,

      minRevenue,
      setMinRevenue,

      maxRevenue,
      setMaxRevenue,

      startDate,
      setStartDate,

      endDate,
      setEndDate,

      clearFilters,
    }),
    [
      search,
      source,
      status,
      company,
      minRevenue,
      maxRevenue,
      startDate,
      endDate,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context =
    useContext(FilterContext);

  if (!context) {
    throw new Error(
      "useFilter must be used inside FilterProvider"
    );
  }

  return context;
}