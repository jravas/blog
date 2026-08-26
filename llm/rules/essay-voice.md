---
description: Essays are measured field reports — dated incidents, real numbers, no hype register.
scope: 'src/content/**/*.md'
---

# Essay voice

The posts here are field reports from someone who measures things. A reader arriving from Hacker News decides in two paragraphs whether this is a person with evidence or a person with opinions. Everything below serves that.

## Register

- **Report, do not sell.** State what happened, when, and what it cost. No "revolutionary", "game-changing", "seamless", "supercharge", "unlock", "leverage".
- **No exclamation marks.** No rhetorical questions used as section openers. No "Let's dive in."
- Plain declarative sentences. Prefer the shorter word. Cut every adverb that is doing emotional work rather than factual work.
- First person singular for things actually done; "we" only for things the team actually did.

## Evidence

- **Date every incident.** "In February we upgraded from 15 to 16" beats "recently we upgraded".
- **Real numbers or none.** Specific counts, versions, durations, error strings. Never invent a statistic to make a point land, and never round a real one into a rounder-sounding one.
- Name the real error (`Cannot find module 'node:crypto'`), the real file (`middleware.ts` → `proxy.ts`), the real version.
- If a claim comes from one incident, say so. Do not generalise a single event into a trend.
- Never fabricate an anecdote, a benchmark, a quote, or a company detail. If an example is illustrative rather than lived, label it.

## Structure

- Open with the claim, not with context-setting. The first paragraph should be arguable.
- Tables for comparisons that have columns; prose otherwise. No table with one real row.
- `##` sections with concrete names — "How it actually breaks" beats "Discussion".
- Close with what it would take to fix, or what is still unresolved. Never with a summary of what was just read.

## Frontmatter

`title` is a claim, not a topic. `description` is one or two sentences that would make sense as the only thing a reader sees — it is the meta description, the OG description, and the RSS item description. Set `tags` from the existing vocabulary before inventing a new one.
