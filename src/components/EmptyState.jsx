import { InboxIcon } from './icons';

// Shown when filters/search match no tickets (or there are no tickets at all).
export default function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <InboxIcon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">No tickets found</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">
        {hasFilters
          ? 'No tickets match your current search and filters.'
          : 'There are no tickets to display yet.'}
      </p>
      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
