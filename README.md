# Morapay SDK examples

In-house integration samples for testing `@morapay/sdk` the way external merchants would.

| Example | Stack | Port | Purpose |
|---------|-------|------|---------|
| [`ecommerce-nextjs`](./ecommerce-nextjs) | Next.js 15 | `3020` | Ecommerce storefront — products, payment links, widget vs redirect |
| [`python-api`](./python-api) | FastAPI | `8080` | Backend-only — signing, products, checkout links (no UI) |
| `express-server` | Express | TBD | Server-side only integration (coming next) |

The older [`sdk-sample-1`](../sdk-sample-1) lab (port `3010`) remains a full resource explorer. These examples are **scenario-focused** demos.

## SDK capabilities used here

| Feature | SDK support | Notes |
|---------|-------------|-------|
| Product catalog | `morapay.products.create()` | Bind store SKUs to Morapay products |
| Per-checkout link | `morapay.products.link(productId, …)` | One link per payer/session |
| **One-time link** | `isOneTime: true` | Default — link stops after use |
| **Reusable link** | `isOneTime: false` | Same link can be paid multiple times |
| Hosted redirect | `morapay.buildCheckoutUrl(publicCode)` | Full-page checkout |
| Widget modal | `MorapayCheckout.openModal` | Payer stays on merchant site |

## Quick start (ecommerce)

```bash
cd sdk && pnpm install && pnpm run build
cd ../sdk-examples/ecommerce-nextjs && cp .env.example .env.local
# fill MORAPAY_PUBLIC_KEY + MORAPAY_SECRET_KEY
pnpm install && pnpm dev
```

Open http://localhost:3020 — use the floating **config orb** (bottom-right) to switch checkout mode and link type.

## Quick start (Python API)

```bash
cd sdk-examples/python-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# fill MORAPAY_PUBLIC_KEY + MORAPAY_SECRET_KEY
uvicorn app:app --reload --port 8080
```

Or scaffold a fresh copy: `npx create-morapay-app` → option **4**.

## Local stack

```bash
# Terminal 1 — API
cd backend && pnpm dev

# Terminal 2 — Checkout host (widget canvas)
cd morapay-web/apps/checkout && pnpm dev

# Terminal 3 — Ecommerce example
cd sdk-examples/ecommerce-nextjs && pnpm dev
```
