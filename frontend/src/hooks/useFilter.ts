"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { filterByColumn } from "@/utils/filter";

export default function useFilter() {
  const { rows } = useDashboard();

  const [column, setColumn] = useState("");
  const [value, setValue] = useState("");

  const filteredRows = useMemo(() => {
    if (!column || !value) {
      return rows;
    }

    return filterByColumn(rows, column, value);
  }, [rows, column, value]);

  function clearFilter() {
    setColumn("");
    setValue("");
  }

  return {
    filteredRows,
    column,
    value,
    setColumn,
    setValue,
    clearFilter,
  };
}