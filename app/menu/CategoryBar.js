import Link from "next/link";

const categories = [
  { name: "Featured", href: "/menu" },
  { name: "Stews", href: "/menu" },
  { name: "Rice", href: "/menu" },
  { name: "Sides", href: "/menu" },
];

export default function CategoryBar() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
