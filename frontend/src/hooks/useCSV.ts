"use client";

import { useCallback, useState } from "react";
import Papa from "papaparse";
import { CSVRow } from "@/types/csv";
import { useDashboard } from "@/providers/DashboardProvider";

export default function useCSV() {
  const { setRows, setSelectedFile } = useDashboard();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadCSV = useCallback(
    (file: File) => {
      setLoading(true);
      setError("");

      Papa.parse<CSVRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setRows(result.data);
          setSelectedFile(file.name);
          setLoading(false);
        },
        error: (err) => {
          setError(err.message);
          setLoading(false);
        },
      });
    },
    [setRows, setSelectedFile]
  );

  return {
    uploadCSV,
    loading,
    error,
  };
}