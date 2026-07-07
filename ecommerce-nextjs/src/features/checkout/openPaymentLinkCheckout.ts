/**
 * Browser checkout widget — `@morapay/react` (npm / ESM).
 */
import {
  closeMorapayCheckoutModal,
  closeMorapayCheckoutPreviewModal,
  openMorapayCheckoutModal,
  openMorapayCheckoutPreviewModal,
  type MorapayWidgetCustomization,
} from "@morapay/react";
import type { OpenPaymentLinkCheckoutParams } from "./checkout.types";

export {
  closeMorapayCheckoutModal,
  closeMorapayCheckoutPreviewModal,
  openMorapayCheckoutModal,
  openMorapayCheckoutPreviewModal,
  type MorapayWidgetCustomization,
};

const DEFAULT_PUBLIC_API_BASE = "/api/public";

export function openPaymentLinkCheckout(params: OpenPaymentLinkCheckoutParams): void {
  const code = params.publicCode.trim();
  if (!code) throw new Error("publicCode is required.");

  const apiBaseUrl = (params.apiBaseUrl ?? DEFAULT_PUBLIC_API_BASE).replace(/\/+$/, "");
  const presentation = params.presentation ?? params.customization?.presentation;

  if (params.mode === "preview") {
    closeMorapayCheckoutPreviewModal();
    openMorapayCheckoutPreviewModal({
      businessName: params.businessName?.trim() || "Merchant",
      linkTitle: params.linkTitle?.trim() || "Payment",
      amount: params.amount ?? null,
      currency: params.currency ?? "USD",
      customization: params.customization,
      presentation,
      publicCode: code,
      apiBaseUrl,
      checkoutBaseUrl: params.checkoutBaseUrl?.trim(),
      onWalletConnected: params.onWalletConnected,
      onTokenSelect: params.onTokenSelect,
      onClose: params.onClose,
      onSuccess: params.onSuccess,
      onFailure: params.onFailure,
    });
    return;
  }

  const checkoutBaseUrl = params.checkoutBaseUrl?.trim();
  if (!checkoutBaseUrl) {
    throw new Error("checkoutBaseUrl is required for live checkout.");
  }

  closeMorapayCheckoutModal();
  openMorapayCheckoutModal({
    mode: "payment-link",
    title: params.linkTitle?.trim() || "Checkout",
    checkoutBaseUrl,
    publicCode: code,
    customization: params.customization,
    presentation,
    onSuccess: params.onSuccess,
    onFailure: params.onFailure,
    onClose: params.onClose,
  });
}
