from __future__ import annotations

import json
from typing import Any
from urllib.parse import urlencode

import httpx

from morapay.signing import MORAPAY_IDEMPOTENCY_KEY_HEADER, sign_morapay_request

MERCHANT_PREFIX = "/api/v1/merchant"


class MorapayClient:
    """Minimal Morapay merchant API client for Python backends."""

    def __init__(
        self,
        *,
        public_key: str,
        secret_key: str,
        base_url: str,
        checkout_base_url: str,
    ) -> None:
        self.public_key = public_key.strip()
        self.secret_key = secret_key.strip()
        if not base_url.strip():
            raise ValueError("base_url is required")
        if not checkout_base_url.strip():
            raise ValueError("checkout_base_url is required")
        self.base_url = base_url.strip().rstrip("/")
        self.checkout_base_url = checkout_base_url.strip().rstrip("/")

    def build_checkout_url(self, public_code: str) -> str:
        return f"{self.checkout_base_url}/{public_code}"

    def _request(
        self,
        method: str,
        path: str,
        *,
        body: dict[str, Any] | None = None,
        idempotency_key: str | None = None,
    ) -> Any:
        raw_body = "" if body is None else json.dumps(body, separators=(",", ":"))
        merchant_path = f"{MERCHANT_PREFIX}{path}"
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            **sign_morapay_request(
                public_key=self.public_key,
                secret=self.secret_key,
                method=method,
                path_with_query=merchant_path,
                raw_body=raw_body,
            ),
        }
        if idempotency_key:
            headers[MORAPAY_IDEMPOTENCY_KEY_HEADER] = idempotency_key

        with httpx.Client(timeout=30.0) as client:
            response = client.request(
                method,
                f"{self.base_url}{merchant_path}",
                content=raw_body if raw_body else None,
                headers=headers,
            )

        if response.status_code >= 400:
            try:
                detail = response.json()
            except Exception:
                detail = response.text
            raise RuntimeError(f"Morapay API {response.status_code}: {detail}")

        if not response.content:
            return None
        return response.json()

    def list_products(self, *, limit: int = 20) -> dict[str, Any]:
        query = urlencode({"limit": str(limit)})
        return self._request("GET", f"/products?{query}")

    def create_payment_link(
        self,
        *,
        title: str,
        amount: float,
        currency: str,
        is_one_time: bool = True,
        idempotency_key: str | None = None,
    ) -> dict[str, Any]:
        payload = {
            "title": title,
            "amount": amount,
            "currency": currency,
            "isOneTime": is_one_time,
        }
        return self._request("POST", "/links", body=payload, idempotency_key=idempotency_key)
