---
title: 'Your AI coding rules are an unsigned dependency'
description: 'Every team using coding agents now ships a set of rule files that steer them. Those files have no version, no checksum, and no owner. Here is what that costs, and what it would take to fix.'
pubDate: 2026-08-25
tags: ['supply-chain', 'agents', 'ci-cd']
---

Every team I know running Cursor, Claude Code or Copilot has some version
of the same set of files. `AGENTS.md` at the root. A `.cursor/rules/`
directory. `CLAUDE.md`. Maybe `.github/instructions/` if they are on
Copilot. Different names, same job: tell the agent how we work here.

We have about ten repos at a 35 person shop, and all of them have these
files.

Now go look at how those files got there. For us, for a long time: one
person wrote a good one, somebody else copied it into their repo, and
then both copies drifted. That was the entire distribution mechanism.
Copy paste, a gist, or a Slack message that said "use this one".

These files change the behaviour of a program that writes code, reads
your filesystem and runs shell commands. They are also the only input to
that process with no version, no checksum and no owner.

## What they are missing

|            | npm package                     | rules file                    |
| ---------- | ------------------------------- | ----------------------------- |
| Version    | semver                          | git history, if you are lucky |
| Locking    | lockfile                        | no                            |
| Integrity  | hash in the lockfile            | no                            |
| Provenance | registry, signatures            | no                            |
| Scope      | dependencies vs devDependencies | everyone gets everything      |
| Rollback   | `npm i pkg@1.2.3`               | no                            |

We spent fifteen years getting those properties for JavaScript
dependencies. Lockfiles, integrity hashes, provenance, `npm audit`. Then
we introduced a new input that steers the thing writing the code, and
shipped it as a markdown file somebody pasted in.

## How it actually breaks

None of this is hypothetical. Here is what we hit.

**Drift.** Two repos have copies of the same rules. Six months later
they are not the same file, and nobody knows which one is current. The
agent behaves differently in each repo. It reads like model
nondeterminism. It is not. It is a diff nobody looked at.

**Version mismatch.** This is the one I care about most and see
discussed least. We migrated a project from Payload 2 to Payload 3, and
our rules still had Payload 2 patterns in them. A stale rule does not
make the agent uninformed. It makes it confidently wrong. It generates
code against an API that no longer exists, in exactly the same tone it
uses when it is right. A human reading old documentation sees the
version at the top of the page. The agent has no version to see.

The general shape: a rule is only correct for a range of framework
versions, and nothing anywhere expresses that range.

**Onboarding.** New developer clones a repo and gets whatever rules
existed the last time somebody copied them by hand. Which might have
been March.

**No bisect.** Agent output gets worse over a month. Did the model
change? Did somebody edit a rule? Did a rule get pasted in from another
repo? You cannot answer any of that, because there is no version to
compare against and no changelog to read.

**Roles.** Every engineer gets every rule. Our backend people receive
frontend accessibility rules they will never use. That is not a security
problem, it is a context budget problem, and it makes the rules that do
matter harder to weight.

## The part I find uncomfortable

A rules file is not documentation. It is configuration that steers a
process with filesystem access and a shell.

That puts it closer to a build script than a README, and we treat it
like a README.

People pull rules from public collections. awesome-cursorrules,
cursor.directory, gists, blog posts. The instinct is good, sharing what
works is how any of this improves. But look at the mechanism: curl a
file written by a stranger into a directory that instructs your agent.

I am not claiming there has been an incident. I do not know of one. What
I know is that if a rule in a repo you copied from were edited tomorrow
to say something quietly wrong, or quietly hostile, nothing in your
pipeline would flag it. There is no hash to compare. There is no version
you pinned. Most teams would not notice for months, because nobody
reviews a markdown file the way they review a dependency bump.

That gap is not exotic. It is the gap npm had before lockfiles, and we
know how that one went.

## What it would take

None of this is novel. It is what we already do for every other
dependency.

**Versions and a lockfile.** Rules get semver. You depend on a range,
the resolution gets locked, installs are reproducible. The file format
does not matter. The property does.

**Integrity.** A hash in the lockfile, verified on every install. If the
content changed, the install fails.

**Provenance.** The registry signs its metadata. The client pins the
registry host, so a compromised metadata response cannot redirect the
download somewhere else. This is the boring part, and it is the part
that actually matters.

**Scope.** A backend engineer does not receive frontend rules. A rule
written for Payload 2 does not reach a Payload 3 repo. Detect the stack
from `node_modules`, fall back to the lockfile, fall back to
`package.json`, route accordingly.

**An upgrade path.** An `update` command, a changelog, and the ability
to go back to the version from before things got worse.

## About AGENTS.md

The obvious objection is that this is already being solved. Cursor,
Claude, Copilot and Codex are converging on `AGENTS.md`. One file, every
tool reads it.

Good. That solves the format. It does not solve distribution.

A shared file still has no version, no signature, no scoping and no
rollback. Everyone agreeing to read the same filename tells you nothing
about which copy of that file you have, where it came from, or whether
it is correct for the framework version in this repo.

Format was the easier problem. It got solved first because it was the
one that hurt immediately.

## What we built

We wrote [Bluetemberg](https://github.com/prototypdigital/bluetemberg)
because we needed this internally. Rule packs published to npm, resolved
through a lockfile, verified with SHA-512 and ECDSA registry signatures,
routed by role and by detected stack version, emitted to whichever agent
format a given repo uses. It is early, and it is one answer rather than
the answer.

The requirements above matter more than the tool. If you solve them a
different way, I would like to read about it.
