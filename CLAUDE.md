# marinewoodcraft.com

Marketing/SEO site for a boat wood restoration business (teak, brightwork, varnishing) serving Hawaii, Marina del Rey (LA), and San Francisco. Plain static HTML — no Jekyll/build step, hosted on GitHub Pages via `CNAME`.

## Structure

- `index.html` — brand/hub homepage: short intro + cards linking to each location page, not itself a location page
- `hawaii/index.html`, `marina-del-rey/index.html`, `san-francisco/index.html` — per-location landing pages
- `marina-del-rey.html` — legacy redirect stub (meta-refresh) to `/marina-del-rey/`; keep this pattern for any other old flat URLs that get relocated into a directory
- `services/teak-restoration/index.html` — service page (template for other service pages)
- `services/boat-keeper/index.html` — Boat Keeper recurring maintenance/monitoring service page (visit checklist, 3 frequency tiers, FAQ, wood-care integration pitch)
- `robots.txt`, `sitemap.xml`, `CNAME`
- `SEO-STRATEGY.md` — the multi-location SEO plan this site structure implements (subdirectories not subdomains, per-location content must differ 60-70%+, self-referencing canonicals, LocalBusiness schema, no shared boilerplate beyond nav/footer)

## Conventions

- Follow `SEO-STRATEGY.md` for any new location or service page: distinct title/meta/H1/H2/FAQ per page, self-referencing canonical, no reskinned/templated duplicate copy between location pages.
- New location or service pages must be added to `sitemap.xml` and linked from the homepage hub / relevant nav.
- Never use Russian in code/UI/docs unless the task explicitly calls for it.

## Repo

`origin` → `github.com/followorbounce/marinewoodcraft.com`. Related: `followorbounce.com/p/MarineWoodCraft.html` is a separate standalone artifact page in a different repo, not part of this site.

## Analytics
Cloudflare Web Analytics beacon added 2026-09-19 — own site (host `marinewoodcraft.com`, see `[[cloudflare-analytics-setup]]` in memory).


## Share pictures (og:image)
Added 2026-10-28. Every public page has a 1200×630 share picture at `og/<canonical path>.jpg` (`og/index.jpg` for the front page) and the tags `og:image` (+ width, height, alt), `twitter:card` = `summary_large_image` and `twitter:image`. the tags sit directly in each page's head, placed after the page's other og:/twitter: tags. The pictures are drawn by `engine/og_cards.py` in the followorbounce.github.io repo (one card template, this site's own palette and type, `og/manifest.json` = a hash per card so unchanged cards are skipped). After adding or renaming a page, or changing a title or description, run `python3 engine/og_cards.py marinewoodcraft.com` from that repo; it renders new cards, adds missing tags and deletes cards of pages that went away. `--check` lists pages without tags. Pages that already have their own `og:image` (the photo cards on this site) are left alone.
