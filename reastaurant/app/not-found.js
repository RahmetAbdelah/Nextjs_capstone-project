import Link from "next/link";

export default function NotFound() {
    return (
        <main className="page-shell">
            <p className="section-eyebrow">404 · Page not found</p>
            <h1 className="page-heading">We could not find that page.</h1>
            <div className="home-actions">
                <Link className="button-primary" href="/menu">Browse the menu</Link>
                <Link className="button-secondary" href="/">Go home</Link>
            </div>
        </main>
    );
}