export default function GamePlaceholder({ city, onBack }: { city: string; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4">Welcome to {city}!</h2>
      <p className="mb-4">(Game board coming soon...)</p>
      <button
        className="px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
        onClick={onBack}
      >
        &larr; Back to City Selection
      </button>
    </div>
  );
}
