"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import SearchResults from "./SearchResults";

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
    <section className="mt-8" aria-label="Search menu">
      <label className="section-eyebrow" htmlFor="menu-search">Find your favourite</label>
      <input
        className="menu-search-input block"
        id="menu-search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Try Doro Wat or vegetarian"
        type="search"
        value={search}
      />
      {error && <p className="mt-3 text-red-800" role="status">Could not refresh results. Showing the last results.</p>}
      {isLoading && !result && <p className="mt-3">Loading dishes…</p>}
      <SearchResults result={result} isLoading={isLoading} onPageChange={goToPage} />
    </section>
  );
}
