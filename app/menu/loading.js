export default function MenuLoading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="animate-pulse space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div className="h-6 w-1/3 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-200" />
        <div className="h-4 w-5/6 rounded bg-stone-200" />
      </div>
    </main>
  );
}
