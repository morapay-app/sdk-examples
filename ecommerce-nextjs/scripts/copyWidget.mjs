import { mkdir, copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
// Current monorepo layout is `morapay-web/`; the legacy `frontend/` path is kept last
// as a fallback for older checkouts of the repo.
const candidates = [
  path.resolve(here, "../../../morapay-web/packages/react/dist/morapay-checkout.js"),
  path.resolve(here, "../../../morapay-web/apps/checkout/public/widget/morapay-checkout.js"),
  path.resolve(here, "../../../frontend/packages/react/dist/morapay-checkout.js"),
];
const destDir = path.resolve(here, "../public/widget");
const destFile = path.join(destDir, "morapayCheckout.js");

function validateWidgetBundle(source) {
  return (
    source.includes("openPreviewModal") &&
    source.includes("openModal") &&
    source.includes("MorapayCheckout")
  );
}

try {
  let copied = false;
  await mkdir(destDir, { recursive: true });
  for (const src of candidates) {
    try {
      const bundle = await readFile(src, "utf8");
      if (!validateWidgetBundle(bundle)) {
        console.warn(`[copyWidget] skipped stale bundle at ${src}`);
        continue;
      }
      await copyFile(src, destFile);
      console.log(`Copied widget → public/widget/morapayCheckout.js (from ${src})`);
      copied = true;
      break;
    } catch {
      // try next candidate
    }
  }
  if (!copied) {
    console.warn(
      "[copyWidget] skipped: build @morapay/react first (cd morapay-web/packages/react && pnpm run build)"
    );
  }
} catch (err) {
  console.warn("[copyWidget] skipped:", err instanceof Error ? err.message : err);
}
