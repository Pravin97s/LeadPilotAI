"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CSVRow } from "@/types/csv";

interface DashboardContextType {
  rows: CSVRow[];
  setRows: (rows: CSVRow[]) => void;
  selectedFile: string;
  setSelectedFile: (name: string) => void;
}

const DashboardContext =
  createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [selectedFile, setSelectedFile] =
    useState("");

  const value = useMemo(
    () => ({
      rows,
      setRows,
      selectedFile,
      setSelectedFile,
    }),
    [rows, selectedFile]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}