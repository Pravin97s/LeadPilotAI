import { Lead } from "@/types/lead";

export function getDashboardStats(leads: Lead[]) {
  const totalLeads = leads.length;

  const converted = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const pending = leads.filter(
    (lead) => lead.status === "Pending"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const lost = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return {
    totalLeads,
    converted,
    pending,
    contacted,
    lost,
    conversionRate:
      totalLeads === 0
        ? 0
        : Number(
            ((converted / totalLeads) * 100).toFixed(2)
          ),
  };
}

export function searchLeads(
  leads: Lead[],
  keyword: string
) {
  if (!keyword.trim()) return leads;

  const value = keyword.toLowerCase();

  return leads.filter((lead) =>
    Object.values(lead).some((item) =>
      String(item)
        .toLowerCase()
        .includes(value)
    )
  );
}

export function filterByStatus(
  leads: Lead[],
  status: string
) {
  if (status === "All") return leads;

  return leads.filter(
    (lead) => lead.status === status
  );
}

export function sortLeads(
  leads: Lead[],
  field: keyof Lead,
  ascending = true
) {
  return [...leads].sort((a, b) => {
    const first = String(a[field]).toLowerCase();
    const second = String(b[field]).toLowerCase();

    if (ascending) {
      return first.localeCompare(second);
    }

    return second.localeCompare(first);
  });
}