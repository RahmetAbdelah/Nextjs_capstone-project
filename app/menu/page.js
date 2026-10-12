import FilterShell from "./FilterShell";
import DishList from "./DishList";
import { getMenuItems } from "./menu-data";
import { Suspense } from "react";

export const revalidate = 3600;

async function MenuDishes({ dishesPromise }) {
  const dishes = await dishesPromise;

  return (
    <FilterShell>
      <DishList dishes={dishes} />
    </FilterShell>
  );
}

export default async function MenuPage() {
  // Await inside the Suspense boundary so the shared menu sidebar can stream first.
  const dishesPromise = getMenuItems();

  return (
    <main className="menu-page">
      <h1>Our menu</h1>
      <Suspense fallback={<p role="status">Loading menu dishes…</p>}>
        <MenuDishes dishesPromise={dishesPromise} />
      </Suspense>
    </main>
  );
}
