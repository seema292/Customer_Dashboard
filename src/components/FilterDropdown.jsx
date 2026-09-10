import { ChevronDownIcon } from './icons';

/**
 * A labelled native <select> used for status / priority filtering.
 * Native select is used deliberately — it is accessible, keyboard-friendly,
 * and works well on mobile without extra code.
 *
 * @param {string} label            visible label (e.g. "Status")
 * @param {string} value            currently selected value
 * @param {string[]} options        list of selectable values
 * @param {(v:string)=>void} onChange
 * @param {string} allLabel         label for the "no filter" option
 */
export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  allLabel = 'All',
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden font-medium text-gray-600 sm:inline">{label}:</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Filter by ${label.toLowerCase()}`}
          className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value={allLabel}>{`All ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
          <ChevronDownIcon />
        </span>
      </div>
    </label>
  );
}
