export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: "Converted" | "Pending" | "Contacted" | "Lost";
  value: number;
  createdAt: string;
}