import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <Link className="site-brand" href="/">
            <span aria-hidden="true" className="brand-mark">A</span>
            <span>Addis Eats</span>
          </Link>
          <p className="site-footer-copy">Ethiopian food, made with care.</p>
        </div>
        <nav aria-label="Footer navigation" className="site-footer-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Explore the menu</Link>
          <Link href="/cart">Your cart</Link>
        </nav>
        <p className="site-footer-copy">Addis Eats · Ethiopian food, made with care.</p>
      </div>
    </footer>
  );
}
