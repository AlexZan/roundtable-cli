# Agentic Project Management: Managing AI-Driven Development

## Overview

Traditional project management (PMBOK, Agile, Waterfall) assumes **human workers** with constraints:
- Limited capacity (8-hour days)
- Context switching costs
- Communication overhead
- Individual expertise limits
- Burnout and turnover risks

**Agentic project management** assumes **AI agents** with completely different characteristics:
- Perfect parallelization (multiple agents work simultaneously)
- No context switching overhead
- Deterministic coordination (agents follow rules perfectly)
- Emergent problem-solving (agents reason across domains)
- Continuous learning (skills improve from experience)
- Transparent decision-making (full audit trail)

This document defines PM for agentic systems.

---

## Core Principles of Agentic PM

### Principle 1: Token Budgets Replace Time Budgets

**Traditional PM:** "How many hours will this take?"
**Agentic PM:** "How many tokens does this require?"

```
Traditional thinking:
  Developer: 40 hours/week × 4 weeks = 160 hours = 1 person-month
  Cost: $10K (160 hrs × $62.50/hr)

Agentic thinking:
  Task: 24,000 tokens
  Agent window: 200K tokens available
  Cost: $0.72 (24K tokens × $0.00003/token)
  Parallelizable: Yes, can run with other 176K token tasks
```

**Why it matters:**
- Tokens are predictable, measurable, deterministic
- Hours are unpredictable (depends on interruptions, skill level, motivation)
- Tokens enable parallel budgeting across multiple agents
- Token cost is explicit (no hidden overhead)

### Principle 2: Parallelization is Default, Not Exception

**Traditional PM:** Sequential tasks with dependencies
```
Task A → Task B → Task C
Week 1   Week 2   Week 3
```

**Agentic PM:** Parallel execution by default
```
Agent 1: Task A (20K tokens)
Agent 2: Task B (18K tokens)   } Parallel: 38K tokens simultaneous
Agent 3: Task C (15K tokens)

Total: Same 53K tokens
Time: Days instead of weeks
```

**Why it matters:**
- No scheduling overhead (agents coordinate automatically)
- Token budgets compound across agents
- Work completes faster by default
- Resource utilization is maximized

### Principle 3: Quality Metrics Replace Schedule Variance

**Traditional PM:** "Are we on schedule?" (Schedule Performance Index)
**Agentic PM:** "Is output meeting quality standards?" (Quality Performance Index)

```
Traditional metrics:
  - Schedule Variance (actual hrs vs. planned hrs)
  - Cost Variance (actual $ vs. planned $)
  - Risk register (what could go wrong?)

Agentic metrics:
  - Token efficiency (tokens used / tokens estimated)
  - Quality score (output meets standards: 0-1.0)
  - Learning gain (skill improvement: +Δ per phase)
  - Specification match (output vs. requirements: %)
```

**Why it matters:**
- Agents always "stay on schedule" (tokens consumed predictably)
- Schedule variance isn't meaningful (no human delays)
- Quality variance is what matters (agents produce wrong things, not slow things)

### Principle 4: Learning is Continuous, Systemic

**Traditional PM:** Lessons learned at project end
**Agentic PM:** Learning loop built into every phase

```
Traditional:
  Phase 1 → Implementation → Testing → Lessons learned (post-mortem)
            [Execution]              [Learning] ~4 weeks later

Agentic:
  Phase 1 → Implementation → Testing → Learning applied to Phase 2
            [Execution]    ↓          [Immediate improvement]
                    + POST_MORTEM_SYSTEM
                    + FEEDBACK_INTEGRATION
                    Skills improve before Phase 2 starts
```

**Why it matters:**
- Phase 2 benefits from Phase 1 learning immediately
- Skills compound across phases
- Organizational intelligence grows systematically
- No knowledge loss between phases

### Principle 5: Vision Alignment Replaces Stakeholder Management

**Traditional PM:** Managing expectations of multiple people
**Agentic PM:** Ensuring agent output matches human intent

```
Traditional stakeholder challenge:
  Product: "We need feature X"
  Engineering: "That's risky and takes 3 weeks"
  Design: "That breaks UX patterns"
  → Meeting to resolve conflict (1 hour)
  → Agreement (partially satisfied everyone)

Agentic approach:
  Human: "We need feature X"
  → Project Charter defines success criteria
  → Roundtable deliberation surfaces tradeoffs
  → Agents propose solution that satisfies constraints
  → Human validates if output matches intent
  → Complete alignment, not compromise
```

**Why it matters:**
- No political negotiation needed (agents are deterministic)
- Tradeoffs are explicit (not hidden)
- Alignment is measurable (charter vs. output)
- No "surprise" changes mid-project (human defines intent upfront)

---

## Core Components of Agentic PM

### Component 1: Vision Charter (Human Intent)

**Purpose:** Define what success looks like
**Created by:** Human (founder, product owner)
**Consumed by:** AI agents (via Roundtable sessions)

```yaml
vision_charter:
  objective: "Create offline-first task management for remote teams"
  success_criteria:
    - Phase 1 spec complete in 1 week (16K tokens)
    - Implementation complete in 4 weeks (300K tokens)
    - User satisfaction ≥85%
    - Zero data loss on conflicts
  constraints:
    - Budget: 100K tokens per phase
    - Timeline: Phase 1 complete by Dec 16
    - Platforms: Web + mobile
  escalation:
    - User satisfaction <80%: Restart Phase 1 spec
    - Budget >110K tokens: Escalate to sponsor
    - Quality <85%: Extended testing phase
```

**Not in Vision Charter:**
- ❌ How to implement (agents figure that out)
- ❌ Timeline granularity (agents handle sequencing)
- ❌ Resource allocation (token budgets replace this)
- ❌ Risk mitigation (agents identify and handle)

### Component 2: Token Budget Allocation

**Purpose:** Allocate computational resources across tasks
**Created by:** PM (based on scope)
**Monitored by:** Agent orchestrator (tracks actual vs. budgeted)

```
Phase 1 Token Budget: 100,000 tokens

Allocation:
  Roundtable session (spec creation)     20,000 tokens
  Implementation (dev agents)            50,000 tokens
  QA & testing (test agents)             20,000 tokens
  Integration & learning (orchestrator)  10,000 tokens
  ────────────────────────────────────────────────
  Total allocated:                      100,000 tokens
  Reserve (contingency):                 20,000 tokens (20%)
```

**Execution:**
```
Day 1:   Roundtable session (20K) + QA prep (5K) = 25K tokens
Day 2-4: Implementation parallel (50K) + QA parallel (15K) = 65K tokens
Day 5:   Integration + learning (10K)
         Total used: 100K (on budget)
```

**Key insight:** Parallel execution uses same tokens faster.

### Component 3: Quality Gates (Validation Points)

**Purpose:** Ensure output meets standards at phase boundaries
**Triggered by:** Phase completion
**Executed by:** Validation agents

```
Quality Gate: Phase 1 Completion

Checks:
  ☐ Spec completeness: Does output match Vision Charter? (95%+ required)
  ☐ Quality metrics: Are all acceptance criteria met? (100% required)
  ☐ Learning captured: Post-mortem completed? (100% required)
  ☐ Token efficiency: Within budget ±10%? (Yes/No)

Results:
  PASS → Proceed to Phase 2
  FAIL → Identify gap, re-allocate tokens, iterate

Example failure scenario:
  Spec only 85% complete (needed 95%)
  → Re-allocate 5K tokens to fix gaps
  → Re-run phase completion
  → Try again
```

**Why gates matter:**
- Deterministic go/no-go decisions
- No human judgment needed (metrics are objective)
- Automatic iteration if gates fail
- Learning captured before moving forward

### Component 4: Learning Loop (Continuous Improvement)

**Purpose:** Improve agent performance across phases
**Mechanism:** POST_MORTEM_SYSTEM.md + skill updates
**Feedback:** Phase output → skill improvements → Phase N+1 better

```
Phase 1 Execution
  ↓
Phase 1 Complete
  ↓
POST_MORTEM_SYSTEM analysis:
  - What worked well? (Offline sync architecture)
  - What needs improvement? (Conflict UI unclear)
  - Pattern detected? (Mobile performance should be checked earlier)
  ↓
Skill Updates (Agents improve):
  - Architecture skill: Add "mobile platform" to intake questions
  - UX skill: Improve conflict resolution template
  - Security skill: Earlier threat modeling for sync systems
  ↓
Phase 2 Roundtable Session
  Agents now have improved skills
  → Better Phase 2 spec
  → Better Phase 2 implementation
  → Better Phase 2 outcome
```

### Component 5: Parallel Orchestration (Agent Coordination)

**Purpose:** Coordinate multiple agents working simultaneously
**Handles:** Token budget distribution, task dependencies, communication

```
Scenario: 3 agents working in parallel

Agent A: Specification (20K tokens)
  - Read existing docs (3K)
  - Attend Roundtable session (5K)
  - Create spec (12K)
  Status: Day 1-2

Agent B: Development (parallel with A, 50K tokens)
  - Wait for spec (sync point)
  - Implement Phase 1 (50K)
  Status: Day 2-4

Agent C: QA (parallel with B, 20K tokens)
  - Prep test plan (5K, while A is working)
  - Test implementation (15K, parallel with B)
  Status: Day 1-4 (async)

Orchestration rules:
  ✓ C can start test prep while A is creating spec (parallel)
  ✓ B cannot start until spec is ready (dependency)
  ✓ All must fit within 100K token budget total
  ✓ Agents coordinate via token-tagged messages (no overhead)
```

---

## Agentic PM vs. Traditional PM

| Aspect | Traditional PM | Agentic PM |
|--------|---|---|
| **Time Unit** | Hours/days/weeks | Tokens |
| **Scheduling** | Sequential with dependencies | Parallel by default |
| **Variance Tracking** | Schedule/Cost variance | Quality/Learning variance |
| **Risk Management** | Risk register + mitigation | Learning loop + adaptation |
| **Team Management** | Assign people, manage capacity | Allocate tokens, manage budget |
| **Coordination** | Meetings, status reports | Deterministic handoffs |
| **Decision Making** | Committee-based (slow) | Agent-based (fast, deterministic) |
| **Learning** | Post-project retrospective | Continuous, phase-by-phase |
| **Stakeholder Mgmt** | Manage expectations | Validate against charter |
| **Quality** | Schedule-driven release | Quality-gate-driven release |
| **Adaptation** | Change requests (slow) | Learning-driven improvement (fast) |

---

## How Agentic PM Works in Practice

### Scenario: Implement Phase 1 (Roundtable Task Management)

**Vision Charter (Human Intent):**
```
Objective: Create individual task management with offline sync
Success: Spec in 1 week, implementation in 4 weeks, 85%+ satisfaction
Budget: 100K tokens
Timeline: Done by Dec 16
```

**Token Budget Allocation:**
```
Roundtable spec session:    20,000 tokens
Implementation:              50,000 tokens
QA:                         20,000 tokens
Integration/learning:       10,000 tokens
Reserve:                    20,000 tokens
─────────────────────────────────────
Total:                     120,000 tokens
```

**Execution Timeline:**

**Day 1: Spec Creation (20K tokens)**
```
Agent A (Sonnet): Roundtable facilitator
  - Run spec session with user
  - 20K tokens = complete spec package

Output: Spec document with:
  ✓ Requirements
  ✓ Architecture decisions
  ✓ UX patterns
  ✓ Success criteria
  ✓ Implementation roadmap

Quality Gate Check:
  ✓ Spec 95%+ complete? YES
  ✓ All requirements specified? YES
  → PASS: Proceed to implementation
```

**Days 2-4: Parallel Implementation & QA (60K tokens)**
```
Agent B (Haiku): Developer
  - Implement spec per roadmap
  - 50K tokens = Phase 1 code + tests
  - Checkin daily progress

Agent C (Haiku): QA
  - Prep test plan (parallel, 5K)
  - Test implementation as it builds (15K)
  - Report issues for B to fix

Coordination (no meetings, no overhead):
  - B pushes code → C tests
  - C finds issues → B fixes
  - Both track to 60K token budget
  - Both complete by end of Day 4

Quality Gate Check:
  ✓ All acceptance criteria met? YES
  ✓ Test coverage >80%? YES
  ✓ No critical bugs? YES
  → PASS: Proceed to validation
```

**Day 5: Validation & Learning (10K tokens)**
```
Agent D (Claude): Validator
  - Validate output vs. Vision Charter
  - Run POST_MORTEM_SYSTEM
  - Identify skill improvements
  - 10K tokens = complete validation + learning

Output:
  ✓ Phase 1 complete and validated
  ✓ Learning captured
  ✓ Skills improved
  ✓ Ready for Phase 2

Metrics:
  Token efficiency: 95K used / 100K budgeted = 95% (excellent)
  Quality score: 92% (meets >90% target)
  Learning gain: 3 skill improvements identified
  Satisfaction: 88% (meets >85% target)

Gate: ALL PASS
```

**Phase 2 Readiness:**
```
Agents now have:
  ✓ Improved architecture skill (mobile considerations)
  ✓ Better UX patterns (conflict resolution)
  ✓ Better security thinking (sync implications)
  ✓ Organizational knowledge (what worked in Phase 1)

Result: Phase 2 is better/faster than Phase 1
```

---

## Key Metrics for Agentic PM

### Metric 1: Token Efficiency
```
Formula: Tokens Used / Tokens Budgeted
Target: 0.9-1.0 (90-100% utilization)

Interpretation:
  > 1.0 (over budget) = scope creep or underestimation
  0.9-1.0 (on target) = good estimation
  < 0.9 (under budget) = could have done more or over-budgeted
```

### Metric 2: Quality Score
```
Formula: (Criteria Met / Total Criteria) × 100
Target: >90%

Measured:
  ✓ Spec completeness (vs. requirements)
  ✓ Implementation quality (vs. spec)
  ✓ Test coverage (>80% code coverage)
  ✓ Bug status (0 critical, <5 minor)
  ✓ User satisfaction (>85% in testing)
```

### Metric 3: Learning Gain
```
Formula: Skills Improved / Skills Tested
Target: >50% (at least half of skills improve each phase)

Examples:
  Phase 1: 3 skills improved out of 5 tested = 60% learning gain
  Phase 2: 4 skills improved out of 6 tested = 67% learning gain
  Trend: Learning rate increasing (compound knowledge)
```

### Metric 4: Phase Velocity (Not Schedule, but Throughput)
```
Formula: Tokens Delivered / Tokens Budgeted per phase
Target: Improving each phase

Example:
  Phase 1: 95K tokens delivered / 100K budgeted = 95% velocity
  Phase 2: 98K tokens delivered / 105K budgeted = 93% velocity (slight increase in scope)
  Phase 3: 102K tokens delivered / 110K budgeted = 93% velocity
  Trend: Consistent delivery despite increasing scope
```

---

## Agentic PM Best Practices

### Practice 1: Estimate in Tokens, Plan in Parallel

```
❌ WRONG:
  Task A: 50 hours
  Task B: 30 hours
  Total: 80 hours = 2 weeks sequential

✅ RIGHT:
  Task A: 18,000 tokens
  Task B: 12,000 tokens
  Parallel budget: 20,000 tokens available per agent
  Execution: Both fit in parallel, 2 days total
  Can add: Task C (8,000 tokens) also parallel, total 38K tokens
```

### Practice 2: Quality Gates Before Moving Forward

```
✅ GATE-DRIVEN:
  Phase 1 complete?
    ↓ Check quality gates
    Pass? → Phase 2
    Fail? → Fix gaps, re-check, iterate

Benefit: Deterministic go/no-go decisions
         No "good enough" compromises
         Each phase is validated before moving
```

### Practice 3: Continuous Learning, Phase-by-Phase

```
✅ LEARNING-DRIVEN:
  Phase 1:
    - Execute
    - Validate
    - Learn (POST_MORTEM)
    - Skills improve
  ↓
  Phase 2:
    - Better agents (improved skills)
    - Same token budget might deliver more
    - Or same delivery with less tokens
    - Or higher quality with same tokens
```

### Practice 4: Vision Charter, Not Detailed Planning

```
❌ WRONG (Traditional planning):
  Week 1: Auth system (20 hrs)
  Week 2: Database schema (25 hrs)
  Week 3: API endpoints (30 hrs)
  Week 4: Integration (25 hrs)
  [Detailed sequential schedule]

✅ RIGHT (Agentic charter):
  Vision: "Offline-first task app"
  Success: Spec 1 week, impl 4 weeks, 85% satisfaction
  Budget: 100K tokens
  Escalation: Quality <85% → iterate
  [Let agents figure out sequencing]
```

### Practice 5: Async Coordination, No Meetings

```
❌ WRONG:
  Daily standup: 15 min × 5 people = 75 person-minutes
  Weekly planning: 1 hour × 5 people = 300 person-minutes
  Total overhead: 20% of work time lost to meetings

✅ RIGHT (Agentic):
  Agents push progress → updates visible automatically
  Issues: Raised in token-tagged messages
  Coordination: Deterministic handoffs
  Overhead: Near zero (agents don't need meetings)
```

---

## Agentic PM Principles Summary

| Principle | Traditional PM | Agentic PM |
|-----------|---|---|
| **Budget Unit** | Hours/$ | Tokens |
| **Execution** | Sequential | Parallel default |
| **Variance Focus** | Schedule/Cost | Quality/Learning |
| **Adaptation** | Change requests | Learning loop |
| **Coordination** | Meetings | Deterministic handoffs |
| **Success Measure** | On time/budget | Quality gates + learning |
| **Risk** | People (burnout, turnover) | Output quality, scope creep |
| **Learning** | Post-project | Phase-by-phase, continuous |
| **Scalability** | Hire more people | Allocate more tokens |

---

## Conclusion: PM for Agentic Systems

Traditional PM optimizes for:
- ❌ Getting human teams aligned (unnecessary for agents)
- ❌ Managing limited capacity (agents have flexible capacity)
- ❌ Predicting time (tokens are predictable, time isn't)
- ❌ Reducing risk from people (agents are deterministic)

Agentic PM optimizes for:
- ✅ Ensuring output matches human intent
- ✅ Maximizing token efficiency
- ✅ Continuous learning and improvement
- ✅ Parallel execution and throughput
- ✅ Quality gates and validation

The key difference: **Traditional PM manages people. Agentic PM manages output quality and learning.**

Human intent → Vision Charter → Parallel execution → Quality validation → Learning → Better output next phase

That's Agentic Project Management.

---

## How This Integrates with Roundtable

```
ROUNDTABLE AGENTIC PM FLOW:

1. Human defines: Vision Charter (what's success?)

2. PM allocates: Token budgets (how much work?)

3. Agents execute (parallel):
   - Roundtable session (spec)
   - Development (implementation)
   - QA (validation)
   - Learning (post-mortem)

4. Quality gates (is it good?)

5. Learning loop (improve for Phase N+1)

6. Repeat: Phase 2, 3, etc. with improved agents
```

This is what agentic project management looks like.
