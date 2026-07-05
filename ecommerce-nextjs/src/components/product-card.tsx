"use client";

import type { PaymentLink, Product } from "@morapay/sdk";
import {
  formatProductPrice,
  productCategory,
  productImageGradient,
  productLabel,
  productRating,
  productSoldLabel,
} from "@/lib/product-display";

type ProductCardProps = {
  product: Product;
  busy?: boolean;
  onBuy: (product: Product) => void;
};

const TYPE_EMOJI: Record<string, string> = {
  DIGITAL: "💾",
  PHYSICAL: "📦",
  SERVICE: "🛠",
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 7h12l-1.2 13H7.2L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function ProductCard({ product, busy, onBuy }: ProductCardProps) {
  const emoji = TYPE_EMOJI[product.type] ?? "🛍";
  const label = productLabel(product);
  const rating = productRating(product);
  const sold = productSoldLabel(product);

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="product-card__img" />
        ) : (
          <div
            className="product-card__img product-card__img--placeholder"
            style={{ background: productImageGradient(product) }}
          >
            <span aria-hidden>{emoji}</span>
          </div>
        )}
        {label ? (
          <span className={`product-card__badge product-card__badge--${label.tone}`}>{label.text}</span>
        ) : null}
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{productCategory(product)}</p>
        <h2 className="product-card__title">{product.name}</h2>
        {product.description ? (
          <p className="product-card__description">{product.description}</p>
        ) : null}

        <div className="product-card__rating">
          <StarIcon />
          <span className="product-card__rating-score">{rating.score}</span>
          <span className="product-card__rating-reviews">({rating.reviewLabel})</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">{formatProductPrice(product)}</div>
          <span className="product-card__sold">{sold}</span>
        </div>

        <button
          type="button"
          className="product-card__buy"
          disabled={busy || !product.isActive}
          onClick={() => onBuy(product)}
        >
          <BagIcon />
          {busy ? "Starting checkout…" : "Buy now"}
        </button>
      </div>
    </article>
  );
}

export type CheckoutResult = {
  link: PaymentLink;
  checkoutUrl: string;
  isPaid: boolean;
  reused?: boolean;
  linkStrategy?: "catalog" | "invoice";
};
