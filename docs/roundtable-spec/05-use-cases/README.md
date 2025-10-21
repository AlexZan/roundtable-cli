# 05-USE-CASES: Real-World Use Cases and Examples

## Purpose

This folder contains **concrete, end-to-end examples** of Roundtable in action: real scenarios, walkthroughs, and worked examples that demonstrate how all the pieces fit together.

## What Goes Here

**USE CASE DOCUMENTATION:**
- Complete end-to-end examples
- Real scenario walkthroughs
- Industry-specific examples
- Problem-solution examples
- Worked cases with decisions and outcomes
- Example constitutions and configurations
- Example skills for specific domains

## Files in This Folder

- **CLI_SESSION.md** - Complete end-to-end walkthrough
  - Real example: myFive dating app vision meeting
  - Shows all components working together
  - Deliberation rounds, decision-making, spec emergence
  - Perfect for understanding full workflow

- **BASIC_FLAT_MODEL.md** - Startup founder scenario
  - Founder with vague idea
  - How Roundtable helps crystallize vision
  - From brainstorm to spec

- **Other use cases** (planned):
  - Marketing plan deliberation
  - Business plan creation
  - Medical diagnostic review
  - Risk analysis session
  - Enterprise architecture decision
  - Regulatory compliance planning

## Types of Use Cases

When adding use cases, consider these categories:

### 1. **Software Development (Primary)**
- Project vision creation
- Architecture decisions
- Feature prioritization
- Technical debt management

### 2. **Business Planning**
- Market strategy
- Business model validation
- Go-to-market planning
- Financial planning

### 3. **Medical/Healthcare**
- Diagnostic review
- Treatment planning
- Risk assessment
- Compliance review

### 4. **Policy & Governance**
- Policy development
- Regulatory compliance
- Risk management
- Stakeholder coordination

### 5. **Marketing & Creative**
- Campaign planning
- Positioning strategy
- Messaging development
- Creative direction

### 6. **Other High-Stakes Decisions**
- Merger/acquisition evaluation
- Investment decisions
- Hiring decisions
- Partnership evaluation

## Use Case Template

When documenting a use case, use this structure:

```markdown
# Use Case: [Name]

## Scenario
[What's the business problem?]
[Who are the stakeholders?]
[What decision needs to be made?]

## Roundtable Setup
[What constitution is used?]
[What panels are involved?]
[What skills?]
[Who are the users?]

## The Deliberation
### Round 1
[Initial stances]
[Key questions raised]

### Round 2
[Evolution of thinking]
[Where agreement emerges]
[Where disagreement persists]

### Round 3+ (if needed)
[Convergence toward decision]
[Final resolution]

## Output
[What spec/plan emerged?]
[What was decided?]
[What remains open?]

## Key Learnings
[What was valuable about this deliberation?]
[What surprised the participants?]
[What would they do differently next time?]

## Skills for Next Session
[What skill improvements were captured?]
[What patterns emerged?]
```

## What Doesn't Go Here

- **Not here:** General concepts (→ 00-core/)
- **Not here:** Agent/skill specifications (→ 01-agents/)
- **Not here:** Process guides (→ 03-spec-process/)
- **Not here:** Governance templates (→ 04-governance/)
- **Not here:** Reference research (→ 06-reference/)

## Contributing Guidelines

When adding to 05-use-cases:

1. **Are you documenting a real example?** → Add here
2. **Are you showing end-to-end workflow?** → Add here
3. **Are you demonstrating industry-specific application?** → Add here
4. **Are you working through a decision scenario?** → Add here

5. **Are you explaining core concepts?** → Go to 00-core/
6. **Are you defining governance?** → Go to 04-governance/
7. **Are you documenting a process?** → Go to 03-spec-process/
8. **Are you defining agents/skills?** → Go to 01-agents/

## Real Example: CLI_SESSION.md Structure

This file demonstrates:
- Setup and initialization
- Constitution and panel configuration
- Round 1 deliberation
- Round 2 evolution
- Round 3 consensus
- Spec output
- Post-mortem analysis
- Skills captured for next session

Use this as the template for complex use cases.

## Use Case Quality Checklist

Good use cases should:
- ✅ Show real decision-making
- ✅ Include specific dialogue/quotes
- ✅ Demonstrate panel interaction
- ✅ Show how consensus emerges
- ✅ Include the final output (spec/plan)
- ✅ Capture learnings
- ✅ Suggest skill improvements

Use cases should NOT:
- ❌ Be overly simplified
- ❌ Hide disagreement or complexity
- ❌ Assume outcomes that weren't deliberated
- ❌ Be disconnected from real decision-making

## Questions to Ask Before Adding Here

- Is this a real or realistic example?
- Does it show end-to-end workflow?
- Does it demonstrate value of Roundtable?
- Would users learn from this?
- Can users adapt this for their scenario?

If YES → This belongs in 05-use-cases/
