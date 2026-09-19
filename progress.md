# Progress — marinewoodcraft.com

## Status

- Multi-location site structure shipped: brand hub homepage + Hawaii, Marina del Rey, and San Francisco location pages, plus one service page (teak-restoration).
- `sitemap.xml` already lists four more service pages (`brightwork-restoration`, `yacht-varnishing`, `boat-wood-repair`, `marine-carpentry`) and a `/gallery/` page that **do not exist yet** — sitemap is ahead of the actual site.
- Git: working tree clean, but **local `main` is 1 commit ahead of `origin/main` — not yet pushed**.

## Recent work

- 2026-09-16 (b364ee6, unpushed) — Ship the multi-location site structure with Honolulu, Marina del Rey and San Francisco pages.
- 2026-09-16 — Added CLAUDE.md and progress.md for ongoing tracking.
- Earlier commits (ac8a5a0, c773bc6, 507d642, 8835c4e, 5f40aca, fa89ab9, 9f9636b, da35bb6) — initial single-page setup before the multi-location rebuild.

- 2026-09-19 — Added a Cloudflare Web Analytics beacon (cross-repo rollout across every deployed followorbounce/client site). See [[cloudflare-analytics-setup]] in the assistant's memory for the account/token map.

## Next steps

- Push the pending local commit (`b364ee6`) to `origin/main`.
- Build the four missing service pages and `/gallery/` referenced in `sitemap.xml`, or trim the sitemap to match reality until they exist.
- Remove the tracked `.DS_Store` from the repo (currently committed at root).
