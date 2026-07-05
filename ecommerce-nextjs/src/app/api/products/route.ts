import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-error";
import { enrichProductsWithCatalogCodes, bindCatalogCheckoutLink } from "@/lib/catalog-checkout";
import { getMorapayClient } from "@/lib/morapay";

export async function GET() {
  try {
    const client = getMorapayClient();
    const result = await client.products({ limit: 50 });
    const data = await enrichProductsWithCatalogCodes(client, result.data);
    return NextResponse.json({ success: true, data, meta: result.meta });
  } catch (err) {
    return jsonError(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      price?: number;
      currency?: string;
      type?: "DIGITAL" | "PHYSICAL" | "SERVICE";
      description?: string;
      bindCheckoutLink?: boolean;
    };
    const client = getMorapayClient();
    const product = await client.products.create({
      name: body.name?.trim() || "Demo product",
      description: body.description?.trim(),
      price: typeof body.price === "number" ? body.price : 49,
      currency: body.currency?.trim() || "GHS",
      type: body.type ?? "PHYSICAL",
    });

    let checkoutPublicCode: string | null = null;
    if (body.bindCheckoutLink !== false) {
      const link = await bindCatalogCheckoutLink(client, product.id);
      checkoutPublicCode = link.publicCode;
    }

    return NextResponse.json({
      success: true,
      data: { ...product, checkoutPublicCode },
    });
  } catch (err) {
    return jsonError(err);
  }
}
