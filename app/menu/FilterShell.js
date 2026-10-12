"use client";

import { useState } from "react";

const filters = [
  { id: "all", label: "All dishes" },
  { id: "stew", label: "Stews" },
  { id: "meat", label: "Meat" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "side", label: "Sides" },
];

export default function FilterShell({ children }) {
  const [activeFilter, setActiveFilter] = useState("all");
  return (
    <section className="filter-shell" data-filter={activeFilter}>
      <fieldset>
        <legend>Filter dishes</legend>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </fieldset>
      {children}
    </section>
  );
}
