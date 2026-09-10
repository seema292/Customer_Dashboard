import { useEffect } from 'react';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import StatusSelect from './StatusSelect';
import PrioritySelect from './PrioritySelect';
import ConversationThread from './ConversationThread';
import { CloseIcon } from './icons';
import { formatDateTime } from '../utils/format';

/**
 * Slide-over drawer showing full ticket details.
 * Rendered only when a ticket is selected. Closes on backdrop click or Esc.
 *
 * @param {object|null} ticket
 * @param {boolean} updating
 * @param {Function} onClose
 * @param {Function} onStatusChange (id, status)
 * @param {Function} onPriorityChange (id, priority)
 */
export default function TicketDetailsPanel({
  ticket,
  updating,
  onClose,
  onStatusChange,
  onPriorityChange,
}) {
  // Close on Escape key for keyboard accessibility.
  useEffect(() => {
    if (!ticket) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [ticket, onClose]);

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Ticket details">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl animate-slide-in">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={ticket.customer.name} size="lg" />
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-gray-900">
                {ticket.customer.name}
              </h2>
              <p className="truncate text-sm text-gray-500">{ticket.customer.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {ticket.id} · Created {formatDateTime(ticket.createdAt)}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{ticket.subject}</h3>

          {/* At-a-glance current status + priority */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>

          {/* Editable status + priority */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Status</p>
              <StatusSelect
                value={ticket.status}
                busy={updating}
                size="md"
                onChange={(status) => onStatusChange(ticket.id, status)}
              />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Priority</p>
              <PrioritySelect
                value={ticket.priority}
                busy={updating}
                onChange={(priority) => onPriorityChange(ticket.id, priority)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
              Description
            </p>
            <p className="text-sm leading-relaxed text-gray-700">{ticket.description}</p>
          </div>

          {/* Conversation */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Conversation
            </p>
            <ConversationThread messages={ticket.messages} />
          </div>
        </div>
      </div>
    </div>
  );
}
