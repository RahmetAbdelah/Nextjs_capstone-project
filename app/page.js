import Link from "next/link";

const highlights = [
  { title: "Fresh Injera", text: "Made daily with a soft, traditional texture.", href: "/menu" },
  { title: "Signature Platters", text: "Kitfo, doro wat, and vegetable favorites.", href: "/menu" },
  { title: "Fast Delivery", text: "Hot, fresh meals delivered across the city.", href: "/checkout" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <nav className="mb-12 flex items-center justify-between">
          <div className="text-2xl font-bold">Addis Eats</div>
          <div className="flex gap-4 text-sm font-medium text-stone-700">
            <Link href="/menu" className="transition hover:text-stone-950">Menu</Link>
            <Link href="/cart" className="transition hover:text-stone-950">Cart</Link>
            <Link href="/checkout" className="transition hover:text-stone-950">Checkout</Link>
          </div>
        </nav>

        <div className="grid items-center gap-12 rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Authentic Ethiopian cuisine
            </p>
            <h1 className="max-w-lg text-4xl font-black tracking-tight md:text-6xl">
              Big flavor, warm hospitality.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-stone-700">
              Order vibrant stews, spiced rice, and freshly baked injera from your neighborhood Ethiopian kitchen.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Explore menu
              </Link>
              <Link
                href="/checkout"
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
              >
                Place order
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-stone-900 p-6 text-stone-100 shadow-xl">
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Chef&apos;s special</p>
              <h2 className="mt-3 text-3xl font-bold">Doro Wat Combo</h2>
              <p className="mt-3 text-stone-300">Tender chicken, spiced berbere, and fresh injera for a complete feast.</p>
              <div className="mt-6 flex items-end justify-between">
                <span className="text-3xl font-black">$22</span>
                <Link href="/menu/doro-wat" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-stone-900 hover:bg-amber-300">
                  Order now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-stone-600">{item.text}</p>
              <Link href={item.href} className="mt-5 inline-block text-sm font-semibold text-amber-700 hover:text-amber-900">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
