import DishCard from "./DishCard";

export default function SearchResults({ result, isLoading, onPageChange }) {
  return (
    <>
      {result.dishes.length > 0 ? (
        <ul className="menu-results" aria-live="polite" aria-busy={isLoading}>
          {result.dishes.map((dish, index) => (
            <DishCard dish={dish} key={dish.id} priority={index === 0} />
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-stone-600" aria-live="polite">No dishes matched your search.</p>
      )}
      <nav className="menu-pagination" aria-label="Menu pages">
        <button
          className="menu-page-button"
          disabled={result.page <= 1}
          onClick={() => onPageChange(result.page - 1)}
          type="button"
        >
          Previous
        </button>
        <span>Page {result.page} of {result.totalPages}</span>
        <button
          className="menu-page-button"
          disabled={result.page >= result.totalPages}
          onClick={() => onPageChange(result.page + 1)}
          type="button"
        >
          Next
        </button>
      </nav>
    </>
  );
}
