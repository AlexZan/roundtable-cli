# 02-AGENTIC-PM: Agentic Project Management Framework

## Purpose

This folder contains **Roundtable's project management framework**: token-based execution, quality validation, learning capture, and phase management.

This is NOT traditional PMBOK PM. This is **Roundtable PM** — a framework optimized for:
- Token-based cost estimation (not human hours)
- Parallel agent execution
- Learning system feedback loops
- Early validation over extensive documentation

## What Goes Here

**AGENTIC PROJECT MANAGEMENT DOCUMENTATION:**
- Token-based execution planning
- Phased development strategy
- Quality validation frameworks
- Learning capture and continuous improvement
- Cost modeling (tokens + human hours + infrastructure)
- Implementation roadmaps

## Files in This Folder

- **AGENTIC_PROJECT_MANAGEMENT.md** - Complete PM framework
  - Token-based cost model
  - Resource allocation
  - How agentic PM differs from traditional PM

- **AGENTIC_EXECUTION_PLAN.md** - Execution planning
  - Token budgeting
  - Cost breakdown (agents + humans + infra)
  - Resource allocation examples
  - ROI calculations

- **PHASED_DEVELOPMENT.md** - Phased delivery strategy
  - Single-pass vs. phased approach
  - Phase planning and structure
  - MVP + POC framework
  - Context compression between phases
  - Decision criteria for phase progression

- **AGENTIC_QUALITY_VALIDATION.md** - Quality metrics
  - How to validate Roundtable output quality
  - Success metrics per phase
  - Spec completeness assessment
  - Implementation success tracking

- **AGENTIC_LEARNING_CAPTURE.md** - Learning systems
  - How learning is captured
  - Systemizing organizational knowledge
  - Feedback loops for continuous improvement

## What Doesn't Go Here

- **Not here:** General vision philosophy (→ 00-core/VISION_AND_PHILOSOPHY.md)
- **Not here:** How skills improve through post-mortems (→ 03-spec-process/POST_MORTEM_SYSTEM.md)
- **Not here:** Specific skill definitions (→ 01-agents/)
- **Not here:** Use case examples (→ 05-use-cases/)
- **Not here:** Governance rules (→ 04-governance/)

## Key Differences from Traditional PM

| Traditional PM | Agentic PM |
|---|---|
| Estimation: Human hours | Estimation: Agent tokens |
| Cost: Headcount × rate × time | Cost: Agent tokens + human hours + infrastructure |
| Schedule: Gantt charts, critical path | Schedule: Phase-based with context compression |
| Risk: Risk registers, mitigation plans | Risk: Post-mortem learning + feedback validation |
| Change Control: Formal change requests | Change Control: `/stop` + refocus + next session |
| Quality: Testing plans, dashboards | Quality: Learning systems + post-mortem improvements |

**See SPEC.md Section 6** for complete PM philosophy.

## Contributing Guidelines

When adding to 02-agentic-pm:

1. **Is this about project execution planning?** → Add here
2. **Is this about token budgeting or costing?** → Add here
3. **Is this about quality validation?** → Add here
4. **Is this about phased delivery?** → Add here
5. **Is this about learning capture?** → Add here

6. **Is this about how skills improve?** → Go to 03-spec-process/POST_MORTEM_SYSTEM.md
7. **Is this about specific use case PM?** → Go to 05-use-cases/
8. **Is this about governance?** → Go to 04-governance/

## Token-Based Estimation Framework

When documenting in this folder, use token-based cost model:

```
TASK: [Task name]

ESTIMATE: [Number] tokens

BREAKDOWN:
  Input tokens: [Breakdown]
  Processing tokens: [Breakdown]
  Output tokens: [Breakdown]

Cost components:
  - Agent tokens: [cost]
  - Human hours: [estimate]
  - Infrastructure: [cost]
  - Total: [cost]
```

See CLAUDE.md for complete token estimation framework.

## Important: This is NOT Traditional PM

Documents in this folder should:
- ✅ Explain token-based costing
- ✅ Assume parallel agent execution
- ✅ Leverage learning systems for risk management
- ✅ Build on phase-based approach

Documents should NOT:
- ❌ Include Gantt charts or critical path analysis
- ❌ Treat human hours as primary scheduling metric
- ❌ Create risk registers or mitigation plans
- ❌ Assume linear, sequential execution

## Questions to Ask Before Adding Here

- Is this about project execution and planning?
- Does it involve token estimation or costing?
- Is it about learning and continuous improvement?
- Would this help teams understand agentic PM?

If YES → This belongs in 02-agentic-pm/
