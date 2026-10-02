"use client";

import {
  Search,
  Bell,
  UserCircle2,
  X,
} from "lucide-react";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
import { useFilter } from "@/context/FilterContext";
import SearchSuggestions from "@/components/SearchSuggestions";

export default function Navbar() {
  const { search, setSearch } = useFilter();

  const filteredRows = useFilteredRows();

  const { rows } = useDashboard();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-400">
            AI Powered Lead Analytics
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const section = document.getElementById("leads");

                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X
                  size={16}
                  className="text-slate-400 hover:text-white"
                />
              </button>
            )}

            <SearchSuggestions />
          </div>

          <button className="rounded-xl border border-slate-700 bg-slate-900 p-3 hover:bg-slate-800">
            <Bell size={20} />
          </button>

          <button className="rounded-full border border-slate-700 bg-slate-900 p-2">
            <UserCircle2 size={34} />
          </button>
        </div>
      </div>

      {search.trim() !== "" && (
        <div className="border-t border-slate-800 bg-slate-900 px-8 py-2">
          {filteredRows.length > 0 ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-400">
                🔍 Showing{" "}
                <span className="font-semibold">
                  {filteredRows.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">
                  {rows.length}
                </span>{" "}
                matching records
              </p>

              <p className="text-xs text-slate-400">
                Press × to clear search
              </p>
            </div>
          ) : (
            <p className="text-sm text-red-400">
              ❌ No matching records found
            </p>
          )}
        </div>
      )}
    </header>
  );
}