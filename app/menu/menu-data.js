export const menuItems = [
  { slug: "kitfo", category: "meat", name: "Kitfo", price: 19, description: "Lean beef with mitmita and a warm injera base." },
  { slug: "doro-wat", category: "stew", name: "Doro Wat", price: 22, description: "Traditional chicken stew with berbere, onions, and potatoes." },
  { slug: "vegetable-combo", category: "vegetarian", name: "Vegetable Combo", price: 18, description: "A hearty mix of lentils, greens, and fresh vegetables." },
  { slug: "fresh-injera", category: "side", name: "Fresh Injera", price: 7, description: "Soft, tangy sourdough flatbread baked fresh each day." },
];

export async function getMenuItems() {
  return menuItems;
}
