"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import {
  sortByColumn,
  sortNumeric,
  sortDate,
  SortDirection,
} from "@/utils/sort";

export default function useSort() {
  const { rows } = useDashboard();

  const [column, setColumn] = useState("");
  const [direction, setDirection] =
    useState<SortDirection>("asc");
  const [type, setType] = useState<
    "string" | "number" | "date"
  >("string");

  const sortedRows = useMemo(() => {
    if (!column) {
      return rows;
    }

    switch (type) {
      case "number":
        return sortNumeric(rows, column, direction);

      case "date":
        return sortDate(rows, column, direction);

      default:
        return sortByColumn(rows, column, direction);
    }
  }, [rows, column, direction, type]);

  function toggleDirection() {
    setDirection((prev) =>
      prev === "asc" ? "desc" : "asc"
    );
  }

  return {
    sortedRows,
    column,
    direction,
    type,
    setColumn,
    setDirection,
    setType,
    toggleDirection,
  };
}