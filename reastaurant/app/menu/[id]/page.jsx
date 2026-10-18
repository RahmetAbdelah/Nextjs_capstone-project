import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { dishes, getDishById } from "@/lib/dishes";
import AddToCartButton from "../AddToCartButton";

export const dynamicParams = false;

export function generateStaticParams() {
    return dishes.map(({ id }) => ({ id }));
}

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = getDishById(id);
    if (!dish) notFound();

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold">{dish.name}</h1>
            <Image
                alt={dish.imageAlt}
                className="mt-6 aspect-[4/3] w-full max-w-2xl rounded-lg object-cover"
                height={600}
                sizes="(max-width: 767px) calc(100vw - 3rem), 672px"
                src={dish.image}
                width={800}
            />
            <p className="mt-4 text-gray-600">{dish.description}</p>
            <p className="mt-4 font-medium">{dish.currency} {dish.price.toFixed(2)}</p>
            <AddToCartButton dishId={dish.id} />
            <Link className="mt-6 inline-block font-medium underline" href="/menu">
                Back to all dishes
            </Link>
        </main>
    );
}