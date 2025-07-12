'use client';
import Image from "next/image";

import { useState } from "react";

const STARTING_CASH = 100000;
const STARTING_INFRA = "Small Cloud Server";

const CITIES = [
  {
    name: "San Francisco",
    country: "USA",
    description: "Tech capital",
    emoji: "🌉",
  },
  {
    name: "Shenzhen",
    country: "China",
    description: "Hardware & chips",
    emoji: "🏙️",
  },
  {
    name: "Bangalore",
    country: "India",
    description: "Software talent",
    emoji: "🕌",
  },
  {
    name: "Berlin",
    country: "Germany",
    description: "GreenTech & AI",
    emoji: "🦾",
  },
  {
    name: "Lagos",
    country: "Nigeria",
    description: "Fintech & mobile markets",
    emoji: "🌍",
  },
  {
    name: "Dubai",
    country: "UAE",
    description: "Logistics & crypto hub",
    emoji: "🏜️",
  },
  {
    name: "São Paulo",
    country: "Brazil",
    description: "Emerging data market",
    emoji: "🌆",
  },
  // Additional cities
  {
    name: "London",
    country: "UK",
    description: "Fintech & AI hub",
    emoji: "🎡",
  },
  {
    name: "Tokyo",
    country: "Japan",
    description: "Robotics & automation",
    emoji: "🗼",
  },
  {
    name: "Seoul",
    country: "South Korea",
    description: "Mobile & gaming giant",
    emoji: "🎮",
  },
  {
    name: "Toronto",
    country: "Canada",
    description: "AI research & startups",
    emoji: "🍁",
  },
  {
    name: "Tel Aviv",
    country: "Israel",
    description: "Cybersecurity & innovation",
    emoji: "🕍",
  },
  {
    name: "Singapore",
    country: "Singapore",
    description: "Smart city & logistics",
    emoji: "🦁",
  },
  {
    name: "Sydney",
    country: "Australia",
    description: "GreenTech & fintech",
    emoji: "🌏",
  },
  {
    name: "Tallinn",
    country: "Estonia",
    description: "E-government & digital society",
    emoji: "🏰",
  },
  {
    name: "Zurich",
    country: "Switzerland",
    description: "Crypto & finance",
    emoji: "🏦",
  },
  {
    name: "Bucharest",
    country: "Romania",
    description: "Outsourcing & cybersecurity",
    emoji: "🏛️",
  },
  {
    name: "Jakarta",
    country: "Indonesia",
    description: "E-commerce & fintech",
    emoji: "🌋",
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <header className="flex flex-col items-center gap-2">
          <Image
            src="/next.svg"
            alt="Tycoon Logo"
            width={120}
            height={30}
            className="mb-2 dark:invert"
          />
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Tycoon: Tech Empire
          </h1>
          <p className="text-lg text-gray-300 max-w-xl text-center">
            Build a tech empire by trading futuristic commodities, upgrading
            infrastructure, and navigating a dynamic global economy. Reach $1B,
            IPO, or dominate all sectors!
          </p>
        </header>
        <section className="bg-black/30 rounded-lg p-6 shadow-lg flex flex-col items-center gap-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Your Starting Assets</h2>
          <ul className="text-base text-gray-200 list-disc list-inside">
            <li>
              💵{" "}
              <b>${STARTING_CASH.toLocaleString()}</b> cash
            </li>
            <li>
              ☁️ <b>{STARTING_INFRA}</b>
            </li>
            <li>
              Optional: Take a{" "}
              <span className="text-yellow-300">VC loan</span> (risky!)
            </li>
          </ul>
        </section>
        <button
          className="mt-4 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow transition"
          onClick={() => setStarted(true)}
        >
          Start Game
        </button>
        <footer className="mt-8 text-xs text-gray-400">
          Tycoon Game &copy; 2025
        </footer>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-950 text-white">
        <h2 className="text-2xl font-bold mb-4">Choose Your Starting City</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {CITIES.map((c) => (
            <button
              key={c.name}
              className="flex flex-col items-start p-5 rounded-lg bg-gray-800 hover:bg-blue-700 transition border border-gray-700 shadow gap-2 text-left"
              onClick={() => setCity(c.name)}
            >
              <span className="text-3xl mb-1">{c.emoji}</span>
              <span className="font-bold text-lg">
                {c.name}, {c.country}
              </span>
              <span className="text-gray-300 text-sm">
                {c.description}
              </span>
            </button>
          ))}
        </div>
        <button
          className="mt-8 px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
          onClick={() => setStarted(false)}
        >
          &larr; Back to Start
        </button>
      </div>
    );
  }

  // Placeholder for main game UI after city selection
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4">Welcome to {city}!</h2>
      <p className="mb-4">(Game board coming soon...)</p>
      <button
        className="px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
        onClick={() => setCity(null)}
      >
        &larr; Back to City Selection
      </button>
    </div>
  );
}
