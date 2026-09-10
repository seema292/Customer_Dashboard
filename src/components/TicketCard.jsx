import Avatar from './Avatar';
import PriorityBadge from './PriorityBadge';
import StatusSelect from './StatusSelect';
import { formatDate } from '../utils/format';

/**
 * Card layout for a ticket, used on small screens where a table would overflow.
 * Same data + inline status control as TicketRow.
 */
export default function TicketCard({ ticket, updating, onStatusChange, onSelect }) {
  return (
    <div
      onClick={() => onSelect(ticket.id)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
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
        <StatusSelect
          value={ticket.status}
          busy={updating}
          onChange={(status) => onStatusChange(ticket.id, status)}
        />
        <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
      </div>
    </div>
  );
}
