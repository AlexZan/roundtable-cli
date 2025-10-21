# 00-CORE: Roundtable System Specification

## Purpose

This folder contains the **complete system specification** for Roundtable: the deliberation engine architecture, core concepts, and operating principles.

## What Goes Here

**CORE SPECIFICATION DOCUMENTS:**
- System architecture and design
- Core operating modes (Relevant Order, Moderator, Debate)
- Constitution system and governance
- Expert panels and consensus algorithms
- Vision and philosophy
- User interaction patterns

## Files in This Folder

- **SPEC.md** - Main system specification
  - Complete architecture overview
  - All 18 sections defining Roundtable behavior
  - Reference for all other documentation

- **VISION_AND_PHILOSOPHY.md** - Why Roundtable exists
  - Philosophy of multi-model deliberation
  - Problem Roundtable solves
  - Values and principles

- **EXPERT_PANELS.md** - How expert panels work
  - Panel composition and orchestration
  - Pre-prompt system
  - Multi-agent coordination

- **CONSENSUS_ALGORITHMS.md** - Decision-making mechanics
  - How consensus is reached
  - Different consensus strategies
  - Handling disagreement

- **USER_INTERACTION_CONTROL.md** - User involvement levels
  - Five levels from full automation to co-creation
  - When to use each level
  - User control mechanisms

## What Doesn't Go Here

- **Not here:** Implementation details, code, build processes
- **Not here:** Specific use-case examples (→ 05-use-cases/)
- **Not here:** Agent/skill definitions (→ 01-agents/)
- **Not here:** Process guides (→ 03-spec-process/)
- **Not here:** Governance templates (→ 04-governance/)

## Contributing Guidelines

When adding to 00-core:

1. **Is it core architecture?** → Add here
2. **Does it explain why Roundtable exists?** → Add here
3. **Does it define how the system works at a high level?** → Add here
4. **Is it a specific use case?** → Move to 05-use-cases/
5. **Is it an agent or skill?** → Move to 01-agents/
6. **Is it a process guide?** → Move to 03-spec-process/

## Important: SPEC.md is the Source of Truth

SPEC.md is the authoritative specification. All other documents should reference SPEC.md for consistency. If you're updating core concepts:

1. Update SPEC.md first
2. Then update supporting documents
3. Ensure cross-references are correct

## Section Organization in SPEC.md

- Sections 1-3: Executive Summary, Problems, Core Principles
- Sections 4-11: Core Architecture (Roundtable concept, session management, PM philosophy, modes, specs, constitutions, workflows, platforms)
- Sections 12-13: Default Assets & Phased Development Strategy
- Sections 14-18: Implementation scope, success criteria, V1 vs V2, requirements, open questions

## Questions to Ask Before Adding Here

- Is this a core architectural concept?
- Is this needed to understand how Roundtable fundamentally works?
- Will users need to understand this to use Roundtable?
- Would removing this break the specification?

If all answers are YES → This belongs in 00-core/
