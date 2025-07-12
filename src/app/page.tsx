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

// Commodities for trading
const GOODS = [
	{
		name: "Lithium",
		price: 12000,
		emoji: "🔋",
		risk: "Medium",
		desc: "Needed for batteries, high demand",
	},
	{
		name: "AI Chips",
		price: 25000,
		emoji: "💾",
		risk: "High",
		desc: "Advanced silicon, volatile pricing",
	},
	{
		name: "Data Sets",
		price: 8000,
		emoji: "📊",
		risk: "Medium",
		desc: "For training models, high ROI",
	},
	{
		name: "NFTs",
		price: 5000,
		emoji: "🖼️",
		risk: "Very High",
		desc: "Speculative digital assets",
	},
	{
		name: "Cloud Credits",
		price: 2000,
		emoji: "☁️",
		risk: "Low",
		desc: "Compute power, stable and essential",
	},
	{
		name: "Green Bonds",
		price: 3000,
		emoji: "🌱",
		risk: "Low",
		desc: "Eco-investments",
	},
	{
		name: "Startups",
		price: 40000,
		emoji: "🚀",
		risk: "Very High",
		desc: "Packaged equity, high profit or bust",
	},
];

function getInitialPrices() {
	const prices: { [good: string]: number } = {};
	GOODS.forEach((g) => {
		prices[g.name] = g.price;
	});
	return prices;
}

function fluctuatePrice(base: number) {
	// Fluctuate price by +40% to +150% (i.e., 40% to 250% of base)
	const change = 0.4 + Math.random() * 1.85; // 0.4 to 2.25
	return Math.max(100, Math.round(base * change));
}

export default function Home() {
	const [started, setStarted] = useState(false);
	const [city, setCity] = useState<string | null>(null);
	const [turn, setTurn] = useState(1);
	const [cash, setCash] = useState(STARTING_CASH);
	const [infra] = useState(STARTING_INFRA);
	const [showTrade, setShowTrade] = useState(false);
	const [inventory, setInventory] = useState<{ [good: string]: number }>({});
	const [prices, setPrices] = useState(getInitialPrices());

	function handleNextTurn() {
		setTurn((t) => t + 1);
		setPrices((prev) => {
			const newPrices: { [good: string]: number } = {};
			GOODS.forEach((g) => {
				// Use the base price, not the previous price, for each good
				newPrices[g.name] = fluctuatePrice(g.price);
			});
			return newPrices;
		});
	}

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
					&rarr; Back to Start
				</button>
			</div>
		);
	}

	// Main game UI after city selection
	return (
		<div className="flex flex-col items-center min-h-screen p-8 gap-8 bg-gray-950 text-white w-full">
			<header className="w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
				<div>
					<h2 className="text-2xl font-bold">{city}</h2>
					<span className="text-gray-400 text-sm">Turn {turn}</span>
				</div>
				<div className="flex gap-6 text-base">
					<span>💵 <b>${cash.toLocaleString()}</b></span>
					<span>☁️ <b>{infra}</b></span>
				</div>
			</header>
			<main className="w-full max-w-2xl flex flex-col gap-6 items-center">
				<div className="bg-gray-900/80 rounded-lg p-6 shadow w-full flex flex-col items-center gap-2">
					<p className="text-lg mb-2">What would you like to do?</p>
					<div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
						<button
							className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
							onClick={() => setShowTrade((v) => !v)}
						>
							Trade
						</button>
						<button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold" disabled>
							Upgrade (coming soon)
						</button>
						<button className="px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-700 font-semibold" disabled>
							Travel (coming soon)
						</button>
					</div>
				</div>
				{showTrade && (
					<div className="w-full bg-gray-800 rounded-lg p-4 shadow flex flex-col gap-4">
						<h3 className="text-lg font-bold mb-2">Market</h3>
						<table className="w-full text-sm mb-2">
							<thead>
								<tr className="text-gray-400">
									<th className="text-left">Good</th>
									<th>Price</th>
									<th>Risk</th>
									<th>Buy</th>
									<th>Sell</th>
									<th>Owned</th>
								</tr>
							</thead>
							<tbody>
								{GOODS.map((g) => (
									<tr key={g.name} className="border-t border-gray-700">
										<td className="py-1">{g.emoji} <b>{g.name}</b><br /><span className="text-xs text-gray-400">{g.desc}</span></td>
										<td className="text-center">${prices[g.name].toLocaleString()}</td>
										<td className="text-center">{g.risk}</td>
										<td className="text-center">
											<button
												className="px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded text-xs"
												disabled={cash < prices[g.name]}
												onClick={() => {
													if (cash >= prices[g.name]) {
														setCash(cash - prices[g.name]);
														setInventory((inv) => ({ ...inv, [g.name]: (inv[g.name] || 0) + 1 }));
													}
												}}
											>Buy</button>
										</td>
										<td className="text-center">
											<button
												className="px-2 py-1 bg-gray-700 hover:bg-gray-800 rounded text-xs"
												disabled={!inventory[g.name]}
												onClick={() => {
													if (inventory[g.name]) {
														setCash(cash + prices[g.name]);
														setInventory((inv) => ({ ...inv, [g.name]: inv[g.name] - 1 }));
													}
												}}
											>Sell</button>
										</td>
										<td className="text-center">{inventory[g.name] || 0}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<div className="w-full max-w-md bg-gray-900/80 rounded-lg p-4 shadow flex flex-col gap-2">
					<h4 className="font-semibold mb-1">Inventory</h4>
					{Object.keys(inventory).length === 0 ? (
						<span className="text-gray-400">No goods owned yet.</span>
					) : (
						<ul className="text-sm">
							{Object.entries(inventory).map(([good, qty]) =>
								qty > 0 ? (
									<li key={good}>{good}: <b>{qty}</b></li>
								) : null
							)}
						</ul>
					)}
				</div>
				<button
					className="mt-4 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow transition"
					onClick={handleNextTurn}
				>
					Next Turn
				</button>
				<button
					className="mt-2 px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
					onClick={() => setCity(null)}
				>
					&rarr; Back to City Selection
				</button>
			</main>
		</div>
	);
}
