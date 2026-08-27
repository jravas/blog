---
description: Verify every external reference before publishing — links resolve, quotes are exact, attributions are correct, and nothing is cited from memory.
scope: 'src/content/**/*.md'
---

# Reference integrity

Check every external reference against the actual source before the post goes out. Nothing gets cited from memory.

**Why:** a broken link or a misquote is the cheapest possible way to lose a technical reader, because it is the one error they can verify in a second and without expertise. It also compounds: a reader who finds one link pointing at something other than what the sentence claimed will stop trusting the claims they cannot check, which are the ones the essay is actually for.

Fabricated citations are the specific failure mode of AI-assisted drafting. A plausible-looking reference to a real project, with a real-sounding path, that does not exist, is worse than no reference.

## Rules

- **Fetch every link before publishing.** Not the domain, the exact URL. A 404, a redirect to a homepage, or a page whose content no longer matches the sentence all count as broken.
- **The link text must describe what is actually there.** If the sentence says a tool signs its metadata, the link goes to the page showing that, not to the repository root.
- **Quotes are exact, short, and attributed.** Copy them from the source, never retype from memory. If you cannot find the exact wording, paraphrase openly and drop the quotation marks.
- **Never cite a source you have not opened.** No inferring a document's contents from its title, its URL shape, or from another article's summary of it.
- **Verify names and versions against the source.** Project names, file paths, flag names, version numbers, and people's names. Spelling a tool's name wrong signals you did not use it.
- **Prefer a permalink for anything that moves.** A line reference in code needs a commit SHA, not `main`, because `main` will drift and the line will point somewhere absurd.
- **Cite the primary source.** Link the specification, the changelog entry, or the commit, not a blog post summarising it.
- **Link sparingly.** The published essay carries one external link. A reference earns its place by being the evidence for a specific claim.
- **Never invent a statistic and attribute it to research.** If no source exists, either report your own measurement as your own, or cut the claim. See `claim-evidence`.

## BAD

```md
As [the npm documentation notes](https://docs.npmjs.com/registry-signatures),
package signatures have been mandatory since npm 9, and [research shows](https://example.com/study)
that 73% of teams never verify them.
```

Two failures in one sentence. The first link's path is invented and the claim about npm 9 is asserted without being checked against the actual changelog. The second is a fabricated statistic dressed as research, with a placeholder URL that no one caught.

## GOOD

```md
We wrote [Bluetemberg](https://github.com/prototypdigital/bluetemberg)
because we needed this internally.
```

One link, it resolves, the link text is the project's real name, and it points at the thing being discussed rather than at a claim about it.

For a claim about behaviour, cite the code at a fixed point:

```md
The client refuses to install a package with no integrity hash in registry
metadata ([`installer.ts`](https://github.com/prototypdigital/bluetemberg/blob/29c4930/src/registry/installer.ts#L150)).
```

## Gotchas

- **Check links again at publication**, not only when drafting. Drafts sit for weeks and pages move.
- **A redirect is a smell.** It usually means the content was reorganised and may no longer say what you cited.
- **Archive anything load-bearing and unstable.** If a claim rests on a page that could disappear, keep a copy and say what it said.
- **Cross-posts inherit your links.** A relative link that works here breaks on a company blog. Use absolute URLs for anything a cross-post will carry.
- **Verify with a command rather than by eye:**

```bash
grep -oh 'https\?://[^)"[:space:]]*' src/content/blog/*.md | sort -u |
  while read -r u; do
    printf '%s %s\n' "$(curl -o /dev/null -sw '%{http_code}' -L --max-time 10 "$u")" "$u"
  done
```
