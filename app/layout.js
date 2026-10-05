import Link from "next/link";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food delivered fresh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Addis Eats</Link>
          <nav aria-label="Main navigation">
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <Providers>{children}</Providers>
        <footer>
          <div>
            <p>Addis Eats · Made with care in Addis Ababa</p>
            <p>Fresh injera, vibrant flavors, warm hospitality.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
