# Marine Wood Craft — Multi-Location SEO Implementation Plan
### Hawaii + Los Angeles (Marina del Rey) · Static Jekyll / GitHub Pages

---

## 1. Site Architecture

### Recommendation: subdirectories, not subdomains

```
marinewoodcraft.com/
├── /                        → Brand homepage (hub, not location-specific)
├── /hawaii/                 → Honolulu / Oahu location page
├── /marina-del-rey/         → Los Angeles / SoCal location page
├── /services/
│   ├── /teak-restoration/
│   ├── /yacht-varnishing/
│   ├── /brightwork-restoration/
│   ├── /boat-wood-repair/
│   └── /marine-carpentry/
├── /gallery/
│   └── /before-after/
├── /sitemap.xml
└── /robots.txt
```

### Why subdirectories beat subdomains here

| Factor | Subdomain (`hawaii.marinewoodcraft.com`) | Subdirectory (`marinewoodcraft.com/hawaii/`) |
|---|---|---|
| Domain authority | Treated as a semi-separate entity; link equity and trust built on `www` doesn't fully transfer | Inherits full domain authority immediately |
| Google Business Profile matching | GBP wants a single canonical domain per listing family; subdomains can confuse entity resolution | Cleaner NAP (Name-Address-Phone) → domain consistency |
| Crawl budget | Split crawl trust between hosts | Unified crawl budget on one host |
| GitHub Pages hosting | Requires a second CNAME + repo or complex multi-subdomain DNS | One repo, one Pages deployment, folder-based routing — trivial with Jekyll collections |
| Internal linking / analytics | Cross-subdomain tracking needs extra GA4 config (cross-domain linking) | Native, no config needed |
| User/brand trust | Looks like two different businesses | Reads as one company serving two regions — matches reality |

**Verdict:** subdirectories. Anthropic/Google's own guidance and virtually all local-SEO precedent (e.g., national contractors ranking multiple metros) favors path-based location pages under one root domain. Reserve subdomains for genuinely separate products (e.g., `id.followorbounce.com` was a distinct portfolio system) — here it's one business, two service areas.

### Homepage's new role
The homepage stops being "the Hawaii page." It becomes a **brand/hub page**: short intro, both locations presented as equal cards linking to `/hawaii/` and `/marina-del-rey/`, plus links into `/services/`. This alone resolves most of the duplicate-content risk, because Google no longer has two pages competing to be "the" homepage for boat-wood-restoration queries.

---

## 2. Duplicate Content & Cannibalization Prevention

1. **Rewrite, don't reskin.** Copy must differ in structure, examples, local landmarks, and at least 60–70% of sentence-level content between `/hawaii/` and `/marina-del-rey/`. (Done in the two page builds below — no swapped-word templating.)
2. **Self-referencing canonicals** on every page (`<link rel="canonical" href="https://marinewoodcraft.com/hawaii/">`), so no page ever canonicalizes to another.
3. **Distinct title tags, meta descriptions, H1/H2s, image alt text, and FAQ content** per location (below).
4. **No shared boilerplate paragraphs** longer than ~1 sentence between the two pages (nav/footer excluded — those are expected to match).
5. **hreflang not needed** (same language, not country-targeted content split) — geo-targeting is handled via on-page content + LocalBusiness schema + GBP, not hreflang.
6. **Internal linking discipline:** each location page links to the *other* location once (for users who mistype/mis-navigate) but the anchor text and context differ, and it's a single low-weight link — not enough to blur relevance signals.

---

## 3. On-Page SEO

### `/hawaii/`

| Element | Content |
|---|---|
| Title tag | `Boat Wood Restoration Honolulu, HI | Teak & Brightwork Experts \| Marine Wood Craft` |
| Meta description | `Marine Wood Craft restores teak decks, brightwork & yacht interiors for boats in Honolulu, Waikiki, Ala Wai Harbor & Hawaii Kai. 20+ years, 500+ vessels. Free quote.` |
| H1 | `Boat Wood Restoration & Teak Refinishing — Honolulu, Oʻahu` |
| H2s | `Serving Ala Wai Harbor, Waikiki & Hawaii Kai` · `Marine Woodworking Built for the Pacific` · `Our Services` · `Our Process` · `Get a Free Quote in Honolulu` |
| URL | `/hawaii/` |

### `/marina-del-rey/`

| Element | Content |
|---|---|
| Title tag | `Boat Wood Restoration Marina del Rey, CA | Teak & Brightwork Experts \| Marine Wood Craft` |
| Meta description | `Marine Wood Craft restores teak decks, brightwork & yacht interiors across Marina del Rey, Long Beach, Newport Beach & San Pedro. 20+ years, 500+ vessels. Free quote.` |
| H1 | `Boat Wood Restoration & Teak Refinishing — Marina del Rey, CA` |
| H2s | `Serving Marina del Rey, Long Beach & Newport Beach` · `Marine Woodworking Built for the SoCal Coast` · `Our Services` · `Our Process` · `Get a Free Quote in Marina del Rey` |
| URL | `/marina-del-rey/` |

Full page copy is implemented in the HTML builds (`/hawaii/index.html`, `/marina-del-rey/index.html`) — see file structure below. Copy differs at the paragraph level, not just the proper nouns.

---

## 4. Local SEO Signals

**Hawaii page** weaves in, naturally (not stuffed): Honolulu, Waikiki, Ala Wai Harbor, Hawaii Kai, Oʻahu — each tied to a real service context (e.g., "haul-outs at Ala Wai Harbor," "Hawaii Kai marina slips").

**LA page** weaves in: Marina del Rey, Los Angeles, Long Beach, San Pedro, Newport Beach — same pattern.

Supporting actions:
- **Two separate Google Business Profile listings** (or one GBP with service-area business + explicit service areas, if there's no public-facing second physical address) — one seeking Honolulu-area reviews, one seeking LA-area reviews. This is the single highest-leverage action on this list for local pack rankings.
- **Location-specific FAQ schema** (below) targeting "boat wood restoration near me" style queries per metro.
- **NAP consistency**: keep phone/email identical across both pages (as you specified) but list each page's **service area**, not a fake separate address, unless a real second location exists — don't fabricate a second physical address for schema, that risks a GBP suspension.
- **Local backlinks**: harbor master directories, yacht club vendor pages, local marine supply stores (Ala Wai Harbor tenants directory; Marina del Rey Harbor master's approved-vendor list) — high-relevance, low-competition links.

---

## 5. Structured Data

Three schema blocks per location page: `LocalBusiness`/`HomeAndConstructionBusiness`, `Service`, and `FAQPage`. See exact JSON-LD in each HTML file. Summary of what's encoded:

- **LocalBusiness**: name suffixed by area (`Marine Wood Craft — Honolulu`), `areaServed` array of the 5 local terms, `geo` coordinates for that metro, shared `telephone`/`email`.
- **Service**: one entry per core offering (teak restoration, brightwork, varnishing, carpentry, 12V electrical) with `areaServed` scoped to that page's metro — this is what lets each page rank for "teak restoration + [city]" long-tails independently.
- **FAQPage**: 4 location-flavored Q&As per page (different questions per city, not reworded duplicates) — eligible for FAQ rich results and directly answers "near me" intent.

Do **not** mark up the homepage with LocalBusiness schema pointing at a specific city — keep it as `Organization` only, to avoid geo-signal conflicts on the hub page.

---

## 6. Internal Linking Structure

```
Homepage (/)
 ├─→ /hawaii/            (primary nav + hero card)
 ├─→ /marina-del-rey/    (primary nav + hero card)
 └─→ /services/*         (primary nav)

/hawaii/
 ├─→ /services/teak-restoration/   (anchor: "teak restoration")
 ├─→ /services/brightwork-restoration/
 ├─→ /gallery/                     (anchor: "recent Oʻahu projects")
 └─→ /marina-del-rey/              (footer, low-weight: "Also serving Southern California")

/marina-del-rey/
 ├─→ /services/*                  (same service links, different anchor context)
 ├─→ /gallery/                    (anchor: "recent Marina del Rey projects")
 └─→ /hawaii/                     (footer, low-weight)

/services/[service]/
 ├─→ /hawaii/            (anchor: "available in Honolulu")
 └─→ /marina-del-rey/    (anchor: "available in Marina del Rey")

/gallery/
 └─→ both location pages, filtered by project tag (hawaii vs. socal)
```

Rule of thumb: **location pages link down into services; service pages link back up into both locations.** This is the standard "hub and spoke" pattern for multi-location contractor sites and is what lets a single service page (e.g., teak restoration) accumulate authority from both geos while location pages stay focused on their own metro.

---

## 7. Technical SEO Checklist

| Item | Recommendation |
|---|---|
| Canonical tags | Self-referencing on every page, absolute URLs, no trailing-slash mismatches |
| Open Graph | Unique `og:title`, `og:description`, `og:image` per page (location-specific hero crop), `og:locale` = `en_US` |
| Sitemap.xml | Auto-generate via `jekyll-sitemap` plugin or hand-maintain (provided below); include `lastmod`; submit both location URLs individually in GSC |
| Robots.txt | Allow all; explicit `Sitemap:` line; no need to block anything on a marketing site this size (provided below) |
| Breadcrumbs | `Home > Hawaii` and `Home > Marina del Rey` — implement visually **and** as `BreadcrumbList` JSON-LD |
| Image alt text | Descriptive + geo-flavored where accurate: `"Teak deck restoration on a sailboat at Ala Wai Harbor, Honolulu"` — never keyword-stuff alt text that doesn't describe the actual image |
| Page speed | Self-host or subset the Google Fonts (Bebas Neue/DM Sans/IBM Plex Mono) via `font-display: swap` (already implied by `&display=swap`, good); inline critical CSS is already the case since it's a single `<style>` block; lazy-load below-the-fold SVGs/images if you add raster photos later |
| Core Web Vitals | Biggest risk with real photography added later is LCP — serve WebP/AVIF, explicit `width`/`height` on `<img>`, avoid layout shift from fonts (current heavy weight-300 DM Sans keeps things light) |
| GSC setup | Verify property, submit sitemap, use "URL inspection" to request indexing on both new location URLs after launch, and set up two separate GBP-linked location groups if using Business Profile API |

---

## 8. Content Expansion Roadmap (ranked by expected impact/effort)

| Priority | Page | Rationale |
|---|---|---|
| 1 | `/services/teak-restoration/` | Highest commercial-intent keyword in the niche; currently only a card-level mention |
| 2 | `/services/brightwork-restoration/` | Distinct search term from "teak," different buyer intent (varnish/hardware focus) |
| 3 | `/gallery/` (before/after) | Boat owners buy on trust/visual proof; also a natural link magnet and dwell-time booster |
| 4 | `/services/yacht-varnishing/` | Captures "yacht varnishing near me" separately from generic "teak" |
| 5 | `/services/boat-wood-repair/` | Broader repair-intent queries, feeds both location pages |
| 6 | `/services/marine-carpentry/` | Custom-build/interior intent, higher ticket value |
| 7 | Blog/guides (e.g., "How Often Should Teak Decking Be Restored?") | Long-tail informational queries, supports topical authority for the whole `/services/` cluster |

---

## 9. Prioritized Action Plan with Estimated Impact

| # | Action | Effort | Est. SEO Impact |
|---|---|---|---|
| 1 | Move Hawaii content off homepage into `/hawaii/`; make homepage a neutral hub | Medium | **High** — root-causes the cannibalization risk |
| 2 | Publish `/marina-del-rey/` at its own path with rewritten copy | Low (mostly done) | **High** — unlocks LA rankings without competing against Hawaii page |
| 3 | Add LocalBusiness + Service + FAQ schema to both location pages | Low | **Medium-High** — rich results, better local intent matching |
| 4 | Create/optimize two separate Google Business Profiles | Medium | **Highest single lever** for "near me" and map-pack visibility |
| 5 | Build `/services/teak-restoration/` and `/services/brightwork-restoration/` | Medium | **Medium-High** — captures service-specific long-tails |
| 6 | Submit sitemap, request indexing for new URLs in GSC | Low | **Medium** — speeds up discovery, doesn't change rankings directly |
| 7 | Build `/gallery/` with real project photos + alt text | Medium | **Medium** — trust/conversion + image search visibility |
| 8 | Acquire location-specific backlinks (harbor directories, yacht clubs) | High (ongoing) | **High**, compounding over months |
| 9 | Remaining service pages + blog/guides | High | **Medium**, long-tail compounding |

---

## 10. File Structure Delivered

```
seo-site/
├── SEO-STRATEGY.md          ← this document
├── index.html                ← new neutral homepage/hub
├── hawaii/index.html         ← full rewritten Hawaii location page
├── marina-del-rey/index.html ← full rewritten LA location page
├── services/teak-restoration/index.html  ← template for remaining service pages
├── sitemap.xml
└── robots.txt
```

Jekyll note: these are delivered as flat HTML for drop-in compatibility with your current build (no Jekyll includes yet). Recommended next refactor: extract `<header>`, `<nav>`, and `<footer>` into `_includes/header.html` / `_includes/footer.html`, and turn `/services/*` into a Jekyll **collection** (`_services`) with a single `service.html` layout — that removes the copy-paste maintenance burden once you have 5–6 service pages instead of hand-editing each file.
