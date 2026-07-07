import { proxyPublicFiatInitializePost } from "@morapay/sdk-nextjs/server/proxyPublicApi";
import { getApiBaseUrl } from "@/lib/morapay";

export async function POST(request: Request) {
  return proxyPublicFiatInitializePost(request, getApiBaseUrl);
}
