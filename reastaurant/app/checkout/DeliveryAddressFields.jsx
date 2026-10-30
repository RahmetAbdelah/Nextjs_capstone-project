import FieldError from "./FieldError";

export default function DeliveryAddressFields({ fieldErrors }) {
  return (
    <>
      <div>
        <label className="block font-medium" htmlFor="deliveryAddress">Delivery address</label>
        <textarea
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="deliveryAddress"
          name="deliveryAddress"
          autoComplete="street-address"
          rows={3}
          required
          aria-invalid={Boolean(fieldErrors.deliveryAddress?.length)}
          aria-describedby="deliveryAddress-error"
        />
        <div id="deliveryAddress-error"><FieldError errors={fieldErrors.deliveryAddress} /></div>
      </div>
      <div>
        <label className="block font-medium" htmlFor="neighbourhood">Neighbourhood</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="neighbourhood"
          name="neighbourhood"
          autoComplete="address-level3"
          placeholder="For example: Bole"
          required
          aria-invalid={Boolean(fieldErrors.neighbourhood?.length)}
          aria-describedby="neighbourhood-error"
        />
        <div id="neighbourhood-error"><FieldError errors={fieldErrors.neighbourhood} /></div>
      </div>
    </>
  );
}
