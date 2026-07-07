# Ecommerce example — `@morapay/sdk` + `@morapay/react`

In-house storefront demo showing how a merchant binds products to Morapay and checks out with either **widget** or **redirect**.

## What it demonstrates

1. **Product binding** — `morapay.products.create()` seeds the catalog; the grid reads `morapay.products()` with `checkoutPublicCode` per SKU.
2. **Checkout link strategy** (config orb)
   - **Catalog** (default) — `products.ensureCheckoutLink()` reuses one unlimited link per product; Buy now opens stored `publicCode` (read + open)
   - **Invoice** — `products.link({ isOneTime: true, idempotencyKey })` creates a fresh one-time link per order; retries dedupe via Core `Morapay-Idempotency-Key`
3. **Widget / redirect modes** (config orb)
   - **Widget — Preview** (default) — staging modal + `/api/public` link data + MoMo OTP preview (2 min resend cooldown)
   - **Widget — Live** — hosted checkout iframe (real MoMo OTP in checkout app)
   - **Redirect** — full-page hosted checkout

## Packages (how developers integrate)

| Concern | Package | Where in this app |
|---------|---------|-------------------|
| Merchant API (products, links, webhooks) | `@morapay/sdk` | `src/lib/morapay.ts`, API routes |
| Next.js BFF proxies (`/api/public/*`) | `@morapay/sdk` → `sdk/nextjs` | `src/app/api/public/**` |
| Checkout widget (modal UI) | `@morapay/react` | `src/lib/morapay-widget-client.ts` → storefront |

Widget checkout uses **npm imports** from `@morapay/react` (not a dynamic script loader). `pnpm dev` still copies `morapay-checkout.js` to `public/widget/` for script-tag reference / self-hosting.

## Setup

```bash
# 1. Build SDK + React widget
cd ../../sdk && pnpm install && pnpm run build
cd ../frontend/packages/react && pnpm install && pnpm run build

# 2. Configure & run
cd ../../sdk-examples/ecommerceNextjs
cp .env.example .env.local
# MORAPAY_PUBLIC_KEY, MORAPAY_SECRET_KEY, MORAPAY_BASE_URL, MORAPAY_CHECKOUT_BASE_URL
pnpm install && pnpm dev
```

Open http://localhost:3020

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the feature-driven folder layout and naming rules.

## Local full stack

```bash
cd backend && pnpm dev                    # API :4001
cd frontend/apps/checkout && pnpm dev     # Checkout :3002
cd sdk-examples/ecommerceNextjs && pnpm dev  # Store :3020
```

Refresh widget after `@morapay/react` changes:

```bash
cd frontend/packages/react && pnpm run build
cd sdk-examples/ecommerceNextjs && pnpm copyWidget   # optional — script-tag bundle
```

If dev throws stale chunk errors: `pnpm dev:clean`

## Architecture

```
Browser storefront
  Catalog Buy now (checkoutPublicCode set)
    → openPaymentLinkCheckout({ publicCode }) — no POST

  First bind / invoice
    → POST /api/products/[id]/checkout  (Next.js, holds sk_*)
      → catalog: products.ensureCheckoutLink()
      → invoice: products.link({ isOneTime: true, orderId })

  Preview widget (@morapay/react)
    → openMorapayCheckoutPreviewModal({ publicCode, apiBaseUrl: "/api/public" })
    → GET /api/public/payment-links/[code]
    → MoMo: phone → Send OTP → resend timer (preview only)

  Live widget (@morapay/react)
    → openMorapayCheckoutModal({ mode: "payment-link", checkoutBaseUrl, publicCode })

  Redirect
    → checkout.morapay.io/{publicCode} (real payments)
```

Secrets never leave the server. Store `checkoutPublicCode` on your product row (enriched from Morapay links in this demo).

Shared BFF helpers: `sdk/nextjs/server/` — see `sdk/nextjs/README.md`.

## Widget client (copy into your app)

```ts
// src/lib/morapay-widget-client.ts — see this repo for the full helper
import { openMorapayCheckoutPreviewModal, openMorapayCheckoutModal } from "@morapay/react";

openMorapayCheckoutPreviewModal({
  publicCode: "abc123",
  apiBaseUrl: "/api/public",
  businessName: "Northline Supply",
  linkTitle: "Merino crew neck",
});
```

## SDK: catalog vs invoice

```ts
// Catalog — one reusable link per SKU (recommended for shops)
const catalog = await morapay.products.ensureCheckoutLink(product.id);
// Store catalog.publicCode on your product record → Buy now = read + open

// Invoice — fresh link per order; idempotent retries
const invoice = await morapay.products.link(product.id, {
  isOneTime: true,
  customerEmail: "alex@example.com",
  idempotencyKey: "ord_123",
  metadata: { orderId: "ord_123" },
});
```

| Pattern | SDK call | Buy now |
|---------|----------|---------|
| Catalog / product checkout | `ensureCheckoutLink()` | Open stored `publicCode` |
| Invoice / order checkout | `link({ isOneTime: true })` | Create (or dedupe) then open |
