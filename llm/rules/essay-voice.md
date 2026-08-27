---
description: Essays are measured field reports — plain declaratives, no contractions, no em-dashes, no hype, hard-wrapped prose.
scope: 'src/content/**/*.md'
---

# Essay voice

Write like someone reporting measurements, not someone selling a conclusion.

**Why:** a reader arriving from an aggregator decides in two paragraphs whether this is a person with evidence or a person with opinions, and the register decides it before the content gets a chance to. The published voice on this site is unusually consistent, and that consistency does work: it is what makes the numbers credible. An edit in a looser register does not read as a different sentence, it reads as a different author, and it costs the whole piece some trust.

The constraints below are measured from the published essay, so matching them is a mechanical check rather than a matter of taste.

## Rules

Measured across 97 sentences of published prose:

- **No contractions.** Zero in the corpus. Write `do not`, `cannot`, `it is`, `would not`. Possessives like `Next 15's` are fine, those are not contractions.
- **No em-dashes.** Zero in the corpus. Use a full stop, a comma, or restructure. This is the single easiest tell that a paragraph was not written here.
- **No semicolons.** Zero in the corpus. Write two sentences.
- **No exclamation marks.** Zero, and none are coming.
- **Short sentences.** Median 11 words. If a sentence passes about 35 words, split it.
- **Short paragraphs.** Average 3.7 lines. A paragraph running past six lines is usually two ideas.
- **Bold lead-ins for enumerated points** rather than bullet lists, when each point needs a sentence or more: `**Version mismatch.** This is the one I care about most.`
- **Questions only as enumerated evidence**, never as a section opener. `Did the model change? Did somebody edit a rule?` works, because those are the actual unanswerable questions. "So what does this mean for your team?" does not.
- **Banned vocabulary:** revolutionary, game-changing, seamless, supercharge, unlock, leverage as a verb, dive in, delve, in today's landscape, it is worth noting.
- **First person is precise.** `we` for what the team actually did, `I` for a stance or a judgement. Never `we` to soften a personal opinion.
- **Preserve the hard wrap.** Prose is hand-wrapped at roughly 72 characters, median 68 and max 80. Prettier does not reflow it: `printWidth` is 100 and `proseWrap` is left at `preserve`, so the wrap is yours to maintain. Re-wrap only the paragraph you edited and leave every other line untouched, or the diff becomes unreviewable.

## BAD

```md
We've been thinking a lot about AI rules lately — and honestly, the results
have been eye-opening! Rules files are a game-changer for agentic development;
they let you leverage your team's collective knowledge seamlessly. So what does this mean for your team? Let's dive in.
```

Contractions, an em-dash, an exclamation mark, a semicolon, three banned words, a rhetorical opener, and a 24-word sentence doing no work. Unwrapped as well.

## GOOD

```md
Every team I know running Cursor, Claude Code or Copilot has some version
of the same set of files. `AGENTS.md` at the root. A `.cursor/rules/`
directory. `CLAUDE.md`. Different names, same job: tell the agent how we
work here.

**Version mismatch.** This is the one I care about most and see discussed
least.
```

Plain declaratives. Real product names. A concrete list before any claim. The bold lead-in carries the emphasis that a bold adjective would have faked.

## Gotchas

- **Headings are claims, not topics.** "How it actually breaks" beats "Challenges". "The part I find uncomfortable" beats "Considerations".
- **Open with a scene and land the thesis a few paragraphs in.** The published essay opens on a concrete situation and does not state its argument until the reader recognises that situation.
- **Close with what it would take, or with an open question.** Never with a summary of what was just read. The published essay ends by inviting a different answer.
- **Analogies are load-bearing or absent.** One precise comparison, "it is the gap npm had before lockfiles", beats three decorative ones.
- **Em-dashes leak in from AI-assisted drafting more than from anywhere else.** Check before committing:

```bash
grep -n "—\|;\|!" src/content/blog/*.md
```
