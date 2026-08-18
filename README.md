# n8n-nodes-calcom

An [n8n](https://n8n.io) community node for [Cal.com](https://cal.com) — the
open-source scheduling platform.

Cal.com had no n8n community node at the time this was started (checked against
the npm registry, 2026-08-18), so workflows that needed booking data had to fall
back to generic HTTP Request nodes.

[Installation](#installation) · [Credentials](#credentials) ·
[Operations](#operations) · [Compatibility](#compatibility) · [Development](#development)

## Installation

Follow the
[community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
and install `n8n-nodes-calcom`.

## Credentials

Authentication uses a Cal.com **API key**.

1. In Cal.com, go to **Settings → Developer → API keys**.
2. Create a key. Keys are prefixed `cal_live_` (or `cal_test_` for sandbox).
3. In n8n, create a **Cal.com API** credential and paste the key.

The node sends it as `Authorization: Bearer <key>` and pins Cal.com's date-based
API version with the `cal-api-version` header, so breaking changes upstream do
not silently change behaviour.

## Operations

### Booking

| Operation | Description |
|---|---|
| Get Many | List bookings, optionally filtered by status (upcoming, past, cancelled), attendee email, and limit |
| Get | Retrieve one booking by UID |
| Cancel | Cancel a booking, with an optional cancellation reason shown to the attendee |

### Event Type

| Operation | Description |
|---|---|
| Get Many | List the event types bookable on the account, optionally filtered by username |

## Compatibility

Built against the Cal.com **API v2** (`https://api.cal.com/v2`).
Requires n8n with community nodes enabled.

## Development

```bash
npm install
npm run dev      # runs n8n with this node loaded, rebuilding on change
npm run lint     # n8n community-node lint rules, strict mode
npm run build
```

### Releasing

Publishing goes through GitHub Actions with an
[npm provenance](https://docs.npmjs.com/generating-provenance-statements)
statement — **n8n requires this for verified community nodes and rejects
packages published from a local machine**. Trusted Publishing (OIDC) is
configured on npmjs.com, so no npm token is stored in this repository.

```bash
npm run release  # lint, build, version bump, changelog, tag, push
```

Pushing the version tag triggers `.github/workflows/publish.yml`.

## Status

**Published to npm as `n8n-nodes-calcom@0.1.0`** (2026-08-18) via GitHub Actions
with a signed npm **provenance** attestation — the registry carries both a
`publish v0.1` and a `provenance v1` attestation, which is what n8n requires of
verified community nodes.

Verification submission to the n8n Creator Portal is **pending**: creator
account signup at `creators.n8n.io/signup` was returning HTTP 500 at the time
of publishing (`/login` and `/` were fine, so it is their outage, not a
credential problem). Retry that and submit.

Early, but **every operation is verified against the live Cal.com v2 API**
(2026-08-18, real account, real booking):

| Operation | Result |
|---|---|
| Booking → Get Many | 200, flat array |
| Booking → Get Many + status / attendee / limit filters | 200, filters applied |
| Booking → Get | 200, single object |
| Booking → Cancel | 200; booking status became `cancelled` and the reason landed |
| Event Type → Get Many | 200, flat array |
| Credential test (`GET /me`) | 200 |

### The API version header is load-bearing

`cal-api-version` is set **per operation**, not globally, because the two
resources disagree:

| Endpoint | `2024-06-14` | `2024-08-13` | no header |
|---|---|---|---|
| `/event-types` | 200, flat array | **404** | 200, nested object |
| `/bookings` | — | 200, flat array | 200, nested object |

Sending one version globally 404s event types. Sending none returns nested
objects instead of arrays n8n can map to items.

### Self-hosted note

Self-hosted Cal.com **cannot issue API keys** — they are gated behind a
commercial licence ("This is a commercial feature"), which is also why a
self-hosted `/api/v2` route answers 500 rather than 401. The Base URL
credential field still supports self-hosted for anyone holding a licence.

## License

MIT
