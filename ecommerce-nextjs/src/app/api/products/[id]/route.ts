import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-error";
import { getMorapayClient } from "@/lib/morapay";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      currency?: string;
      price?: number;
      name?: string;
      description?: string;
      isActive?: boolean;
    };
    const client = getMorapayClient();
    const product = await client.products.update(id, {
      ...(body.currency?.trim() ? { currency: body.currency.trim() } : {}),
      ...(typeof body.price === "number" ? { price: body.price } : {}),
      ...(body.name?.trim() ? { name: body.name.trim() } : {}),
      ...(body.description !== undefined ? { description: body.description?.trim() } : {}),
      ...(typeof body.isActive === "boolean" ? { isActive: body.isActive } : {}),
    });
    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    return jsonError(err);
  }
}
