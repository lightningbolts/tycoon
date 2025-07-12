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

function fluctuatePrice(base: number, risk: string, name?: string) {
	// Special case for Startups: rare booms and busts
	if (name === "Startups") {
		const roll = Math.random();
		if (roll < 0.05) {
			// 5% chance: unicorn boom (5x-15x)
			return Math.max(100, Math.round(base * (5 + Math.random() * 10)));
		} else if (roll < 0.20) {
			// 15% chance: total bust (0.1x-0.3x)
			return Math.max(100, Math.round(base * (0.1 + Math.random() * 0.2)));
		} else {
			const min = 0.3, max = 2.5;
			const change = min + Math.random() * (max - min);
			return Math.max(100, Math.round(base * change));
		}
	}
	// Realistic behaviors for other goods
	if (name === "Lithium") {
		// Lithium: slow uptrend, rare spikes
		const roll = Math.random();
		if (roll < 0.05) {
			// 5% chance: spike (2x-3x)
			return Math.max(100, Math.round(base * (2 + Math.random() * 1)));
		}
		// Otherwise: slow uptrend (95% to 120%)
		const change = 0.95 + Math.random() * 0.25;
		return Math.max(100, Math.round(base * change));
	}
	if (name === "AI Chips") {
		// AI Chips: high volatility, rare shortages
		const roll = Math.random();
		if (roll < 0.08) {
			// 8% chance: chip shortage (2x-4x)
			return Math.max(100, Math.round(base * (2 + Math.random() * 2)));
		}
		const min = 0.5, max = 2.2;
		const change = min + Math.random() * (max - min);
		return Math.max(100, Math.round(base * change));
	}
	if (name === "Data Sets") {
		// Data Sets: moderate, but can boom with AI trends
		const roll = Math.random();
		if (roll < 0.07) {
			// 7% chance: AI boom (1.5x-2.5x)
			return Math.max(100, Math.round(base * (1.5 + Math.random() * 1)));
		}
		const min = 0.7, max = 1.5;
		const change = min + Math.random() * (max - min);
		return Math.max(100, Math.round(base * change));
	}
	if (name === "NFTs") {
		// NFTs: mostly down, rare hype spikes
		const roll = Math.random();
		if (roll < 0.03) {
			// 3% chance: hype (3x-8x)
			return Math.max(100, Math.round(base * (3 + Math.random() * 5)));
		}
		// Otherwise: mostly down (20% to 80%)
		const change = 0.2 + Math.random() * 0.6;
		return Math.max(100, Math.round(base * change));
	}
	if (name === "Cloud Credits") {
		// Cloud Credits: stable, small fluctuations
		const change = 0.95 + Math.random() * 0.1; // 95% to 105%
		return Math.max(100, Math.round(base * change));
	}
	if (name === "Green Bonds") {
		// Green Bonds: stable, slow uptrend
		const change = 1.0 + Math.random() * 0.15; // 100% to 115%
		return Math.max(100, Math.round(base * change));
	}
	// Default: risk-based
	let min = 1, max = 1;
	if (risk === "Low") {
		min = 0.85; max = 1.25;
	} else if (risk === "Medium") {
		min = 0.6; max = 1.6;
	} else if (risk === "High") {
		min = 0.4; max = 2.0;
	} else if (risk === "Very High") {
		min = 0.2; max = 3.0;
	}
	const change = min + Math.random() * (max - min);
	return Math.max(100, Math.round(base * change));
}

// Event definitions
const EVENTS = [
	{
		type: "Economic",
		text: "AI boom! Data Sets surge in value.",
		effect: (state: any) => {
			const newPrices = { ...state.prices };
			if (newPrices["Data Sets"]) newPrices["Data Sets"] = Math.round(newPrices["Data Sets"] * 2);
			return { ...state, prices: newPrices, eventMsg: "AI boom! Data Sets prices doubled." };
		},
	},
	{
		type: "Economic",
		text: "Recession! All prices drop.",
		effect: (state: any) => {
			const newPrices = { ...state.prices };
			Object.keys(newPrices).forEach((k) => newPrices[k] = Math.round(newPrices[k] * 0.7));
			return { ...state, prices: newPrices, eventMsg: "Recession! All prices dropped 30%." };
		},
	},
	{
		type: "Tech",
		text: "Chip shortage! AI Chips skyrocket.",
		effect: (state: any) => {
			const newPrices = { ...state.prices };
			if (newPrices["AI Chips"]) newPrices["AI Chips"] = Math.round(newPrices["AI Chips"] * 2.5);
			return { ...state, prices: newPrices, eventMsg: "Chip shortage! AI Chips prices up 150%." };
		},
	},
	{
		type: "Personal",
		text: "Cyberattack! Hackers are trying to breach your systems.",
		effect: (state: any) => {
			const defenseRoll = Math.random();
			if (defenseRoll < 0.2) {
				// 20% chance: you fight them off, gain rep
				return { ...state, eventMsg: "You fended off a major cyberattack! Your reputation in the tech world grows." };
			} else if (defenseRoll < 0.5) {
				// 30% chance: partial breach, lose some cash
				const loss = Math.round(state.cash * (0.1 + Math.random() * 0.15));
				return { ...state, cash: Math.max(0, state.cash - loss), eventMsg: `Partial cyber breach! Lost $${loss.toLocaleString()}.` };
			} else if (defenseRoll < 0.9) {
				// 40% chance: major breach, lose more cash and a random good
				const loss = Math.round(state.cash * (0.25 + Math.random() * 0.25));
				const goods = Object.keys(state.inventory).filter((k) => state.inventory[k] > 0);
				let lostGoodMsg = "";
				if (goods.length > 0) {
					const pick = goods[Math.floor(Math.random() * goods.length)];
					const newInv = { ...state.inventory, [pick]: Math.max(0, state.inventory[pick] - 1) };
					lostGoodMsg = ` and 1 ${pick}`;
					return { ...state, cash: Math.max(0, state.cash - loss), inventory: newInv, eventMsg: `Major cyber breach! Lost $${loss.toLocaleString()}${lostGoodMsg}.` };
				}
				return { ...state, cash: Math.max(0, state.cash - loss), eventMsg: `Major cyber breach! Lost $${loss.toLocaleString()}.` };
			} else {
				// 10% chance: hackers demand ransom, pay or lose all cash
				if (state.cash > 0 && Math.random() < 0.5) {
					const ransom = Math.round(state.cash * 0.5);
					return { ...state, cash: Math.max(0, state.cash - ransom), eventMsg: `Hackers demand ransom! Paid $${ransom.toLocaleString()} to keep your systems safe.` };
				} else {
					return { ...state, cash: 0, eventMsg: "Hackers wiped your accounts! All cash lost." };
				}
			}
		},
	},
	{
		type: "Opportunity",
		text: "Insider tip! One good is free.",
		effect: (state: any) => {
			const goods = Object.keys(state.inventory);
			const pick = goods[Math.floor(Math.random() * goods.length)] || "Lithium";
			const newInv = { ...state.inventory, [pick]: (state.inventory[pick] || 0) + 1 };
			return { ...state, inventory: newInv, eventMsg: `Insider tip! Gained 1 ${pick}.` };
		},
	},
	{
		type: "Personal",
		text: "Tax audit! Pay a fine.",
		effect: (state: any) => {
			const fine = 5000;
			return { ...state, cash: Math.max(0, state.cash - fine), eventMsg: `Tax audit! Paid $${fine.toLocaleString()} fine.` };
		},
	},
];

const UPGRADES = [
	{
		name: "Medium Cloud Server",
		cost: 50000,
		desc: "Increase trading capacity. Unlocks better price negotiation.",
		benefit: "+10% better sell prices, +2000 cloud storage",
		requires: [],
		city: null,
		effect: (state: any) => ({ ...state, infra: "Medium Cloud Server", sellBonus: 0.1, maxCloudStorage: 2000 }),
	},
	{
		name: "AI Security Suite",
		cost: 75000,
		desc: "Reduce cyberattack losses.",
		benefit: "-50% cyberattack cash loss",
		requires: [],
		city: null,
		effect: (state: any) => ({ ...state, security: true }),
	},
	{
		name: "Big Data Warehouse",
		cost: 120000,
		desc: "Store more goods.",
		benefit: "+2 max inventory per good, +5000 cloud storage",
		requires: ["Medium Cloud Server"],
		city: null,
		effect: (state: any) => ({ ...state, maxInventory: 10, maxCloudStorage: 5000 }),
	},
	{
		name: "Global Analytics Platform",
		cost: 200000,
		desc: "See price trends and predict market events.",
		benefit: "Unlocks market forecasting",
		requires: ["Big Data Warehouse"],
		city: null,
		effect: (state: any) => ({ ...state, analytics: true }),
	},
	{
		name: "Automation Suite",
		cost: 300000,
		desc: "Automate trading for passive income.",
		benefit: "+$10,000 per turn",
		requires: ["Global Analytics Platform"],
		city: null,
		effect: (state: any) => ({ ...state, automation: true }),
	},
	{
		name: "Shenzhen Supply Chain",
		cost: 100000,
		desc: "Lower hardware prices in Shenzhen.",
		benefit: "-20% AI Chips & Lithium prices in Shenzhen",
		requires: [],
		city: "Shenzhen",
		effect: (state: any) => ({ ...state, shenzhenBonus: true }),
	},
	{
		name: "Bangalore Dev Hub",
		cost: 100000,
		desc: "Lower Data Sets & Cloud Credits prices in Bangalore.",
		benefit: "-20% Data Sets & Cloud Credits prices in Bangalore",
		requires: [],
		city: "Bangalore",
		effect: (state: any) => ({ ...state, bangaloreBonus: true }),
	},
	{
		name: "IPO Preparation",
		cost: 1000000,
		desc: "Prepare for a public offering.",
		benefit: "Unlocks win condition",
		requires: ["Automation Suite"],
		city: null,
		effect: (state: any) => ({ ...state, ipoReady: true }),
	},
];

export default function Home() {
	const [started, setStarted] = useState(false);
	const [city, setCity] = useState<string | null>("San Francisco");
	const [turn, setTurn] = useState(1);
	const [cash, setCash] = useState(STARTING_CASH);
	const [infra] = useState(STARTING_INFRA);
	const [showTrade, setShowTrade] = useState(false);
	const [inventory, setInventory] = useState<{ [good: string]: number }>({});
	const [prices, setPrices] = useState(getInitialPrices());
	const [eventMsg, setEventMsg] = useState<string | null>(null);
	const [pendingCyber, setPendingCyber] = useState<null | { defenseRoll: number }>(null);
	const [tradeQty, setTradeQty] = useState<{ [good: string]: number }>({});
	const [showUpgrade, setShowUpgrade] = useState(false);
	const [upgrades, setUpgrades] = useState<string[]>([]);
	const [sellBonus, setSellBonus] = useState(0);
	const [security, setSecurity] = useState(false);
	const [maxInventory, setMaxInventory] = useState(5);
	const [showTravel, setShowTravel] = useState(false);
	const [analytics, setAnalytics] = useState(false);
	const [automation, setAutomation] = useState(false);
	const [shenzhenBonus, setShenzhenBonus] = useState(false);
	const [bangaloreBonus, setBangaloreBonus] = useState(false);
	const [ipoReady, setIpoReady] = useState(false);
	// Add debt and cloudStorage state
	const [debt, setDebt] = useState(0);
	const [cloudStorage, setCloudStorage] = useState<{ [good: string]: number }>({});
	// Add state for wallet (on-hand cash) and bank balance
	const [wallet, setWallet] = useState(STARTING_CASH);
	const [bank, setBank] = useState(0);
	// Add state for modal
	const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
	// Win/loss modal state
	const [gameOver, setGameOver] = useState<{ win: boolean; reason: string } | null>(null);
	// Add reputation and score state
	const [reputation, setReputation] = useState(0);
	const [score, setScore] = useState(0);
	// Bank modal state
	const [showBankModal, setShowBankModal] = useState(false);
	const [bankAction, setBankAction] = useState<'deposit' | 'withdraw'>('deposit');
	const [bankAmount, setBankAmount] = useState('');
	const [bankError, setBankError] = useState<string | null>(null);
	const [maxCloudStorage, setMaxCloudStorage] = useState(1000);
	// Cloud storage modal state
	const [showCloudModal, setShowCloudModal] = useState(false);
	const [cloudTransferQty, setCloudTransferQty] = useState<{ [good: string]: number }>({});
	const [cloudError, setCloudError] = useState<string | null>(null);

	function handleCyberChoice(choice: 'fight' | 'pay' | 'ignore') {
		if (!pendingCyber) return;
		const roll = pendingCyber.defenseRoll;
		if (choice === 'fight') {
			if (roll < 0.2) {
				setReputation(r => r + 1);
				setEventMsg("You fended off a major cyberattack! Your reputation in the tech world grows.");
			} else if (roll < 0.5) {
				const loss = Math.round(cash * (0.1 + Math.random() * 0.15) * (security ? 0.5 : 1));
				setCash(Math.max(0, cash - loss));
				setEventMsg(`Partial cyber breach! Lost $${loss.toLocaleString()}.`);
			} else if (roll < 0.9) {
				const loss = Math.round(cash * (0.25 + Math.random() * 0.25) * (security ? 0.5 : 1));
				const goods = Object.keys(inventory).filter((k) => inventory[k] > 0);
				let lostGoodMsg = "";
				if (goods.length > 0) {
					const pick = goods[Math.floor(Math.random() * goods.length)];
					const newInv = { ...inventory, [pick]: Math.max(0, inventory[pick] - 1) };
					setInventory(newInv);
					lostGoodMsg = ` and 1 ${pick}`;
				}
				setCash(Math.max(0, cash - loss));
				setEventMsg(`Major cyber breach! Lost $${loss.toLocaleString()}${lostGoodMsg}.`);
			} else {
				if (cash > 0 && Math.random() < 0.5) {
					const ransom = Math.round(cash * 0.5);
					setCash(Math.max(0, cash - ransom));
					setEventMsg(`Hackers demand ransom! Paid $${ransom.toLocaleString()} to keep your systems safe.`);
				} else {
					setCash(0);
					setEventMsg("Hackers wiped your accounts! All cash lost.");
				}
			}
		} else if (choice === 'pay') {
			const ransom = Math.round(cash * 0.5);
			setCash(Math.max(0, cash - ransom));
			setEventMsg(`You paid the hackers $${ransom.toLocaleString()} to avoid damage.`);
		} else {
			// ignore: always lose all cash
			setCash(0);
			setEventMsg("You ignored the attack. Hackers wiped your accounts! All cash lost.");
		}
		setPendingCyber(null);
		setTimeout(() => setEventMsg(null), 5000);
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
			<header className="w-full max-w-2xl flex flex-col gap-4 mb-4">
				<div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">{city}</h2>
						<span className="text-gray-400 text-sm">Turn {turn}</span>
					</div>
					<div className="flex gap-6 text-base">
						<span>☁️ <b>{infra}</b></span>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-1">
						<h4 className="font-semibold mb-1">Inventory <span className="text-xs text-gray-400">({Object.values(inventory).reduce((a, b) => a + b, 0)}/{maxInventory * GOODS.length} total)</span></h4>
						{Object.keys(inventory).length === 0 ? (
							<span className="text-gray-400">No goods owned yet.</span>
						) : (
							<ul className="text-sm">
								{Object.entries(inventory).map(([good, qty]) =>
									qty > 0 ? (
										<li key={good}>{good}: <b>{qty}</b> <span className="text-xs text-gray-500">/ {maxInventory}</span></li>
									) : null
								)}
							</ul>
						)}
					</div>
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-1">
						<h4 className="font-semibold mb-1">Cloud Storage <span className="text-xs text-gray-400">({Object.values(cloudStorage).reduce((a, b) => a + b, 0)}/{maxCloudStorage})</span></h4>
						{Object.keys(cloudStorage).length === 0 ? (
							<span className="text-gray-400">No goods stored.</span>
						) : (
							<ul className="text-sm">
								{Object.entries(cloudStorage).map(([good, qty]) =>
									qty > 0 ? (
										<li key={good}>{good}: <b>{qty}</b></li>
									) : null
								)}
							</ul>
						)}
					</div>
					{/* Money indicators as a box, aligned with inventory/cloud storage */}
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-2 items-center justify-center">
						<h4 className="font-semibold mb-1">Finances</h4>
						<div className="flex flex-col gap-2 w-full">
							{/* Wallet */}
							<div className="flex items-center gap-2 w-full">
								<span className="text-lg">💵</span>
								<span className="font-bold text-lg">${wallet.toLocaleString()}</span>
								<span className="text-xs text-gray-400 ml-auto">Wallet</span>
							</div>
							{/* Bank */}
							<div className="flex items-center gap-2 w-full">
								<span className="text-lg">🏦</span>
								<span className="font-bold text-lg">${bank.toLocaleString()}</span>
								<span className="text-xs text-gray-400 ml-auto">Bank</span>
							</div>
							{/* Debt */}
							<div className="flex items-center gap-2 w-full">
								<span className="text-lg">💳</span>
								<span className="font-bold text-lg">${debt.toLocaleString()}</span>
								<span className="text-xs text-gray-400 ml-auto">Debt</span>
							</div>
							{/* Reputation */}
							<div className="flex items-center gap-2 w-full">
								<span className="text-lg">⭐</span>
								<span className="font-bold text-lg">{reputation}</span>
								<span className="text-xs text-gray-400 ml-auto">Reputation</span>
							</div>
							{/* Tycoon Index */}
							<div className="flex items-center gap-2 w-full">
								<span className="text-lg">📈</span>
								<span className="font-bold text-lg">{Math.round(score).toLocaleString()}</span>
								<span className="text-xs text-gray-400 ml-auto">Tycoon Index</span>
							</div>
						</div>
						{/* Retire button if $1B+ */}
						{(wallet + bank) >= 1_000_000_000 && !gameOver && (
							<button
								className="mt-4 px-6 py-2 rounded bg-green-700 hover:bg-green-800 text-lg font-semibold"
								onClick={() => setGameOver({ win: true, reason: `You retired as a billionaire! Final Tycoon Index: ${Math.round(score).toLocaleString()}` })}
							>
								Retire
							</button>
						)}
					</div>
				</div>
			</header>
			<main className="w-full max-w-2xl flex flex-col gap-6 items-center">
				{/* San Francisco special actions */}
				{city === "San Francisco" && (
					<div className="w-full max-w-2xl bg-blue-950/80 rounded-lg p-4 shadow flex flex-col gap-3 border border-blue-800">
						<h3 className="text-lg font-bold mb-2 text-blue-200">San Francisco Special Actions</h3>
						<div className="flex flex-wrap gap-3">
							<button
								className="px-4 py-2 rounded bg-yellow-700 hover:bg-yellow-800 text-white font-semibold"
								onClick={() => {
									// VC Borrow: +$50,000, +$60,000 debt
									setCash(cash + 50000);
									setDebt(debt + 60000);
									setEventMsg("You took a VC loan: +$50,000 cash, +$60,000 debt (with interest!)");
									setTimeout(() => setEventMsg(null), 4000);
								}}
							>
								💸 VC Borrow
							</button>
							<button
								className="px-4 py-2 rounded bg-green-700 hover:bg-green-800 text-white font-semibold"
								onClick={() => {
									setShowBankModal(true);
									setBankAction('deposit');
									setBankAmount('');
									setBankError(null);
								}}
							>
								🏦 Bank (Deposit/Withdraw)
							</button>
							<button
								className="px-4 py-2 rounded bg-cyan-700 hover:bg-cyan-800 text-white font-semibold"
								onClick={() => {
									setShowCloudModal(true);
									setCloudTransferQty({});
									setCloudError(null);
								}}
							>
								☁️ Manage Cloud Storage
							</button>
							<button
								className="px-4 py-2 rounded bg-red-700 hover:bg-red-800 text-white font-semibold"
								onClick={() => {
									// Server Repair: pay $10,000 to repair (flavor only)
									if (cash >= 10000) {
										setCash(cash - 10000);
										setEventMsg("Server repaired! Infrastructure is stable.");
									} else {
										setEventMsg("Not enough cash for server repair.");
									}
									setTimeout(() => setEventMsg(null), 3000);
								}}
							>
								🛠️ Server Repair ($10,000)
							</button>
						</div>
					</div>
				)}
				<div className="bg-gray-900/80 rounded-lg p-6 shadow w-full flex flex-col items-center gap-2">
					<p className="text-lg mb-2">What would you like to do?</p>
					<div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
						<button
							className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
							onClick={() => setShowTrade((v) => !v)}
						>
							Trade
						</button>
						<button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold" onClick={() => setShowUpgrade(true)}>
							Upgrade
						</button>
						<button className="px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-700 font-semibold" onClick={() => setShowTravel(true)}>
							Travel
						</button>
					</div>
				</div>
				{eventMsg && !showTrade && (
					<div className="w-full max-w-2xl bg-yellow-900/80 text-yellow-200 rounded-lg p-4 shadow text-center font-semibold animate-pulse mb-4">
						{eventMsg}
					</div>
				)}
				{showTrade && (
					<div className="w-full bg-gray-800 rounded-lg p-4 shadow flex flex-col gap-4">
						<h3 className="text-lg font-bold mb-2">Market</h3>
						{/* Alerts above trading table */}
						{pendingCyber && (
							<div className="w-full bg-red-900/90 text-red-100 rounded-lg p-6 shadow text-center font-semibold flex flex-col gap-4 animate-pulse mb-4">
								<p>Cyberattack! Hackers are trying to breach your systems.<br/>What will you do?</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<button className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800" onClick={() => handleCyberChoice('fight')}>Fight Off</button>
									<button className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-black font-bold" onClick={() => handleCyberChoice('pay')}>Pay Ransom</button>
									<button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-800" onClick={() => handleCyberChoice('ignore')}>Ignore</button>
								</div>
							</div>
						)}
						{eventMsg && showTrade && !eventMsg.startsWith('Arrived in') && (
							<div className="w-full bg-yellow-900/80 text-yellow-200 rounded-lg p-4 shadow text-center font-semibold animate-pulse mb-4">
								{eventMsg}
							</div>
						)}
						<table className="w-full text-sm mb-2">
							<thead>
								<tr className="text-gray-400">
									<th className="text-left">Good</th>
									<th>Price</th>
									<th>Risk</th>
									<th>Qty</th>
									<th>Buy</th>
									<th>Sell</th>
									<th>Owned</th>
								</tr>
							</thead>
							<tbody>
								{GOODS.map((g) => {
									const totalInventory = Object.values(inventory).reduce((a, b) => a + b, 0);
									return (
										<tr key={g.name} className="border-t border-gray-700">
											<td className="py-1">{g.emoji} <b>{g.name}</b><br /><span className="text-xs text-gray-400">{g.desc}</span></td>
											<td className="text-center">${prices[g.name].toLocaleString()}</td>
											<td className="text-center">{g.risk}</td>
											<td className="text-center">
												<input
													type="number"
													min={1}
													max={999}
													value={tradeQty[g.name] || 1}
													onChange={e => {
														const val = Math.max(1, Math.floor(Number(e.target.value)) || 1);
														setTradeQty(q => ({ ...q, [g.name]: val }));
													}}
													className="w-14 px-1 py-0.5 rounded bg-gray-900 border border-gray-700 text-white text-center"
												/>
											</td>
											<td className="text-center">
												<button
													className="px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded text-xs"
													// Do not disable for wallet/inventory errors; handle all in onClick
													onClick={() => {
														const qty = tradeQty[g.name] || 1;
														const total = prices[g.name] * qty;
														const totalInventory = Object.values(inventory).reduce((a, b) => a + b, 0);
														if (wallet < total) {
															setModal({ title: "Insufficient Funds", message: `You don't have enough money to buy ${qty} ${g.name}.` });
														} else if ((inventory[g.name] || 0) + qty > maxInventory) {
															setModal({ title: "Inventory Full", message: `You can't hold more than ${maxInventory} of ${g.name}.` });
														} else if (totalInventory + qty > maxInventory * GOODS.length) {
															setModal({ title: "Total Inventory Full", message: `Your total inventory is full. Sell or store items to make space.` });
														} else {
															setWallet(wallet - total);
															setInventory(inv => ({ ...inv, [g.name]: (inv[g.name] || 0) + qty }));
														}
													}}
												>Buy</button>
											</td>
											<td className="text-center">
												<button
													className="px-2 py-1 bg-gray-700 hover:bg-gray-800 rounded text-xs"
													disabled={!(inventory[g.name] && inventory[g.name] >= (tradeQty[g.name] || 1))}
													onClick={() => {
														const qty = tradeQty[g.name] || 1;
														if (inventory[g.name] && inventory[g.name] >= qty) {
															const bonus = 1 + sellBonus;
															setWallet(wallet + Math.round(prices[g.name] * qty * bonus));
															setInventory(inv => ({ ...inv, [g.name]: inv[g.name] - qty }));
														}
													}}
												>Sell</button>
											</td>
											<td className="text-center">{inventory[g.name] || 0}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
				{showUpgrade && (
					<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
						<div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
							<h3 className="text-xl font-bold mb-2">Upgrades</h3>
							<ul className="flex flex-col gap-3">
								{UPGRADES.filter(u => (!u.city || u.city === city) && u.requires.every(r => upgrades.includes(r))).map((u) => (
									<li key={u.name} className="flex flex-col bg-gray-800 rounded p-3 border border-gray-700">
										<div className="flex justify-between items-center mb-1">
											<span className="font-semibold">{u.name}</span>
											<span className="text-green-300 font-bold">${u.cost.toLocaleString()}</span>
										</div>
										<span className="text-gray-300 text-sm mb-1">{u.desc}</span>
										<span className="text-yellow-300 text-xs">{u.benefit}</span>
										<button
											className="mt-2 px-4 py-1 rounded bg-blue-700 hover:bg-blue-800 text-sm font-semibold disabled:opacity-50"
											disabled={wallet < u.cost || upgrades.includes(u.name)}
											// In the upgrade purchase handler, set all upgrade effect states
											onClick={() => {
												setWallet(wallet - u.cost);
												setUpgrades((prev) => [...prev, u.name]);
												const state = {
													infra,
													sellBonus,
													security,
													maxInventory,
													analytics,
													automation,
													shenzhenBonus,
													bangaloreBonus,
													ipoReady,
													...upgrades.reduce((acc, name) => {
														const upg = UPGRADES.find(up => up.name === name);
														return upg ? { ...acc, ...upg.effect(acc) } : acc;
													}, {})
												};
												const newState = u.effect(state);
												if (newState.sellBonus !== undefined) setSellBonus(newState.sellBonus);
												if (newState.security !== undefined) setSecurity(newState.security);
												if (newState.maxInventory !== undefined) setMaxInventory(newState.maxInventory);
												if (newState.analytics !== undefined) setAnalytics(newState.analytics);
												if (newState.automation !== undefined) setAutomation(newState.automation);
												if (newState.shenzhenBonus !== undefined) setShenzhenBonus(newState.shenzhenBonus);
												if (newState.bangaloreBonus !== undefined) setBangaloreBonus(newState.bangaloreBonus);
												if (newState.ipoReady !== undefined) setIpoReady(newState.ipoReady);
												if (newState.maxCloudStorage !== undefined) setMaxCloudStorage(newState.maxCloudStorage);
												setShowUpgrade(false);
											}}
										>
											{upgrades.includes(u.name) ? "Purchased" : "Buy"}
										</button>
									</li>
								))}
							</ul>
							<button className="mt-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800" onClick={() => setShowUpgrade(false)}>Close</button>
						</div>
					</div>
				)}
				{showTravel && (
					<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
						<div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
							<h3 className="text-xl font-bold mb-2">Travel</h3>
							<ul className="flex flex-col gap-3">
								{CITIES.filter(c => c.name !== city).map((c) => (
									<li key={c.name} className="flex flex-col bg-gray-800 rounded p-3 border border-gray-700">
										<div className="flex justify-between items-center mb-1">
											<span className="font-semibold">{c.emoji} {c.name}</span>
											<span className="text-green-300 font-bold">${(10000 + c.name.length * 1000).toLocaleString()}</span>
										</div>
										<span className="text-gray-300 text-sm mb-1">{c.description}</span>
										<button
											className="mt-2 px-4 py-1 rounded bg-blue-700 hover:bg-blue-800 text-sm font-semibold disabled:opacity-50"
											disabled={wallet < (10000 + c.name.length * 1000)}
											// In the travel button handler, increment turn and apply automation income
											onClick={() => {
												setWallet(wallet - (10000 + c.name.length * 1000));
												setCity(c.name);
												setShowTravel(false);
												setShowTrade(false); // Ensure market is closed so travel alert is visible
												setEventMsg(null); // Clear any previous event
												setTimeout(() => {
													setEventMsg(`Arrived in ${c.name}!`);
													setTimeout(() => setEventMsg(null), 3000);
												}, 100);
												setTurn((t) => t + 1);
												// Compound debt and bank interest
												setDebt(d => Math.round(d * 1.2));
												setBank(b => Math.round(b * 1.005));
												setPrices((prev) => {
													const newPrices: { [good: string]: number } = {};
													GOODS.forEach((g) => {
														newPrices[g.name] = fluctuatePrice(g.price, g.risk, g.name);
													});
													return newPrices;
												});
												if (automation) {
													setCash((c) => c + 10000);
												}
												// Random event (30% chance)
												if (Math.random() < 0.3) {
													const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
													if (event.type === "Economic") {
														// Economic events: apply to all players
														setPrices((prev) => {
															const newPrices = { ...prev };
															if (event.effect) event.effect({ prices: newPrices });
															return newPrices;
														});
													} else if (event.type === "Tech") {
														// Tech events: apply based on city or randomly
														if (city === "San Francisco" || Math.random() < 0.5) {
															setEventMsg(event.text);
															setTimeout(() => setEventMsg(null), 5000);
														}
													} else if (event.type === "Personal") {
														// Personal events: apply to the player
														setEventMsg(event.text);
														const effect = event.effect;
														if (effect) {
															effect({
																cash,
																inventory,
																prices,
																setCash,
																setInventory,
																setPrices,
															});
														}
														setTimeout(() => setEventMsg(null), 5000);
													}
												}
											}}
										>
											Travel
										</button>
									</li>
								))}
							</ul>
							<button className="mt-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800" onClick={() => setShowTravel(false)}>Close</button>
						</div>
					</div>
				)}
			</main>
			{/* Modal component moved here so it always renders above everything */}
			{modal && (
			  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
				<div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xs flex flex-col items-center">
				  <h3 className="text-lg font-bold mb-2">{modal.title}</h3>
				  <p className="mb-4 text-center">{modal.message}</p>
				  <button className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800" onClick={() => setModal(null)}>OK</button>
				</div>
			  </div>
			)}
			{gameOver && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col items-center">
      <h2 className={`text-2xl font-bold mb-4 ${gameOver.win ? 'text-green-300' : 'text-red-300'}`}>{gameOver.win ? 'You Win!' : 'Game Over'}</h2>
      <p className="mb-6 text-center text-lg">{gameOver.reason}</p>
      <button className="px-6 py-2 rounded bg-blue-700 hover:bg-blue-800 text-lg font-semibold" onClick={() => window.location.reload()}>Restart</button>
    </div>
  </div>
)}
			{showBankModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xs flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold mb-2">Bank: {bankAction === 'deposit' ? 'Deposit' : 'Withdraw'}</h3>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded ${bankAction === 'deposit' ? 'bg-green-700' : 'bg-gray-700'} text-white font-semibold`}
          onClick={() => { setBankAction('deposit'); setBankError(null); }}
        >Deposit</button>
        <button
          className={`px-3 py-1 rounded ${bankAction === 'withdraw' ? 'bg-green-700' : 'bg-gray-700'} text-white font-semibold`}
          onClick={() => { setBankAction('withdraw'); setBankError(null); }}
        >Withdraw</button>
      </div>
      <input
        type="number"
        min={1}
        placeholder="Amount"
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white text-center mb-2"
        value={bankAmount}
        onChange={e => setBankAmount(e.target.value.replace(/[^0-9]/g, ''))}
      />
      {bankError && <div className="text-red-400 text-sm mb-2">{bankError}</div>}
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 font-semibold"
          onClick={() => {
            const amt = Number(bankAmount);
            if (!amt || amt <= 0) {
              setBankError('Enter a valid amount.');
              return;
            }
            if (bankAction === 'deposit') {
              if (wallet < amt) {
                setBankError('Not enough in wallet.');
                return;
              }
              setWallet(wallet - amt);
              setBank(bank + amt);
              setEventMsg(`Deposited $${amt.toLocaleString()} to bank.`);
            } else {
              if (bank < amt) {
                setBankError('Not enough in bank.');
                return;
              }
              setBank(bank - amt);
              setWallet(wallet + amt);
              setEventMsg(`Withdrew $${amt.toLocaleString()} from bank.`);
            }
            setShowBankModal(false);
            setTimeout(() => setEventMsg(null), 3000);
          }}
        >Confirm</button>
        <button
          className="flex-1 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 font-semibold"
          onClick={() => setShowBankModal(false)}
        >Cancel</button>
      </div>
      <div className="flex flex-col w-full text-xs text-gray-400 mt-2">
        <span>Wallet: ${wallet.toLocaleString()}</span>
        <span>Bank: ${bank.toLocaleString()}</span>
      </div>
    </div>
  </div>
)}
			{showCloudModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-md flex flex-col items-center gap-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-2">Cloud Storage Management</h3>
      <div className="text-xs text-gray-400 mb-2">{Object.values(cloudStorage).reduce((a, b) => a + b, 0)}/{maxCloudStorage} used</div>
      {cloudError && <div className="text-red-400 text-sm mb-2">{cloudError}</div>}
      <div className="w-full flex flex-col gap-2">
        <div className="font-semibold text-blue-200 mb-1">Inventory → Cloud</div>
        {Object.entries(inventory).filter(([good, qty]) => qty > 0).length === 0 ? (
          <div className="text-gray-400 text-sm mb-2">No goods in inventory to store.</div>
        ) : (
          Object.entries(inventory).filter(([good, qty]) => qty > 0).map(([good, qty]) => (
            <div key={good} className="flex items-center gap-2 w-full">
              <span className="w-24">{good}</span>
              <span className="text-xs text-gray-400">Inv: {qty}</span>
              <input
                type="number"
                min={1}
                max={qty}
                value={cloudTransferQty[good] || ''}
                onChange={e => setCloudTransferQty(q => ({ ...q, [good]: Math.max(1, Math.min(Number(e.target.value) || 1, qty)) }))}
                className="w-14 px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-white text-center"
              />
              <button
                className="px-2 py-1 bg-cyan-700 hover:bg-cyan-800 rounded text-xs"
                onClick={() => {
                  const amount = cloudTransferQty[good] || 1;
                  const totalCloud = Object.values(cloudStorage).reduce((a, b) => a + b, 0);
                  if (totalCloud + amount > maxCloudStorage) {
                    setCloudError("Cloud storage is full.");
                    return;
                  }
                  if (qty < amount) {
                    setCloudError("Not enough in inventory.");
                    return;
                  }
                  setInventory(inv => ({ ...inv, [good]: inv[good] - amount }));
                  setCloudStorage(cs => ({ ...cs, [good]: (cs[good] || 0) + amount }));
                  setCloudTransferQty(q => {
                    const newQty = { ...q };
                    delete newQty[good];
                    return newQty;
                  });
                  setCloudError(null);
                }}
              >→ Cloud</button>
            </div>
          ))
        )}
      </div>
      <div className="w-full flex flex-col gap-2 mt-4">
        <div className="font-semibold text-blue-200 mb-1">Cloud → Inventory</div>
        {Object.entries(cloudStorage).filter(([good, qty]) => qty > 0).length === 0 ? (
          <div className="text-gray-400 text-sm mb-2">No goods in cloud storage.</div>
        ) : (
          Object.entries(cloudStorage).filter(([good, qty]) => qty > 0).map(([good, qty]) => (
            <div key={good} className="flex items-center gap-2 w-full">
              <span className="w-24">{good}</span>
              <span className="text-xs text-gray-400">Cloud: {qty}</span>
              <input
                type="number"
                min={1}
                max={qty}
                value={cloudTransferQty[good + '_back'] || ''}
                onChange={e => setCloudTransferQty(q => ({ ...q, [good + '_back']: Math.max(1, Math.min(Number(e.target.value) || 1, qty)) }))}
                className="w-14 px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-white text-center"
              />
              <button
                className="px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded text-xs"
                onClick={() => {
                  const amount = cloudTransferQty[good + '_back'] || 1;
                  if (qty < amount) {
                    setCloudError("Not enough in cloud storage.");
                    return;
                  }
                  setCloudStorage(cs => ({ ...cs, [good]: cs[good] - amount }));
                  setInventory(inv => ({ ...inv, [good]: (inv[good] || 0) + amount }));
                  setCloudTransferQty(q => {
                    const newQty = { ...q };
                    delete newQty[good + '_back'];
                    return newQty;
                  });
                  setCloudError(null);
                }}
              >← Inventory</button>
            </div>
          ))
        )}
      </div>
      <button className="mt-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800" onClick={() => setShowCloudModal(false)}>Close</button>
    </div>
  </div>
)}
		</div>
	);
}
