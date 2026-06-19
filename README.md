# 1-on-1 AI Advisory — booking page (MAR-8)

A self-contained landing/booking page for dg0n's AI Advisory offer. One HTML file, no build step, no dependencies. Open `index.html` in a browser to preview.

## The offer (drafted — pending your sign-off)

Positioning: **AI architect/educator for technical founders & CTOs shipping AI features.**

| Tier | Price | Format | For |
|---|---|---|---|
| Strategy Call | **$500** | 60 min + 48h async | One focused problem (model choice, agent design, build-vs-buy, sanity-check) |
| Architecture Deep-Dive | **$1,000** | Pre-call review + 90 min + 7d async | Production reliability, cost/latency, eval strategy, agent orchestration |

Every engagement ends with a **written recap / architecture review** with prioritized next steps. Money-back guarantee to lower the bar for cold inbound.

## What I need from you (the only blockers)

These two need *your* accounts (identity + finance), so I can't create them:

1. **Booking link** — Calendly or Cal.com. Recommendation: **Cal.com** (free tier, native Stripe payments, clean per-event-type links). Create two event types: `strategy-call` ($500) and `architecture-deep-dive` ($1,000).
2. **Payment** — easiest path is to let the booking tool collect payment on confirm (Cal.com + Stripe, or Calendly + Stripe). Then you don't need a separate Stripe Payment Link at all.

Drop those links into the **CONFIG** block and the page wires itself up.

## Wiring it up

Open `index.html`, find the two clearly-marked CONFIG blocks:

- **Top of file (HTML comment)** — quick instructions.
- **Bottom `<script>` `CONFIG = {…}`** — set `BOOKING_URL` (and optionally per-tier `BOOKING_URL_STRATEGY` / `BOOKING_URL_DEEPDIVE`). Leave `PAYMENT_URL` empty if the booking tool collects payment itself.
- Replace `REPLACE_WITH_EMAIL` in the footer with a contact address.

Until real links are set, the buttons safely scroll to the pricing section (no dead clicks).

## Deploying (any of these, all free)

- **Cal.com hosted page** only — simplest; skip hosting the HTML and just share the Cal.com link. The HTML adds positioning/credibility, recommended for inbound.
- **GitHub Pages** — push this folder to a repo, enable Pages.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder.

I can do the deploy step once you pick a host and approve the copy.

## Status

Page + copy are complete. Awaiting your sign-off on offer/pricing and the booking/payment links via the question card on [MAR-8](/MAR/issues/MAR-8).
