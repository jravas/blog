@AGENTS.md

## Claude-specific

Rules, skills, and guardrails are generated into `.claude/` from the
vendor-neutral sources in `llm/`. After creating or editing anything in
`llm/rules/`, `llm/skills/`, or `llm/packages.json`, run:

```bash
npx bluetemberg sync
```

`.claude/` is gitignored — it is reproducible from `llm/packages-lock.json` via
`npx bluetemberg install && npx bluetemberg sync`.
