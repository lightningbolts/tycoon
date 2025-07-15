import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tycoon!",
  description: "Become a tech mogul in this simulation game. Build your corporation, manage resources, and dominate the market!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Analytics />
        <style>{`
          :root {
            --font-sans: 'JetBrains Mono', 'Menlo', monospace;
            --font-mono: 'JetBrains Mono', 'Menlo', monospace;
          }
          body {
            font-family: var(--font-sans);
          }
          code, pre, .font-mono {
            font-family: var(--font-mono);
          }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
