"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Something went wrong
        </h1>

        <p className="mt-4 text-slate-400">
          {error.message}
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}