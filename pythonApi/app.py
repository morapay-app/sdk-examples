"""Morapay Python backend sample (FastAPI)."""

from __future__ import annotations

import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from morapay.client import MorapayClient

load_dotenv()

public_key = os.getenv("MORAPAY_PUBLIC_KEY", "").strip()
secret_key = os.getenv("MORAPAY_SECRET_KEY", "").strip()

PRODUCTION_API_URL = "https://api.morapay.io"
PRODUCTION_CHECKOUT_URL = "https://checkout.morapay.io"


def read_url_env(name: str, production_default: str) -> str:
    raw = os.getenv(name)
    if raw is None:
        return production_default
    trimmed = raw.strip()
    if not trimmed:
        raise RuntimeError(
            f"{name} is set but empty. Unset it to use {production_default}, or provide a valid URL."
        )
    return trimmed


if not public_key or not secret_key:
    raise RuntimeError("Set MORAPAY_PUBLIC_KEY and MORAPAY_SECRET_KEY in .env")

morapay = MorapayClient(
    public_key=public_key,
    secret_key=secret_key,
    base_url=read_url_env("MORAPAY_BASE_URL", PRODUCTION_API_URL),
    checkout_base_url=read_url_env("MORAPAY_CHECKOUT_BASE_URL", PRODUCTION_CHECKOUT_URL),
)

app = FastAPI(title="Morapay Python sample", version="0.1.0")


class CheckoutLinkBody(BaseModel):
    title: str = "Order"
    amount: float = Field(default=10, gt=0)
    currency: str = "USD"
    idempotency_key: str | None = None


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.get("/api/products")
def list_products() -> dict[str, Any]:
    try:
        return morapay.list_products(limit=20)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/api/checkout-link")
def create_checkout_link(body: CheckoutLinkBody) -> dict[str, str]:
    try:
        result = morapay.create_payment_link(
            title=body.title,
            amount=body.amount,
            currency=body.currency,
            is_one_time=True,
            idempotency_key=body.idempotency_key,
        )
        link = result.get("data") if isinstance(result, dict) else result
        if not isinstance(link, dict):
            raise RuntimeError("Unexpected API response")
        public_code = str(link.get("publicCode", ""))
        return {
            "publicCode": public_code,
            "checkoutUrl": morapay.build_checkout_url(public_code),
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
