import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Commission Dashboard",
  description:
    "Unified commission dashboard that parses, validates and standardizes sales data from multiple CRMs to calculate individual and total commissions in a clear, extensible UI.",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 px-4 font-sans antialiased">
        <header className="text-xl leading-[4rem] font-bold">
          <Link href="/">commission-dashboard</Link>
        </header>
        {children}
        <footer className="text-center leading-[4rem] opacity-70">commission-dashboard</footer>
      </body>
    </html>
  );
}
