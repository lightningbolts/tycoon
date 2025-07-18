'use client';
import Image from "next/image";

import { useState, useEffect } from "react";

const STARTING_CASH = 100000; // Start with $100,000
const STARTING_DEBT = 100000;
const STARTING_INFRA = null; // Remove Small Cloud Server

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
		// Start with a price between 80% and 120% of base
		const min = Math.floor(g.price * 0.8);
		const max = Math.ceil(g.price * 1.2);
		prices[g.name] = Math.floor(min + Math.random() * (max - min + 1));
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
			const attack = CYBERATTACKS[Math.floor(Math.random() * CYBERATTACKS.length)];
			return attack.effect(state);
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

// --- CYBERATTACK TYPES ---
const CYBERATTACKS = [
	{
		type: "Ransomware",
		text: "Ransomware attack! Hackers demand payment to unlock your systems.",
		effect: (state: any) => {
			// Pay 50% of wallet or lose all cash
			return { ...state, cyberType: "Ransomware" };
		}
	},
	{
		type: "Malware",
		text: "Malware infection! Some of your inventory is corrupted.",
		effect: (state: any) => {
			// Lose 1-3 random goods from inventory
			return { ...state, cyberType: "Malware" };
		}
	},
	{
		type: "DDoS",
		text: "DDoS attack! Your server health is under siege.",
		effect: (state: any) => {
			// Server health drops 20-40
			return { ...state, cyberType: "DDoS" };
		}
	},
	{
		type: "Zero-Click",
		text: "Zero-click exploit! Hackers instantly breach your defenses.",
		effect: (state: any) => {
			// Lose either all cash or a few inventory items, not both
			return { ...state, cyberType: "Zero-Click" };
		}
	}
];

const UPGRADES = [
	{
		name: "Medium Cloud Server",
		cost: 50000,
		desc: "Increase trading capacity. Halves travel costs.",
		benefit: "-50% travel costs, 2000 cloud storage",
		requires: [],
		city: null,
		effect: (state: any) => ({ ...state, infra: "Medium Cloud Server", travelDiscount: 0.5, maxCloudStorage: 2000 }),
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
		benefit: "+2 max inventory per good, 5000 cloud storage",
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
		cost: 10000000,
		desc: "Automate trading for passive income.",
		benefit: "+0.5% net worth per turn",
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
	{
		name: "Travel Network",
		cost: 150000,
		desc: "Unlocks global travel discounts.",
		benefit: "-20% travel costs",
		requires: [],
		city: null,
		effect: (state: any) => ({ ...state, travelDiscount: 0.8 }),
	},
	{
		name: "Cloud Storage Expansion",
		cost: 250000,
		desc: "Increase cloud storage capacity.",
		benefit: "+1000 cloud storage",
		requires: ["Big Data Warehouse"],
		city: null,
		effect: (state: any) => ({ ...state, maxCloudStorage: state.maxCloudStorage + 1000 }),
	},
	{
		name: "Cloud Storage Booster",
		cost: 100000000,
		desc: "Add 1000 to cloud storage (repeatable)",
		benefit: "+1000 cloud storage (can buy unlimited times)",
		requires: [],
		city: null,
		repeatable: true,
		effect: (state: any) => ({ ...state, maxCloudStorage: state.maxCloudStorage + 1000 }),
	},
];

// Helper to get year/month from turn
function getDateFromTurn(turn: number) {
  const startYear = 2020;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthIndex = (turn - 1) % 12;
  const year = startYear + Math.floor((turn - 1) / 12);
  return `${monthNames[monthIndex]} ${year}`;
}

// Helper to get Tycoon Rank from score
function getTycoonRank(score: number) {
  if (score >= 50000) return "Tycoon";
  if (score >= 30000) return "Architect";
  if (score >= 10000) return "Senior Dev";
  if (score >= 1000) return "Junior Dev";
  return "Intern";
}

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
	const [security, setSecurity] = useState(false);
	const [maxInventory, setMaxInventory] = useState(50);
	const [showTravel, setShowTravel] = useState(false);
	const [analytics, setAnalytics] = useState(false);
	const [automation, setAutomation] = useState(false);
	const [shenzhenBonus, setShenzhenBonus] = useState(false);
	const [bangaloreBonus, setBangaloreBonus] = useState(false);
	const [ipoReady, setIpoReady] = useState(false);
	// Add debt and cloudStorage state
	const [debt, setDebt] = useState(STARTING_DEBT);
	const [cloudStorage, setCloudStorage] = useState<{ [good: string]: number }>({});
	// Add state for wallet (on-hand cash) and bank balance
	const [wallet, setWallet] = useState(STARTING_CASH);
	const [bank, setBank] = useState(0);
	// Add state for modal
	const [modal, setModal] = useState<
  | { title: string; message: string; onConfirm?: () => void; onCancel?: () => void }
  | null
>(null);
	// Win/loss modal state
	const [gameOver, setGameOver] = useState<{ win: boolean; reason: string } | null>(null);
	// Add reputation and score state
	const [reputation, setReputation] = useState(0);
	const [score, setScore] = useState(0);
	// Bank modal state
	const [showBankModal, setShowBankModal] = useState(false);
	const [bankAction, setBankAction] = useState<'deposit' | 'withdraw' | 'paydebt'>('deposit');
	const [bankAmount, setBankAmount] = useState('');
	const [bankError, setBankError] = useState<string | null>(null);
	const [maxCloudStorage, setMaxCloudStorage] = useState(1000);
	// Cloud storage modal state
	const [showCloudModal, setShowCloudModal] = useState(false);
	const [cloudTransferQty, setCloudTransferQty] = useState<{ [good: string]: number }>({});
	const [cloudError, setCloudError] = useState<string | null>(null);
	// VC Borrow modal state
	const [showVCModal, setShowVCModal] = useState(false);
	const [vcAmount, setVcAmount] = useState('');
	const [vcError, setVcError] = useState<string | null>(null);
	const [vcBorrowedTurn, setVcBorrowedTurn] = useState<number | null>(null);
	// Add state for travel discount
	const [travelDiscount, setTravelDiscount] = useState(1);
	// Add server health state
	const [serverHealth, setServerHealth] = useState(100);
	// Add companyName state
	const [companyName, setCompanyName] = useState("");
	// Add cyberType state
	const [cyberType, setCyberType] = useState<string | null>(null);
	const [cyberRound, setCyberRound] = useState(1);
	const [cyberMsg, setCyberMsg] = useState<string | null>(null);
	// Server repair modal state
	const [showRepairModal, setShowRepairModal] = useState(false);
	const [repairCost, setRepairCost] = useState(0);
	const [repairMax, setRepairMax] = useState(0);
	const [repairAmount, setRepairAmount] = useState('');
	const [repairError, setRepairError] = useState<string | null>(null);
	// Add ASIC state
	const [asicCount, setAsicCount] = useState(1);
	const [attackers, setAttackers] = useState<number | null>(null);
	const [attackersBase, setAttackersBase] = useState(0);

	// Track price history for analytics
	const [priceHistory, setPriceHistory] = useState<{ [city: string]: { [good: string]: number[] } }>({});

	// Update price history on price change or city change
	useEffect(() => {
	  if (!city) return;
	  setPriceHistory(prev => {
	    const cityHist = prev[city] || {};
	    const updated: { [good: string]: number[] } = { ...cityHist };
	    GOODS.forEach(g => {
	      updated[g.name] = [...(cityHist[g.name] || []), prices[g.name]];
	    });
	    return { ...prev, [city]: updated };
	  });
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prices, city]);

	// Update Tycoon Index (score) on every turn based on net worth, reputation, and time (turns)
	useEffect(() => {
  let invValue = 0;
  GOODS.forEach(g => {
    invValue += (inventory[g.name] || 0) * prices[g.name];
    invValue += (cloudStorage[g.name] || 0) * prices[g.name];
  });
  const netWorth = wallet + bank + invValue;
  // New scaling: score = Math.round(((netWorth + reputation * 1_000_000) / years) / 100_000)
  // 1B + 10M (10 rep) in 10 years = 1,010,000,000 / 10 / 100,000 = 10,100
  const years = Math.max(1, turn / 12);
  setScore(Math.round(((netWorth + reputation * 1_000_000) / years) / 100_000));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [wallet, bank, inventory, cloudStorage, prices, reputation, turn]);

	function handleCyberChoice(choice: 'fight' | 'pay' | 'ignore') {
		if (!pendingCyber) return;
		const roll = Math.random();
		let resolved = false;
		let msg = '';
		// ASIC-based cyberbattle logic for all cyberattacks except Ransomware
		if (cyberType && cyberType !== 'Ransomware' && attackers !== null && attackers > 0) {
			// Each ASIC can neutralize 1-2 attackers per round
			const asicsUsed = Math.min(asicCount, attackers);
			const attackersNeutralized = Array.from({ length: asicsUsed }, () => 1 + Math.floor(Math.random() * 2)).reduce((a, b) => a + b, 0);
			const newAttackers = Math.max(0, attackers - attackersNeutralized);
			setAttackers(newAttackers);
			if (newAttackers === 0) {
				msg = `You repelled the ${cyberType} attack! All attackers neutralized.`;
				setReputation(r => r + 5); // Gain reputation for fending off
				resolved = true;
			} else {
				msg = `You used your ASICs and neutralized ${attackers - newAttackers} attackers. (${newAttackers} left)`;
			}
			setServerHealth(h => Math.max(0, h - 5));
			setCyberMsg(msg);
			if (resolved) {
				setTimeout(() => {
					setPendingCyber(null);
					setCyberType(null);
					setCyberMsg(null);
					setCyberRound(1);
				}, 3000);
			} else {
				setCyberRound(r => r + 1);
				setPendingCyber({ defenseRoll: Math.random() });
			}
			return;
		}
		// Special case for Ransomware: pay or fight
		if (cyberType === "Ransomware") {
			if (choice === 'pay') {
				const ransom = Math.round(wallet * 0.5);
				setWallet(Math.max(0, wallet - ransom));
				msg = `You paid $${ransom.toLocaleString()} to unlock your systems.`;
				resolved = true;
			} else if (choice === 'fight') {
				if (roll < 0.5) {
					msg = "You fended off the ransomware!";
					resolved = true;
				} else {
					setWallet(0);
					msg = "You failed to stop the ransomware. All your cash was wiped!";
					resolved = true;
				}
			} else {
				setWallet(0);
				msg = "You tried to disconnect, but the ransomware wiped your cash!";
				resolved = true;
			}
			setServerHealth(h => Math.max(0, h - 5));
		} else if (cyberType === "Malware") {
			if (choice === 'fight') {
				if (roll < 0.5) {
					msg = "You neutralized the malware!";
					resolved = true;
				} else {
					let lost = [];
					let newInv = { ...inventory };
					for (let i = 0; i < 1 + Math.floor(Math.random() * 3); i++) {
						const goods = Object.keys(newInv).filter(k => newInv[k] > 0);
						if (goods.length === 0) break;
						const pick = goods[Math.floor(Math.random() * goods.length)];
						newInv[pick] = Math.max(0, newInv[pick] - 1);
						lost.push(pick);
					}
					setInventory(newInv);
					msg = `Malware corrupted your inventory! Lost: ${lost.join(", ") || "nothing"}.`;
					resolved = true;
				}
			} else {
				let lost = [];
				let newInv = { ...inventory };
				for (let i = 0; i < 1 + Math.floor(Math.random() * 3); i++) {
					const goods = Object.keys(newInv).filter(k => newInv[k] > 0);
					if (goods.length === 0) break;
					const pick = goods[Math.floor(Math.random() * goods.length)];
					newInv[pick] = Math.max(0, newInv[pick] - 1);
					lost.push(pick);
				}
				setInventory(newInv);
				msg = `Malware corrupted your inventory! Lost: ${lost.join(", ") || "nothing"}.`;
				resolved = true;
			}
			setServerHealth(h => Math.max(0, h - 7));
		} else if (cyberType === "DDoS") {
			if (serverHealth <= 0) {
				setCyberMsg("Your servers have crashed from the DDoS attack! You must repair them before continuing.");
				setTimeout(() => {
					setPendingCyber(null);
					setCyberType(null);
					setCyberMsg(null);
					setCyberRound(1);
				}, 3500);
				return;
			}
			if (choice === 'fight') {
				if (roll < 0.5) {
					setCyberMsg("You repelled the DDoS attack!");
					setTimeout(() => {
						setPendingCyber(null);
						setCyberType(null);
						setCyberMsg(null);
						setCyberRound(1);
					}, 3000);
					return;
				} else {
					const drop = 10 + Math.floor(Math.random() * 6);
					setServerHealth(h => Math.max(0, h - drop));
					setCyberMsg(`DDoS attack! Server health dropped by ${drop}. (Attack continues!)`);
				}
			} else if (choice === 'ignore') {
				// Disconnect: 50% chance to end attack, otherwise lose some health
				if (roll < 0.5) {
					setCyberMsg("You disconnected and the DDoS attack ended!");
					setTimeout(() => {
						setPendingCyber(null);
						setCyberType(null);
						setCyberMsg(null);
						setCyberRound(1);
					}, 3000);
					return;
				} else {
					const drop = 10 + Math.floor(Math.random() * 6);
					setServerHealth(h => Math.max(0, h - drop));
					setCyberMsg(`You tried to disconnect, but the attack continues! Server health dropped by ${drop}.`);
				}
			}
		} else if (cyberType === "Zero-Click") {
			// Lose either all cash or a few inventory items, not both
			if (choice === 'fight') {
				if (roll < 0.5) {
					setCyberMsg("You blocked the zero-click exploit!");
					setTimeout(() => {
						setPendingCyber(null);
						setCyberType(null);
						setCyberMsg(null);
						setCyberRound(1);
					}, 3000);
					return;
				} else {
					if (Math.random() < 0.5) {
						setWallet(0);
						setCyberMsg("Zero-click exploit! All your cash was stolen.");
					} else {
						let lost = [];
						let newInv = { ...inventory };
						for (let i = 0; i < 3; i++) {
							const goods = Object.keys(newInv).filter(k => newInv[k] > 0);
							if (goods.length === 0) break;
							const pick = goods[Math.floor(Math.random() * goods.length)];
							newInv[pick] = Math.max(0, newInv[pick] - 1);
							lost.push(pick);
						}
						setInventory(newInv);
						setCyberMsg(`Zero-click exploit! Lost: ${lost.join(", ") || "nothing"}.`);
					}
				}
			} else {
				if (Math.random() < 0.5) {
					setWallet(0);
					setCyberMsg("Zero-click exploit! All your cash was stolen.");
				} else {
					let lost = [];
					let newInv = { ...inventory };
					for (let i = 0; i < 3; i++) {
						const goods = Object.keys(newInv).filter(k => newInv[k] > 0);
						if (goods.length === 0) break;
						const pick = goods[Math.floor(Math.random() * goods.length)];
						newInv[pick] = Math.max(0, newInv[pick] - 1);
						lost.push(pick);
					}
					setInventory(newInv);
					setCyberMsg(`Zero-click exploit! Lost: ${lost.join(", ") || "nothing"}.`);
				}
			}
			setServerHealth(h => Math.max(0, h - 12));
		}
		if (resolved) {
			setCyberMsg(msg);
			setTimeout(() => {
				setPendingCyber(null);
				setCyberType(null);
				setCyberMsg(null);
				setCyberRound(1);
			}, 3000);
		} else {
			setCyberMsg(msg + " (Attack continues!)");
			setCyberRound(r => r + 1);
			setPendingCyber({ defenseRoll: Math.random() });
		}
	}

	// Define startCyberAttack inside Home so it's available
	function startCyberAttack(type: string, turn: number) {
	  // Each year = 12 turns, attackers increase by 10% per year
	  const years = Math.floor((turn - 1) / 12);
	  const base = 5 + Math.floor(Math.random() * 6); // 5-10 attackers base
	  const scaled = Math.ceil(base * Math.pow(1.1, years));
	  setAttackers(scaled);
	  setAttackersBase(scaled);
	  setCyberType(type);
	  setPendingCyber({ defenseRoll: Math.random() });
	  setCyberRound(1);
	  setCyberMsg(null);
	  setShowTrade(true);
	}

	// Net worth loss detection effect
	useEffect(() => {
		if (pendingCyber) return; // Don't check for game over during cyberattacks
		let invValue = 0;
		GOODS.forEach(g => {
			invValue += (inventory[g.name] || 0) * prices[g.name];
			invValue += (cloudStorage[g.name] || 0) * prices[g.name];
		});
		const netWorth = wallet + bank + invValue;
		if (netWorth <= 0 && !gameOver) {
			setGameOver({ win: false, reason: "You lost everything! Your net worth is $0. Game over." });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		// Only include primitive values in the dependency array
	}, [wallet, bank, debt, serverHealth, gameOver, pendingCyber]);

	if (!started) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Tycoon: Tech Empire
				</h1>
				<p className="text-lg text-gray-300 max-w-xl text-center">
					Build a tech empire by trading futuristic commodities, upgrading
					infrastructure, and navigating a dynamic global economy. Reach $1B,
					IPO, or dominate all sectors!
				</p>
				{/* Company name input */}
				<div className="flex flex-col items-center gap-2 w-full max-w-md">
					<label htmlFor="companyName" className="text-base font-semibold">Your Company Name</label>
					<input
						id="companyName"
						type="text"
						className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white text-center text-lg"
						placeholder="Enter company name..."
						value={companyName}
						onChange={e => setCompanyName(e.target.value.slice(0, 32))}
						maxLength={32}
					/>
				</div>
				<section className="bg-black/30 rounded-lg p-6 shadow-lg flex flex-col items-center gap-4 w-full max-w-md">
					<h2 className="text-xl font-semibold mb-2">Your Starting Assets</h2>
					<ul className="text-base text-gray-200 list-disc list-inside">
						<li>
							💵 <b>${STARTING_CASH.toLocaleString()}</b> cash
						</li>
						<li>
							💳 <b>${STARTING_DEBT.toLocaleString()}</b> debt
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
					onClick={() => companyName.trim() && setStarted(true)}
					disabled={!companyName.trim()}
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
						<h2 className="text-2xl font-bold">{companyName || city}</h2>
						<span className="text-gray-400 text-sm">{getDateFromTurn(turn)}</span>
					</div>
					<div className="flex gap-6 text-base">
						<span>📍 <b>{city}</b></span>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-1">
						<h4 className="font-semibold mb-1">Inventory <span className="text-xs text-gray-400">({Object.values(inventory).reduce((a, b) => a + b, 0)}/{maxInventory} total)</span></h4>
						<table className="w-full text-sm table-fixed">
							<tbody>
								{GOODS.map(g => (
									<tr key={g.name}>
										<td className="w-1/2 text-left whitespace-nowrap">{g.emoji} <b>{g.name}</b></td>
										<td className="w-1/2 text-right">{inventory[g.name] || 0}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-1">
						<h4 className="font-semibold mb-1">Cloud Storage <span className="text-xs text-gray-400">({Object.values(cloudStorage).reduce((a, b) => a + b, 0)}/{maxCloudStorage})</span></h4>
						<table className="w-full text-sm table-fixed">
							<tbody>
								{GOODS.map(g => (
									<tr key={g.name}>
										<td className="w-1/2 text-left whitespace-nowrap">{g.emoji} <b>{g.name}</b></td>
										<td className="w-1/2 text-right">{cloudStorage[g.name] || 0}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Money indicators as a box, aligned with inventory/cloud storage */}
					<div className="w-full max-w-xs bg-gray-900/80 rounded-lg p-3 shadow flex flex-col gap-1">
						<h4 className="font-semibold mb-1">Finances</h4>
						<table className="w-full text-sm table-fixed">
							<tbody>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">💵 <b>Wallet</b></td>
									<td className="w-1/2 text-right">${wallet.toLocaleString()}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">🏦 <b>Bank</b></td>
									<td className="w-1/2 text-right">${bank.toLocaleString()}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">💳 <b>Debt</b></td>
									<td className="w-1/2 text-right">${debt.toLocaleString()}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">⭐ <b>Reputation</b></td>
									<td className="w-1/2 text-right">{reputation}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">📈 <b>Tycoon Index</b></td>
									<td className="w-1/2 text-right">{Math.round(score).toLocaleString()}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">🏅 <b>Rank</b></td>
									<td className="w-1/2 text-right text-yellow-300">{getTycoonRank(score)}</td>
								</tr>
								<tr>
									<td className="w-1/2 text-left whitespace-nowrap">🔧 <b>ASICs</b></td>
									<td className="w-1/2 text-right text-cyan-300">{asicCount}</td>
								</tr>
							</tbody>
						</table>
						{/* Retire button if $1B+ */}
						{(wallet + bank) >= 1_000_000_000 && !gameOver && (
							<button
								className="mt-4 px-6 py-2 rounded-full bg-green-700 hover:bg-green-800 text-lg font-semibold w-full"
								onClick={() => setGameOver({ win: true, reason: `You retired as a billionaire! Final Tycoon Index: ${Math.round(score).toLocaleString()}` })}
							>
								Retire
							</button>
						)}
					</div>
				</div>
				{/* Server Health Bar moved here */}
				<div className="flex flex-col gap-2 mb-2 w-full">
					<div className="flex items-center gap-2 w-full">
						<span className="text-gray-300">Server Health:</span>
						<div className="flex-1 h-4 bg-gray-800 rounded overflow-hidden">
							<div style={{ width: `${serverHealth}%` }} className={`h-4 rounded ${serverHealth > 60 ? 'bg-green-500' : serverHealth > 30 ? 'bg-yellow-400' : 'bg-red-600'}`}></div>
						</div>
						<span className="ml-2 text-sm text-gray-200 font-bold">{serverHealth}/100</span>
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
									if (vcBorrowedTurn === turn) {
										setEventMsg("You can only borrow once per turn.");
										setTimeout(() => setEventMsg(null), 3000);
										return;
									}
									setShowVCModal(true);
									setVcError(null);
									// Calculate net worth (wallet + bank + inventory + cloud storage)
									let invValue = 0;
									GOODS.forEach(g => {
										invValue += (inventory[g.name] || 0) * prices[g.name];
										invValue += (cloudStorage[g.name] || 0) * prices[g.name];
									});
									const netWorth = wallet + bank + invValue;
									setVcAmount(netWorth > 0 ? String(netWorth) : '');
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
								className="px-4 py-2 rounded bg-red-700 hover:bg-red-800 text-white font-semibold disabled:opacity-50"
								disabled={serverHealth === 100}
								onClick={() => {
									// Server Repair: cost is now pre-calculated on arrival
									setRepairAmount(String(repairMax));
									setRepairError(null);
									setShowRepairModal(true);
								}}
							>
								🛠️ Server Repair (0.5-25% net worth)
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
				{/* Only show eventMsg alert if not in a cyberattack */}
				{eventMsg && !showTrade && !pendingCyber && (
					<div className="w-full max-w-2xl bg-yellow-900/80 text-yellow-200 rounded-lg p-4 shadow text-center font-semibold animate-pulse mb-4">
						{eventMsg}
					</div>
				)}
				{showTrade && serverHealth === 0 && (
  <div className="w-full bg-red-900/90 text-red-100 rounded-lg p-6 shadow text-center font-bold mb-4">
    Your servers are down! You cannot trade until you repair your infrastructure.
  </div>
)}
				{showTrade && serverHealth > 0 && (
					<div className="w-full bg-gray-800 rounded-lg p-4 shadow flex flex-col gap-4">
						<h3 className="text-lg font-bold mb-2">Market</h3>
						{/* Alerts above trading table */}
						{pendingCyber && cyberType && (
							<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
								<div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col items-center gap-6">
									<h2 className="text-2xl font-bold text-red-300 mb-2">Cyberattack! (Round {cyberRound})</h2>
									<p className="text-lg text-center text-yellow-200 font-semibold mb-2">
										{cyberMsg || CYBERATTACKS.find(a => a.type === cyberType)?.text || "A major cyberattack is underway!"}
									</p>
									{attackersBase > 0 && (
										<div className="w-full flex flex-col items-center mb-2">
											<span className="text-base text-cyan-300 font-bold">ASIC Machines: {asicCount}</span>
											<span className="text-base text-pink-300 font-bold">Attackers Remaining: {attackers === 0 ? 0 : attackers} / {attackersBase}</span>
										</div>
									)}
									{/* Only show action buttons if the attack is ongoing and not resolved */}
									{pendingCyber && attackers !== 0 && !cyberMsg?.includes('repelled') && !cyberMsg?.includes('ended') && !cyberMsg?.includes('crashed') && (
										<div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
											<button
												className="flex-1 min-w-[120px] px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 font-bold text-base disabled:opacity-50"
												onClick={() => handleCyberChoice('fight')}
												disabled={asicCount === 0}
											>
												Use ASICs
											</button>
											{cyberType === 'Ransomware' && (
												<button className="flex-1 min-w-[120px] px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base" onClick={() => handleCyberChoice('pay')}>
													Pay Ransom
												</button>
											)}
											<button className="flex-1 min-w-[120px] px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 font-bold text-base" onClick={() => handleCyberChoice('ignore')}>
												Try to Disconnect
											</button>
										</div>
									)}
									<div className="w-full flex flex-col items-center mt-4">
										<span className="text-sm text-gray-400">Server Health: <b className={serverHealth > 60 ? 'text-green-400' : serverHealth > 30 ? 'text-yellow-300' : 'text-red-400'}>{serverHealth}/100</b></span>
										<span className="text-sm text-gray-400">Wallet: <b>${wallet.toLocaleString()}</b></span>
									</div>
								</div>
							</div>
						)}
						{/* In the market/trade section, only show eventMsg if not in a cyberattack */}
						{eventMsg && showTrade && !eventMsg.startsWith('Arrived in') && !pendingCyber && (
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
														if (wallet < total) {
															setModal({ title: "Insufficient Funds", message: `You don't have enough money to buy ${qty} ${g.name}.` });
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
													onClick={() => {
														const qty = tradeQty[g.name] || 1;
														if (!inventory[g.name] || inventory[g.name] < qty) {
															setModal({ title: "Not Enough Inventory", message: `You don't have enough ${g.name} to sell (${qty} requested, ${inventory[g.name] || 0} available).` });
															return;
														}
														const bonus = 1 + (security ? 0.5 : 0);
														setWallet(wallet + Math.round(prices[g.name] * qty * bonus));
														setInventory(inv => ({ ...inv, [g.name]: inv[g.name] - qty }));
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
								{UPGRADES.filter(u => (!u.city || u.city === city) && u.requires.every(r => upgrades.includes(r) || u.repeatable)).map((u) => (
									<li key={u.name} className="flex flex-col bg-gray-800 rounded p-3 border border-gray-700">
										<div className="flex justify-between items-center mb-1">
											<span className="font-semibold">{u.name}</span>
											<span className="text-green-300 font-bold">${u.cost.toLocaleString()}</span>
										</div>
										<span className="text-gray-300 text-sm mb-1">{u.desc}</span>
										<span className="text-yellow-300 text-xs">{u.benefit}</span>
										<button
											className="mt-2 px-4 py-1 rounded bg-blue-700 hover:bg-blue-800 text-sm font-semibold disabled:opacity-50"
											disabled={wallet < u.cost || (!u.repeatable && upgrades.includes(u.name))}
											onClick={() => {
												setWallet(wallet - u.cost);
												if (!u.repeatable) setUpgrades((prev) => [...prev, u.name]);
												const state = {
													infra,
													security,
													maxInventory,
													analytics,
													automation,
													shenzhenBonus,
													bangaloreBonus,
													ipoReady,
													travelDiscount,
													maxCloudStorage,
													...upgrades.reduce((acc, name) => {
														const upg = UPGRADES.find(up => up.name === name);
														return upg ? { ...acc, ...upg.effect(acc) } : acc;
													}, {})
												};
												const newState = u.effect(state);
												if (newState.security !== undefined) setSecurity(newState.security);
												if (newState.maxInventory !== undefined) setMaxInventory(newState.maxInventory);
												if (newState.analytics !== undefined) setAnalytics(newState.analytics);
												if (newState.automation !== undefined) setAutomation(newState.automation);
												if (newState.shenzhenBonus !== undefined) setShenzhenBonus(newState.shenzhenBonus);
												if (newState.bangaloreBonus !== undefined) setBangaloreBonus(newState.bangaloreBonus);
												if (newState.ipoReady !== undefined) setIpoReady(newState.ipoReady);
												if (newState.maxCloudStorage !== undefined) setMaxCloudStorage(newState.maxCloudStorage);
												if (newState.travelDiscount !== undefined) setTravelDiscount(newState.travelDiscount);
												setShowUpgrade(false);
											}}
										>
											Buy
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
											<span className="text-green-300 font-bold">${(Math.round(((10000 + c.name.length * 1000) / 2) * travelDiscount)).toLocaleString()}</span>
										</div>
										<span className="text-gray-300 text-sm mb-1">{c.description}</span>
										<button
											className="mt-2 px-4 py-1 rounded bg-blue-700 hover:bg-blue-800 text-sm font-semibold disabled:opacity-50"
											disabled={wallet < Math.round(((10000 + c.name.length * 1000) / 2) * travelDiscount)}
											// In the travel button handler, increment turn and apply automation income
											onClick={() => {
												const totalInventory = Object.values(inventory).reduce((a, b) => a + b, 0);
												if (totalInventory > maxInventory) {
													setModal({ title: "Inventory Overfilled", message: `You cannot travel with an overfilled inventory. Please move items to cloud storage or sell goods until your inventory is within the limit (${maxInventory}).` });
													return;
												}
												const travelCost = Math.round(((10000 + c.name.length * 1000) / 2) * travelDiscount);
												setWallet(wallet - travelCost);
												setCity(c.name);
												setShowTravel(false);
												setShowTrade(false); // Ensure market is closed so travel alert is visible
												setEventMsg(null); // Clear any previous event
												// --- CYBERATTACK EVENT (while traveling) ---
												if (Math.random() < 0.3) {
													const attack = CYBERATTACKS[Math.floor(Math.random() * CYBERATTACKS.length)];
													startCyberAttack(attack.type, turn);
													// Do NOT setEventMsg for cyberattacks
												}
												setTimeout(() => {
													setEventMsg(`Arrived in ${c.name}!`);

													// --- RECALCULATE REPAIR COST ON ARRIVAL ---
													let invValue = 0;
													GOODS.forEach(g => {
														invValue += (inventory[g.name] || 0) * prices[g.name];
														invValue += (cloudStorage[g.name] || 0) * prices[g.name];
													});
													const netWorth = wallet + bank + invValue;
													const minCost = Math.floor(netWorth * 0.005);
													const maxCost = Math.floor(netWorth * 0.25);
													const randomMax = Math.max(1, Math.floor(minCost + Math.random() * (maxCost - minCost + 1)));
													setRepairMax(randomMax);
													setRepairCost(randomMax);
													setRepairAmount(String(randomMax));
													// --- END REPAIR COST CALCULATION ---

													setTimeout(() => setEventMsg(null), 3000);
													// In the travel button handler, add 15-25% chance to offer inventory expansion for 1-50% of wallet
													if (Math.random() < 0.15 + Math.random() * 0.10) {
														const invPrice = Math.max(1, Math.floor(wallet * (0.01 + Math.random() * 0.49)));
														setModal({
															title: 'Warehouse Expansion Offer',
															message: `A warehouse manager offers to expand your inventory by 50 for $${invPrice.toLocaleString()}. Do you want to buy it?`,
															onConfirm: () => {
																if (wallet >= invPrice) {
																	setWallet(wallet - invPrice);
																	setMaxInventory(m => m + 50);
																	setEventMsg('You expanded your inventory by 50!');
																	setTimeout(() => setEventMsg(null), 3000);
																} else {
																	setEventMsg('Not enough funds to expand inventory.');
																	setTimeout(() => setEventMsg(null), 3000);
																}
																setModal(null);
															},
															onCancel: () => setModal(null)
														});
													}
													if (Math.random() < 0.15 + Math.random() * 0.10) {
														setMaxInventory(m => m + 50);
														setEventMsg('You found a warehouse! Inventory space increased by 50.');
														setTimeout(() => setEventMsg(null), 3000);
													}
													// --- MARKET/TECH EVENT (on arrival) ---
													if (Math.random() < 0.9) {
														const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
														if (event.type === "Economic") {
															setPrices((prev) => {
																const newPrices = { ...prev };
																if (event.effect) {
																	const result = event.effect({ prices: newPrices });
																	// If the effect returns a new prices object, use it
																	if (result && result.prices) return result.prices;
																}
																return newPrices;
															});
															setEventMsg(event.text);
															setTimeout(() => setEventMsg(null), 5000);
														} else if (event.type === "Tech") {
															setEventMsg(event.text);
															setTimeout(() => setEventMsg(null), 5000);
															setPrices((prev) => {
																const newPrices = { ...prev };
																if (event.effect) {
																	const result = event.effect({ prices: newPrices });
																	if (result && result.prices) return result.prices;
																}
																return newPrices;
															});
														} else if (event.type === "Personal") {
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
													let invValue = 0;
													GOODS.forEach(g => {
														invValue += (inventory[g.name] || 0) * prices[g.name];
														invValue += (cloudStorage[g.name] || 0) * prices[g.name];
													});
													const netWorth = wallet + bank + invValue;
													const bonus = Math.floor(netWorth * 0.005);
													setWallet(w => w + bonus);
													setEventMsg(`Automation Suite: +$${bonus.toLocaleString()} (0.5% net worth)`);
													setTimeout(() => setEventMsg(null), 3000);
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
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-blue-200 mb-2">{modal.title}</h2>
      <p className="text-lg text-center text-yellow-200 font-semibold mb-2">{modal.message}</p>
      {(modal.onConfirm || modal.onCancel) ? (
        <div className="flex flex-row gap-4 w-full justify-center mt-2">
          {modal.onConfirm && (
            <button className="flex-1 min-w-[120px] px-4 py-2 rounded bg-green-700 hover:bg-green-800 font-bold text-base" onClick={modal.onConfirm}>
              Confirm
            </button>
          )}
          {modal.onCancel && (
            <button className="flex-1 min-w-[120px] px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 font-bold text-base" onClick={modal.onCancel}>
              Cancel
            </button>
          )}
        </div>
      ) : (
        <button className="mt-4 px-6 py-2 rounded bg-blue-700 hover:bg-blue-800 font-bold text-base" onClick={() => setModal(null)}>
          OK
        </button>
      )}
    </div>
  </div>
)}
			{gameOver && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-8 shadow-lg w-full max-w-md flex flex-col items-center">
      <h2 className={`text-2xl font-bold mb-4 ${gameOver.win ? 'text-green-300' : 'text-red-300'}`}>{gameOver.win ? 'You Win!' : 'Game Over'}</h2>
      <p className="mb-6 text-center text-lg">{gameOver.reason}</p>
      <p className="mb-4 text-center text-yellow-300 font-bold">Final Rank: {getTycoonRank(score)}</p>
      <button className="px-6 py-2 rounded bg-blue-700 hover:bg-blue-800 text-lg font-semibold" onClick={() => window.location.reload()}>Restart</button>
    </div>
  </div>
)}
			{showBankModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xs flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold mb-2">Bank: {bankAction === 'deposit' ? 'Deposit' : bankAction === 'withdraw' ? 'Withdraw' : 'Pay Debt'}</h3>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded ${bankAction === 'deposit' ? 'bg-green-700' : 'bg-gray-700'} text-white font-semibold`}
          onClick={() => { setBankAction('deposit'); setBankError(null); }}
        >Deposit</button>
        <button
          className={`px-3 py-1 rounded ${bankAction === 'withdraw' ? 'bg-green-700' : 'bg-gray-700'} text-white font-semibold`}
          onClick={() => { setBankAction('withdraw'); setBankError(null); }}
        >Withdraw</button>
        <button
          className={`px-3 py-1 rounded ${bankAction === 'paydebt' ? 'bg-green-700' : 'bg-gray-700'} text-white font-semibold`}
          onClick={() => { setBankAction('paydebt'); setBankError(null); }}
        >Pay Debt</button>
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
              if ( wallet < amt) {
                setBankError('Not enough in wallet.');
                return;
              }
              setWallet(wallet - amt);
              setBank(bank + amt);
              setEventMsg(`Deposited $${amt.toLocaleString()} to bank.`);
            } else if (bankAction === 'withdraw') {
              if (bank < amt) {
                setBankError('Not enough in bank.');
                return;
              }
              setBank(bank - amt);
              setWallet(wallet + amt);
              setEventMsg(`Withdrew $${amt.toLocaleString()} from bank.`);
            } else if (bankAction === 'paydebt') {
              if (wallet < amt) {
                setBankError('Not enough in wallet.');
                return;
              }
              if (debt < amt) {
                setBankError('You do not owe that much.');
                return;
              }
              setWallet(wallet - amt);
              setDebt(debt - amt);
              setEventMsg(`Paid $${amt.toLocaleString()} to VC. Debt reduced.`);
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
        <span>Debt: ${debt.toLocaleString()}</span>
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
            <div key={good} className="flex items-center gap-2 w-full mb-2">
              <span className="w-24">{good}</span>
              <span className="text-xs text-gray-400 w-20">Inv: {qty}</span>
              <input
                type="number"
                min={1}
                max={Math.min(qty, maxCloudStorage - Object.values(cloudStorage).reduce((a, b) => a + b, 0))}
                value={cloudTransferQty[good] || ''}
                onChange={e => setCloudTransferQty(q => ({ ...q, [good]: Math.max(1, Math.min(Number(e.target.value) || 1, qty, maxCloudStorage - Object.values(cloudStorage).reduce((a, b) => a + b, 0))) }))}
                               className="w-20 px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-white text-center h-8"
              />
              <button
                className="px-2 rounded bg-cyan-700 hover:bg-cyan-800 text-xs w-24 h-8 flex items-center justify-center"
                style={{ minHeight: '2rem' }}
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
            <div key={good} className="flex items-center gap-2 w-full mb-2">
              <span className="w-24">{good}</span>
              <span className="text-xs text-gray-400 w-20">Cloud: {qty}</span>
              <input
                type="number"
                min={1}
                max={qty}
                value={cloudTransferQty[good + '_back'] || ''}
                onChange={e => setCloudTransferQty(q => ({ ...q, [good + '_back']: Math.max(1, Math.min(Number(e.target.value) || 1, qty)) }))}
                className="w-20 px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-white text-center h-8"
              />
              <button
                className="px-2 rounded bg-blue-700 hover:bg-blue-800 text-xs w-24 h-8 flex items-center justify-center"
                style={{ minHeight: '2rem' }}
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
			{showVCModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xs flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold mb-2">VC Borrow</h3>
      <div className="text-xs text-gray-400 mb-2">Borrow up to your net worth (once per turn)</div>
      <input
        type="number"
        min={1}
        placeholder="Amount"
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white text-center mb-2"
        value={vcAmount}
        onChange={e => setVcAmount(e.target.value.replace(/[^0-9]/g, ''))}
      />
      {vcError && <div className="text-red-400 text-sm mb-2">{vcError}</div>}
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 px-4 py-2 rounded bg-yellow-700 hover:bg-yellow-800 font-semibold"
          onClick={() => {
            const amt = Number(vcAmount);
            let invValue = 0;
            GOODS.forEach(g => {
              invValue += (inventory[g.name] || 0) * prices[g.name];
              invValue += (cloudStorage[g.name] || 0) * prices[g.name];
            });
            const netWorth = wallet + bank + invValue;
            if (!amt || amt <= 0) {
              setVcError('Enter a valid amount.');
              return;
            }
            if (amt > netWorth) {
              setVcError('Cannot borrow more than your net worth.');
              return;
            }
            setWallet(wallet + amt);
            setDebt(debt + Math.round(amt * 1.2));
            setEventMsg(`You borrowed $${amt.toLocaleString()} (debt +$${Math.round(amt*1.2).toLocaleString()})`);
            setShowVCModal(false);
            setVcBorrowedTurn(turn);
            setTimeout(() => setEventMsg(null), 4000);
          }}
        >Confirm</button>
        <button
          className="flex-1 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 font-semibold"
          onClick={() => setShowVCModal(false)}
        >Cancel</button>
      </div>
      <div className="flex flex-col w-full text-xs text-gray-400 mt-2">
        <span>Net Worth: ${(() => {
          let invValue = 0;
          GOODS.forEach(g => {
            invValue += (inventory[g.name] || 0) * prices[g.name];
            invValue += (cloudStorage[g.name] || 0) * prices[g.name];
          });
          return (wallet + bank + invValue).toLocaleString();
        })()}</span>
      </div>
    </div>
  </div>
)}
			{showRepairModal && (
   <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xs flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold mb-2">Bob from Tech Support</h3>
      <p className="text-center text-base text-gray-200 mb-2">"Hey, I can fix your servers! Just tell me how much you're willing to pay. The more I can fix!"</p>
      <div className="text-sm text-gray-400 mb-2">Max repair cost: <b>${repairMax.toLocaleString()}</b> | Your offer: </div>
      <input
        type="number"
        min={1}
        max={repairMax}
        value={repairAmount}
        onChange={e => setRepairAmount(e.target.value.replace(/[^0-9]/g, ''))}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white text-center mb-2"
      />
      {repairError && <div className="text-red-400 text-sm mb-2">{repairError}</div>}
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 font-semibold"
          onClick={() => {
            const amt = Number(repairAmount);
            let invValue = 0;
            GOODS.forEach(g => {
              invValue += (inventory[g.name] || 0) * prices[g.name];
              invValue += (cloudStorage[g.name] || 0) * prices[g.name];
            });
            const netWorth = wallet + bank + invValue;
            if (!amt || amt < 1) {
              setRepairError('Enter a valid amount.');
              return;
            }
            if (amt > wallet) {
              setRepairError('Not enough in wallet.');
              return;
            }
            if (amt > repairMax) {
              setRepairError('That exceeds the max allowed for this repair.');
              return;
            }
            // Proportion of max repair
            const percent = Math.min(amt / repairMax, 1);
            const healthRestored = Math.round((100 - serverHealth) * percent);
            setWallet(wallet - amt);
            setServerHealth(h => Math.min(100, h + healthRestored));
            setEventMsg(`Bob fixed your servers for $${amt.toLocaleString()}! Server health restored by ${healthRestored}.`);
            setShowRepairModal(false);
            setTimeout(() => setEventMsg(null), 4000);
          }}
        >Pay Bob</button>
        <button
          className="flex-1 px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 font-semibold"
          onClick={() => setShowRepairModal(false)}
        >Cancel</button>
      </div>
      <div className="flex flex-col w-full text-xs text-gray-400 mt-2">
        <span>Wallet: ${wallet.toLocaleString()}</span>
        <span>Net Worth: ${(() => {
          let invValue = 0;
          GOODS.forEach(g => {
            invValue += (inventory[g.name] || 0) * prices[g.name];
            invValue += (cloudStorage[g.name] || 0) * prices[g.name];
          });
          return (wallet + bank + invValue).toLocaleString();
        })()}</span>
        <span>Server Health: {serverHealth}/100</span>
      </div>
    </div>
  </div>
)}
			{/* Show price trends and market forecasting if analytics is unlocked */}
			{analytics && (
  <div className="w-full max-w-2xl bg-blue-900/80 text-blue-200 rounded-lg p-4 shadow text-center font-semibold mb-4">
    <h3 className="text-lg font-bold mb-2">Market Forecast</h3>
    <div className="flex flex-wrap gap-4 justify-center">
      {GOODS.map(g => (
        <div key={g.name} className="flex flex-col items-center bg-gray-800/80 rounded p-2 min-w-[180px]">
          <span className="font-bold">{g.emoji} {g.name}</span>
          <span className="text-sm">Current: ${prices[g.name].toLocaleString()}</span>
          {/* Simple forecast: show if price is likely to rise/fall based on random chance or last price */}
          <span className="text-xs mt-1">
            {(() => {
              const base = g.price;
              if (prices[g.name] < base * 0.9) return <span className="text-green-300">Likely to Rise</span>;
              if (prices[g.name] > base * 1.1) return <span className="text-red-300">Likely to Fall</span>;
              return <span className="text-yellow-200">Stable</span>;
            })()}
          </span>
          {/* Price history graph for this good in all cities */}
          <div className="w-full mt-2">
            {Object.entries(priceHistory).map(([cityName, cityHist]) => (
              <div key={cityName} className="mb-1">
                <span className="text-xs text-blue-300">{cityName}</span>
                <svg width="120" height="32" viewBox="0 0 120 32" className="block">
                  {cityHist[g.name] && cityHist[g.name].length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      points={cityHist[g.name].map((p, i, arr) => {
                        const min = Math.min(...arr);
                        const max = Math.max(...arr);
                        const y = max === min ? 16 : 28 - ((p - min) / (max - min)) * 24;
                        const x = (i / (arr.length - 1)) * 110 + 5;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                  )}
                </svg>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
		</div>
	);
}
