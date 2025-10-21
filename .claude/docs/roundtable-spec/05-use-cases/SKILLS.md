# Use Cases: Skills System

This document presents use cases that showcase how the **Skills System** (Layer 0 of the Roundtable architecture) enables flexible expert composition, reusability, versioning, and marketplace collaboration.

---

## Overview

The Skills system makes expertise reusable by modeling skills as first-class artifacts:
- **Independent YAML files** that define agent instructions and cross-domain awareness
- **Versioned and shareable** via git repositories and marketplace
- **Composable** into Constitutions for different project types
- **Evolvable** as organizations learn what works

These use cases show skills in action across different scenarios.

---

## UC-S1: Financial Services - Multi-Source Skill Composition

### Persona
**Sarah**, VP of Product at FinTech Startup

**Challenge:**
Building a security decision for a new payment API. Sarah's team needs:
- Threat modeling expertise (attack surface analysis)
- Compliance expertise (regulatory requirements)
- Infrastructure expertise (deployment security)
- Product expertise (business requirements)

They don't have pre-trained agents for each role, and they want flexibility to update expertise as threats evolve.

### Scenario

**Initial Setup:**

Sarah's organization has its own internal skills repository (`.roundtable/skills/`) with custom threat modeling for fintech. They also subscribe to a marketplace skill for compliance (updated quarterly by regulatory experts) and use open-source infrastructure skills.

```yaml
# .roundtable/constitution.yml
project: "payment-api-security-review"
algorithm: democratic_majority
escalation_rules:
  - trigger: "regulatory impact detected"
    escalate_to: [compliance]
  - trigger: "infrastructure cost significant"
    escalate_to: [product]

security:
  agents:
    - model: claude-opus
      skill: ".roundtable/skills/security/threat-modeling-fintech.yml"
    - model: gpt-4
      skill: "marketplace://compliance-experts/pci-dss-specialist:2024-Q4"

infrastructure:
  agents:
    - model: claude-opus
      skill: "github://open-security/infrastructure/aws-security-architect.yml"

product:
  agents:
    - model: claude-3-sonnet
      skill: ".roundtable/skills/product/fintech-product-manager.yml"
```

**Deliberation Output:**

Prompt: *"Should we require API key rotation every 90 days or allow 180 days?"*

```
SECURITY Panel (2 agents)
├─ Agent 1 (Threat Modeling Fintech)
│  └─ "90-day rotation aligned with threat modeling frameworks
│     for financial services. Reduces exposure window from
│     compromised keys. Cost of implementation: moderate."
│
└─ Agent 2 (PCI-DSS Specialist from Marketplace)
   └─ "PCI-DSS 4.0 requires rotation, but 90-day is stricter
      than minimum. 180-day compliant but increases audit risk.
      Recommend 90-day per framework."

CONSENSUS: 90-day rotation required

[ESCALATION TRIGGERED: Regulatory impact detected]
→ COMPLIANCE panel reached: "Recommend 90 days, aligns with
  emerging regional fintech regulations expected Q2 2025"

INFRASTRUCTURE Panel (1 agent)
└─ "90-day rotation manageable with automated key management.
   Estimated implementation cost: $40K. No infrastructure blocker."

PRODUCT Panel (1 agent)
└─ "90-day creates UX friction for API clients. Need migration
   window and clear documentation. Can communicate as security
   best practice to reduce resistance."

FINAL DECISION:
✓ Implement 90-day API key rotation
✓ Phase rollout over 4 weeks with client notification
✓ Provide key rotation API for automated integration
```

### Key Insight: Skill Composition Without Hiring

**What makes this valuable:**

1. **Rapid Expertise Assembly**: Sarah didn't need to hire four experts. She composed them:
   - Internal custom threat modeling (organization-specific)
   - Marketplace compliance (regulatory experts maintain it)
   - Open-source infrastructure (community-maintained)
   - Internal product (existing team)

2. **Up-to-Date Expertise**: The marketplace compliance skill is updated quarterly by regulatory experts. Sarah's team automatically gets Q4 2024 updates next quarter without manual intervention.

3. **Auditability**: Sarah can show compliance auditors exactly which version of the PCI-DSS skill was used in the decision (marketplace://compliance-experts/pci-dss-specialist:2024-Q4).

4. **Cost-Effective**: Open-source infrastructure skill costs nothing. Marketplace compliance skill costs less than hiring one expert. Threat modeling skill is customized once and reused across all security decisions.

### Natural Training Differences

Even in this multi-source scenario, natural differences emerge:
- Claude (trained with extensive security knowledge) thinks systemically about threat vectors
- GPT-4 (trained differently) notices practical compliance nuances
- These differences spark useful debate without forced role-play

---

## UC-S2: Skill Version Management - Threat Discovery and Update

### Persona
**Marcus**, Security Architect at Enterprise SaaS

**Challenge:**
Marcus discovered a new class of supply chain attacks affecting their infrastructure decisions. He needs to:
1. Update the threat modeling skill to reflect this new threat
2. Automatically share the update with dependent projects
3. Allow projects to choose: auto-update or pin to previous version

### Scenario

**Version 1.0 Timeline:**

```yaml
# .roundtable/skills/security/threat-modeling-enterprise.yml (v1.0.0)
skill:
  name: "Threat Modeling Enterprise"
  id: "security/threat-modeling-enterprise"
  version: "1.0.0"
  updated: "2024-10-01"
  threat_vectors:
    - authentication: "credential compromise"
    - infrastructure: "cloud misconfiguration"
    - data: "encryption failures"
```

**Marcus Discovers New Threat (October 15):**

Supply chain attacks via compromised container images are increasing in the wild. This affects infrastructure decisions about container registries and image scanning.

**Version 2.0 Update (October 16):**

```yaml
# .roundtable/skills/security/threat-modeling-enterprise.yml (v2.0.0)
skill:
  name: "Threat Modeling Enterprise"
  id: "security/threat-modeling-enterprise"
  version: "2.0.0"
  updated: "2024-10-16"
  breaking_changes: true
  changelog: |
    ## v2.0.0
    Added supply chain threat vectors following discovery of
    widespread container image compromise attacks (CVE-2024-XXXXX).

    NEW RISK CATEGORY: Supply Chain Attacks
    - Compromised container images in registries
    - Infected dependencies in package managers
    - Malicious helm charts

    RECOMMENDATION: Projects should review container registry
    strategies immediately. This is a BREAKING change because
    all infrastructure decisions now require supply chain assessment.

  threat_vectors:
    - authentication: "credential compromise"
    - infrastructure: "cloud misconfiguration"
    - data: "encryption failures"
    - supply_chain: "compromised dependencies"
      sub_vectors:
        - "container images"
        - "package managers"
        - "helm charts"
```

**Project Responses:**

**Project A** (uses marketplace skill, auto-update enabled):
```yaml
# constitution.yml
security:
  agents:
    - model: claude-opus
      skill: "marketplace://marcus-team/threat-modeling-enterprise:latest"
      # Auto-receives v2.0.0 on next run
```
Marcus's team runs their next deliberation on October 17. The new supply chain threat vectors automatically apply. Their decision about container registry strategy now includes supply chain security assessment.

**Project B** (uses marketplace skill, pinned version):
```yaml
# constitution.yml
security:
  agents:
    - model: claude-opus
      skill: "marketplace://marcus-team/threat-modeling-enterprise:1.0.0"
      # Stays on v1.0.0, won't get v2.0.0 until team explicitly upgrades
```
Project B's team gets a warning: "Skill has critical security update (v2.0.0) with new supply chain threat vectors. Review recommended." They can upgrade at their own pace or defer if their infrastructure decisions don't involve container registries.

**Project C** (local copy):
```yaml
# constitution.yml
security:
  agents:
    - model: claude-opus
      skill: ".roundtable/skills/security/threat-modeling-enterprise.yml"
      # Depends on Marcus sharing updates through their VCS
```
Project C maintainers see Marcus's git commit with the new skill version. They merge it into their repository and get the benefit of the supply chain threat assessment.

### Key Insight: Skill Versioning Enables Safe Evolution

**What makes this valuable:**

1. **Centralized Expertise Updates**: Marcus updates one skill. All projects depending on it can benefit.

2. **Backward Compatibility Control**: Breaking changes (v1→v2) are explicit. Projects can auto-upgrade or pin as appropriate.

3. **Audit Trail**: Every deliberation records which skill version was used in the decision. "This container registry decision was made with threat-modeling-enterprise:2.0.0 which includes supply chain vectors."

4. **Organizational Learning**: Marcus's discovery becomes organizational wisdom. New projects automatically get the benefit of lessons learned.

5. **Marketplace Marketplace**: Marcus can publish this threat modeling skill to a public marketplace. Other organizations benefit from his security research without paying for it twice.

---

## UC-S3: Cross-Organization Skill Marketplace

### Persona
**Dr. Chen**, CISO at Healthcare SaaS, and **the open-source community**

**Challenge:**
Healthcare compliance is complex and expensive to get right. Dr. Chen needs:
- HIPAA compliance assessment
- HITRUST CSF requirements
- Privacy impact analysis
- Audit trail for regulators

Building this from scratch would cost $200K+. Instead, Dr. Chen discovers that the healthcare compliance expertise is available as open-source skills shared by other healthcare organizations.

### Scenario

**Dr. Chen's Constitution:**

```yaml
# healthtech-startup/.roundtable/constitution.yml
project: "patient-data-platform"
algorithm: security_first_veto

compliance:
  agents:
    - model: claude-opus
      skill: "github://healthcare-ciso-network/hipaa-specialist:v3.1"
    - model: gpt-4
      skill: "github://healthcare-ciso-network/hitrust-csf-assessor:v2.0"
    - model: claude-3-sonnet
      skill: "github://privacy-tech-alliance/privacy-impact-analyst:v1.2"

security:
  agents:
    - model: claude-opus
      skill: "marketplace://medtech-security/healthcare-threat-modeling:2024-Q4"
    - model: gpt-4
      skill: ".roundtable/skills/security/hipaa-incident-response.yml"
```

**Deliberation: Patient Data Storage Architecture**

Prompt: *"Should we store patient PHI in managed database or build encrypted custom storage?"*

```
COMPLIANCE Panel (3 agents from healthcare community)
├─ Agent 1 (HIPAA Specialist via github://healthcare-ciso-network)
│  └─ "Managed database with BAA makes HIPAA compliance easier.
│     Custom storage adds compliance burden unless you're a security
│     company. We recommend managed + encryption at rest."
│
├─ Agent 2 (HITRUST CSF Assessor via github://healthcare-ciso-network)
│  └─ "HITRUST certification requires evidence of compliance.
│     Managed databases (AWS RDS, Azure SQL with encryption)
│     have pre-built HITRUST evidence. Custom storage means
│     you prove control compliance from scratch."
│
└─ Agent 3 (Privacy Impact Analyst via github://privacy-tech-alliance)
   └─ "From privacy perspective: managed database with data
      residency controls (regional) meets GDPR + state privacy
      laws. Custom storage adds data handling risk."

CONSENSUS (security_first_veto): ✓ All agreed → Managed database

SECURITY Panel (2 agents)
├─ Agent 1 (Healthcare Threat Modeling)
│  └─ "Managed databases have established threat models.
│     Custom storage is likely to have unknown vulnerabilities."
│
└─ Agent 2 (HIPAA Incident Response)
   └─ "If breach occurs, managed database means vendor incident
      response. Custom means you're incident responding on
      novel infrastructure under pressure."

FINAL DECISION:
✓ Use managed database (AWS RDS or Azure SQL)
✓ Enable encryption at rest and in transit
✓ Configure BAA with provider
✓ Document HITRUST control mapping
✓ Complete privacy impact assessment before launch
```

### Key Insight: Shared Expertise Democratizes Compliance

**What makes this valuable:**

1. **Cost of Compliance**: Dr. Chen gets HIPAA, HITRUST, and privacy expertise for free instead of hiring 3 consultants @ $200K+ annually.

2. **Community Knowledge**: Healthcare CISOs have open-sourced their compliance expertise. Dr. Chen's startup benefits from the collective intelligence of larger organizations.

3. **Maintainability**: When HIPAA regulations update (HIPAA updates approximately every 2-3 years with new guidance), the healthcare community maintains the skill. Dr. Chen gets automatic updates.

4. **Cross-Validation**: Three different perspectives on compliance (HIPAA, HITRUST, Privacy) provide better coverage than one internal expert would give.

5. **Regulatory Confidence**: Auditors see that decisions were made using skills developed and maintained by healthcare compliance experts.

### Natural Skills Ecosystem

This scenario creates a vibrant skills marketplace:
- **Open-source skills**: HIPAA specialist (maintained by healthcare CISOs)
- **Community skills**: Privacy impact analyst (maintained by privacy advocacy organizations)
- **Commercial skills**: Healthcare threat modeling (sold via marketplace)
- **Internal skills**: HIPAA incident response (Dr. Chen's team's proprietary playbooks)

---

## UC-S4: Skill Evolution and Automatic Team Formation (V2 Preview)

### Persona
**Product Team Lead** at growing B2B SaaS

**Challenge (V1 - Today):**
The team manually specifies which skills to use for decisions. They know threat modeling and accessibility experts exist, but they manually add them to their Constitution each time.

**Opportunity (V2 - Future):**
After running 30 deliberations using various skill combinations, Roundtable notices patterns:
- Accessibility decisions with skill X consistently produce better UX outcomes
- Security decisions combining skills Y and Z reach faster consensus
- Product decisions benefit from having both internal and external perspectives

Could Roundtable automatically suggest or form teams based on these patterns?

### Scenario

**V1 - Manual Skill Specification (Current)**

```yaml
# v1-constitution.yml
project: "b2b-saas-product"

# Manually specify skills for each deliberation
product:
  agents:
    - model: claude-opus
      skill: ".roundtable/skills/product/b2b-platform-thinking.yml"
    - model: gpt-4
      skill: "marketplace://product-experts/saas-adoption-strategy:latest"

ux:
  agents:
    - model: claude-opus
      skill: ".roundtable/skills/ux/enterprise-ux-patterns.yml"
    - model: gpt-4
      skill: "marketplace://ux-experts/accessibility-specialist:latest"

security:
  agents:
    - model: claude-opus
      skill: ".roundtable/skills/security/threat-modeling-saas.yml"
```

**V1 Deliberation Results** (30 deliberations over 3 months):

Roundtable's engine logs metadata for each deliberation:

```json
{
  "deliberation_id": "deliberation_001",
  "panel": "ux",
  "skills_used": [
    "enterprise-ux-patterns.yml",
    "accessibility-specialist:latest"
  ],
  "outcome_satisfaction": 0.92,
  "consensus_speed": "4_minutes",
  "user_feedback": "exactly_what_we_needed"
}
```

After 30 deliberations, patterns emerge:

| Panel | Skill Combination | Avg Satisfaction | Consensus Speed | User Feedback |
|-------|---|---|---|---|
| UX | enterprise-ux + accessibility | 0.92 | 4 min | "exactly_what_we_needed" |
| Product | b2b-thinking + saas-adoption | 0.89 | 6 min | "useful_but_incomplete" |
| Security | threat-modeling + compliance | 0.85 | 8 min | "good_foundation_needs_review" |
| Product | b2b-thinking + gpt4 + market-analysis | 0.94 | 7 min | "comprehensive" |

**V2 - Automatic Team Suggestion (Future)**

```yaml
# v2-constitution.yml with auto_compose enabled
project: "b2b-saas-product"
learning_mode: enabled  # Analyzes past deliberations

# Instead of manual specification, suggest teams
ux:
  auto_compose:
    enabled: true
    confidence_threshold: 0.90
    # Suggests: enterprise-ux + accessibility (0.92 satisfaction)
    # Reason: "This combination produced highest satisfaction
    #         across 8 deliberations. Accessibility + enterprise
    #         patterns consistently align on accessibility-first UX."

product:
  auto_compose:
    enabled: true
    confidence_threshold: 0.85
    # Suggests: b2b-thinking + saas-adoption + market-analysis
    # Reason: "Three-skill team produced 0.94 satisfaction on
    #         last 3 deliberations. Adds market analysis for
    #         strategic product decisions."

security:
  auto_compose:
    enabled: true
    confidence_threshold: 0.90
    # Suggests: Continue manual specification (no clear pattern yet)
    # Reason: "Security deliberations too context-dependent.
    #         Recommend staying with manual specification."
```

**V2 Deliberation Result:**

When user asks a UX question, Roundtable:
1. Recognizes it's a UX panel decision
2. Checks learning history: "enterprise-ux + accessibility got 0.92 satisfaction last time"
3. Automatically loads those skills
4. Runs deliberation with auto-assembled team
5. Logs outcome for continued learning

```
[V2 Auto-Composition in Action]

User Prompt: "Should we redesign the user settings interface?"

System: "Based on 8 past UX deliberations, suggesting team:
  - enterprise-ux-patterns.yml (0.92 avg satisfaction)
  - accessibility-specialist:latest (0.92 avg satisfaction)

  Confidence: 92% (8 deliberations, consistent pattern)

  Run with this team? [YES] [MODIFY] [MANUAL]"

User selects [YES]

UX Panel (Auto-Assembled)
├─ Agent 1 (Enterprise UX)
│  └─ "Settings interface follows B2B SaaS patterns.
│     Put advanced options in secondary panel."
│
└─ Agent 2 (Accessibility)
   └─ "Settings must be keyboard-navigable. Secondary
      panels need focus management. WCAG AAA compliance
      requires this structure."

CONSENSUS: ✓ Redesign with settings/advanced split

Outcome Logged: satisfaction=0.93, consensus_speed=3_min
(Learning data for next time)
```

### Key Insight: Skills Enable Learning and Evolution

**What makes this valuable:**

1. **V1 Simplicity**: Manual skill specification is straightforward and understandable.

2. **V2 Intelligence**: After collecting deliberation outcomes, Roundtable learns which skill combinations work best for each decision type.

3. **Continuous Improvement**: Teams don't need to decide which experts to add. Roundtable suggests teams based on what actually worked before.

4. **Explainability**: "We suggest this team because it produced 0.92 satisfaction in 8 similar deliberations."

5. **Escape Valve**: If auto-composition doesn't work for a decision type, users can still manually override and specify skills.

---

## Cross-Cutting Insights: Skills System Benefits

### 1. **Reusability Without Fragmentation**

Different organizations can:
- Share base skills (open-source HIPAA specialist)
- Customize them (.roundtable/skills/ local override)
- Publish improvements back to marketplace

One skill definition, infinite contexts.

### 2. **Versioning Prevents Skill Decay**

- Skills don't go stale (maintainers keep them current)
- Organizations can upgrade at their own pace
- Breaking changes are explicit and managed

### 3. **Expertise Democratization**

- Small teams access expertise they couldn't afford to hire
- Expertise compounds in marketplace
- Community maintains what no single org could

### 4. **Audit Trail**

Every deliberation records:
- Which skills were used (and versions)
- Which agents contributed
- How consensus was reached

Meets regulatory requirements for "explain your decision."

### 5. **Skill Composition Over Role Specialization**

Rather than forcing "Agent X is always the security expert," skills are:
- Assembled contextually
- Mixed and matched freely
- Updated independently

This aligns with the philosophy of **natural training differences** - let models' inherent strengths emerge through which skills they're given, not through forced role assignment.

---

## Skill Lifecycle Across Use Cases

```
UC-S1: Financial Services → Assembles skills (threat modeling + compliance + infrastructure)
  ↓ (Discovers new threat)
UC-S2: Skill Update → Publishes improved threat modeling skill (v2.0)
  ↓ (Other organizations adopt)
UC-S3: Marketplace → Skills shared openly, HC community publishes compliance skills
  ↓ (Learning from deliberations)
UC-S4: Auto-Composition → Roundtable learns which skill combinations work best
  ↓ (V2+ Advanced)
  Skills become more specialized based on organizational learning
```

---

## Connecting to Core Concepts

### Four-Layer Architecture
```
Layer 0: Skills (these use cases) ← You are here
  ↓
Layer 1: Constitutions (USE_CASES_CONSTITUTIONS.md) ← Skills define pre-prompts
  ↓
Layer 2: Expert Panels (USE_CASES_EXPERT_PANELS.md) ← Panels load skills
  ↓
Layer 3: Deliberation Engine (SPEC.md) ← Engine orchestrates all layers
```

### Skills Influence All Layers

**Constitutions:** Reference skills instead of hard-coding role templates
```yaml
security:
  agents:
    - model: claude-opus
      skill: "marketplace://security-experts/threat-modeling:latest"
```

**Expert Panels:** Load and apply skill prompts to agents
```yaml
agent.system_prompt = skill.system_prompt
agent.cross_domain_awareness = skill.cross_domain_awareness
```

**Deliberation Engine:** Loads skills at runtime, composes teams, tracks outcomes
```
Engine: "Load skills for Security panel"
  → Fetch threat-modeling skill (marketplace)
  → Apply to claude-opus agent
  → Run deliberation
  → Log outcome for learning
```

---

## Summary Table: Skills System Benefits by Use Case

| Use Case | Problem | Solution | Outcome |
|---|---|---|---|
| UC-S1 | Need 4 experts, can't hire 4 | Compose skills from marketplace + internal + open-source | Same expertise for 20% cost |
| UC-S2 | New threat discovered, how to propagate? | Publish skill update, projects auto-receive or pin | Organization learns from security events |
| UC-S3 | Healthcare compliance too expensive | Use community open-source skills | Startup can tackle HIPAA compliance for free |
| UC-S4 | Which skill combinations actually work? | Track outcomes, auto-suggest teams in V2 | Deliberations improve based on learning |

---

## Next Steps

Skills system enables:
1. **Immediate (V1)**: Local skills, git-based marketplace, version management
2. **V2**: Auto-composition based on deliberation outcomes
3. **V3+**: Skill marketplace with contributor ecosystem, ratings, reviews

See [USE_CASES_INDEX.md](USE_CASES_INDEX.md) for related documentation.
