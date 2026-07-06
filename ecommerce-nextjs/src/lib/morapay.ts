import { Morapay, type MorapayOptions } from "@morapay/sdk";

/** Morapay production hosts — same defaults as `@morapay/sdk`. */
export const MORAPAY_PRODUCTION_API_URL = "https://api.morapay.io";
export const MORAPAY_PRODUCTION_CHECKOUT_URL = "https://checkout.morapay.io";

/**
 * Read a URL env var. Unset → production default. Empty string → throw (misconfiguration).
 */
export function readMorapayUrlEnv(name: string, productionDefault: string): string {
  const raw = process.env[name];
  if (raw === undefined) return productionDefault;
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error(
      `${name} is set but empty. Unset it to use ${productionDefault}, or provide a valid URL.`
    );
  }
  return trimmed;
}

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
    baseUrl: readMorapayUrlEnv("MORAPAY_BASE_URL", MORAPAY_PRODUCTION_API_URL),
    checkoutBaseUrl: readMorapayUrlEnv("MORAPAY_CHECKOUT_BASE_URL", MORAPAY_PRODUCTION_CHECKOUT_URL),
  };

  cached = new Morapay(options);
  return cached;
}

export function getApiBaseUrl(): string {
  return readMorapayUrlEnv("MORAPAY_BASE_URL", MORAPAY_PRODUCTION_API_URL);
}

export function getCheckoutBaseUrl(): string {
  return readMorapayUrlEnv("MORAPAY_CHECKOUT_BASE_URL", MORAPAY_PRODUCTION_CHECKOUT_URL);
}

export function getPublicConfig() {
  const widgetRaw = process.env.MORAPAY_WIDGET_SCRIPT_URL;
  if (widgetRaw !== undefined && !widgetRaw.trim()) {
    throw new Error(
      "MORAPAY_WIDGET_SCRIPT_URL is set but empty. Unset it to use /widget/morapay-checkout.js, or set a valid path."
    );
  }
  const widgetScriptUrl = widgetRaw?.trim() || "/widget/morapay-checkout.js";

  return {
    checkoutBaseUrl: readMorapayUrlEnv("MORAPAY_CHECKOUT_BASE_URL", MORAPAY_PRODUCTION_CHECKOUT_URL),
    widgetScriptUrl,
    publicApiBase: "/api/public",
    apiBaseUrl: getApiBaseUrl(),
  };
}
