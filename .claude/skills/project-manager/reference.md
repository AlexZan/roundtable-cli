# Project Manager Skill - Reference

## Token Budgets for Roundtable Documents

### Existing Documentation

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

### Planned New Documentation

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

## Quick Estimation Reference

### Common Document Sizes

| Document Type | Typical Length | Token Estimate |
|---|---|---|
| Short guide (2-3 KB) | 500-1,000 words | 3,000-5,000 |
| Medium document (5-8 KB) | 1,500-2,500 words | 6,000-10,000 |
| Comprehensive guide (10-15 KB) | 3,000-4,500 words | 12,000-18,000 |
| Large spec (20-30 KB) | 5,000-7,000 words | 20,000-28,000 |

### Common Code Tasks

| Task Type | Typical Scope | Token Estimate |
|---|---|---|
| Bug fix | 5-20 lines changed | 500-1,500 |
| Single function | 20-50 lines | 2,000-4,000 |
| Module refactor | 100-300 lines | 5,000-10,000 |
| Feature implementation | 300-1,000 lines | 12,000-25,000 |
| System redesign | 1,000+ lines | 30,000+ |

## Estimation Formulas

### Documentation

```
Total Tokens = Input + Processing + Output

Where:
  Input = (source_files × 1000) + (documentation_size × 0.5)
  Processing = (complexity × 1000) + (examples × 500)
  Output = final_document_words × 0.6
```

### Code

```
Total Tokens = Input + Processing + Output

Where:
  Input = lines_of_code_to_understand × 2.5
  Processing = (complexity × 500) + (logic_branches × 300)
  Output = lines_of_code_to_generate × 1.2
```

### Architecture/Design

```
Total Tokens = Input + Processing + Output

Where:
  Input = concepts_to_understand × 1000
  Processing = concepts × 2500
  Output = documentation_concepts × 1500
```

## Roundtable-Specific Conventions

### When Recommending Work

**Always include:**
- Estimated tokens (not hours)
- Input/processing/output breakdown
- Uncertainty level (Low/Medium/High)
- Parallelizability
- Impact on context window
- Integration points with existing work

### Example Recommendation

```
RECOMMENDATION: Create CHANGE_MANAGEMENT.md

ESTIMATE: 8,500 tokens
  - Input: 2,000 tokens (read PROJECT_MANAGEMENT_PLAN.md, FEEDBACK_INTEGRATION.md)
  - Processing: 3,000 tokens (design change framework)
  - Output: 3,500 tokens (write ~5,000-word document)

UNCERTAINTY: Low (clear requirements)

CONTEXT IMPACT:
  - Fits in 100K window with 91,500 tokens remaining
  - Can parallelize with other documentation tasks

INTEGRATION:
  - Links to PROJECT_MANAGEMENT_PLAN.md
  - Referenced by PHASE_CLOSURE_AND_LESSONS.md
  - Standalone document (no prerequisites)

RECOMMENDATION: ✅ Proceed with implementation
```

## Parallel Execution Examples

### Example 1: Two Large Tasks

```
Task A: Create PROJECT_MANAGEMENT_PLAN.md (16,000 tokens)
Task B: Create MONITORING_AND_CONTROLLING.md (18,000 tokens)

Total: 34,000 tokens
Window: 100,000 tokens
Remaining: 66,000 tokens

Status: ✅ Can run in parallel
Rationale: Well under window limit with room for additional tasks
```

### Example 2: Multiple Mixed Tasks

```
Task A: Fix authentication bug (1,200 tokens)
Task B: Create API documentation (6,500 tokens)
Task C: Refactor session management (8,000 tokens)
Task D: Design metrics system (4,000 tokens)

Total: 19,700 tokens
Window: 100,000 tokens
Remaining: 80,300 tokens

Status: ✅ Can run all in parallel
Grouping: A+B (dependent on system stability)
          C+D (independent)
Execution: Run C+D in parallel, then A+B
```

### Example 3: Over-capacity Scenario

```
Task A: Create PROJECT_MANAGEMENT_PLAN.md (16,000 tokens)
Task B: Create MONITORING_AND_CONTROLLING.md (18,000 tokens)
Task C: Create RISK_MANAGEMENT.md (12,000 tokens)
Task D: Create STAKEHOLDER_MANAGEMENT.md (8,000 tokens)
Task E: Create CHANGE_MANAGEMENT.md (8,000 tokens)

Total: 62,000 tokens
Window: 100,000 tokens
Remaining: 38,000 tokens

Status: ⚠️ Can run all in single session

STRATEGY 1 - Sequential:
  Run tasks A, B, C in session 1 (46,000 tokens)
  Run tasks D, E in session 2 (16,000 tokens)

STRATEGY 2 - Parallel (split window):
  Parallel Group 1: A, C (28,000 tokens)
  Parallel Group 2: B, D, E (34,000 tokens)
  Risk: Both groups exceed 30K, may need splitting

RECOMMENDATION: Strategy 1 (sequential by priority)
```

## Model Selection for Estimation

Different Claude models suit different estimation tasks:

| Model | Strength | When to Use | Cost |
|---|---|---|---|
| Claude 3.5 Haiku | Fast, token-efficient | Routine estimation, quick planning | $0.80/$4 per MTok |
| Claude 3.5 Sonnet | Balanced quality/speed | Complex estimation, architecture decisions | $3/$15 per MTok |
| Claude 3 Opus | Deep analysis | Detailed breakdowns, unknown complexity | $15/$60 per MTok |

**Roundtable Convention:**
- Default to Haiku for routine work (70% cost savings)
- Use Sonnet for complex decisions or novel tasks
- Reserve Opus for high-stakes architectural work

---

**Last Updated:** 2024-10-22
**Version:** 1.0
**Skill Name:** Project Manager
