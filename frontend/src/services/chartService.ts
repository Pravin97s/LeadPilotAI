import { Lead } from "@/types/lead";

export function getStatusChartData(leads: Lead[]) {
  const counts: Record<string, number> = {};

  leads.forEach((lead) => {
    const status = lead.status || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getSourceChartData(leads: Lead[]) {
  const counts: Record<string, number> = {};

  leads.forEach((lead) => {
    const source = lead.source || "Unknown";
    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getMonthlyChartData(leads: Lead[]) {
  const months: Record<string, number> = {};

  leads.forEach((lead) => {
    const date = lead.createdAt
      ? new Date(lead.createdAt)
      : new Date();

    const month = date.toLocaleString("default", {
      month: "short",
    });

    months[month] = (months[month] || 0) + 1;
  });

  return Object.entries(months).map(([month, leads]) => ({
    month,
    leads,
  }));
}