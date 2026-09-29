export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            LeadPilot AI
          </h1>

          <p className="mt-2 text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    </main>
  );
}