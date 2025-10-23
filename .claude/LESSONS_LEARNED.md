# Lessons Learned

A journal of mistakes, lessons, and rules created to prevent them from happening again. This document can be shared across projects to help agents learn from Roundtable's development history.

---

## Lesson: Premature Commits Without User Review

**Date:** 2024-10-22
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Commit 93b87a5, 8c77ee1

**What happened:**
Agent made and committed two changes without waiting for user approval:
1. Refactored CLAUDE.md and created PM skill (commit 93b87a5)
2. Simplified CLAUDE.md scope rules (commit 8c77ee1)

User had explicitly approved the first change before committing, but the second commit was made without asking for approval first.

**Why it was wrong:**
- Violates user's need for visibility and control over codebase changes
- Agent assumed changes were "safe" without confirmation
- User needs to review diffs before commits go in, not after

**Rule created:**
[CLAUDE.md: Commit Review Policy](CLAUDE.md#commit-review-policy)

**How to prevent:**
1. Make changes to files
2. Show user the diff or staged changes
3. Ask: "Is this correct? Should I commit?"
4. Wait for explicit approval
5. Only then run `git commit`

This applies to **ALL commits**, regardless of size, complexity, or perceived safety.

---

## Lesson: Closing Issues Before User Testing Complete

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Phase 1B implementation (#14)

**What happened:**
Agent implemented feature, all automated tests passed, agent immediately committed AND closed the GitHub issue without user having a chance to test or approve.

**Why it was wrong:**
- Tests passing ≠ User approval
- User loses visibility (closed issues hidden by default on GitHub)
- User can't provide feedback during testing
- Creates impression of rushing without user involvement
- Breaks trust in collaborative development process

**Rule created:**
[CLAUDE.md: GitHub Issue Workflow](CLAUDE.md#github-issue-workflow)

**How to prevent:**
1. Implement feature and run tests
2. Move issue to "User Testing" status on project board
3. Add UAT (User Acceptance Testing) criteria to issue
4. Ask user to test
5. **DO NOT commit or close yet**
6. **WAIT for explicit user approval**
7. Only then commit, push, and close the issue

Key phrase: "User says 'looks good'" or "User says 'approved'" = NOW you can close.

---

## Lesson: Suggesting Duplicate Issues/Phases Without Checking GitHub First

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** GitHub project setup phase

**What happened:**
Session had documented that phases were set up on GitHub (1A, 1B, 1C, 1D, 2, 3, 4). Later in conversation, when user asked "what's next after Phase 1B?", agent suggested creating a new Phase 1C issue without checking GitHub first. User caught it: "We already have a 1C, why are we adding a new one?"

**Why it was wrong:**
- Agent relied on conversation memory instead of source of truth (GitHub)
- Created potential for duplicate work and confusion
- GitHub state is permanent and accurate; conversation memory fades
- After context summaries, conversation history is lost but GitHub remains

**Rule created:**
[CLAUDE.md: GitHub as Source of Truth](CLAUDE.md#github-as-source-of-truth)

**How to prevent:**
Before suggesting ANY structural changes (new issues, phases, milestones):
```bash
gh issue list --limit 50 --json number,title,milestone,labels
```

Always verify GitHub state, especially:
- After conversation summaries
- After long sessions
- When user asks "what's next?"
- Before creating new issues/phases
- Before proposing architectural changes

---

## Lesson: Not Updating Project Board Status During Implementation

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Phase 1B completion (#14)

**What happened:**
Phase 1B (Issue #14) completed implementation and user approved ("i'm fine with this, let's move on to Phase 1C"). Agent immediately started Phase 1C without:
- Closing issue #14
- Moving issue #14 to "Done" on project board

User noticed: "#14 is still in 'User Testing' but I approved it"

**Why it was wrong:**
- Project board status ≠ actual work status
- User can't see at a glance which work is complete
- Next person picking up work doesn't know what's actually done
- Creates confusion about project state

**Rule created:**
[CLAUDE.md: GitHub Project Board Management](CLAUDE.md#github-project-board-management)

**How to prevent:**
When user approves work, **immediately**:
1. Close the issue: `gh issue close [NUMBER]`
2. Move to "Done" on project board
3. Only then proceed to next task

Respond to these user phrases = TIME TO CLOSE:
- "Looks good"
- "Approved"
- "Let's move on"
- "Go ahead with [next phase]"
- "I'm fine with this"

Any indication of approval = close the issue NOW, don't wait.

---

## Lesson: Breaking Up Work Without Validation Checkpoints

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Phase 1B issues #9-#13

**What happened:**
Phase 1B was broken into 5 separate issues:
- #9: Skills Library (infrastructure, no user-facing features)
- #10: Panel System (infrastructure, no user-facing features)
- #11: Multi-Agent Engine (infrastructure, no user-facing features)
- #12: CLI Integration (first user-testable feature!)
- #13: Documentation

User could not validate OR provide feedback until issue #12 was complete. Breaking it up created tracking overhead with zero validation benefit.

**Why it was wrong:**
- User couldn't test/approve at each breakpoint
- User feedback couldn't change what comes next
- Wasted time with tracking overhead for pieces user can't interact with
- No opportunity for user to say "stop, wrong direction"

**Rule created:**
[CLAUDE.md: When to Break Up Work](CLAUDE.md#when-to-break-up-work)

**How to prevent:**
Only break up work if:
- User can test something at EACH breakpoint
- User feedback could change direction
- Each piece delivers testable value
- There's a natural "stop and validate" point

Do NOT break up if:
- All pieces are infrastructure with no user-facing features until end
- User can't provide feedback until everything is integrated
- Breaking up just adds tracking overhead

Better approach: Single issue "Phase 1B: Panel System Implementation" with one validation point where user tests complete feature.

---
