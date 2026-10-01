"use client";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
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

  const regex = new RegExp(`(${escapedSearch})`, "ig");

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
  const { rows: allRows } = useDashboard();

  const rows = useFilteredRows();

  const { query } = useSearch();

  const {
    page,
    totalPages,
    paginatedRows,
    nextPage,
    previousPage,
  } = usePagination(rows, 10);

  if (allRows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
        Upload a CSV file to view the table.
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          Leads Table
        </h2>

        <div className="rounded-xl border border-slate-700 p-10 text-center text-red-400">
          No records match the current filters.
        </div>
      </section>
    );
  }

  const headers = Object.keys(rows[0]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Leads Table
          </h2>

          <p className="mt-1 text-slate-400">
            Showing{" "}
            <span className="font-semibold text-blue-400">
              {rows.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {allRows.length}
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

      <div className="overflow-auto rounded-xl border border-slate-800">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-4 py-3 text-left"
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
                      className="whitespace-nowrap px-4 py-3"
                    >
                      <HighlightedText
                        text={String(
                          row[header] ?? ""
                        )}
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
    </section>
  );
}