import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16">
            <p className="font-semibold text-amber-800">404 · Page not found</p>
            <h1 className="mt-2 text-3xl font-bold">We could not find that page.</h1>
            <div className="mt-6 flex gap-5">
                <Link className="font-medium underline" href="/menu">Browse the menu</Link>
                <Link className="font-medium underline" href="/">Go home</Link>
            </div>
        </main>
    );
}