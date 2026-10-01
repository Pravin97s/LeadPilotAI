"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import { CSVRow } from "@/types/csv";

function HighlightedText({
  text,
  search,
}: {
  text: string;
  search: string;
}) {
  const normalizedSearch = search.trim();

  if (!normalizedSearch) {
    return <>{text}</>;
  }

  const escapedSearch = normalizedSearch.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const regex = new RegExp(
    `(${escapedSearch})`,
    "ig"
  );

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() ===
        normalizedSearch.toLowerCase() ? (
          <mark
            key={index}
            className="rounded bg-yellow-300 px-1 text-black"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function LeadsTable() {
  const { rows } = useDashboard();

  const { query, filteredRows } = useSearch();

  const {
    page,
    totalPages,
    paginatedRows,
    nextPage,
    previousPage,
  } = usePagination(filteredRows, 10);

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
        <div>
          <h2 className="text-2xl font-bold">
            Leads Table
          </h2>

          <p className="text-slate-400 mt-1">
            Showing{" "}
            <span className="text-blue-400 font-semibold">
              {filteredRows.length}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {rows.length}
            </span>{" "}
            records
          </p>
        </div>

        {query && (
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm">
            Search: "{query}"
          </span>
        )}
      </div>

      {filteredRows.length === 0 ? (
        <div className="rounded-xl border border-slate-800 p-10 text-center text-red-400">
          No matching records found.
        </div>
      ) : (
        <>
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
                {paginatedRows.map(
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
  <HighlightedText
    text={String(row[header] ?? "")}
    search={query}
  />
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
        </>
      )}
    </section>
  );
}