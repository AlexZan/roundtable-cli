# Consensus Algorithms: Customizable Decision-Making Frameworks

Roundtable's power comes from **configurable consensus algorithms** that define how panel decisions and project decisions are made. Rather than a single "how we decide" approach, users can define custom algorithms based on their project's needs, governance model, and risk tolerance.

---

## 1. What is a Consensus Algorithm?

A consensus algorithm answers: **"How do we turn multiple expert opinions into a project decision?"**

It specifies:
- **Within-panel consensus:** How do multiple agents in the same domain decide?
- **Cross-domain resolution:** How do conflicting domains resolve issues?
- **Project-level consensus:** What's the final decision process?
- **Escalation rules:** When do we involve humans vs. letting algorithms decide?
- **Round continuation logic:** Rounds continue as long as new user input provides new context OR until escalation/consensus rules are triggered (NO hard limit on round count)

**Critical: Rounds are NOT limited to 2.** Panels debate for as many rounds as needed until clarity emerges. The consensus algorithm defines when consensus is reached or when escalation occurs.

**Round continuation:**
- Rounds automatically continue when user responds (new user input = new context = new round)
- User can explicitly force another round with `/continue` command
- Rounds stop when: consensus reached, escalation triggered, user types `/done`, or timeout occurs
- Flow: User input → panels see user response + other agents' responses → new round → repeat

---

## 2. Algorithm Structure (YAML Schema)

```yaml
consensus_algorithm:
  name: "consensus_name"
  version: "1.0"
  description: "What problems does this algorithm solve?"

  # WITHIN-PANEL CONSENSUS
  # How do agents in the same domain decide?
  within_panel:
    rule_name: "rule_description"
    logic: |
      Pseudocode for consensus process
      if condition_1:
        → action_1
      else if condition_2:
        → action_2

  # CROSS-DOMAIN RESOLUTION
  # How do we handle disagreements between panels?
  cross_domain:
    rule_name: "rule_description"
    logic: |
      How to resolve panel-vs-panel conflicts

  # PROJECT-LEVEL CONSENSUS
  # How do we get to final project decisions?
  project_level:
    rule_name: "rule_description"
    logic: |
      How to synthesize panel-level consensus into project decisions

  # ESCALATION
  # When to involve humans?
  escalation:
    - trigger: "condition_that_requires_human"
      action: "what we do"
      timeout: "how_long_to_wait"
```

---

## 3. Pre-Built Consensus Algorithms

### 3.1 Democratic Majority (DEFAULT)

**Use case:** General projects, collaborative environments, quick starts

**Philosophy:** All panels are equal, majority rules, minorities are heard

```yaml
consensus_algorithm:
  name: "democratic_majority"
  version: "1.0"

  within_panel:
    rule: "majority_with_minority_capture"
    logic: |
      if all agents agree:
        → Consensus (confidence: HIGH)
      else if N-1 agents agree (majority):
        → Consensus with minority captured (confidence: MEDIUM)
      else:
        → Unresolved (confidence: LOW)
        → Flag for escalation

  cross_domain:
    rule: "collaborative_resolution"
    logic: |
      if panel_A concern affects panel_B:
        → Panel_B responds with mitigation or objection
        if panel_B mitigates concern:
          → Move forward with mitigation
        else if panel_B objects:
          → Both panels propose compromise
          → If compromise found:
            → Proceed with compromise
          → Else:
            → Flag for moderator/human decision

  project_level:
    rule: "weighted_consensus"
    logic: |
      if all panels converge:
        → Project decision (confidence: HIGH)
      else if most panels converge:
        → Project decision (confidence: MEDIUM)
        → Flag minority positions in spec
      else if major disagreement:
        → Flag for human decision
        → Present all panel positions with reasoning

  escalation:
    - trigger: "unresolved_within_panel"
      action: "moderator_synthesizes_or_human_decides"
      timeout: "1_round"

    - trigger: "cross_domain_unresolved"
      action: "both_panels_present_tradeoffs_to_human"
      timeout: "2_rounds"

    - trigger: "3_unresolved_in_row"
      action: "human_review_required"
```

**Example:**
```
UX Panel: 2 agents - "Progressive disclosure UI"
Data Panel: 2 agents - "Aggressive denormalization"
Architecture Panel: 1 agent - "Microservices or monolith?"

UX: CONSENSUS HIGH (both agents agree on progressive disclosure)
Data: CONSENSUS MEDIUM (1 agent prefers aggressive, 1 strategic)
Architecture: SINGLE AGENT (no consensus, just decision)

Project-level: All panels moving forward. UX data disagreement noted but doesn't block.
Result: "Progressive disclosure UI + strategic data denormalization + microservices decision"
```

---

### 3.2 Security-First Veto

**Use case:** Security-critical projects (healthcare, fintech, defense)

**Philosophy:** Security can veto other panels' decisions; all others collaborative

```yaml
consensus_algorithm:
  name: "security_first_veto"
  version: "1.0"

  within_panel:
    rule: "standard_majority"
    # Same as democratic majority

  cross_domain:
    rule: "security_can_veto"
    logic: |
      if security_panel raises concern:
        → Other panel must respond with mitigation
        if mitigation acceptable_to_security:
          → Proceed
        else:
          → VETO (security concern blocks decision)
          → Only human override can proceed
      else:
        → Proceed with collaborative resolution

  project_level:
    rule: "security_priority_with_escalation"
    logic: |
      if security panel vetoed:
        → Halt decision
        → Flag for human review with full justification
      else if security flagged as concern but not veto:
        → Proceed with security concern documented
      else:
        → Standard majority resolution

  escalation:
    - trigger: "security_veto"
      action: "halt_and_require_human_override"
      timeout: "0_rounds"  # No tolerance - immediate escalation

    - trigger: "other_panel_disagreement"
      action: "resolve_collaboratively_or_moderator"
      timeout: "2_rounds"
```

**Example:**
```
UX wants: "Store auth tokens in localStorage for offline support"
Security says: "XSS vulnerability, violates data protection standards"

Security has VETO.
Result: UX must propose alternative or accept HTTP-only cookies.
If UX insists on localStorage: Human override required.
```

---

### 3.3 Product-Centric Fast

**Use case:** Startups, MVP mode, moving fast with constraints

**Philosophy:** Product sets constraints, others optimize within them; Product breaks ties

```yaml
consensus_algorithm:
  name: "product_centric_fast"
  version: "1.0"

  within_panel:
    rule: "standard_majority"

  cross_domain:
    rule: "constraints_first"
    logic: |
      if product_panel specified constraint:
        → Other panels work within constraint
        if technical_panel cannot meet constraint:
          → Escalate to Product: "Accept technical debt OR reduce scope"
          → Product decides
        else:
          → Proceed with constraint

  project_level:
    rule: "product_decision_with_input"
    logic: |
      if product_panel has consensus:
        → Product decision is project decision
      else if technical_panels disagreed:
        → Product chooses (with tech input)
      else:
        → Product makes decision informed by all panels

  escalation:
    - trigger: "cannot_meet_product_constraint"
      action: "product_chooses_scope_or_timeline"
      timeout: "1_round"

    - trigger: "technical_security_critical"
      action: "escalate_to_human"
      timeout: "immediate"
```

**Example:**
```
Product constraint: "Ship MVP in 6 weeks"
Architecture proposes: "Microservices, 8-week timeline"
Product decision: "Use monolith instead, deploy in 6 weeks"
All other panels: Work within 6-week timeline or escalate scope reduction
```

---

### 3.4 Comprehensive Synthesis (Academic/Research)

**Use case:** Research projects, design documents, where all perspectives matter

**Philosophy:** No vetoes, all perspectives captured with equal weight

```yaml
consensus_algorithm:
  name: "comprehensive_synthesis"
  version: "1.0"

  within_panel:
    rule: "document_all_perspectives"
    logic: |
      Capture every agent's reasoning:
      - Agent A prefers option X because...
      - Agent B prefers option Y because...
      - Both contributions are valid research

  cross_domain:
    rule: "multi_perspective_synthesis"
    logic: |
      Each panel's perspective documented:
      - Architecture: "Recommends microservices"
      - Security: "Prefers monolith (smaller attack surface)"
      - Data: "Dataflows simpler in monolith"
      - UX: "Either works, depends on timeline"
      - Product: "Microservices easier to scale"
      → No resolution, all documented

  project_level:
    rule: "decisions_deferred_or_multi_documented"
    logic: |
      if clear consensus:
        → Document as consensus
      else:
        → Document all perspectives
        → Defer decision to implementation phase
        → Researchers/implementers choose based on new data

  escalation:
    - trigger: "any_time"
      action: "never_escalate"
      note: "All disagreements are valuable research data"
```

**Example:**
```
Spec documents:
- "Architecture panel: Microservices recommended for scalability"
- "Security panel: Monolith preferred for attack surface reduction"
- "Data panel: Monolith preferred for simpler dataflows"
- "Trade-off analysis: See section X"
- "Implementation decision: Will be made by engineering team"
```

---

### 3.5 Majority-Override-Security

**Use case:** High-stakes decisions where security is important but not absolute veto

**Philosophy:** Majority rules, but security concerns are escalated to humans

```yaml
consensus_algorithm:
  name: "majority_override_security"
  version: "1.0"

  within_panel:
    rule: "standard_majority"

  cross_domain:
    rule: "security_escalates_not_vetoes"
    logic: |
      if security_panel raises concern:
        → Flag severity level (HIGH/MEDIUM/LOW)
        if severity HIGH:
          → Escalate to human (but doesn't veto)
        else:
          → Document concern, proceed with mitigation plan

  project_level:
    rule: "majority_with_escalation"
    logic: |
      if majority panels agree AND security ok:
        → Project decision
      else if majority panels agree BUT security concern:
        → Proceed with concern escalated (human makes final call)
      else if major disagreement:
        → Escalate to human

  escalation:
    - trigger: "high_severity_security_concern"
      action: "escalate_to_human_for_risk_acceptance"
      timeout: "1_round"

    - trigger: "medium_severity_security_concern"
      action: "document_and_proceed_with_mitigation"
```

---

## 4. Custom Algorithms

Users can define custom algorithms for their specific needs. Here are patterns for building them:

### 4.1 Example: Healthcare Compliance-First

```yaml
consensus_algorithm:
  name: "healthcare_compliance_first"
  version: "1.0"
  created_for: "HIPAA-regulated medical SaaS"

  panel_priority:
    - security        # Tier 1: Veto power
    - compliance      # Tier 1: Veto power
    - data            # Tier 2: Strong input
    - architecture    # Tier 2: Strong input
    - ux              # Tier 3: Input only
    - product         # Tier 3: Input only

  within_panel:
    rule: "standard_majority"

  cross_domain:
    rule: "tiered_veto"
    logic: |
      if tier_1_panel (security/compliance) raises concern:
        → VETO (blocks decision)
      else if tier_2_panel (data/architecture) raises concern:
        → Escalate to human after 1_round discussion
      else:
        → Proceed with collaborative resolution

  escalation:
    - trigger: "any_tier_1_concern"
      action: "immediate_halt_and_compliance_review"
```

### 4.2 Example: Agile/MVP With Risk Acceptance

```yaml
consensus_algorithm:
  name: "agile_risk_acceptance"
  version: "1.0"
  created_for: "Fast-moving startups with risk tolerance"

  policy:
    - name: "Technical Debt Acceptance"
      description: "We accept technical debt if timeline <= 3 months"
      applies_to: "all_panels"

    - name: "Security Minimum"
      description: "Some security standards are non-negotiable"
      enforced_by: "security_panel"

    - name: "Product Timeline Overrides"
      description: "If timeline is threatened, scope reduces first"
      enforced_by: "product_panel"

  within_panel:
    rule: "fast_consensus"
    logic: |
      if all agents agree: HIGH confidence
      else if 1_agent_disagrees: MEDIUM confidence (proceed)
      else: LOW confidence (note disagreement, proceed)

  cross_domain:
    rule: "timeline_first_security_always"
    logic: |
      if security_concern:
        → Escalate (can't proceed without security ok)
      else if timeline_threatened:
        → Product decides: scope reduction or accept risk
      else:
        → Collaborative resolution

  escalation:
    - trigger: "timeline_product_conflict"
      action: "product_decides_scope"

    - trigger: "security_concern"
      action: "security_decision_required"
```

---

## 5. Policy-Based Consensus

Some decisions need **explicit policies** rather than algorithms. Policies define rules that override normal consensus logic.

### 5.1 Policy Examples

```yaml
policies:
  - id: "security_non_negotiable"
    trigger: "any_panel"
    rule: |
      Password storage MUST use bcrypt or argon2.
      No exceptions, regardless of other panel input.
      Security panel enforcement: MANDATORY

  - id: "tech_debt_limit"
    trigger: "architecture_or_data"
    rule: |
      Technical debt accepted IF:
        - Timeline pressured (<12 weeks)
        - Documented as tech debt
        - Refactor scheduled within 6 months
      Enforcer: Product + Architecture agreement

  - id: "compliance_gates"
    trigger: "security_panel"
    rule: |
      Before proceeding with decision:
        1. Security reviews compliance requirements
        2. Decision documented as compliant or explicitly non-compliant
        3. If non-compliant: Human override required
      Enforcer: Security panel (can't be overridden by other panels)

  - id: "performance_sla"
    trigger: "ux_and_data"
    rule: |
      If UX feature causes page load > 2 seconds:
        - Data panel must propose optimization
        - If optimization infeasible: Feature deferred
        - Otherwise: Feature proceeds with optimization
      Enforcer: Product (final call if both disagree)
```

---

## 6. Switching Algorithms Mid-Project

Users can change consensus algorithms during a project:

```bash
$ roundtable config show-algorithm
Current: democratic_majority

$ roundtable config set-algorithm security_first_veto
Warning: Changing consensus algorithm may affect pending decisions
Confirm? (Y/n): y

✓ Changed to: security_first_veto
✓ Applied to: Round 5 onwards (Round 1-4 unaffected)
✓ Decision history preserved

$ roundtable spec show --highlight-affected-by-algorithm-change
Section: "Authentication Flow"
  Old consensus: "democratic_majority" → HTTP-only cookies (agreed)
  New consensus: "security_first_veto" → Same decision (Security approved)

Section: "Caching Strategy"
  Old consensus: "democratic_majority" → Aggressive caching (majority won)
  New consensus: "security_first_veto" → Needs Security review before proceeding
```

---

## 7. Consensus Algorithm Marketplace

Just like Constitutions, consensus algorithms can be shared:

```
Marketplace Examples:

📦 "Democratic Majority"
   ├─ General purpose, good for balanced teams
   ├─ Downloads: 4,231
   └─ Rating: 4.8/5

📦 "Security-First Veto"
   ├─ Regulated industries (healthcare, finance)
   ├─ Downloads: 892
   └─ Rating: 4.9/5

📦 "Product-Centric Fast"
   ├─ Startups and MVP projects
   ├─ Downloads: 1,456
   └─ Rating: 4.6/5

📦 "Consensus-First (All Must Agree)"
   ├─ Teams focused on unanimous decisions
   ├─ Downloads: 234
   └─ Rating: 4.7/5

📦 "Expert Weighting"
   ├─ Different panels have different vote weight
   ├─ Created by: @enterprise_architect
   ├─ Downloads: 156
   └─ Rating: 4.4/5
```

---

## 8. Algorithm Specification Language

### 8.1 Formal Syntax (Extended YAML)

```yaml
# Condition syntax
if_all_panels_agree: "consensus reached"
if_any_panel_disagrees: "flag for discussion"
if_majority_panels_agree: "proceed with minority noted"
if_security_objects: "requires human override"

# Action syntax
action_consensus: "use as project decision"
action_escalate: "send to human for decision"
action_document: "record in spec with rationale"
action_halt: "stop and wait for resolution"

# Weighting syntax
weight_panel:
  security: 2.0  # 2x weight
  architecture: 1.5
  data: 1.5
  ux: 1.0
  product: 1.0
```

---

## 9. Visualizing Algorithm Logic

Users can visualize their algorithm's decision tree:

```
$ roundtable algorithm show democratic_majority --visualize

┌─────────────────────────┐
│  User asks question     │
└────────────┬────────────┘
             │
      ┌──────▼──────┐
      │ All panels  │
      │   respond   │
      └──────┬──────┘
             │
        ┌────┴────┐
        │          │
   ┌────▼────┐  ┌─▼──────────┐
   │ Within  │  │ Cross-domain│
   │ panel   │  │ checks      │
   │ cons.   │  └─┬──────────┬┘
   └────┬────┘    │          │
        │      ┌──▼─┐   ┌───▼──┐
        │      │Ok? │   │Issue?│
        │      └┬───┘   └──┬───┘
        │      │           │
    ┌───▼──────▼─┐      ┌──▼──────┐
    │  Project   │      │Escalate │
    │ consensus  │      │ to panel │
    │  reached   │      │ for fix  │
    └────────────┘      └──┬──────┘
                           │
                       ┌───▼───┐
                       │Fixed? │
                       └─┬──┬──┘
                         │  │
                     ┌───┘  └────┐
                 ┌───▼──┐   ┌────▼────┐
                 │Issue │   │Escalate │
                 │fixed │   │to human  │
                 └──────┘   └──────────┘
```

---

## 10. Testing Algorithms

Users can test algorithms against hypothetical scenarios:

```bash
$ roundtable algorithm test democratic_majority
  --scenario "security_objects.json"

Scenario: Security objects, 2 other panels disagree, UX ok
Current algorithm: democratic_majority

Results:
  Within-panel consensus: MEDIUM (2 of 3 agree)
  Cross-domain: Security concern raised
    → Other panel discusses
    → Mitigation found
  Project-level: CONSENSUS (all ok after mitigation)

Decision: Proceed with mitigation

---

$ roundtable algorithm test security_first_veto
  --scenario "security_objects.json"

Results:
  Within-panel consensus: MEDIUM
  Cross-domain: Security concern = VETO
  Project-level: HALT (waiting for human override)

Decision: Escalate to human (security has veto)

Difference from democratic_majority:
  ⚠️ Security veto triggered: decision halted instead of resolved
```

---

## 11. Open Questions

1. **Runtime algorithm changes:** How do we handle re-evaluating past decisions under new algorithms?
2. **Algorithm composition:** Can algorithms build on other algorithms?
3. **Machine learning tuning:** Can we learn optimal weighting from project history?
4. **Conflict resolution:** What if users disagree about which algorithm to use?
5. **Determinism:** Should algorithms be purely deterministic or allow randomization?
