import { db } from "@/lib/db";

// The demo shopper's current Trail Shell Jacket order, for the chat's demo prompt buttons
// ("It's order 4624 and my email is shopper_alex@vercel.demo."). The retail demo's reset in the
// employee app recreates this order, so its number changes; this always returns the newest one.
// It only ever answers for this one demo shopper.
const DEMO_SHOPPER_EMAIL = "shopper_alex@vercel.demo";

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }
  const sql = await db();
  const [order] = await sql`
    select number from orders
    where email = ${DEMO_SHOPPER_EMAIL} and items @> ${JSON.stringify([{ slug: "trail-shell-jacket" }])}::jsonb
    order by id desc limit 1`;
  return Response.json(
    { number: (order?.number as string | undefined) ?? null, email: DEMO_SHOPPER_EMAIL },
    { headers: { "Cache-Control": "no-store" } },
  );
}
