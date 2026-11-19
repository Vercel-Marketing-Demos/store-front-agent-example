import Link from "next/link";

import { VercelTip } from "@/components/demo-mode";
import { getCartId } from "@/lib/cart-cookie";
import { announcementBarFlag } from "@/lib/flags";
import { getCartCount, getCategories } from "@/lib/store";
import { VERCEL_LINKS } from "@/lib/vercel-links";

// On a preview deployment (a pull request's, such as a demo PR from the employee app), the header
// says so, with a marker that's always on: whoever opens a preview is there to see the change.
// Vercel sets these system variables on every deployment.
function previewOf(): string | null {
  if (process.env.VERCEL_ENV !== "preview") return null;
  const pr = process.env.VERCEL_GIT_PULL_REQUEST_ID;
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  return pr ? `PR #${pr}` : branch ? branch : "this branch";
}

export async function Header() {
  const [count, categories, announcement] = await Promise.all([getCartId().then(getCartCount), getCategories(), announcementBarFlag()]);
  // The announcement-bar flag sets the message; its "off" variant hides the bar. On a phone only
  // the part before the first " · " shows, so it fits on one line.
  const [lead, ...rest] = announcement === "off" ? [] : announcement.split(" · ");
  const preview = previewOf();
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      {/* Keep the message in step with what Scout says (its promotions, shipping and returns skills). */}
      {lead && (
        <p className="bg-forest px-4 py-1.5 text-center text-xs tracking-wide text-sand">
          {lead}
          {rest.length > 0 && <span className="hidden sm:inline"> · {rest.join(" · ")}</span>}
        </p>
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Northern Goods
          </Link>
          {preview ? (
            <>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200">Preview · {preview}</span>
              <VercelTip product="Preview deployment" href={VERCEL_LINKS.deployments} always>
                You&apos;re looking at a preview deployment: a live copy of the store built from {preview}, at its own address, with the production store
                untouched. Vercel builds one for every pull request in a minute or two, so a change can be tried and reviewed before it ships.
              </VercelTip>
            </>
          ) : (
            <VercelTip product="Next.js on Vercel" href={VERCEL_LINKS.project}>
              The store is a Next.js app. Vercel builds it on every push to main and serves it from its global network. Pages render on the server, and the
              cart, checkout and search run as Vercel Functions on Fluid compute, with no servers to manage.
            </VercelTip>
          )}
        </div>
        <nav className="hidden items-center gap-5 text-sm text-neutral-700 lg:flex" aria-label="Categories">
          {categories.map((c) => (
            <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`} className="hover:text-neutral-900 hover:underline">
              {c}
            </Link>
          ))}
        </nav>
        <form action="/search" className="ml-auto hidden sm:block">
          <input
            type="search"
            name="q"
            placeholder="Search the store"
            className="w-56 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
          />
        </form>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart{count > 0 && ` (${count})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}
