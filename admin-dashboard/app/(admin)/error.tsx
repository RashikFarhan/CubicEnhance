'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 max-w-lg w-full text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-500 text-sm mb-2">
          This page failed to load data from the database. This is usually a temporary issue.
        </p>
        <p className="text-xs text-red-600 font-mono bg-red-50 px-3 py-2 rounded mb-6 break-all">
          {error.message || 'Unknown error'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#30495f] text-white text-sm font-medium rounded-lg hover:bg-[#5c829c] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && error.stack && (
          <pre className="mt-4 text-left text-xs text-gray-400 bg-gray-50 p-3 rounded overflow-auto max-h-40">
            {error.stack}
          </pre>
        )}
      </div>
    </div>
  );
}
