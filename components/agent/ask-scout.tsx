"use client";

// Opens Scout's drawer from anywhere on the page, such as the home page's "Ask Scout" buttons.
// A prompt goes into the composer the way demo mode's prompt buttons do: the shopper still sends it.
export const OPEN_SCOUT = "scout-open";

export interface OpenScoutDetail {
  prompt?: string;
}

export function openScout(prompt?: string) {
  window.dispatchEvent(new CustomEvent<OpenScoutDetail>(OPEN_SCOUT, { detail: { prompt } }));
}

export function AskScoutButton({ prompt, className, children }: { prompt?: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => openScout(prompt)} className={className}>
      {children}
    </button>
  );
}
