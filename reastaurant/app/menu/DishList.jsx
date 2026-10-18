import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishList({ dishes }) {
	return (
		<ul className="mt-6 grid gap-4 sm:grid-cols-2">
			{dishes.map((dish) => (
				<li className="rounded-lg border border-gray-200 p-5" key={dish.id}>
					<h2 className="text-xl font-semibold">
						<Link href={`/menu/${dish.id}`}>{dish.name}</Link>
					</h2>
					<p className="mt-2 text-gray-600">{dish.description}</p>
					<p className="mt-3 font-medium">{dish.currency} {dish.price.toFixed(2)}</p>
					  <AddToCartButton dishId={dish.id} />
				</li>
			))}
		</ul>
	);
}
