import Link from "next/link";

const categories = [
  { name: "All dishes", href: "/menu" },
  { name: "Doro Wat", href: "/menu/doro-wat" },
  { name: "Kitfo", href: "/menu/kitfo" },
  { name: "Vegetable Combo", href: "/menu/vegetable-combo" },
  { name: "Fresh Injera", href: "/menu/fresh-injera" },
];

export default function CategoryBar() {
  return (
    <nav aria-label="Menu categories">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
