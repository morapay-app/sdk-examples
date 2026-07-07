import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/jsonError";
import { getMorapayClient, getPublicConfig } from "@/lib/morapay";

export async function getPublicConfigHandler() {
  try {
    getMorapayClient();
    return NextResponse.json({ success: true, data: getPublicConfig() });
  } catch (err) {
    return jsonError(err);
  }
}
