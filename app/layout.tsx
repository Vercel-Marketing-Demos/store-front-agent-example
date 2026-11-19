import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";

import { Chat } from "@/components/agent/chat";
import { DemoModeToggle } from "@/components/demo-mode";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { hasDatabase } from "@/lib/db";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
// The serif for the home page's headlines and section titles.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Northern Goods",
  description: "A small storefront with Scout, an AI shopping assistant, built to try out Vercel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {/* proxy.ts rewrites every route to /setup while DATABASE_URL is missing. */}
        {hasDatabase && <Header />}
        {/* Pages sit in a centered column; one marked data-full-bleed (the home page) spans the window. */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 has-[>[data-full-bleed]]:max-w-none has-[>[data-full-bleed]]:p-0">{children}</main>
        {hasDatabase && <Footer />}
        {hasDatabase && <Chat />}
        <DemoModeToggle />
      </body>
    </html>
  );
}
