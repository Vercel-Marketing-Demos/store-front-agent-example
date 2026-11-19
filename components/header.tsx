import Link from "next/link";

import { VercelTip } from "@/components/demo-mode";
import { getCartId } from "@/lib/cart-cookie";
import { getCartCount } from "@/lib/store";
import { VERCEL_LINKS } from "@/lib/vercel-links";

export async function Header() {
  const count = await getCartCount(await getCartId());
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Northern Goods
          </Link>
          <VercelTip product="Deployments" href={VERCEL_LINKS.deployments}>
            The store deploys on every push to main. Every pull request gets its own preview deployment, a live copy at its own address, so changes can be
            seen and reviewed before they ship.
          </VercelTip>
        </div>
        <form action="/search" className="hidden sm:block">
          <input
            type="search"
            name="q"
            placeholder="Search the store"
            className="w-56 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
          />
        </form>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
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
