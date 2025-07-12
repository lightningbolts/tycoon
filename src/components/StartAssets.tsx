export default function StartAssets({ cash, infra }: { cash: number; infra: string }) {
  return (
    <section className="bg-black/30 rounded-lg p-6 shadow-lg flex flex-col items-center gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Your Starting Assets</h2>
      <ul className="text-base text-gray-200 list-disc list-inside">
        <li>💵 <b>${cash.toLocaleString()}</b> cash</li>
        <li>☁️ <b>{infra}</b></li>
        <li>Optional: Take a <span className="text-yellow-300">VC loan</span> (risky!)</li>
      </ul>
    </section>
  );
}
