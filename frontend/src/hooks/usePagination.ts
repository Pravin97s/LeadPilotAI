"use client";

import { useMemo, useState, useEffect } from "react";
import { CSVRow } from "@/types/csv";
import { paginate, getTotalPages } from "@/utils/pagination";

export default function usePagination(
  rows: CSVRow[],
  pageSize = 10
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [rows]);

  const totalPages = useMemo(() => {
    return Math.max(1, getTotalPages(rows.length, pageSize));
  }, [rows, pageSize]);

  const paginatedRows = useMemo(() => {
    return paginate(rows, page, pageSize);
  }, [rows, page, pageSize]);

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
    nextPage,
    previousPage,
    goToPage,
    setPage,
  };
}