"use client";

import { useEffect, useId, useRef, useState } from "react";

// Demo mode, for presenters: the presenter opens the store once with ?demo=1 and this browser
// remembers it (?demo=0 turns it off). It adds Scout's prompt buttons and small "+" markers that
// say what part of Vercel powers each part of the store. Shoppers never see any of it.
const DEMO_KEY = "scout-demo";
const CHANGED = "scout-demo-changed";

function read(): boolean {
  try {
    const asked = new URLSearchParams(window.location.search).get("demo");
    if (asked === "1") localStorage.setItem(DEMO_KEY, "1");
    if (asked === "0") localStorage.removeItem(DEMO_KEY);
    return localStorage.getItem(DEMO_KEY) === "1";
  } catch {
    // Storage can be unavailable; demo mode just stays off.
    return false;
  }
}

export function useDemoMode(): boolean {
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    setDemo(read());
    const sync = () => setDemo(read());
    window.addEventListener(CHANGED, sync);
    return () => window.removeEventListener(CHANGED, sync);
  }, []);
  return demo;
}

function turnOff() {
  try {
    localStorage.removeItem(DEMO_KEY);
  } catch {
    // Nothing to clear.
  }
  const url = new URL(window.location.href);
  if (url.searchParams.has("demo")) {
    url.searchParams.delete("demo");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }
  window.dispatchEvent(new Event(CHANGED));
}

// Bottom left, only while demo mode is on: shows it's on, and turns it off.
export function DemoModeBadge() {
  const demo = useDemoMode();
  if (!demo) return null;
  return (
    <button
      type="button"
      onClick={turnOff}
      title="Turn demo mode off on this browser"
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
    >
      <span aria-hidden>▲</span> Demo mode: on <span aria-hidden className="text-neutral-400">×</span>
    </button>
  );
}

// One marker: a small "+" circle that expands, on a click or tap, into a card with what powers this
// part and a link to it in the Vercel dashboard. Renders nothing outside demo mode.
export function VercelTip({
  product,
  children,
  href,
  linkLabel = "Open in Vercel",
  align = "left",
  side = "bottom",
}: {
  product: string;
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
  align?: "left" | "right";
  /** Open above the marker, for markers near the bottom of the screen. */
  side?: "bottom" | "top";
}) {
  const demo = useDemoMode();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  if (!demo) return null;

  return (
    <span ref={root} className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={`What powers this: ${product}`}
        title={product}
        className={`flex size-5 items-center justify-center rounded-full text-sm leading-none font-medium shadow-sm ring-1 transition ${
          open ? "rotate-45 bg-neutral-900 text-white ring-neutral-900" : "bg-white text-neutral-500 ring-neutral-300 hover:text-neutral-900 hover:ring-neutral-500"
        }`}
      >
        <span aria-hidden className="-mt-px">
          +
        </span>
      </button>
      {open && (
        <span
          id={id}
          role="dialog"
          aria-label={product}
          className={`absolute z-[60] ${side === "top" ? "bottom-full pb-2" : "top-full pt-2"} ${align === "right" ? "right-0" : "left-0"}`}
        >
          <span className="block w-72 rounded-xl bg-neutral-900 p-3 text-left text-xs leading-relaxed font-normal text-neutral-200 shadow-lg">
            <span className="mb-1 block text-sm font-semibold text-white">▲ {product}</span>
            {children}
            {href && (
              <a href={href} target="_blank" rel="noreferrer" className="mt-2 block font-medium text-white underline underline-offset-2 hover:no-underline">
                {linkLabel} ↗
              </a>
            )}
          </span>
        </span>
      )}
    </span>
  );
}
