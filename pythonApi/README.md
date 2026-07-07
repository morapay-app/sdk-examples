# Morapay Python API (FastAPI)

Backend-only reference: HMAC signing + merchant API routes. No UI — wire your own frontend.

**Scaffold a copy:**

```bash
npx create-morapay-app
# choose 4) Python (FastAPI)
```

Or develop against this folder in `sdk-examples`.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Required: MORAPAY_PUBLIC_KEY, MORAPAY_SECRET_KEY
uvicorn app:app --reload --port 8080
```

`MORAPAY_BASE_URL` and `MORAPAY_CHECKOUT_BASE_URL` default to Morapay production when omitted.

## Endpoints

| Route | Description |
|-------|-------------|
| `GET /health` | Liveness |
| `GET /api/products` | List merchant products |
| `POST /api/checkout-link` | Create a one-time payment link + checkout URL |

```bash
curl -s -X POST http://localhost:8080/api/checkout-link \
  -H 'content-type: application/json' \
  -d '{"title":"Invoice #42","amount":100,"currency":"GHS"}'
```

## Modules

| File | Purpose |
|------|---------|
| `morapay/signing.py` | HMAC headers (same scheme as `@morapay/sdk`) |
| `morapay/client.py` | HTTP client for products + payment links |
| `app.py` | FastAPI routes |

## Docs

https://docs.morapay.io — TypeScript SDK: `@morapay/sdk` on npm.
