# CLAUDE.md: Roundtable Project Development Conventions

## Overview

This document establishes conventions for Claude (and other AI agents) **developing the Roundtable project codebase**.

**CRITICAL DISTINCTION:**

- **This file (CLAUDE.md):** Development instructions for Claude building Roundtable
- **.claude/skills/project-manager/:** Runtime instructions for Roundtable agents at runtime

**DO NOT MIX THEM.** Development conventions and runtime agent behavior are completely separate concerns.

---

## Commit Review Policy

**MANDATORY:** Never commit changes until the user has reviewed and explicitly approved them.

This applies to **ALL commits**, regardless of size, complexity, or perceived safety.

**Process:**
1. Make changes to files
2. Show user the diff or staged changes
3. Ask: "Is this correct? Should I commit?"
4. Wait for explicit approval
5. Only then run `git commit`

**Why:** The user needs visibility and control over what goes into their codebase.

---

## GitHub Issue Workflow (CRITICAL)

**MANDATORY:** Never close GitHub issues until the user has tested and explicitly approved the implementation.

### The Mistake (October 2024)

**What Happened:**
- Agent implemented Issues #9 and #10
- All automated tests passed (52 tests)
- Agent immediately committed AND closed the issues
- User couldn't find the issues (they were closed)
- User never got to test or approve before closure

**Root Cause:**
Agent assumed "tests passing" = "ready to close issue". Wrong. Only USER approval means ready to close.

### Mandatory Workflow for GitHub Issues

**For EVERY issue, follow this sequence exactly:**

1. **Implementation Phase**
   - Implement the feature
   - Write automated tests
   - Run tests, ensure they pass
   - Stage changes with `git add`

2. **User Testing Phase** ⚠️ STOP HERE
   - Add "User Acceptance Testing" comment to the issue with test criteria
   - Ask user to test the implementation
   - **DO NOT commit yet**
   - **DO NOT close the issue yet**
   - **WAIT for explicit user approval**

3. **Approval Phase** (Only after user says "approved" or "looks good")
   - Commit the changes with `git commit`
   - Push to GitHub with `git push`
   - Close the issue with `gh issue close`
   - Add comment documenting completion

### Red Flags - When to STOP and Wait

🚩 "All tests are passing" → Does NOT mean close the issue
🚩 "Implementation complete" → Does NOT mean close the issue
🚩 "No errors found" → Does NOT mean close the issue

✅ "User has tested and approved" → NOW you can close the issue

### Why This Matters

**Cost of closing too early:**
- User loses visibility (closed issues hidden by default)
- User can't provide feedback during testing
- Creates impression of rushing without user involvement
- Breaks trust in the development process

**ROI of waiting:**
- User maintains control over their project
- Catches issues automated tests miss
- Ensures features actually work as user expects
- Builds trust through collaborative process

### Example - Correct Workflow

```
Agent: "Issue #11 implementation complete. I've added user acceptance
testing criteria to the issue. Here's what to test:

1. Run: npm test -- src/agents/factory.test.ts
2. Verify: Agent factory creates agents from skills
3. Test: N-agent debate works with 3-5 agents

Please test and let me know if I should commit and close the issue."

User: "Tested it, looks good!"

Agent: [NOW commits, pushes, and closes issue]
```

### Example - Incorrect Workflow (DO NOT DO THIS)

```
Agent: "Issue #11 complete! All tests passing."
[Agent immediately commits]
[Agent immediately closes issue]

User: "Wait, I didn't test it yet. Where did the issue go?"
```

---

## GitHub as Source of Truth (CRITICAL)

**MANDATORY:** Always check GitHub state before suggesting structural changes to the project.

### The Mistake (October 2024)

**What Happened:**
- Earlier in session: Created Issues #4-#8 with phase structure (1C, 1D, 2, 3, 4)
- Session got summarized due to context limits
- Summary said "user asked to setup GitHub with phases" but didn't include specific details
- Later in session: User asked "what's next after Phase 1B?"
- Agent suggested "create Issue #15 for Phase 1C" without checking GitHub first
- User caught it: "We already have a 1C, why are we adding a new one?"
- Agent then checked GitHub and found existing phases

**Root Cause:**
Agent relied on conversation memory instead of checking the source of truth (GitHub).

### Mandatory Workflow: Always Check First

**Before suggesting structural changes, ALWAYS run:**

```bash
# Check existing issues and phases
gh issue list --limit 50 --json number,title,milestone,labels

# Check project structure
gh project list --owner @me
gh project item-list [PROJECT_NUMBER] --owner @me

# Check current phase/milestone status
gh issue view [ISSUE_NUMBER]
```

**When to check GitHub first:**
- Suggesting to create new issues
- Proposing new phases or milestones
- Recommending architectural changes tracked in issues
- After conversation summaries (context was lost, GitHub wasn't)
- When user asks "what's next?" (GitHub knows the roadmap)
- Before proposing duplicate work

### GitHub State vs Conversation Memory

| Source | Reliable For | Not Reliable For |
|--------|--------------|------------------|
| **GitHub** | ✅ Current project structure<br>✅ Existing issues/phases<br>✅ Open/closed status<br>✅ Assigned milestones<br>✅ Project roadmap | ❌ Recent uncommitted changes<br>❌ User preferences not documented<br>❌ Conversation context |
| **Conversation Memory** | ✅ User preferences<br>✅ Recent discussion<br>✅ Uncommitted work | ❌ Project structure<br>❌ What issues exist<br>❌ After summaries<br>❌ Long sessions |

**Key Principle:** Conversation memory is temporary. GitHub is permanent. When in doubt, check GitHub.

### Examples - Correct vs Incorrect

#### ❌ INCORRECT (Relying on Memory)

```
User: "What's next after Phase 1B?"

Agent: "Let's create Issue #15 for Phase 1C: Multi-Panel Architecture.
I'll set up the phase structure..."

[Agent didn't check GitHub first]
[Creates duplicate phase that already exists]
[User catches the mistake]
```

#### ✅ CORRECT (Checking GitHub First)

```
User: "What's next after Phase 1B?"

Agent: [Runs: gh issue list to see existing phases]
Agent: [Sees: 1C = Multiple LLMs, 1D = PM Agent, etc.]

Agent: "Here are the existing phases after 1B:
- Phase 1C: Multiple LLM Support (Issue #4)
- Phase 1D: PM Agent & Spec Generation (Issue #5)
- Phase 2: Enhanced Debate (Issue #6)

Phase 1C (Multiple LLMs) is next. Should we start on that?"
```

### When This Is Critical

🚨 **After conversation summaries:** Summary loses details, GitHub doesn't
🚨 **Long sessions:** Memory gets fuzzy, GitHub stays accurate
🚨 **Suggesting new issues:** Prevent duplicates
🚨 **Proposing phases:** Don't recreate existing structure
🚨 **Architectural suggestions:** Check if already planned/implemented

### Red Flags - Check GitHub Now

🚩 "Let's create Issue #X for..."
🚩 "I'll set up Phase Y..."
🚩 "We should add milestone Z..."
🚩 "Next we need to..."
🚩 User asks "what's next?" after break

✅ Before any of the above, run: `gh issue list` or `gh project item-list`

### Generic Template for GitHub Checks

**Before suggesting any structural change:**

1. **Check issues:** `gh issue list --json number,title,labels,milestone`
2. **Check milestones:** What phases/milestones exist?
3. **Check project board:** What's in progress vs. planned?
4. **Verify assumption:** Does what I'm about to suggest already exist?
5. **Only then suggest:** If it doesn't exist, now I can propose it

### Why This Matters

**Cost of not checking:**
- Creates duplicate issues/phases
- Confuses project structure
- Wastes time fixing duplicates
- Loses user trust ("did you even check?")

**ROI of checking:**
- Accurate suggestions
- No duplicates
- Shows thoroughness
- Maintains trust
- Takes 10 seconds to run `gh issue list`

### Key Takeaway

**Conversation memory is ephemeral. GitHub is the source of truth.**

**Before suggesting structural changes: CHECK GITHUB FIRST.**

After summaries, after breaks, after long sessions - always verify state with GitHub before proposing changes to project structure.

---

## GitHub Project Board Management (CRITICAL)

**MANDATORY:** Keep GitHub issue status and project board status in sync at all times.

### The Mistake (October 2024)

**What Happened:**
- Phase 1B (Issue #14) completed implementation
- User tested and approved: "okay we need something in CLAUDE.md..."
- User said "go ahead" to proceed with Phase 1C
- Agent implemented Phase 1C
- **Issue #14 was never closed or moved to "Done"**
- Issue #14 stayed in "User Testing" even though approved
- User noticed: "1B is still in user testing but i said it was fine to move on"

**Root Cause:**
Agent didn't close the issue or update project board status when user approved and moved on.

### Mandatory Workflow: Issue Lifecycle Management

**When user approves an issue, you MUST:**

1. **Close the issue:**
   ```bash
   gh issue close [NUMBER] -c "User testing complete. Approved by user."
   ```

2. **Move to "Done" on project board:**
   ```bash
   # Get project and item IDs (you should already have these)
   gh project item-edit --project-id [PROJECT_ID] \
     --id [ITEM_ID] \
     --field-id [STATUS_FIELD_ID] \
     --single-select-option-id [DONE_OPTION_ID]
   ```

3. **Do both actions immediately** when user says:
   - "Looks good"
   - "Approved"
   - "Let's move on"
   - "Go ahead with [next phase]"
   - "I'm fine with this"
   - Any indication they've accepted the work

### Issue Status Lifecycle

```
┌─────────────┐
│   Created   │ (Issue created, in "Todo" or "In Progress")
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Implementation  │ (Code written, tests pass, committed)
└──────┬──────────┘
       │
       ▼
┌──────────────────┐
│  User Testing   │ ⚠️ Move to "User Testing" column
└──────┬───────────┘     Update project board status
       │
       ▼
┌──────────────────┐
│ User Approval   │ User says "looks good" / "approved" / "go ahead"
└──────┬───────────┘
       │
       ▼  ⚠️ CRITICAL MOMENT
┌──────────────────┐
│ Close & Mark    │ 1. gh issue close [NUM]
│     Done        │ 2. Move to "Done" on project board
└─────────────────┘
```

### When to Move Issue Status

| User Signal | Action Required |
|-------------|-----------------|
| "Looks good" | Close issue + Move to Done |
| "Approved" | Close issue + Move to Done |
| "Let's move on" | Close issue + Move to Done |
| "Go ahead with [next]" | Close issue + Move to Done |
| "I'm fine with this" | Close issue + Move to Done |
| "Continue to [next phase]" | Close issue + Move to Done |
| Starts testing next phase | Previous issue should be Done |

### Project Board Column Meanings

**Todo:**
- Issue created, not started yet
- Waiting for dependencies

**In Progress:**
- Actively being implemented
- Code is being written

**User Testing:**
- Implementation committed
- UAT criteria added to issue
- Waiting for user to test

**Done:**
- User has approved
- Issue is closed
- Work is complete

### Red Flags - Project Board Out of Sync

🚩 Issue is closed but still in "User Testing" or "In Progress"
🚩 User approved work but issue not closed
🚩 User said "move on" but previous issue not marked Done
🚩 Working on Phase N+1 but Phase N issue not in "Done"

### Examples - Correct Workflow

#### ✅ CORRECT (Phase 1B Approval)

```
User: "i'm fine with this, let's move on to Phase 1C"

Agent: [Immediately runs:]
1. gh issue close 14 -c "Phase 1B approved. Moving to Phase 1C."
2. gh project item-edit ... --single-select-option-id [DONE_ID]
3. [Confirms to user:] "✅ Issue #14 closed and moved to Done"
4. [Then proceeds with Phase 1C]
```

#### ❌ INCORRECT (What Actually Happened)

```
User: "i'm fine with this, let's move on to Phase 1C"

Agent: [Immediately starts Phase 1C]
Agent: [Does NOT close issue #14]
Agent: [Does NOT move #14 to Done]

[Later...]
User: "1B is still in user testing but i said it was fine to move on"
```

### When User Is Still Testing

If user is actively testing and hasn't approved yet:
- Keep issue OPEN
- Keep issue in "User Testing" status
- Do NOT move to Done
- Wait for explicit approval

But once they approve:
- **Immediately** close and move to Done
- Don't wait until later
- Don't forget when moving to next phase

### Quick Reference Commands

```bash
# Close issue
gh issue close [NUMBER] -c "User approved. Testing complete."

# Move to Done (you'll need project/item/field IDs)
gh project item-edit --project-id [PROJ_ID] \
  --id [ITEM_ID] \
  --field-id [STATUS_FIELD_ID] \
  --single-select-option-id [DONE_OPTION_ID]

# Verify status
gh project item-list [PROJECT_NUM] --owner @me --format json | \
  grep -A 5 "\"number\":[NUMBER]"
```

### Key Principle

**Project board status MUST match issue lifecycle:**
- Open issue → Todo/In Progress/User Testing
- User approves → Close issue AND move to Done
- Never have closed issues in non-Done columns
- Never have approved work in non-Done columns

**When in doubt:** If user says "move on" or "go ahead", close the current issue and mark it Done before proceeding.

---

## Work Summary (MANDATORY)

**MANDATORY:** At the end of every task or session, provide a clear point-form summary of what was done.

**Format:**
```
## Summary of Work

- [Bullet point 1: What was done]
- [Bullet point 2: What was done]
- [Bullet point 3: What was done]
- [Any other relevant details]
```

**Why:**
- Gives user clear visibility of completed work
- Provides easy reference for what changed in the codebase
- Helps track progress across sessions
- Prevents miscommunication about what was actually completed

**When to provide:**
- After implementing a feature
- After fixing a bug
- After refactoring code
- After completing any significant work
- When wrapping up a session

**What to include:**
- Files created or modified
- Features added or changed
- Tests added or updated
- Issues worked on or closed
- Any blockers or incomplete items
- Next steps if work is incomplete

**Example:**
```
## Summary of Work

- Modified src/panels/types.ts to add new Panel interface
- Created src/panels/selector.ts with auto-detection logic
- Added 15 unit tests for panel detection (all passing)
- Updated docs/PANEL_GUIDE.md with usage examples
- Issue #12 implementation complete, ready for user testing
- No blockers, all tests passing
```

**Note:** This summary helps the user understand what changed in their codebase at a glance.

---

## Infrastructure vs User-Facing Issues

**CRITICAL:** Not all GitHub issues require user involvement. Clear separation prevents noise.

### Infrastructure Issues (Agent Tracking Only)

**Label:** `infrastructure` (gray color)

**What are they:**
- Backend APIs, types, loaders, validators
- Internal data structures
- Database schemas
- Build configuration
- Testing infrastructure
- Anything with no direct user interaction

**Workflow:**
1. Agent creates issue for tracking
2. Agent implements and verifies (tests pass, code works)
3. Agent commits and pushes
4. Agent closes issue immediately
5. **User can ignore these** - no testing required

**User's role:** None. These are for agent work tracking only.

**Example:** Issue #9 "Skills Library System" - Created skill types, YAML loader, validator. No CLI, no commands, no user-facing features. Agent implements, tests pass, commits, closes. Done.

### User-Facing Issues (Require User Testing)

**No special label** - these are the default

**What are they:**
- CLI commands and outputs
- User workflows and interactions
- Documentation users read
- Error messages users see
- Features users directly experience

**Workflow:**
1. Agent creates issue
2. Agent implements
3. Agent adds UAT checklist to issue
4. Agent moves to "User Testing" kanban column
5. **User tests the experience**
6. User approves
7. Agent commits, pushes, closes

**User's role:** Test the feature works as specified and feels right.

**Example:** Issue #12 "CLI Panel Selection" - Users run `npm run dev`, see panel auto-detection, select panels, experience multi-agent debates. User tests this workflow.

### When to Use Which

**Use Infrastructure Issue when:**
- Users never see or interact with this feature directly
- It's purely internal implementation
- Testing happens via unit tests, not user interaction
- Example: "Add skill validator", "Create panel types", "Database migration"

**Use User-Facing Issue when:**
- Users run commands
- Users see output or messages
- Users read documentation
- User experience can be judged
- Example: "Add panel selection to CLI", "Write skills creation guide", "Improve error messages"

### Filtering Issues as User

**To see only what needs your attention:**
```bash
# Hide infrastructure, show only user-facing
gh issue list --label "!infrastructure"

# Or on GitHub web UI, filter: -label:infrastructure
```

**Infrastructure issues are gray and ignorable.**

### Key Principle

**If users never interact with it directly, it's infrastructure.**

**If users see it, use it, or read it, it's user-facing.**

---

## User Acceptance Testing (UAT) - What Goes in the Checklist

**CRITICAL:** User Acceptance Testing is for USER EXPERIENCE, not technical verification.

### What I (Agent) Should Verify BEFORE Asking User to Test

The agent must complete these checks BEFORE adding UAT criteria to the issue:

✅ **Technical Verification (Agent's Job):**
- Files/folders exist
- TypeScript compilation succeeds (`npm run type-check`)
- Unit tests pass (`npm test`)
- Code follows project conventions
- No syntax errors
- Dependencies installed correctly
- Imports/exports work

**These should NEVER appear in User Acceptance Testing checklists.**

### What User Should Test (Goes in UAT Checklist)

User Acceptance Testing is about **end-to-end user experience against the spec**.

✅ **User Experience Testing (User's Job):**
- Does the feature work as specified when I use it?
- Does the user workflow feel right?
- Do the outputs match what the spec promised?
- Are error messages helpful?
- Does the UX make sense?

### Examples - Correct vs Incorrect UAT

#### ❌ INCORRECT UAT (Too Technical)

```markdown
## User Acceptance Testing

- [ ] Run: npm test -- src/panels/selector.test.ts
- [ ] Expected: All 30 tests pass
- [ ] Verify files exist in .roundtable/panels/
- [ ] Check TypeScript compilation succeeds
- [ ] Open full-stack-web.yaml and verify it has skillIds array
```

**Why Wrong:** These are all things the agent can and should verify. The user shouldn't need to run unit tests or check if files exist.

#### ✅ CORRECT UAT (User Experience Focused)

```markdown
## User Acceptance Testing

Test the panel auto-detection feature works as specified:

### Test 1: Web App Detection
- [ ] Testing panel auto-detection for web app projects
  - Run: `npm run dev`
  - Enter prompt: "Build a web application with React frontend and Node backend"
  - Expected: CLI shows "Detected panel: Full Stack Web Development"
  - Expected: Shows 4 experts: Architecture, UX, Security, Product
  - Expected: Debate includes perspectives from all 4 experts

### Test 2: Data Project Detection
- [ ] Testing panel auto-detection for data projects
  - Run: `npm run dev`
  - Enter prompt: "Design a data pipeline with Spark and Kafka"
  - Expected: CLI shows "Detected panel: Data Platform"
  - Expected: Shows 3 experts: Architecture, Data Engineering, Security

### Test 3: Manual Panel Override
- [ ] Testing manual panel selection overrides auto-detection
  - Run: `npm run dev`
  - When prompted, manually select "Mobile App" panel
  - Enter any prompt
  - Expected: Uses Mobile App panel regardless of prompt content
  - Expected: Shows 3 experts: Architecture, UX, Product
```

**Why Correct:** Tests actual user workflows and experience. User can see if the feature works as promised in the spec. **Important:** One checkbox per test scenario - when the user completes all steps in a scenario, they check that one box. No individual checkboxes for each step.

### Guidelines for Writing UAT

**Do write UAT for:**
- User commands and their outputs
- CLI interactions and prompts
- Auto-detection behavior
- Error messages shown to users
- End-to-end workflows
- Feature behavior matching spec

**Do NOT write UAT for:**
- Unit test execution
- File existence checks
- Type checking
- Code compilation
- Internal implementation details
- Things users never see or interact with

### Template for UAT

```markdown
## User Acceptance Testing

### Feature: [Feature Name from Spec]

**What this tests:** [Brief description of user experience being validated]

#### Test Scenario 1: [Descriptive Name]
- [ ] [Brief test scenario description]
  - Run: [Command user executes]
  - Action: [What user does]
  - Expected: [What user should see/experience]

#### Test Scenario 2: [Descriptive Name]
- [ ] [Brief test scenario description]
  - Run: [Command user executes]
  - Action: [What user does]
  - Expected: [What user should see/experience]
```

**Important:** One checkbox per test scenario. All steps within a scenario are sub-bullets. User checks ONE box when they complete ALL steps in that scenario.

### Real Example - Phase 1B Panel System

**From Spec:** "Users can select a panel or use auto-detection based on keywords"

**Correct UAT:**
```markdown
### Test: Panel Selection Workflow

#### Scenario 1: Auto-Detection Works
- [ ] Auto-detect and debate with panel based on prompt keywords
  - Start CLI: `npm run dev`
  - Enter: "Build a React web app"
  - Expected: See "Auto-detected: Full Stack Web Development Panel"
  - Expected: See list of 4 experts that will participate
  - Expected: Debate proceeds with all 4 experts contributing

#### Scenario 2: Manual Selection Works
- [ ] Manual selection overrides auto-detection
  - Start CLI: `npm run dev`
  - Choose manual panel selection when prompted
  - Select "Data Platform" from menu
  - Enter: "Build anything" (irrelevant prompt)
  - Expected: Uses Data Platform panel (3 experts)
  - Expected: Architecture, Data Engineering, Security experts respond
```

### Checkbox Structure for UAT

**CRITICAL:** Use this structure for UAT checklists:

```
- [ ] Test scenario name (ONE checkbox per scenario)
  - Step 1 details (no checkbox)
  - Step 2 details (no checkbox)
  - Expected result (no checkbox)
```

**NOT like this:**
```
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
- [ ] Expected result
```

**Why:**
- User completes all steps in a scenario, then checks ONE box
- Cleaner visual representation in GitHub issues
- Makes it clear when an entire test scenario is done
- Prevents false completion signals (some steps done, others not)

**User marks a test complete when:** All steps within that scenario are done and all expectations are met.

### Key Principle

**If the agent can verify it automatically, it's NOT user acceptance testing.**

**If it requires human judgment about user experience, it IS user acceptance testing.**

---

## When to Break Up Work (And When NOT To)

**CRITICAL:** Only break up work when there are user validation checkpoints that could change direction.

### The Mistake (Phase 1B - October 2024)

**What Happened:**
- Phase 1B broken into 5 issues: #9, #10, #11, #12, #13
- Issues #9, #10, #11 were all infrastructure (no user-facing features)
- Only #12 had user-testable features
- User couldn't validate direction until #12 was complete
- **Result:** Pointless breakup - no checkpoint where user could course-correct

**Root Cause:**
Agent broke up work without considering whether user could validate progress at each step.

### Key Principle: Validation Checkpoints

**Only break up work when:**
- User can test/validate something at each breakpoint
- Feedback at checkpoint could change what comes next
- Each piece delivers testable value
- User has opportunity to say "stop" or "change direction"

**Do NOT break up work when:**
- All pieces are infrastructure with no user-facing features until the end
- User can't provide feedback until everything is integrated
- Breaking up just creates tracking overhead without validation opportunities
- The pieces don't make sense independently

### Examples - Correct vs Incorrect Breakup

#### ❌ INCORRECT (Phase 1B Actual)

```
Issue #9: Skills Library (infrastructure - no UAT)
Issue #10: Panel System (infrastructure - no UAT)
Issue #11: Multi-Agent Engine (infrastructure - no UAT)
Issue #12: CLI Integration (FIRST user-testable feature!)
Issue #13: Documentation
```

**Why Wrong:** User can't validate anything until #12. No checkpoint to say "this isn't the right direction" before spending tokens on #10, #11.

**Better Approach:** Single issue "Phase 1B: Panel System Implementation" - do all infrastructure + CLI integration together, show user working feature, get approval.

#### ✅ CORRECT (Hypothetical)

```
Issue #1: Basic Panel Auto-Detection (minimal implementation)
  - User tests: Does auto-detection work? Is the UX right?
  - Checkpoint: User says "yes continue" or "no, change approach"

Issue #2: Expand to N-Agent Support (builds on #1)
  - User tests: Do multi-agent debates work well?
  - Checkpoint: User validates before building more

Issue #3: Documentation (final polish)
  - User tests: Are docs clear?
```

**Why Correct:** User can validate and course-correct at each step. Each issue delivers testable value.

### Decision Framework

**Before creating multiple issues, ask:**

1. **Can user test this piece independently?**
   - Yes → Good candidate for separate issue
   - No → Combine with next piece

2. **Could user feedback change what comes next?**
   - Yes → Good breakpoint
   - No → Don't break up

3. **Does this deliver value the user can judge?**
   - Yes → Separate issue
   - No → Infrastructure, combine with user-facing piece

4. **Is there a natural "stop here and validate" point?**
   - Yes → Break up at that point
   - No → Keep together

### Real Example - Phase 1B Should Have Been

**Instead of 5 issues, should have been 2:**

```
Issue #1: Panel System with CLI Integration
  - Implement: Skills, Panels, Multi-Agent, CLI
  - User tests: Complete panel selection workflow
  - Checkpoint: Does the UX work? Is auto-detection good?
  - Tokens: ~23K (everything except docs)

Issue #2: Skills & Panels Documentation
  - Implement: CREATING_SKILLS.md, CREATING_PANELS.md
  - User tests: Are docs clear enough to create custom skills?
  - Tokens: ~2K
```

**Why Better:**
- User sees working feature in #1 (one validation checkpoint)
- User validates docs in #2 (second checkpoint)
- No wasted infrastructure issues user can't interact with

### When Infrastructure Issues ARE Appropriate

**Infrastructure issues make sense when:**
- They're independent of current feature work
- They unblock multiple future features
- They're refactoring/cleanup that doesn't change UX
- They're build/tooling improvements

**Example (Good):**
```
Issue: Upgrade TypeScript 4.x → 5.x
  - Infrastructure, no UX change
  - Unblocks future features needing TS 5.x
  - Can be done independently
  - User doesn't need to test (tests verify it works)
```

### Red Flags - Don't Break Up

🚩 "This is part 1 of 4, user can't test until part 4"
🚩 "All these issues are backend, UI comes later"
🚩 "User testing happens after all issues are complete"
🚩 "These issues must be done in sequence with no validation points"

### Key Takeaway

**Breaking up work is for USER VALIDATION, not agent task tracking.**

If there's no opportunity for user to validate and potentially change direction, keep it as one issue.

---

## Suggesting Implementation Phases

If a user asks you to implement something large and you think it should be broken into smaller pieces, suggest the breakdown clearly and simply:

**Example:**
```
User: "Start implementing Phase 1"

Agent: "Phase 1 is large. I'd suggest breaking it into:
  - Phase 1A: Core debate engine
  - Phase 1B: Panel system
  - Phase 1C: Multi-LLM support

Why: Smaller pieces are easier to test and iterate on.

Which would you like to start with?"
```

If the user agrees:
1. Suggest updating the GitHub issues with these new tasks/phases
2. Once approved, proceed with implementation
3. Only create planning documents if you can't plan on GitHub (otherwise use GitHub issues)

---

## Status

**Convention Status:** Active and in effect
**Applies To:** All Roundtable development work going forward
**Updated:** 2025-10-23
**Version:** 2.7 (Added "GitHub Project Board Management" - keep issue status and project board in sync)

---

**Remember:** Development conventions stay in CLAUDE.md. Runtime behavior goes in .claude/skills/.
