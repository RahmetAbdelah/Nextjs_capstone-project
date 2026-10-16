import { dishes } from "@/lib/dishes";
import DishList from "./DishList";

export default function MenuPage() {
	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-12">
			<h1 className="text-3xl font-bold">Our menu</h1>
			<DishList dishes={dishes} />
		</main>
	);
}