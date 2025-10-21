# 04-GOVERNANCE: Governance and Constitutions

## Purpose

This folder contains **governance frameworks, project charters, and constitution templates**. It explains how to set up rules, constraints, and decision authorities for Roundtable projects.

## What Goes Here

**GOVERNANCE DOCUMENTATION:**
- Constitution system and templates
- Project charter and initiation
- Governance frameworks and rules
- Decision authorities and escalation
- Constraint definitions
- Compliance and audit frameworks

## Files in This Folder

- **CONSTITUTIONS.md** - Constitution system
  - What constitutions are
  - Constitution structure and format
  - Panel definitions
  - Consensus algorithms
  - Constraint definitions
  - Escalation rules
  - Examples and templates

- **PROJECT_CHARTER_AND_INITIATION.md** - Project startup
  - Project charter format
  - Vision and success criteria
  - Stakeholder definition
  - Resource commitment
  - Scope definition
  - Project initiation process

## What Doesn't Go Here

- **Not here:** How specs emerge (→ 03-spec-process/)
- **Not here:** General architecture (→ 00-core/SPEC.md)
- **Not here:** Agent/skill definitions (→ 01-agents/)
- **Not here:** Project execution planning (→ 02-agentic-pm/)
- **Not here:** Use case examples (→ 05-use-cases/)

## Constitution Template

When documenting constitutions, use this structure:

```yaml
constitution:
  name: "Project Constitution Name"
  version: "1.0"

  # Who participates?
  panels:
    panel-name:
      agents:
        - model: claude-opus
          skill: "skill/path/name"

  # How do we decide?
  consensus_algorithm: "democratic_majority"

  # What are the rules?
  constraints:
    - name: "Constraint Name"
      value: "Constraint value"
      enforced_by: "panel-name"

  # How do we handle disagreement?
  escalation:
    - if: "condition"
      then: "action"
```

## Governance Considerations

When adding governance documentation, consider:

1. **Decision Authority** - Who makes decisions?
2. **Constraint Enforcement** - What rules apply?
3. **Escalation Paths** - What happens on disagreement?
4. **Compliance Requirements** - What must be audited?
5. **Stakeholder Involvement** - Who must approve?

## Contributing Guidelines

When adding to 04-governance:

1. **Are you defining rules or constraints?** → Add here
2. **Are you creating a governance template?** → Add here
3. **Are you defining escalation policies?** → Add here
4. **Are you creating a project charter?** → Add here

5. **Are you defining agents/skills?** → Go to 01-agents/
6. **Are you explaining consensus algorithms?** → Go to 00-core/CONSENSUS_ALGORITHMS.md
7. **Are you explaining the constitution system?** → Add here, reference 00-core/SPEC.md Section 9
8. **Are you working on a use case?** → Go to 05-use-cases/

## Example: Software Development Constitution

Default V1 Constitution for software development:

```yaml
constitution:
  name: "Software Development (Default)"
  version: "1.0"

  panels:
    architecture:
      agents:
        - model: claude-opus
          skill: "architecture/systems-architect"
        - model: gpt-4
          skill: "architecture/systems-architect"

    ux:
      agents:
        - model: claude-sonnet
          skill: "ux/interaction-designer"
        - model: gemini
          skill: "ux/interaction-designer"

    product:
      agents:
        - model: gpt-4
          skill: "product/product-manager"

    security:
      agents:
        - model: claude-opus
          skill: "security/threat-modeler"

  consensus_algorithm: "democratic_majority"

  escalation:
    - if: "unresolved_after_3_rounds"
      then: "human_review_required"

    - if: "security_concern_raised"
      then: "affected_panels_respond"
```

See SPEC.md Section 12.6 for complete default constitution.

## Questions to Ask Before Adding Here

- Is this about governance rules or frameworks?
- Is this a constitution or governance template?
- Does this define constraints or decision authorities?
- Does this explain how projects are chartered?

If YES → This belongs in 04-governance/
