import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

// Scout, the shopping assistant, runs as its own Vercel project (buildswithcoffee/scout-agent).
// The chat panel talks to it at NEXT_PUBLIC_SCOUT_URL; see lib/scout-url.ts.
const nextConfig: NextConfig = {};

// The Vercel Toolbar, for Flags Explorer when running locally (lib/flags.ts).
const withVercelToolbar = createWithVercelToolbar();
export default withVercelToolbar(nextConfig);
