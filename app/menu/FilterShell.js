"use client";

import { Children, cloneElement, isValidElement, useState } from "react";

const filters = [
  { id: "all", label: "All dishes" },
  { id: "stew", label: "Stews" },
  { id: "meat", label: "Meat" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "side", label: "Sides" },
];

export default function FilterShell({ children }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredChildren = Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== "ul") {
      return child;
    }

    return cloneElement(child, {
      children: Children.map(child.props.children, (dish) => {
        if (!isValidElement(dish) || dish.type !== "li") {
          return dish;
        }

        return cloneElement(dish, {
          hidden:
            activeFilter !== "all" &&
            dish.props["data-category"] !== activeFilter,
        });
      }),
    });
  });

  return (
    <section>
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
      {filteredChildren}
    </section>
  );
}
