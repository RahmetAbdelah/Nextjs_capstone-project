import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish, priority = false }) {
  return (
    <li className="dish-card" key={dish.id}>
      {dish.image && (
        <Image
          alt={dish.imageAlt}
          className="dish-card-image"
          height={600}
          preload={priority}
          sizes="(max-width: 639px) calc(100vw - 6.5rem), (max-width: 1023px) calc((100vw - 6.5rem) / 2), 440px"
          src={dish.image}
          width={800}
        />
      )}
      <h2 className="dish-card-title">
        <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
      </h2>
      <p className="dish-card-description">{dish.description}</p>
      <p className="dish-card-price">{dish.currency} {dish.price.toFixed(2)}</p>
      <AddToCartButton dishId={dish.id} />
    </li>
  );
}