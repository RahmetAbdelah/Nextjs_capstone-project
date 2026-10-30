import { getDishById } from "@/lib/dishes";

export async function GET(_request, { params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return Response.json(
      { error: { code: "NOT_FOUND", message: "Dish not found." } },
      { status: 404 },
    );
  }

  return Response.json({ dish });
}