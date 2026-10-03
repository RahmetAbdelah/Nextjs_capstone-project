import Link from "next/link";
import { notFound } from "next/navigation";

const menuItems = {
  kitfo: {
    name: "Kitfo",
    price: 19,
    description: "Lean beef flavored with mitmita and served with warm injera.",
  },
  "doro-wat": {
    name: "Doro Wat",
    price: 22,
    description: "Traditional chicken stew with berbere, onions, and soft potatoes.",
  },
  "vegetable-combo": {
    name: "Vegetable Combo",
    price: 18,
    description: "A balanced plate with lentils, greens, and seasonal vegetables.",
  },
  "fresh-injera": {
    name: "Fresh Injera",
    price: 7,
    description: "Tangy, fluffy sourdough flatbread baked in small batches.",
  },
};

export default function MenuDetailPage({ params }) {
  const item = menuItems[params.id];

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 flex gap-3 text-sm font-medium text-stone-700">
        <Link href="/menu" className="hover:text-stone-950">Menu</Link>
        <Link href="/cart" className="hover:text-stone-950">Cart</Link>
        <Link href="/checkout" className="hover:text-stone-950">Checkout</Link>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Featured dish</p>
        <h1 className="mt-4 text-4xl font-black">{item.name}</h1>
        <p className="mt-4 text-lg text-stone-600">{item.description}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-3xl font-black text-stone-900">${item.price}</span>
          <button className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white">
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
