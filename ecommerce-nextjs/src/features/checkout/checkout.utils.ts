import { CHECKOUT_CONFIG_STORAGE_KEY, DEFAULT_CHECKOUT_CONFIG } from "./checkout.config";
import type { DemoCheckoutConfig, LegacyLinkKind, LinkKind } from "./checkout.types";

export function loadCheckoutConfig(): DemoCheckoutConfig {
  if (typeof window === "undefined") return DEFAULT_CHECKOUT_CONFIG;
  try {
    const raw = localStorage.getItem(CHECKOUT_CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_CHECKOUT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<DemoCheckoutConfig> & {
      linkKind?: LinkKind | LegacyLinkKind;
    };
    const rawLinkKind = parsed.linkKind as LinkKind | LegacyLinkKind | undefined;
    const linkKind =
      rawLinkKind === "invoice" || rawLinkKind === "one-time"
        ? "invoice"
        : rawLinkKind === "catalog" || rawLinkKind === "reusable"
          ? "catalog"
          : DEFAULT_CHECKOUT_CONFIG.linkKind;
    return {
      ...DEFAULT_CHECKOUT_CONFIG,
      ...parsed,
      linkKind,
    };
  } catch {
    return DEFAULT_CHECKOUT_CONFIG;
  }
}

export function saveCheckoutConfig(config: DemoCheckoutConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHECKOUT_CONFIG_STORAGE_KEY, JSON.stringify(config));
}

export function linkIsOneTime(kind: LinkKind): boolean {
  return kind === "invoice";
}
