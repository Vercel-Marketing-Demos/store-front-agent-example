import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

// The store's feature flags. Each one is managed in Vercel Flags (the northern-goods-store
// project's Flags tab, or `vercel flags`), which serves its own setting per environment.
// defaultValue is what the store shows when a flag can't be read, such as on a copy of the
// store deployed without Vercel Flags, so each default is the store's normal behavior.
// Only flags are exported here: the Flags Explorer route reads every export.

export const brandHomeFlag = flag<boolean>({
  key: "brand-home",
  description: "Show the brand landing page at /; off shows the product grid there instead",
  defaultValue: false,
  options: [
    { value: false, label: "Off" },
    { value: true, label: "On" },
  ],
  adapter: vercelAdapter,
});

export const scoutEnabledFlag = flag<boolean>({
  key: "scout-enabled",
  description: "Kill switch for Scout: off hides the Ask Scout button, its drawer and the home page's Scout prompts",
  defaultValue: true,
  options: [
    { value: false, label: "Off" },
    { value: true, label: "On" },
  ],
  adapter: vercelAdapter,
});

// The variant whose value is "off" hides the bar (Vercel Flags doesn't allow an empty variant).
export const announcementBarFlag = flag<string>({
  key: "announcement-bar",
  description: "The message in the bar above the header; the Off variant (value off) hides the bar",
  defaultValue: "Free shipping on orders over $75 · Free exchanges within 30 days",
  options: [
    { value: "Free shipping on orders over $75 · Free exchanges within 30 days", label: "Shipping and exchanges" },
    { value: "Meet Scout, our shopping assistant: ask about fit, orders and returns", label: "Scout" },
    { value: "off", label: "Off" },
  ],
  adapter: vercelAdapter,
});
