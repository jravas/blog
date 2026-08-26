---
description: The visual system is locked — build to these tokens, use only the permitted signature moves, never the banned ones.
scope: '**/*.{astro,css,html}'
---

# Locked visual system

The direction is **a personal instrument panel for essays**: huge Newsreader display type, everything countable in JetBrains Mono, hairlines instead of boxes, one owned accent. It is locked. Drift gets corrected against this rule — not re-argued mid-edit.

## Tokens — restate these in every refinement

The only hex in `src/` lives in the `:root` block of `src/styles/global.css`. Never introduce a colour outside it, and never use a raw hex in a component.

```css
--bg: #272729;
--bg-deep: #1e1e20;
--code-bg: #1a1a1c;
--ink: #e8e8ef;
--ink-bright: #fcfcff;
--muted: #b2b2bb;
--faint: #6a6a6e;
--rule: rgba(255, 255, 255, 0.08);
--rule-strong: #575763;
--accent: #926aa6;
--accent-ink: #c0a0d4; /* Amethyst Orchid, PANTONE 17-3628 */
--serif: 'Newsreader';
--mono: 'JetBrains Mono';
--measure: 66ch;
--container: 820px;
--leading: 1.6;
```

Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`. Nothing off-scale.

**Dark only.** No light theme, no toggle, no `prefers-color-scheme` fork.

## Colour is semantic

| Token          | Means                                                   | Contrast on `--bg`                          |
| -------------- | ------------------------------------------------------- | ------------------------------------------- |
| `--accent`     | the claim — display italic clauses, 2px rules, fills    | **3.43 : 1** — large text and non-text only |
| `--accent-ink` | anything small that must be read — links, eyebrows, `$` | 6.55 : 1                                    |
| `--ink`        | prose                                                   | 12.23 : 1                                   |
| `--ink-bright` | headings only, one luminance step above prose           | 14.56 : 1                                   |
| `--muted`      | metadata and secondary prose                            | 7.08 : 1                                    |
| `--faint`      | ornament only — never load-bearing text                 | 2.77 : 1                                    |

`--accent` clears the 3:1 bar for large text and UI components and **nothing else**. Never put it on body-size text. When a token changes, recompute these ratios against the computed colour and update this table in the same commit.

## Type

Two families, no third. **Newsreader is never bold** — headings sit at 400–500, `<strong>` is 500, and emphasis is _italic + accent_, never weight. Every numeral, date, tag, label, nav item, and path is JetBrains Mono with `font-variant-numeric: tabular-nums`.

## Permitted signature moves — the whole inventory

1. Mono uppercase tracked eyebrow (11px, +0.14em)
2. Roman line + italic clause in `--accent` (the family signature)
3. Manifest line — `2026-08-25 · supply-chain, agents · 5 min`
4. Mono badge chips — label + boxed value, 1px `--rule`, radius 0
5. Hairline ledger — the post list, reads like a lockfile
6. Terminal block — `--bg-deep`, `$` in `--accent-ink`, only for real commands
7. Glyph inventory — `· → /` and JetBrains Mono's own characters

A new move enters this list by editing this rule, not ad hoc at midnight.

## Banned moves — hard constraints

- No light theme. No `border-radius` anywhere — `0` globally, including anything a new component adds.
- No gradients, glows, drop shadows, or glassmorphism.
- No cards. Structure is hairlines and space.
- No centred text — everything flush left.
- No hero illustrations, avatars, icon sets, or emoji.
- No animations, transitions on layout, or scroll effects. Colour-shift hovers only.
- No third font family. No webfont CDN.
- No blue as an accent; no second accent colour.
- No pill-shaped or filled buttons; no full-width hero with centred headline + two CTAs.
- Copy: no "Oops!", no "seamless", no exclamation marks.

Re-read this list before accepting any generated UI — bans fade from context as a conversation grows.
