export interface CSVRow {
  [key: string]: string | number | boolean | null;
}

export interface CSVUploadResult {
  fileName: string;
  totalRows: number;
  totalColumns: number;
  headers: string[];
  data: CSVRow[];
}

export interface CSVAnalytics {
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  duplicateRows: number;
}