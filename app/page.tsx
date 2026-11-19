import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts, type Product } from "@/lib/store";

// The holiday gift guide's picks, all under $50.
const GIFT_PICKS = ["wool-beanie", "insulated-bottle-750", "cedar-candle", "enamel-mug-set"];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(category), getCategories()]);
  const gifts = category ? [] : GIFT_PICKS.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is Product => p !== undefined);

  return (
    <>
      {gifts.length > 0 && (
        <section className="mb-10 rounded-2xl bg-red-50 p-6 ring-1 ring-red-100">
          <p className="text-xs font-medium tracking-wide text-red-700 uppercase">Holiday gift guide</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Thoughtful gifts under $50</h2>
          <p className="mt-1 text-sm text-neutral-600">Order by December 18 for delivery before the holidays.</p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {gifts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip href="/" active={!category} label="All" />
        {categories.map((c) => (
          <FilterChip key={c} href={`/?category=${encodeURIComponent(c)}`} active={c === category} label={c} />
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
