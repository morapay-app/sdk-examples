from __future__ import annotations

import hashlib
import hmac
import time

MORAPAY_KEY_HEADER = "Morapay-Key"
MORAPAY_TIMESTAMP_HEADER = "Morapay-Timestamp"
MORAPAY_SIGNATURE_HEADER = "Morapay-Signature"
MORAPAY_IDEMPOTENCY_KEY_HEADER = "Morapay-Idempotency-Key"


def _signing_key(secret: str) -> bytes:
    return hashlib.sha256(secret.strip().encode("utf-8")).digest()


def _body_hash(raw_body: str) -> str:
    return hashlib.sha256(raw_body.encode("utf-8")).hexdigest()


def _signature_payload(*, timestamp: str, method: str, path_with_query: str, raw_body: str) -> str:
    method_upper = method.strip().upper()
    path = path_with_query if path_with_query.startswith("/") else f"/{path_with_query}"
    return f"{timestamp}.{method_upper}.{path}.{_body_hash(raw_body)}"


def sign_morapay_request(
    *,
    public_key: str,
    secret: str,
    method: str,
    path_with_query: str,
    raw_body: str = "",
    timestamp: str | None = None,
) -> dict[str, str]:
    """Build Morapay HMAC auth headers (matches @morapay/sdk)."""
    ts = timestamp or str(int(time.time()))
    payload = _signature_payload(
        timestamp=ts,
        method=method,
        path_with_query=path_with_query,
        raw_body=raw_body,
    )
    digest = hmac.new(_signing_key(secret), payload.encode("utf-8"), hashlib.sha256).hexdigest()
    return {
        MORAPAY_KEY_HEADER: public_key.strip(),
        MORAPAY_TIMESTAMP_HEADER: ts,
        MORAPAY_SIGNATURE_HEADER: f"v1={digest}",
    }
