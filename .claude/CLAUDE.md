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
- [ ] Run: `npm run dev`
- [ ] Enter prompt: "Build a web application with React frontend and Node backend"
- [ ] Expected: CLI shows "Detected panel: Full Stack Web Development"
- [ ] Expected: Shows 4 experts: Architecture, UX, Security, Product
- [ ] Expected: Debate includes perspectives from all 4 experts

### Test 2: Data Project Detection
- [ ] Run: `npm run dev`
- [ ] Enter prompt: "Design a data pipeline with Spark and Kafka"
- [ ] Expected: CLI shows "Detected panel: Data Platform"
- [ ] Expected: Shows 3 experts: Architecture, Data Engineering, Security

### Test 3: Manual Panel Override
- [ ] Run: `npm run dev`
- [ ] When prompted, manually select "Mobile App" panel
- [ ] Enter any prompt
- [ ] Expected: Uses Mobile App panel regardless of prompt content
- [ ] Expected: Shows 3 experts: Architecture, UX, Product
```

**Why Correct:** Tests actual user workflows and experience. User can see if the feature works as promised in the spec.

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
- [ ] Run: [Command user executes]
- [ ] Action: [What user does]
- [ ] Expected: [What user should see/experience]

#### Test Scenario 2: [Descriptive Name]
- [ ] Run: [Command user executes]
- [ ] Action: [What user does]
- [ ] Expected: [What user should see/experience]
```

### Real Example - Phase 1B Panel System

**From Spec:** "Users can select a panel or use auto-detection based on keywords"

**Correct UAT:**
```markdown
### Test: Panel Selection Workflow

#### Scenario 1: Auto-Detection Works
- [ ] Start CLI: `npm run dev`
- [ ] Enter: "Build a React web app"
- [ ] Expected: See "Auto-detected: Full Stack Web Development Panel"
- [ ] Expected: See list of 4 experts that will participate
- [ ] Expected: Debate proceeds with all 4 experts contributing

#### Scenario 2: Manual Selection Works
- [ ] Start CLI: `npm run dev`
- [ ] Choose manual panel selection when prompted
- [ ] Select "Data Platform" from menu
- [ ] Enter: "Build anything" (irrelevant prompt)
- [ ] Expected: Uses Data Platform panel (3 experts)
- [ ] Expected: Architecture, Data Engineering, Security experts respond
```

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
**Version:** 2.5 (Added "when to break up work" - only at user validation checkpoints)

---

**Remember:** Development conventions stay in CLAUDE.md. Runtime behavior goes in .claude/skills/.
