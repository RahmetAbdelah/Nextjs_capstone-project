import FilterShell from "./FilterShell";
import DishList from "./DishList";
import { getMenuItems } from "./menu-data";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await getMenuItems();

  return (
    <main>
      <h1>Our menu</h1>
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
