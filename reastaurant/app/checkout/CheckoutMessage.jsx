export default function CheckoutMessage({ state }) {
  if (!state.message) return null;

  const messageClass = state.status === "success" ? "text-green-800" : "text-red-700";
  const orderReference = state.orderId ? ` Order reference: ${state.orderId}` : "";

  return (
    <p aria-live="polite" className={messageClass}>
      {state.message}{orderReference}
    </p>
  );
}
