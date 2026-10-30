export function getSiteUrl(path = "/") {
  const siteAddress = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new URL(path, siteAddress);
}
