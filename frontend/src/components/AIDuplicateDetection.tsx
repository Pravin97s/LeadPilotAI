"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

type DuplicateItem = {
  type: string;
  value: string;
  count: number;
};

export default function AIDuplicateDetection() {
  const { rows } = useDashboard();

  const duplicateData = useMemo(() => {
    if (!rows.length) {
      return {
        duplicates: [],
        emailDuplicates: 0,
        phoneDuplicates: 0,
        idDuplicates: 0,
        risk: 0,
      };
    }

    const emailMap = new Map<string, number>();
    const phoneMap = new Map<string, number>();
    const idMap = new Map<string, number>();

    rows.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        const field = key.toLowerCase();
        const text = String(value ?? "").trim();

        if (!text) return;

        if (field.includes("email")) {
          emailMap.set(text, (emailMap.get(text) || 0) + 1);
        }

        if (
          field.includes("phone") ||
          field.includes("mobile") ||
          field.includes("contact")
        ) {
          phoneMap.set(text, (phoneMap.get(text) || 0) + 1);
        }

        if (
          field === "id" ||
          field.includes("customerid") ||
          field.includes("leadid")
        ) {
          idMap.set(text, (idMap.get(text) || 0) + 1);
        }
      });
    });

    const duplicates: DuplicateItem[] = [];

    let emailDuplicates = 0;
    let phoneDuplicates = 0;
    let idDuplicates = 0;

    emailMap.forEach((count, value) => {
      if (count > 1) {
        emailDuplicates++;
        duplicates.push({
          type: "Email",
          value,
          count,
        });
      }
    });

    phoneMap.forEach((count, value) => {
      if (count > 1) {
        phoneDuplicates++;
        duplicates.push({
          type: "Phone",
          value,
          count,
        });
      }
    });

    idMap.forEach((count, value) => {
      if (count > 1) {
        idDuplicates++;
        duplicates.push({
          type: "ID",
          value,
          count,
        });
      }
    });

    const risk = (
      (duplicates.length / rows.length) *
      100
    ).toFixed(1);

    return {
      duplicates,
      emailDuplicates,
      phoneDuplicates,
      idDuplicates,
      risk,
    };
  }, [rows]);

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-3xl font-bold">
          AI Duplicate Detection
        </h2>

        <p className="text-slate-400">
          Upload a CSV file to detect duplicate records.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        AI Duplicate Detection
      </h2>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Emails
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.emailDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Phones
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.phoneDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate IDs
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.idDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Risk
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.risk}%
          </h3>
        </div>
      </div>

      {duplicateData.duplicates.length === 0 ? (
        <div className="rounded-xl border border-green-600 bg-green-900/20 p-6 text-green-400">
          ✅ No duplicate Emails, Phones or IDs detected.
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border border-slate-800">
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left">
                  Type
                </th>

                <th className="px-4 py-3 text-left">
                  Duplicate Value
                </th>

                <th className="px-4 py-3 text-left">
                  Count
                </th>
              </tr>
            </thead>

            <tbody>
              {duplicateData.duplicates.map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-3">
                      {item.type}
                    </td>

                    <td className="px-4 py-3">
                      {item.value}
                    </td>

                    <td className="px-4 py-3 font-bold text-red-400">
                      {item.count}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}