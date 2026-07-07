/** Morapay production hosts — same defaults as `@morapay/sdk`. */
export const MORAPAY_PRODUCTION_API_URL = "https://api.morapay.io";
export const MORAPAY_PRODUCTION_CHECKOUT_URL = "https://checkout.morapay.io";

/** Read a URL env var. Unset → production default. Empty string → throw (misconfiguration). */
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
