import { Morapay, type MorapayOptions } from "@morapay/sdk";

let cached: Morapay | null = null;

export function getMorapayClient(): Morapay {
  if (cached) return cached;

  const publicKey = process.env.MORAPAY_PUBLIC_KEY?.trim();
  const secretKey = process.env.MORAPAY_SECRET_KEY?.trim();
  if (!publicKey || !secretKey) {
    throw new Error(
      "Missing MORAPAY_PUBLIC_KEY or MORAPAY_SECRET_KEY. Copy .env.example to .env.local."
    );
  }

  const options: MorapayOptions = {
    publicKey,
    secretKey,
    baseUrl:
      process.env.MORAPAY_BASE_URL?.trim() ??
      (process.env.NODE_ENV === "development" ? "http://localhost:4001" : undefined),
    checkoutBaseUrl:
      process.env.MORAPAY_CHECKOUT_BASE_URL?.trim() ??
      (process.env.NODE_ENV === "development" ? "http://localhost:3002" : undefined),
  };
  if (!options.baseUrl) {
    options.baseUrl = "https://api.morapay.io";
  }
  if (!options.checkoutBaseUrl) {
    options.checkoutBaseUrl = "https://checkout.morapay.io";
  }

  cached = new Morapay(options);
  return cached;
}

export function getPublicConfig() {
  const checkoutBaseUrl = process.env.MORAPAY_CHECKOUT_BASE_URL?.trim() ?? "http://localhost:3002";
  const widgetScriptUrl =
    process.env.MORAPAY_WIDGET_SCRIPT_URL?.trim() ?? "/widget/morapay-checkout.js";
  return {
    checkoutBaseUrl,
    widgetScriptUrl,
    publicApiBase: "/api/public",
    apiBaseUrl: getApiBaseUrl(),
  };
}

export function getApiBaseUrl(): string {
  return (
    process.env.MORAPAY_BASE_URL?.trim() ??
    (process.env.NODE_ENV === "development" ? "http://localhost:4001" : "https://api.morapay.io")
  );
}
