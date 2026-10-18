# Addis Eats browser/server map

A **server component** runs on the web server and sends finished page content to the browser. A **client component** runs in the browser and is needed for clicks, form state, or browser APIs. Keep secrets and database work on the server.

## Page and UI components

| File or component                                      | Runs where                     | Why                                                                                                       |
| ------------------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `app/layout.js` — `RootLayout`                         | Server                         | It wraps every page, sets the document shell, and does not need browser state.                            |
| `app/CartProvider.jsx` — `CartProvider`                | Client                         | It reads and updates `localStorage`, which only exists in the browser.                                    |
| `app/page.js` — `Home`                                 | Server                         | It only displays links to other routes.                                                                   |
| `app/menu/page.js` — `MenuPage`                        | Server                         | It reads the local dish list and renders the menu on the server.                                          |
| `app/menu/SearchBox.jsx` — `SearchBox`                 | Client                         | It debounces typing, uses SWR to fetch filtered pages, and keeps old results visible during a new search. |
| `app/menu/DishList.jsx` — `DishList`                   | Server                         | It only turns dish data into links and text; no click state is needed.                                    |
| `app/menu/CategoryBar.jsx` — `CategoryBar`             | Server                         | It renders ordinary links to the menu and dish detail pages.                                              |
| `app/menu/AddToCartButton.jsx` — `AddToCartButton`     | Client                         | It responds to a click and updates the browser cart context.                                              |
| `app/menu/[id]/page.jsx` — `DishPage`                  | Server                         | It reads the URL ID, finds the dish, and uses `notFound()` when it does not exist.                        |
| `app/cart/page.js` — `CartPage`                        | Server                         | It renders the page title and links; `CartContents` handles the interactive cart.                         |
| `app/cart/CartContents.jsx` — `CartContents`           | Client                         | It reads cart state, changes quantities, removes items, and calculates a display total.                   |
| `app/checkout/page.js` — `CheckoutPage`                | Server                         | It provides the page heading and loads the interactive form.                                              |
| `app/checkout/CheckoutForm.jsx` — `CheckoutForm`       | Client                         | It uses React state, browser form validation, and `useActionState` to show pending and result messages.   |
| `app/checkout/CancelOrderForm.jsx` — `CancelOrderForm` | Client calling a server action | It shows pending/result feedback; the server action still checks identity and ownership.                  |
| `app/orders/[id]/page.js` — `OrderPage`                | Server                         | It reads the order once and passes only safe status details to the browser.                               |
| `app/orders/[id]/OrderStatus.jsx` — `OrderStatus`      | Client                         | It uses SWR to refresh every five seconds without hiding the server-rendered first status.                |
| `app/not-found.js` — `NotFound`                        | Server                         | It is a shared fallback page with ordinary links.                                                         |
| `app/menu/loading.js` — `Loading`                      | Server                         | Next.js can show it while the menu route is loading.                                                      |
| `app/menu/error.js` — `Error`                          | Client                         | Next.js error boundaries must be client components so they can handle browser-side errors and recover.    |

## Request and data components

| File or function                       | Runs where               | Why                                                                                                                                 |
| -------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/dishes/route.js` — `GET`      | Server                   | A Route Handler reads the shared dish data and returns JSON.                                                                        |
| `app/api/dishes/[id]/route.js` — `GET` | Server                   | It reads the URL parameter and returns a dish or a 404 JSON response.                                                               |
| `app/api/orders/route.js` — `POST`     | Server                   | It validates untrusted JSON and creates an order; validation must not rely on the browser.                                          |
| `app/api/orders/[id]/route.js` — `GET` | Server                   | It returns only the status fields needed for polling, not contact details.                                                          |
| `app/actions.js` — `placeOrder`        | Server                   | The `use server` action validates submitted form data and writes the order on the server.                                           |
| `app/actions.js` — `cancelOrder`       | Server                   | It checks the signed session and verifies the order owner before changing the record.                                               |
| `lib/dishes.js`                        | Shared, server-safe data | It contains public menu data and has no server secrets or browser state.                                                            |
| `lib/fetcher.js` — `fetcher`           | Shared                   | It returns JSON on success and throws a readable error for SWR when a request fails.                                                |
| `lib/schema.js` — `OrderSchema`        | Shared                   | The same Zod rules are used for quick browser feedback and authoritative server validation. The server check is the security check. |
| `lib/order-store.js`                   | Server only              | It writes order records. `server-only` prevents accidentally importing it into browser code.                                        |
| `lib/session.js` — `getSession`        | Server only              | It reads cookies and uses the server-only signing secret to verify identity.                                                        |
| `app/globals.css`                      | Browser styling          | CSS is delivered to the browser to paint the page; it does not contain application secrets.                                         |

## Simple safety rules

1. Never trust a value just because the browser checked it. The API and server action validate again.
2. Never put `SESSION_SECRET`, session verification, or order-store imports in a client component.
3. A client component may call a server action, but the action must check permissions again on the server.
4. A server component can render a client component; the reverse direction is not a safe way to hide server-only logic.

## SWR additions

| File | Runs where | Why |
|---|---|---|
| `app/menu/SearchBox.jsx` | Browser (client) | It debounces typing and uses SWR for search and paging; previous results stay visible while new ones load. |
| `app/orders/[id]/page.js` | Server | It reads the first order status and passes only safe fields to the browser. |
| `app/orders/[id]/OrderStatus.jsx` | Browser (client) | It polls every five seconds and begins with server data, so there is no first-load spinner. |
| `app/api/orders/[id]/route.js` | Server | It returns only the fields needed for order-status polling. |
| `lib/fetcher.js` | Shared | It parses JSON and reports HTTP errors consistently for SWR. |
