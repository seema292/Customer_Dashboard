import { useEffect } from 'react';
import {
  useTicketStore,
  selectFilteredTickets,
  selectStats,
  selectSelectedTicket,
  ALL,
} from './store/useTicketStore';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './data/constants';

import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import TicketList from './components/TicketList';
import TicketDetailsPanel from './components/TicketDetailsPanel';
import EmptyState from './components/EmptyState';
import { LoadingSkeleton, ErrorState } from './components/StateViews';
import { TicketIcon } from './components/icons';

export default function App() {
  // --- state from the store ---
  const loading = useTicketStore((s) => s.loading);
  const error = useTicketStore((s) => s.error);
  const searchQuery = useTicketStore((s) => s.searchQuery);
  const statusFilter = useTicketStore((s) => s.statusFilter);
  const priorityFilter = useTicketStore((s) => s.priorityFilter);
  const updatingId = useTicketStore((s) => s.updatingId);

  // Derived data (re-computed on each render from current state).
  const filtered = useTicketStore(selectFilteredTickets);
  const stats = useTicketStore(selectStats);
  const selectedTicket = useTicketStore(selectSelectedTicket);

  // --- actions ---
  const loadTickets = useTicketStore((s) => s.loadTickets);
  const setSearchQuery = useTicketStore((s) => s.setSearchQuery);
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter);
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter);
  const clearFilters = useTicketStore((s) => s.clearFilters);
  const selectTicket = useTicketStore((s) => s.selectTicket);
  const closePanel = useTicketStore((s) => s.closePanel);
  const setStatus = useTicketStore((s) => s.setStatus);
  const setPriority = useTicketStore((s) => s.setPriority);

  // Load tickets once on mount.
  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const hasFilters =
    searchQuery.trim() !== '' || statusFilter !== ALL || priorityFilter !== ALL;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <TicketIcon />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Support Dashboard</h1>
            <p className="text-xs text-gray-500">Manage and track customer tickets</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Stat cards */}
        <StatsBar stats={stats} />

        {/* Toolbar: search + filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="sm:max-w-xs sm:flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by customer or subject…"
            />
          </div>
          <div className="flex items-center gap-3">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={setStatusFilter}
              allLabel={ALL}
            />
            <FilterDropdown
              label="Priority"
              value={priorityFilter}
              options={PRIORITY_OPTIONS}
              onChange={setPriorityFilter}
              allLabel={ALL}
            />
          </div>
        </div>

        {/* Result count */}
        {!loading && !error && (
          <p className="text-sm text-gray-500">
            Showing {filtered.length} ticket{filtered.length === 1 ? '' : 's'}
          </p>
        )}

        {/* Content: loading / error / empty / list */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={loadTickets} />
        ) : filtered.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
        ) : (
          <TicketList
            tickets={filtered}
            updatingId={updatingId}
            onStatusChange={setStatus}
            onSelect={selectTicket}
          />
        )}
      </main>

      {/* Details drawer */}
      <TicketDetailsPanel
        ticket={selectedTicket}
        updating={updatingId === selectedTicket?.id}
        onClose={closePanel}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />
    </div>
  );
}
