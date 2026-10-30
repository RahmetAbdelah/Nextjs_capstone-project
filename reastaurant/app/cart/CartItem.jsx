"use client";

export default function CartItem({ dish, quantity, onQuantityChange, onRemove }) {
  return (
    <li className="cart-item">
      <div>
        <h2 className="font-semibold">{dish.name}</h2>
        <p className="mt-1 text-sm text-stone-600">{dish.currency} {dish.price.toFixed(2)} each</p>
      </div>
      <label className="flex items-center gap-2">
        <span className="text-sm font-medium">Quantity</span>
        <input
          aria-label={`${dish.name} quantity`}
          className="w-20 rounded border border-stone-300 px-2 py-1"
          max={99}
          min={0}
          onChange={(event) => onQuantityChange(Number(event.target.value))}
          type="number"
          value={quantity}
        />
      </label>
      <button
        className="cart-remove-button"
        onClick={onRemove}
        type="button"
      >
        Remove
      </button>
    </li>
  );
}
