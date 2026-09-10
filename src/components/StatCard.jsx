// A single dashboard metric card: label, count, and a colored accent icon.
export default function StatCard({ label, value, accent = 'gray', icon }) {
  const accents = {
    gray: 'bg-gray-100 text-gray-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    emerald: 'bg-emerald-100 text-emerald-600',
  };
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accents[accent] || accents.gray}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
