# Archived: Traditional PM Analysis

## Why This Folder Exists

These documents analyze how Roundtable compares to traditional Project Management (following PMBOK/PMI frameworks). They were valuable for understanding what Roundtable intentionally *doesn't* do.

**Status:** Archived - not part of active Roundtable specification

## What These Analyze

### PMP_ANALYSIS.md
- Compares Roundtable's approach to PMBOK knowledge areas
- Identifies gaps where Roundtable diverges from traditional PM
- Strengths: Scope, stakeholder, quality, integration management
- Gaps: Time management, cost management, risk management, communications

### PMP_RECOMMENDATIONS_SUMMARY.md
- Summarizes recommendations from PMP analysis
- Suggests traditional PM elements that could be added
- Analyzes cost/benefit of each traditional PM practice

## Why Archived?

**Decision:** Roundtable intentionally does NOT follow traditional PM

**Reason:** Roundtable's fundamental model (token-based estimation, parallel execution, learning systems) is incompatible with traditional time-based PM.

**Key Difference:**

| Traditional PM | Roundtable PM |
|---|---|
| Linear, sequential work | Parallel, token-bounded work |
| Human hours as currency | Agent tokens as currency |
| Risk registers & mitigation | Post-mortem learning + feedback validation |
| Stage-gate approval | Continuous deliberation + stakeholder review |
| Gantt charts, critical path | Phase-based with context compression |

## If You Need Traditional PM

**Option 1: Create a Custom PM Skill**

Users can absolutely create PM skills that enforce traditional practices:

```yaml
skills/pm/enterprise-pmi:
  description: "Enterprise PM with PMBOK compliance"
  includes:
    - Risk register maintenance
    - Formal change control
    - Stage-gate approval process
    - Communications plan
    - Earned value management
```

Users can use this skill in their Constitution to get traditional PM behavior.

**Option 2: Use These Archived Documents**

If building traditional PM into Roundtable, these documents provide:
- Analysis of gaps
- Recommendations for additions
- Understanding of tradeoffs

## The Real Innovation

Roundtable's innovation is NOT that it's a better project manager.

**It's that it's a better spec creator through:**
- Multi-model deliberation (diverse perspectives)
- Token-based budgeting (real cost visibility)
- Learning systems (improving over time)
- Feedback loops (validating assumptions)

These fundamentals make traditional PM unnecessary. Early feedback replaces risk documentation. Learning loops replace risk mitigation. Deliberation replaces stage-gates.

## References in Active Spec

See [SPEC.md](../../00-core/SPEC.md) section "Project Management Philosophy" for:
- Why Roundtable PM differs from traditional PM
- What the default PM skill does
- How users can create custom PM skills

---

**These documents preserved for reference, but not part of active Roundtable development.**
