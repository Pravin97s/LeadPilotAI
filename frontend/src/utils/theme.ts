export const colors = {
  primary: "#2563eb",
  secondary: "#7c3aed",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
  dark: "#0f172a",
  light: "#f8fafc",
};

export const chartColors = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#06b6d4",
  "#14b8a6",
  "#84cc16",
];

export const statusColors: Record<string, string> = {
  Converted: "#22c55e",
  Contacted: "#3b82f6",
  Pending: "#f59e0b",
  Lost: "#ef4444",
  Unknown: "#64748b",
};

export function getStatusColor(status: string): string {
  return statusColors[status] ?? statusColors.Unknown;
}