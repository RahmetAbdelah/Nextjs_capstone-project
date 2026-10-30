# Project structure

The app is organized by feature. Route folders live in `app`; shared server and data helpers live in `lib`.

```text
reastaurant/
├── app/
│   ├── actions/          # Sign-in, order, and cancellation actions
│   ├── api/              # JSON and event-stream endpoints
│   ├── cart/             # Cart page, UI, state, and actions
│   ├── checkout/         # Checkout form and field components
│   ├── dashboard/        # Staff summary and chart components
│   ├── menu/             # Dish search, list, and detail routes
│   ├── orders/           # Order list, sorting, and pagination
│   ├── signin/           # Sign-in page and form
│   ├── signup/           # Customer account creation
│   ├── auth/             # Shared sign-in and sign-up components
│   ├── styles/           # Shared design tokens and page styles
│   ├── track/            # Delivery tracking page
│   ├── CartProvider.jsx  # Shares cart state with the app
│   ├── SiteHeader.jsx    # Shared navigation
│   └── layout.js         # Shared page frame and metadata
├── lib/                  # Shared data, validation, sessions, and order helpers
├── public/               # Images, fonts, and static files
├── tests/                # Automated tests
├── app/sitemap.js        # SEO sitemap route
├── app/robots.js         # Crawler rules
└── *.md                  # Setup, API, route, and performance guides
```

Feature-specific folders keep related UI and logic together. Helpers live next to the feature that uses them; shared helpers stay in `lib`.
