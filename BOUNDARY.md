# Server and client component boundaries

In the App Router, components are Server Components by default. Add `"use client"` only when a component needs browser interaction or React client state.

| Component | Runs where | Why |
| --- | --- | --- |
| `app/layout.js` | Server | Owns `<html>` and `<body>`, metadata, shared header/footer, and imports global CSS. It places the cart provider around route content. |
| `app/Providers.js` | Client | Owns cart state and makes it available to interactive descendants. Its `children` can still be server-rendered components. |
| `app/page.js` | Server | Static home content and links need no browser state. |
| `app/menu/layout.js` | Server | The persistent menu sidebar and its category links do not need local state. Shared layouts persist while navigating within `/menu`. |
| `app/menu/CategoryBar.js` | Server | This component only renders links; it has no interactive state or event handlers. |
| `app/menu/page.js` and `MenuDishes` | Server | The async route starts loading menu data and its child awaits it inside Suspense. No browser hooks or client-side fetch state. |
| `app/menu/DishList.js` | Server | Maps the supplied dish data into markup and links; it has no browser-only behavior. |
| `app/menu/FilterShell.js` | Client | Holds the selected filter in local state and renders the server-provided list through `children`. CSS uses the selected filter to hide other categories. |
| `app/menu/[id]/page.js` | Server | Looks up the requested dish and renders static details. Only the add button needs client behavior. |
| `app/menu/AddToCartButton.js` | Client | Handles a click and calls the cart context hook. |
| `app/cart/page.js` | Server | Provides the static cart route shell and navigation. |
| `app/cart/CartContents.js` | Client | Reads and updates cart state in the browser. |
| `app/checkout/page.js` | Server, dynamically rendered | Reads the request's customer-name cookie with `cookies()` to prefill the visitor's form. |
| `app/not-found.js` | Server | Renders a static not-found message and links. |

## Bundle comparison

The production HTML's referenced JavaScript files total 576,276 raw bytes before the menu boundary cleanup and 576,072 raw bytes after it, a reduction of 204 bytes (about 0.04%). This is a raw-size estimate, not compressed transfer size. The small change is expected: shared Next.js runtime chunks dominate the initial load, and the app-level cart provider remains available on every route. The menu data and dish list are still server-rendered; the client filter wrapper gets only `children`.
