import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-error";
import { getMorapayClient } from "@/lib/morapay";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await request.json().catch(() => ({}))) as {
      customerEmail?: string;
      customerName?: string;
      isOneTime?: boolean;
      orderId?: string;
    };

    const isOneTime = body.isOneTime ?? false;
    const client = getMorapayClient();

    const linkInput = {
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      isOneTime,
      ...(body.orderId?.trim()
        ? {
            idempotencyKey: body.orderId.trim(),
            metadata: { orderId: body.orderId.trim() },
          }
        : {}),
    };

    let link;
    let reused = false;

    if (isOneTime) {
      link = await client.products.link(id, linkInput);
    } else {
      const before = await client.products.links(id, { active: true, limit: 20 });
      link = await client.products.ensureCheckoutLink(id, linkInput);
      reused = before.data.some(
        (row) => row.id === link.id && row.isActive && row.isOneTime === false
      );
    }

    const checkoutUrl = client.buildCheckoutUrl(link.publicCode);

    return NextResponse.json({
      success: true,
      data: {
        link,
        checkoutUrl,
        isPaid: client.utils.isPaid(link),
        reused,
        linkStrategy: isOneTime ? "invoice" : "catalog",
      },
    });
  } catch (err) {
    return jsonError(err);
  }
}
