export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const i = Math.floor(
    Math.log(bytes) / Math.log(k)
  );

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
    " " +
    sizes[i]
  );
}

export function getFileExtension(
  filename: string
): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

export function isCSV(filename: string) {
  return getFileExtension(filename) === "csv";
}

export function generateDownloadName(
  prefix: string
) {
  const date = new Date();

  const timestamp = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}_${String(
    date.getHours()
  ).padStart(2, "0")}-${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  return `${prefix}_${timestamp}.csv`;
}