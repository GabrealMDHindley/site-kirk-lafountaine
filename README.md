# Kirk LaFountaine — Go West Realty

Luxury real estate website for Kirk LaFountaine (Go West Realty, Oroville CA), built
with Next.js App Router, React Three Fiber, and GSAP ScrollTrigger.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- React Three Fiber + drei — the animated gold-crystal hero
- GSAP ScrollTrigger — scroll-driven reveals throughout
- Anthropic SDK — the site's AI chatbot (`/api/chat`)

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required for | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | The chatbot | Without it, the chat widget tells visitors it isn't configured yet — nothing crashes. |
| `CRM_WEBHOOK_URL` | Forwarding contact-form leads to a CRM | Point this at a Go High Level (or any) inbound webhook URL. Without it, leads are just logged server-side. |

Set both as Environment Variables in the Vercel project settings for production.

## Content = the chatbot's knowledge base

All site copy (agent bio, listings, testimonials, FAQs) lives in `src/content/*.ts`.
Pages import these files directly, and so does `src/lib/site-knowledge.ts`, which
assembles them into the chatbot's system prompt on every request. **Editing a content
file updates both the live page and the next chatbot answer — there is no separate
sync step.** To add/update/remove a listing, edit `src/content/listings.ts` and drop
its photos in `public/listings/<slug>/` (numbered `01.jpg`, `02.jpg`, …); the chatbot
picks it up immediately on the next deploy.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
