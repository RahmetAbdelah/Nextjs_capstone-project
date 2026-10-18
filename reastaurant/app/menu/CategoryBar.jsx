import Link from "next/link";

const categories = [
    { name: "All dishes", href: "/menu" },
    { name: "Doro Wat", href: "/menu/doro-wot" },
    { name: "Beyaynetu", href: "/menu/beyaynetu" },
    { name: "Kitfo", href: "/menu/kitfo" },
    { name: "Shiro Tegabeno", href: "/menu/shiro-tegabeno" },
];

export default function CategoryBar() {
    return (
        <nav aria-label="Menu categories" className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => (
                <Link
                    className="rounded-full border border-amber-800 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
                    href={category.href}
                    key={category.href}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}
