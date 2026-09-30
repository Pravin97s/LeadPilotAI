export interface DatasetSummary {
  totalRows: number;
  totalColumns: number;
  duplicateRows: number;
  missingValues: number;
  invalidEmails: number;
  invalidPhones: number;
  completionRate: number;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^[+]?[0-9]{10,15}$/;

function isMissing(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  );
}

function findColumn(
  row: Record<string, any>,
  keywords: string[]
) {
  const key = Object.keys(row).find((k) =>
    keywords.some((word) =>
      k.toLowerCase().includes(word)
    )
  );

  return key;
}

export function analyzeDataset(
  rows: Record<string, any>[]
): DatasetSummary {
  if (!rows.length) {
    return {
      totalRows: 0,
      totalColumns: 0,
      duplicateRows: 0,
      missingValues: 0,
      invalidEmails: 0,
      invalidPhones: 0,
      completionRate: 0,
    };
  }

  const uniqueRows = new Set(
    rows.map((r) => JSON.stringify(r))
  );

  const duplicateRows =
    rows.length - uniqueRows.size;

  let missingValues = 0;
  let invalidEmails = 0;
  let invalidPhones = 0;

  rows.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (isMissing(value)) {
        missingValues++;
      }
    });

    const emailKey = findColumn(row, [
      "email",
      "mail",
    ]);

    if (emailKey) {
      const email = String(
        row[emailKey] ?? ""
      ).trim();

      if (
        email &&
        !emailRegex.test(email)
      ) {
        invalidEmails++;
      }
    }

    const phoneKey = findColumn(row, [
      "phone",
      "mobile",
      "contact",
    ]);

    if (phoneKey) {
      const phone = String(
        row[phoneKey] ?? ""
      )
        .replace(/\s/g, "")
        .replace(/-/g, "");

      if (
        phone &&
        !phoneRegex.test(phone)
      ) {
        invalidPhones++;
      }
    }
  });

  const totalCells =
    rows.length *
    Object.keys(rows[0]).length;

  const completionRate =
    totalCells === 0
      ? 0
      : Number(
          (
            ((totalCells - missingValues) /
              totalCells) *
            100
          ).toFixed(2)
        );

  return {
    totalRows: rows.length,
    totalColumns:
      Object.keys(rows[0]).length,
    duplicateRows,
    missingValues,
    invalidEmails,
    invalidPhones,
    completionRate,
  };
}