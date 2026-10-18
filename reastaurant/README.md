# Addis Eats

A small Ethiopian restaurant app built with Next.js. Browse dishes, add them to a cart, and place an order.

## Run it

In a terminal opened in the `reastaurant` folder:

1. Run `npm install` once.
2. Copy `.env.example` to `.env.local` and replace the sample credentials and session secret.
3. Run `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

For a production check, run `npm run build`, then `npm run start`.

## Pages

- `/` — home
- `/menu` — search, browse and page through dishes
- `/menu/doro-wot`, `/menu/beyaynetu`, `/menu/kitfo`, `/menu/shiro-tegabeno` — dish details
- `/cart` — change or remove cart items
- `/checkout` — place an order
- `/orders/<order-id>` — follow order status; it refreshes every five seconds
- `/orders` — view orders owned by the signed-in account
- `/signin` — sign in and return to an allowed internal destination
- `/kitchen` — staff-only order queue

Authentication is configured with `SESSION_SECRET`, `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD`, `STAFF_EMAIL`, and `STAFF_PASSWORD`; optional stable IDs are `CUSTOMER_USER_ID` and `STAFF_USER_ID`. See [AUTH.md](AUTH.md) for setup and the security layers used by protected routes. The session cookie is `secure`, so browser sign-in requires HTTPS.

## API

| Request                                          | Success                     | Error                                |
| ------------------------------------------------ | --------------------------- | ------------------------------------ |
| `GET /api/dishes`                                | `200`, first page of dishes | —                                    |
| `GET /api/dishes?search=kitfo&page=1&pageSize=2` | `200`, matching page        | —                                    |
| `GET /api/dishes/<id>`                           | `200`, one dish             | `404` if missing                     |
| `POST /api/orders`                               | `201`, new order            | `400` bad JSON; `422` invalid fields |
| `GET /api/orders/<id>`                           | `200`, safe status          | `404` if missing                     |

Example curl checks:

```bash
curl -i 'http://localhost:3000/api/dishes?search=kitfo&page=1&pageSize=2'
curl -i http://localhost:3000/api/orders/not-a-real-order
curl -i -X POST http://localhost:3000/api/orders -H 'content-type: application/json' --data '{"customerName":"Aster Example","email":"aster@example.com","deliveryAddress":"12 Example Street","orderDetails":"Doro Wat x 1"}'
```

## Data notes

- `lib/fetcher.js` is the shared JSON fetcher.
- `lib/dishes.js` contains the public menu and paging helper.
- `lib/order-store.js` stores demo orders in memory; restarting the server clears them.
- `DATA.md` explains every SWR query key and refresh time.
- `STRATEGY.md` explains every URL and its rendering strategy.
- `BOUNDARY.md` explains which parts run in the browser and on the server.

The order-status endpoint returns only the order ID, status, and creation time, and only to the owning signed-in account. Orders are in memory, so use a database before real deployment. Run `npm test` for auth redirect safety tests.

## Performance notes

Dish art is served as local WebP through `next/image`, with responsive `sizes` and only the first menu card preloaded. Geist is self-hosted. See [PERF.md](PERF.md) for the production measurement method, results, and Lighthouse runner limitations.

## Production build output

`npm run build` succeeded and reported:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ○ /cart
├ ○ /checkout
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/doro-wot
│ ├ ● /menu/beyaynetu
│ ├ ● /menu/kitfo
│ └ ● /menu/shiro-tegabeno
└ ƒ /orders/[id]

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

The output matches `STRATEGY.md`: known dish details are prebuilt; the menu page reads query parameters; the order-status page needs an order ID at request time.
