import Link from "next/link";

const menuItems = [
  { slug: "kitfo", name: "Kitfo", price: 19, description: "Lean beef with mitmita and a warm injera base." },
  { slug: "doro-wat", name: "Doro Wat", price: 22, description: "Traditional chicken stew with berbere, onions, and potatoes." },
  { slug: "vegetable-combo", name: "Vegetable Combo", price: 18, description: "A hearty mix of lentils, greens, and fresh vegetables." },
  { slug: "fresh-injera", name: "Fresh Injera", price: 7, description: "Soft, tangy sourdough flatbread baked fresh each day." },
];

export default function DishList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {menuItems.map((item) => (
        <Link
          key={item.slug}
          href={`/menu/${item.slug}`}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="mt-2 text-stone-600">{item.description}</p>
            </div>
            <span className="text-xl font-black text-amber-700">${item.price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
