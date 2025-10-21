# Expert Panels: Multi-Agent Deliberation System

Expert panels are the core unit of expertise in Roundtable. Rather than generic AI models, panels are **domain-specific teams** where multiple agents collaborate, debate within their domain, and contribute specialized perspectives.

---

## 1. Panel Architecture

### 1.1 Panel Structure

Each panel contains:
- **Panel Name** (e.g., "Architecture", "UX", "Security")
- **Multiple Agents** (same domain, potentially different models)
- **Isolated Context Memory** (each panel maintains its own conversation history)
- **Domain-Specific Role Prompts** (with explicit boundaries and cross-domain triggers)
- **Panel Consensus Algorithm** (how agents in panel reach agreement)

```
┌─────────────────────────────────────┐
│    SECURITY PANEL                   │
├─────────────────────────────────────┤
│ Agent 1: Claude (Threat Modeling)   │
│ Agent 2: GPT-4 (Compliance)         │
│                                      │
│ Context Memory:                      │
│ ├─ All prior Security responses     │
│ ├─ Threats identified               │
│ ├─ Decisions made                   │
│ └─ Open concerns                    │
│                                      │
│ Panel Consensus:                     │
│ ├─ Rule: Both agents must agree     │
│ ├─ If disagreed: Flag for escalation│
│ └─ Confidence: HIGH/MEDIUM/LOW      │
└─────────────────────────────────────┘
```

### 1.2 When Panels Respond

**All Panels Respond To:**
- Direct questions about their domain
- Initial project prompt (broad exploration)

**Panels Conditionally Respond To:**
- Cross-domain impacts (other panels mention issues in their domain)
- Explicit escalations (moderator asks for opinion)
- Unresolved debates (help break ties)

**Panels Don't Respond To:**
- Questions outside their domain (unless impacted)
- Questions other panels already answered thoroughly

---

## 2. Skills: First-Class Expert Definitions

Skills are **independent, versioned, shareable expert definitions** that define how agents contribute to panels.

**See SKILLS.md for complete skill documentation.**

### 2.1 V1 Philosophy: Natural Training Differences

In V1, panels do **not** assign roles to specific models. Instead:
- Agents join a panel based on **domain** (e.g., Security Panel)
- Each agent uses a **skill** (e.g., threat-modeling-expert.yml)
- Skills define domain context, not model-specific roles
- Each agent contributes from their **natural training perspective**
- We discover through deliberation what each model is naturally good at
- No artificial bias toward specific sub-specialties

This approach:
✓ Lets authentic training differences emerge
✓ Produces genuine debate (not role-play)
✓ Creates data for V2 team formation
✓ Skills are reusable across projects (not embedded in Constitution)
✓ Skills are versionable independently
✓ Skills can be shared via git/marketplace

### 2.2 Skills Define Pre-Prompts

Pre-prompts are no longer embedded in Constitution YAML. Instead, they come from **skills** (independent YAML files).

**Example: Threat Modeling Expert Skill**

```yaml
# .roundtable/skills/security/threat-modeling-expert.yml

skill:
  name: "Threat Modeling Expert"
  version: "1.0.0"
  domain: "security"

  description: |
    Expert in threat modeling, attack surface analysis,
    and vulnerability assessment.

  system_prompt: |
    You are a threat modeling expert with deep knowledge of:
    - Attack surface analysis and vulnerability assessment
    - Threat modeling frameworks (STRIDE, PASTA, etc.)
    - Common attack vectors and their mitigations
    - Secure system design principles

    When contributing to this deliberation:
    1. Think systematically about threats and attack surface
    2. Identify vulnerabilities early
    3. Propose mitigations aligned with security best practices
    4. Contribute your full expertise across the security domain

    Don't limit yourself to threat modeling only - bring your perspective
    on how architecture, performance, compliance, and UX affect security.

  cross_domain_awareness: |
    Flag for escalation if:
    - Architecture choices create security risks (escalate to: architecture)
    - Performance optimizations have security cost (escalate to: architecture)
    - UX decisions introduce vulnerabilities (escalate to: ux)
```

**Benefits:**
- ✅ Pre-prompts are not duplicated across projects
- ✅ Skills are versioned independently (security/threat-modeling-expert@1.0.0)
- ✅ Skills are shareable via git/marketplace
- ✅ Different agents can use same skill
- ✅ Skills can be updated, old versions still available

### 2.3 What This Means in Practice

**Old (Pre-Assigned Roles):**
```
Claude → "Security Architect"
  Role: Threat modeling and architecture
  Pre-prompt: "You specialize in threat modeling..."
  Contribution: Limited to threat modeling focus

GPT-4 → "Compliance Specialist"
  Role: Compliance and audit
  Pre-prompt: "You specialize in compliance..."
  Contribution: Limited to compliance focus
```

**New (Natural Training Differences):**
```
Claude → Security Panel
  Training: Foundation models → broad reasoning
  Natural contributions: Emerges through debate
  Might contribute: System-level threat analysis, architecture review, ...

GPT-4 → Security Panel
  Training: Different data/optimization → different perspective
  Natural contributions: Emerges through debate
  Might contribute: Practical attack scenarios, compliance patterns, ...

Panel Debate:
  Both agents bring full expertise
  Their natural differences create authentic debate
  We learn which model thinks about what naturally
```

### 2.4 Example: Security Panel Debate (Natural Differences)

No pre-assigned roles. Just two security experts with different training backgrounds:

```
Question: "How should we handle authentication?"

Claude responds:
  "I'd analyze this systematically:
   1. Threat model: What attacks are we protecting against?
   2. Architecture: How do we design for defense in depth?
   3. Implementation: What cryptographic foundations matter?

   My recommendation: OAuth2 + refresh token rotation + MFA for critical ops"

GPT-4 responds:
  "Good points. From what I see in practice:
   - OAuth2 is standard, but implementation varies widely
   - I'd add: What's our compliance requirement? GDPR? HIPAA?
   - Real-world issue: Token expiration causes user friction

   My recommendation: OAuth2 + user-friendly session management + audit logging"

Within-Panel Debate:
  Claude: "Your concern about token expiration is practical. But my concern
          is about threat surface. Can we have both short tokens AND good UX?"

  GPT-4: "Actually, that's what session tokens do - opacity + short lifetime.
         We could do short-lived tokens + server-side session refresh."

  Claude: "That works architecturally. Adds server state, but manageable."

Panel Consensus:
  Both agents converged through genuine debate
  Neither was "assigned" to debate expiration vs architecture
  Their natural training differences created the debate
```

Notice: Claude naturally thought about threat models and architecture. GPT-4 naturally thought about practical implementation and compliance. No role assignment needed - it emerged.


### 2.3 Simplified Pre-Prompts for All Domains

All domains follow the same simple pattern - domain focus, not role assignment:

**Architecture Panel:**
```yaml
domain: "architecture"
domain_definition: |
  You are an architecture expert contributing to this deliberation.

  Architecture spans:
  - System design and scalability
  - Technology selection and trade-offs
  - Performance and reliability
  - Integration patterns and APIs
  - Deployment and operations

  Contribute your natural perspective. Don't limit yourself to what you
  think is "your role" - we want your full expertise.
```

**UX Panel:**
```yaml
domain: "ux"
domain_definition: |
  You are a UX expert contributing to this deliberation.

  UX spans:
  - User workflows and information architecture
  - Accessibility (WCAG standards)
  - Interaction patterns and usability
  - Mobile and cross-platform considerations
  - User research and testing

  Contribute your natural perspective. We want your full expertise,
  not just what you think fits your "role".
```

**Data Panel:**
```yaml
domain: "data"
domain_definition: |
  You are a data engineering expert contributing to this deliberation.

  Data engineering spans:
  - Database design and optimization
  - Query performance and indexing
  - Data consistency and reliability
  - Scaling and replication
  - Data access patterns and APIs

  Contribute your natural perspective. We value your full expertise
  on how data flows through the system.
```

**Product Panel:**
```yaml
domain: "product"
domain_definition: |
  You are a product expert contributing to this deliberation.

  Product spans:
  - Feature prioritization and scope
  - Timeline and resource planning
  - User needs and market fit
  - Business constraints and trade-offs
  - Success metrics and validation

  Contribute your natural perspective. We want your full expertise
  on what matters for the business.
```

All panels use the same **awareness_of_other_domains**, **escalation_triggers**, and **contribution_approach** templates (see 2.2 above).

---

## 3. Panel Consensus Algorithms

### 3.1 Default: All-Agree-or-Flag

```
Panel Consensus Rule:
├─ If all agents agree → CONSENSUS (HIGH confidence)
├─ If N-1 agents agree → CONSENSUS (MEDIUM confidence)
│  └─ Minority position captured in notes
├─ If split 50/50 → UNRESOLVED (LOW confidence)
│  └─ Flag for human or moderator decision
└─ Confidence scale:
   HIGH    = All agents converge
   MEDIUM  = Majority (with minority captured)
   LOW     = Significant disagreement
   UNRESOLVED = Cannot reach consensus
```

### 3.2 Panel Debate Example

```
User Prompt: "Design the data persistence layer"

[DATA PANEL EXECUTION]

Claude (Data Engineer):
  "I recommend normalized schema with strategic denormalization
   for reads. Use PostgreSQL with proper indexing."
  [1,245 tokens]

GPT-4 (Data Engineer):
  "Agree on PostgreSQL. But I'd denormalize more aggressively
   for the analytics queries. Cache layer is essential."
  [1,089 tokens]

[PANEL CONSENSUS ALGORITHM]

Area of Agreement:
✓ PostgreSQL as primary datastore
✓ Denormalization for performance
✓ Cache layer needed

Area of Divergence:
✗ Claude: Strategic denormalization (minimal)
✗ GPT-4: Aggressive denormalization (maximal)

[PANEL DEBATE ROUND 1]

Claude responds to GPT-4:
  "Aggressive denormalization creates maintenance burden.
   We have time for complex queries, we don't have time to
   maintain 5 copies of data when schema evolves."
  [+412 tokens]

GPT-4 responds to Claude:
  "Fair point. Compromise: Denormalize high-read tables only
   (100 most common queries). Cache everything else."
  [+367 tokens]

Claude:
  "That works. I can support that."
  [+145 tokens]

[PANEL CONSENSUS REACHED]

Decision: "PostgreSQL with selective denormalization (cached views)
          for high-traffic queries. Normalized schema as source of truth."

Confidence: HIGH (both agents agree on compromise)
Tokens used: 3,258 total
Notes saved to: experts/data/schema_design.md
```

---

## 4. Cross-Domain Concern Detection

### 4.1 How Escalations Work

When a panel raises a concern affecting another domain:

```
[SECURITY PANEL RESPONSE]
"⚠️ CONCERN: UX suggested storing auth tokens in localStorage
   This creates XSS vulnerability and violates GDPR data storage rules"

[SYSTEM ROUTES TO UX PANEL]
Context added: "Security raised concern about localStorage approach"

[UX PANEL RESPONSE]
"Understood. We chose localStorage for mobile performance
 (no SessionStorage on some mobile browsers).

 Options we considered:
 1. localStorage (XSS vulnerable)
 2. Memory (lost on refresh)
 3. HTTP-only cookies (server-side management, works everywhere)

 Security's concern is valid. Let's use HTTP-only cookies instead."

[CONSENSUS CHECK]
Security: "Agree - HTTP-only cookies is the right approach"
UX: "This works for all platforms"

[DECISION RECORDED]
"Authentication: HTTP-only secure cookies
  Rationale: Security best practice + cross-platform compatibility
  Panels aligned: Security ✓, UX ✓"
```

### 4.2 Escalation Rules by Domain

**Security Panel Escalations:**
- UX storing sensitive data → Escalate to UX
- Data logging plaintext → Escalate to Data
- Architecture exposing internal service → Escalate to Architecture
- Product ignoring compliance → Escalate to Product

**Data Panel Escalations:**
- Query performance threatens SLA → Escalate to Architecture
- Data volume exceeds infrastructure → Escalate to Product
- Schema change breaks UX → Escalate to UX

**Architecture Panel Escalations:**
- Complexity timeline mismatch → Escalate to Product
- Performance requirement vs UX lag → Escalate to UX
- Integration with unvetted service → Escalate to Security

**UX Panel Escalations:**
- Feature adds security risk → Escalate to Security
- Feature requires complex queries → Escalate to Data
- Feature architecturally unfeasible → Escalate to Architecture

**Product Panel Escalations:**
- Timeline too aggressive → Escalate to all technical panels
- Scope contradicts technical constraints → Escalate to appropriate panel

---

## 5. Panel Output and Notes Organization

### 5.1 Per-Panel Notes Structure

```
meeting_2024-10-21_auth_system/
├── experts/
│   ├── security/
│   │   ├── agents.md
│   │   │   ├─ Claude Threat Modeling (role)
│   │   │   └─ GPT-4 Compliance (role)
│   │   │
│   │   ├── round_1_responses.md
│   │   │   ├─ Claude: "Threats I see..."
│   │   │   └─ GPT-4: "Compliance issues..."
│   │   │
│   │   ├── consensus_analysis.md
│   │   │   ├─ Agreement areas
│   │   │   ├─ Disagreement areas
│   │   │   └─ Confidence level
│   │   │
│   │   ├── concerns_raised.md
│   │   │   ├─ "localStorage XSS vulnerability"
│   │   │   ├─ "Escalated to: UX Panel"
│   │   │   └─ "Resolution: HTTP-only cookies"
│   │   │
│   │   └── notes.md
│   │       ├─ Threats identified
│   │       ├─ Compliance requirements
│   │       └─ Open questions
│   │
│   ├── ux/
│   │   ├── agents.md
│   │   ├── round_1_responses.md
│   │   ├── consensus_analysis.md
│   │   ├── concerns_received.md
│   │   │   └─ "Security concern: localStorage XSS"
│   │   │      └─ "Response: Using HTTP-only cookies instead"
│   │   └── notes.md
│   │
│   └── [other panels...]
│
└── CROSS_DOMAIN_CONCERNS.md
    ├─ UX localStorage → Security XSS vulnerability
    │  ├─ Status: RESOLVED
    │  ├─ Resolution: HTTP-only cookies
    │  └─ Panels involved: Security, UX
    └─ ...
```

### 5.2 Token Count Per Panel

```
Round 1 Responses:

🏗️  ARCHITECTURE PANEL    [2,847 tokens]
   Claude (1,456) + GPT-4 (1,391) = Consensus
   → Click to expand

👥 UX PANEL              [1,234 tokens]
   Claude (634) + Claude-S (600) = Consensus
   → Click to expand

🔒 SECURITY PANEL        [3,456 tokens]
   Claude (1,789) + GPT-4 (1,667) = Consensus + concern raised
   → Click to expand [⚠️ CONCERN RAISED]

📊 DATA PANEL            [2,106 tokens]
   Claude (1,053) + Claude-S (1,053) = Consensus
   → Click to expand

🎯 PRODUCT PANEL         [892 tokens]
   GPT-4 (892) = Single agent
   → Click to expand

                Total: 10,535 tokens (~$0.38)
```

When user clicks Security panel:

```
🔒 SECURITY PANEL RESPONSES

Round 1:

Claude (Threat Modeling)     [1,789 tokens]
  "Threats I see in auth system:
   1. Session fixation attacks
   2. Token expiration not enforced
   3. No audit logging of auth events

   Recommendations:
   - Implement OWASP auth guidelines
   - Add session validation on every request
   - Log all auth events

   ⚠️ CONCERN: localStorage usage detected
      XSS could expose auth tokens"

GPT-4 (Compliance)           [1,667 tokens]
  "Compliance review:
   - GDPR requires explicit data storage consent
   - CCPA requires data deletion capability
   - SOC2 requires auth event logging

   Compliant approach:
   - Use secure, httpOnly cookies
   - Implement data retention policy (90 days)
   - Full audit trail of auth changes

   ⚠️ CONCERN: localStorage violates data storage rules"

Round 1 Consensus:
✓ CONSENSUS REACHED (HIGH confidence)
  Both agents agree on threats and compliance requirements
  Both raised same concern: localStorage approach

Cross-Domain Escalation:
⚠️ "UX Panel: Please review localStorage concern and propose alternative"

[Collapse ▲]
```

---

## 6. Multi-Model Expert Teams

### 6.1 Why Multiple Agents Per Panel?

| Benefits | Example |
|----------|---------|
| **Diverse perspectives within domain** | Threat modeling (Claude) + Compliance (GPT-4) |
| **Redundancy and verification** | Both data engineers suggest same approach → confidence |
| **Coverage of sub-specialties** | UX for product design + Accessibility for WCAG |
| **Debate within expertise** | "Should we denormalize?" (data engineers debate) |
| **Cost optimization** | Use smaller model for routine questions, larger for complex |

### 6.2 Panel Composition Guidelines

```yaml
# RECOMMENDED PANEL SIZES

architecture:
  min_agents: 2
  max_agents: 3
  suggested:
    - claude-opus (primary architect)
    - gpt-4 (performance/scalability)
    - gemini (constraints/integration)

ux:
  min_agents: 2
  max_agents: 3
  suggested:
    - claude-opus (interaction design)
    - gpt-4 (accessibility)

security:
  min_agents: 2
  max_agents: 2
  suggested:
    - claude-opus (threat modeling)
    - gpt-4 (compliance)

data:
  min_agents: 2
  max_agents: 2
  suggested:
    - claude-opus (primary)
    - claude-sonnet (secondary, cost optimization)

product:
  min_agents: 1
  max_agents: 1
  suggested:
    - gpt-4
  note: "Product has final decision authority, single agent often sufficient"
```

---

## 7. Panel Configuration in Constitution (V1: Skills-Based)

V1 panels reference **skills** to define agent expertise:

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

      consensus_algorithm: "all_agree_or_flag"

    architecture:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/architecture/systems-architect.yml"

        - model: gpt-4
          skill: ".roundtable/skills/architecture/performance-expert.yml"

      consensus_algorithm: "all_agree_or_flag"

    ux:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/ux/ux-designer.yml"

      consensus_algorithm: "single_agent"

    data:
      agents:
        - model: claude-opus
          skill: ".roundtable/skills/data/data-engineer.yml"

      consensus_algorithm: "single_agent"

    product:
      agents:
        - model: gpt-4
          skill: ".roundtable/skills/product/product-manager.yml"

      consensus_algorithm: "single_agent"
```

**V1 Principles:**
- **Skills define expertise**, not embedded pre-prompts
- **Panels reference skills** in Constitution
- **Skills are independent files**, reusable across projects
- **Skills are versioned**, git/marketplace-shareable
- **Agents contribute naturally**, no role forcing

**V2+: Git/Marketplace References:**
```yaml
# Can reference skills from git repositories
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

**V2+: Marketplace References:**
```yaml
# Can reference skills from marketplace
constitution:
  panels:
    security:
      agents:
        - model: claude-opus
          skill: "security/threat-modeling-expert@1.0"

        - model: gpt-4
          skill: "security/compliance-specialist@latest"
```

---

## 8. Implementation Considerations

### 8.1 Context Memory Per Panel

Each panel maintains **independent conversation context**:

```
Panel Context Structure:
├── System messages (role prompt + domain boundaries)
├── Conversation history
│   ├─ Round 1 responses
│   ├─ Round 1 consensus
│   ├─ Cross-domain concern if raised
│   ├─ Panel's response to concern
│   └─ Resolution
├── Decisions made
├── Open concerns
└── Notes generated

Example size: ~10-15KB per round (efficient)
```

This means:
- **No context pollution** between panels
- **Easier to add/remove panels** mid-project
- **Panels can have long conversations** without bloating main context
- **Easy to "ask a panel again"** - just reference their history

### 8.2 Token Budget Per Round

```
Estimated tokens per round:

Conservative:
- 5 panels × 2 agents × 500 tokens = 5,000 tokens
- Cross-domain concerns: +2,000 tokens
- Moderator synthesis: +3,000 tokens (if needed)
- Total: ~10,000 tokens (~$0.07)

Normal:
- 5 panels × 2 agents × 1,000 tokens = 10,000 tokens
- Cross-domain concerns: +4,000 tokens
- Moderator synthesis: +5,000 tokens
- Total: ~19,000 tokens (~$0.14)

Complex:
- 5 panels × 2 agents × 2,000 tokens = 20,000 tokens
- Cross-domain concerns: +6,000 tokens
- Moderator synthesis: +8,000 tokens
- Total: ~34,000 tokens (~$0.24)

Target: Stay under 50K tokens per round for cost control
```

---

## 9. Integration with Modes

### 9.1 Relevant Order Mode + Panels

User sees:
```
[Collapsed panels with token counts]
├─ Architecture [2,847] ▼
├─ UX [1,234] ▼
├─ Security [3,456] ▼ ⚠️ CONCERN
├─ Data [2,106] ▼
└─ Product [892] ▼
```

User clicks one panel → sees all agents' responses + consensus + concerns

### 9.2 Moderator Mode + Panels

Moderator sees all panel consensus and synthesizes:
```
"Architecture and Data panels converge on microservices approach.
UX confirms this allows incremental UI improvements.
Security raises concern about event bus auditing.
Product constraint: 12-week timeline.

Synthesized recommendation: Microservices with event bus (Kafka),
security audit logging built-in. Timeline feasible."
```

### 9.3 Debate Mode + Panels (Future V2)

Auto-trigger within-panel debate when:
- Agents in same panel disagree significantly
- Or user explicitly asks: "Have the team debate this"

---

## 10. V2: Natural Team Formation (Future Phase)

### 10.1 Vision: Learn from V1 Behavior

After running V1 projects, we'll analyze what we learned:

```
V1 Project Analysis:
  Q: "Design authentication system"

  Claude contributions:
  ├─ 40% threat modeling (systematic analysis of attacks)
  ├─ 35% architectural decisions (system-level thinking)
  └─ 25% compliance/operations (documentation, process)

  GPT-4 contributions:
  ├─ 15% threat modeling
  ├─ 25% architectural decisions
  ├─ 45% compliance/operations (practical rules, standards)
  └─ 15% UX implications (user-facing concerns)

Pattern Recognition:
  - Claude naturally excels at: Threat modeling, architecture
  - GPT-4 naturally excels at: Compliance, practical implementation
  - Both contribute across domains (but with different focus)
  - Debate between them is productive (different strengths)
```

### 10.2 V2 Team Formation

Based on V1 learnings, we'd create explicit sub-teams:

```yaml
# V2: After analyzing V1 behavior
security:
  threat_modeling_team:
    name: "Threat Modeling"
    agents:
      - claude-opus  # (naturally focuses on threats)
      - gemini       # (also shows threat focus?)
    focus: "Attack surface, vulnerability analysis, threat modeling"

  compliance_team:
    name: "Compliance & Operations"
    agents:
      - gpt-4           # (naturally focuses on compliance)
      - claude-sonnet   # (checks against policies)
    focus: "Standards, audit trails, regulatory requirements"

# Note: These teams still interact as a single "Security Panel"
# but with acknowledged specializations based on V1 behavior
```

### 10.3 How Teams Differ from V1

**V1 (Current):**
```
Security Panel
├─ Claude (all expertise)
├─ GPT-4 (all expertise)
└─ They debate everything naturally

Result: Authentic, but unclear which model was good at what
```

**V2 (Future):**
```
Security Panel
├─ Threat Modeling Team
│  ├─ Claude + Gemini
│  └─ Specialize in: Attack surface analysis
├─ Compliance Team
│  ├─ GPT-4 + Claude-Sonnet
│  └─ Specialize in: Standards and regulations
└─ Teams coordinate within panel

Result: Deeper expertise per sub-specialty, informed by V1 learnings
```

### 10.4 Benefits of V2 Team Approach

| Aspect | V1 (No Teams) | V2 (Teams) |
|--------|---|---|
| **Learning** | Discover natural strengths through debate | Apply learned patterns |
| **Efficiency** | All agents approach all topics | Agents focus on strength areas |
| **Depth** | General expertise | Deep specialization |
| **Complexity** | Simple (one agent per panel) | Higher (sub-teams) |
| **Debate Quality** | Authentic but unfocused | Focused on known strengths |
| **Team Scaling** | Hard to know when to add agents | Clear when to add new team |

### 10.5 Evolution Path

```
Phase 1 (V1): No Explicit Teams
  └─ Run projects with simple panels
  └─ Observe which agents naturally focus on what
  └─ Collect data on effectiveness

Phase 2 (V2): Team Formation
  └─ Analyze V1 patterns
  └─ Propose team structures based on observed strengths
  └─ Run projects with explicit teams
  └─ Validate improvements vs V1

Phase 3 (V2+): Marketplace Team Templates
  └─ Share successful team structures
  └─ "This team formation works great for healthcare security"
  └─ Organizations clone successful team templates
  └─ Continue learning from new domains
```

### 10.6 Open Questions for V2

1. **Team Formation Criteria:** What metrics determine "Claude should be in threat modeling team"?
2. **Cross-Team Interaction:** When should threat modeling team coordinate with compliance team?
3. **Team Size:** Is 2 agents per team optimal? More? Less?
4. **New Models:** When Claude 4 or GPT-5 arrives, where do they fit?
5. **Overlapping Strengths:** What if Claude and GPT-4 both show threat modeling strength?
6. **Marketplace:** How do teams get shared/certified in marketplace?

---

## 11. Open Questions (V1)

1. **Panel Initialization:** Pre-warm panels with project context, or start fresh?
2. **Context Window:** How to manage panels that grow beyond token limits in long sessions?
3. **Panel Weighting:** Should some panel concerns override others? (Yes, but how to specify?)
4. **Agent Selection:** Should Constitution specify how many agents per panel?
5. **Customization Depth:** How much can users customize individual agent prompts?
6. **Natural Differences:** How do we measure if "natural training differences" are actually helping?
7. **Emergence:** When do we see authentic debate vs. agents talking past each other?
