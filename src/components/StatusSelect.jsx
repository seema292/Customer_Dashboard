import { STATUS_OPTIONS } from '../data/constants';
import { ChevronDownIcon, SpinnerIcon } from './icons';

/**
 * Compact inline status selector used on each ticket row/card and in the
 * details panel. Changing it triggers an immediate (optimistic) state update.
 *
 * @param {string} value       current status
 * @param {(v:string)=>void} onChange
 * @param {boolean} busy       show a spinner while the update is saving
 * @param {string} size        'sm' | 'md'
 */
export default function StatusSelect({ value, onChange, busy = false, size = 'sm' }) {
  const pad = size === 'md' ? 'py-2 pl-3 pr-8 text-sm' : 'py-1 pl-2 pr-7 text-xs';
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={busy}
        aria-label="Change status"
        // stop row click from opening the details panel when interacting here
        onClick={(e) => e.stopPropagation()}
        className={`appearance-none rounded-md border border-gray-300 bg-white font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60 ${pad}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-gray-400">
        {busy ? <SpinnerIcon className="h-3.5 w-3.5" /> : <ChevronDownIcon className="h-3.5 w-3.5" />}
      </span>
    </div>
  );
}
