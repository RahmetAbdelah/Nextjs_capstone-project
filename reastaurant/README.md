This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Orders API and server actions

- `GET /api/dishes` lists menu dishes; `GET /api/dishes/:id` returns one dish or a `404` error.
- `POST /api/orders` validates with the shared Zod schema and returns `422` with top-level `fieldErrors` for invalid input.
- Checkout submits through a server action. Cancellation requires a verified `restaurant_session` cookie and checks the order owner on the server.

For authenticated cancellation, set `SESSION_SECRET` on the server and have the authentication provider issue an HttpOnly `restaurant_session` cookie. Its value is a base64url-encoded JSON payload (`userId` and `expiresAt`, in milliseconds) followed by a dot and a base64url HMAC-SHA256 signature of that encoded payload. Never create this cookie from untrusted client input. Orders are currently held in a process-local in-memory store; connect a durable database before deploying or running multiple app instances.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
