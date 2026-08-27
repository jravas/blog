---
description: State plainly what you do not know, include the evidence that works against you, and never imply an incident you cannot cite.
scope: 'src/content/**/*.md'
---

# The honest gap

Say what you do not know, in the same voice you use for what you do.

**Why:** this is the highest-trust move available to a technical essay and almost nobody makes it. A piece that names its own limits reads as written by someone who checked; a piece with no visible limits reads as written by someone selling. The published essay does this three separate times, and those three passages are why the rest of it is believable.

It is also the difference between a security argument and a scare. "Nothing in your pipeline would flag it" is a claim about a mechanism and it is checkable. "This has probably already happened to you" is a claim about the world with no evidence behind it.

## Rules

- **Name the thing you do not know, explicitly.** Not a hedge word buried in a clause. A sentence: "I am not claiming there has been an incident. I do not know of one."
- **Argue the mechanism, not the anecdote you lack.** Describe what would happen and what would fail to catch it. That argument survives having no incident to point at.
- **Include the evidence against your own position.** If your own repos have the problem you are describing, say so in the essay, not in a footnote.
- **Mark live states as live.** "as of this writing", "as I write this" — the essay outlives the condition it describes, and a reader six months later needs to know which is which.
- **Concede the strongest objection in its own section**, stated as its owner would state it, before answering it. Do not answer a weakened version.
- **Hedge the conclusion, never the evidence.** The measurement is firm. What it implies is where uncertainty belongs.
- **Never claim consensus, urgency, or inevitability** as a substitute for evidence. No "it is only a matter of time".

## BAD

```md
This is a serious and widely underestimated supply-chain risk. Attackers are
almost certainly already exploiting rule files, and most teams have no idea.
It is only a matter of time before a major breach traces back to a
`.cursor/rules/` directory.
```

Three assertions about the world with nothing behind them, and the vagueness is doing the persuading. A reader who asks "how do you know?" gets no answer, which retroactively weakens the parts of the essay that were solid.

## GOOD

```md
I am not claiming there has been an incident. I do not know of one. What
I know is that if a rule in a repo you copied from were edited tomorrow to
say something quietly wrong, or quietly hostile, nothing in your pipeline
would flag it. There is no hash to compare. There is no version you pinned.
```

And, on the same page, the evidence against the author:

```md
That middleware claim should carry a version range, and as of this writing
it does not.
```

The first passage separates what is known from what is not and argues the mechanism. The second concedes that the author's own product has the flaw the essay describes. That admission is the most persuasive sentence in the piece.

## Gotchas

- **A limitations section at the end is not this.** The concession belongs where the claim is made, so a reader cannot absorb the claim without it.
- **Do not over-hedge.** A firm measurement stated tentatively is its own kind of dishonesty, and a piece hedged everywhere says nothing. Hedge once, precisely, where the uncertainty actually is.
- **"We found it while writing this essay" is a real sentence and it is allowed.** Discovering your own counter-example during drafting is worth reporting, not worth hiding.
- **Never soften a concession into a strength.** "This is an area we are actively investing in" is marketing. "As of this writing it does not" is a fact.
