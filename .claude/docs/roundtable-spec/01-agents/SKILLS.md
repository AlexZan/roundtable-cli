# Skills: Composable Expert Definitions for Roundtable

Skills are **first-class, reusable, shareable expert definitions** that define how agents contribute to panels. They follow the same composable, versioned pattern as Claude's skill system.

Instead of embedding expert definitions in Constitutions, skills are independent artifacts that can be:
- ✅ Versioned independently
- ✅ Shared via git repositories
- ✅ Published to a marketplace
- ✅ Composed together
- ✅ Maintained by communities
- ✅ Discovered and rated

---

## 1. Core Concept: Skills as First-Class Artifacts

### What is a Skill?

A skill defines how an expert agent thinks and contributes within a domain. It's essentially a structured, shareable expert persona.

```
Before Skills:
Constitution YAML
├─ Panels
├─ Agents
└─ Pre-prompts (embedded, not reusable)

After Skills:
Constitution YAML
├─ Panels
└─ Agents → Reference Skills
                └─ Security Skills
                    ├─ threat-modeling-expert.yml
                    ├─ compliance-specialist.yml
                    └─ incident-response.yml
```

### Why Skills?

| Problem | Solution |
|---------|----------|
| Pre-prompts buried in YAML | Skills are independent files |
| Can't version separately | Skills use semantic versioning |
| No sharing across projects | Skills in git/marketplace |
| Hard to discover best practices | Marketplace with ratings/reviews |
| Duplicated expertise | Reference, don't copy |
| No community contribution | Public marketplace for skills |

---

## 2. Skill Format (Structure)

### V1 Skill Format (Simple, Self-Contained)

```yaml
# .roundtable/skills/security/threat-modeling-expert.yml

skill:
  # Identity
  name: "Threat Modeling Expert"
  id: "security/threat-modeling-expert"
  version: "1.0.0"
  domain: "security"

  # Description
  description: |
    Expert in threat modeling, attack surface analysis,
    and vulnerability assessment for security-critical systems.

    Contributes systematic analysis of threats and security risks,
    focusing on identifying attack vectors before implementation.

  # What this expert is good at
  expertise_areas:
    - threat-modeling
    - vulnerability-assessment
    - attack-surface-analysis
    - security-architecture
    - threat-prioritization

  # The core: System prompt (what agent sees)
  system_prompt: |
    You are a threat modeling expert with deep knowledge of:
    - Attack surface analysis and vulnerability assessment
    - Threat modeling frameworks (STRIDE, PASTA, etc.)
    - Common attack vectors and their mitigations
    - Secure system design principles
    - Defense-in-depth strategies

    When contributing to this deliberation:
    1. Think systematically about threats and attack surface
    2. Identify vulnerabilities early, before they become costly
    3. Propose mitigations aligned with security best practices
    4. Consider threat severity and real-world exploitability

    Contribute your full expertise across the security domain.
    Don't limit yourself to threat modeling only - bring your perspective
    on how architecture, performance, compliance, and UX affect security.

  # How this expert escalates cross-domain concerns
  cross_domain_awareness: |
    Flag for escalation if:
    - Architecture choices create security risks (escalate to: architecture)
    - Performance optimizations have security cost (escalate to: architecture)
    - Compliance requirements affect threat model (escalate to: compliance)
    - UX decisions introduce security vulnerabilities (escalate to: ux)

  # Metadata for discovery and management
  metadata:
    author: "security-team"
    maintained_by: "security-team@example.com"
    created_date: "2024-10-21"
    last_updated: "2024-10-21"

    tags:
      - security
      - threat-modeling
      - architecture
      - enterprise
      - banking
      - compliance

    # When to use this skill
    use_cases:
      - "Security-critical systems"
      - "Compliance-regulated industries"
      - "Financial systems"
      - "Healthcare systems"
      - "Enterprise infrastructure"

    # Works well with these other skills
    synergies:
      - "security/compliance-specialist"
      - "security/incident-response"
      - "architecture/systems-architect"
      - "data/data-security-engineer"

    # Model compatibility
    recommended_models:
      - "claude-opus"
      - "gpt-4"

    # Cost estimate
    estimated_tokens_per_response: "2000-3000"

  # Changelog for version tracking
  changelog:
    - version: "1.0.0"
      date: "2024-10-21"
      status: "stable"
      changes: |
        - Initial release
        - STRIDE and PASTA frameworks documented
        - Security architecture patterns included
```

### V2: Extended Format (Marketplace-Ready)

```yaml
# Extended fields added in V2
skill:
  # ... V1 fields ...

  # Marketplace metadata
  marketplace:
    published: true
    license: "CC-BY-4.0"
    pricing: "free"

    # Community feedback
    rating: 4.8
    reviews: 247
    downloads: 15430

    # Official certification (if applicable)
    verified: true
    verified_by: "anthropic"

    # Source
    repository: "https://github.com/anthropic/roundtable-skills"
    documentation_url: "https://skills.roundtable.sh/security/threat-modeling-expert"

    # Community
    maintainer_contact: "security-team@example.com"
    community_forum: "https://discuss.roundtable.sh"

    # Related skills (marketplace recommendations)
    also_liked:
      - "security/compliance-specialist@1.1"
      - "architecture/security-architect@1.0"
      - "data/database-security@1.0"
```

---

## 3. Skill Types

Skills can be created at different scopes:

### 3.1 Official Skills (Anthropic-Maintained)

**Location:** Marketplace or public git repository

**Example:** `security/threat-modeling-expert@1.0`

```yaml
# High-quality, well-maintained skills
# Used as reference implementations
# Comprehensive documentation
# Community feedback incorporated
```

**Repository:** https://github.com/anthropic/roundtable-skills

### 3.2 Community Skills

**Location:** Published to marketplace

**Example:** `community/startup-founder-pm@1.0`

```yaml
# Created by community members
# Published and rated
# Versioned on marketplace
# Community maintains/updates
```

**Process:**
1. Author creates skill locally
2. Tests with own projects
3. Publishes to marketplace
4. Community rates/reviews
5. Becomes discoverable

### 3.3 Organization/Internal Skills

**Location:** Private git repository or internal registry

**Example:** `company-internal/trading-risk-expert@2.1`

```yaml
# Created by organization
# Maintained by internal team
# Never published externally
# Specific to organization's needs
# Can encode proprietary knowledge
```

**Example Internal Registry:**
```
company/
├── .roundtable/
│   ├── skills/
│   │   ├── trading-risk-expert.yml
│   │   ├── compliance-officer.yml
│   │   └── internal-architect.yml
│   └── constitutions/
│       └── trading-platform.yml
```

### 3.4 Personal Skills

**Location:** Local project

**Example:** `./skills/security/my-threat-model-approach.yml`

```yaml
# Created for specific project
# Not shared
# Personal expertise capture
# Can be moved to organization later
```

---

## 4. Using Skills in Constitutions

### Simple Reference (V1)

```yaml
# constitutions/financial-services.yml

constitution:
  name: "Financial Services Platform"
  version: "1.0"

  panels:
    security:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/security/threat-modeling-expert.yml"

        - model: gpt-4
          skill: ".roundtable/skills/security/compliance-specialist.yml"

    architecture:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/architecture/systems-architect.yml"

    data:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/data/data-engineer.yml"

    product:
      agents:
        - model: gpt-4
          skill: ".roundtable/skills/product/product-manager.yml"
```

### Git Reference (V1+)

```yaml
# Reference skills from git repository
constitution:
  skill_sources:
    official: "https://github.com/anthropic/roundtable-skills"

  panels:
    security:
      agents:
        - model: claude-opus
          skill: "github:anthropic/roundtable-skills/security/threat-modeling-expert@1.0"

        - model: gpt-4
          skill: "github:anthropic/roundtable-skills/security/compliance-specialist@1.1"
```

### Marketplace Reference (V2+)

```yaml
# Reference skills from marketplace
constitution:
  skill_registry: "default"  # Uses configured registries

  panels:
    security:
      agents:
        - model: claude-opus
          skill: "security/threat-modeling-expert@1.0"

        - model: gpt-4
          skill: "security/compliance-specialist@latest"
```

---

## 5. CLI Commands for Skills (V1+)

### Creating Skills

```bash
# Initialize new skill
roundtable skill create security/my-expert

# This creates:
.roundtable/skills/security/my-expert.yml
```

### Using Skills

```bash
# Show skill
roundtable skill show security/threat-modeling-expert

# List all available skills
roundtable skill list

# List by domain
roundtable skill list --domain security
```

### Testing Skills

```bash
# Test skill in isolation (V2+)
roundtable skill test security/threat-modeling-expert \
  --question "What are threats for a banking system?"

# Compare skills (V2+)
roundtable skill compare \
  security/threat-modeling-expert@1.0 \
  security/threat-modeling-expert@2.0
```

### Sharing Skills

```bash
# V2+ Marketplace commands
roundtable skill publish security/my-expert@1.0

roundtable skill install security/threat-modeling-expert@1.0

roundtable skill list --marketplace community
```

---

## 6. Skill Composition (Future V2)

Skills can be composed to create higher-level skills:

```yaml
# skills/security/enterprise-security-expert.yml

skill:
  name: "Enterprise Security Expert"
  version: "1.0"
  domain: "security"

  # Composed from multiple skills
  composed_from:
    - "security/threat-modeling-expert@1.0"
    - "security/compliance-specialist@1.1"
    - "security/incident-response@1.0"

  composition_strategy: "synthesize"

  composition_prompt: |
    You represent an enterprise security team perspective that combines:

    1. Threat Modeling (from threat-modeling-expert skill)
       - Systematic threat analysis
       - Attack surface identification

    2. Compliance (from compliance-specialist skill)
       - Regulatory requirements
       - Audit considerations

    3. Incident Response (from incident-response skill)
       - Attack recovery procedures
       - Business continuity

    Synthesize these perspectives into unified recommendations that
    consider threats, compliance, and operational resilience.

  metadata:
    use_cases:
      - "Enterprise security needs"
      - "Regulated industries"
      - "Critical infrastructure"
```

---

## 7. Skill Versioning and Evolution

Skills use semantic versioning:

```
security/threat-modeling-expert
├── v0.9.0 (beta, not recommended)
├── v1.0.0 (stable, baseline)
├── v1.1.0 (stable, minor improvements)
├── v1.2.0 (stable, security patch)
├── v2.0.0 (new major version, breaking changes)
└── v2.1.0 (latest stable)
```

### Version Specification in Constitution

```yaml
# Exact version (reproducible)
skill: "security/threat-modeling-expert@1.0.0"

# Minor version (backwards compatible updates)
skill: "security/threat-modeling-expert@^1.0"

# Caret range (minor/patch updates)
skill: "security/threat-modeling-expert@~1.0"

# Latest (always up-to-date, risky)
skill: "security/threat-modeling-expert@latest"
```

### Deprecation

```yaml
# Old version marked as deprecated
skill:
  version: "1.0.0"
  status: "deprecated"
  deprecation:
    message: "Use version 2.0+ for latest threat models"
    suggested_replacement: "security/threat-modeling-expert@2.0"
    sunset_date: "2025-01-01"
```

---

## 8. Official Skill Library (Bootstrap)

For V1, Anthropic provides reference skills:

```
.roundtable/skills/
├── security/
│   ├── threat-modeling-expert.yml
│   ├── compliance-specialist.yml
│   ├── incident-response.yml
│   └── security-architect.yml
├── architecture/
│   ├── systems-architect.yml
│   ├── performance-expert.yml
│   ├── scalability-architect.yml
│   └── database-architect.yml
├── ux/
│   ├── ux-designer.yml
│   ├── accessibility-specialist.yml
│   └── mobile-ux-expert.yml
├── data/
│   ├── data-engineer.yml
│   ├── database-expert.yml
│   └── data-security-engineer.yml
├── product/
│   ├── product-manager.yml
│   ├── startup-founder-pm.yml
│   └── enterprise-product-manager.yml
└── README.md
```

Each skill:
- ✅ Well-documented
- ✅ Tested with real projects
- ✅ Community-reviewed
- ✅ Versioned
- ✅ Example for creating custom skills

---

## 9. Creating Custom Skills

### Step 1: Create Skill File

```yaml
# .roundtable/skills/custom/my-compliance-expert.yml

skill:
  name: "My Compliance Expert"
  id: "custom/my-compliance-expert"
  version: "0.1.0"
  domain: "compliance"

  description: "Custom compliance expert for our organization"

  expertise_areas:
    - regulatory-compliance
    - internal-policies
    - audit-requirements

  system_prompt: |
    You are a compliance expert familiar with:
    - Our industry regulations
    - Our internal policies
    - Audit requirements specific to our organization

    [Your expertise definition here]

  cross_domain_awareness: |
    [Your escalation rules here]

  metadata:
    author: "compliance-team"
    internal_only: true
```

### Step 2: Reference in Constitution

```yaml
# constitutions/internal-project.yml

constitution:
  name: "Internal Project"

  panels:
    compliance:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/custom/my-compliance-expert.yml"
```

### Step 3: Use in Project

```bash
roundtable init internal-project --constitution internal-project.yml
```

---

## 10. Skill Discovery and Marketplace (V2+)

### Browse Marketplace

```bash
roundtable marketplace browse security
```

### Install Skills

```bash
# From official registry
roundtable skill install security/threat-modeling-expert@latest

# From specific source
roundtable skill install github:company/skills/custom-expert@1.0
```

### Rating and Reviews

Skills show:
- ⭐ Rating (1-5 stars)
- 💬 Reviews and use cases
- 📥 Download count
- 👥 Author information
- 🏷️ Tags and categories

---

## 11. Skill Testing and Validation (V2+)

### Test Skill Behavior

```bash
# Run skill against test scenarios
roundtable skill test security/threat-modeling-expert \
  --scenarios test-scenarios.yml \
  --output test-results.json
```

### Compare Skill Versions

```bash
# See how skill improved over versions
roundtable skill compare \
  security/threat-modeling-expert@1.0 \
  security/threat-modeling-expert@2.0 \
  --scenario "design-auth-system"
```

### Validate Skill Quality

```bash
# Automated checks
roundtable skill validate security/threat-modeling-expert
# Checks:
# - YAML syntax valid
# - system_prompt not empty
# - metadata complete
# - cross_domain_awareness defined
# - version follows semver
```

---

## 12. Skill Examples

### Example: Compliance Specialist

```yaml
skill:
  name: "Compliance Specialist"
  version: "1.0.0"
  domain: "security"

  description: |
    Expert in compliance frameworks, regulatory requirements,
    and audit procedures for regulated industries.

  expertise_areas:
    - regulatory-compliance
    - audit-trails
    - data-protection
    - compliance-documentation

  system_prompt: |
    You are a compliance specialist with expertise in:
    - SOC2, HIPAA, GDPR, CCPA, PCI-DSS
    - Audit procedures and documentation
    - Data protection and privacy regulations
    - Compliance reporting requirements

    When contributing:
    1. Identify compliance requirements early
    2. Highlight regulatory implications of decisions
    3. Propose audit-friendly approaches
    4. Document compliance reasoning for regulators
```

### Example: Performance Expert

```yaml
skill:
  name: "Performance Expert"
  version: "1.0.0"
  domain: "architecture"

  description: |
    Expert in system performance optimization, scalability,
    and resource efficiency.

  expertise_areas:
    - performance-optimization
    - scalability
    - resource-efficiency
    - bottleneck-identification

  system_prompt: |
    You are a performance expert focused on:
    - Identifying performance bottlenecks
    - Optimizing resource utilization
    - Scaling to production loads
    - Cost-effective infrastructure

    When contributing:
    1. Analyze performance implications of architecture
    2. Propose optimizations for identified bottlenecks
    3. Consider scaling to expected user loads
    4. Balance performance with complexity/cost
```

---

## 13. V1 vs V2+ Roadmap

### V1: Skills Foundation
- ✅ Skill YAML format defined
- ✅ Local skill files
- ✅ File-based skill references
- ✅ Official skill library bundled
- ✅ `roundtable skill` CLI commands
- ✅ Skill documentation

### V2: Git + Basic Marketplace
- [ ] Git repository references
- [ ] Skill dependency resolution
- [ ] Basic marketplace browsing
- [ ] Skill installation from marketplace
- [ ] Skill versioning enforcement

### V2+: Advanced Marketplace
- [ ] Community skill publishing
- [ ] Ratings and reviews
- [ ] Skill composition
- [ ] Skill testing framework
- [ ] Skill validation and certification
- [ ] Commercial skill offerings

---

## 14. File Structure Reference

### Project with Skills

```
my-project/
├── .roundtable/
│   ├── skills/
│   │   ├── security/
│   │   │   ├── threat-modeling-expert.yml
│   │   │   └── compliance-specialist.yml
│   │   ├── architecture/
│   │   │   └── systems-architect.yml
│   │   └── README.md
│   ├── constitutions/
│   │   ├── financial-services.yml
│   │   └── README.md
│   └── config.yml
├── spec.md
└── notes/
    └── [organized notes from deliberation]
```

### Skills Repository

```
roundtable-skills/
├── security/
│   ├── threat-modeling-expert.yml
│   ├── compliance-specialist.yml
│   ├── incident-response.yml
│   └── README.md
├── architecture/
│   ├── systems-architect.yml
│   ├── performance-expert.yml
│   └── README.md
├── ux/
│   └── README.md
├── data/
│   └── README.md
├── product/
│   └── README.md
└── README.md
```

---

## 15. Open Questions

1. **Skill inheritance:** Should skills be able to extend other skills?
2. **Skill testing:** What standardized test scenarios should skills support?
3. **Marketplace governance:** Who reviews/certifies skills for marketplace?
4. **Version pinning:** Should projects lock to exact skill versions?
5. **Skill metrics:** How do we measure skill quality/effectiveness?
6. **Cross-model skills:** Can skills work differently for different models?
7. **Skill updates:** What's the deprecation policy for major versions?
