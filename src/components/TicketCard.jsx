import Avatar from './Avatar';
import PriorityBadge from './PriorityBadge';
import StatusSelect from './StatusSelect';
import { EyeIcon } from './icons';
import { formatDate } from '../utils/format';

/**
 * Card layout for a ticket, used on small screens where a table would overflow.
 * Same data + inline status control as TicketRow.
 */
export default function TicketCard({ ticket, updating, onStatusChange, onSelect }) {
  return (
    <div
      onClick={() => onSelect(ticket.id)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={ticket.customer.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {ticket.customer.name}
            </p>
            <p className="text-xs text-gray-500">{ticket.id}</p>
          </div>
        </div>
        <PriorityBadge priority={ticket.priority} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-gray-800">{ticket.subject}</p>

      <div className="mt-3 flex items-center justify-between">
        <div onClick={(e) => e.stopPropagation()}>
          <StatusSelect
            value={ticket.status}
            busy={updating}
            onChange={(status) => onStatusChange(ticket.id, status)}
          />
        </div>
        <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(ticket.id);
        }}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        <EyeIcon />
        View details
      </button>
    </div>
  );
}
