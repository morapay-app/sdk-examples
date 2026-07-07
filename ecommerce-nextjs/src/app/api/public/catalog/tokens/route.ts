import { proxyPublicCatalogGet } from "@morapay/sdk-nextjs/server/proxyPublicApi";
import { getApiBaseUrl, getCheckoutBaseUrl } from "@/lib/morapay";

export async function GET(request: Request) {
  return proxyPublicCatalogGet(request, "tokens", getApiBaseUrl, getCheckoutBaseUrl);
}
