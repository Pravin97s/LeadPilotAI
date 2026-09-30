"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CSVRow } from "@/types/csv";

export interface DashboardContextType {
  rows: CSVRow[];
  setRows: (rows: CSVRow[]) => void;

  selectedFile: string;
  setSelectedFile: (name: string) => void;

  headers: string[];
  setHeaders: (headers: string[]) => void;

  columnMapping: Record<string, string>;
  setColumnMapping: (
    mapping: Record<string, string>
  ) => void;
}

const DashboardContext =
  createContext<DashboardContextType | null>(
    null
  );

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rows, setRows] = useState<CSVRow[]>([]);

  const [selectedFile, setSelectedFile] =
    useState("");

  const [headers, setHeaders] = useState<
    string[]
  >([]);

  const [columnMapping, setColumnMapping] =
    useState<Record<string, string>>({});

  const value = useMemo(
    () => ({
      rows,
      setRows,

      selectedFile,
      setSelectedFile,

      headers,
      setHeaders,

      columnMapping,
      setColumnMapping,
    }),
    [
      rows,
      selectedFile,
      headers,
      columnMapping,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context =
    useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}