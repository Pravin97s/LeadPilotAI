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
  } = useDashboard();

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
          const headers =
            result.meta.fields?.filter(Boolean) ??
            [];

          setHeaders(headers);

          setRows(result.data);

          setSelectedFile(file.name);

          const autoMapping: Record<
            string,
            string
          > = {};

          headers.forEach((header) => {
            const value =
              header.toLowerCase();

            if (
              value.includes("name")
            ) {
              autoMapping["Lead Name"] =
                header;
            }

            if (
              value.includes("email")
            ) {
              autoMapping["Email"] =
                header;
            }

            if (
              value.includes("phone") ||
              value.includes("mobile")
            ) {
              autoMapping["Phone"] =
                header;
            }

            if (
              value.includes("company")
            ) {
              autoMapping["Company"] =
                header;
            }

            if (
              value.includes("source")
            ) {
              autoMapping["Source"] =
                header;
            }

            if (
              value.includes("status")
            ) {
              autoMapping["Status"] =
                header;
            }

            if (
              value.includes("revenue") ||
              value.includes("amount") ||
              value.includes("value")
            ) {
              autoMapping["Revenue"] =
                header;
            }

            if (
              value.includes("date") ||
              value.includes("created")
            ) {
              autoMapping["Date"] =
                header;
            }
          });

          setColumnMapping(
            autoMapping
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
    ]
  );

  return {
    uploadCSV,
    loading,
    error,
  };
}