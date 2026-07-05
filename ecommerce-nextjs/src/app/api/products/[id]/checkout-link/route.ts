import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-error";
import { resolveCatalogCheckoutLink } from "@/lib/catalog-checkout";
import { getMorapayClient } from "@/lib/morapay";

/** Read-only catalog link resolve — no invoice create. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const client = getMorapayClient();
    const link = await resolveCatalogCheckoutLink(client, id);
    return NextResponse.json({
      success: true,
      data: {
        publicCode: link.publicCode,
        checkoutUrl: client.buildCheckoutUrl(link.publicCode),
        link,
      },
    });
  } catch (err) {
    return jsonError(err);
  }
}
