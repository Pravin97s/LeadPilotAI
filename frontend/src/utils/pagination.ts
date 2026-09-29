import { CSVRow } from "@/types/csv";

export function paginate(
  rows: CSVRow[],
  page: number,
  pageSize: number
): CSVRow[] {
  const start = (page - 1) * pageSize;

  return rows.slice(start, start + pageSize);
}

export function getTotalPages(
  totalItems: number,
  pageSize: number
): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  const pages: number[] = [];

  const start = Math.max(1, currentPage - 2);

  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

export function canGoPrevious(
  currentPage: number
): boolean {
  return currentPage > 1;
}

export function canGoNext(
  currentPage: number,
  totalPages: number
): boolean {
  return currentPage < totalPages;
}