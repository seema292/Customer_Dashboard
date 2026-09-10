import { create } from 'zustand';
import { fetchTickets, updateTicket } from '../api/ticketApi';
import { STATUS } from '../data/constants';

// Special sentinel used by filter dropdowns to mean "no filter applied".
export const ALL = 'All';

/**
 * Central store for the support dashboard.
 *
 * State:
 *   tickets         - the full list loaded from the API
 *   loading / error - async request lifecycle for the initial load
 *   searchQuery     - free-text search over customer name + subject
 *   statusFilter    - one of ALL | STATUS.*  (combinable with search + priority)
 *   priorityFilter  - one of ALL | PRIORITY.*
 *   selectedId      - id of the ticket shown in the details drawer (null = closed)
 *   updatingId      - id of a ticket currently being saved (for inline spinners)
 */
export const useTicketStore = create((set, get) => ({
  tickets: [],
  loading: false,
  error: null,

  searchQuery: '',
  statusFilter: ALL,
  priorityFilter: ALL,

  selectedId: null,
  updatingId: null,

  // --- async: initial load -------------------------------------------------
  loadTickets: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchTickets();
      set({ tickets: data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Something went wrong.', loading: false });
    }
  },

  // --- filters & search ----------------------------------------------------
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  clearFilters: () =>
    set({ searchQuery: '', statusFilter: ALL, priorityFilter: ALL }),

  // --- selection (details drawer) -----------------------------------------
  selectTicket: (selectedId) => set({ selectedId }),
  closePanel: () => set({ selectedId: null }),

  // --- mutations -----------------------------------------------------------
  // Optimistically update local state, then persist via the mock API.
  updateTicketField: async (id, updates) => {
    set({ updatingId: id });
    // Optimistic update so the UI (and stats) reflect the change immediately.
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
    try {
      await updateTicket(id, updates);
    } finally {
      set({ updatingId: null });
    }
  },

  setStatus: (id, status) => get().updateTicketField(id, { status }),
  setPriority: (id, priority) => get().updateTicketField(id, { priority }),
}));

// --- derived selectors (plain functions, called with the store's state) ----

/** Tickets after applying search + status + priority filters (combinable). */
export function selectFilteredTickets(state) {
  const query = state.searchQuery.trim().toLowerCase();
  return state.tickets.filter((t) => {
    const matchesSearch =
      query === '' ||
      t.customer.name.toLowerCase().includes(query) ||
      t.subject.toLowerCase().includes(query);
    const matchesStatus =
      state.statusFilter === ALL || t.status === state.statusFilter;
    const matchesPriority =
      state.priorityFilter === ALL || t.priority === state.priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
}

/** Counts for the stat cards, computed from the full (unfiltered) ticket list. */
export function selectStats(state) {
  const stats = {
    total: state.tickets.length,
    open: 0,
    inProgress: 0,
    resolved: 0,
  };
  for (const t of state.tickets) {
    if (t.status === STATUS.OPEN) stats.open += 1;
    else if (t.status === STATUS.IN_PROGRESS) stats.inProgress += 1;
    else if (t.status === STATUS.RESOLVED) stats.resolved += 1;
  }
  return stats;
}

/** The currently selected ticket object (or null). */
export function selectSelectedTicket(state) {
  return state.tickets.find((t) => t.id === state.selectedId) || null;
}
