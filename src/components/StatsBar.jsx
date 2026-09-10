import StatCard from './StatCard';
import { TicketIcon, InboxIcon, ClockIcon, CheckCircleIcon } from './icons';

// Renders the four dashboard metric cards. `stats` is computed in the store
// from the full ticket list, so counts update live when a status changes.
export default function StatsBar({ stats }) {
  const cards = [
    { label: 'Total Tickets', value: stats.total, accent: 'indigo', icon: <TicketIcon /> },
    { label: 'Open', value: stats.open, accent: 'blue', icon: <InboxIcon /> },
    { label: 'In Progress', value: stats.inProgress, accent: 'amber', icon: <ClockIcon /> },
    { label: 'Resolved', value: stats.resolved, accent: 'emerald', icon: <CheckCircleIcon /> },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </div>
  );
}
