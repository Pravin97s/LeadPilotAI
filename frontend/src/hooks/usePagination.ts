"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/providers/DashboardProvider";
import { paginate, getTotalPages } from "@/utils/pagination";

export default function usePagination(pageSize = 10) {
  const { rows } = useDashboard();

  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => getTotalPages(rows.length, pageSize),
    [rows, pageSize]
  );

  const paginatedRows = useMemo(
    () => paginate(rows, page, pageSize),
    [rows, page, pageSize]
  );

  function nextPage() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  function previousPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function goToPage(value: number) {
    if (value >= 1 && value <= totalPages) {
      setPage(value);
    }
  }

  return {
    page,
    totalPages,
    paginatedRows,
    setPage,
    nextPage,
    previousPage,
    goToPage,
  };
}