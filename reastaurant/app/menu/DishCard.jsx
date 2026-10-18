import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish, priority = false }) {
  return (
    <li className="rounded-lg border border-gray-200 p-5" key={dish.id}>
      {dish.image && (
        <Image
          alt={dish.imageAlt}
          className="mb-4 aspect-[4/3] w-full rounded-md object-cover"
          height={600}
          preload={priority}
          sizes="(max-width: 639px) calc(100vw - 6.5rem), (max-width: 1023px) calc((100vw - 6.5rem) / 2), 440px"
          src={dish.image}
          width={800}
        />
      )}
      <h2 className="text-xl font-semibold">
        <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
      </h2>
      <p className="mt-2 text-gray-600">{dish.description}</p>
      <p className="mt-3 font-medium">{dish.currency} {dish.price.toFixed(2)}</p>
      <AddToCartButton dishId={dish.id} />
    </li>
  );
}