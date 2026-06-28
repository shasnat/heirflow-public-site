# Unlisted pricing page with three module packages

## Summary
Add a standalone, intentionally **unlisted** pricing page (reachable only by typing its exact URL) so pricing can be iterated on freely before any public launch. To avoid option overload, the page leads with a simple **Good/Better/Best plan ladder** (Essentials → Professional → Complete) built from three underlying modules (Document Filing, Assets & Liabilities, Accounting), with monthly/annual per-seat pricing and a de-emphasized "single module" escape hatch for buyers who want just one module (e.g. Accounting only). The structure deliberately pushes customers toward the top "Complete" tier, which is the largest sale.

## Problem / Motivation
Pricing is still in flux and will be adjusted frequently in the early go-to-market phase. The team needs a real, shareable page to show prospects on calls and test messaging, but does **not** want it discoverable from the homepage, navigation, search engines, or by casual guessing. An unlisted, no-index pricing route gives a private surface to iterate on without committing to public pricing.

## Requirements

### Access / discoverability
- The page lives at a dedicated route and is reachable directly by URL (SPA deep links already work via the `dist/404.html = index.html` fallback created in the deploy workflow).
- It must **not** be linked from anywhere on the site: not in `Navigation`, the homepage, footers, or any other page.
- It must **not** be indexed by search engines: include a `noindex, nofollow` robots signal for this route (e.g. an injected `<meta name="robots">` while the page is mounted) and keep it out of any sitemap/robots.txt that may exist.
- The exact path should be hard to guess (see Open questions for the proposed slug). Treat this as "security through obscurity," not real access control — no auth is in scope.

### Primary path — Good/Better/Best plan tiers
Three nested tiers are the star of the page. Each tier card shows the tier name, a tagline, the active-cadence price (per seat), an annual-savings line, and a checklist of the three modules (included = blue check; excluded = muted). The "Complete" tier is visually highlighted ("Most popular" badge, blue ring, slightly elevated) and is the only tier framed as best value.

| Tier | Includes | Monthly / seat | Annual / seat | Annual savings |
|---|---|---|---|---|
| Essentials | Document Filing | $250 | $2,400 | 20% |
| Professional | Document Filing + Assets & Liabilities | $500 | $4,800 | 20% |
| **Complete** (Most popular) | All three modules | $950 | **$7,600** | **33%** |

The deeper discount on Complete (33% vs. the 20% on lower tiers) plus anchoring pushes buyers to the top tier. The marginal jump from Professional ($4,800) to Complete ($7,600) is only $2,800 to add Accounting, which costs $4,320 on its own.

### Secondary path — single modules (de-emphasized escape hatch)
A small "Just need one part? Buy a single module" link below the tiers expands a section showing the three modules à la carte (with full feature bullets) at their individual per-seat prices. This serves edge-case buyers (e.g. Accounting-only) without cluttering the primary decision. Buying modules separately is intentionally worse value than Complete, reinforcing the bundle.

- **Document Filing** — Auto-suggests/auto-completes court forms and cover letters; guides notarization & filing; helps create amended forms after court feedback. **$250/mo · $2,400/yr** per seat.
- **Assets & Liabilities** — Inventory of estate assets; generates documents to marshal, appraise, safeguard; mailing instructions; pay-off/negotiate liabilities. **$250/mo · $2,400/yr** per seat.
- **Accounting** — Account for every asset entering/exiting the estate; formal & informal accounting documents for courts and beneficiaries; fiduciary release. **$450/mo · $4,320/yr** per seat.

### Billing toggle & discount framing
- A Monthly / Annual toggle controls both the tier cards and the single-module cards; it **defaults to Annual**.
- Lower tiers and individual modules are **20% off** when annual ($250→$2,400, $500→$4,800, $450→$4,320). The **Complete** tier is **33% off** ($950 × 12 = $11,400 → **$7,600**).
- Each annual price shows a "Save N%" line; the annual toggle shows a "Save up to 33%" badge. Discount percentages are computed from the data, not hardcoded.

### Presentation
- Match the existing site look and feel (React + Vite + Tailwind, `lucide-react` icons, `Button`/`Card` UI components, blue accent, `container mx-auto px-4` layout) and the conversion-oriented copy tone of the current homepage.
- "Per seat" pricing must be explicit on every price so multi-seat firms understand the model.
- Each module card needs a CTA (e.g. "Book a call" / "Get started") consistent with the rest of the site; clicking it should route to the existing booking flow (`schedule-demo`) or scroll to a booking section. Confirm CTA destination in Open questions.
- Responsive: cards stack cleanly on mobile and sit side-by-side on desktop.

## Acceptance criteria
- [ ] Navigating directly to the pricing URL renders the page; no link to it exists anywhere else on the site.
- [ ] The route carries a `noindex, nofollow` signal while mounted, and the page is absent from any sitemap.
- [ ] Three module cards render with the correct names, descriptions, and per-seat monthly/annual prices exactly as specified above.
- [ ] A monthly/annual toggle (or dual price display) works and each annual price shows the 20% savings framing.
- [ ] The all-three annual bundle is shown at $7,600/seat/year, highlighted as best value, with a correct savings figure vs. buying separately.
- [ ] Every price clearly states it is "per seat."
- [ ] Each card's CTA routes to the agreed booking flow with no console errors.
- [ ] Layout matches existing site styling and is responsive on mobile and desktop.

## Likely touch points
- `src/App.tsx` — add the new route, extend the `PageType` union and `pageToPath` map, render the new page component.
- `src/components/PricingPage.tsx` (new) — the pricing UI, billing toggle, module cards, bundle, and per-route `noindex` meta injection.
- `src/components/ui/card.tsx`, `src/components/ui/button.tsx` — reuse existing primitives for tier cards and CTAs.
- `src/components/Navigation.tsx` — global nav renders on all routes; **intentionally no link added** (decide whether to keep or hide nav/CTA on this page — see Open questions).
- `src/lib/metaPixel.ts` — optional: emit CTA-click events consistent with existing naming (optional, can be deferred).
- `.github/workflows/*.yml` / `dist/404.html` — no change needed; deep-link fallback already exists.

## Out of scope
- Real access control / authentication or password-gating the page (this pass relies on an unlisted, hard-to-guess URL only).
- Self-serve checkout, payment processing, Stripe/billing integration, or seat-quantity selection — CTAs route to the existing human booking flow.
- Linking the page into navigation, homepage, or sitemap, or any public launch of pricing.
- Per-state, promotional, or custom/enterprise pricing tiers beyond the three modules and the bundle.

## Resolved decisions
- **Exact URL path:** `/pricing-preview`.
- **Nav presence:** Keep the global `Navigation` on this page.
- **Structure:** Good/Better/Best plan tiers (Essentials / Professional / Complete) as the primary path, with a de-emphasized single-module escape hatch.
- **Escape hatch:** A "Just need one part?" link that expands/reveals the three à la carte modules.
- **Tier naming:** Essentials / Professional / Complete.
- **Professional tier price:** $4,800/yr (sum of the two modules, no extra discount, so Complete remains the best value).
- **Bundle savings framing:** Headline ~33% off (Complete), comparing $7,600 against the $11,400 monthly-annualized total.
- **Default billing cadence:** Monthly/annual toggle, defaults to **Annual** (controls both tiers and modules).
- **CTA:** No CTA for now — pricing display only.
- No attachments (screenshots/mockups) were provided with this request.
