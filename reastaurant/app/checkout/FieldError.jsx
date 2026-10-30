export default function FieldError({ errors }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-red-700">{errors[0]}</p>;
}
