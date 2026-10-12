import CategoryBar from "./CategoryBar";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <p>Addis Eats</p>
        <h2>Explore the menu</h2>
        <CategoryBar />
      </aside>
      <section className="menu-content">{children}</section>
    </div>
  );
}
