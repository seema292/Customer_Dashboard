import { mockTickets } from '../data/mockTickets';

// Simulated REST API.
// Each function returns a Promise that resolves after a short delay to mimic
// real network latency, so the UI can exercise its loading / error states.

const NETWORK_DELAY_MS = 900;

// Flip this to true to force fetchTickets to reject and test the error/retry UI.
const SIMULATE_ERROR = false;

/**
 * GET /tickets — returns the full list of tickets.
 * Resolves with a deep copy so callers cannot mutate the source data directly.
 * @returns {Promise<Array>}
 */
export function fetchTickets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_ERROR) {
        reject(new Error('Failed to load tickets. Please try again.'));
        return;
      }
      // structuredClone gives us an independent copy of the nested objects.
      resolve(structuredClone(mockTickets));
    }, NETWORK_DELAY_MS);
  });
}

/**
 * PATCH /tickets/:id — simulate persisting a partial ticket update.
 * The store updates local state optimistically; this just mimics the round-trip.
 * @param {string} id
 * @param {object} updates
 * @returns {Promise<{id: string, updates: object}>}
 */
export function updateTicket(id, updates) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, updates });
    }, 300);
  });
}
