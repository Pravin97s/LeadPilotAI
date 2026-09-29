"use client";

import { Loader2 } from "lucide-react";

type LoadingProps = {
  title?: string;
  description?: string;
  fullScreen?: boolean;
};

export default function Loading({
  title = "Loading...",
  description = "Please wait while we process your request.",
  fullScreen = false,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-10">
      <Loader2
        size={48}
        className="animate-spin text-blue-500"
      />

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
}