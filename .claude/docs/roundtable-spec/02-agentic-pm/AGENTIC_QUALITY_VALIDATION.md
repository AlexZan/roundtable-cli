# Agentic Quality Validation: Measuring Vision Adherence vs. Cost

## Core Principle

**The only metric that matters for agentic systems:**

```
QUALITY = Vision Adherence × (1 / Cost)

Where:
  Vision Adherence = How well the output matches the original vision (0-100%)
  Cost = Token budget consumed + Human time invested
```

**In practical terms:**

```
Perfect vision match at 50% of token budget = Excellent
Perfect vision match at 100% of token budget = Good
90% vision match at 80% of token budget = Good
70% vision match at 100% of token budget = Acceptable
50% vision match at 100% of token budget = Iterate
```

---

## Why This Metric Replaces Traditional PM Metrics

### Traditional PM: "Were we on schedule?"
```
Metric: Schedule Variance (Actual Hours vs. Planned Hours)
Problem: Not applicable to agents (no human schedule variance)
Result: Meaningless metric
```

### Traditional PM: "Did we stay in budget?"
```
Metric: Cost Variance (Actual $ vs. Planned $)
Problem: Token costs are deterministic, human $ is unpredictable
Result: Measures cost of human planning/testing, not agent work
```

### Traditional PM: "Are we meeting requirements?"
```
Metric: Scope completion (Features delivered / Features planned)
Problem: Doesn't account for quality of features or cost efficiency
Result: Incomplete picture - feature count ≠ value delivered
```

### Agentic Quality: "Did we deliver the vision efficiently?"
```
Metric: Vision Adherence Score × (1 / Token Efficiency) × (1 / Human Investment)
Problem: None - directly measures what matters for agentic systems
Result: Complete picture - quality output at reasonable cost
```

---

## Component 1: Vision Adherence Score (0-100%)

Vision Adherence measures: **How well does the final result match what humans asked for?**

### Measuring Vision Adherence

Step 1: Extract Success Criteria from Vision Charter
```
From Vision Charter (see AGENTIC_EXECUTION_PLAN.md):

Success Criteria:
1. [MUST] Search relevance ≥ 85%
2. [MUST] Search latency < 500ms (99th percentile)
3. [MUST] Scale to 1M products
4. [SHOULD] Personalization improves results 10%
5. [SHOULD] Support price/rating/availability filters
6. [NICE] Mobile-optimized UX
```

Step 2: Define Validation Approach for Each Criterion
```
Criterion 1: Relevance ≥ 85%
  Validation Method: Run 1,000-query test set, measure relevance score
  Acceptable: Score ≥ 85%
  Weight: 20% of score (MUST criteria = double weight)

Criterion 2: Latency < 500ms (99th percentile)
  Validation Method: Run load test with 100 concurrent users, measure P99
  Acceptable: P99 latency < 500ms
  Weight: 20% of score (MUST criteria = double weight)

Criterion 3: Scale to 1M products
  Validation Method: Index 1M products, verify search performance
  Acceptable: No performance degradation beyond Criterion 2 limits
  Weight: 20% of score (MUST criteria = double weight)

Criterion 4: Personalization +10%
  Validation Method: A/B test personalized vs. non-personalized
  Acceptable: Personalized scores 10% higher
  Weight: 10% of score (SHOULD criteria = base weight)

Criterion 5: Filters (price/rating/availability)
  Validation Method: Test filter functionality
  Acceptable: All 3 filters work, reduce results correctly
  Weight: 10% of score (SHOULD criteria = base weight)

Criterion 6: Mobile-optimized UX
  Validation Method: QA review on mobile device
  Acceptable: Loads in < 2 seconds, readable, clickable
  Weight: 10% (NICE criteria = reduced weight)

Total weights: 100%
```

Step 3: Calculate Vision Adherence Score
```
Vision Adherence Score = Σ(Criterion Score × Weight)

Example Results After Phase 4 (Quality Validation):

Criterion 1 (Relevance): ✅ 92% achieved, 20% weight = 20 points ✓
Criterion 2 (Latency): ✅ 480ms achieved, 20% weight = 20 points ✓
Criterion 3 (Scale): ✅ 1M products verified, 20% weight = 20 points ✓
Criterion 4 (Personalization): ⚠️ 8% achieved (need 10%), 10% weight = 8 points
Criterion 5 (Filters): ✅ All 3 filters work, 10% weight = 10 points ✓
Criterion 6 (Mobile UX): ✅ Loads 1.8s, readable, 10% weight = 10 points ✓

TOTAL VISION ADHERENCE SCORE: 88/100 = 88%

Interpretation:
- 88% of the vision has been realized
- Primary gap: Personalization (8% vs. 10% target)
- Decision: Acceptable to proceed (all MUST criteria met, 1 SHOULD partially met)
```

### Vision Adherence Categories

```
Vision Adherence Score | Status | Decision
─────────────────────────────────────────────────
95-100%                | Perfect| Proceed to production
90-94%                 | Excellent| Proceed with minor adjustments
85-89%                 | Good   | Proceed if MUST criteria met
80-84%                 | Acceptable| Proceed with documented gaps
70-79%                 | Needs Work| Iterate current phase (extend budget)
<70%                   | Fail   | Escalate to sponsor or redesign
```

---

## Component 2: Token Efficiency (0.8 - 1.2 range)

Token Efficiency measures: **Did agents estimate and execute within token budget?**

### Calculating Token Efficiency

```
Token Efficiency = Tokens Estimated / Tokens Actually Consumed

Ideal range: 0.9 - 1.1 (within ±10% of estimate)
- 1.0 = Perfect estimation
- 0.9 = Used 10% fewer tokens than estimated (efficient)
- 1.1 = Used 10% more tokens than estimated (acceptable overrun)
- 0.8 = Used 20% fewer tokens (underestimated complexity)
- 1.2 = Used 20% more tokens (overestimated complexity or discovered issues)
```

### Tracking Token Consumption per Phase

```
PHASE 1 TOKEN CONSUMPTION

Agent 1 (Product Discovery):
  Estimated: 10,000 tokens
  Actual: 9,800 tokens
  Efficiency: 0.98 ✓

Agent 2 (Data Architecture):
  Estimated: 6,500 tokens
  Actual: 7,100 tokens
  Efficiency: 1.09 (slight overrun, acceptable)

PHASE 1 SUMMARY:
  Total Estimated: 16,500 tokens
  Total Actual: 16,900 tokens
  Phase Efficiency: 0.97 (within acceptable range)
```

### Token Efficiency Decision Rules

```
Efficiency | Interpretation | Action
─────────────────────────────────────────────
0.90-1.10  | Perfect estimation | Continue as planned
0.80-0.89  | Underestimated (scope less than expected) | Continue, note for future
1.11-1.25  | Slight overestimation (issues found) | Continue, document issues
1.26-1.50  | Significant overrun (complexity underestimated) | Investigate, plan reserves
>1.50      | Major overrun (scope creep or misunderstanding) | Escalate, re-estimate project
```

---

## Component 3: Human Investment Cost

Human Investment measures: **How much human time did this require?**

### Categories of Human Time

```
Category 1: PLANNING INVESTMENT
  - Defining vision charter
  - Reviewing/approving execution plan
  - Setting success criteria
  Typical: 4-8 hours per project (1-2 person-days)

Category 2: QUALITY/TESTING INVESTMENT
  - QA testing and validation
  - Stakeholder review/sign-off
  - Test result interpretation
  Typical: 8-16 hours per project (1-2 person-days)

Category 3: DECISION INVESTMENT
  - Design review decisions
  - Escalation resolution
  - Scope change decisions
  Typical: 2-4 hours per project

Category 4: INTEGRATION INVESTMENT
  - Deployment coordination
  - Production handoff
  - Monitoring setup
  Typical: 4-8 hours per project (post-completion)
```

### Measuring Human Investment

```
PROJECT: E-Commerce Search Improvement

Phase 1 - Planning & Vision Definition
  Activity: Stakeholder interviews, vision charter creation
  Time: 6 hours
  Team: VP Product + Senior Architect
  Cost: 6 hours × $150/hr = $900

Phase 2-3 - QA & Validation
  Activity: Test execution, performance validation, stakeholder review
  Time: 12 hours
  Team: QA Lead (8 hrs) + Product Manager (4 hrs)
  Cost: 12 hours × $120/hr = $1,440

Phase 4 - Decision Review
  Activity: Review test results, decide on personalization gap
  Time: 2 hours
  Team: VP Product
  Cost: 2 hours × $150/hr = $300

Phase 5 - Production Handoff
  Activity: Deploy to production, set up monitoring
  Time: 4 hours
  Team: DevOps Engineer
  Cost: 4 hours × $130/hr = $520

TOTAL HUMAN INVESTMENT: 24 hours, $3,160

Token Cost: 50,000 tokens × $0.00003/token = $1.50

TOTAL PROJECT COST: $3,160 human + $1.50 agent = $3,161.50
  - Human: 99.95%
  - Agent: 0.05%
```

### The Key Insight: Human Time Matters More Than Token Cost

```
This shows why the metric is Vision Adherence × (1 / Cost):

Agent cost is negligible ($1.50)
Human cost dominates ($3,160)

Therefore: Focus on reducing human time while maintaining vision adherence

Optimization Strategy 1: Reduce Planning Time
  - Better vision templates → reduce stakeholder interviews
  - Clear success criteria upfront → less iteration
  - Potential savings: 50% of planning time = $450

Optimization Strategy 2: Reduce QA Time
  - Build automated testing into agent execution
  - Run validation gates automatically
  - Potential savings: 50% of QA time = $720

Optimization Strategy 3: Reduce Decision Time
  - Clear escalation rules in advance
  - Automated decision gates for go/no-go
  - Potential savings: 50% of decision time = $150

TARGET: Reduce human investment from 24 hours to 12 hours
Impact: $3,160 → $1,580 (50% cost reduction)
```

---

## Unified Quality Metric: Vision Adherence at Cost

### Formula

```
Quality Score = Vision Adherence % × (1 / Token Efficiency) × (1 / Human Cost Index)

Where:
  Vision Adherence % = How well output matches vision (0-100%)
  Token Efficiency = Tokens Used / Tokens Estimated (0.8-1.2 ideal)
  Human Cost Index = Actual Human Hours / Target Human Hours (1.0 ideal)
```

### Example Calculation

```
PROJECT: E-Commerce Search Improvement (Phase 4 Validation)

Vision Adherence: 88%
Token Efficiency: 0.98 (used 50,100 tokens of 51,000 estimated)
Human Cost Target: 24 hours (baseline)
Human Cost Actual: 24 hours
Human Cost Index: 1.0

Quality Score = 88% × (1/0.98) × (1/1.0)
              = 0.88 × 1.02 × 1.0
              = 0.898
              = 89.8% Quality Score

Interpretation: This project delivered vision adherence above 85%,
with perfect token estimation and on-target human investment.
Status: EXCELLENT (ready for production)
```

### Quality Score Categories

```
Quality Score | Status         | Decision
─────────────────────────────────────────────────
95%+          | Exceptional    | Proceed immediately
90-94%        | Excellent      | Proceed with confidence
85-89%        | Good           | Proceed (review one gap)
80-84%        | Acceptable     | Proceed (document issues)
75-79%        | Needs Review   | Fix before proceeding
<75%          | Fail           | Escalate or redesign
```

---

## Quality Gates: Phase-by-Phase Validation

### Phase 1 Quality Gate: Requirements Validation

**Objective:** Ensure vision has been properly translated to requirements

**Validation Approach:**
```
Requirement 1: Accuracy ≥ 85%
  Check: Test set prepared? ✓
  Check: Baseline measured? ✓
  Check: Target validated? ✓

Requirement 2: Latency < 500ms
  Check: Load testing plan defined? ✓
  Check: Performance targets set? ✓
  Check: Monitoring approach documented? ✓

(Continue for all requirements...)
```

**Quality Gate Checklist:**
```
☐ All MUST success criteria have measurable tests
☐ Test data prepared and validated
☐ Baseline measurements established
☐ Stakeholder approval obtained
☐ Requirements document matches vision charter
☐ No new scope has been added

Quality Gate Decision:
  IF all checks pass → PROCEED to Phase 2
  IF some checks fail → ITERATE Phase 1 (use 3K additional tokens)
  IF major gaps → ESCALATE to sponsor
```

---

### Phase 2 Quality Gate: Design Validation

**Objective:** Ensure design achieves vision requirements

**Validation Approach:**
```
Design Criterion 1: Performance Architecture
  Benchmark: Can design support 500ms latency target?
  Validation: Architecture review + estimation
  Success: Expert consensus that design achieves target

Design Criterion 2: Scalability
  Benchmark: Can design scale to 1M products?
  Validation: Database design review + capacity planning
  Success: No architectural bottlenecks identified

(Continue for all design criteria...)
```

**Quality Gate Checklist:**
```
☐ All requirements have corresponding design elements
☐ Performance targets are technically feasible
☐ Scalability assumptions are documented
☐ Trade-offs are explicitly noted
☐ Risk areas are identified
☐ Stakeholder design review passed

Quality Gate Decision:
  IF all checks pass → PROCEED to Phase 3
  IF performance concerns → ITERATE Phase 2 (address bottleneck)
  IF feasibility issues → RETURN to Phase 1 (requirements conflict)
```

---

### Phase 3 Quality Gate: Implementation Validation

**Objective:** Ensure implementation matches design and passes quality standards

**Validation Approach:**
```
Code Quality: Does code meet standards?
  Validation: Automated lint, type checking, security scanning
  Success: Zero critical issues, <5 warnings

Test Coverage: Are all requirements tested?
  Validation: Automated test execution
  Success: ≥95% code coverage on critical paths

Performance: Does implementation meet performance targets?
  Validation: Load testing on staging
  Success: P99 latency < 500ms with 100 concurrent users
```

**Quality Gate Checklist:**
```
☐ All code passes lint/type checking
☐ Security scan passed
☐ Unit tests have ≥95% coverage
☐ Integration tests verify all requirements
☐ Performance testing on staging environment passed
☐ No regressions in existing functionality

Quality Gate Decision:
  IF all checks pass → PROCEED to Phase 4
  IF performance fails → DEBUG Phase 3 (extend budget if needed)
  IF security issues → REMEDIATE Phase 3 (mandatory)
```

---

### Phase 4 Quality Gate: Stakeholder Sign-Off

**Objective:** Final validation that output matches vision before production

**Validation Approach:**
```
User Acceptance: Do stakeholders accept the result?
  Validation: Stakeholder testing and review
  Success: ≥80% stakeholder approval

Vision Match: How well does output match original vision?
  Validation: Measure Vision Adherence Score
  Success: ≥85% vision adherence (all MUST criteria met)

Business Impact: Are business metrics improving?
  Validation: A/B test results (if applicable)
  Success: Baseline metrics confirm improvement
```

**Quality Gate Checklist:**
```
☐ All MUST success criteria met
☐ ≥80% of SHOULD success criteria met
☐ Stakeholder sign-off obtained
☐ Vision Adherence Score calculated and ≥85%
☐ A/B test results positive (if applicable)
☐ No critical issues in production environment

Quality Gate Decision:
  IF all checks pass → PROCEED to Phase 5 (production ready)
  IF stakeholder concerns → ITERATE Phase 3 (targeted fixes)
  IF business metrics negative → ESCALATE to sponsor (reconsider approach)
```

---

### Phase 5 Quality Gate: Learning Capture

**Objective:** Preserve knowledge for future projects

**Validation Approach:**
```
Lessons Documented: Were key learnings captured?
  Validation: Lessons learned document review
  Success: ≥10 distinct lessons applicable to future projects

Skill Improvements: Did agents improve?
  Validation: Compare Phase 1 vs. Phase 5 agent decisions
  Success: ≥3 demonstrable skill improvements

Efficiency Tracked: Was project efficiency documented?
  Validation: Final efficiency report
  Success: Token efficiency, human investment, vision adherence all documented
```

**Quality Gate Checklist:**
```
☐ Lessons learned document completed
☐ ≥10 lessons identified with future applications
☐ Agent skill improvements documented
☐ Token efficiency tracked
☐ Human investment cost calculated
☐ Vision Adherence Score documented
☐ Recommendations for next phase created

Quality Gate Decision:
  IF all checks pass → PHASE COMPLETE (ready for next project)
  IF documentation incomplete → EXTEND Phase 5 (capture remaining learning)
```

---

## Quality Metric Dashboard

Recommended visualization during project execution:

```
PROJECT: E-Commerce Search Improvement
STATUS: In Progress (Phase 3 of 5)

┌─────────────────────────────────────────────────────┐
│ VISION ADHERENCE (Tracked Continuously)              │
│                                                      │
│ Success Criterion              Status    Target      │
│ ─────────────────────────────────────────────────────│
│ Relevance ≥ 85%               Design ✓  Ready for P3 │
│ Latency < 500ms               Design ✓  Ready for P3 │
│ Scale to 1M products          Design ✓  Ready for P3 │
│ Personalization +10%          Design ⚠️  Flagged      │
│ Filters (price/rating/avail)  Design ✓  Ready for P3 │
│ Mobile UX optimized           Design ✓  Ready for P3 │
│                                                      │
│ VISION ALIGNMENT (Phase 3):    Design 100% ✓        │
│ Predicted adherence after P4:  ~88%                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ TOKEN EFFICIENCY                                     │
│                                                      │
│ Phase    Estimated  Actual   Efficiency Status      │
│ ────────────────────────────────────────────────────│
│ Phase 1  16,500    16,900   0.97      ✓ Good       │
│ Phase 2  12,000    12,300   0.98      ✓ Good       │
│ Phase 3  18,000    14,200   0.79      ✓ Underrun   │
│ ────────────────────────────────────────────────────│
│ Total    46,500    43,400   0.93      ✓ Excellent  │
│ Reserve: 156,600 tokens (77% remaining)            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ HUMAN INVESTMENT                                     │
│                                                      │
│ Activity               Hours  Rate    Cost         │
│ ────────────────────────────────────────────────────│
│ Planning               6      $150    $900         │
│ Phase 3 QA Review      8      $120    $960         │
│ Decision Reviews       2      $150    $300         │
│ ────────────────────────────────────────────────────│
│ Total (so far)         16     avg     $2,160       │
│ Projected (all phases) 24     avg     $3,160       │
│ Target                 24     avg     $3,160       │
│ Status: ✓ On Target                                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ OVERALL QUALITY SCORE (Estimated at Phase 4)        │
│                                                      │
│ Vision Adherence:      88% (target: ≥85%)  ✓       │
│ Token Efficiency:      0.93 (target: 0.9-1.1) ✓   │
│ Human Cost Index:      1.0 (target: ≤1.1)  ✓       │
│                                                      │
│ PREDICTED QUALITY:     89% (EXCELLENT) ✓            │
│                                                      │
│ STATUS: Ready to Proceed to Phase 4 Validation      │
└─────────────────────────────────────────────────────┘
```

---

## Decision Rules Summary

### When to Proceed
```
✅ Vision Adherence ≥ 85%
✅ All MUST success criteria met
✅ Token Efficiency 0.8-1.2
✅ Human Investment ≤ Target
✅ Stakeholder approval obtained
→ PROCEED to next phase
```

### When to Iterate Current Phase
```
⚠️ Vision Adherence 80-85%
⚠️ 1-2 SHOULD criteria not met
⚠️ Token Efficiency 1.2-1.5
⚠️ Human Investment 1.1-1.3x target
→ ITERATE current phase (allocate additional tokens as needed)
```

### When to Escalate
```
❌ Vision Adherence < 80%
❌ Any MUST criteria not met
❌ Token Efficiency > 1.5
❌ Human Investment > 1.5x target
❌ Fundamental design/requirements conflict discovered
→ ESCALATE to sponsor for decision
```

---

## Integration Points

**Agentic Quality Validation** connects to:
- **AGENTIC_EXECUTION_PLAN.md**: Defines quality gates that this document validates
- **AGENTIC_PROJECT_MANAGEMENT.md**: Implements the quality metrics defined in framework
- **POST_MORTEM_SYSTEM.md**: Learning captured in Phase 5 feeds into organizational knowledge
- **FEEDBACK_INTEGRATION.md**: Stakeholder feedback informs vision adherence assessment

---

## Status

This document operationalizes quality validation for agentic systems using the core metric: **Vision Adherence at Cost (Tokens + Human Time)**.

**Key Difference from Traditional Quality:**
- Not about features or specifications alone
- Not about schedule or budget variance
- About how well the result matches human intent, efficiently

**Use when:** Validating any phase in an agentic execution plan
**Precedes:** Go/no-go decision for next phase
**Enabled by:** Vision charter and execution plan from AGENTIC_EXECUTION_PLAN.md
