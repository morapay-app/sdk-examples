"use client";

import * as React from "react";
import { DEFAULT_CHECKOUT_CONFIG } from "../checkout.config";
import { loadCheckoutConfig, saveCheckoutConfig } from "../checkout.utils";
import type { DemoCheckoutConfig } from "../checkout.types";

export function useCheckoutConfig(): [DemoCheckoutConfig, (next: DemoCheckoutConfig) => void] {
  const [config, setConfig] = React.useState<DemoCheckoutConfig>(DEFAULT_CHECKOUT_CONFIG);

  React.useEffect(() => {
    setConfig(loadCheckoutConfig());
  }, []);

  const update = React.useCallback((next: DemoCheckoutConfig) => {
    setConfig(next);
    saveCheckoutConfig(next);
  }, []);

  return [config, update];
}
