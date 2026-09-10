import { AlertIcon } from './icons';

// Skeleton placeholder rows shown while tickets are loading.
export function LoadingSkeleton({ rows = 6 }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="hidden h-6 w-24 animate-pulse rounded bg-gray-200 sm:block" />
        </div>
      ))}
    </div>
  );
}

// Shown when the initial fetch fails; offers a retry button.
export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertIcon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        Couldn&apos;t load tickets
      </h3>
      <p className="mt-1 max-w-sm text-sm text-gray-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
