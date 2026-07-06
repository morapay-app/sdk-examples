import { proxyPublicFiatInitializePost } from "@morapay/sdk-nextjs/server/proxy-public-api";
import { getApiBaseUrl } from "@/lib/morapay";

export async function POST(request: Request) {
  return proxyPublicFiatInitializePost(request, getApiBaseUrl);
}
