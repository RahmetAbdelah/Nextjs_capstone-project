export function OrderTableSkeleton() {
  return (
    <div aria-label="Loading orders" aria-busy="true" className="mt-6 overflow-x-auto rounded-lg border border-amber-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead className="bg-amber-100">
          <tr>
            {["Order", "Customer", "Neighbourhood", "Est. revenue", "Status", "Order date"].map((heading) => (
              <th className="px-4 py-3" key={heading} scope="col">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr className="border-t border-amber-100" key={index}>
              {Array.from({ length: 6 }, (_, cell) => (
                <td className="px-4 py-4" key={cell}>
                  <span className="block h-4 w-24 animate-pulse rounded bg-amber-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="sr-only">Loading orders…</span>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Orders</h1>
      <OrderTableSkeleton />
    </main>
  );
}