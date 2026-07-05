import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-error";
import { getMorapayClient, getPublicConfig } from "@/lib/morapay";

export async function GET() {
  try {
    getMorapayClient();
    return NextResponse.json({ success: true, data: getPublicConfig() });
  } catch (err) {
    return jsonError(err);
  }
}
