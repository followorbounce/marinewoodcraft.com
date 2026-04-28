# Follow or Bounce — Jekyll Project

A production-grade Jekyll static site for the *Follow or Bounce* publication.

---

## Quick Start

```bash
# Install Ruby dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Production build
JEKYLL_ENV=production bundle exec jekyll build
```

Output lands in `_site/`. Deploy that directory to any static host
(GitHub Pages, Netlify, Cloudflare Pages, etc.).

---

## Project Structure

```
follow-or-bounce/
├── _config.yml              ← Site config, brand vars, plugin list
├── Gemfile                  ← Ruby gem dependencies
│
├── _data/
│   └── navigation.yml       ← ALL nav items & submenus — edit here
│
├── _layouts/
│   ├── default.html         ← HTML shell: head, header, main, footer
│   ├── page.html            ← Extends default; adds hero + content wrapper
│   └── post.html            ← Extends default; full article layout
│
├── _includes/
│   ├── header.html          ← Fixed header (wordmark + nav)
│   ├── nav.html             ← Menu bar driven by _data/navigation.yml
│   ├── submenu.html         ← Reusable dropdown panel
│   ├── footer.html          ← Site footer
│   ├── post-nav.html        ← Prev / next post links
│   └── ai-widget.html       ← Opt-in AI chat modal markup
│
├── _sass/
│   ├── main.scss            ← Entry point — imports everything in order
│   ├── base/
│   │   ├── _tokens.scss     ← CSS custom properties + Sass maps
│   │   ├── _reset.scss      ← Modern minimal reset
│   │   ├── _elements.scss   ← Opinionated element defaults
│   │   ├── _typography.scss ← .eyebrow, .prose utilities
│   │   └── _layout.scss     ← .site-main, .page-wrapper
│   ├── components/
│   │   ├── _header.scss
│   │   ├── _nav.scss        ← Menu bar + fill-sweep hover
│   │   ├── _submenu.scss    ← Dropdown panel
│   │   ├── _footer.scss
│   │   ├── _hero.scss
│   │   ├── _cards.scss
│   │   ├── _forms.scss
│   │   ├── _post.scss
│   │   ├── _post-nav.scss
│   │   └── _ai-widget.scss
│   └── pages/               ← Scoped overrides via body.page--{name}
│       ├── _home.scss
│       ├── _about.scss
│       ├── _technology.scss
│       ├── _blog.scss
│       └── _subscribe.scss
│
├── assets/
│   ├── css/                 ← main.css compiled here at build time
│   ├── js/
│   │   ├── nav.js           ← Global nav: active state, scroll sync, a11y
│   │   └── ai-widget.js     ← AI chat logic (opt-in)
│   └── images/              ← Static images
│
├── _pages/                  ← Content pages (output as /slug/)
│   ├── about.md
│   ├── technology.md
│   ├── blog.md
│   └── subscribe.md
│
├── _posts/                  ← Blog posts (YYYY-MM-DD-title.md)
│   └── 2026-04-20-return-of-the-static-web.md
│
└── index.html               ← Home page
```

---

## Adding a New Page

1. **Create the content file** in `_pages/`:

```markdown
---
layout: page
title: Contracts
name: contracts
eyebrow: "Law & Agreements"
title_html: "The rules of the <em>game</em>."
description: Plain-language breakdowns of digital law.
permalink: /contracts/
---

Your Markdown content here.
```

2. **Add it to navigation** in `_data/navigation.yml`:

```yaml
- title: Contracts
  url: /contracts/
  id: contracts
  children:
    - title: Digital Law
      url: /contracts/digital-law/
```

3. **Add page-specific styles** in `_sass/pages/_contracts.scss`:

```scss
.page--contracts {
  // Your scoped styles here
}
```

4. **Import the partial** in `_sass/main.scss`:

```scss
@use 'pages/contracts';
```

The body class `.page--contracts` is automatically set by `default.html`
using `page.name` from front-matter.

---

## Page-Specific Features (Front-Matter Options)

| Key         | Type    | Effect                                       |
|-------------|---------|----------------------------------------------|
| `page_css`  | string  | Path to an additional CSS file for this page |
| `page_js`   | string  | Path to an additional JS file for this page  |
| `ai_widget` | boolean | Show floating AI chat button                 |
| `show_hero` | boolean | Toggle the hero section (default: true)      |
| `body_class`| string  | Extra class appended to `<body>`             |

---

## Navigation

All menu items live in `_data/navigation.yml`.
Add children to any item to generate a CSS-only dropdown submenu —
no JavaScript required for hover; keyboard accessibility handled in `nav.js`.

---

## Deployment (GitHub Pages)

```yaml
# .github/workflows/pages.yml
name: Deploy Jekyll site

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      - run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```
