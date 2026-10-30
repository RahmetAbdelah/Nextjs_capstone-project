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
        <main className="page-shell">
            <section className="detail-layout">
                <Image
                    alt={dish.imageAlt}
                    className="detail-image"
                    height={600}
                    sizes="(max-width: 767px) 90vw, 45vw"
                    src={dish.image}
                    width={800}
                />
                <div>
                    <h1 className="page-heading">{dish.name}</h1>
                    <p className="page-description">{dish.description}</p>
                    <p className="detail-price">{dish.currency} {dish.price.toFixed(2)}</p>
                    <AddToCartButton dishId={dish.id} />
                    <Link className="detail-back-link" href="/menu">Back to all dishes</Link>
                </div>
            </section>
        </main>
    );
}