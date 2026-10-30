# Authentication and authorization

## Configure demo accounts

Set these values in the deployment environment or a local `.env.local` file. Do not commit secrets. Use a long, random `SESSION_SECRET` in production.

| Variable                               | Purpose                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| `SESSION_SECRET`                       | HMAC-SHA256 key used to sign and verify session cookies |
| `CUSTOMER_EMAIL` / `CUSTOMER_PASSWORD` | Demo customer credentials                               |
| `CUSTOMER_USER_ID`                     | Stable customer account ID; defaults to `demo-customer` |
| `STAFF_EMAIL` / `STAFF_PASSWORD`       | Demo staff credentials                                  |
| `STAFF_USER_ID`                        | Stable staff account ID; defaults to `demo-staff`       |

The sign-in action checks configured credentials and registered accounts on the server. New customers can create an account at `/signup`; passwords are stored as salted scrypt hashes, never as plain text. Account records are saved in `.data/accounts.json`, which is ignored by Git. Mount `.data` on persistent storage when deploying.

New accounts always receive the customer role. Submitted forms cannot choose an account role or user ID. A successful sign-in sets an eight-hour HMAC-signed cookie with `httpOnly`, `secure`, `sameSite: "strict"`, and `path: "/"`. Sign-out expires that cookie. Because the cookie is secure, use HTTPS for local end-to-end browser testing or serve the app behind a local HTTPS proxy.

## Route protections

| Route / operation   | Protection layers                                                                                                                                       | What each layer proves                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/checkout`         | `middleware.js` cookie-presence redirect; `app/checkout/page.js` `getSession()` verification; `app/actions.js` `placeOrder()` session check             | Middleware provides a fast navigation redirect only. The page and action independently reject missing or invalid signed sessions before checkout/order creation.                               |
| `/orders`           | Middleware redirect; `app/orders/page.js` verifies `getSession()` and calls `getOrdersByOwner(session.userId)`                                          | Middleware is not authentication. The server page verifies the HMAC and returns only orders whose stored owner ID equals the verified session ID.                                              |
| `/orders/[id]`      | Middleware redirect; `app/orders/[id]/page.js` session and ownership check; `/api/orders/[id]` independently checks session and ownership on every poll | A guessed order ID does not grant access. The page renders not-found for missing/foreign orders, and the polling endpoint returns the same 404 behavior.                                       |
| `POST /api/orders`  | Handler calls `getSession()` before accepting a write; `createOrder()` requires a non-empty owner ID                                                    | Direct API requests cannot create anonymous orders, and the owner ID always comes from the verified session, not the request body.                                                             |
| Cancel order action | `app/actions.js` verifies the session and checks the stored owner; `cancelOrderRecord(id, ownerId)` checks owner again at write time                    | The action rejects cross-account cancellation, while the data-store mutation itself refuses a mismatched owner.                                                                                |
| `/kitchen`          | `app/kitchen/page.js` verifies the signed session, then checks `session.role === "staff"` before loading or rendering orders                            | Hiding UI is not the authorization boundary; the role check happens server-side before staff order data is read.                                                                               |
| `/signin`           | Server page validates `next` with `safeNextPath`; sign-in action independently validates it before setting a session                                    | External, protocol-relative, backslash, malformed, and control-character destinations are rejected. A crafted link such as `/signin?next=https%3A%2F%2Fevil.example` cannot redirect off-site. |
| `/signup`           | Registration validates the return path and all fields; the server assigns a customer role and rejects duplicate email addresses                         | Users cannot select a staff role or set their own account ID.                                                                                                                                    |

`middleware.js` uses the narrow matcher `[/checkout/:path*, /orders/:path*]`. Its cookie-presence check is deliberately not trusted as a complete auth check: only `getSession()` verifies the signature, role, and expiry. The middleware does not include `/kitchen`; that route uses server-side `getSession()` and role validation directly.

## Session and demo limits

`lib/session.js` is the shared server-only session helper used by pages, Server Actions, and Route Handlers. Session tokens contain a user ID, role, and expiry, and are authenticated with HMAC-SHA256 using `SESSION_SECRET`. Local JSON storage suits this demo only; use a database and add account recovery, email verification, rate limiting, and audit logging before production use.

## Return destination regression case

The auth tests include the crafted external redirect link above, protocol-relative, backslash, and control-character values, plus a cross-account order-enumeration check. Run them with `npm test` from this project directory.
