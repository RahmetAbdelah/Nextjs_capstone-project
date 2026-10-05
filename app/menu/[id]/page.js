import Link from "next/link";
import { notFound } from "next/navigation";
import { menuItems } from "../menu-data";
import AddToCartButton from "../AddToCartButton";

export const revalidate = 3600;

export function generateStaticParams() {
  return menuItems.map(({ slug }) => ({ id: slug }));
}

export default async function MenuDetailPage({ params }) {
  const { id } = await params;
  const item = menuItems.find((dish) => dish.slug === id);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <nav aria-label="Dish navigation">
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>

      <section>
        <p>Featured dish</p>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>${item.price}</p>
        <AddToCartButton dish={item} />
      </section>
    </main>
  );
}
