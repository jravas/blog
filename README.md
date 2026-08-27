# blog

Personal writing site for Josip Ravas. Astro, zero client-side JavaScript,
self-hosted fonts (Newsreader + JetBrains Mono, latin subset), one global
stylesheet, dark only. Design system is locked in issue #3. Deployed on
GitHub Pages at [jravas.dev](https://jravas.dev).

## Run locally

Requires Node ≥ 22 and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:4321 — drafts are visible here
pnpm build      # production build into dist/ — drafts excluded
pnpm preview    # serve the production build locally
pnpm check      # type-check (astro check)
pnpm format     # prettier
```

## Add a post

Create a Markdown file in `src/content/blog/`. The filename is the slug —
kebab-case, no date prefix:

```
src/content/blog/ai-rules-unsigned-dependency.md  →  /writing/ai-rules-unsigned-dependency/
```

Frontmatter:

```yaml
---
title: 'Post title'
description: 'One or two sentences. Used for <meta name="description"> and Open Graph.'
pubDate: 2026-09-09
updatedDate: 2026-09-12 # optional — shown in the metadata line, emits article:modified_time
tags: [supply-chain, agents] # optional, default []
draft: true # optional, default false — see below
canonicalURL: https://… # optional — see "Cross-posting" below
---
```

| Field          | Required | What it does                                                            |
| -------------- | -------- | ----------------------------------------------------------------------- |
| `title`        | yes      | Page `<h1>`, `<title>`, OG title                                        |
| `description`  | yes      | Meta description, OG description, RSS item description                  |
| `pubDate`      | yes      | Shown in the metadata line, sets sort order, `article:published_time`   |
| `updatedDate`  | no       | Adds `updated …` to the metadata line, emits `article:modified_time`    |
| `tags`         | no       | Shown in the post's metadata line (`2026-09-09 · supply-chain · 8 min`) |
| `draft`        | no       | `true` hides the post from the homepage, RSS, and sitemap in production |
| `canonicalURL` | no       | Overrides the canonical URL — only for pieces published elsewhere first |

Reading time is computed from word count at 220 wpm; you don't set it.

## Edit history

Every post's footer links to its per-file commit log on GitHub — the full,
unedited record of every change, typo fixes included. That link needs no
maintenance; it always reflects `main`. Set `updatedDate` by hand only when
an edit changes the substance of the piece — it is the curated "this post
was revised" signal, not a mirror of the git log.

## Publish a draft

Drafts (`draft: true`) build in `pnpm dev` so you can preview them at their
real URL, but they are excluded from the production build entirely — not on
the homepage, not in `/rss.xml`, not in the sitemap, and the page itself is
never generated.

To publish: set `draft: false` (or delete the line), commit, push to `main`.
Cloudflare Pages deploys on push.

## Cross-posting and canonical URLs

This site is the origin of record. Every post emits
`<link rel="canonical">` pointing at its own URL here — so when a post is
cross-posted to a company blog, **the cross-post** should carry
`rel="canonical"` pointing back at this site. You don't change anything here
for that case.

Set `canonicalURL` in frontmatter **only** for the rare piece that was
published somewhere else first:

```yaml
canonicalURL: https://other-site.example/original-post/
```

That makes this site's copy point at the original instead of claiming to be
it.

## Domain

The domain is `https://jravas.dev`. It lives in exactly one place:
`SITE_URL` in `src/consts.ts` (consumed by `astro.config.mjs`, which feeds
the canonical tags, OG tags, RSS, and sitemap). `public/robots.txt` carries
the sitemap URL and must be updated alongside it.

## Deploy

GitHub Pages, via `.github/workflows/deploy.yml`:

- Every push to `main` builds with pnpm and publishes `dist/` through
  `actions/deploy-pages`
- All workflow actions are pinned by commit digest — update them by bumping
  the SHA and the version comment together
- `public/CNAME` sets the custom domain (`jravas.dev`); the Pages source in
  repo settings is "GitHub Actions"

DNS (at the registrar): apex `A` records to GitHub Pages' IPs
(`185.199.108.153` … `185.199.111.153`) and a `www` CNAME to
`jravas.github.io`, with "Enforce HTTPS" enabled in the Pages settings.
