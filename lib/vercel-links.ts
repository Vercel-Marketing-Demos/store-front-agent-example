// Where demo mode's "Open in Vercel" links go (components/demo-mode.tsx). Kept in one place so a
// link that moves is one edit. Set NEXT_PUBLIC_VERCEL_TEAM_SLUG on a copy deployed to another team.
const TEAM = process.env.NEXT_PUBLIC_VERCEL_TEAM_SLUG ?? "marketing-demos-0826-vtest314";
const dashboard = (path: string) => `https://vercel.com/${TEAM}/${path}`;

export const VERCEL_LINKS = {
  /** This store's deployments, including each pull request's preview. */
  deployments: dashboard("northern-goods-store/deployments"),
  /** Scout's agent runs: every chat turn, with its model, tools and cost. */
  agentRuns: dashboard("scout-agent/observability/agent-runs"),
  /** Scout's sandboxes, where photo checks run. */
  sandboxes: dashboard("scout-agent/observability/sandboxes"),
  /** Scout's workflow runs, one per return. */
  workflows: dashboard("scout-agent/workflows"),
} as const;
