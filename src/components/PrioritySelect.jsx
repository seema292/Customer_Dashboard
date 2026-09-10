import { PRIORITY_OPTIONS } from '../data/constants';
import { ChevronDownIcon, SpinnerIcon } from './icons';

/**
 * Editable priority selector, used in the details panel.
 * Mirrors StatusSelect's behaviour for consistency.
 */
export default function PrioritySelect({ value, onChange, busy = false }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={busy}
        aria-label="Change priority"
        className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60"
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
        {busy ? <SpinnerIcon className="h-4 w-4" /> : <ChevronDownIcon />}
      </span>
    </div>
  );
}
