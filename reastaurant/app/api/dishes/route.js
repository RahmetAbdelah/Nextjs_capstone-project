import { getPagedDishes } from "@/lib/dishes";

const PAGE_SIZE =3;

export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const result = getPagedDishes({
    search: searchParams.get("search") ?? "",
    page: searchParams.get("page") ?? 1,
    pageSize: PAGE_SIZE,
  });

  return Response.json(result);
}