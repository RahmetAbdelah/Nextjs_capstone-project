# Production build notes

Run `npm run build` from the `reastaurant` folder to check the production build. Next.js labels routes as:

- `○` static content
- `●` static content generated from route data
- `ƒ` server-rendered when requested

Known dish details are prebuilt. The menu reads query parameters at request time, and an order-status page needs an order ID from its request.

The latest successful build included these routes:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ƒ /api/orders/[id]/stream
├ ○ /cart
├ ƒ /checkout
├ ƒ /dashboard
├ ƒ /kitchen
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/doro-wot
│ ├ ● /menu/beyaynetu
│ ├ ● /menu/kitfo
│ └ ● /menu/shiro-tegabeno
├ ƒ /orders
├ ƒ /orders/[id]
├ ƒ /signin
└ ƒ /track/[id]
```
