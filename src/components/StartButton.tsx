export default function StartButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="mt-4 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow transition"
      onClick={onClick}
    >
      Start Game
    </button>
  );
}
