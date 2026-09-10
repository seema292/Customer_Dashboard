import TicketRow from './TicketRow';
import TicketCard from './TicketCard';

/**
 * Renders the list of tickets in two responsive layouts:
 *   - a table on md+ screens
 *   - a stack of cards on small screens
 *
 * @param {Array}   tickets
 * @param {string|null} updatingId  id currently being saved (for spinner)
 * @param {Function} onStatusChange (id, status)
 * @param {Function} onSelect       (id) -> open details drawer
 */
export default function TicketList({ tickets, updatingId, onStatusChange, onSelect }) {
  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Created
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                updating={updatingId === ticket.id}
                onStatusChange={onStatusChange}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            updating={updatingId === ticket.id}
            onStatusChange={onStatusChange}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
}
