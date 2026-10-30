import { dishes } from "./dish-data.js";

export { dishes };

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export function getPagedDishes({ search = "", page = 1, pageSize = 2 } = {}) {
  const cleanSearch = search.trim().toLowerCase();
  const matchingDishes = dishes.filter((dish) => {
    const searchableText = `${dish.name} ${dish.description} ${dish.category}`;
    return searchableText.toLowerCase().includes(cleanSearch);
  });
  const total = matchingDishes.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    dishes: matchingDishes.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}