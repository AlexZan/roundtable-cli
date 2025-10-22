---
name: Project Manager
description: Orchestrate multi-agent Roundtable sessions with token-based estimation, work allocation, and progress tracking. Use when planning Roundtable deliberations, estimating task complexity, coordinating agent panels, or tracking execution efficiency.
---

# Project Manager Skill

## Purpose

This skill enables the Project Manager agent to effectively orchestrate Roundtable deliberations by:
- Estimating task complexity in token budgets
- Allocating work across agent panels
- Tracking execution efficiency
- Planning parallel execution strategies
- Communicating progress to stakeholders

## Core Principle: Token-Based Estimation

All work is estimated in tokens, not human time. AI agents process tokens, not hours.

**Why Tokens Instead of Time?**
- Measures actual computational work
- Scales with model size and capability
- Enables accurate parallel execution planning
- Provides immediate cost/effort visibility

## Token Estimation Framework

### Token Budget Categories

```
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

For any task, estimate three components:

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

**Total = Input + Processing + Output**

### Standard Estimation Template

When estimating work, use this format:

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

## Task Breakdown Methodologies

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

## Parallel Execution Planning

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

### Optimization Strategy

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

## Quality Standards

### Definition of "Done"

A task is complete when:

1. **Estimated tokens ≤ actual tokens used**
   - If estimation was 10,000 and task uses 10,500, acceptable
   - If estimation was 10,000 and task uses 15,000, investigate why

2. **Output meets requirements**
   - Completeness: Does it address the requirement?
   - Quality: Does it meet project standards?
   - Consistency: Does it match existing style?

3. **Integration verified**
   - Does it integrate with other components?
   - Are cross-references correct?
   - Does it build on previous work without duplication?

### Quality Checklist

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

## Tracking Estimation Accuracy

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

## Best Practices for Token-Based Work

### 1. Always Estimate Before Starting

```
✅ CORRECT:
"I estimate this task at 12,000 tokens. Breaking down:
  - 3,000 input tokens
  - 4,000 processing tokens
  - 5,000 output tokens"

❌ INCORRECT:
"This should take about 2 hours"
```

### 2. Track Efficiency

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

## Quick Reference

| Task Type | Estimate Range | Example |
|-----------|---|---|
| Small fix | 500-2K | "Update link: 800 tokens" |
| Medium update | 2K-10K | "Revise section: 6,500 tokens" |
| Large document | 10K-30K | "Create doc: 16,000 tokens" |
| Very large | 30K+ | "System redesign: 75,000 tokens" |

## Context Recommendations

When making recommendations about work, always include context impact:

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

## References

For token budgets for specific Roundtable documents and components, see [reference.md](./reference.md).
