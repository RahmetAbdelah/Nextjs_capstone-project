
# Addis Eats route plan

A route is a URL. Its rendering strategy describes when and where Next.js makes the page or response. See [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) for the folder map.

| URL | Purpose | Rendering |
| --- | --- | --- |
| `/` | Home page | Static |
| `/menu` | Search and page through dishes | Dynamic server page with client search |
| `/menu/[id]` | Show a dish | Prebuilt page for known dishes |
| `/cart` | Edit cart items | Static page with a client component |
| `/checkout` | Place an order | Static form with a server action |
| `/signin` | Sign in | Dynamic server page |
| `/signup` | Create a customer account | Dynamic server page |
| `/orders` | List a user's orders | Dynamic server page |
| `/orders/[id]` | Show an order's status | Dynamic server page with client polling |
| `/track/[id]` | Track a delivery | Dynamic server page with live updates |
| `/kitchen` | Show the staff order queue | Dynamic server page |
| `/dashboard` | Show staff reports | Dynamic server page |
| `/api/dishes` | Search and page through dishes | Dynamic route handler |
| `/api/dishes/[id]` | Return one dish | Dynamic route handler |
| `/api/orders` | Validate and create an order | Dynamic route handler |
| `/api/orders/[id]` | Return safe order status | Dynamic route handler |
| `/api/orders/[id]/stream` | Stream delivery updates | Dynamic route handler |
| `/_not-found` | Handle unknown pages | Static special page |

## Build checks

1. Check the shared layout and routes with `npm run build`.
2. Check menu, detail, loading, error, and not-found pages.
3. Check cart and checkout behavior.
4. Check validation, API routes, and protected actions.
5. Run `npm test` and build once more before release.

Run each command from the `reastaurant` folder and fix errors before continuing.

## Current limits

- Orders are stored in memory and disappear when the server restarts.
- A database is needed before deploying for real orders.
