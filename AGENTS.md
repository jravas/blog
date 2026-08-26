# blog

Personal writing site for Josip Ravas. Astro, zero client-side JavaScript,
dark only. The site is the origin of record for essays that get cross-posted
elsewhere with `rel="canonical"` pointing back here.

Requires Node ≥ 22 and pnpm.

## Commands

```bash
pnpm dev            # http://localhost:4321 — drafts are visible here
pnpm build          # production build into dist/ — drafts excluded
pnpm preview        # serve the production build
pnpm check          # type-check (astro check)
pnpm format         # prettier
```

## AI config architecture

Source of truth for all AI tool configuration lives in `llm/`:

- `llm/packages.json` — installed rule/skill/guardrail packs, semver ranges
- `llm/packages-lock.json` — resolved versions, integrity hashes, signature key ids
- `llm/rules/` — rules specific to this site (see the note below)
- `llm/mcp.json` — MCP server presets

Run `npx bluetemberg install` on a fresh clone, then `npx bluetemberg sync` to
generate `.claude/`. Generated files are gitignored — never edit them, and never
edit them expecting the change to survive.

**Order matters:** `pnpm format` rewrites the Markdown in `llm/rules/`, which puts
`.claude/` out of date. Always format first, then sync — `npx bluetemberg sync --check`
verifies the two agree.

**The four rules in `llm/rules/` are local, unversioned files** — no semver, no
lockfile entry, no integrity hash. They are exactly the unsigned dependency
described in `src/content/blog/ai-rules-unsigned-dependency.md`. That is a known,
deliberate trade-off pending a decision on private pack distribution; see the PR
that introduced this directory.

## Boundaries

### Always

- Run `pnpm format` and `pnpm check` after editing source files
- Run `npx bluetemberg sync` after editing anything under `llm/` — after formatting
- Keep `SITE_URL` in `src/consts.ts` the only home for the domain
- Filter drafts on `import.meta.env.PROD` in every new blog-collection query
- Update the README in the same commit as any change to setup, scripts, or deploy

### Ask first

- Adding any dependency
- Adding a new signature move to the locked visual system, or changing a token
- Changing the deploy target or the domain

### Never

- Ship client-side JavaScript, a `client:*` directive, or a `<script>` tag
- Edit generated files under `.claude/`
- Push directly to `main`, or commit onto another open PR's branch
- Commit `.env` or secrets
