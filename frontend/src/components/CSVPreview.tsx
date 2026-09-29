"use client";

type CSVPreviewProps = {
  data: Record<string, any>[];
};

export default function CSVPreview({
  data,
}: CSVPreviewProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        No CSV Data Available
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">
          CSV Preview
        </h2>

        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {data.length} Records
        </span>
      </div>

      <div className="overflow-auto max-h-[500px] rounded-xl border border-slate-700">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border border-slate-700 px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 50).map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-800"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border border-slate-700 px-4 py-3 whitespace-nowrap"
                  >
                    {String(row[header] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 50 && (
        <p className="mt-4 text-sm text-slate-400">
          Showing first 50 records out of {data.length}.
        </p>
      )}
    </div>
  );
}