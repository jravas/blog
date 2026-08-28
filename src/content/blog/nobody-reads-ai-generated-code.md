---
title: 'Nobody reads AI-generated code because nobody can'
description: 'I measured nine weeks of working with a coding agent. Reading everything it wrote would have taken 23.4 hours a day. The specification did not vanish, it moved, and the half that checks the result was never built.'
pubDate: 2026-08-28
tags: ['agents', 'ci-cd', 'measurement']
---

In nine weeks I ran 77 sessions with a coding agent. It produced 18,267,471 output tokens. That is about 13.7 million words. The best available estimate for silent adult reading of English prose is 238 words per minute, from a meta-analysis of 190 studies with 18,573 participants ([Brysbaert, 2019](https://gwern.net/doc/psychology/linguistics/2019-brysbaert.pdf)). Divide, and reading all of it takes 959 hours. I worked on 41 of those days.

That is 23.4 hours of reading per active day. A day has 24.

The number is conservative in the direction that matters. Code reads slower than prose, so 238 words per minute flatters the result.

I want to be precise about what this does and does not prove. It does not prove the code was bad. It does not prove I shipped defects, and I went looking: the reliability signals available to me do not show a decline across this window. It proves one thing only, and it proves it by division: reading all of the output was never an option. Not for me, not for a more disciplined version of me. Every discussion I have watched about whether engineers should review AI output has been a discussion about a choice that arithmetic had already made.

## The reduced ambition fails too

The obvious answer is that nobody needs to read the model's prose, only the code that survives into a pull request. So I measured that.

Across three months I opened 293 pull requests and merged 234, adding 64,283 lines. The largest code review study I know of, [ten months at Cisco with SmartBear](https://static0.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf), 2,500 reviews and 3.2 million lines, recommends reviewing 200 to 400 lines at a sitting and finds that defect discovery measurably drops past 400. At their recommended rate of 300 lines per hour, my merged code alone needed 3.3 hours of review every working day, before I wrote anything, attended anything, or answered a page.

The distribution is the interesting part. 77.4% of my merged pull requests are under the 400 line ceiling and are therefore reviewable. They contain 22.5% of the code. The other 22.6% of pull requests carry 49,800 lines, which is 77.5% of everything I merged. I could have reviewed three quarters of my pull requests perfectly and still never have looked at three quarters of the code. That is not a discipline problem. It is a distribution.

The rest of that picture is what you would expect. 82.5% of my merged pull requests received zero review comments. 46% merged within 30 minutes, median time to merge 0.6 hours. Each of those is a defensible trade on its own. I made all three on the same pull requests for a quarter.

Here is the symmetric number, before anyone reads that as a complaint about colleagues. In the same window I reviewed 58 of the 1,786 pull requests other people opened, which is 3.2%, and 60% of those I approved with no body and no inline comment. The reviews I do write are real, 59,629 characters with changes requested on 12. So the point is not that my code went unreviewed. It is that I was doing the same thing, at the same time, on the same volume, and I only noticed when I counted.

This part is one engineer's data. Mine. It is illustration, not evidence.

## The specification did not vanish, it moved

If nobody reads the output, the question is where the intent went, because the work is clearly specified somewhere. It is not in the prompts.

The median prompt I typed to the model in that window is 48 characters. Eight words. 71.9% of my prompts are 15 words or shorter. Prompt engineering was never the skill, and my own transcripts are the evidence against it: on a median eight word instruction, only 1.8% of my prompts were corrections of the previous turn. That is one person's transcripts, and I hold it loosely for a reason. METR's randomised trial ([arXiv:2507.09089](https://arxiv.org/abs/2507.09089), 16 experienced developers, 246 tasks) found developers using AI believed they were 20% faster while the clock said they were 19% slower. Nothing about my data makes me immune to being wrong about my own work by 39 points.

The median GitHub issue body in the same window is 2,718 characters. About 453 words. That is 57 times the prompt. Across all 136 issues, not a sample, 66.2% exceed 2,000 characters and the shortest in the entire population is 507. The longest is 29,566 characters, a cache audit with ninety confirmed findings written before a single line was fixed.

An eight word prompt only works because a 453 word issue already exists.

That is the half the industry built, and it built it well. The specification became a durable artifact. It is linkable, reviewable, diffable, and readable by someone who was not in the room. My own configuration is 70 rules, 25 skills and 16 agents in a versioned directory, generated out into whatever dialect each assistant wants, with a drift check that fails the build if a generated file is edited instead of its source.

I have to volunteer one thing about that 57 times, because it is my own thesis eating itself. I assumed a human wrote those issue bodies. When I joined all 136 against the transcripts, about 42% of them were drafted by the model. The claim survives, because it was never a claim about authorship. The specification is in the issue, durable and reviewable, whoever typed it. But I now say "a 453 word issue exists", not "I wrote one", and I did not notice the difference until I measured it.

## The missing half

Here is the shape of what we built. Intent leaves a human head and becomes a durable artifact. A machine reads the artifact and produces code. The code merges.

Nothing in that sequence checks the result against the artifact.

Every part of the industry's tooling investment went into the first half, the half where intent becomes durable, and it worked. Almost none of it went into the second half, the half where something automated compares what came back to what was asked for. We have version-controlled rules and no test that a rule was followed. We have acceptance criteria in an issue and no runner that executes them. We have a pipeline, and the pipeline builds and deploys and caches, and it does not check.

A rule that nothing checks is a wiki. The distinction is not moral and it is not about diligence. It is that the industry has no step called "prove the control fires". We have a step for writing the control down, we have several for installing it, and we have none for demonstrating that it runs and that it can fail. Every control I am about to describe was configured correctly by every visible signal, by people shipping at volume under real deadlines. What was missing was never care.

## 2,667 tests and nothing that ran them

The proof is my own codebase, and it is the reason I can make this argument without pointing at anyone.

Two repositories in a rewrite that was not yet in production. I installed both and ran the suites. One holds 2,420 tests across 207 suites at roughly 86% statement coverage. The other holds 247 tests across 31 files. 2,667 tests between them, written by people who cared, most of them recently.

The number of CI jobs that executed any of them was zero. Both pull request gates built a Docker image and stopped. One of them declared 26 test scripts in its manifest and ran none of them in CI. Neither had a coverage gate. Of my 293 pull requests that quarter, 3 were tests, which is 1.0%.

At the moment I measured, seven spec files were failing on the main branch and nobody knew, because nothing was looking.

I expected to find months of rot. I found the opposite, and the opposite is a much better argument. Three of those failures were genuine divergences between what the code does and what it is supposed to do, and they were aged one day, one day and nine days. Two of them broke the day before I looked. Those tests were not rotting. They were working. They caught the code drifting from its intent three separate times, within days, and nothing was wired to listen.

And one of them had been failing since the commit that created the repository. 233 days. It has never passed, not once. It needs a database that the test configuration never provisions, so it failed on the day it arrived and every day after.

That is the finding I would put on a poster. Untriggered, there is no difference between a test that guards something and a test that never worked. Both sit in the repository looking exactly like coverage. The only thing separating them is an execution you never performed.

The fix was not a code change. It was a workflow file. The gates merged on 31 July 2026, and the first green run reported 202 suites and 2,205 tests in one repository, 29 files and 241 tests in the other.

## Two mistakes of my own, same class

I did not arrive at that finding cleanly, and the way I got it wrong is the same failure the essay is about.

**I measured a proxy instead of running the thing.** My first pass counted test files and divided by source files. It produced a low ratio, and I wrote down that the codebase barely had tests. That conclusion was wrong in a way that flattered my instrument: file counts are cheap and running a suite is not. When I actually installed both repositories and ran them, there were 2,667 tests at good coverage. The real finding was not test volume, it was test execution, which is a different and worse problem. I made exactly the mistake I accuse the industry of making, about my own codebase, in the document where I was accusing them of it.

Then I over-corrected. I generalised the measurement across repositories at different lifecycle stages, including one where "move fast now, harden before go live" was a legitimate description of the plan. Two mistakes in the same finding, in opposite directions, a week apart.

**I treated "the test is red" and "the thing the test guards is broken" as the same claim.** The example I had earmarked as the centrepiece was a regression test whose name records a real production bug: filenames containing a hash or a plus broke image delivery because a URL was interpolated raw. I found it red and called it a rotted regression test. It is not rotted. It passes the moment the environment variable naming the image domain is supplied. The test logic is correct and the fix it guards is intact. What is true about it is narrower and more interesting: no automated run has ever executed it. Same for another spec that loads a git-ignored local environment file and therefore cannot run in CI by construction.

Of the seven failing files, the distinct causes were three source and test divergences, one import graph break where a route pulled a config into a place a test runner could not resolve, and two environment gaps. Not seven rotting tests. I had collapsed three different causes into one word because red is a colour and I stopped there.

My own apparatus then manufactured two more failures. I ran one suite with a symlinked dependency directory, and because the package manager's store uses absolute paths, the symlink produced phantom module resolution errors indistinguishable from real ones. A clean install cleared them.

The pattern in all three is one sentence, and it is the one I would keep: an absence in the instrument is not an absence in the world. A file glob that cannot see a filename reports zero tests. A test runner with a broken install reports failures that do not exist. A red test reports that something is wrong without saying what. Each of those was caught by checking the instrument rather than the number, and never by the number looking suspicious, because the numbers all looked fine.

## Mechanism, not diligence

One more thing supports the same claim, and then the research does.

That system has a large end to end suite, hand written by a QA colleague, one spec per market per form. It runs against a deployed environment and files real records into a real CRM. It could not gate a pull request even if someone wired it up, because its design needs a deployed target and produces real side effects, so its only available trigger was a manual one. A manual trigger nobody presses is indistinguishable from no check at all, and that is not a failure of anyone's diligence. It is a control whose design excludes it from the only position where it fires on its own.

Three unrelated sources name the same gap. Two are maturity frameworks. [One](https://arxiv.org/abs/2604.09388) puts its next gate not at test existence but at the reliability of test execution, and the other reads a setup like mine as high autonomy with weak controls. The first is a single-author preprint with a sample size of one, the second is a vendor framework, and neither is settled science. The third is [DORA's 2025 report](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf), which at 90% AI adoption still finds throughput positively correlated and stability negatively correlated, and names strong automated testing and fast feedback loops as the mitigation. I am the case study in that report's warning section.

## What the second half has to do

The second half is not a culture change and not a transformation programme. It is a set of properties, and the useful thing about properties is that you can check whether you have them.

It has to run without being asked. The trigger is the feature. A workflow with a manual trigger is a button, and a button is a person's memory with extra steps.

It has to be able to fail, and someone has to have watched it fail. A gate nobody has ever seen go red is a claim, not a control. The cheapest way to earn that is to break it on purpose once, watch the pipeline stop, and revert.

It has to fail closed on the number it protects, at a threshold set below what you already have. A coverage ratchet configured just under today's figure, rounded down, costs one line. An aspirational threshold fails on day one and gets deleted on day two.

It has to check the artifact the specification actually lives in. If the intent is 453 words in an issue with acceptance criteria, the second half is not a human reading a 3,000 line diff to confirm it matches. That reading is close to pure extraneous load in [Sweller's sense](https://link.springer.com/article/10.1007/s11251-009-9110-0), and the decision it verifies was already made when the issue was written. The criteria in the issue are the thing to execute.

It has to survive its author going on holiday. A mechanism that is really one person's habit is an instruction wearing a control's costume.

And it has to feed back. Log what the machine produced that you rejected, and why, and when a rejection reason keeps recurring, promote it to a rule. That closes the loop: what you rejected becomes what the machine is told, and the first half starts being maintained by the second.

I have one of those six. The gates run, on two repositories, since 31 July. No coverage ratchet is configured. The acceptance criteria in the issues are executed by nobody. The docs parity rule is written down in four repositories out of six and machine-enforced in none of them. And my rejection log has a schema, a logger, and zero records in it.

The thing that took nine weeks was finding out. The thing that closed it was a workflow file. Whatever the second half costs, it is not the mechanism.


## Sources

External research, in the order it appears. My own figures are from my own repositories and transcripts and are not sourced here.

- Brysbaert, M. (2019). *How many words do we read per minute? A review and meta-analysis of reading rate.* Journal of Memory and Language. 190 studies, n=18,573. [PDF](https://gwern.net/doc/psychology/linguistics/2019-brysbaert.pdf) · [Record](https://biblio.ugent.be/publication/8647789)
- SmartBear / Cisco Systems. *Code review case study.* Ten months, 2,500 reviews, 3.2 million lines. [Case study PDF](https://static0.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf) · [Best practices](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)
- METR (2025). *Measuring the impact of early-2025 AI on experienced open-source developer productivity.* Randomised controlled trial, n=16, 246 tasks. [Blog](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) · [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
- Sweller, J. (2010). *Cognitive load theory, educational research, and instructional design: some food for thought.* Instructional Science. [Springer](https://link.springer.com/article/10.1007/s11251-009-9110-0)
- DORA (2025). *State of AI-Assisted Software Development.* [Report PDF](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf) · [Announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- Anderson (2026). *Agentic Coding Maturity Model.* Single-author preprint, sample size of one, not peer reviewed. [arXiv:2604.09388](https://arxiv.org/abs/2604.09388)
- The second maturity framework is AI-MM SET (Gigacore), a vendor framework rather than research.
