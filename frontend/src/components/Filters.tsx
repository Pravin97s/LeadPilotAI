"use client";

type FiltersProps = {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
};

const statuses = [
  "All",
  "Converted",
  "Contacted",
  "Pending",
  "Lost",
];

export default function Filters({
  selectedStatus,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`rounded-xl px-5 py-2 font-medium transition ${
            selectedStatus === status
              ? "bg-blue-600 text-white"
              : "bg-slate-900 border border-slate-700 hover:border-blue-500"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}