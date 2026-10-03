"use client";

export default function MenuError({ error, reset }) {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-center">
      <h2 className="text-3xl font-black">Something went wrong.</h2>
      <p className="mt-3 text-stone-600">{error?.message || "The menu could not load."}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
