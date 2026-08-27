---
description: The built output ships no client-side JavaScript; this is an invariant, not a preference.
scope: '**/*.{astro,ts,js,mjs,json}'
---

# Zero client-side JS

The production build ships **no JavaScript to the browser**. Not "very little" — none. This is the site's load-bearing constraint: it is why first paint is instant, why there is no hydration cost, and why the whole category of client-side bugs does not exist here.

## Rules

- Never add a UI framework integration (`@astrojs/react`, `@astrojs/svelte`, `@astrojs/vue`, …). There is no framework here and none is coming.
- Never use a `client:*` directive on an Astro component. If a feature seems to need one, the feature is wrong for this site — say so instead of hydrating.
- Never add a `<script>` tag to a layout, page, or component. No analytics snippet, no theme toggle, no copy-to-clipboard button, no scroll effects.
- Syntax highlighting happens at build time (Shiki). Never introduce a client-side highlighter.
- Fonts are self-hosted `woff2` from `public/fonts/`. Never add a CDN link, a font loader, or `next/font`-style runtime injection.

## Verification

After any change to a layout, page, or component, confirm the invariant still holds:

```bash
pnpm build && grep -rl "<script" dist/ || echo "clean: no script tags in output"
```

An inline `<script type="application/ld+json">` block is data, not JavaScript, and is the single permitted exception.

## Why it matters

An invariant that is only _mostly_ true is not an invariant — it is a habit, and habits drift one convenient exception at a time. The first `client:load` is the one that ends the property.
