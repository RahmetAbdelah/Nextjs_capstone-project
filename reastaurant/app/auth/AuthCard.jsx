export default function AuthCard({ eyebrow, title, description, children }) {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-6 py-12">
      <section className="auth-card w-full p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">{title}</h1>
        <p className="mt-2 leading-6 text-stone-600">{description}</p>
        {children}
      </section>
    </main>
  );
}
