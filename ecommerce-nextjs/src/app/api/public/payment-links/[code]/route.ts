import { proxyPublicPaymentLinkGet } from "@morapay/sdk-nextjs/server/proxy-public-api";
import { getMorapayClient } from "@/lib/morapay";

type RouteContext = { params: Promise<{ code: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { code } = await context.params;
  return proxyPublicPaymentLinkGet(request, code, getMorapayClient);
}
