# Roundtable Specification Documentation

## Overview

Welcome to the **complete Roundtable specification**. This folder contains all documentation describing how Roundtable works, how to use it, and how it's built.

## Quick Navigation

**Start here based on what you need to understand:**

### 🎯 I want to understand Roundtable at a high level
→ Read [00-core/SPEC.md](00-core/SPEC.md) - Main specification (18 sections)
→ Then [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md)

### 🛠️ I want to build or extend Roundtable
→ Read [00-core/SPEC.md](00-core/SPEC.md) (core architecture)
→ Then [01-agents/](01-agents/) (agents and skills)
→ Then [04-governance/](04-governance/) (constitutions)

### 📊 I want to use Roundtable for software projects
→ Read [00-core/SPEC.md](00-core/SPEC.md) (Sections 1-3, 7, 12)
→ Then [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) (complete example)
→ Then [02-agentic-pm/PHASED_DEVELOPMENT.md](02-agentic-pm/PHASED_DEVELOPMENT.md)

### 📈 I want to use Roundtable for other domains (marketing, medical, etc.)
→ Read [00-core/SPEC.md](00-core/SPEC.md) (Sections 1.2 - "General Use Cases")
→ Then [01-agents/SKILLS.md](01-agents/SKILLS.md) (how to create custom skills)
→ Then [04-governance/CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) (create custom constitution)

### 💡 I want to understand how Roundtable improves over time
→ Read [03-spec-process/POST_MORTEM_SYSTEM.md](03-spec-process/POST_MORTEM_SYSTEM.md) (learning system)
→ Then [03-spec-process/CONTEXT_COMPRESSION.md](03-spec-process/CONTEXT_COMPRESSION.md) (efficient phases)
→ Then [03-spec-process/FEEDBACK_INTEGRATION.md](03-spec-process/FEEDBACK_INTEGRATION.md) (feedback loops)

### 🚀 I want to get started quickly with V1
→ Read [00-core/SPEC.md](00-core/SPEC.md) (Sections 12, 13)
→ Then [02-agentic-pm/](02-agentic-pm/) (execution planning)

## Folder Structure

```
roundtable-spec/
├── 00-core/                      # Core system specification
│   ├── SPEC.md                   # Main specification (START HERE)
│   ├── VISION_AND_PHILOSOPHY.md  # Why Roundtable exists
│   ├── EXPERT_PANELS.md          # How panels work
│   ├── CONSENSUS_ALGORITHMS.md   # Decision-making
│   ├── USER_INTERACTION_CONTROL.md # User involvement levels
│   └── README.md                 # Folder guidelines
│
├── 01-agents/                    # Agents and skills
│   ├── SKILLS.md                 # Skill system documentation
│   ├── PROJECT_MANAGER_AGENT.md  # PM agent specification
│   ├── DEVELOPER_AGENT_INTEGRATION.md # Developer integration
│   └── README.md                 # Folder guidelines
│
├── 02-agentic-pm/                # Agentic project management
│   ├── AGENTIC_PROJECT_MANAGEMENT.md # PM framework
│   ├── AGENTIC_EXECUTION_PLAN.md # Execution planning
│   ├── PHASED_DEVELOPMENT.md     # Phased delivery strategy
│   ├── AGENTIC_QUALITY_VALIDATION.md # Quality metrics
│   ├── AGENTIC_LEARNING_CAPTURE.md # Learning systems
│   └── README.md                 # Folder guidelines
│
├── 03-spec-process/              # Spec evolution and learning
│   ├── ITERATIVE_SPEC_EMERGENCE.md # How specs grow
│   ├── POST_MORTEM_SYSTEM.md     # Learning through analysis (KEY!)
│   ├── CONTEXT_COMPRESSION.md    # Phase transitions
│   ├── FEEDBACK_INTEGRATION.md   # Implementation feedback
│   └── README.md                 # Folder guidelines
│
├── 04-governance/                # Governance and constitutions
│   ├── CONSTITUTIONS.md          # Governance frameworks
│   ├── PROJECT_CHARTER_AND_INITIATION.md # Project startup
│   └── README.md                 # Folder guidelines
│
├── 05-use-cases/                 # Real-world examples
│   ├── CLI_SESSION.md            # Complete end-to-end example
│   ├── BASIC_FLAT_MODEL.md       # Startup scenario
│   └── README.md                 # Folder guidelines
│
├── 06-reference/                 # Research and archives
│   ├── archived-pmp-analysis/    # Traditional PM comparison (archived)
│   │   ├── PMP_ANALYSIS.md
│   │   ├── PMP_RECOMMENDATIONS_SUMMARY.md
│   │   └── README.md             # Why archived
│   └── README.md                 # Folder guidelines
│
└── README.md                     # This file
```

## Key Sections by Topic

### Understanding Core Concepts

| Topic | Primary Doc | Secondary Docs |
|-------|-----------|-----------------|
| What is Roundtable? | [SPEC.md §1-3](00-core/SPEC.md#1-executive-summary) | [VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md) |
| How does it work? | [SPEC.md §4-8](00-core/SPEC.md#4-core-concept-the-roundtable) | [EXPERT_PANELS.md](00-core/EXPERT_PANELS.md) |
| How do we decide? | [CONSENSUS_ALGORITHMS.md](00-core/CONSENSUS_ALGORITHMS.md) | [SPEC.md §7](00-core/SPEC.md#7-operating-modes) |
| How do users control it? | [USER_INTERACTION_CONTROL.md](00-core/USER_INTERACTION_CONTROL.md) | [SPEC.md §5](00-core/SPEC.md#5-session-management) |

### Learning and Improvement

| Topic | Primary Doc |
|-------|-----------|
| How does Roundtable learn? | [POST_MORTEM_SYSTEM.md](03-spec-process/POST_MORTEM_SYSTEM.md) |
| How do phases build on each other? | [CONTEXT_COMPRESSION.md](03-spec-process/CONTEXT_COMPRESSION.md) |
| How does feedback drive decisions? | [FEEDBACK_INTEGRATION.md](03-spec-process/FEEDBACK_INTEGRATION.md) |
| How do specs emerge? | [ITERATIVE_SPEC_EMERGENCE.md](03-spec-process/ITERATIVE_SPEC_EMERGENCE.md) |

### Implementation and Execution

| Topic | Primary Doc |
|-------|-----------|
| How do we plan execution? | [AGENTIC_EXECUTION_PLAN.md](02-agentic-pm/AGENTIC_EXECUTION_PLAN.md) |
| What's the development strategy? | [PHASED_DEVELOPMENT.md](02-agentic-pm/PHASED_DEVELOPMENT.md) |
| How do we measure quality? | [AGENTIC_QUALITY_VALIDATION.md](02-agentic-pm/AGENTIC_QUALITY_VALIDATION.md) |
| How do we capture learning? | [AGENTIC_LEARNING_CAPTURE.md](02-agentic-pm/AGENTIC_LEARNING_CAPTURE.md) |

### Agents, Skills, and Governance

| Topic | Primary Doc |
|-------|-----------|
| What are skills? | [SKILLS.md](01-agents/SKILLS.md) |
| Who is the PM agent? | [PROJECT_MANAGER_AGENT.md](01-agents/PROJECT_MANAGER_AGENT.md) |
| How do specs become code? | [DEVELOPER_AGENT_INTEGRATION.md](01-agents/DEVELOPER_AGENT_INTEGRATION.md) |
| What are constitutions? | [CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) |
| How do I start a project? | [PROJECT_CHARTER_AND_INITIATION.md](04-governance/PROJECT_CHARTER_AND_INITIATION.md) |

## Important Concept: The Learning Flywheel

The core innovation of Roundtable is not just the deliberation engine. It's the **learning system that makes each phase better**:

```
Session N
    ↓ (deliberation produces)
Spec + Insights
    ↓ (post-mortem analyzes)
Skill Improvements (+1-5% effectiveness)
    ↓ (implementation happens)
Phase N Implementation
    ↓ (users provide feedback)
Implementation Insights
    ↓ (context compressed + integrated)
Session N+1 (with compounded learning)
    ↓ (produces)
Better decisions, faster consensus
```

**Key Documents for This:**
1. [POST_MORTEM_SYSTEM.md](03-spec-process/POST_MORTEM_SYSTEM.md) - How we learn
2. [CONTEXT_COMPRESSION.md](03-spec-process/CONTEXT_COMPRESSION.md) - How we carry learning
3. [FEEDBACK_INTEGRATION.md](03-spec-process/FEEDBACK_INTEGRATION.md) - How we validate learning

## V1 Default Assets (Being Developed)

V1 ships with ready-to-use agents and skills for **software development teams**:

- **Meeting Facilitator:** PM Agent
- **PM Skill:** Token-based project management (NOT traditional PM)
- **Default Panels:** Architecture, UX, Product, Security, Engineering
- **Default Skills:** One skill per panel type

**See [SPEC.md §12](00-core/SPEC.md#12-default-agents-and-skills-v1-development) for complete list**

Users can:
- Use defaults as-is (ready-to-go for software projects)
- Customize panels and skills
- Create entirely new panels for other domains (marketing, medical, etc.)
- The system is domain-agnostic

## General Use Cases (Beyond Software)

While Roundtable was designed for software development, it works for **any high-stakes decision**:

- **Marketing Plans** - Multiple perspectives on strategy and positioning
- **Business Plans** - Multiple perspectives on model and execution
- **Medical Diagnostics** - Multiple expert perspectives on diagnosis
- **Risk Analysis** - Multiple expert perspectives on risks
- **Policy Development** - Multiple stakeholder perspectives on policy
- **Merger/Acquisition** - Multiple perspectives on deal evaluation

See [SPEC.md §1.2](00-core/SPEC.md#general-use-case-any-high-stakes-decision-or-plan) for examples.

## Documentation Guidelines

### When Adding New Documentation

1. **Read the relevant folder's README** (each folder has guidelines)
2. **Check what section your content belongs in**
3. **Use the appropriate template** (each folder provides examples)
4. **Cross-reference existing docs** - Link to related materials
5. **Update this master README** if adding a new section

### Folder Guidelines

- [00-core/README.md](00-core/README.md) - Core specification guidelines
- [01-agents/README.md](01-agents/README.md) - Agents and skills guidelines
- [02-agentic-pm/README.md](02-agentic-pm/README.md) - PM framework guidelines
- [03-spec-process/README.md](03-spec-process/README.md) - Spec process guidelines
- [04-governance/README.md](04-governance/README.md) - Governance guidelines
- [05-use-cases/README.md](05-use-cases/README.md) - Use case guidelines
- [06-reference/README.md](06-reference/README.md) - Reference material guidelines

## Source of Truth

**[00-core/SPEC.md](00-core/SPEC.md) is the authoritative specification.**

All other documents should:
- Reference SPEC.md for core concepts
- Cross-link with other docs
- Never contradict SPEC.md
- Update SPEC.md if core concepts change

## Versioning

- **Current Version:** 1.0 (locked with default assets for V1)
- **Last Updated:** 2025-10-21
- **Status:** Specification Complete, Implementation In Progress

## Related Documents

Outside this folder:

- [.claude/CLAUDE.md](../../.claude/CLAUDE.md) - AI agent conventions for Roundtable
- [TECH_STACK_DECISIONS.md](../../TECH_STACK_DECISIONS.md) - Architecture decisions
- [IMPLEMENTATION_ROADMAP.md](../../IMPLEMENTATION_ROADMAP.md) - Build plan
- [README.md](../../README.md) - Project overview

## Questions?

Each folder has a README with specific guidance:
- [00-core/README.md](00-core/README.md) - Core concepts
- [01-agents/README.md](01-agents/README.md) - Agents and skills
- [02-agentic-pm/README.md](02-agentic-pm/README.md) - Project management
- [03-spec-process/README.md](03-spec-process/README.md) - Spec evolution
- [04-governance/README.md](04-governance/README.md) - Governance
- [05-use-cases/README.md](05-use-cases/README.md) - Examples
- [06-reference/README.md](06-reference/README.md) - Research and archives

---

**Last Updated:** 2025-10-21
**Version:** 1.0
**Status:** Specification Complete, Ready for Development
