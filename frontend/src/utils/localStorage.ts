const STORAGE_KEY = "leadpilot_dashboard";

export function saveData<T>(data: T) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function loadData<T>(): T | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export function clearData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}

export function hasData() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(STORAGE_KEY) !== null;
}