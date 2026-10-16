export const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    description: "Ethiopian chicken stew simmered with berbere and served with injera.",
    price: 18,
    category: "Main",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    description: "A traditional Ethiopian minced beef dish seasoned with mitmita and niter kibbeh.",
    price: 20,
    category: "Main",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}