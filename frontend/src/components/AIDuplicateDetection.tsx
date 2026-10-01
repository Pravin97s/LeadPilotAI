"use client";

import { useMemo } from "react";
import useDashboard from "@/hooks/useDashboard";

type DuplicateItem = {
  type: string;
  value: string;
  count: number;
};

export default function AIDuplicateDetection() {
  const { rows, columnMapping } = useDashboard();

  const duplicateData = useMemo(() => {
    if (!rows.length) {
      return {
        duplicates: [],
        emailDuplicates: 0,
        phoneDuplicates: 0,
        companyDuplicates: 0,
        nameDuplicates: 0,
        totalDuplicates: 0,
        risk: 0,
      };
    }

    const emailColumn = columnMapping["Email"];
    const phoneColumn = columnMapping["Phone"];
    const companyColumn = columnMapping["Company"];
    const leadColumn = columnMapping["Lead Name"];

    const maps = {
      Email: new Map<string, number>(),
      Phone: new Map<string, number>(),
      Company: new Map<string, number>(),
      Name: new Map<string, number>(),
    };

    rows.forEach((row) => {
      [
        ["Email", emailColumn],
        ["Phone", phoneColumn],
        ["Company", companyColumn],
        ["Name", leadColumn],
      ].forEach(([type, column]) => {
        if (!column) return;

        const value = String(row[column] ?? "").trim();

        if (!value) return;

        const map = maps[type as keyof typeof maps];

        map.set(value, (map.get(value) || 0) + 1);
      });
    });

    const duplicates: DuplicateItem[] = [];

    let emailDuplicates = 0;
    let phoneDuplicates = 0;
    let companyDuplicates = 0;
    let nameDuplicates = 0;

    Object.entries(maps).forEach(([type, map]) => {
      map.forEach((count, value) => {
        if (count > 1) {
          duplicates.push({
            type,
            value,
            count,
          });

          if (type === "Email") emailDuplicates++;

          if (type === "Phone") phoneDuplicates++;

          if (type === "Company") companyDuplicates++;

          if (type === "Name") nameDuplicates++;
        }
      });
    });

    duplicates.sort((a, b) => b.count - a.count);

    const totalDuplicates = duplicates.length;

    const risk = Number(
      ((totalDuplicates / rows.length) * 100).toFixed(1)
    );

    return {
      duplicates,
      emailDuplicates,
      phoneDuplicates,
      companyDuplicates,
      nameDuplicates,
      totalDuplicates,
      risk,
    };
  }, [rows, columnMapping]);

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

      <div className="mb-8 grid gap-6 md:grid-cols-3 xl:grid-cols-6">
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
            Duplicate Companies
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.companyDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Names
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {duplicateData.nameDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Total Duplicates
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-400">
            {duplicateData.totalDuplicates}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <p className="text-slate-400">
            Duplicate Risk
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            {duplicateData.risk}%
          </h3>
        </div>
      </div>

      {duplicateData.duplicates.length === 0 ? (
        <div className="rounded-xl border border-green-600 bg-green-900/20 p-6 text-green-400">
          ✅ No duplicate records detected.
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

                <th className="px-4 py-3 text-center">
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
                    <td className="px-4 py-3 font-medium">
                      {item.type}
                    </td>

                    <td className="px-4 py-3 break-all">
                      {item.value}
                    </td>

                    <td className="px-4 py-3 text-center font-bold text-red-400">
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