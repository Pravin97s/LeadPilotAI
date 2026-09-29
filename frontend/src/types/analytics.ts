export interface KPI {
  title: string;
  value: number | string;
  change: number;
  trend: "up" | "down";
}

export interface Insight {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
}

export interface StatusCount {
  name: string;
  value: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface LeadGrowthPoint {
  month: string;
  leads: number;
}