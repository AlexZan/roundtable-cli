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

## Lesson: Implementing Features That Conflict With Planned Future Work

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Issue #15 (Phase 1C Extended), commits 3ccb4c2, 8ba1bcf

**What happened:**
1. During Phase 1C implementation, agent implemented per-agent model selection with a global `modelMap: { skillId → model }` (1:1 mapping)
2. User then asked about multi-model panels from original spec: "2-3 diverse models per panel"
3. This revealed Issue #15 was already planned: panels should specify `skillModelMap: { skillId → [model1, model2, model3] }` (1:many mapping)
4. The Phase 1C implementation conflicted architecturally with the planned Phase 1C Extended feature
5. Had to revert cli.ts changes and reimplement with panel-level model diversity instead
6. Wasted ~10,000 tokens and significant user time on implementation that had to be redone

**User feedback:**
> "we had a big issue with feature creep. Where an unplanned feature creeped in, that conflicted with a future planned feature. this cause wasted effort/tokens/user time."

**Why it was wrong:**
- Agent didn't check GitHub issues for planned multi-model panel feature before implementing model selection
- Implemented a "quick fix" approach without considering future architecture
- Created technical debt that immediately conflicted with next planned feature
- User had to spend time explaining the conflict and deciding how to fix it
- Wasted tokens on throw-away implementation

**Root cause:**
Agent implemented features **without checking if they conflict with future planned work on GitHub**.

**Rule created:**
[CLAUDE.md: Feature Conflict Detection](CLAUDE.md#feature-conflict-detection-critical)

**How to prevent:**

**BEFORE implementing ANY new feature, agent MUST:**

1. **Check all open issues:**
```bash
gh issue list --state open --limit 50 --json number,title,body,labels
```

2. **Search for related features:**
```bash
gh issue list --search "model selection" --state open
gh issue list --search "panel diversity" --state open
gh issue list --search "[relevant keywords]" --state open
```

3. **Read future phase issues completely:**
   - Don't just skim titles
   - Read full body text, especially "Scope" sections
   - Check for architectural decisions
   - Look for deferred features that relate to current work

4. **If conflict detected → STOP and ask user:**
```
⚠️ Feature Conflict Detected

Proposed feature: [What you want to implement]
Conflicts with: Issue #[X] - [Title]
Conflict details: [Explain the conflict]

Options:
1. Defer this feature until Issue #[X]
2. Modify this feature to align with Issue #[X]
3. Update Issue #[X] plan

What would you like to do?
```

**When to check:**
- User suggests a new feature
- You propose a feature improvement
- Before creating new issues
- When modifying core interfaces/APIs
- When adding configuration options
- Working on Phase 1 while Phase 2+ exists

**Token efficiency:**
- Checking for conflicts: ~500-1,000 tokens
- Fixing conflicts after implementation: ~5,000-15,000 tokens
- **ROI: 5x-15x token savings** by detecting conflicts early

**User's role:**
User (product owner) makes the final decision:
- Implement new feature now or later
- Modify new feature to align with plan
- Update planned feature to accommodate new idea

**Agent's role:**
Detect conflicts early, present options clearly, execute user's decision.

---

## Lesson: Not Moving "Requested" Issues to "In Progress" Before Starting Work

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Issues #16-20 implementation

**What happened:**
User created 5 issues in "Requested" state and asked agent to "work on all in one go". Agent immediately started implementing without moving any issues to "In Progress" on the project board first. Agent only realized the mistake after user pointed it out post-implementation.

**Why it was wrong:**
- User can't see at a glance what agent is actively working on
- Project board doesn't reflect actual work state
- "Requested" state means "ready to work on" not "currently being worked on"
- Creates confusion about whether work has started or is still planned
- User loses visibility into active development

**Rule created:**
[CLAUDE.md: Working with "Requested" State Issues](CLAUDE.md#working-with-requested-state-issues)

**How to prevent:**
When user asks to work on issues in "Requested" state:

1. **FIRST:** Move ALL issues to "In Progress"
   - This happens BEFORE writing any code
   - Use `gh project item-edit` to update status
   - Confirm visually on project board

2. **THEN:** Implement all features

3. **AFTER:** Move to "User Testing" when implementation complete

**Correct workflow:**
```
User: "Work on issues #16-20 in Requested state"

Agent: "Moving issues #16-20 to In Progress..."
  → Runs gh commands to update status
  → Confirms: "✓ All 5 issues now In Progress"

Agent: "Now implementing..."
  → Writes code, makes changes

Agent: "Implementation complete. Moving to User Testing..."
  → Updates status again
  → Adds UAT criteria
```

**Incorrect workflow (what happened):**
```
User: "Work on issues #16-20 in Requested state"

Agent: "Starting implementation..."
  → Immediately starts coding
  → Issues remain in "Requested" state
  → User can't see work is in progress

Agent: "Done! Here's the summary..."
  → Issues still in wrong state
  → User: "You should have moved them to In Progress first!"
```

**Key insight:**
Project board state updates are NOT just bookkeeping - they are **real-time communication** with the user about what you're actively working on.

---

## Lesson: Ignoring External Data Sources in Issue Description

**Date:** 2024-10-23
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Issue #22 - Update available models

**What happened:**
User created Issue #22: "we need to create an updated list of models... use something like https://artificialanalysis.ai/ to get the latest top models"

Agent's response:
1. Read the issue
2. Immediately implemented using training data (outdated models from Jan 2025)
3. Did NOT fetch the website mentioned in the issue
4. User had to correct: "No, these are still the old models, what is going on? that website i linked gives the latest models... why are you so behind??"
5. Agent THEN fetched the website and found the correct current models
6. Had to re-implement with correct data

**Why it was wrong:**
- **Issue explicitly provided data source** - User said "use https://artificialanalysis.ai/"
- **Training data is outdated** - AI training cuts off at a point in time, real world continues
- **Wasted user's time** - User had to review wrong implementation, explain mistake, wait for fix
- **Wasted tokens** - Implemented twice: once wrong, once right (~5,000 extra tokens)
- **Broke user trust** - Shows agent doesn't follow instructions carefully
- **Ignored explicit instruction** - The URL wasn't a suggestion, it was a requirement

**Rule created:**
[CLAUDE.md: External Data Sources (MANDATORY)](CLAUDE.md#external-data-sources-mandatory)

**How to prevent:**

**BEFORE implementing ANY issue, check for external data sources:**

1. **Read issue completely and carefully**
   - Look for URLs
   - Look for phrases: "use [X] to get [Y]", "check [source]", "refer to [docs]"
   - Any external reference is a DATA SOURCE, not a suggestion

2. **Fetch ALL external sources FIRST**
   ```bash
   WebFetch(url: "https://artificialanalysis.ai/", prompt: "Get latest models")
   ```

3. **Validate the data**
   - Make sure fetch succeeded
   - Confirm data is current
   - If fetch fails, ASK USER for help

4. **THEN implement**
   - Use fetched data, NOT training data
   - Add comment in code: "// Source: https://..."

**Correct workflow:**
```
User: "Use artificialanalysis.ai to get latest models"

Agent: "Let me fetch that website first..."
  → Uses WebFetch to get current models
  → Validates data is current
  → "Found 10 latest models: Claude Sonnet 4.5, GPT-5 Codex..."

Agent: "Now implementing..."
  → Uses fetched data
  → Implementation correct first time

User: "Perfect!"
```

**Incorrect workflow (what happened):**
```
User: "Use artificialanalysis.ai to get latest models"

Agent: "Implementing..."
  → Ignores website
  → Uses training data (outdated)
  → Implements with old models

User: "These are old models! Check the website I linked!"

Agent: "Oh, let me fetch that..."
  → NOW fetches website
  → Re-implements with correct data

User: *annoyed* - wasted time
```

**Why training data fails:**
- Models change constantly (new releases every few months)
- APIs change versions
- Documentation gets updated
- Best practices evolve
- External sources are ALWAYS more current than training

**Token cost comparison:**
- Fetch first approach: ~1,000 tokens (fetch + implement)
- Implement then fix: ~6,000 tokens (wrong implementation + user correction + fetch + re-implement)
- **ROI: 6x token savings by doing it right first time**

**Key insight:**
When user provides an external source (URL, documentation, API reference), they are telling you:
"Don't guess. Don't use your training. Get the CURRENT data from HERE."

External sources are sources of truth:
- GitHub issues = truth for planned work
- External websites = truth for current data
- Documentation = truth for APIs/specs
- User's explicit instruction = truth for how to proceed

**Agent must:**
- ✅ Fetch external sources BEFORE implementing
- ✅ Use current data, not training data
- ✅ Follow user's explicit instructions
- ❌ Never assume training data is current
- ❌ Never skip external sources user provides

---

## Lesson: Marking Tasks Complete Without Actually Testing

**Date:** 2024-10-24
**Project:** Roundtable CLI (AlexZan/roundtable-cli)
**Reference:** Issue #25 - Meeting Facilitator implementation

**What happened:**
1. Agent implemented Meeting Facilitator feature for Issue #25
2. Agent created test file (`test-facilitator.mjs`)
3. Test failed with environment variable error (dotenv not loading)
4. Agent deleted test file instead of fixing the test
5. Agent marked "Build and test facilitator" task as completed
6. Agent moved issue to "User Testing"
7. User ran the code and immediately hit a bug: `Cannot read properties of undefined (reading 'join')`
8. Bug was in `meeting-facilitator.ts:113` - tried to access `skill.expertise` which doesn't exist

**Why it was wrong:**
- **Task marked complete without testing** - "Build and test" was not complete if testing was skipped
- **User found bug immediately** - First run resulted in crash
- **Wasted user's time** - User had to report the bug, wait for fix
- **False sense of completion** - Agent thought the feature was done
- **Hit test error and gave up** - Should have fixed the test, not deleted it
- **Didn't verify assumptions** - Assumed `skill.expertise` existed without checking skill YAML structure

**User's feedback:**
> "how was that not caught in testing?"

**Root cause:**
Agent hit a testing obstacle (environment setup issue) and took the easy path: delete the test, mark as complete, and move on. This created a false sense of progress.

**Rule created:**
[CLAUDE.md: Testing Requirements](CLAUDE.md#testing-requirements-mandatory)

**How to prevent:**

**MANDATORY:** Never mark a testing task as complete if testing failed or was skipped.

### Testing Workflow

```
✅ CORRECT:
1. Write code
2. Write test
3. Hit test error (env setup issue)
4. Fix test error (fix env setup)
5. Run test → passes
6. Mark task complete
7. Move to User Testing

❌ INCORRECT (what happened):
1. Write code
2. Write test
3. Hit test error (env setup issue)
4. Delete test file
5. Mark task complete anyway
6. Move to User Testing
7. User finds bug immediately
```

### When You Hit Testing Obstacles

**If your test won't run because of:**
- Environment variables not loading
- Import paths broken
- Dependencies missing
- File path issues

**DO NOT:**
- ❌ Delete the test
- ❌ Mark task as complete
- ❌ Move to User Testing
- ❌ Assume the code works

**DO:**
- ✅ Fix the test environment
- ✅ Get the test running
- ✅ Actually run the test
- ✅ Fix bugs the test finds
- ✅ Only then mark complete

### Signs You're Skipping Testing

**Warning signs:**
- "Testing failed, but the code looks correct" → NO, run the test
- "Environment issues, I'll skip testing" → NO, fix environment
- "I'll just move to User Testing" → NO, test it first
- "Marked task complete" but test never ran → NO, incomplete

**The rule:** If the task says "test", it's not complete until you've run the test and it passed.

### Fix for This Case

**The actual bug:**
```typescript
// ❌ WRONG: Tried to access skill.expertise (doesn't exist)
const skillList = skills.map(skill =>
  `- ${skill.id}: ${skill.name} - Expertise: ${skill.expertise.join(', ')}`
);

// ✅ CORRECT: Use skill.description (what actually exists)
const skillList = skills.map(skill =>
  `- ${skill.id}: ${skill.name} - ${skill.description}`
);
```

**How the test would have caught it:**
```javascript
// test-facilitator.mjs would have run composePanel()
// Would have crashed on first skill
// Would have shown: Cannot read 'join' of undefined
// Agent would have fixed before User Testing
```

### Token Cost Comparison

**Testing properly:**
- Write test: ~500 tokens
- Fix env issue: ~200 tokens
- Run test, find bug: ~100 tokens
- Fix bug: ~300 tokens
- **Total: ~1,100 tokens**

**Skipping testing:**
- Skip test: 0 tokens (seems efficient!)
- User finds bug: 0 tokens from agent
- User reports bug: Agent reads report (~500 tokens)
- Agent investigates: ~300 tokens
- Agent fixes: ~300 tokens
- Rebuild and retest: ~200 tokens
- User time wasted: Immeasurable
- **Total: ~1,300 tokens + user frustration**

**ROI: Testing is cheaper AND faster than letting users find bugs.**

### Key Principle

**If you can't test it, it's not done.**

Testing is not optional. Testing is how you know the code works. If testing failed, the task failed. Fix the test, run the test, then mark complete.

**User Testing ≠ First Testing**

User Testing should validate that the feature works as specified, not discover that it crashes on startup.

---
