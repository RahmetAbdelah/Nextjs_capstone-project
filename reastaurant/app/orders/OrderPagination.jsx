import Link from "next/link";
import { createOrderLink } from "./order-table-utils";

export default function OrderPagination({ page, totalPages, sort, direction }) {
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <nav aria-label="Order table pages" className="table-pagination">
      <Link
        aria-disabled={page <= 1}
        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
        href={createOrderLink(previousPage, sort, direction)}
        tabIndex={page <= 1 ? -1 : undefined}
      >
        Previous page
      </Link>
      <p aria-live="polite">Page {page} of {totalPages}</p>
      <Link
        aria-disabled={page >= totalPages}
        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
        href={createOrderLink(nextPage, sort, direction)}
        tabIndex={page >= totalPages ? -1 : undefined}
      >
        Next page
      </Link>
    </nav>
  );
}
