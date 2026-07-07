import { Morapay, type MorapayOptions } from "@morapay/sdk";
import {
  MORAPAY_PRODUCTION_API_URL,
  MORAPAY_PRODUCTION_CHECKOUT_URL,
  readMorapayUrlEnv,
} from "./morapay.config";

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
  const widgetScriptUrl = widgetRaw?.trim() || "/widget/morapay-checkout";

  return {
    checkoutBaseUrl: readMorapayUrlEnv("MORAPAY_CHECKOUT_BASE_URL", MORAPAY_PRODUCTION_CHECKOUT_URL),
    widgetScriptUrl,
    publicApiBase: "/api/public",
    apiBaseUrl: getApiBaseUrl(),
  };
}
