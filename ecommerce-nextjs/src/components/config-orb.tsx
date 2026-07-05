"use client";

import * as React from "react";
import {
  DEFAULT_CHECKOUT_CONFIG,
  type DemoCheckoutConfig,
  loadCheckoutConfig,
  saveCheckoutConfig,
} from "@/lib/checkout-config";

type ConfigOrbProps = {
  config: DemoCheckoutConfig;
  onChange: (next: DemoCheckoutConfig) => void;
};

export function ConfigOrb({ config, onChange }: ConfigOrbProps) {
  const [open, setOpen] = React.useState(false);

  const patch = (partial: Partial<DemoCheckoutConfig>) => {
    const next = { ...config, ...partial };
    onChange(next);
    saveCheckoutConfig(next);
  };

  return (
    <div className="config-orb">
      {open ? (
        <div className="config-orb__panel" role="dialog" aria-label="Checkout configuration">
          <h3>Checkout lab</h3>

          <div className="config-field">
            <label>Checkout mode</label>
            <div className="config-toggle">
              <button
                type="button"
                className={config.checkoutMode === "widget" ? "active" : ""}
                onClick={() => patch({ checkoutMode: "widget" })}
              >
                Widget
              </button>
              <button
                type="button"
                className={config.checkoutMode === "redirect" ? "active" : ""}
                onClick={() => patch({ checkoutMode: "redirect" })}
              >
                Redirect
              </button>
            </div>
          </div>

          <div className="config-field">
            <label>Link strategy</label>
            <div className="config-toggle">
              <button
                type="button"
                className={config.linkKind === "catalog" ? "active" : ""}
                onClick={() => patch({ linkKind: "catalog" })}
              >
                Catalog
              </button>
              <button
                type="button"
                className={config.linkKind === "invoice" ? "active" : ""}
                onClick={() => patch({ linkKind: "invoice" })}
              >
                Invoice
              </button>
            </div>
            <p className="config-orb__hint" style={{ marginTop: "0.35rem" }}>
              <strong>Catalog</strong> reuses one unlimited link per product (recommended for shops).
              <strong> Invoice</strong> creates a new one-time link per checkout (orders/invoices).
            </p>
          </div>

          {config.checkoutMode === "widget" ? (
            <div className="config-field">
              <label>Widget experience</label>
              <div className="config-toggle">
                <button
                  type="button"
                  className={config.widgetExperience === "preview" ? "active" : ""}
                  onClick={() => patch({ widgetExperience: "preview" })}
                >
                  Preview
                </button>
                <button
                  type="button"
                  className={config.widgetExperience === "live" ? "active" : ""}
                  onClick={() => patch({ widgetExperience: "live" })}
                >
                  Live
                </button>
              </div>
              <p className="config-orb__hint" style={{ marginTop: "0.35rem" }}>
                Preview loads link details via <code>/api/public</code> (shows “Loading payment link…” then live data).
                Live opens hosted checkout iframe for real payments.
              </p>
            </div>
          ) : null}

          <div className="config-field">
            <label>Card surface</label>
            <div className="config-toggle">
              <button
                type="button"
                className={config.widgetColorMode === "light" ? "active" : ""}
                onClick={() => patch({ widgetColorMode: "light" })}
              >
                Light
              </button>
              <button
                type="button"
                className={config.widgetColorMode === "dark" ? "active" : ""}
                onClick={() => patch({ widgetColorMode: "dark" })}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="config-field">
            <label htmlFor="theme">Accent palette</label>
            <select
              id="theme"
              value={config.theme}
              onChange={(e) =>
                patch({ theme: e.target.value as DemoCheckoutConfig["theme"] })
              }
            >
              <option value="velvet-obsidian">Velvet obsidian</option>
              <option value="clay">Clay</option>
              <option value="dusk">Dusk</option>
              <option value="frost">Frost</option>
            </select>
          </div>

          <div className="config-field">
            <label htmlFor="accent">Accent color</label>
            <input
              id="accent"
              type="color"
              value={config.accentColor}
              onChange={(e) => patch({ accentColor: e.target.value })}
            />
          </div>

          <button type="button" onClick={() => patch(DEFAULT_CHECKOUT_CONFIG)}>
            Reset defaults
          </button>

          <p className="config-orb__hint">
            Widget keeps the payer on your storefront. Redirect sends them to hosted checkout.
            Catalog links use <code>products.ensureCheckoutLink()</code>; invoice mode uses{" "}
            <code>products.link({`{ isOneTime: true }`})</code> per checkout.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className="config-orb__trigger"
        aria-label="Open checkout configuration"
        onClick={() => setOpen((value) => !value)}
      >
        ⚙
      </button>
    </div>
  );
}

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
