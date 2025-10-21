# Project Charter and Initiation: Formal Project Startup

## Overview

Every project should start with a **Project Charter** - a formal authorization document that defines the project's vision, scope, success criteria, and authority structure.

This document defines the Roundtable-based initiation process and provides the Project Charter template.

---

## Why Project Charter Matters

### Problem Without Charter

```
No charter:
  "Let's build a task management app"
  → What exactly are we building?
  → Who decides what counts as success?
  → What authority does the PM have?
  → If something goes wrong, who do we escalate to?
  → What's the project budget?
  → What's the timeline?
  → [Vague answers lead to confusion, scope creep, missed deadlines]

With charter:
  "Here's our project charter. It defines success criteria,
   phase breakdown, budget, timeline, and authority."
  → Clear expectations
  → Objective success measures
  → Clear escalation path
  → No ambiguity on authority
```

### Benefits of Charter

1. **Clear Authorization** - Project is officially authorized
2. **Shared Understanding** - Stakeholders agree on goals
3. **Success Criteria** - Objective measures of success
4. **Decision Authority** - Clear who decides what
5. **Escalation Path** - Where issues go
6. **Resource Commitment** - Budget and team approved
7. **Risk Appetite** - How much risk is acceptable

---

## Roundtable-Based Initiation Process

### Phase 1: Stakeholder Kickoff (Before Roundtable Session)

```
TIMELINE: 1-2 weeks before first Roundtable session

Activities:
1. Identify Project Sponsor (who authorizes)
2. Identify Stakeholders (who has interest/influence)
3. Analyze Stakeholder Needs (what do they care about)
4. Develop Preliminary Vision (what are we building)
5. Identify Success Criteria (how do we know it worked)
6. Define Preliminary Phase Breakdown (rough phases)
7. Estimate Preliminary Budget (order of magnitude)
8. Define Risk Appetite (how much risk can we tolerate)

Output: Preliminary project information ready for charter

Timeline: 1-2 weeks (can be parallel with first Roundtable prep)
```

### Phase 2: Roundtable Session (Refines Charter)

```
TIMELINE: First Roundtable session

INPUT TO SESSION:
- Preliminary vision
- Rough stakeholder list
- Success criteria ideas
- Preliminary phase breakdown

SESSION ACTIVITIES:
- Project Manager clarifies vision with stakeholder
- Panels discuss feasibility of preliminary phases
- Discuss success criteria (are they measurable?)
- Discuss risks and constraints
- Discuss resource needs

OUTPUT:
- Refined vision
- Validated success criteria
- More detailed phase breakdown
- Risk appetite defined
- Resource estimates

Timeline: 2 hours (part of first session)
```

### Phase 3: Charter Finalization (After Session)

```
TIMELINE: 1 week after Roundtable session

Activities:
1. Document refined vision
2. Finalize success criteria
3. Develop detailed phase breakdown
4. Estimate budget more precisely
5. Define authority and escalation
6. Get approvals and signatures

Output: Approved Project Charter

Timeline: 1 week (administrative)
```

---

## Project Charter Template

```yaml
PROJECT CHARTER

════════════════════════════════════════════════════════════

PROJECT INFORMATION

Project Name: [What are we calling this project?]
  Example: "Task Management SaaS - Phase 1"

Project Manager: [Who's managing the project?]
  Example: "Sarah Chen"

Project Sponsor: [Who authorized the project?]
  Example: "VP of Product - John Smith"

Charter Date: [When was this approved?]
  Example: "2024-10-21"

Project Approval Date: [When was formal approval given?]
  Example: "2024-10-25"

════════════════════════════════════════════════════════════

VISION & OBJECTIVES

Project Vision: [One paragraph describing what we're building and why]
  Example: "Build a cloud-based task management application for
           distributed teams. Enables teams to collaborate on tasks
           in real-time with offline capability. MVP Phase 1 focuses
           on individual productivity with offline-first sync."

Business Opportunity: [What problem does this solve?]
  Example: "Current solutions don't support teams working fully
           distributed. Our app enables seamless collaboration
           regardless of location or connectivity."

Strategic Importance: [Why does the organization care?]
  Example: "Supports our expansion into enterprise market.
           Enables $10M revenue opportunity in Year 1."

Project Objectives:
  1. [Objective 1 with specific, measurable outcome]
  2. [Objective 2]
  3. [Objective 3]

  Examples:
  - "Deliver Phase 1 MVP within 4 weeks, $25K budget"
  - "Achieve 85%+ user satisfaction in Phase 1 testing"
  - "Validate product-market fit with real users"
  - "Establish foundation for Phase 2 team features"

════════════════════════════════════════════════════════════

SUCCESS CRITERIA & KEY PERFORMANCE INDICATORS (KPIs)

Success Criteria: [Objective, measurable ways we know project succeeded]

Functional Success:
  ☐ Phase 1 spec matches MVP definition (95%+ compliance)
  ☐ Implementation completed on time (<4 weeks)
  ☐ Implementation on budget (<$25K)
  ☐ All critical requirements implemented (0 critical bugs)
  ☐ QA validation: 100% of user flows working

Quality Success:
  ☐ Code quality: 80%+ test coverage
  ☐ Performance: <100ms note creation (spec target)
  ☐ Reliability: 99% uptime in Phase 1
  ☐ Security: No critical vulnerabilities (pen test results)

Business Success:
  ☐ User satisfaction: ≥85% in first-week testing
  ☐ Retention: ≥80% day-7 retention
  ☐ Feature adoption: ≥70% use offline capability
  ☐ Time to production: ≤5 weeks from session to launch

Learning Success:
  ☐ Post-mortem completed with documented learnings
  ☐ Skills improved based on Phase 1 findings
  ☐ Phase 2 direction validated or adjusted

Key Performance Indicators (KPIs):
  - Phase completion: On time / On budget (binary)
  - Quality gates: Bug count, performance metrics (quantitative)
  - User satisfaction: NPS score, user testing feedback (qualitative)
  - Learning: Skills improved, patterns identified (qualitative)

Project Constraints:
  - Timeline: Must complete Phase 1 in 4 weeks (hard constraint)
  - Budget: $20-25K total (hard constraint)
  - Team: 1 full-time dev, 1 part-time QA (resource constraint)
  - Technology: Must use Node.js + React (technical constraint)

════════════════════════════════════════════════════════════

HIGH-LEVEL SCOPE

Project Scope: [What are we building and what are we NOT building?]

In Scope (Phase 1):
  ✓ Individual note creation and editing
  ✓ Offline-first sync capability
  ✓ Search functionality
  ✓ Notebook and tag organization
  ✓ Archive capability
  ✓ OAuth authentication

Out of Scope (Phase 2+):
  ✗ Team collaboration / sharing (Phase 2)
  ✗ Real-time updates (Phase 2)
  ✗ Permissions model (Phase 2)
  ✗ Rich media (images, videos) (Phase 3)
  ✗ Advanced features (Phase 3+)

Phase Breakdown:
  Phase 1: Individual productivity with offline sync (4 weeks, $25K)
  Phase 2: Team collaboration and real-time (8 weeks, $35K)
  Phase 3: Enterprise features and scale (10 weeks, $50K)

Major Deliverables:
  Phase 1 Deliverables:
    - Phase 1 Specification Package
    - Implemented working application
    - Test suite (80%+ coverage)
    - Deployment documentation
    - User guide and FAQs

════════════════════════════════════════════════════════════

STAKEHOLDER IDENTIFICATION & ANALYSIS

Stakeholders: [Who has interest in or influence over the project?]

Stakeholder Matrix:

| Stakeholder | Role | Interest | Influence | Engagement |
|---|---|---|---|---|
| VP Product (John) | Sponsor | High | High | Active - weekly reviews |
| Users (SMB teams) | Primary Users | High | Medium | Testing Phase 1 |
| Development Team | Implementer | High | High | Daily - active dev |
| QA Team | Quality Gate | High | High | Parallel testing |
| Security Team | Compliance | Medium | High | Review before launch |
| Finance | Budget Owner | Medium | Medium | Budget approval |
| Customer Success | Go-to-market | Medium | Low | Phase 2 planning |

Stakeholder Engagement Strategy:

VP Product (Sponsor):
  - Frequency: Weekly 30-min check-in
  - Content: Progress, risks, decisions
  - Involvement: Approve phase progression
  - Communication: Email updates + meeting

Development Team:
  - Frequency: Daily standups (15 min)
  - Content: What did we do, what's next, blockers
  - Involvement: Execute implementation
  - Communication: Slack + daily syncs

QA Team:
  - Frequency: 3x per week
  - Content: Test progress, findings, spec alignment
  - Involvement: Validate Phase 1
  - Communication: Test reports + meetings

Users (Testing):
  - Frequency: Phase 1 end (1 week testing)
  - Content: User feedback and feature validation
  - Involvement: Test Phase 1, provide feedback
  - Communication: In-app surveys + interviews

════════════════════════════════════════════════════════════

PRELIMINARY PROJECT SCHEDULE

Timeline: [When does everything happen?]

Pre-Project:
  Week of Oct 21: Charter approval
  Week of Oct 28: Team onboarding

Phase 1 Development:
  Week of Nov 4: Week 1 (Auth + CRUD)
  Week of Nov 11: Week 2 (Local storage + sync)
  Week of Nov 18: Week 3 (Search + organization)
  Week of Nov 25: Week 4 (Polish + deploy)

Phase 1 Testing:
  Week of Dec 2: QA testing
  Week of Dec 9: Fixes + refinements

Rollout:
  Week of Dec 16: Phase 1 launch

Phase 2 Planning:
  Week of Dec 16: Roundtable session for Phase 2
  Week of Dec 23: Phase 2 Spec package

Phase 2 Development:
  Jan 2024+: Phase 2 implementation (8 weeks)

Key Milestones:
  - Charter Approval: Oct 25
  - Phase 1 Spec Complete: Nov 4
  - Phase 1 Development Complete: Nov 29
  - Phase 1 Testing Complete: Dec 9
  - Phase 1 Launch: Dec 16
  - Phase 2 Spec: Dec 16
  - Phase 2 Launch: Feb 2024

Critical Path:
  Spec → Auth Setup → CRDT Sync → Phase 1 Complete
  (Longest path determines Phase 1 end date)

Schedule Constraints:
  - Launch must be before Dec 20 (holiday season)
  - User testing must complete by Dec 10
  - No development work Dec 24 - Jan 1

════════════════════════════════════════════════════════════

BUDGET & RESOURCES

Project Budget: [How much are we spending?]

Budget Summary:
  Total Project Budget: $100K (Phase 1-3 envelope)
  Phase 1 Budget: $25K
  Phase 2 Budget: $35K
  Phase 3 Budget: $40K

Phase 1 Budget Breakdown:
  Development (280 hrs @ $50/hr): $14K
  Infrastructure & Tools: $3K
  Testing & QA: $4K
  Project Management & Overhead: $2K
  Contingency (10%): $2.5K
  ────────────────────────────
  Total Phase 1: $25.5K

Budget Authority:
  - Project Manager: Can reallocate within phase ($0-$5K)
  - VP Product (Sponsor): Must approve over-budget ($5K+)
  - CFO: Must approve over-project ($25K+)

Cost Baseline:
  Phase 1: $25K (approved budget)
  Variance threshold: ±10% ($2.5K)

Resource Plan:
  Development Team:
    - 1 Full-time developer (4 weeks)
    - 1 Part-time QA (2 weeks embedded, 2 weeks dedicated)

  Project Management:
    - 0.5 FTE Project Manager (Roundtable facilitation + oversight)

  External (if needed):
    - Security review (1 week, $2K, if time permits)

════════════════════════════════════════════════════════════

RISK APPETITE & ASSUMPTIONS

Risk Appetite: [How much risk are we willing to accept?]

Overall Risk Appetite: MODERATE

Risk Tolerance by Category:
  Schedule Risk: LOW (timeline critical for market)
  Budget Risk: LOW (fixed budget for Phase 1)
  Technical Risk: MODERATE (CRDT complexity acceptable if managed)
  Market Risk: HIGH (MVP phase, validated with users)
  Resource Risk: MODERATE (can add resources if needed)

Key Assumptions:

Schedule Assumptions:
  - Team available full-time for Phase 1 (4 weeks)
  - No major context switching or competing priorities
  - Clear requirements eliminate back-and-forth

Technical Assumptions:
  - CRDT library is reliable and performant
  - SQLite scales to 100K notes (validated in Phase 1)
  - OAuth provider available and stable
  - Team has SQLite + CRDT experience

Business Assumptions:
  - Market wants offline-first collaboration tools
  - Users value privacy (willing to trade UX for encryption)
  - SMB teams are target first customers
  - Phase 1 revenue potential: $10M by Year 2

Resource Assumptions:
  - Dev team doesn't have competing priorities
  - QA available for parallel testing
  - PM can facilitate Roundtable sessions
  - External security review available if needed

════════════════════════════════════════════════════════════

DECISION AUTHORITY

Decision Authority Matrix: [Who decides what?]

Strategic Decisions (Sponsor Authority):
  - Project phase progression: VP Product approves phase gates
  - Major scope changes: VP Product approves
  - Budget increase >10%: VP Product approves
  - Timeline changes >1 week: VP Product approves
  - High-level strategy: VP Product decides

Tactical Decisions (PM Authority):
  - Day-to-day priorities: PM decides
  - Resource allocation within phase: PM decides
  - Small scope clarifications: PM decides
  - Budget allocation within phase: PM decides
  - Issue resolution: PM decides

Technical Decisions (Architecture Authority):
  - Technology choices: Architect decides (within constraints)
  - Design patterns: Architect decides
  - Code quality standards: Architect decides
  - Performance optimization: Architect decides

Product Decisions (Product Manager Authority):
  - Feature prioritization: Product Manager decides
  - User experience design: Product Manager decides
  - MVP scope: Product Manager decides
  - Success criteria definition: Product Manager decides

Escalation Path:
  Issue discovered
    ↓
  Project Manager tries to resolve
    ↓
  If unresolved → Escalate to VP Product (Sponsor)
    ↓
  If still unresolved → Escalate to Executive Steering Committee
    ↓
  Final decision by Steering Committee

════════════════════════════════════════════════════════════

APPROVAL & SIGNATURES

Project Charter Approval:

This document authorizes the project as described and commits
the organization to:
  - Allocate resources as specified
  - Provide budget as specified
  - Accept risk appetite as defined
  - Support decision authority structure as defined

Approved By:

VP Product (Project Sponsor):
  Name: John Smith
  Date: ________________
  Signature: ________________

Project Manager:
  Name: Sarah Chen
  Date: ________________
  Signature: ________________

Development Manager:
  Name: Mike Johnson
  Date: ________________
  Signature: ________________

CFO (Budget Authority):
  Name: Lisa Wong
  Date: ________________
  Signature: ________________

════════════════════════════════════════════════════════════

REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-10-21 | Sarah Chen | Initial charter |
| | | | |
| | | | |

════════════════════════════════════════════════════════════
```

---

## Using the Charter Throughout the Project

### At Project Kickoff
```
Use charter to:
  ✓ Align all stakeholders on success criteria
  ✓ Confirm decision authority and escalation
  ✓ Review risk appetite and assumptions
  ✓ Confirm budget and resource allocation
  ✓ Review schedule and phase breakdown
```

### During Project Execution
```
Use charter to:
  ✓ Validate scope (is this in or out of scope?)
  ✓ Manage changes (does this affect success criteria?)
  ✓ Make decisions (using decision authority matrix)
  ✓ Escalate issues (using defined escalation path)
  ✓ Track against success criteria
```

### At Phase Gates
```
Review charter to:
  ✓ Confirm phase success criteria are met
  ✓ Validate against KPIs
  ✓ Approve phase progression
  ✓ Adjust assumptions for next phase if needed
```

### At Project Closure
```
Use charter to:
  ✓ Validate final success criteria met
  ✓ Document lessons learned against assumptions
  ✓ Assess risk appetite vs. actual risk experience
  ✓ Document any charter changes during project
```

---

## Charter Review Best Practices

### Before Signature
```
Charter review checklist:
  □ Vision is clear and specific (not vague)
  □ Success criteria are measurable (not subjective)
  □ Phase breakdown is realistic
  □ Budget includes contingency
  □ Timeline is achievable
  □ Stakeholders are identified
  □ Decision authority is clear
  □ Risk appetite is defined
  □ Assumptions are documented
  □ All required approvals obtained
```

### During Project (Quarterly)
```
Review charter to:
  □ Are we still aligned on vision?
  □ Are success criteria still appropriate?
  □ Are assumptions still valid?
  □ Do we need to adjust risk appetite?
  □ Are there new stakeholders to add?
  □ Do decision authorities need updating?
```

### Charter Changes
```
If assumptions change significantly:
  1. Document the change
  2. Impact analysis: How does it affect success criteria?
  3. Get sponsor approval for changes
  4. Update charter document
  5. Communicate to all stakeholders
  6. Create revision in history
```

---

## Integration with Roundtable

### Pre-Roundtable (Project Charter)
```
Charter defines:
  - Vision that goes into Roundtable session
  - Success criteria that validate Roundtable output
  - Phase breakdown that Roundtable refines
  - Risk appetite that guides Roundtable trade-offs
  - Stakeholders that Roundtable involves
  - Decision authority that Roundtable respects
```

### Roundtable Session
```
Session refines:
  - Charter vision → Detailed project vision
  - Charter phases → Detailed phase scope
  - Charter assumptions → Validated assumptions
  - Charter success criteria → Measurable requirements
  - Charter risks → Risk register (in follow-up doc)
```

### Post-Roundtable
```
Charter updated with:
  - Refined scope from session
  - Success criteria from deliberation
  - Resource estimates from panels
  - Risk identification from discussion
  - Timeline refinement from feasibility assessment
```

---

## Example: Applied Charter

**Project:** Task Management SaaS - Phase 1
**Sponsor:** VP Product
**Timeline:** 4 weeks
**Budget:** $25K

**Success Criteria:**
- ✓ Spec complete within 1 week
- ✓ Development complete within 4 weeks
- ✓ QA validation: 100% of flows working
- ✓ User satisfaction: ≥85%
- ✓ On budget: ≤$25K spent

**Key Decision:**
During Phase 1, offline-first sync becomes complex.
Team asks: "Can we simplify to cloud-first?"

**Using Charter:**
- Is simplifying in or out of scope? REVIEW CHARTER SCOPE
- How does it affect success criteria? REVIEW CHARTER SUCCESS CRITERIA
- Is this a technical decision (Architecture authority) or strategic (Sponsor authority)? REVIEW DECISION MATRIX
- Does it change budget/timeline? REVIEW BUDGET AND TIMELINE
- Are we violating risk appetite? REVIEW RISK APPETITE

**Result:** Charter provides framework for evaluating the change, not just gut feel.

---

## Summary

The Project Charter:

✅ **Formalizes authorization** - Project is officially approved
✅ **Defines success** - Objective success criteria, not vague goals
✅ **Clarifies scope** - What's in, what's out
✅ **Establishes authority** - Who decides what
✅ **Commits resources** - Budget and team approved
✅ **Sets expectations** - Stakeholders aligned
✅ **Documents assumptions** - What we believe to be true
✅ **Enables decision-making** - Framework for choices during project

Without a charter: Projects drift, scope creeps, authority is unclear.
With a charter: Everyone knows the vision, the success criteria, who decides what, and when we've succeeded.

This is how Roundtable projects start formally, not with "let me build something cool."
