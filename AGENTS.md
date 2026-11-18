<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules (Ello Táticas Digitais site)

- Site content lives in `src/data/*` (site, services, plans, cases, faq, content); pages render from it so the Ello team can update copy without touching layout.
- Never publish invented numbers, testimonials, logos or cases: unauthorized cases stay `status: "draft"` (noindex, no numbers) and empty collections render honest empty states.
- All forms go through `submitLead` in `src/lib/leads.functions.ts` (zod validation shared with the client, honeypot, min fill time, IP-hash rate limit) and only report success after the row is stored; the leads table has RLS on and no client policies.
- Analytics events go through `track()` in `src/lib/analytics.ts` and GTM loads only after consent (`src/lib/consent.ts`); document new events in `docs/ANALYTICS.md`.
- Service landing pages (`/servicos/$slug`) use `LandingHeader`/`LandingFooter` (no global nav, one CTA); all other pages use `SiteShell`.
- Scroll reveals use `<Reveal>` / `<RevealLine>` (per-element observer after hydration); never mutate React-owned DOM from a global observer — it causes hydration mismatches.
- Per-route head metadata is built with `pageHead()` in `src/lib/seo.ts`; JSON-LD never uses Review/AggregateRating.
- Pending business inputs are tracked in `docs/PENDENCIAS.md`; update it when one is resolved.
