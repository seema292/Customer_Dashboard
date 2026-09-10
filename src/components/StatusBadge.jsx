import { STATUS } from '../data/constants';

// Color-coded pill for a ticket's status.
const STATUS_STYLES = {
  [STATUS.OPEN]: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  [STATUS.IN_PROGRESS]: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  [STATUS.RESOLVED]: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
};

const DOT_STYLES = {
  [STATUS.OPEN]: 'bg-blue-500',
  [STATUS.IN_PROGRESS]: 'bg-amber-500',
  [STATUS.RESOLVED]: 'bg-emerald-500',
};

export default function StatusBadge({ status, className = '' }) {
  const style = STATUS_STYLES[status] || 'bg-gray-50 text-gray-600 ring-gray-500/20';
  const dot = DOT_STYLES[status] || 'bg-gray-400';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}
