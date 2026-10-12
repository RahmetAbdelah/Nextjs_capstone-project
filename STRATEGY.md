# Rendering strategy

A route strategy is simply where its HTML is made: before a request (static), on a request (dynamic), or when its data is refreshed (revalidated).

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The home page is the same for every visitor. |
| `/cart` | Static page shell; interactive cart contents run in the browser | The route does not read request-only data. Cart state belongs to the client provider. |
| `/checkout` | Dynamic (`force-dynamic`) | `cookies()` reads the visitor-specific `customer-name` value to prefill checkout. |
| `/menu` | Static with revalidation every 3,600 seconds (one hour) | The menu is shared; Next.js can build it once and refresh it later. The dish list is behind Suspense so the menu shell can appear first if its data is still loading. |
| `/menu/[id]` | Static generation (SSG) with one-hour revalidation | `generateStaticParams()` returns the four known dish slugs, so the build creates four detail pages. |
| Unknown routes | Static not-found page | A shared, simple 404 page is sufficient. |

## Build evidence

`npm run build` completed successfully. Its route table marked `/menu` as static (`○`) with `1h` revalidation, `/menu/[id]` as SSG (`●`), and `/checkout` as dynamic (`ƒ`). The build generated 10 static pages overall. The four dish pages are `/menu/kitfo`, `/menu/doro-wat`, `/menu/vegetable-combo`, and `/menu/fresh-injera`.

The root layout owns the document `<html>` and `<body>` elements. The menu layout is nested inside it and keeps its category sidebar while navigating between menu pages.

## Menu JavaScript size comparison

Next.js 16.3.8 with Turbopack did not print a per-route First Load JS number, so this comparison sums the raw byte sizes of the JavaScript files referenced by the prerendered `/menu` HTML. It is a repeatable, intentionally simple estimate and is not the compressed network-transfer size.

| Build | `/menu` JavaScript (raw) |
| --- | ---: |
| Before boundary cleanup | 576,276 bytes (about 563 KiB) |
| After boundary cleanup | 576,072 bytes (about 563 KiB) |
| Difference | 204 bytes smaller |

The decrease is small because Next.js framework/runtime chunks are shared and make up most of this page's initial JavaScript. The menu's interactive filter is now a smaller client component that receives the server-rendered dish list as `children`; the dish data and list rendering remain on the server. The app still has a cart provider in the root layout, so this change does not remove shared framework or provider code from `/menu`.
