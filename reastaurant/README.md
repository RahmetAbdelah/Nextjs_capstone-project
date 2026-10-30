# Addis Eats

A small Ethiopian restaurant app built with Next.js. Browse dishes, add them to a cart, and place an order.

## Run from a fresh clone

From the `reastaurant` folder:

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace the sample values.
3. Run `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

For a production check, run `npm run build`, then `npm run start` in a separate terminal.

## Environment variables

Set these variables in Vercel under **Settings → Environment Variables** for each
environment you use. Keep Preview and Production values separate, and redeploy after
changing them. Never use the sample credentials or commit `.env.local`.

| Variable | Local | Vercel Preview and Production |
| --- | --- | --- |
| `SESSION_SECRET` | A randomly generated secret | A different, long random secret for each environment |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | The HTTPS origin used for that environment |
| `CUSTOMER_EMAIL` / `CUSTOMER_PASSWORD` | Optional demo customer login | Optional demo credentials; use environment-specific values |
| `CUSTOMER_USER_ID` | Optional; defaults to `demo-customer` | Optional stable customer ID for the configured demo account |
| `STAFF_EMAIL` / `STAFF_PASSWORD` | Optional demo staff login | Optional demo credentials; use environment-specific values |
| `STAFF_USER_ID` | Optional; defaults to `demo-staff` | Optional stable staff ID for the configured demo account |

`NEXT_PUBLIC_SITE_URL` is used when generating metadata, sitemap, and crawler URLs. Set
it to the matching origin before building each deployment.

## Deployment status

**Live URL:** Not deployed from this workspace yet. Add the production URL here after the
Vercel project is connected, its environment variables are set, and post-deployment checks
pass.

Before using this as a real ordering service, connect persistent storage: orders currently
live in process memory, and registered accounts are written to local JSON storage. Those
stores are not durable across Vercel serverless instances or deployments.

## Pages

- `/` — home
- `/menu` — search, browse, and page through dishes
- `/menu/<dish-id>` — dish details
- `/cart` — change or remove cart items
- `/checkout` — place an order
- `/orders/<order-id>` — view orders owned by the signed-in account
- `/track/<order-id>` — follow delivery status
- `/signin` — sign in and return to an allowed internal destination
- `/signup` — create a customer account
- `/kitchen` — staff-only order queue

Authentication uses `SESSION_SECRET`, `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD`, `STAFF_EMAIL`, and `STAFF_PASSWORD`. Optional stable IDs are `CUSTOMER_USER_ID` and `STAFF_USER_ID`. See [AUTH.md](AUTH.md) for setup and protected-route details. The session cookie is secure, so browser sign-in requires HTTPS.

## Data and tests

- `lib/fetcher.js` is the shared JSON fetcher.
- `lib/dishes.js` provides menu data and paging.
- `lib/order-store.js` stores demo orders in memory; restarting the server clears them.
- `DATA.md` explains SWR query keys; `BOUNDARY.md` explains browser and server code.
- Run `npm test` for the automated tests.

Order-status responses include only the order ID, status, and creation time, and only for the owning signed-in account. Use a database before deploying real orders.

## Guides

- [API.md](API.md) — API routes and example requests
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — folder map
- [STRATEGY.md](STRATEGY.md) — routes and rendering choices
- [BUILD-OUTPUT.md](BUILD-OUTPUT.md) — documented production build output
- [PERF.md](PERF.md) — performance notes

The sitemap and crawler rules are available at `/sitemap.xml` and `/robots.txt`. Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin before publishing so sitemap links use the production domain.
