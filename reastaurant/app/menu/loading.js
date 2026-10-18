export default function Loading() {
    return (
        <main aria-busy="true" className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="text-3xl font-bold">Loading the menu…</h1>
            <p className="mt-3 text-stone-600">Please wait while we get the dishes ready.</p>
        </main>
    );
}