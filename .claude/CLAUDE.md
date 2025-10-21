# CLAUDE.md: Roundtable Project AI Agent Conventions

## Overview

This document establishes conventions for Claude (and other AI agents) working on the Roundtable project. The key principle: **All estimates are in tokens, not human time. Human time is no longer applicable.**

---

## Core Principle: Token-Based Estimation

### Why Tokens Instead of Time?

**Human Time Estimation (Old Model):**
- Assumes 1 developer, 8-hour days, sequential work
- Includes breaks, context switching, meetings
- Not applicable to AI agents
- Creates false precision

**Token-Based Estimation (New Model):**
- Measures actual computational work
- AI agents process tokens, not hours
- More accurate for parallel execution
- Scales with model size and capability

### Token Estimation Framework

```
Token Budget Categories:

SMALL TASK (500-2,000 tokens):
  - Fix a bug
  - Update a single section
  - Create a small template
  - Review a document
  Example: "Estimate: 1,200 tokens"

MEDIUM TASK (2,000-10,000 tokens):
  - Create a document (3-5 KB)
  - Refactor a process
  - Integrate two systems
  Example: "Estimate: 6,500 tokens"

LARGE TASK (10,000-30,000 tokens):
  - Create comprehensive document (10-15 KB)
  - Build integration across multiple components
  - Major refactoring or redesign
  Example: "Estimate: 22,000 tokens"

VERY LARGE TASK (30,000+ tokens):
  - Complete system redesign
  - Create entire system from scratch
  - Comprehensive rewrite of multiple components
  Example: "Estimate: 75,000 tokens"
```

### How to Estimate

For any task, estimate:

**1. Input tokens needed:**
- How much context must be read/understood?
- How many files/documents to review?
- How much existing code to analyze?

**2. Processing tokens needed:**
- How much reasoning is required?
- How complex are the decisions?
- How much analysis is needed?

**3. Output tokens needed:**
- How much new content to generate?
- How complex is the output?
- How detailed should documentation be?

**4. Total = Input + Processing + Output**

---

## Estimation Examples

### Example 1: Create a New Document

**Task:** Create PROJECT_MANAGEMENT_PLAN.md

**Estimation Breakdown:**
- Input: Read PHASED_DEVELOPMENT.md, SPEC.md, PROJECT_CHARTER_AND_INITIATION.md (3,000 tokens)
- Processing: Design structure, organize sections, create examples (5,000 tokens)
- Output: Write ~15,000-word document (8,000 tokens)
- **Total: ~16,000 tokens**

**Output Format:** "Estimate: 16,000 tokens"

---

### Example 2: Fix a Bug

**Task:** Fix scope creep in PHASED_DEVELOPMENT.md

**Estimation Breakdown:**
- Input: Read PHASED_DEVELOPMENT.md and related docs (1,000 tokens)
- Processing: Identify issue, design solution (800 tokens)
- Output: Make edits and test (600 tokens)
- **Total: ~2,400 tokens**

**Output Format:** "Estimate: 2,400 tokens"

---

### Example 3: Integration Task

**Task:** Integrate PROJECT_MANAGEMENT_PLAN into existing Roundtable flow

**Estimation Breakdown:**
- Input: Read PROJECT_CHARTER.md, PHASED_DEVELOPMENT.md, DEVELOPER_AGENT_INTEGRATION.md (4,000 tokens)
- Processing: Design integration points, identify dependencies (6,000 tokens)
- Output: Update 3-4 documents with integration references (5,000 tokens)
- **Total: ~15,000 tokens**

**Output Format:** "Estimate: 15,000 tokens"

---

## When Estimating, Always Include

### Standard Estimation Template

```
TASK: [Task name]

ESTIMATE: [Number] tokens

BREAKDOWN:
  Input tokens: [Breakdown]
  Processing tokens: [Breakdown]
  Output tokens: [Breakdown]

UNCERTAINTY: [Low/Medium/High]

NOTES: [Any special considerations]
```

### Example Complete Estimation

```
TASK: Create MONITORING_AND_CONTROLLING.md

ESTIMATE: 18,000 tokens

BREAKDOWN:
  Input tokens: 3,500
    - Read PHASED_DEVELOPMENT.md (1,000)
    - Read PROJECT_MANAGEMENT_PLAN.md (1,500)
    - Review existing monitoring mentions (1,000)

  Processing tokens: 6,500
    - Design KPI framework (2,000)
    - Plan dashboard structure (2,000)
    - Design variance analysis examples (2,500)

  Output tokens: 8,000
    - Write ~12,000-word document (8,000)

UNCERTAINTY: Low
  (Clear requirements from PMP_ANALYSIS.md)

NOTES:
  - Will reference POST_MORTEM_SYSTEM.md for metrics
  - Will integrate with FEEDBACK_INTEGRATION.md
  - Dashboard examples should match real projects
```

---

## Task Breakdown for Roundtable Projects

### For Writing Documentation

**Estimate calculation:**
- Input: 1-2 tokens per word of source material to read
- Processing: 0.5-1 token per word of output (reasoning/organization)
- Output: ~0.5-1 token per word of final document

**For a 5,000-word document:**
- Input: ~3,000 tokens
- Processing: ~3,000 tokens
- Output: ~3,000 tokens
- **Total: ~9,000 tokens**

### For Code/Integration Work

**Estimate calculation:**
- Input: 2-3 tokens per line of code to understand
- Processing: 1-2 tokens per line to reason about
- Output: 1-1.5 tokens per line to generate

**For 500 lines of code:**
- Input: ~1,500 tokens
- Processing: ~1,000 tokens
- Output: ~750 tokens
- **Total: ~3,250 tokens**

### For Architecture/Design Work

**Estimate calculation:**
- Input: 0.5-1 token per concept to understand
- Processing: 2-3 tokens per concept to reason about
- Output: 1-2 tokens per concept to document

**For 10 major concepts:**
- Input: ~5,000-10,000 tokens
- Processing: ~20,000-30,000 tokens
- Output: ~10,000-20,000 tokens
- **Total: ~35,000-60,000 tokens**

---

## Roundtable-Specific Conventions

### 1. Always Reference Existing Documents

**Old convention:** "See PROJECT_MANAGER_AGENT.md"
**New convention:** "See PROJECT_MANAGER_AGENT.md (estimate: read 3,000 tokens)"

This helps track total token consumption for understanding context.

### 2. Always Provide Token Estimates for Recommendations

**Old convention:** "This would take 3 hours"
**New convention:** "Estimate: 12,000 tokens to create this document"

This is immediately actionable for AI agents.

### 3. Always Track Context Window Impact

When making recommendations, note:

```
TASK RECOMMENDATION:

Description: Create CHANGE_MANAGEMENT.md

Tokens Required: 8,500
  - 2,000 input (read relevant docs)
  - 3,000 processing (design)
  - 3,500 output (write document)

Context Impact: This task fits in a 100K token window
with 81,500 tokens remaining for other work.

Parallelizable: Yes, can run in parallel with other
document creation tasks up to total window limit.
```

---

## Parallel Execution Considerations

### Token Budget for Parallel Tasks

**Single Agent with 100K Token Window:**
- Can handle 1 large task (20-30K tokens)
- + 1 medium task (5-10K tokens)
- + 1-2 small tasks (1-2K each)
- = ~40-45K tokens used, 55-60K remaining

**Multiple Agents (Swarm Model):**
- Agent 1: Large task (25K tokens)
- Agent 2: Large task (25K tokens)
- Agent 3: Medium task (8K tokens)
- Total: 58K tokens across 3 agents

**Optimization Strategy:**
Always calculate if tasks can run in parallel within token budgets.

```
RECOMMENDED EXECUTION:

Task A: Create PROJECT_MANAGEMENT_PLAN.md (16,000 tokens)
Task B: Create MONITORING_AND_CONTROLLING.md (18,000 tokens)

Can be parallelized? YES
  - Task A uses 16K, Task B uses 18K
  - Total: 34K (fits in 100K window with 66K left)
  - Recommend: Run in parallel
```

---

## Quality Standards for Token-Based Work

### Definition of "Done"

A task is complete when:

1. **Estimated tokens ≤ actual tokens used**
   - If estimation was 10,000 and task uses 10,500, acceptable
   - If estimation was 10,000 and task uses 15,000, investigate why

2. **Output meets requirements**
   - Completeness: Does it address the requirement?
   - Quality: Does it meet Roundtable standards?
   - Consistency: Does it match existing documentation style?

3. **Integration verified**
   - Does it integrate with other components?
   - Are cross-references correct?
   - Does it build on previous work without duplication?

### Quality Checklist Template

```
TASK: [Task name]

TOKEN EFFICIENCY:
  ☐ Estimated tokens: [X]
  ☐ Actual tokens used: [Y]
  ☐ Ratio (Y/X): [ratio]
  ☐ Status: ✅ On target / ⚠️ Over / ✅ Under

COMPLETENESS:
  ☐ All requirements addressed
  ☐ Examples provided
  ☐ Integration points documented

QUALITY:
  ☐ Consistent with documentation style
  ☐ Cross-references checked
  ☐ No duplication with existing docs

INTEGRATION:
  ☐ Links to related documents work
  ☐ References from other docs updated
  ☐ Fits into documentation structure
```

---

## Estimation Accuracy Targets

### Acceptable Estimation Variance

```
Estimate: 10,000 tokens
Acceptable range: 9,000-11,000 tokens (±10%)

Estimate: 5,000 tokens
Acceptable range: 4,500-5,500 tokens (±10%)

Estimate: 20,000 tokens
Acceptable range: 18,000-22,000 tokens (±10%)
```

**Target:** Estimates within ±10% of actual usage

### Improving Estimates Over Time

```
Project 1:
  5 tasks estimated, actual vs. estimate ratio: 1.15 (15% over)

Project 2:
  8 tasks estimated, actual vs. estimate ratio: 1.08 (8% over)

Project 3:
  12 tasks estimated, actual vs. estimate ratio: 0.98 (2% under)

Trend: Improving accuracy, approaching ±5% target
```

---

## Token Budgets for Roundtable Documents

### Existing Document Sizing

```
VISION_AND_PHILOSOPHY.md                    ~17,000 tokens
PROJECT_MANAGER_AGENT.md                    ~16,000 tokens
POST_MORTEM_SYSTEM.md                       ~18,000 tokens
ITERATIVE_SPEC_EMERGENCE.md                 ~15,000 tokens
USER_INTERACTION_CONTROL.md                 ~14,000 tokens
PHASED_DEVELOPMENT.md                       ~20,000 tokens
CONTEXT_COMPRESSION.md                      ~4,500 tokens
FEEDBACK_INTEGRATION.md                     ~12,000 tokens
DEVELOPER_AGENT_INTEGRATION.md              ~15,000 tokens
SKILLS.md                                   ~14,000 tokens
CONSTITUTIONS.md                            ~12,000 tokens
EXPERT_PANELS.md                            ~11,000 tokens

TOTAL CURRENT DOCUMENTATION: ~178,500 tokens
```

### Recommended New Document Sizing

```
PROJECT_MANAGEMENT_PLAN.md                  ~16,000 tokens (est)
MONITORING_AND_CONTROLLING.md               ~18,000 tokens (est)
PHASE_CLOSURE_AND_LESSONS.md                ~12,000 tokens (est)
CHANGE_MANAGEMENT.md                        ~8,000 tokens (est)
STAKEHOLDER_MANAGEMENT.md                   ~8,000 tokens (est)
RISK_MANAGEMENT.md                          ~12,000 tokens (est)

TOTAL NEW DOCUMENTATION: ~74,000 tokens
GRAND TOTAL: ~252,500 tokens
```

---

## Best Practices for Token-Based Work

### 1. Always Estimate Before Working

```
✅ CORRECT:
"I estimate this task at 12,000 tokens. Breaking down:
  - 3,000 input tokens
  - 4,000 processing tokens
  - 5,000 output tokens"

❌ INCORRECT:
"This should take about 2 hours"
```

### 2. Track Token Efficiency

```
✅ CORRECT:
"Estimated 12,000 tokens. Used 11,800 tokens (98% efficient)"

❌ INCORRECT:
"Done! Took about 2 hours"
```

### 3. Plan Around Token Windows

```
✅ CORRECT:
"Available: 100K window
  Task A: 25K tokens
  Task B: 22K tokens
  Task C: 15K tokens
  Total: 62K (38K remaining)
  Recommendation: Execute all 3 in parallel"

❌ INCORRECT:
"I can probably do 3-4 tasks today"
```

### 4. Optimize for Token Efficiency

```
✅ CORRECT:
"Instead of rewriting 10,000 tokens of content,
  fix the 500-token issue. More efficient."

❌ INCORRECT:
"Let me rewrite the whole section"
```

---

## Quick Reference

| Task Type | Estimate Range | Example |
|-----------|---|---|
| Small fix | 500-2K | "Update link: 800 tokens" |
| Medium update | 2K-10K | "Revise section: 6,500 tokens" |
| Large document | 10K-30K | "Create doc: 16,000 tokens" |
| Very large | 30K+ | "System redesign: 75,000 tokens" |

---

## Applying This to Roundtable Work

### When Planning Document Creation

**Instead of:**
"Create PROJECT_MANAGEMENT_PLAN.md in 3 hours"

**Use:**
"Create PROJECT_MANAGEMENT_PLAN.md
Estimate: 16,000 tokens
Agent: Sonnet (balanced capability/cost)
Parallelizable: Yes, can run with MONITORING_AND_CONTROLLING.md"

### When Tracking Progress

**Instead of:**
"3 hours in, halfway done"

**Use:**
"8,000 tokens used of 16,000 estimated (50% complete)
On track for efficient completion"

### When Planning Implementation

**Instead of:**
"We can do all 3 documents this week"

**Use:**
"Tier 1: 46,000 tokens total
Parallel approach: 3 agents, 1 session, fits efficiently
Sequential approach: 1 agent, needs 46K from window"

---

## Status

**Convention Status:** Active and in effect
**Applies To:** All Roundtable work going forward
**Updated:** 2024-10-21
**Version:** 1.0

---

**Remember:** All future estimates use tokens. Human time is no longer applicable.
