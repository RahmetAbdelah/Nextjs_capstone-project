import { getPagedDishes } from "@/lib/dishes";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";

export default async function MenuPage({ searchParams }) {
	const params = await searchParams;
	const search = typeof params.q === "string" ? params.q.trim() : "";
	const result = getPagedDishes({ search, page: params.page, pageSize: 2 });

	return (
		<main className="page-shell">
			<h1 className="page-heading">Our menu</h1>
			<CategoryBar />
			<SearchBox initialResult={result} initialSearch={search} page={result.page} />
		</main>
	);
}