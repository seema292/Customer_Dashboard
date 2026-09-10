# Customer Support Dashboard

A clean, responsive dashboard for a support team to view and manage customer
tickets. Built with **React**, **Tailwind CSS**, and **Zustand** for state
management, scaffolded with **Vite**.

## Features

- **Dashboard stats** — live counts for Total, Open, In Progress, and Resolved
  tickets, computed from the ticket data (they update instantly when a status
  changes).
- **Ticket list** — customer name, subject, priority, status, and created date.
  Renders as a **table on desktop** and switches to a **card layout on mobile**.
- **Search** — filter by customer name or subject.
- **Filters** — status and priority dropdowns, fully **combinable** with search.
- **Inline status change** — update a ticket's status directly from the list;
  the change is reflected immediately in state and in the stat cards.
- **Details drawer** — clicking a ticket opens a slide-over panel with customer
  info (name, email, initials avatar), full description, editable status and
  priority, created date/time, and a mock conversation thread. Closes on
  backdrop click or the `Esc` key.
- **Async states** — loading skeleton, error state with a retry button, and an
  empty state (with a "clear filters" shortcut) when nothing matches.

## Tech stack

| Concern          | Choice                                   |
| ---------------- | ---------------------------------------- |
| Framework        | React 18 (functional components + hooks) |
| Build tool       | Vite 5                                    |
| Styling          | Tailwind CSS 3                            |
| State management | Zustand 4                                 |
| Data             | Local mock data + simulated async API    |

## Getting started

Requires **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

## Project structure

```
src/
├── api/
│   └── ticketApi.js         # Simulated REST API (setTimeout-based fetch/update)
├── components/
│   ├── Avatar.jsx           # Initials avatar with deterministic color
│   ├── ConversationThread.jsx
│   ├── EmptyState.jsx
│   ├── FilterDropdown.jsx   # Reusable labelled <select>
│   ├── PriorityBadge.jsx    # Color-coded priority pill
│   ├── PrioritySelect.jsx   # Editable priority (details panel)
│   ├── SearchBar.jsx
│   ├── StatCard.jsx         # Single dashboard metric card
│   ├── StateViews.jsx       # LoadingSkeleton + ErrorState
│   ├── StatsBar.jsx         # The four stat cards
│   ├── StatusBadge.jsx      # Color-coded status pill
│   ├── StatusSelect.jsx     # Inline status changer
│   ├── TicketCard.jsx       # Mobile card layout
│   ├── TicketDetailsPanel.jsx
│   ├── TicketList.jsx       # Table (desktop) + cards (mobile)
│   ├── TicketRow.jsx        # Desktop table row
│   └── icons.jsx            # Inline SVG icons (no icon dependency)
├── data/
│   ├── constants.js         # STATUS / PRIORITY enums + option lists
│   └── mockTickets.js       # Seed ticket data
├── store/
│   └── useTicketStore.js    # Zustand store + derived selectors
├── utils/
│   └── format.js            # Date/initials/color helpers
├── App.jsx                  # Layout + wiring
├── main.jsx                 # Entry point
└── index.css                # Tailwind directives + small utilities
```

## How the data & state work

- **Mock API** (`src/api/ticketApi.js`): `fetchTickets()` returns a `Promise`
  that resolves after a short delay to simulate network latency, so the UI can
  exercise its loading state. `updateTicket()` simulates persisting a change.
  There is a `SIMULATE_ERROR` flag at the top of the file — set it to `true` to
  test the error/retry UI.
- **Store** (`src/store/useTicketStore.js`): holds `tickets`, `loading`,
  `error`, `searchQuery`, `statusFilter`, `priorityFilter`, `selectedId`, and
  `updatingId`. Selectors (`selectFilteredTickets`, `selectStats`,
  `selectSelectedTicket`) derive the filtered list, stat counts, and the
  currently open ticket. Status/priority edits update state **optimistically**
  before the mock API call resolves.

## Notes / design decisions

- A **side drawer** is used for ticket details rather than a separate page —
  it keeps the list context visible and is a cleaner UX for quick triage.
- **Native `<select>`** elements power the filters and inline status/priority
  editors: they are accessible, keyboard-friendly, and behave well on mobile
  without extra dependencies.
- Icons are hand-written inline SVGs to avoid pulling in an icon library.
- Stats are computed from the **full** ticket list, while the table reflects
  the **filtered** list, so the top-level counts stay stable while you filter.

## AI tools used

This project was built with the assistance of **Kiro (AI coding assistant)**,
which was used to scaffold the project, generate the components and Zustand
store, and write this documentation. All generated code was reviewed and
verified with a production build.
"# Customer_Dashboard" 
