import type { Product } from "@morapay/sdk";
import { SEED_PRODUCTS } from "./storefront.constants";
import type { SortOption } from "./storefront.types";

export function sortProducts(list: Product[], sort: SortOption): Product[] {
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

export async function normalizeDemoCurrency(catalog: Product[]): Promise<number> {
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
