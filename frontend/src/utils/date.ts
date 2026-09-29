export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

export function getMonthName(month: number) {
  return new Date(2000, month - 1).toLocaleString("en-IN", {
    month: "short",
  });
}

export function getYear() {
  return new Date().getFullYear();
}

export function daysBetween(
  start: string,
  end: string
) {
  const first = new Date(start).getTime();
  const second = new Date(end).getTime();

  return Math.floor(
    (second - first) / (1000 * 60 * 60 * 24)
  );
}