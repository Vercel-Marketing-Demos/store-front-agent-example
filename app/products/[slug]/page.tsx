import { notFound } from "next/navigation";

import { addToCart } from "@/app/actions";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { getProduct, getProducts } from "@/lib/store";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const optionNames = Object.keys(product.options);
  // Up to four other products from the same department.
  const related = (await getProducts(product.category)).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200">
          <img src={product.image} alt={product.name} width={800} height={800} className="aspect-square w-full" />
        </div>
        <div>
          <p className="text-sm text-neutral-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-xl">{formatPrice(product.priceCents)}</p>
          <p className="mt-6 leading-relaxed text-neutral-700">{product.description}</p>

          <form action={addToCart} className="mt-8 space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            {optionNames.map((name) => (
              <label key={name} className="block text-sm">
                <span className="font-medium">{name}</span>
                <select
                  name={`option:${name}`}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
                >
                  {product.options[name].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
            ))}
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
