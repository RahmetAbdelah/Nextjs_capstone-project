import Link from "next/link";

const highlights = [
  { title: "Fresh Injera", text: "Made daily with a soft, traditional texture.", href: "/menu" },
  { title: "Signature Platters", text: "Kitfo, doro wat, and vegetable favorites.", href: "/menu" },
  { title: "Fast Delivery", text: "Hot, fresh meals delivered across the city.", href: "/checkout" },
];

export default function Home() {
  return (
    <main>
      <section>
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian cuisine</p>
        <p>Big flavor, warm hospitality.</p>
        <p>
          Order vibrant stews, spiced rice, and freshly baked injera from your neighborhood Ethiopian kitchen.
        </p>
        <nav aria-label="Home navigation">
          <Link href="/menu">Explore menu</Link>
          <Link href="/cart">View cart</Link>
          <Link href="/checkout">Place order</Link>
        </nav>
      </section>

      <section aria-labelledby="special-heading">
        <p>Chef&apos;s special</p>
        <h2 id="special-heading">Doro Wat Combo</h2>
        <p>Tender chicken, spiced berbere, and fresh injera for a complete feast.</p>
        <p>$22</p>
        <Link href="/menu/doro-wat">Order now</Link>
      </section>

      <section aria-label="Highlights">
          {highlights.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link href={item.href}>Learn more</Link>
          </article>
          ))}
      </section>
    </main>
  );
}
