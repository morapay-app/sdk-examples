import type { Morapay, PaymentLink, Product } from "@morapay/sdk";

/** Merchant-side field: stable catalog checkout code for a product SKU. */
export type StorefrontProduct = Product & {
  checkoutPublicCode?: string | null;
};

export function findCatalogCheckoutLink(links: PaymentLink[]): PaymentLink | undefined {
  return links.find((link) => link.isActive && link.isOneTime === false);
}

export async function resolveCatalogCheckoutLink(
  client: Morapay,
  productId: string
): Promise<PaymentLink> {
  return client.products.ensureCheckoutLink(productId);
}

export async function enrichProductsWithCatalogCodes(
  client: Morapay,
  products: Product[]
): Promise<StorefrontProduct[]> {
  const enriched = await Promise.all(
    products.map(async (product) => {
      try {
        const { data } = await client.products.links(product.id, { active: true, limit: 20 });
        const catalogLink = findCatalogCheckoutLink(data);
        return {
          ...product,
          checkoutPublicCode: catalogLink?.publicCode ?? null,
        } satisfies StorefrontProduct;
      } catch {
        return { ...product, checkoutPublicCode: null } satisfies StorefrontProduct;
      }
    })
  );
  return enriched;
}

export async function bindCatalogCheckoutLink(
  client: Morapay,
  productId: string
): Promise<PaymentLink> {
  return resolveCatalogCheckoutLink(client, productId);
}
