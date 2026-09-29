"use client";

import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "No Data Found",
  description = "Upload a CSV file to start viewing analytics and AI insights.",
}: EmptyStateProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center">
        <Inbox
          size={42}
          className="text-slate-400"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400 leading-7">
        {description}
      </p>

      <button className="mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 transition px-6 py-3 font-medium">
        Upload CSV
      </button>
    </div>
  );
}