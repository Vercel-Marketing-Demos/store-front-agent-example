import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/store";

// The full catalog, filtered by ?category=. The home page links here from its category tiles.
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(category), getCategories()]);

  return (
    <>
      <h1 className="font-display text-3xl tracking-tight">{category ?? "Shop all"}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <FilterChip href="/shop" active={!category} label="All" />
        {categories.map((c) => (
          <FilterChip key={c} href={`/shop?category=${encodeURIComponent(c)}`} active={c === category} label={c} />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 text-sm ring-1 ${
        active ? "bg-neutral-900 text-white ring-neutral-900" : "bg-white text-neutral-700 ring-neutral-200 hover:bg-neutral-100"
      }`}
    >
      {label}
    </Link>
  );
}
