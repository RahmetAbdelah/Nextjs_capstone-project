import Link from "next/link";
import { signOut } from "@/app/actions";

export default function SiteHeader({ session }) {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-nav-shell">
        <Link className="site-brand" href="/">
          <span aria-hidden="true" className="brand-mark">A</span>
          <span>Addis Eats</span>
        </Link>
        <div className="site-nav-links">
          <Link className="site-nav-link" href="/menu">Menu</Link>
          <Link className="site-nav-link" href="/cart">Cart</Link>
          <Link className="site-nav-link" href="/checkout">Checkout</Link>
          {session ? (
            <>
              <Link className="site-nav-link" href="/orders">Your orders</Link>
              {session.role === "staff" && (
                <>
                  <Link className="site-nav-link" href="/kitchen">Kitchen</Link>
                  <Link className="site-nav-link" href="/dashboard">Dashboard</Link>
                </>
              )}
              <form action={signOut}>
                <button className="site-nav-link" type="submit">Sign out</button>
              </form>
            </>
          ) : (
            <Link className="site-nav-cta" href="/signin">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
