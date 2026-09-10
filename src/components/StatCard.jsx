// A single dashboard metric card. White base with a soft colored top accent
// bar and a gradient icon badge, so the four cards look refined and clearly
// tied to the app's theme palette while staying light and readable.
export default function StatCard({ label, value, accent = 'indigo', icon }) {
  const themes = {
    // Total — indigo (primary theme accent, echoes sidebar/header chrome)
    indigo: {
      bar: 'from-indigo-500 to-indigo-700',
      badge: 'from-indigo-500 to-indigo-700 shadow-indigo-500/30',
      value: 'text-indigo-700',
    },
    // Open — blue
    blue: {
      bar: 'from-sky-500 to-blue-600',
      badge: 'from-sky-500 to-blue-600 shadow-blue-500/30',
      value: 'text-blue-700',
    },
    // In Progress — amber
    amber: {
      bar: 'from-amber-400 to-orange-500',
      badge: 'from-amber-400 to-orange-500 shadow-amber-500/30',
      value: 'text-amber-700',
    },
    // Resolved — emerald
    emerald: {
      bar: 'from-emerald-500 to-teal-600',
      badge: 'from-emerald-500 to-teal-600 shadow-emerald-500/30',
      value: 'text-emerald-700',
    },
  };
  const t = themes[accent] || themes.indigo;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Colored top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${t.bar}`} />

      <div className="flex items-center gap-4 p-4 sm:p-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md ${t.badge}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className={`text-2xl font-semibold ${t.value}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
