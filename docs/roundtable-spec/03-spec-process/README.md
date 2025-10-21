# 03-SPEC-PROCESS: Specification and Learning Processes

## Purpose

This folder contains **process guides for how specifications evolve and improve**: post-mortem analysis, context compression, feedback integration, and iterative spec emergence.

This is where the **learning system** lives—how Roundtable gets better over time.

## What Goes Here

**SPECIFICATION EVOLUTION DOCUMENTATION:**
- How specifications emerge through deliberation
- Post-mortem analysis and learning capture
- Context compression between phases
- Feedback integration from implementation
- Iterative improvement cycles

## Files in This Folder

- **ITERATIVE_SPEC_EMERGENCE.md** - How specs grow
  - How specifications evolve through deliberation
  - Spec development patterns
  - When specs are complete vs. incomplete
  - Managing spec iteration

- **POST_MORTEM_SYSTEM.md** - Learning through retrospectives (THE LEARNING SYSTEM)
  - How to analyze completed sessions
  - Identifying valuable insights
  - Skill improvements
  - Pattern detection across sessions
  - Preventing skill drift
  - Metrics for learning

- **CONTEXT_COMPRESSION.md** - Efficient phase transitions
  - What gets compressed between phases
  - What stays detailed
  - Preventing re-debate of settled questions
  - Making each phase faster than the last

- **FEEDBACK_INTEGRATION.md** - Implementation feedback loop
  - How QA feedback becomes input to next phase
  - Feedback types and their destinations
  - Integration workflow
  - Using feedback to improve future phases

## Key Concept: The Learning Flywheel

```
Session 1
    ↓
Spec + Insights
    ↓
Post-Mortem Analysis
    ↓
Skills improve (+1-5% per cycle)
    ↓
Implementation
    ↓
Feedback collected
    ↓
Context compressed
    ↓
Session 2 (with better skills, more knowledge)
    ↓
Better decisions, faster consensus
```

Each phase makes the system better for the next phase.

## What Doesn't Go Here

- **Not here:** General architecture (→ 00-core/SPEC.md)
- **Not here:** Agent/skill definitions (→ 01-agents/)
- **Not here:** Project management planning (→ 02-agentic-pm/)
- **Not here:** Governance rules (→ 04-governance/)
- **Not here:** Use case examples (→ 05-use-cases/)

## Contributing Guidelines

When adding to 03-spec-process:

1. **Is this about how specs emerge?** → Add here
2. **Is this about learning from sessions?** → Add here
3. **Is this about improving for next phase?** → Add here
4. **Is this about feedback loops?** → Add here

5. **Is this about project planning?** → Go to 02-agentic-pm/
6. **Is this about governance?** → Go to 04-governance/
7. **Is this about a specific use case?** → Go to 05-use-cases/
8. **Is this about skill definitions?** → Go to 01-agents/

## Important: Post-Mortem is Central

The post-mortem system (POST_MORTEM_SYSTEM.md) is the heart of Roundtable's compounding value:

- Each session analyzed systematically
- Skills improved based on observed patterns
- Learning captured and distributed
- Future sessions benefit immediately
- Result: 3-5 phases see 15-30% confidence increase, 40-60% speed improvement

All other documents in this folder support or depend on the post-mortem system.

## Process Templates

When documenting processes, include:

```markdown
## [Process Name]

### Input
[What starts the process?]

### Steps
1. [Step 1]
2. [Step 2]
...

### Output
[What is produced?]

### Example
[Real example of this process]

### Success Criteria
[How do you know it worked?]
```

## Key Metrics Tracked

Documents in this folder should reference:

- **Session confidence**: 0-100% (user's confidence in decisions)
- **Decision consensus quality**: How easily agreement was reached
- **Time-to-consensus**: How long each decision took
- **Skill improvement impact**: Do improved skills lead to better decisions?
- **Implementation success**: Do specs lead to successful implementation?

## Questions to Ask Before Adding Here

- Is this about how specifications evolve?
- Does this explain the learning system?
- Is this about feedback loops?
- Would this help teams understand spec development?
- Does this explain how Roundtable improves over time?

If YES → This belongs in 03-spec-process/
