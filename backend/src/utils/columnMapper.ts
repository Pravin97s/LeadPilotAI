export function findColumn(
  headers: string[],
  possibleNames: string[]
): string | null {
  const normalizedHeaders = headers.map((h) =>
    h.trim().toLowerCase()
  );

  for (const name of possibleNames) {
    const index = normalizedHeaders.indexOf(
      name.toLowerCase()
    );

    if (index !== -1) {
      return headers[index];
    }
  }

  return null;
}