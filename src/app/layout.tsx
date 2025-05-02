import type {Metadata} from "next";

import {Toaster} from "sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "Commission Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Unified commission dashboard that parses, validates and standardizes sales data from multiple CRMs to calculate individual and total commissions in a clear, extensible UI.",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="any" />
      </head>
      <body className="container m-auto grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 p-4 font-sans antialiased">
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
