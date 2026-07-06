import { proxyPublicCatalogGet } from "@morapay/sdk-nextjs/server/proxy-public-api";
import { getApiBaseUrl, getCheckoutBaseUrl } from "@/lib/morapay";

export async function GET(request: Request) {
  return proxyPublicCatalogGet(request, "chains", getApiBaseUrl, getCheckoutBaseUrl);
}
