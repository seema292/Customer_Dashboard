import { PRIORITY } from '../data/constants';

// Color-coded pill for a ticket's priority: High=red, Medium=orange, Low=green.
const PRIORITY_STYLES = {
  [PRIORITY.HIGH]: 'bg-red-50 text-red-700 ring-red-600/20',
  [PRIORITY.MEDIUM]: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  [PRIORITY.LOW]: 'bg-green-50 text-green-700 ring-green-600/20',
};

export default function PriorityBadge({ priority, className = '' }) {
  const style =
    PRIORITY_STYLES[priority] || 'bg-gray-50 text-gray-600 ring-gray-500/20';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style} ${className}`}
    >
      {priority}
    </span>
  );
}
