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

## Critical: Scope Clarification Before Implementation

### The Lesson (October 2024)

**What Happened:**
During Phase 1A prototype implementation, a scope mismatch occurred:
- **User requested:** "Start with Phase 1 foundation"
- **I interpreted:** Build validation prototype (~15K tokens, 2-agent debate only)
- **Spec defined "Phase 1":** Complete foundation (~35K tokens, all architectural layers)
- **Result:** Built ~4% of expected Phase 1 features

**Root Cause:**
Ambiguous scope agreement. User said "start with Phase 1 foundation" which could mean:
- **Interpretation A:** Prototype the foundation (validate approach first)
- **Interpretation B:** Build complete foundation (all Phase 1 features)

Without explicit clarification, I chose A, but spec expected B.

**Impact:**
- ✅ What worked: Built working 2-agent prototype, all tests pass
- ❌ What was missed: Skills library, Panel system, PM agent, multiple LLMs, synthesis logic, spec generation, and 40+ other Phase 1 components
- 💡 Learning: Ambiguous scope = high risk of building wrong thing

---

### Mandatory: Explicit Scope Documentation

**BEFORE starting ANY implementation work, agent MUST:**

#### 1. Document What WILL Be Built

Create explicit list with token estimates:

```
SCOPE: Phase 1A Validation Prototype

WHAT WILL BE BUILT (Estimate: 15,000 tokens):
  ✅ Basic CLI with commander + inquirer (2,000 tokens)
  ✅ 2-agent debate engine (Architecture + Product) (4,000 tokens)
  ✅ Claude API integration only (2,000 tokens)
  ✅ 2-round parallel execution (2,000 tokens)
  ✅ JSON session storage (1,500 tokens)
  ✅ Token tracking (1,000 tokens)
  ✅ Friendly error handling (1,500 tokens)
  ✅ Unit tests with mocks (3,000 tokens)

TOTAL IMPLEMENTED: ~15,000 tokens (~4% of full Phase 1)
```

#### 2. Document What Will Be DEFERRED

List everything NOT being built and why:

```
WHAT WILL BE DEFERRED (To Phase 1B+):

❌ Skills Library (~5,000 tokens)
   Reason: Not needed for prototype validation

❌ Panel Formation System (~8,000 tokens)
   Reason: Prototype uses 2 hardcoded agents

❌ Project Manager Agent (~6,000 tokens)
   Reason: Simple debate doesn't need orchestration

❌ Multiple LLMs (GPT-4, Gemini, Grok) (~4,000 tokens)
   Reason: Claude-only validates parallel execution

❌ Synthesis Logic (~5,000 tokens)
   Reason: Not needed with 2 agents

❌ Spec Generation + Templates (~12,000 tokens)
   Reason: Prototype focuses on debate quality

❌ Constitution System (~4,000 tokens)
   Reason: Not needed without panel system

❌ Meeting Facilitator (~6,000 tokens)
   Reason: Simple CLI sufficient for prototype

❌ Context Compression (~3,000 tokens)
   Reason: Single session prototype

❌ Post-Mortem System (~5,000 tokens)
   Reason: Learning loop not in prototype scope

TOTAL DEFERRED: ~58,000+ tokens (~96% of full Phase 1)
```

#### 3. Calculate Implementation Percentage

```
PHASE 1 SCOPE CALCULATION:

Full Phase 1 (from IMPLEMENTATION_ROADMAP.md): ~35,000 tokens
Phase 1A Prototype (this implementation): ~15,000 tokens
Coverage: 15,000 / 35,000 = 42.8%

NOTE: 42.8% is optimistic - actual is ~4% because major
architectural components (Skills, Panels, PM, Synthesis)
are completely absent, not just simplified.

HONEST ASSESSMENT: ~4-10% of Phase 1 features implemented.
```

#### 4. Get Explicit User Confirmation

**Ask user BEFORE starting:**

```
"I propose building Phase 1A Validation Prototype:

WILL BUILD:
  - 2-agent debate (Architecture + Product)
  - Claude API only
  - Basic CLI
  - Session storage
  - Unit tests
  (~15K tokens, ~1 week)

WILL DEFER to Phase 1B+:
  - Skills library
  - Panel system
  - Multiple LLMs
  - PM agent
  - Spec generation
  - All other Phase 1 components
  (~120K tokens, ~3-4 weeks)

This prototype validates core debate mechanics BEFORE
building full system. After testing, we decide:
- Proceed to Phase 1B (if debate works well)
- Iterate on prototype (if needs refinement)
- Rethink approach (if fundamentally flawed)

CONFIRM: Does this match your expectations?"
```

---

### Examples: Good vs Bad Scope Clarification

#### ✅ GOOD: Explicit and Detailed

```
TASK: "Build Phase 1A prototype"

AGENT RESPONSE:
"I propose Phase 1A Validation Prototype:

SCOPE:
  - 2 agents (Architecture, Product) with Claude 4.5 Haiku
  - 2-round parallel debate
  - CLI with Inquirer
  - JSON session storage
  - Token tracking
  - Basic error handling
  - 30+ unit tests (mocked)

ESTIMATE: 15,000 tokens

DEFERRED:
  - Skills library (Phase 1B)
  - Panel formation (Phase 1B)
  - PM agent orchestration (Phase 1B)
  - Multiple LLMs beyond Claude (Phase 1C)
  - Synthesis logic (Phase 1B)
  - Spec template generation (Phase 1D)
  - Constitution system (Phase 2)

COVERAGE: ~10-15% of full Phase 1 features

PURPOSE: Validate multi-agent debate works before
investing in full 140K token implementation.

NEXT STEPS AFTER TESTING:
  - If successful → Phase 1B
  - If needs work → Iterate on 1A
  - If flawed → Rethink approach

Is this the scope you want?"
```

#### ❌ BAD: Vague and Ambiguous

```
TASK: "Build Phase 1 foundation"

AGENT RESPONSE:
"I'll build Phase 1 foundation with basic CLI and agents."

PROBLEMS:
  - What does "foundation" mean?
  - How many agents?
  - Which components?
  - What's deferred?
  - What % of Phase 1?
```

---

### Red Flags: When Clarification Is REQUIRED

If user says ANY of these, agent MUST clarify scope:

```
🚩 "Start with Phase 1"
   → Clarify: Full Phase 1 or Phase 1A prototype?

🚩 "Build the foundation"
   → Clarify: All architectural layers or minimal working code?

🚩 "Implement the basics"
   → Clarify: Which features are "basic"? List them explicitly.

🚩 "Start with MVP"
   → Clarify: MVP of what? List included/excluded features.

🚩 "Let's prototype this"
   → Clarify: Prototype = validation only or first version for production?

🚩 "Build enough to test"
   → Clarify: Test what specifically? List test scenarios.

🚩 "Get something working"
   → Clarify: Working = demonstrable or production-ready?
```

### Scope Clarification Template

When user request is ambiguous, use this template:

```
CLARIFICATION NEEDED

Your request: "[user's exact words]"

This could mean:

INTERPRETATION A: [Minimal scope]
  Will build: [specific list]
  Will defer: [specific list]
  Estimate: [X tokens]
  Timeline: [X days]

INTERPRETATION B: [Moderate scope]
  Will build: [specific list]
  Will defer: [specific list]
  Estimate: [Y tokens]
  Timeline: [Y days]

INTERPRETATION C: [Full scope]
  Will build: [specific list]
  Will defer: [minimal list]
  Estimate: [Z tokens]
  Timeline: [Z days]

Which interpretation matches your intent?
Or provide your own scope definition.
```

---

### Enforcement Rules

**MANDATORY for all implementations:**

1. ✅ **Before writing code:** Document scope explicitly
2. ✅ **List what's built:** With token estimates
3. ✅ **List what's deferred:** With reasons
4. ✅ **Calculate coverage:** What % of spec implemented
5. ✅ **Get confirmation:** User approves scope

**FORBIDDEN:**

1. ❌ **Starting implementation** without explicit scope
2. ❌ **Assuming scope** from vague user requests
3. ❌ **Using terms like** "foundation" or "basics" without definition
4. ❌ **Building without** explicit deferred features list

---

### Why This Matters

**Prevents:**
- Building wrong thing (wasted tokens)
- User disappointment (expected more)
- Scope creep (unclear boundaries)
- Rework (misaligned expectations)

**Enables:**
- Clear agreement (documented scope)
- Efficient work (know what to build)
- Better estimates (explicit boundaries)
- Trust (transparent about limitations)

**Token Cost of Scope Clarification:**
- 500-1,000 tokens to document scope explicitly
- Saves 10,000-50,000 tokens in rework

**ROI: 10-50x**

---

## Status

**Convention Status:** Active and in effect
**Applies To:** All Roundtable development work going forward
**Updated:** 2024-10-22
**Version:** 2.0 (Separated dev conventions from runtime agent behavior)

---

**Remember:** Development conventions stay in CLAUDE.md. Runtime behavior goes in .claude/skills/.
