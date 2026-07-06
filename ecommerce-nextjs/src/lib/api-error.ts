/**
 * Serialize Morapay SDK errors for Next.js API routes.
 *
 * For typed branching on the server, compare against {@link MorapayErrorCode}:
 * `err.code === MorapayErrorCode.LinksAmountBelowMinimum`
 */
import { isMorapayError } from "@morapay/sdk";
import { NextResponse } from "next/server";

export function jsonError(err: unknown, fallback = "Request failed.") {
  if (isMorapayError(err)) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        safeMessage: err.safeMessage,
        displayMessage: err.displayMessage,
        code: err.code,
        requestId: err.requestId,
      },
      { status: err.status && err.status >= 400 ? err.status : 502 }
    );
  }

  const message = err instanceof Error ? err.message : fallback;
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
