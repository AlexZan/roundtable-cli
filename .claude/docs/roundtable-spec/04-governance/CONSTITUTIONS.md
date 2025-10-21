# Constitutions: Governance Frameworks for Roundtable Projects

A Constitution is the **governance document** for a Roundtable project. It defines who participates, how decisions are made, what constraints apply, and when issues escalate.

Think of it like a project's founding document: it establishes the rules of deliberation before the project starts.

**Important:** Constitutions are **platform-agnostic**. The same Constitution works the same way whether you're using:
- CLI (V1)
- Web UI (V2)
- Mobile App (V2+)
- VS Code Extension (V3+)

The governance rules don't change based on the interface - only the UI changes.

---

## 1. What is a Constitution?

A Constitution answers key questions:
- **Who deliberates?** Which expert panels, which agents?
- **How do we decide?** Which consensus algorithm governs decisions?
- **What constraints apply?** Timeline, budget, compliance requirements?
- **When do we escalate?** What triggers human review?
- **Who has authority?** Can any panel veto? Does Product override Architecture?

### 1.1 Why Constitutions Matter

Without a Constitution:
```
Project starts with vague governance:
- Who decides when panels disagree? Unknown
- What happens if timeline threatened? Unclear
- Does security always win? Maybe?
- Can product override architecture? Usually?
Result: Confusion, ad-hoc decisions, re-deliberation
```

With a Constitution:
```
Project starts with clear governance:
- Panels know their roles
- Algorithm defines decision process
- Escalation rules are explicit
- Everyone knows the rules
Result: Efficient deliberation, consistent decisions
```

---

## 2. Constitution Structure

### 2.1 Full Example

```yaml
---
constitution:
  # METADATA
  name: "Standard E-Commerce Platform"
  version: "1.0"
  created_date: "2024-10-21"
  created_by: "team"
  description: |
    Constitution for typical e-commerce SaaS projects.
    Assumes balanced team with product-aware technical leads.
    Good for 3-6 month projects with $200k-$1M budgets.

  # PANEL COMPOSITION (Using Skills)
  # Skills define expertise - see SKILLS.md for complete documentation
  panels:
    architecture:
      name: "Architecture & Engineering"
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/architecture/systems-architect.yml"
        - model: gpt-4
          skill: ".roundtable/skills/architecture/performance-expert.yml"

    ux:
      name: "User Experience & Design"
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/ux/ux-designer.yml"
        - model: gpt-4
          skill: ".roundtable/skills/ux/accessibility-specialist.yml"

    security:
      name: "Security & Compliance"
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/security/threat-modeling-expert.yml"
        - model: gpt-4
          skill: ".roundtable/skills/security/compliance-specialist.yml"

    data:
      name: "Data Engineering"
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/data/data-engineer.yml"

    product:
      name: "Product & Strategy"
      agents:
        - model: gpt-4
          skill: ".roundtable/skills/product/product-manager.yml"

  # CONSENSUS ALGORITHM
  consensus_algorithm: "democratic_majority"
  # See CONSENSUS_ALGORITHMS.md for full options

  # PROJECT CONSTRAINTS
  constraints:
    - name: "Timeline"
      value: "12 weeks"
      reason: "Market window, competitive pressure"
      enforced_by: "product"
      negotiable: true  # Can be extended if blocking technical risks

    - name: "Budget"
      value: "$500,000"
      reason: "Series A funding allocation"
      enforced_by: "product"
      negotiable: false  # Hard constraint

    - name: "Team Size"
      value: "5-8 engineers + 1 product manager"
      reason: "Cost control, communication efficiency"
      enforced_by: "product"
      negotiable: true

    - name: "Security Standards"
      value: "OWASP Top 10, SOC2 Type II"
      reason: "Enterprise customer requirements"
      enforced_by: "security"
      negotiable: false  # Non-negotiable

    - name: "Accessibility"
      value: "WCAG 2.1 Level AA"
      reason: "Legal requirement, user inclusivity"
      enforced_by: "ux"
      negotiable: false

    - name: "Data Residency"
      value: "US data centers only (no EU)"
      reason: "Compliance with US customer contracts"
      enforced_by: "security"
      negotiable: false

  # ESCALATION RULES
  escalation:
    # Cross-domain concerns
    - trigger: "cross_domain_concern_raised"
      affected_panels_respond: true
      timeout_rounds: 2
      if_unresolved: "moderator_decides"
      if_still_unresolved: "human_review_required"

    # Constraint violations
    - trigger: "timeline_threatened"
      handler: "product_decides_scope"
      options:
        - reduce_scope
        - extend_timeline
        - increase_resources
      if_conflict: "product_has_final_say"

    - trigger: "budget_exceeded"
      handler: "product_decides"
      options:
        - reduce_scope
        - seek_additional_funding
      if_conflict: "product_has_final_say"

    - trigger: "security_constraint_violated"
      handler: "security_objects_decision_halts"
      human_override_required: true
      can_be_overridden_by: "executive_decision"

    # Unresolved deliberation
    - trigger: "unresolved_after_3_rounds"
      action: "human_review"
      reviewer: "project_lead"
      decision_criteria:
        - "Risk assessment of each option"
        - "Timeline impact"
        - "Cost impact"
        - "Team skill match"

  # DECISION FRAMEWORK
  decision_framework:
    - name: "Option Evaluation Criteria"
      applies_to: "all_decisions"
      criteria:
        - "Feasibility (can we build it?)"
        - "Cost (money and time)"
        - "Risk (technical, business, security)"
        - "User impact (UX, accessibility)"
        - "Maintainability (long-term ops burden)"

    - name: "Risk Tolerance"
      high_priority: "Security constraints are non-negotiable"
      medium_priority: "Performance and compliance are important"
      low_priority: "Nice-to-have optimizations can be deferred"

  # PHASING & MILESTONES
  phases:
    phase_1:
      name: "Foundation (Weeks 1-4)"
      goals:
        - "Auth system designed"
        - "Core data model finalized"
        - "Payment integration architecture"
      decision_gate: "Architecture and Security sign-off"

    phase_2:
      name: "Core Features (Weeks 5-9)"
      goals:
        - "Product features implemented"
        - "Performance baseline established"
        - "Initial compliance testing"
      decision_gate: "Product and Data sign-off"

    phase_3:
      name: "Polish & Hardening (Weeks 10-12)"
      goals:
        - "Performance optimization"
        - "Security audit and fixes"
        - "Accessibility audit and fixes"
      decision_gate: "Security and UX final approval"

  # PROJECT COMMUNICATION
  communication:
    decision_log: "project_decisions.md"
    spec_file: "SPEC.md"
    meeting_frequency: "daily_async"  # Via roundtable deliberation
    human_checkpoints:
      - "Phase end gates"
      - "Security concerns escalated"
      - "Budget or timeline threatened"

  # DISPUTE RESOLUTION
  dispute_resolution:
    - scenario: "Two panels fundamentally disagree"
      process: |
        1. Both panels present full reasoning
        2. Moderator identifies key trade-offs
        3. Project lead makes decision based on constitution values
      owner: "project_lead"

    - scenario: "Panel objects to constraint"
      process: |
        1. Panel explains why constraint is infeasible
        2. Constraint owner evaluates objection
        3. Negotiate adjustment or accept technical debt
      owner: "constraint_owner"

    - scenario: "Panel flagged as outside expertise"
      process: |
        1. Panel explains why this is in their domain
        2. If agreed: Include in discussion
        3. If disagreed: Exclude from decision
      owner: "moderator"
```

### 2.2 Minimal Constitution (Quick-Start)

For users who want to start immediately:

```yaml
---
constitution:
  name: "Quick Start"
  description: "Default minimal constitution for fast projects"

  # Sensible defaults
  participants:
    - architecture (Claude, GPT-4)
    - ux (Claude)
    - security (Claude)
    - data (Claude)
    - product (GPT-4)

  consensus_algorithm: "democratic_majority"

  constraints:
    - security_standards: "OWASP Top 10"
    - accessibility: "WCAG 2.1 Level A"

  escalation:
    - security_objects: "human_review"
    - unresolved_3_rounds: "human_review"
```

---

## 3. Pre-Built Constitution Templates

The marketplace includes templates for common scenarios:

### 3.1 Industry Templates

**E-Commerce**
```yaml
constitution: "E-Commerce Platform"
focus: "Customer experience + payment security"
panels:
  - architecture (2 agents)
  - ux (2 agents - heavy focus on conversion)
  - security (2 agents - payment compliance focus)
  - data (1 agent - performance critical)
  - product (1 agent)
consensus: democratic_majority
constraints:
  - "Payment PCI-DSS compliance"
  - "Sub-2s page load"
  - "Mobile-first design"
```

**Healthcare**
```yaml
constitution: "Healthcare System"
focus: "Compliance + security > everything"
panels:
  - security (3 agents - veto power)
  - compliance (1 agent - regulations)
  - data (2 agents - patient data handling)
  - architecture (2 agents)
  - ux (1 agent)
  - product (1 agent)
consensus: security_first_veto
constraints:
  - "HIPAA compliance mandatory"
  - "Audit logging on all PHI access"
  - "Data encryption at rest and in transit"
```

**SaaS (B2B)**
```yaml
constitution: "SaaS Platform"
focus: "Scalability + reliability"
panels:
  - architecture (2 agents - heavy focus on scaling)
  - data (2 agents - query performance)
  - product (1 agent - feature prioritization)
  - ux (1 agent)
  - security (1 agent)
consensus: democratic_majority
constraints:
  - "99.9% uptime SLA"
  - "Multi-tenancy secure isolation"
  - "SOC2 Type II compliance"
```

**Startup MVP**
```yaml
constitution: "Startup MVP"
focus: "Speed > perfection"
panels:
  - product (primary decision maker)
  - architecture (1 agent - practical engineer)
  - data (1 agent)
  - ux (1 agent)
consensus: product_centric_fast
constraints:
  - "3-month timeline (MVP)"
  - "Bootstrap budget (~$50k)"
  - "Technical debt acceptable if >6m payoff"
```

**Enterprise**
```yaml
constitution: "Enterprise System"
focus: "Stability + compliance + scale"
panels:
  - architecture (3 agents)
  - security (2 agents)
  - compliance (1 agent)
  - data (2 agents)
  - product (1 agent)
  - operations (1 agent)
consensus: democratic_majority
constraints:
  - "99.95% uptime"
  - "SOC2 Type II + FedRAMP (if gov)"
  - "Enterprise support model"
```

### 3.2 Approach Templates

**API-First Design**
```yaml
constitution: "API-First"
focus: "API quality and consistency"
special_panel: "API Architect"
key_decisions:
  - "RESTful vs GraphQL"
  - "API versioning strategy"
  - "Rate limiting and quotas"
```

**Microservices**
```yaml
constitution: "Microservices"
focus: "Service boundaries, data consistency"
special_panel: "Integration Architect"
key_decisions:
  - "Service boundary definition"
  - "Event-driven vs sync calls"
  - "Data consistency strategy"
```

**Mobile-First**
```yaml
constitution: "Mobile-First"
focus: "Performance and UX on mobile"
panels:
  - ux: "2 agents, heavy mobile focus"
  - architecture: "mobile-specific concerns"
  - data: "bandwidth optimization"
constraints:
  - "Works on 3G networks"
  - "Offline-first where possible"
```

---

## 4. Creating Custom Constitutions

Users can create constitutions tailored to their needs:

```bash
$ roundtable constitution new my-project-constitution

? Constitution name: "AI-Powered Analytics Platform"
? Description: "Real-time analytics for 100M events/day"

? Select consensus algorithm:
  ❯ democratic_majority
    security_first_veto
    product_centric_fast
    custom

? Select base template:
  ❯ SaaS (B2B)
    Startup MVP
    Enterprise
    [None - build from scratch]

? Add panels (multi-select):
  ✓ architecture
  ✓ data (will need 2 agents)
  ✓ product
  ✓ ux
  ✓ security
  [ ] compliance
  [ ] operations

? Add constraints:
  Timeline: 16 weeks
  Budget: $800k
  Team size: 10 engineers
  Performance: <100ms P99 latency
  Uptime: 99.95%
  Compliance: GDPR, CCPA

✓ Constitution created: my-project-constitution.yml
✓ Panels configured: 5
✓ Agents assigned: 10
✓ Consensus algorithm: democratic_majority
✓ Constraints: 6

Next: roundtable init --constitution my-project-constitution.yml
```

---

## 5. Evolving Constitutions

Constitutions can evolve as projects learn:

### 5.1 Amendment Process

```bash
$ roundtable constitution amend

Current Constitution: "Standard E-Commerce"
Version: 1.0

? What to amend:
  [ ] Add panel
  [ ] Remove panel
  [ ] Change constraint
  [ ] Modify escalation rule
  [x] Add new policy

? New policy:
  Name: "Technical Debt Payback Rate"
  Description: "Max 5% sprint capacity to new tech debt"
  Enforcer: "architecture"

? Version: 1.1
? Reason: "Experience showed tech debt accumulating too fast"

✓ Amendment added
✓ Applied to: Round 5 onwards (earlier decisions unaffected)
✓ Decision history preserved

$ roundtable constitution show --diff 1.0 1.1
Added:
  + policies.technical_debt_payback_rate
Unchanged:
  ✓ All panels
  ✓ Consensus algorithm
  ✓ Existing constraints
```

### 5.2 A/B Testing Constitutions

Test different constitutions on hypothetical projects:

```bash
$ roundtable constitution compare democratic_majority vs security_first_veto
  --scenario "auth_system.json"

Scenario: Designing authentication system

Constitution 1: democratic_majority
  │
  ├─ Architecture: "OAuth2 + JWT"
  ├─ Security: "Session-based auth only (OAuth2 vulnerable)"
  ├─ Data: "Session store in Redis"
  ├─ UX: "Either works"
  ├─ Product: "OAuth2 (faster to market)"
  │
  Result: OAuth2 (product + data + architecture win)
  Security concern: Documented but overridden
  Decision confidence: MEDIUM

Constitution 2: security_first_veto
  │
  ├─ Architecture: "OAuth2 + JWT"
  ├─ Security: "⚠️ VETO - Session-based only"
  ├─ Decision halted
  │
  Result: Session-based auth (security veto)
  Security concern: Addressed
  Decision confidence: HIGH

Comparison:
  Differences: 1 (auth approach)
  If security concern later materialized:
    - democratic_majority would need rework
    - security_first_veto already safe
```

---

## 6. Constitution Versioning & History

Track constitution versions for accountability:

```
$ roundtable constitution history "Standard E-Commerce"

v1.0 - 2024-10-01
  Created: Initial constitution for Q4 project
  Panels: 5
  Consensus: democratic_majority
  Status: Active

v1.1 - 2024-10-15
  Amendment: Added technical_debt_payback_rate policy
  Reason: Tech debt accumulating too fast
  Status: Active

v1.2 - 2024-11-01
  Amendment: Changed security escalation to security_first_veto
  Reason: Discovered security issues post-launch
  Status: Active

v2.0 - 2024-12-01
  Major revision: Added operations panel, updated timeline to 20 weeks
  Reason: Learnings from v1 project, preparing for v2
  Status: Proposed (not yet active)
```

---

## 7. Constitution Marketplace

Constitutions are shareable, versioned, and rated:

### 7.1 Marketplace Structure

```
Constitution Marketplace
├─ Official Templates (by Roundtable)
│  ├─ Quick Start (default)
│  ├─ Startup MVP
│  ├─ E-Commerce
│  ├─ Healthcare
│  ├─ SaaS
│  └─ Enterprise
│
├─ Community Contributed
│  ├─ "AI/ML Projects" by @ml_engineer
│  │  ├─ Version: 2.3
│  │  ├─ Downloads: 1,234
│  │  ├─ Rating: 4.7/5
│  │  └─ Special panels: ML Expert, Data Quality
│  │
│  ├─ "Mobile Game" by @indie_game_dev
│  │  ├─ Version: 1.8
│  │  ├─ Downloads: 456
│  │  └─ Rating: 4.2/5
│  │
│  ├─ "Blockchain/Web3" by @crypto_architect
│  │  ├─ Version: 3.1
│  │  ├─ Downloads: 789
│  │  └─ Rating: 4.5/5
│  │
│  └─ "Government Contractor" by @enterprise_team
│     ├─ Version: 1.4
│     ├─ Downloads: 234
│     └─ Rating: 4.9/5
│
└─ Your Private Constitutions
   ├─ "ProjectA v1"
   ├─ "ProjectB v2 (draft)"
   └─ "Reusable Template v1"
```

### 7.2 Using Marketplace Constitutions

```bash
$ roundtable constitution install "AI/ML Projects" --by @ml_engineer

Marketplace Constitution: AI/ML Projects
  Author: @ml_engineer
  Version: 2.3
  Downloads: 1,234
  Rating: 4.7/5 (267 reviews)

Description:
  Optimized constitution for machine learning projects.
  Includes ML Expert panel for model validation.
  Consensus prioritizes data quality and accuracy.

Would you like to:
  [1] Use as-is
  [2] Review configuration first
  [3] Fork and customize
  [?] Show reviews

Your choice: [2]

Panels: 6
  - data: Heavy focus on quality (3 agents)
  - ml_expert: Model validation and training (2 agents)
  - architecture: Serving infrastructure (2 agents)
  - ux: Visualizations and UX (1 agent)
  - security: Privacy and compliance (1 agent)
  - product: Feature prioritization (1 agent)

Consensus: democratic_majority
Constraints: 8 (model accuracy, training time budget, etc.)

Keep this? (Y/n): y

✓ Installed: "AI/ML Projects v2.3"
✓ Location: ~/.roundtable/constitutions/ml_projects_v2.3.yml

Ready to use: roundtable init --constitution "AI/ML Projects"
```

### 7.3 Sharing Your Constitution

```bash
$ roundtable constitution share "ProjectA v1"

Publishing constitution:
  Name: "High-Frequency Trading System"
  Description: "Optimized for ultra-low latency, security-first"
  License: CC-BY-4.0
  Public: true

? Visibility:
  ❯ Public (anyone can find/use)
    Unlisted (share via link only)
    Private (keep local)

? Add to marketplace as:
  [1] Official (if you're maintainer)
  [x] Community (available to all)

? Tags:
  - finance
  - low-latency
  - high-performance
  - security

? Reviews enabled: yes

✓ Published to marketplace
✓ URL: https://roundtable.marketplace/constitutions/high-freq-trading-v1
✓ Anyone can fork and adapt
✓ You'll be credited as author
```

---

## 8. Constitution Validation

Ensure constitutions are well-formed:

```bash
$ roundtable constitution validate my-constitution.yml

Validation Results:
  ✓ YAML syntax valid
  ✓ All required fields present
  ✓ Panels defined: 5
  ✓ Agents exist: 10
  ✓ Consensus algorithm recognized: democratic_majority
  ✓ Constraints format valid: 6 constraints
  ✓ Escalation rules valid: 5 rules

Warnings:
  ⚠️ No "Technical Debt" policy defined (not critical)
  ⚠️ Product panel has only 1 agent (consider 2 for redundancy)

Errors: None

Recommendation:
  Constitution ready to use. Consider adding Product agent for redundancy.
```

---

## 9. Constitution Best Practices

### 9.1 Designing for Your Project

**Too permissive?**
- Lots of escalations to human = slow decisions
- All panels equal voice = slow consensus
- Recommendation: Add constraints, prioritize panels

**Too restrictive?**
- Panels feel unheard = resentment
- Expert input ignored = poor decisions
- Recommendation: Add more consultation points, reduce hard vetoes

**Too complex?**
- Too many panels = expensive, slow
- Too many constraints = hard to satisfy
- Recommendation: Simplify, focus on critical decisions

### 9.2 Key Decisions When Creating

1. **Consensus Algorithm Selection:**
   - General projects? → democratic_majority
   - Regulated? → security_first_veto
   - Startup? → product_centric_fast
   - Research? → comprehensive_synthesis

2. **Panel Composition:**
   - How many agents per panel? (Usually 2, sometimes 1-3)
   - Which models to pair? (Different strengths, not duplicates)
   - Are there domain specialists needed?

3. **Constraint Definition:**
   - What's non-negotiable? (Make it a constraint)
   - What's flexible? (Leave room for deliberation)
   - Who enforces each constraint?

4. **Escalation Clarity:**
   - When does a panel concern block decisions?
   - When does human review happen?
   - What's the timeout for unresolved issues?

---

## 10. Skills Integration

Constitutions reference **Skills** to define agent expertise. Skills are independent, versioned, shareable expert definitions.

### 10.1 How Skills Work with Constitutions

**Constitutions specify:**
- Which panels exist
- Which agents on each panel
- Which **skill** each agent uses

**Skills specify:**
- System prompt (what expert should know)
- Expertise areas
- Cross-domain awareness
- Metadata and versioning

### 10.2 Example: Constitution References Skills

```yaml
constitution:
  name: "Financial Services"

  panels:
    security:
      agents:
        - model: claude-opus
          skill: "security/threat-modeling-expert@1.0"
        - model: gpt-4
          skill: "security/compliance-specialist@1.1"
```

**See SKILLS.md for complete documentation on:**
- Creating custom skills
- Sharing skills via git/marketplace
- Skill versioning and lifecycle
- Skill composition
- Marketplace discovery

### 10.3 V1 vs V2+ Skill Usage

**V1: Local Skills**
```yaml
skill: ".roundtable/skills/security/threat-modeling-expert.yml"
```

**V2+: Git Repository Skills**
```yaml
skill: "github:anthropic/roundtable-skills/security/threat-modeling-expert@1.0"
```

**V2+: Marketplace Skills**
```yaml
skill: "security/threat-modeling-expert@1.0"
# Automatically resolves from marketplace
```

---

## 11. Open Questions

1. **Versioning complexity:** How do we handle projects with evolving constitutions?
2. **Cross-constitution policies:** Can a project use policies from multiple constitutions?
3. **Machine learning:** Can we suggest optimal constitutions based on project characteristics?
4. **Global policies:** Should organizations have org-wide constitution requirements?
5. **Audit trails:** How deeply should we track constitution evolution?
