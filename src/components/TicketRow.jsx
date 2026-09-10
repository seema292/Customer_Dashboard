import Avatar from './Avatar';
import PriorityBadge from './PriorityBadge';
import StatusSelect from './StatusSelect';
import { EyeIcon } from './icons';
import { formatDate } from '../utils/format';

/**
 * A single table row (desktop layout).
 *
 * @param {object}   ticket
 * @param {boolean}  updating   true while an inline update is saving
 * @param {(id:string,status:string)=>void} onStatusChange
 * @param {(id:string)=>void}                onSelect  open the details drawer
 */
export default function TicketRow({ ticket, updating, onStatusChange, onSelect }) {
  return (
    <tr
      onClick={() => onSelect(ticket.id)}
      className="group cursor-pointer border-b border-gray-100 transition-colors hover:bg-indigo-50/40"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={ticket.customer.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {ticket.customer.name}
            </p>
            <p className="truncate text-xs text-gray-500">{ticket.id}</p>
          </div>
        </div>
      </td>
      <td className="max-w-xs px-4 py-3">
        <p className="truncate text-sm text-gray-800">{ticket.subject}</p>
      </td>
      <td className="px-4 py-3">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <StatusSelect
          value={ticket.status}
          busy={updating}
          onChange={(status) => onStatusChange(ticket.id, status)}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
        {formatDate(ticket.createdAt)}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(ticket.id);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          <EyeIcon />
          View details
        </button>
      </td>
    </tr>
  );
}
