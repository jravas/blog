---
description: A published essay is a public record — correct it visibly, reserve updatedDate for changes to the argument, and never rewrite its history.
scope: 'src/content/**/*.md'
---

# Post corrections

Once an essay is published and submitted somewhere, its text is a public record. Correct it in the open or not at all.

**Why:** every post on this site links to its own per-file commit log, and `REPO_URL` in `src/consts.ts` calls that "walking the talk of the provenance essay". That link is a promise: the full edit history of any claim is one click away. A silent edit does not just break the promise, it breaks it in the most visible possible place, on a site whose argument is that unversioned prose steering a process is a hazard.

There is also a practical reason. A reader who acted on a number, or who linked to the essay from somewhere else, needs to be able to see that the number changed.

## Rules

- **`updatedDate` is for changes to the argument.** A number, a recommendation, a conclusion, a version claim, a correction of fact. Set it, and the post's meta line renders `updated <date>` and the page emits `article:modified_time`.
- **`updatedDate` is not for typos, formatting, re-wrapping, or link fixes.** Bumping it for spelling trains readers to ignore it, which costs you the one signal that matters.
- **The commit message is the correction log.** It is publicly linked from the post itself, so write it for a reader who followed the link: what changed, and why. Not "fix typo" on a commit that revised a figure.
- **A correction after the piece was submitted to an aggregator gets a visible note in the prose**, not only a date bump. Someone is reading a cached or archived copy.
- **Never delete a claim that was wrong.** Correct it and leave the correction legible. Deletion reads as concealment when the history is public.
- **Never rewrite history on a published post's file.** No force-push, no rebase that rewrites commits touching `src/content/blog/`. The `commits/main/<file>` link the post carries would then point at a fabricated past.
- **A substantive correction is its own commit.** Do not bury a revised figure inside a design change or a dependency bump.

## BAD

```bash
# quietly change a headline figure, in a commit that hides it
$ sed -i '' 's/2,396 tests/1,204 tests/' src/content/blog/some-essay.md
$ git commit -am "chore: content tweaks and formatting"
```

No `updatedDate`, a commit message that conceals the change, and it rides along with unrelated edits. The edit history link now shows a reader a figure that changed under a message claiming it did not.

## GOOD

```yaml
---
title: 'Your AI coding rules are an unsigned dependency'
pubDate: 2026-08-25
updatedDate: 2026-09-12
---
```

```bash
$ git commit -m "essay: correct test count from 2,396 to 1,204

The original figure counted assertions, not test cases. Re-ran the suite
and took the reported case count. The conclusion is unchanged: the tests
are strong and nothing triggers them."
```

And in the prose, where the claim lives:

```md
**Correction, 2026-09-12.** This originally read 2,396 tests. That figure
counted assertions rather than cases. The real count is 1,204.
```

The date bump signals it, the commit explains it to whoever follows the history link, and the prose tells a reader of an archived copy what moved.

## Gotchas

- **Drafts are exempt.** Before `draft: false`, edit freely. The record starts at publication.
- **A `pubDate` is never edited** to make a piece look fresher. It is the date of record.
- **Re-wrapping a paragraph produces a large diff** that buries a one-word fix. Wrap and fix in separate commits so the history link stays readable.
- **If a correction changes the title or the conclusion, it may be a new piece.** Consider whether the honest move is a new essay linking back rather than an edit that rewrites what people already read.
