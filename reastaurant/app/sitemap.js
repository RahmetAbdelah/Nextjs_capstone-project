import { dishes } from "@/lib/dishes";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap() {
  const publicPages = [
    "/",
    "/menu",
    "/cart",
    "/signin",
    "/signup",
    ...dishes.map((dish) => `/menu/${dish.id}`),
  ];

  return publicPages.map((path) => ({
    url: getSiteUrl(path).toString(),
  }));
}
