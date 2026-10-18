"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DishCard from "./DishCard";

const PAGE_SIZE = 2;

export default function SearchBox({ initialResult, initialSearch, page }) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch === initialSearch) return;

    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    params.set("page", "1");
    router.replace(`/menu?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, initialSearch, router]);

  const key = debouncedSearch
    ? `/api/dishes?search=${encodeURIComponent(debouncedSearch)}&page=${page}&pageSize=${PAGE_SIZE}`
    : null;
  const { data, error, isLoading } = useSWR(key, fetcher, {
    fallbackData: initialResult,
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });
  const result = debouncedSearch ? data ?? initialResult : initialResult;

  function goToPage(nextPage) {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    params.set("page", String(nextPage));
    router.push(`/menu?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="mt-6" aria-label="Search menu">
      <label className="block font-medium" htmlFor="menu-search">Search dishes</label>
      <input
        className="mt-2 w-full max-w-md rounded border border-stone-300 bg-white px-3 py-2"
        id="menu-search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Try Doro Wat or vegetarian"
        type="search"
        value={search}
      />
      {error && <p className="mt-3 text-red-800" role="status">Could not refresh results. Showing the last results.</p>}
      {isLoading && !result && <p className="mt-3">Loading dishes…</p>}

      {result.dishes.length > 0 ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite" aria-busy={isLoading}>
          {result.dishes.map((dish, index) => (
            <DishCard dish={dish} key={dish.id} priority={index === 0} />
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-stone-600" aria-live="polite">No dishes matched your search.</p>
      )}

      <nav className="mt-6 flex items-center gap-4" aria-label="Menu pages">
        <button
          className="rounded border border-amber-800 px-3 py-2 disabled:opacity-40"
          disabled={result.page <= 1}
          onClick={() => goToPage(result.page - 1)}
          type="button"
        >
          Previous
        </button>
        <span>Page {result.page} of {result.totalPages}</span>
        <button
          className="rounded border border-amber-800 px-3 py-2 disabled:opacity-40"
          disabled={result.page >= result.totalPages}
          onClick={() => goToPage(result.page + 1)}
          type="button"
        >
          Next
        </button>
      </nav>
    </section>
  );
}
