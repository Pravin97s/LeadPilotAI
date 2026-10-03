"use client";

import {
  Search,
  Bell,
  UserCircle2,
  X,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

import useDashboard from "@/hooks/useDashboard";
import useFilteredRows from "@/hooks/useFilteredRows";
import { useFilter } from "@/context/FilterContext";
import SearchSuggestions from "@/components/SearchSuggestions";

export default function Navbar({ onMenuClick = () => {} }: { onMenuClick?: () => void }) {
  const { darkMode, setDarkMode } = useSettings();
  const { search, setSearch } = useFilter();

  const filteredRows = useFilteredRows();

  const { rows } = useDashboard();

  return (
    <header className="app-navbar sticky top-0 z-40">
      <div className="navbar-inner flex items-center justify-between">
        <div>
          <button className="mobile-menu-button" onClick={onMenuClick} aria-label="Open navigation"><Menu size={21}/></button>
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-400">
            AI Powered Lead Analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="navbar-search relative">
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

          <button className="icon-action" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={19}/> : <Moon size={19}/>}
          </button>
          <button className="icon-action" aria-label="Notifications">
            <Bell size={20} />
          </button>

          <button className="profile-button" aria-label="Profile">
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
