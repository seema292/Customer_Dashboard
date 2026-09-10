import { useEffect, useState } from 'react';
import {
  useTicketStore,
  selectFilteredTickets,
  selectStats,
  selectSelectedTicket,
  ALL,
} from './store/useTicketStore';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './data/constants';

import Sidebar from './components/Sidebar';
import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import TicketList from './components/TicketList';
import TicketDetailsPanel from './components/TicketDetailsPanel';
import EmptyState from './components/EmptyState';
import { LoadingSkeleton, ErrorState } from './components/StateViews';
import { MenuIcon } from './components/icons';

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasFilters =
    searchQuery.trim() !== '' || statusFilter !== ALL || priorityFilter !== ALL;

  // A small human touch: greet by time of day and show today's date.
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const today = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 lg:flex">
      {/* Sidebar (dark) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header (dark) */}
        <header className="sticky top-0 z-30 border-b border-slate-700/60 bg-gradient-to-r from-slate-900 to-slate-800 shadow-sm">
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              >
                <MenuIcon />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-white">Customer Support Dashboard</h1>
                <p className="text-xs text-slate-400">Manage and track customer tickets</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{greeting}, team 👋</p>
              <p className="text-xs text-slate-400">{today}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6">
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
      </div>

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
