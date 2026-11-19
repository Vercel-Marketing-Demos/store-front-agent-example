"use client";

import { useEffect, useId, useRef, useState } from "react";

// Demo mode, for presenters: the small ▲ in the bottom-left corner turns it on and off, and this
// browser remembers it. ?demo=1 and ?demo=0 do the same from a link. It adds Scout's prompt
// buttons and small "+" markers that say what part of Vercel powers each part of the store.
// Shoppers only see the faint ▲.
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

function setDemo(on: boolean) {
  try {
    if (on) localStorage.setItem(DEMO_KEY, "1");
    else localStorage.removeItem(DEMO_KEY);
  } catch {
    // Storage can be unavailable; the switch then lasts until the page reloads.
  }
  // Drop ?demo=… from the address, so a reload doesn't undo the switch.
  const url = new URL(window.location.href);
  if (url.searchParams.has("demo")) {
    url.searchParams.delete("demo");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }
  window.dispatchEvent(new Event(CHANGED));
}

// Bottom left, always: a small ▲ that turns demo mode on and off. Faint when off, so shoppers
// hardly notice it; dark when on.
export function DemoModeToggle() {
  const demo = useDemoMode();
  const label = demo ? "Demo mode is on: hide what powers each part of the store" : "Demo mode: show what powers each part of the store";
  return (
    <button
      type="button"
      onClick={() => setDemo(!demo)}
      aria-pressed={demo}
      aria-label={label}
      title={label}
      className={`fixed bottom-4 left-4 z-40 flex size-7 items-center justify-center rounded-full text-[10px] shadow-sm ring-1 transition-colors ${
        demo ? "bg-neutral-900 text-white ring-neutral-900" : "bg-white/80 text-neutral-400 ring-neutral-200 hover:text-neutral-900"
      }`}
    >
      <span aria-hidden className="-mt-px">
        ▲
      </span>
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
  always = false,
}: {
  product: string;
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
  align?: "left" | "right";
  /** Open above the marker, for markers near the bottom of the screen. */
  side?: "bottom" | "top";
  /** Show it outside demo mode too, as on a pull request's preview deployment. */
  always?: boolean;
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
  if (!demo && !always) return null;

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
