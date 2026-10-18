"use client";

export default function MenuError({ reset }) {
   return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12" role="alert">
         <h1 className="text-2xl font-bold">We could not load the menu.</h1>
         <p className="mt-2 text-stone-600">Please try again.</p>
         <button
            className="mt-5 rounded bg-amber-800 px-4 py-2 font-semibold text-white"
            onClick={() => reset()}
            type="button"
         >
            Try again
         </button>
      </main>
   );
}