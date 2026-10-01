"use client";

import { useFilter } from "@/context/FilterContext";

export default function SourceFilter() {
  const { source, setSource } = useFilter();

  return (
    <select
      value={source}
      onChange={(e) => setSource(e.target.value)}
      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
    >
      <option value="">All Sources</option>
      <option value="Website">Website</option>
      <option value="LinkedIn">LinkedIn</option>
      <option value="Facebook">Facebook</option>
      <option value="Instagram">Instagram</option>
      <option value="Referral">Referral</option>
      <option value="Email">Email</option>
    </select>
  );
}