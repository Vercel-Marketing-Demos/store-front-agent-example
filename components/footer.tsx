import Link from "next/link";

import { AskScoutButton } from "@/components/agent/ask-scout";
import { getCategories } from "@/lib/store";

export async function Footer() {
  const categories = await getCategories();
  const link = "text-sand/70 hover:text-sand hover:underline";
  return (
    // Bottom padding keeps the fixed "Ask Scout" button off the last line.
    <footer className="bg-forest pt-14 pb-24 text-sm text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl">Northern Goods</p>
          <p className="mt-3 max-w-sm leading-relaxed text-sand/70">
            Outdoor gear and home goods, made from honest materials and built to be used hard, then handed down.
          </p>
        </div>
        <div>
          <p className="font-medium">Shop</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/shop" className={link}>
                Shop all
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link href={`/shop?category=${encodeURIComponent(c)}`} className={link}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium">Help</p>
          <ul className="mt-3 space-y-2">
            <li>
              <AskScoutButton className={link}>Ask Scout</AskScoutButton>
            </li>
            <li>
              <AskScoutButton prompt="Where's my order?" className={link}>
                Track an order
              </AskScoutButton>
            </li>
            <li>
              <AskScoutButton prompt="I'd like to start a return." className={link}>
                Returns and exchanges
              </AskScoutButton>
            </li>
            <li>
              <Link href="/cart" className={link}>
                Your cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-sand/15 px-4 pt-6 text-xs text-sand/50">
        A demo store, built to try out Vercel. Nothing here ships for real.
      </p>
    </footer>
  );
}
