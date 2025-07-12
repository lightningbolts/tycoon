export interface City {
  name: string;
  country: string;
  description: string;
  emoji: string;
}

interface CitySelectProps {
  cities: City[];
  onSelect: (city: string) => void;
  onBack: () => void;
}

export default function CitySelect({ cities, onSelect, onBack }: CitySelectProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4">Choose Your Starting City</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {cities.map((c) => (
          <button
            key={c.name}
            className="flex flex-col items-start p-5 rounded-lg bg-gray-800 hover:bg-blue-700 transition border border-gray-700 shadow gap-2 text-left"
            onClick={() => onSelect(c.name)}
          >
            <span className="text-3xl mb-1">{c.emoji}</span>
            <span className="font-bold text-lg">{c.name}, {c.country}</span>
            <span className="text-gray-300 text-sm">{c.description}</span>
          </button>
        ))}
      </div>
      <button
        className="mt-8 px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
        onClick={onBack}
      >
        &larr; Back to Start
      </button>
    </div>
  );
}
