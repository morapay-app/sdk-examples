"use client";

import type { Product } from "@morapay/sdk";
import { BagIcon } from "@/ui/BagIcon";
import { StarIcon } from "@/ui/StarIcon";
import {
  formatProductPrice,
  productCategory,
  productImageGradient,
  productLabel,
  productRating,
  productSoldLabel,
} from "../productDisplay.utils";
import type { CheckoutResult } from "../products.types";

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

export type { CheckoutResult };
