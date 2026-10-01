"use client";

import { useSearchContext } from "@/providers/SearchProvider";

export default function useSearch() {
  return useSearchContext();
}