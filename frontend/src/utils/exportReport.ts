import * as XLSX from "xlsx";

export function exportCSV(rows: any[]) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "")}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "LeadPilotAI_Report.csv";

  link.click();

  URL.revokeObjectURL(url);
}

export function exportJSON(rows: any[]) {
  if (!rows.length) return;

  const blob = new Blob(
    [JSON.stringify(rows, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "LeadPilotAI_Report.json";

  link.click();

  URL.revokeObjectURL(url);
}

export function exportExcel(rows: any[]) {
  if (!rows.length) return;

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "LeadPilotAI"
  );

  XLSX.writeFile(
    workbook,
    "LeadPilotAI_Report.xlsx"
  );
}