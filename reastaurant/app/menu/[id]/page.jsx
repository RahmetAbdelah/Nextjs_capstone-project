import { notFound } from "next/navigation";
import { getDishById } from "@/lib/dishes";

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = getDishById(id);
    if (!dish) notFound();

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold">{dish.name}</h1>
            <p className="mt-4 text-gray-600">{dish.description}</p>
            <p className="mt-4 font-medium">${dish.price.toFixed(2)}</p>
        </main>
    );
}