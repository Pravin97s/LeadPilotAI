import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h1 className="text-6xl font-bold text-blue-500">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}