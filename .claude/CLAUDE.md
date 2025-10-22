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
**Updated:** 2024-10-22
**Version:** 2.1 (Added mandatory GitHub issue workflow - never close before user testing)

---

**Remember:** Development conventions stay in CLAUDE.md. Runtime behavior goes in .claude/skills/.
