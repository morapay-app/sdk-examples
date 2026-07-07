import type { DemoCheckoutConfig } from "./checkout.types";

export const DEFAULT_CHECKOUT_CONFIG: DemoCheckoutConfig = {
  checkoutMode: "widget",
  linkKind: "catalog",
  widgetExperience: "preview",
  widgetColorMode: "light",
  accentColor: "#6b8f5a",
  theme: "velvet-obsidian",
};

export const CHECKOUT_CONFIG_STORAGE_KEY = "morapay-ecommerce-demo-config";
