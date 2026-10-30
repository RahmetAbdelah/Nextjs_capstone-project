"use client";

export default function MenuError({ reset }) {
   return (
      <main className="page-shell" role="alert">
         <h1 className="page-heading">We could not load the menu.</h1>
         <p className="mt-2 text-stone-600">Please try again.</p>
         <button
            className="button-primary mt-5"
            onClick={() => reset()}
            type="button"
         >
            Try again
         </button>
      </main>
   );
}