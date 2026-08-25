---
title: 'Pin your GitHub Actions by digest'
description: 'Version tags on GitHub Actions are mutable references. If you care about supply-chain integrity, pin by commit digest and let automation handle the updates.'
pubDate: 2026-08-25
tags: [supply-chain, ci]
---

Every `uses:` line in a GitHub Actions workflow is a dependency declaration, and most of them are written against a mutable reference. `actions/checkout@v4` does not mean "version 4" — it means "whatever commit the `v4` tag points at the moment the job starts." Tags can be moved. When one moves, every workflow that references it executes new code with the same permissions it always had: your repository contents, your secrets, your OIDC tokens.

This is not hypothetical. The `tj-actions/changed-files` compromise worked exactly this way: the attacker retagged existing version tags to a malicious commit, and thousands of workflows picked it up on their next run without a single line of their own config changing.

## What a digest pin actually guarantees

A commit SHA is a content address. Pinning to one changes the trust model:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8 # v5.0.0
      - uses: actions/setup-node@2028fbc5c25fe9cf00d9f06a71cc4710d4507903 # v6.0.0
        with:
          node-version: 22
```

The comment carries the human-readable version; the SHA carries the guarantee. Nobody can move a digest. The difference between the reference types is worth stating plainly:

| Reference         | Example    | Mutable | Who controls what runs  |
| ----------------- | ---------- | ------- | ----------------------- |
| Branch            | `@main`    | yes     | the action's maintainer |
| Major version tag | `@v4`      | yes     | the action's maintainer |
| Full version tag  | `@v4.2.2`  | yes     | anyone who can retag    |
| Commit digest     | `@08c6...` | no      | you                     |

Only the last row is an immutable reference. Everything above it is a standing invitation for someone else to change your CI behind your back.

## The objections, and why they don't hold

> "We'll fall behind on updates, and a stale action is its own risk."

True — a digest pin without automation is a freeze, not a policy. The answer is to let a bot propose the updates. Dependabot and Renovate both understand digest pins natively and will open PRs that bump the SHA _and_ the version comment together:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

Now updates arrive as reviewable diffs instead of silent tag moves. That is the entire point: the update still happens, but it happens _through_ your review process instead of around it.

### What about actions you trust?

Trust the maintainer all you want — the tag is not the maintainer. A compromised maintainer account, a compromised CI pipeline on the action's own repo, or a malicious co-maintainer can all move a tag. The digest pin costs you nothing once the automation is in place, so the trust question stops mattering.

## Rolling it out

1. Inventory every `uses:` line across your workflows — `grep -rh 'uses:' .github/workflows/` is enough to start.
2. Resolve each tag to its current commit SHA and rewrite the reference, keeping the version as a trailing comment. Tools like `pinact` or `frizbee` do this mechanically.
3. Add the Dependabot or Renovate config so pins never go stale.
4. Enforce it: a small lint step that fails the build on any non-SHA `uses:` reference keeps the policy from eroding one convenient shortcut at a time.

The whole migration is an afternoon for a mid-sized org, and it converts a class of silent supply-chain compromise into a class of reviewable pull request. That is about as good as trades get in this space.
