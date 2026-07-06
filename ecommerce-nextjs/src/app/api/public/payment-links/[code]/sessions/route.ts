import { proxyPublicPaymentLinkSessionPost } from "@morapay/sdk-nextjs/server/proxy-public-api";
import { getApiBaseUrl } from "@/lib/morapay";

type RouteContext = { params: Promise<{ code: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { code } = await context.params;
  return proxyPublicPaymentLinkSessionPost(request, code, getApiBaseUrl);
}
