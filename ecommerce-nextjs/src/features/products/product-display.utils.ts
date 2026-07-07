import type { Product } from "@morapay/sdk";
import type { ProductLabel } from "./products.types";

const CATEGORY_LABEL: Record<string, string> = {
  PHYSICAL: "Physical product",
  DIGITAL: "Digital product",
  SERVICE: "Professional service",
};

const TYPE_GRADIENT: Record<string, string> = {
  PHYSICAL: "linear-gradient(145deg, #eef4ea 0%, #dce8d4 100%)",
  DIGITAL: "linear-gradient(145deg, #f0f4f8 0%, #e2eaf2 100%)",
  SERVICE: "linear-gradient(145deg, #f5f0ea 0%, #ebe3d8 100%)",
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function productCategory(product: Product): string {
  return CATEGORY_LABEL[product.type] ?? product.type.replace(/_/g, " ");
}

export function productImageGradient(product: Product): string {
  return TYPE_GRADIENT[product.type] ?? TYPE_GRADIENT.PHYSICAL;
}

export function productLabel(product: Product): ProductLabel | null {
  const created = new Date(product.createdAt).getTime();
  const isNew = Number.isFinite(created) && Date.now() - created < 1000 * 60 * 60 * 24 * 30;
  if (isNew) return { text: "New in", tone: "new" };

  const hash = hashString(product.id);
  if (hash % 5 === 0) return { text: "12% off", tone: "sale" };
  if (product.type === "PHYSICAL" && hash % 3 === 0) return { text: "Best seller", tone: "default" };
  return null;
}

export function productRating(product: Product): { score: string; reviewLabel: string } {
  const hash = hashString(product.id);
  const score = (4 + (hash % 11) / 10).toFixed(1);
  const reviewCount = ((hash % 9) + 1) * 1000;
  const reviewLabel =
    reviewCount >= 1000 ? `${Math.round(reviewCount / 1000)}k Review` : `${reviewCount} Review`;
  return { score, reviewLabel };
}

export function productSoldLabel(product: Product): string {
  const hash = hashString(product.id + product.name);
  const sold = ((hash % 180) + 20) * 1000;
  if (sold >= 1000) return `${Math.round(sold / 1000)}k Sold`;
  return `${sold} Sold`;
}

export function formatProductPrice(product: Product): string {
  const amount = Number(product.price);
  if (Number.isFinite(amount)) {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: product.currency || "GHS",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return `${product.currency} ${product.price}`;
}
