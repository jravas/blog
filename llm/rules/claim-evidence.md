---
description: Every factual claim in an essay carries its basis — a date, a version, a real error string, or an explicit label saying it is not measured.
scope: 'src/content/**/*.md'
---

# Claim evidence

A number or a factual claim reaches a published essay with its basis attached, or it does not reach the essay.

**Why:** this site's whole proposition is that the author measures things. One unsourced figure that a reader can neither check nor place undermines every figure around it, including the ones that were carefully derived. The failure is asymmetric: a claim with its basis attached costs a clause, and a claim caught without one costs the piece.

The published essay is the standard. Its incidents carry months, its errors carry the literal string, its file names are backticked and real, and its scope is stated: "we have about ten repos at a 28 person shop".

## Rules

- **Date every incident.** "In February we upgraded our largest Next.js project from 15 to 16" beats "recently we upgraded". A month is usually enough; a day when order matters.
- **Name versions on both sides of a change.** `15 to 16`, `middleware.ts` to `proxy.ts`. A claim about a framework is only true for a version range, and the range is part of the claim.
- **Quote real error strings verbatim**, in backticks: `Cannot find module 'node:crypto'`. Never paraphrase an error, and never reconstruct one from memory.
- **State the sample.** "Ten repos at a 28 person shop" tells the reader the weight to give it. An unscoped "teams find that…" claims a survey that does not exist.
- **Separate measured from inferred, in the sentence where the number appears.** If a figure is a proxy, say so and say which direction it is likely wrong in.
- **Never invent, round, or smooth a figure** to make a point land better. A real number that is less tidy is worth more than a tidy one that is false.
- **One incident is one incident.** Do not promote a single event to a pattern with words like "always", "every team", or "consistently".
- **Link sparingly and only where the link is the evidence.** The published essay carries exactly one external link. A paragraph of links reads like padding.

## BAD

```md
Teams using AI coding rules see significant drift over time — studies show
most repos have inconsistent rule files within months, and upgrading
frameworks usually breaks them.
```

"Significant", "studies show", "most repos", "usually" — four claims, no basis for any of them, and an appeal to research that is not cited because it does not exist.

## GOOD

```md
In February we upgraded our largest Next.js project from 15 to 16. Two
hours after the upgrade commit, the first agent rule ever added to that
repo went in, describing `middleware.ts`, the file Next 16 had just
replaced with `proxy.ts`. In May the mismatch stopped being theoretical.
Turbopack bundled our Redis cache handler into the shared edge chunk that
middleware pulls in, and the app died at runtime with
`Cannot find module 'node:crypto'`.
```

Dated, versioned, the real file names, the literal error, and one repo rather than an implied industry.

## Gotchas

- **A claim you cannot re-derive at publication time is a liability**, not a shortcut. If the analysis that produced a number is gone, either re-run it or cut the number.
- **Numbers in prose go stale.** A figure describing a live state ("four suites currently fail") needs "as of this writing" or a date, because the essay outlives the state it describes.
- **Beware the second-order mistake:** correcting a vague claim with a real measurement, then over-generalising that measurement to cases you never measured. Two repos measured does not license a claim about ten.
- **Own-data is n=1 and should read that way.** Reporting it in the register of published research is the most common way an honest essay becomes a dishonest one.
