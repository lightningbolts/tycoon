import React from "react";

interface GameResultStatsProps {
  status: "win" | "lose";
  rank: number;
  stats: {
    cash: number;
    debt: number;
    infra?: string;
    security?: boolean;
    analytics?: boolean;
    automation?: boolean;
    bonuses?: string[];
    reputation: number;
    tycoonIndex: number;
    index: number;
    rankName: string;
    asicCount: number;
    serverHealth: number;
    inventory: Record<string, number>;
  };
}


const GameResultStats: React.FC<GameResultStatsProps> = ({ status, rank, stats }) => (
  <section className="w-full py-12 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
    <h1 className={`text-6xl font-extrabold mb-8 ${status === "win" ? "text-green-400" : "text-red-400"} text-left tracking-tight`}>
      {status === "win" ? "🏆 YOU WIN!" : "💀 GAME OVER"}
    </h1>
    <div className="flex flex-wrap gap-12 mb-10">
      <div className="flex flex-col gap-2 min-w-[220px]">
        <span className="text-2xl font-bold text-white">Tycoon Index</span>
        <span className="text-3xl font-extrabold text-yellow-300">{stats.tycoonIndex}</span>
        <span className="text-lg font-semibold text-blue-400">Index: {stats.index}</span>
        <span className="text-lg font-bold text-purple-300">Rating: <span className="text-pink-400">{stats.rankName}</span></span>
      </div>
      <div className="flex flex-col gap-2 min-w-[220px]">
        <span className="text-lg font-bold text-white">💵 Cash</span>
        <span className="text-2xl text-green-300 font-bold">${stats.cash.toLocaleString()}</span>
        <span className="text-lg font-bold text-white">💳 Debt</span>
        <span className="text-2xl text-red-300 font-bold">${stats.debt.toLocaleString()}</span>
      </div>
      <div className="flex flex-col gap-2 min-w-[220px]">
        <span className="text-lg font-bold text-white">☁️ Infrastructure</span>
        <span className="text-xl text-gray-200">{stats.infra || "-"}</span>
        <span className="text-lg font-bold text-white">🔒 Security</span>
        <span className="text-xl text-gray-200">{stats.security ? "Enabled" : "None"}</span>
        <span className="text-lg font-bold text-white">📊 Analytics</span>
        <span className="text-xl text-gray-200">{stats.analytics ? "Enabled" : "None"}</span>
        <span className="text-lg font-bold text-white">🤖 Automation</span>
        <span className="text-xl text-gray-200">{stats.automation ? "Enabled" : "None"}</span>
      </div>
      <div className="flex flex-col gap-2 min-w-[220px]">
        <span className="text-lg font-bold text-white">🎁 Bonuses</span>
        <span className="text-xl text-yellow-200">{stats.bonuses && stats.bonuses.length ? stats.bonuses.join(", ") : "None"}</span>
        <span className="text-lg font-bold text-white">⭐ Reputation</span>
        <span className="text-xl text-yellow-300">{stats.reputation}</span>
        <span className="text-lg font-bold text-white">🔧 ASICs</span>
        <span className="text-xl text-cyan-300">{stats.asicCount}</span>
        <span className="text-lg font-bold text-white">🩺 Server Health</span>
        <span className="text-xl text-green-400">{stats.serverHealth}/100</span>
      </div>
    </div>
    <div className="mb-8">
      <div className="text-2xl font-bold text-white mb-2">📦 Inventory</div>
      <ul className="list-disc ml-8 text-gray-200 text-lg grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
        {Object.entries(stats.inventory).map(([item, qty]) => (
          <li key={item}><span className="font-semibold text-white">{item}</span>: <span className="text-yellow-200">{qty}</span></li>
        ))}
      </ul>
    </div>
    <div className="mt-12">
      <button className="px-10 py-4 rounded bg-blue-700 text-white font-bold shadow text-xl hover:bg-blue-800 transition" onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  </section>
);

export default GameResultStats;