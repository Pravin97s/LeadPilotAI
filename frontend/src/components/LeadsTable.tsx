"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import { CSVRow } from "@/types/csv";

export default function LeadsTable() {
  const { rows } = useDashboard();

  const { query } = useSearch();

  const filteredRows = useMemo(() => {
    if (!query.trim()) return rows;

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value)
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  }, [rows, query]);

  const {
    page,
    totalPages,
    paginatedRows,
    nextPage,
    previousPage,
  } = usePagination(10);

  const tableRows =
    query.trim() === ""
      ? paginatedRows
      : filteredRows.slice(
          (page - 1) * 10,
          page * 10
        );

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
        Upload a CSV file to view the table.
      </div>
    );
  }

  const headers = Object.keys(rows[0]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Leads Table
        </h2>

        <p className="text-slate-400">
          {filteredRows.length} Records
        </p>
      </div>

      <div className="overflow-auto rounded-xl border border-slate-800">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map(
              (row: CSVRow, index: number) => (
                <tr
                  key={index}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-3 whitespace-nowrap"
                    >
                      {String(row[header] ?? "")}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={previousPage}
          disabled={page === 1}
          className="rounded-lg bg-slate-800 px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="rounded-lg bg-blue-600 px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}