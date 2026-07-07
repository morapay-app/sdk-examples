import { proxyPublicFiatVerifyGet } from "@morapay/sdk-nextjs/server/proxyPublicApi";
import { getApiBaseUrl } from "@/lib/morapay";

type RouteContext = { params: Promise<{ reference: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { reference } = await context.params;
  return proxyPublicFiatVerifyGet(request, reference, getApiBaseUrl);
}
