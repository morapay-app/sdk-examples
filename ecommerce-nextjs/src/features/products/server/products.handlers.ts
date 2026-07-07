import { NextResponse } from "next/server";
import type { PaymentLink } from "@morapay/sdk";
import { jsonError } from "@/lib/api/json-error";
import { getMorapayClient } from "@/lib/morapay";
import {
  bindCatalogCheckoutLink,
  enrichProductsWithCatalogCodes,
  resolveCatalogCheckoutLink,
} from "../catalog.utils";

export async function listProducts() {
  try {
    const client = getMorapayClient();
    const result = await client.products({ limit: 50 });
    const data = await enrichProductsWithCatalogCodes(client, result.data);
    return NextResponse.json({ success: true, data, meta: result.meta });
  } catch (err) {
    return jsonError(err);
  }
}

export async function createProduct(request: Request) {
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

export async function updateProduct(
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

export async function createProductCheckout(
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

    let link: PaymentLink;
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

export async function resolveProductCheckoutLink(
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
