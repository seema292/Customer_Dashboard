import {
  TicketIcon,
  HomeIcon,
  UsersIcon,
  ChartIcon,
  SettingsIcon,
  CloseIcon,
} from './icons';

/**
 * Dark, gradient sidebar with primary navigation.
 *
 * On desktop it is a fixed left rail. On mobile it slides in as an overlay
 * controlled by `open` / `onClose`.
 *
 * The nav items are illustrative (this is a single-view app), so "Tickets"
 * is marked active; the rest are decorative placeholders that give the
 * dashboard a fuller, more professional feel.
 */
const NAV_ITEMS = [
  { label: 'Dashboard', icon: HomeIcon },
  { label: 'Tickets', icon: TicketIcon, active: true },
  { label: 'Customers', icon: UsersIcon },
  { label: 'Analytics', icon: ChartIcon },
  { label: 'Settings', icon: SettingsIcon },
];

function NavList() {
  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
        <a
          key={label}
          href="#"
          aria-current={active ? 'page' : undefined}
          className={
            active
              ? 'flex items-center gap-3 rounded-lg bg-indigo-500/90 px-3 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-900/40'
              : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white'
          }
          onClick={(e) => e.preventDefault()}
        >
          <Icon className="h-5 w-5" />
          {label}
        </a>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-md shadow-indigo-900/50">
        <TicketIcon />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white">SupportDesk</p>
        <p className="text-xs text-slate-400">Help Center</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-white/10 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-semibold text-white">
          ST
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">Support Team</p>
          <p className="truncate text-xs text-slate-400">admin@supportdesk.io</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  const panel = (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Brand />
      <NavList />
      <Footer />
    </div>
  );

  return (
    <>
      {/* Desktop: fixed rail */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-64">{panel}</div>
      </aside>

      {/* Mobile: slide-over overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/60 animate-fade-in"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-64 animate-slide-in-left shadow-2xl">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CloseIcon />
            </button>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
