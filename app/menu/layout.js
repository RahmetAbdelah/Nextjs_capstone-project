import CategoryBar from "./CategoryBar";

export default function MenuLayout({ children }) {
  return (
    <div>
      <aside>
        <p>Addis Eats</p>
        <h2>Explore the menu</h2>
        <CategoryBar />
      </aside>
      <section>{children}</section>
    </div>
  );
}
