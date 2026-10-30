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
        <nav aria-label="Menu categories" className="category-bar">
            {categories.map((category) => (
                <Link
                    className="category-link"
                    href={category.href}
                    key={category.href}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}
