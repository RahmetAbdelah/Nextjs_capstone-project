import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul>
      {dishes.map((item) => (
        <li key={item.slug} data-category={item.category}>
          <Link href={`/menu/${item.slug}`}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
