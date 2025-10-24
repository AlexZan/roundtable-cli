# CLAUDE.md: Roundtable Project Development Conventions

## Overview

This document establishes conventions for Claude (and other AI agents) **developing the Roundtable project codebase**.

**CRITICAL DISTINCTION:**

- **This file (CLAUDE.md):** Development instructions for Claude building Roundtable
- **.claude/skills/project-manager/:** Runtime instructions for Roundtable agents at runtime

**DO NOT MIX THEM.** Development conventions and runtime agent behavior are completely separate concerns.

---

## Lessons Learned (MANDATORY)

Whenever a mistake is made or a lesson is learned during development, it **MUST** be documented in [LESSONS_LEARNED.md](LESSONS_LEARNED.md).

**When to add an entry:**
- You make a mistake in development
- A rule is broken and you learn why it matters
- A new pattern emerges that should be documented
- User feedback reveals a gap in conventions

**How to add an entry:**

1. **Create new lesson heading** in LESSONS_LEARNED.md:
```markdown
## Lesson: [Brief description of what was learned]
```

2. **Document required fields:**
   - **Date:** When the lesson was learned (YYYY-MM-DD format)
   - **Project:** What project (e.g., "Roundtable CLI (AlexZan/roundtable-cli)")
   - **Reference:** Git commits, issue numbers, or session context
   - **What happened:** Describe the mistake or scenario
   - **Why it was wrong:** Explain the impact and problem
   - **Rule created:** Link to the corresponding rule in CLAUDE.md using markdown: `[CLAUDE.md: Section Name](CLAUDE.md#section-anchor)`
   - **How to prevent:** Concrete steps to avoid this mistake in future

3. **Update CLAUDE.md** to backlink to the new lesson:
   - Find the relevant rule section in CLAUDE.md
   - Add at the bottom: `**See also:** [LESSONS_LEARNED.md: Lesson Name](LESSONS_LEARNED.md#lesson-anchor)`

4. **Use markdown anchors** for all links:
   - Headings auto-generate anchors (lowercase, hyphens instead of spaces)
   - Example: `## Lesson: Breaking Up Work` → `#lesson-breaking-up-work`

**Why this matters:**
- Agents learn from mistakes instead of repeating them
- Rules stay connected to their origin story
- Document can be shared across projects to teach other agents
- Bidirectional navigation keeps context and rules together

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

**See also:** [LESSONS_LEARNED.md: Premature Commits Without User Review](LESSONS_LEARNED.md#lesson-premature-commits-without-user-review)

---

## GitHub Issue Workflow

**MANDATORY:** Never close GitHub issues until the user has tested and explicitly approved the implementation.

**For EVERY issue:**
1. Implement and test
2. Add UAT criteria to issue
3. Ask user to test
4. **WAIT for explicit approval** (e.g., "looks good", "approved", "let's move on")
5. Only then commit, push, and close

**See also:** [LESSONS_LEARNED.md: Closing Issues Before User Testing Complete](LESSONS_LEARNED.md#lesson-closing-issues-before-user-testing-complete)

---

## Linking Commits to Issues

**MANDATORY:** When closing an issue via commit (ONLY after user approval), use GitHub keyword linking in the commit message.

**When to link:**
- **ONLY after user has tested and explicitly approved the implementation**
- Never link/close issues before user testing is complete
- Link at the same time you close the issue

**How to link:**

Include one of these keywords in your commit message:
```
Closes #5
Fixes #10
Resolves #15
```

**Example commit message:**

```
Implement Phase 1A debate engine with 2-agent support

- Add debate/engine.ts with orchestration logic
- Add session management with JSON storage
- Add token tracking
- Add friendly error handling
- All tests pass (19 unit tests)

Closes #3
```

**How it works:**
- GitHub automatically detects the keyword
- When commit is merged, GitHub closes the issue
- Issue is automatically linked to the commit/PR
- Commit appears in issue timeline
- Issue is moved to "Done" on project board

**CRITICAL:** Only use keyword linking AFTER user approval. Never close issues in commit messages before user testing.

---

## GitHub as Source of Truth

**MANDATORY:** Always check GitHub state before suggesting structural changes (new issues, phases, milestones).

**Before suggesting ANY structural change, run:**
```bash
gh issue list --limit 50 --json number,title,milestone,labels
```

**When to check:**
- After conversation summaries (context lost, GitHub hasn't)
- When user asks "what's next?"
- Before creating new issues/phases
- Before proposing architectural changes

**See also:** [LESSONS_LEARNED.md: Suggesting Duplicate Issues/Phases Without Checking GitHub First](LESSONS_LEARNED.md#lesson-suggesting-duplicate-issuesphases-without-checking-github-first)

---

## Feature Conflict Detection (CRITICAL)

**MANDATORY:** Before implementing or suggesting ANY new feature, check if it conflicts with planned future features.

### The Problem: Feature Creep and Wasted Effort

**What happened (2024-10-23, Issue #15):**
1. Implemented per-agent model selection (global skill→model map) in Phase 1C
2. This conflicted with planned multi-model panel feature (2-3 models per skill)
3. Had to revert and reimplement, wasting ~10,000 tokens and significant user time
4. User: "we had a big issue with feature creep... this cause wasted effort/tokens/user time"

**Root cause:** Implemented a feature without checking if it conflicted with future planned work.

### Mandatory Process: Feature Conflict Check

**BEFORE implementing or suggesting a feature, you MUST:**

1. **Check all open issues for conflicts:**
```bash
gh issue list --state open --limit 50 --json number,title,body,labels
```

2. **Search issue bodies for related keywords:**
```bash
gh issue list --search "model selection" --state open
gh issue list --search "panel diversity" --state open
gh issue list --search "[relevant keywords]" --state open
```

3. **Read Phase 2+ issue descriptions fully:**
- Don't just skim titles
- Read the full body text
- Check "Scope" and "Deferred" sections
- Look for architectural decisions

4. **If you find a potential conflict:**

**STOP AND ASK THE USER:**
```
⚠️ Feature Conflict Detected

Proposed feature: [What you want to implement]
Conflicts with: Issue #[X] - [Title]
Conflict details: [Specific conflict explanation]

Options:
1. Defer this feature until Issue #[X] is addressed
2. Modify this feature to align with Issue #[X]
3. Update Issue #[X] to accommodate this feature

What would you like to do?
```

### What Counts as a Conflict?

**Conflicts include:**
- ✅ **Architectural conflicts** - Different approaches to same problem
- ✅ **API design conflicts** - Incompatible function signatures or interfaces
- ✅ **Data structure conflicts** - Different ways of modeling the same domain
- ✅ **Configuration conflicts** - Overlapping or contradictory config options
- ✅ **Scope overlaps** - Implementing something already planned for later phase

**Examples from this project:**
```
❌ Phase 1C: Implemented `createAgentsFromSkills(skillIds, modelMap)`
   where modelMap is skill → model (1:1 mapping)

✅ Issue #15 (planned): Panel should specify 2-3 models PER SKILL
   skillModelMap: architecture → [claude, gpt-4, gemini]

CONFLICT: Can't have both 1:1 mapping AND 1:many mapping
```

### When to Check

**Check for conflicts when:**
- User suggests a new feature
- You propose a new feature during implementation
- You're about to create a new issue
- You're modifying core interfaces or data structures
- User says "let's add..." or "what if we..."
- You think "it would be better if..."

**Especially check when:**
- Working on Phase 1 but Phase 2+ issues exist
- Implementing "quick fixes" or "small improvements"
- Adding configuration options
- Changing how agents/panels/skills are structured

### Process Checklist

```
Before implementing a new feature:

☐ Run: gh issue list --state open --limit 50
☐ Search issues for relevant keywords
☐ Read Phase 2+ issues completely (not just titles)
☐ Check if feature overlaps with planned work
☐ If conflict found → STOP and ask user
☐ If no conflict → Proceed with implementation
☐ Document decision in commit message
```

### User Decision Authority

**The user (product owner) decides:**
- Whether to implement the new feature now
- Whether to defer until later phase
- Whether to modify the planned feature
- Whether to modify the new feature

**Your job:** Detect conflicts early, present options clearly, execute the user's decision.

### Token Efficiency

**Detecting conflicts costs:** ~500-1,000 tokens (search + read)
**Fixing conflicts after implementation:** ~5,000-15,000 tokens (revert + reimplement)

**ROI:** 5x-15x token savings by catching conflicts early.

**See also:** [LESSONS_LEARNED.md: Implementing Features That Conflict With Planned Future Work](LESSONS_LEARNED.md#lesson-implementing-features-that-conflict-with-planned-future-work)

---

## External Data Sources (MANDATORY)

**CRITICAL:** When an issue references external sources, you MUST fetch them BEFORE implementing.

### The Problem

**What happened (Issue #22):**
- Issue said: "use https://artificialanalysis.ai/ to get the latest top models"
- Agent ignored this and used training data (outdated)
- User had to correct the agent after implementation
- Wasted time implementing with wrong data

**Why it was wrong:**
- External sources are THE source of truth, not training data
- Training data becomes outdated immediately
- User explicitly provided the correct data source
- Agent's assumptions were incorrect

### Mandatory Process

**BEFORE implementing ANY feature that requires external data:**

1. **Identify data sources in the issue**
   - Look for URLs, API references, documentation links
   - Look for phrases like "use X to get Y", "check Z", "refer to W"

2. **Fetch ALL external sources FIRST**
   ```bash
   # Examples:
   WebFetch(url: "https://artificialanalysis.ai/", prompt: "Get latest models")
   WebFetch(url: "https://docs.provider.com/api", prompt: "Get API format")
   ```

3. **Validate fetched data**
   - Confirm you have current information
   - Don't proceed if fetch fails - ask user for help

4. **THEN implement**
   - Use fetched data, not training data
   - Reference the source in code comments

### When This Applies

**Always fetch external data when issue mentions:**
- ✅ "Use [website] to get [data]"
- ✅ "Check [documentation] for [info]"
- ✅ "Refer to [source] for [specs]"
- ✅ "Get latest [X] from [Y]"
- ✅ Any URL in the issue description
- ✅ "According to [external source]"

**Examples:**

```
✅ CORRECT:
Issue: "Use artificialanalysis.ai to get latest models"
Agent: *First fetches artificialanalysis.ai*
Agent: *Then implements with fetched data*

❌ INCORRECT:
Issue: "Use artificialanalysis.ai to get latest models"
Agent: *Immediately implements with training data*
Agent: *Gets corrected by user*
```

### Checklist Before Implementation

```
☐ Read issue completely
☐ Identify all external data sources mentioned
☐ Fetch ALL external sources using WebFetch
☐ Validate fetched data is current
☐ THEN start implementation
☐ Reference external source in code comments
```

### Why This Matters

- **Training data is outdated** - Models change constantly
- **User provided correct source** - They know better than your training
- **Prevents rework** - Doing it right the first time saves tokens
- **User trust** - Following instructions shows competence

**Token Efficiency:**
- Fetching first: ~500 tokens
- Fixing after wrong implementation: ~5,000-10,000 tokens
- **ROI: 10x-20x token savings**

### Related to Feature Conflict Detection

This is similar to checking GitHub before implementing features. External sources are sources of truth:
- GitHub issues = source of truth for planned work
- External websites = source of truth for current data
- Documentation = source of truth for APIs/specs

**Never rely on training data when external source is provided.**

**See also:** [LESSONS_LEARNED.md: Ignoring External Data Sources in Issue Description](LESSONS_LEARNED.md#lesson-ignoring-external-data-sources-in-issue-description)

---

## GitHub Project Board Management

**MANDATORY:** Keep issue status and project board status in sync at all times.

### GitHub Automation (Enabled)

**GitHub Project workflows handle automatic state transitions:**
- ✅ **Closing an issue** → Auto-moves to "Done"
- ✅ **Reopening an issue** → Auto-moves to "In Progress"

**Agent's responsibility:**
- ❌ Do NOT manually move issues to "Done" when closing (GitHub does this)
- ❌ Do NOT manually move issues when reopening (GitHub does this)
- ✅ DO manually move issues from "Requested" → "In Progress" when starting work
- ✅ DO manually move issues from "In Progress" → "User Testing" after implementation

**Full Issue Lifecycle:**
- **Requested** → Issues ready to be worked on
- **Start work** → Agent manually moves to "In Progress" BEFORE coding
- **Implementation done** → Agent manually moves to "User Testing"
- **User approves** → Agent closes issue (auto-moves to "Done")
- **Need to fix** → Agent reopens issue (auto-moves to "In Progress")

### Working with "Requested" State Issues

**CRITICAL:** When user asks you to work on issues in "Requested" state:

1. **BEFORE writing any code:**
   ```bash
   # Move ALL issues to "In Progress" first
   gh project item-edit --project-id <project-id> --id <item-id> --field-id <status-field> --text "In Progress"
   ```

2. **Then implement all issues together**

3. **After implementation:**
   - Move to "User Testing" (manually)
   - Add UAT criteria to each issue
   - Ask user to test

**Why this matters:**
- User can see at a glance what you're actively working on
- Project board accurately reflects current work state
- Avoids confusion about which issues are "planned" vs "in progress"

**When user says:** "looks good", "approved", "let's move on", "go ahead" → **Close issue** (GitHub auto-moves to "Done").

### Workflow Checklist (Every Issue)

**MANDATORY:** Before starting work on ANY issue, follow this checklist:

```
☐ Read issue completely
☐ Identify external data sources (URLs, docs, etc.)
☐ Move issue to "In Progress" BEFORE writing code
☐ Fetch all external data sources (if applicable)
☐ Implement the feature
☐ Move to "User Testing" AFTER implementation complete
☐ Add UAT criteria to issue
```

**Common mistakes:**
- ❌ Starting implementation without moving to "In Progress"
- ❌ Forgetting to move to "User Testing" after done
- ❌ Skipping external data sources mentioned in issue
- ❌ Using training data instead of fetching current data

**See also:**
- [LESSONS_LEARNED.md: Not Updating Project Board Status During Implementation](LESSONS_LEARNED.md#lesson-not-updating-project-board-status-during-implementation)
- [LESSONS_LEARNED.md: Not Moving "Requested" Issues to "In Progress" Before Starting Work](LESSONS_LEARNED.md#lesson-not-moving-requested-issues-to-in-progress-before-starting-work)
- [LESSONS_LEARNED.md: Ignoring External Data Sources in Issue Description](LESSONS_LEARNED.md#lesson-ignoring-external-data-sources-in-issue-description)

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

## When to Break Up Work

**Only break up work if there are user validation checkpoints at each breakpoint.**

**Break up when:**
- User can test/validate at each step
- User feedback could change what comes next
- Each piece delivers testable value

**Don't break up when:**
- All pieces are infrastructure with no user-facing features until end
- User can't test until everything is integrated
- You're just creating tracking overhead

**See also:** [LESSONS_LEARNED.md: Breaking Up Work Without Validation Checkpoints](LESSONS_LEARNED.md#lesson-breaking-up-work-without-validation-checkpoints)

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
