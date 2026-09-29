const STORAGE_KEY = "leadpilot-data";

export function saveLeads(data: any[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function getLeads() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function clearLeads() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}

export function hasLeads() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(STORAGE_KEY) !== null;
}