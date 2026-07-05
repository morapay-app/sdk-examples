export type CheckoutMode = "widget" | "redirect";
export type LinkKind = "catalog" | "invoice";
/** @deprecated Use catalog | invoice */
export type LegacyLinkKind = "one-time" | "reusable";
/** Widget: preview = staging modal + API link data; live = iframe checkout. */
export type WidgetExperience = "preview" | "live";

export type DemoCheckoutConfig = {
  checkoutMode: CheckoutMode;
  linkKind: LinkKind;
  widgetExperience: WidgetExperience;
  widgetColorMode: "light" | "dark";
  accentColor: string;
  theme: "velvet-obsidian" | "clay" | "dusk" | "frost";
};

export const DEFAULT_CHECKOUT_CONFIG: DemoCheckoutConfig = {
  checkoutMode: "widget",
  linkKind: "catalog",
  widgetExperience: "preview",
  widgetColorMode: "light",
  accentColor: "#6b8f5a",
  theme: "velvet-obsidian",
};

const STORAGE_KEY = "morapay-ecommerce-demo-config";

export function loadCheckoutConfig(): DemoCheckoutConfig {
  if (typeof window === "undefined") return DEFAULT_CHECKOUT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CHECKOUT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<DemoCheckoutConfig> & { linkKind?: string };
    const linkKind =
      parsed.linkKind === "invoice" || parsed.linkKind === "one-time"
        ? "invoice"
        : parsed.linkKind === "catalog" || parsed.linkKind === "reusable"
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function linkIsOneTime(kind: LinkKind): boolean {
  return kind === "invoice";
}
