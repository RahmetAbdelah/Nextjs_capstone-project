import FieldError from "./FieldError";

export default function OrderDetailsField({ value, errors, onChange }) {
  return (
    <div>
      <label className="block font-medium" htmlFor="orderDetails">Order details</label>
      <textarea
        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        id="orderDetails"
        name="orderDetails"
        placeholder="For example: Doro Wot × 2, Kitfo × 1"
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        value={value}
        required
        aria-invalid={Boolean(errors?.length)}
        aria-describedby="orderDetails-error"
      />
      <div id="orderDetails-error"><FieldError errors={errors} /></div>
    </div>
  );
}
