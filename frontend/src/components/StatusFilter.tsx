"use client";

import { useFilter } from "@/context/FilterContext";

export default function StatusFilter() {
  const { status, setStatus } = useFilter();

  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
    >
      <option value="">All Status</option>
      <option value="New">New</option>
      <option value="Qualified">Qualified</option>
      <option value="Contacted">Contacted</option>
      <option value="Converted">Converted</option>
      <option value="Closed">Closed</option>
    </select>
  );
}