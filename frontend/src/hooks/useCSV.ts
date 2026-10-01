"use client";

import { useCallback, useState } from "react";
import Papa from "papaparse";
import { CSVRow } from "@/types/csv";
import { useDashboard } from "@/providers/DashboardProvider";

export default function useCSV() {
  const {
    setRows,
    setSelectedFile,
    setHeaders,
    setColumnMapping,
    autoAnalyze,
    refreshDashboard,
  } = useDashboard();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadCSV = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setError("Please upload a valid CSV file.");
        return;
      }

      setLoading(true);
      setError("");

      Papa.parse<CSVRow>(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,

        complete: (result) => {
          const headers =
            result.meta.fields?.filter(Boolean) ?? [];

          const cleanRows = result.data.filter((row) =>
            Object.values(row).some(
              (value) =>
                value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
            )
          );

          setHeaders(headers);
          setRows(cleanRows);
          setSelectedFile(file.name);

          const autoMapping: Record<string, string> = {};

          headers.forEach((header) => {
            const value = header.toLowerCase();

            if (value.includes("name"))
              autoMapping["Lead Name"] = header;

            if (value.includes("email"))
              autoMapping["Email"] = header;

            if (
              value.includes("phone") ||
              value.includes("mobile")
            )
              autoMapping["Phone"] = header;

            if (value.includes("company"))
              autoMapping["Company"] = header;

            if (value.includes("source"))
              autoMapping["Source"] = header;

            if (value.includes("status"))
              autoMapping["Status"] = header;

            if (
              value.includes("revenue") ||
              value.includes("amount") ||
              value.includes("value")
            )
              autoMapping["Revenue"] = header;

            if (
              value.includes("date") ||
              value.includes("created")
            )
              autoMapping["Date"] = header;
          });

          setColumnMapping(autoMapping);

          if (autoAnalyze) {
            refreshDashboard();
          }

          window.dispatchEvent(
            new CustomEvent("csv-uploaded", {
              detail: {
                rows: cleanRows.length,
                headers,
              },
            })
          );

          setLoading(false);
        },

        error: (err) => {
          setError(err.message);
          setLoading(false);
        },
      });
    },
    [
      setRows,
      setSelectedFile,
      setHeaders,
      setColumnMapping,
      autoAnalyze,
      refreshDashboard,
    ]
  );

  return {
    uploadCSV,
    loading,
    error,
  };
}