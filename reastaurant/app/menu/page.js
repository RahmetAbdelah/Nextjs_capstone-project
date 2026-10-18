import { getPagedDishes } from "@/lib/dishes";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";

export default async function MenuPage({ searchParams }) {
	const params = await searchParams;
	const search = typeof params.q === "string" ? params.q.trim() : "";
	const result = getPagedDishes({ search, page: params.page, pageSize: 2 });

	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-12">
			<h1 className="text-3xl font-bold">Our menu</h1>
			<CategoryBar />
			<SearchBox initialResult={result} initialSearch={search} page={result.page} />
		</main>
	);
}