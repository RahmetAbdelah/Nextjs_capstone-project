import DishCard from "./DishCard";

export default function DishList({ dishes }) {
	return (
		<ul className="mt-6 grid gap-4 sm:grid-cols-2">
			{dishes.map((dish, index) => (
				<DishCard dish={dish} key={dish.id} priority={index === 0} />
			))}
		</ul>
	);
}
