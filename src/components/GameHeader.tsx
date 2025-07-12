import Image from "next/image";

export default function GameHeader() {
  return (
    <header className="flex flex-col items-center gap-2">
      <Image src="/next.svg" alt="Tycoon Logo" width={120} height={30} className="mb-2 dark:invert" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">Tycoon: Tech Empire</h1>
      <p className="text-lg text-gray-300 max-w-xl text-center">
        Build a tech empire by trading futuristic commodities, upgrading infrastructure, and navigating a dynamic global economy. Reach $1B, IPO, or dominate all sectors!
      </p>
    </header>
  );
}
