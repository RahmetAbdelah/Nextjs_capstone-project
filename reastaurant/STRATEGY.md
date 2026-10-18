# Addis Eats route plan

This file is the simple map for the Addis Eats Next.js app. A **route** is a URL. A **rendering strategy** says when and where Next.js makes that page or response.

## Folder tree

```text
reastaurant/
├── app/
│   ├── actions.js                 # Server actions: place and cancel orders
│   ├── CartProvider.jsx           # Browser cart state, saved in local storage
│   ├── api/
│   │   ├── dishes/route.js        # GET /api/dishes
│   │   ├── dishes/[id]/route.js   # GET /api/dishes/:id
│   │   └── orders/
│   │       ├── [id]/route.js      # GET /api/orders/:id
│   │       └── route.js           # POST /api/orders
│   ├── cart/
│   │   ├── CartContents.jsx       # Interactive cart list
│   │   └── page.js                # /cart
│   ├── checkout/
│   │   ├── CancelOrderForm.jsx    # Owner-checked cancel action form
│   │   ├── CheckoutForm.jsx       # Interactive checkout form
│   │   └── page.js                # /checkout
│   ├── menu/
│   │   ├── [id]/page.jsx          # /menu/:id
│   │   ├── AddToCartButton.jsx    # Interactive add button
│   │   ├── CategoryBar.jsx        # Menu category navigation
│   │   ├── DishList.jsx           # Menu list component
│   │   ├── SearchBox.jsx          # Debounced search and paging
│   │   ├── error.js                # Menu error boundary
│   │   ├── loading.js              # Menu loading screen
│   │   └── page.js                # /menu
│   ├── orders/[id]/
│   │   ├── OrderStatus.jsx        # Polls status with SWR
│   │   └── page.js                # /orders/:id
│   ├── orders/[id]/
│   │   ├── OrderStatus.jsx        # Polls status with SWR
│   │   └── page.js                 # /orders/:id
│   ├── globals.css                # App-wide styles
│   ├── layout.js                  # Shared page frame
│   ├── not-found.js               # Friendly not-found page
│   └── page.js                    # /
├── lib/
│   ├── dishes.js                  # Shared dish data
│   ├── fetcher.js                 # Shared SWR fetcher
│   ├── order-store.js              # Order storage (currently memory only)
│   ├── schema.js                  # Shared order validation rules
│   └── session.js                 # Signed-session verification
├── public/                        # Static images and icons
├── BOUNDARY.md                    # Which code runs in browser or on server
├── DATA.md                        # SWR keys and refresh choices
├── README.md                      # How to run and test the app
└── STRATEGY.md                    # This route plan
```

## Route strategy

| URL                | What it does                              | Strategy                                   | Why this is a good fit                                                                                                        |
| ------------------ | ----------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Shows the home page and links             | Static page                                | The content does not need private data or a database lookup.                                                                  |
| `/menu`            | Searches and pages through dishes         | Dynamic server page with client SWR search | Page and optional search are in the URL; initial results are rendered on the server.                                          |
| `/menu/[id]`       | Shows one dish                            | Static page for each known dish ID         | `generateStaticParams()` builds known dishes ahead of time, and `dynamicParams = false` makes unknown IDs real 404 responses. |
| `/cart`            | Shows the cart and quantity controls      | Static page with a client component        | The page shell can be built early; the cart reads browser storage after it loads.                                             |
| `/checkout`        | Shows the checkout form                   | Static page plus server action             | The form shell can be rendered ahead of time; submitting the form runs trusted server code.                                   |
| `/orders/[id]`     | Shows one order's status                  | Dynamic server page plus polling client    | The server loads the first status, then the browser checks again every five seconds.                                          |
| `/api/dishes`      | Returns a searched page of dishes as JSON | Dynamic Route Handler                      | Search and page values come from the request URL.                                                                             |
| `/api/dishes/[id]` | Returns one dish or a 404                 | Dynamic Route Handler                      | The ID is only known when the request arrives.                                                                                |
| `/api/orders`      | Checks an order and creates it            | Dynamic Route Handler                      | It reads a POST body, validates it, and returns the matching HTTP status.                                                     |
| `/api/orders/[id]` | Returns safe status details for one order | Dynamic Route Handler                      | SWR calls it to refresh status without exposing customer details.                                                             |
| `/_not-found`      | Shows the not-found page                  | Static special page                        | The same helpful fallback can be reused for unknown pages.                                                                    |

## Build order (six small steps)

1. Write this route plan and `BOUNDARY.md` before changing app code.
2. Confirm the shared layout and every page URL; build.
3. Finish menu navigation, dish details, and not-found/loading/error feedback; build.
4. Finish the cart-to-checkout experience; build.
5. Verify the schema, API routes, and protected server actions; build.
6. Update the README, test the production server and failure cases, then build once more.

The six steps are checkpoints, not six separate apps. After each code step, run `npm run build` from this folder and fix any errors before continuing.

## Current limits to remember

- Orders are stored in memory. They disappear when the server restarts and are not shared across server instances.
- There is no sign-in screen/provider in this repository. Cancelling an order works only when a trusted authentication provider supplies a valid signed session cookie.
- The workspace currently contains Addis Eats only. The separate capstone source project was not provided, so it cannot be migrated or truthfully documented yet.
