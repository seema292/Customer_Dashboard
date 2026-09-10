import { formatDateTime } from '../utils/format';

// Renders the mock conversation between the customer and support agents.
// Customer messages align left; agent messages align right in an accent color.
export default function ConversationThread({ messages = [] }) {
  if (messages.length === 0) {
    return <p className="text-sm text-gray-500">No messages yet.</p>;
  }
  return (
    <ul className="space-y-4">
      {messages.map((m) => {
        const isAgent = m.role === 'agent';
        return (
          <li key={m.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${isAgent ? 'items-end text-right' : 'items-start'}`}>
              <div
                className={`rounded-2xl px-3.5 py-2 text-sm ${
                  isAgent
                    ? 'rounded-br-sm bg-indigo-600 text-white'
                    : 'rounded-bl-sm bg-gray-100 text-gray-800'
                }`}
              >
                {m.text}
              </div>
              <p className="mt-1 px-1 text-[11px] text-gray-400">
                {m.author} · {formatDateTime(m.timestamp)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
