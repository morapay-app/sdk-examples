# Architecture — Feature-Driven (FDA)

This example follows **Feature-Driven Architecture**: code is grouped by what it *does*, not by file type.

## Layout

```text
src/
├── app/                          # Next.js routes only (thin shells)
├── features/
│   ├── storefront/               # Catalog grid, seed demo, buy flow
│   ├── checkout/                 # @morapay/react widget + checkout lab UI
│   ├── products/                 # Product cards, catalog links, API handlers
│   ├── config/                   # Public config for the browser
│   └── public-api/               # (routes in app/api/public — BFF via sdk/nextjs)
├── lib/
│   └── morapay/                  # Morapay client factory + env config
├── ui/                           # Dumb primitives (icons)
└── types/                        # (optional) cross-feature types
```

## Dependency rules

1. **Code flows down** — features may import `lib/` and `ui/`, never the reverse.
2. **Features don't cross-import internals** — import through each feature's `index.ts` barrel.
3. **Routes stay thin** — `app/api/**/route.ts` delegates to `features/*/server/`.

## Naming

| Kind | Pattern | Example |
|------|---------|---------|
| UI | `PascalCase.tsx` | `ProductCard.tsx` |
| Hooks | `useCamelCase.ts` | `useCheckoutConfig.ts` |
| Config | `[domain].config.ts` | `checkout.config.ts` |
| Types | `[domain].types.ts` | `products.types.ts` |
| Utils | `[domain].utils.ts` | `catalog.utils.ts` |
| Constants | `[domain].constants.ts` | `storefront.constants.ts` |

## Packages

| Package | Feature folder | Role |
|---------|----------------|------|
| `@morapay/sdk` | — | Merchant API (server) |
| `@morapay/react` | `features/checkout/` | Checkout widget modals |
| `sdk/nextjs` | `features/public-api` (in SDK) | BFF proxy handlers |
