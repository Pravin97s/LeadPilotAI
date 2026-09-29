"use client";

import { Search, Bell, UserCircle2 } from "lucide-react";
import useSearch from "@/hooks/useSearch";

export default function Navbar() {
  const { query, setQuery } = useSearch();

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            AI Powered Lead Analytics
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="w-72 rounded-xl bg-slate-900 border border-slate-700 py-3 pl-10 pr-4 text-sm focus:border-blue-500"
            />
          </div>

          <button className="rounded-xl bg-slate-900 border border-slate-700 p-3 hover:bg-slate-800">
            <Bell size={20} />
          </button>

          <button className="rounded-full bg-slate-900 border border-slate-700 p-2">
            <UserCircle2 size={34} />
          </button>
        </div>
      </div>
    </header>
  );
}