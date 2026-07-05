"use client";

import * as React from "react";
import type { Product } from "@morapay/sdk";
import { ConfigOrb, useCheckoutConfig } from "@/components/config-orb";
import { ProductCard, type CheckoutResult } from "@/components/product-card";
import { linkIsOneTime } from "@/lib/checkout-config";
import type { StorefrontProduct } from "@/lib/catalog-checkout";
import { openPaymentLinkCheckout } from "@morapay/sdk-nextjs/client/open-payment-link-checkout";

type PublicConfig = {
  checkoutBaseUrl: string;
  widgetScriptUrl: string;
  publicApiBase: string;
};

const SEED_PRODUCTS = [
  {
    name: "Merino crew neck",
    price: 68,
    currency: "GHS",
    type: "PHYSICAL" as const,
    description: "Soft wool blend, ships in 3 days.",
  },
  {
    name: "Pro API plan (monthly)",
    price: 29,
    currency: "GHS",
    type: "DIGITAL" as const,
    description: "Unlimited sandbox calls.",
  },
  {
    name: "Onboarding session",
    price: 150,
    currency: "GHS",
    type: "SERVICE" as const,
    description: "60 min integration review.",
  },
];

type SortOption = "best" | "price-asc" | "price-desc" | "newest";

const TYPE_FILTERS = [
  { id: "PHYSICAL", label: "Physical" },
  { id: "DIGITAL", label: "Digital" },
  { id: "SERVICE", label: "Service" },
] as const;

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return next.sort((a, b) => Number(b.price) - Number(a.price));
    case "newest":
      return next.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "best":
    default:
      return next.sort((a, b) => a.name.localeCompare(b.name));
  }
}

async function normalizeDemoCurrency(catalog: Product[]): Promise<number> {
  let fixed = 0;
  for (const seed of SEED_PRODUCTS) {
    const matches = catalog.filter(
      (product) => product.name.trim().toLowerCase() === seed.name.trim().toLowerCase()
    );
    for (const product of matches) {
      if (product.currency === seed.currency) continue;
      const res = await fetch(`/api/products/${encodeURIComponent(product.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: seed.currency }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Failed to update ${product.name}`);
      fixed += 1;
    }
  }
  return fixed;
}

export function Storefront() {
  const [config, setConfig] = useCheckoutConfig();
  const [products, setProducts] = React.useState<StorefrontProduct[]>([]);
  const [publicConfig, setPublicConfig] = React.useState<PublicConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<{ kind: "error" | "success"; message: string } | null>(
    null
  );
  const [customerEmail, setCustomerEmail] = React.useState("demo@morapay.io");
  const [typeFilters, setTypeFilters] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<SortOption>("best");

  const visibleProducts = React.useMemo(() => {
    const filtered =
      typeFilters.length === 0
        ? products
        : products.filter((product) => typeFilters.includes(product.type));
    return sortProducts(filtered, sort);
  }, [products, sort, typeFilters]);

  const loadProducts = React.useCallback(async () => {
    setLoading(true);
    setStatus(null);
    try {
      const [productsRes, configRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/config"),
      ]);
      const productsJson = await productsRes.json();
      const configJson = await configRes.json();

      if (!productsRes.ok) {
        throw new Error(productsJson.error ?? "Failed to load products");
      }
      if (!configRes.ok) {
        throw new Error(configJson.error ?? "Failed to load config");
      }

      setProducts(Array.isArray(productsJson.data) ? productsJson.data : []);
      setPublicConfig(configJson.data as PublicConfig);

      const catalog = Array.isArray(productsJson.data) ? (productsJson.data as StorefrontProduct[]) : [];
      const needsGhsFix = catalog.some((product) =>
        SEED_PRODUCTS.some(
          (seed) =>
            product.name.trim().toLowerCase() === seed.name.trim().toLowerCase() &&
            product.currency !== seed.currency
        )
      );
      if (needsGhsFix) {
        const fixed = await normalizeDemoCurrency(catalog);
        if (fixed > 0) {
          const refresh = await fetch("/api/products");
          const refreshJson = await refresh.json();
          if (refresh.ok) {
            setProducts(Array.isArray(refreshJson.data) ? refreshJson.data : []);
          }
        }
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Could not load storefront",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const seedCatalog = async () => {
    setStatus(null);
    try {
      const fixed = await normalizeDemoCurrency(products);

      const existingNames = new Set(products.map((p) => p.name.trim().toLowerCase()));
      const toCreate = SEED_PRODUCTS.filter(
        (item) => !existingNames.has(item.name.trim().toLowerCase())
      );

      for (const item of toCreate) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `Failed to create ${item.name}`);
      }

      if (fixed === 0 && toCreate.length === 0) {
        const missingLink = products.filter((p) => !p.checkoutPublicCode?.trim());
        if (missingLink.length > 0) {
          for (const product of missingLink) {
            await fetch(`/api/products/${encodeURIComponent(product.id)}/checkout-link`);
          }
          await loadProducts();
          setStatus({
            kind: "success",
            message: `Bound catalog checkout links for ${missingLink.length} product(s).`,
          });
          return;
        }
        setStatus({
          kind: "success",
          message: "Demo catalog already in GHS — nothing to change.",
        });
        return;
      }

      const parts: string[] = [];
      if (fixed > 0) parts.push(`updated ${fixed} product(s) to GHS`);
      if (toCreate.length > 0) parts.push(`created ${toCreate.length} new product(s)`);
      setStatus({ kind: "success", message: `Demo catalog: ${parts.join(", ")}.` });
      await loadProducts();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Seed failed",
      });
    }
  };

  const openWidgetCheckout = async (result: CheckoutResult, title: string) => {
    if (!publicConfig) throw new Error("Checkout config not loaded");

    await openPaymentLinkCheckout({
      publicCode: result.link.publicCode,
      widgetScriptUrl: publicConfig.widgetScriptUrl,
      mode: config.widgetExperience,
      apiBaseUrl: publicConfig.publicApiBase,
      checkoutBaseUrl: publicConfig.checkoutBaseUrl,
      linkTitle: title,
      customization: {
        theme: config.theme,
        colorMode: config.widgetColorMode,
        accentColor: config.accentColor,
        borderRadius: "lg",
        fontScale: "default",
      },
      onSuccess: () => {
        setStatus({ kind: "success", message: `Payment completed for ${title}` });
      },
      onFailure: (payload: { code: string; message: string }) => {
        setStatus({ kind: "error", message: payload.message || "Checkout failed" });
      },
    });
  };

  const handleBuy = async (product: StorefrontProduct) => {
    setBusyId(product.id);
    setStatus(null);
    try {
      const isInvoice = linkIsOneTime(config.linkKind);
      const storedCode = product.checkoutPublicCode?.trim();

      let result: CheckoutResult;

      if (!isInvoice && storedCode) {
        result = {
          link: {
            id: "",
            createdAt: "",
            updatedAt: "",
            businessId: product.businessId,
            title: product.name,
            slug: "",
            publicCode: storedCode,
            type: "PRODUCT",
            productId: product.id,
            amount: product.price,
            currency: product.currency,
            gasSponsorshipEnabled: false,
            isOneTime: false,
            paidAt: null,
            paidByTransactionId: null,
            paidByWalletAddress: null,
            isActive: true,
            views: 0,
            usageCount: 0,
          },
          checkoutUrl: `${publicConfig?.checkoutBaseUrl ?? ""}/${encodeURIComponent(storedCode)}`,
          isPaid: false,
          reused: true,
          linkStrategy: "catalog",
        };
      } else {
        const orderId = isInvoice ? `demo-${product.id}-${Date.now()}` : undefined;
        const res = await fetch(`/api/products/${encodeURIComponent(product.id)}/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail,
            customerName: "Demo shopper",
            isOneTime: isInvoice,
            orderId,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.safeMessage ?? json.error ?? "Checkout failed");
        result = json.data as CheckoutResult;

        if (!isInvoice && result.link.publicCode) {
          setProducts((prev) =>
            prev.map((row) =>
              row.id === product.id
                ? { ...row, checkoutPublicCode: result.link.publicCode }
                : row
            )
          );
        }
      }

      if (!publicConfig) throw new Error("Checkout config not loaded");
      const modeLabel = config.checkoutMode === "widget" ? "widget" : "redirect";
      const strategyLabel = config.linkKind === "invoice" ? "invoice" : "catalog";
      const reuseNote =
        result.reused && config.linkKind === "catalog"
          ? storedCode && !isInvoice
            ? " · opened stored catalog link"
            : " · reused existing product link"
          : config.linkKind === "invoice"
            ? " · new one-time link"
            : " · created catalog link";

      if (config.checkoutMode === "redirect") {
        setStatus({
          kind: "success",
          message: `Opening hosted checkout (${strategyLabel}, ${modeLabel})${reuseNote}`,
        });
        window.location.assign(result.checkoutUrl);
        return;
      }

      const experienceLabel =
        config.widgetExperience === "preview" ? "preview + API link data" : "live iframe";
      await openWidgetCheckout(result, product.name);
      setStatus({
        kind: "success",
        message: `Widget opened (${experienceLabel}) — ${strategyLabel} · ${result.link.publicCode}${reuseNote}`,
      });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Checkout failed",
      });
    } finally {
      setBusyId(null);
    }
  };

  const toggleTypeFilter = (typeId: string) => {
    setTypeFilters((current) =>
      current.includes(typeId) ? current.filter((id) => id !== typeId) : [...current, typeId]
    );
  };

  return (
    <div className="page">
      <header className="store-header">
        <div>
          <h1>Northline Supply</h1>
          <p>
            Curated catalog · Morapay checkout ·{" "}
            <strong>{config.checkoutMode}</strong>
            {config.checkoutMode === "widget" ? (
              <>
                {" "}
                · <strong>{config.widgetExperience}</strong>
              </>
            ) : null}{" "}
            · <strong>{config.linkKind}</strong>
          </p>
        </div>
        <div className="store-header__actions">
          <button type="button" onClick={() => void loadProducts()}>
            Refresh
          </button>
          <button type="button" className="primary" onClick={() => void seedCatalog()}>
            Seed catalog
          </button>
        </div>
      </header>

      <div className="shopper-row">
        <label htmlFor="email">Shopper email</label>
        <input
          id="email"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="customer@example.com"
        />
      </div>

      {status ? (
        <div className={`status-banner ${status.kind}`}>{status.message}</div>
      ) : null}

      {loading ? (
        <div className="empty-state">Loading Morapay product catalog…</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products yet. Bind your storefront by creating Morapay products first.</p>
          <p style={{ marginTop: "1rem" }}>
            <button type="button" className="primary" onClick={() => void seedCatalog()}>
              Seed 3 demo products
            </button>
          </p>
        </div>
      ) : (
        <div className="catalog-layout">
          <aside className="catalog-sidebar" aria-label="Product filters">
            <h2>Filters</h2>
            <div className="filter-group">
              <p className="filter-group__title">Category</p>
              {TYPE_FILTERS.map((filter) => (
                <label key={filter.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={typeFilters.includes(filter.id)}
                    onChange={() => toggleTypeFilter(filter.id)}
                  />
                  {filter.label}
                </label>
              ))}
            </div>
          </aside>

          <section className="catalog-main">
            <div className="catalog-toolbar">
              <p className="catalog-toolbar__count">
                {visibleProducts.length} <span>Result{visibleProducts.length === 1 ? "" : "s"}</span>
              </p>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="best">Best seller</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {visibleProducts.length === 0 ? (
              <div className="empty-state">No products match the selected filters.</div>
            ) : (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    busy={busyId === product.id}
                    onBuy={handleBuy}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <ConfigOrb config={config} onChange={setConfig} />
    </div>
  );
}
