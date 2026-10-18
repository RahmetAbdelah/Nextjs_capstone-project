export const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
  },
  {
    id: "shiro-tegabeno",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Main",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export function getPagedDishes({ search = "", page = 1, pageSize = 2 } = {}) {
  const cleanSearch = search.trim().toLowerCase();
  const matchingDishes = cleanSearch
    ? dishes.filter((dish) =>
        `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(cleanSearch),
      )
    : dishes;
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