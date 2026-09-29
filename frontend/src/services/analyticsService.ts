import { Lead } from "@/types/Lead";

export function calculateAnalytics(leads: Lead[]) {
  const total = leads.length;

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

  const revenue = converted * 5000;

  const conversionRate =
    total === 0
      ? 0
      : Number(
          ((converted / total) * 100).toFixed(2)
        );

  return {
    total,
    converted,
    pending,
    contacted,
    lost,
    revenue,
    conversionRate,
  };
}

export function getTopSources(leads: Lead[]) {
  const sources: Record<string, number> = {};

  leads.forEach((lead) => {
    const source = lead.source || "Unknown";

    sources[source] = (sources[source] || 0) + 1;
  });

  return Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
    }));
}

export function getRecentLeads(
  leads: Lead[],
  limit = 5
) {
  return [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function getHighValueLeads(
  leads: Lead[]
) {
  return leads.filter(
    (lead) => Number(lead.value) >= 10000
  );
}