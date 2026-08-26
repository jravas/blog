---
description: This site is the origin of record — one home for the domain, canonical on every page, drafts never reach production.
scope: '**'
---

# Canonical first

This site exists to be the **origin of record** for essays that get cross-posted elsewhere. Every published piece must be reachable at a stable URL here, and must claim itself as canonical. Breaking that breaks the only reason the site exists.

## One home for the domain

`SITE_URL` in `src/consts.ts` is the single source of truth. It feeds `site` in `astro.config.mjs`, which feeds canonical tags, OG tags, RSS, and the sitemap.

- Never hardcode `https://jravas.dev` anywhere in `src/`.
- `public/robots.txt` carries the sitemap URL and is the one unavoidable duplicate — when `SITE_URL` changes, change `robots.txt` in the same commit.
- `public/CNAME` likewise pins the custom domain for Pages; keep it aligned.

## Canonical rules

- Every page emits exactly one `<link rel="canonical">`.
- Posts default to their own URL on this site. This is the normal case and needs no frontmatter.
- `canonicalURL` in frontmatter is **only** for a piece published somewhere else first. It is not for cross-posts — a cross-post carries the canonical pointing _here_, and nothing changes on this side.
- Never add `canonicalURL` to a post just because it also appears on a company blog. That inverts the entire arrangement.

## Drafts never reach production

`draft: true` must be filtered on `import.meta.env.PROD` in every list query _and_ in `getStaticPaths`, so a draft page is never built in production — not on the homepage, not in `/rss.xml`, not in the sitemap, and not at its own URL.

When adding any new query over the blog collection, apply the draft filter. A new listing that forgets it silently publishes drafts.

## Why it matters

An essay that loses its canonical claim gets outranked by its own cross-post. A draft that leaks gets indexed and submitted before it is finished. Both are unrecoverable in the way that matters — the aggregator link is already out.
