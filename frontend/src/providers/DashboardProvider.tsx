"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
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

  compactView: boolean;
  setCompactView: (value: boolean) => void;

  autoAnalyze: boolean;
  setAutoAnalyze: (value: boolean) => void;

  refreshDashboard: () => void;
  resetDashboard: () => void;
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

  const [compactView, setCompactView] =
    useState(false);

  const [autoAnalyze, setAutoAnalyze] =
    useState(true);

  useEffect(() => {
    const compact =
      localStorage.getItem("compactView");

    const auto =
      localStorage.getItem("autoAnalyze");

    if (compact !== null) {
      setCompactView(compact === "true");
    }

    if (auto !== null) {
      setAutoAnalyze(auto === "true");
    }
  }, []);

  function refreshDashboard() {
    setRows((prev) => [...prev]);
  }

  function resetDashboard() {
    setRows([]);
    setSelectedFile("");
    setHeaders([]);
    setColumnMapping({});
  }

  useEffect(() => {
    const refresh = () =>
      refreshDashboard();

    const reset = () =>
      resetDashboard();

    const compactHandler = (
      event: Event
    ) => {
      const custom =
        event as CustomEvent<boolean>;

      setCompactView(custom.detail);
    };

    window.addEventListener(
      "refresh-dashboard",
      refresh
    );

    window.addEventListener(
      "reset-dashboard",
      reset
    );

    window.addEventListener(
      "compact-view",
      compactHandler as EventListener
    );

    return () => {
      window.removeEventListener(
        "refresh-dashboard",
        refresh
      );

      window.removeEventListener(
        "reset-dashboard",
        reset
      );

      window.removeEventListener(
        "compact-view",
        compactHandler as EventListener
      );
    };
  }, []);

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

      compactView,
      setCompactView,

      autoAnalyze,
      setAutoAnalyze,

      refreshDashboard,
      resetDashboard,
    }),
    [
      rows,
      selectedFile,
      headers,
      columnMapping,
      compactView,
      autoAnalyze,
    ]
  );

  return (
    <DashboardContext.Provider
      value={value}
    >
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