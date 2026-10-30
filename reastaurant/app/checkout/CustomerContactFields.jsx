import FieldError from "./FieldError";

export default function CustomerContactFields({ fieldErrors }) {
  return (
    <>
      <div>
        <label className="block font-medium" htmlFor="customerName">Name</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="customerName"
          name="customerName"
          autoComplete="name"
          required
          aria-invalid={Boolean(fieldErrors.customerName?.length)}
          aria-describedby="customerName-error"
        />
        <div id="customerName-error"><FieldError errors={fieldErrors.customerName} /></div>
      </div>
      <div>
        <label className="block font-medium" htmlFor="email">Email</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(fieldErrors.email?.length)}
          aria-describedby="email-error"
        />
        <div id="email-error"><FieldError errors={fieldErrors.email} /></div>
      </div>
      <div>
        <label className="block font-medium" htmlFor="phone">Phone number</label>
        <input
          autoComplete="tel"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          id="phone"
          name="phone"
          type="tel"
          required
          aria-invalid={Boolean(fieldErrors.phone?.length)}
          aria-describedby="phone-error"
        />
        <div id="phone-error"><FieldError errors={fieldErrors.phone} /></div>
      </div>
    </>
  );
}
