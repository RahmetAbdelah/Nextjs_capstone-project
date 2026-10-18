import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { signOut } from "@/app/actions";
import { getSession } from "@/lib/session";
import { CartProvider } from "./CartProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Addis Eats | Ethiopian Restaurant",
  description: "Order traditional Ethiopian dishes from Addis Eats.",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-amber-50 text-stone-900">
        <header className="border-b border-amber-200 bg-white">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
          >
            <Link className="text-xl font-bold text-amber-900" href="/">Addis Eats</Link>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
              {session ? (
                <>
                  <Link href="/orders">Your orders</Link>
                  {session.role === "staff" && <Link href="/kitchen">Kitchen</Link>}
                  <form action={signOut}>
                    <button type="submit">Sign out</button>
                  </form>
                </>
              ) : (
                <Link href="/signin">Sign in</Link>
              )}
            </div>
          </nav>
        </header>
        <CartProvider>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </CartProvider>
        <footer className="border-t border-amber-200 bg-white px-6 py-5 text-center text-sm text-stone-600">
          Addis Eats · Ethiopian food, made with care.
        </footer>
      </body>
    </html>
  );
}
