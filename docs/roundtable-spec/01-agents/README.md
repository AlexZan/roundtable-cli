# 01-AGENTS: Agent Definitions and Skills

## Purpose

This folder contains **agent role definitions, skills, and integration guides**. It explains how agents participate in Roundtable and how they work with developers/users.

## What Goes Here

**AGENT AND SKILL DOCUMENTATION:**
- Skill definitions and templates
- Agent role definitions
- Integration guides for agents
- How specific agents work with developers
- Agent capabilities and expertise areas

## Files in This Folder

- **SKILLS.md** - Skill system documentation
  - What skills are and how they're structured
  - Examples of built-in skills (Architecture, UX, Security, etc.)
  - How to create custom skills
  - Skill marketplace and sharing

- **PROJECT_MANAGER_AGENT.md** - PM agent specification
  - Role and responsibilities
  - How PM facilitates sessions
  - PM skill definition
  - PM decision-making patterns

- **DEVELOPER_AGENT_INTEGRATION.md** - Developer integration
  - How specs become code
  - Developer workflow with Roundtable specs
  - Spec validation framework
  - Reducing implementation ambiguity

## Planned v1 Additions

- **Default Agent Definitions** (being developed)
  - Meeting Facilitator Agent (PM)
  - Default panel agents for software development
  - Pre-built skills for architecture, UX, product, security, engineering

## What Doesn't Go Here

- **Not here:** General PM philosophy (→ 00-core/SPEC.md Section 6)
- **Not here:** How skills affect learning (→ 03-spec-process/POST_MORTEM_SYSTEM.md)
- **Not here:** Governance rules (→ 04-governance/)
- **Not here:** Use case-specific agent configurations (→ 05-use-cases/)

## Structure

### Skill Template (for reference)

When documenting skills, use this structure:

```yaml
# skill-name.md

## Overview
[What is this skill about?]

## Domain Expertise
[What does this agent know?]

## Key Questions
[What should this agent ask?]

## Cross-Domain Concerns
[What should it flag?]

## Consensus Approach
[How does it build consensus?]

## Example Usage
[How is this used in a real session?]
```

### Agent Template (for reference)

When documenting agents, use this structure:

```markdown
# Agent Name

## Role
[What does this agent do?]

## Responsibilities
[Specific responsibilities]

## Interaction Patterns
[How does it interact with users and other agents?]

## Success Criteria
[What makes this agent effective?]

## Integration Points
[Where/when is this agent used?]
```

## Contributing Guidelines

When adding to 01-agents:

1. **Are you defining a new agent or skill?** → Document here
2. **Are you explaining how agents work with devs?** → Document here
3. **Are you explaining how skills improve?** → Go to 03-spec-process/
4. **Are you creating a specific use case?** → Go to 05-use-cases/
5. **Are you defining governance?** → Go to 04-governance/

## Default Agents Being Developed

**V1 includes:**
- Meeting Facilitator (PM Agent)
- Default Software Development Panels:
  - Architecture Panel
  - UX Panel
  - Product Panel
  - Security Panel
  - Engineering Panel
- Corresponding skills for each panel

**See SPEC.md Section 12** for complete list of default agents and skills.

## Important Notes

- Skills are **versioned** (semver) and can be updated
- Skills are **reusable** across projects
- Skills are **shareable** via marketplace
- Agents are **composable** (multiple agents per panel)

## Questions to Ask Before Adding Here

- Does this explain what an agent or skill does?
- Is this an agent or skill specification?
- Is this about integration with developers?
- Would users need this to understand agents?

If YES to any → This belongs in 01-agents/
