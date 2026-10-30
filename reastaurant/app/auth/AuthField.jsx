export default function AuthField({
  id, label, type = "text", autoComplete, errors, minLength, maxLength = 128,
}) {
  const error = errors?.[0];
  const fieldClass = "auth-input mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-100";

  return (
    <div>
      <label className="text-sm font-medium text-stone-800" htmlFor={id}>{label}</label>
      <input
        className={fieldClass}
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p className="mt-1 text-sm text-red-700" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
