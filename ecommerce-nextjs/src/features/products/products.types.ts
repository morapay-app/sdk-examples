import type { PaymentLink, Product } from "@morapay/sdk";

export type StorefrontProduct = Product & {
  checkoutPublicCode?: string | null;
};

export type CheckoutResult = {
  link: PaymentLink;
  checkoutUrl: string;
  isPaid: boolean;
  reused?: boolean;
  linkStrategy?: "catalog" | "invoice";
};

export type ProductLabel = { text: string; tone: "sale" | "new" | "default" };
