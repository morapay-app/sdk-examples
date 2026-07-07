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

export type PaymentLinkCheckoutMode = "preview" | "live";

export type OpenPaymentLinkCheckoutParams = {
  publicCode: string;
  mode: PaymentLinkCheckoutMode;
  checkoutBaseUrl?: string;
  apiBaseUrl?: string;
  customization?: import("@morapay/react").MorapayWidgetCustomization;
  presentation?: "auto" | "bottom-sheet" | "modal";
  linkTitle?: string;
  businessName?: string;
  amount?: string | null;
  currency?: string;
  onSuccess?: (payload: unknown) => void;
  onFailure?: (payload: { code: string; message: string }) => void;
  onClose?: () => void;
  onWalletConnected?: (address: string) => void;
  onTokenSelect?: (rowId: string) => void;
};
