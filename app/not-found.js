import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <p>404</p>
      <h1>Dish not found</h1>
      <p>
        The item you wanted is not on the menu right now.
      </p>
      <nav aria-label="Not found navigation">
        <Link href="/menu">
          Back to menu
        </Link>
        <Link href="/">
          Home
        </Link>
      </nav>
    </main>
  );
}
