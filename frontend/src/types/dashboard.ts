import { Lead } from "./lead";

export interface DashboardStats {
  totalLeads: number;
  converted: number;
  pending: number;
  contacted: number;
  lost: number;
  conversionRate: number;
  revenue: number;
}

export interface UploadState {
  fileName: string;
  rows: Lead[];
  loading: boolean;
  error: string;
}

export interface ChartPoint {
  name: string;
  value: number;
}

export interface MonthlyPoint {
  month: string;
  leads: number;
}