# Enhanced Debate Mechanics

## Overview

Roundtable's Debate Mode has been enhanced with research-backed mechanisms from the study "Improving Factuality and Reasoning in Language Models through Multiagent Debate" (Du et al., 2023). This research demonstrated **8-15% accuracy improvements** across reasoning and factual tasks through structured multi-agent deliberation.

**Key enhancements:**
1. **Evidence-Based Argumentation Framework** - Claims must be backed by categorized evidence
2. **Quantitative Convergence Metrics** - Objective measurement of consensus
3. **Quality Tracking & Learning Loop** - Post-mortem integration for continuous improvement

---

## 1. Evidence-Based Argumentation Framework

### 1.1 The Problem

In unstructured debates, agents can make claims without accountability:
- "This approach scales better" (says who?)
- "Users prefer option A" (based on what data?)
- "Security risk is low" (according to which standard?)

Without evidence requirements, debate becomes opinion exchange rather than truth-seeking.

### 1.2 Evidence Classification System

Every claim in debate must be tagged with one of six evidence types:

```yaml
evidence_types:

  DOCUMENTED:
    description: "Cite specific documentation, RFC, standard, or official source"
    strength_weight: 0.90
    examples:
      - "REST API best practices (RFC 7231 Section 4.2.1)"
      - "PostgreSQL documentation: max_connections default is 100"
      - "OWASP Top 10: SQL injection is #1 web vulnerability"
    when_to_use: "Technical standards, official docs, specifications"

  EMPIRICAL:
    description: "Cite measurement, benchmark, test result, or data"
    strength_weight: 0.85
    examples:
      - "Our load test: 10K concurrent users, 50ms p95 latency"
      - "Team survey: 4/5 engineers have React experience"
      - "GitHub stars: Library A (45K) vs Library B (12K)"
    when_to_use: "Quantitative data, measurements, observed results"

  PRECEDENT:
    description: "Cite similar project, established pattern, case study"
    strength_weight: 0.70
    examples:
      - "Stripe API uses webhook + polling hybrid pattern"
      - "Netflix moved from monolith to microservices (2009-2012)"
      - "Our previous project used Redis caching successfully"
    when_to_use: "Real-world examples, proven approaches, case studies"

  LOGICAL:
    description: "First-principles reasoning with clear logical chain"
    strength_weight: 0.60
    examples:
      - "Event-driven requires message broker → adds infrastructure complexity"
      - "If load < 1K req/sec, connection pooling overhead > benefits"
      - "Serverless scales to zero → reduces costs during low usage"
    when_to_use: "Deductive reasoning, cause-effect relationships"

  PREFERENTIAL:
    description: "Subjective judgment, team preference, opinion"
    strength_weight: 0.40
    examples:
      - "I prefer microservices for team autonomy"
      - "Developers enjoy working with TypeScript"
      - "This approach feels more maintainable"
    when_to_use: "Aesthetic judgments, preferences, 'soft' factors"

  SPECULATIVE:
    description: "Hypothesis without backing, educated guess"
    strength_weight: 0.20
    examples:
      - "This might scale better at high load"
      - "Users could prefer this interface"
      - "This approach may be more secure"
    when_to_use: "Unknowns, hypotheses that need testing"
```

### 1.3 Evidence Requirements in Practice

**Format for claims:**

```markdown
[Agent]: "Claim statement"
  Evidence Type: [TYPE]
  Source: [Specific citation]
  Confidence: [HIGH/MEDIUM/LOW based on evidence strength]
```

**Example - Architecture Debate:**

```markdown
Topic: Should we use REST or GraphQL for our API?

Claude (Round 1):
  Claim: "GraphQL provides better flexibility for frontend teams"
  Evidence Type: DOCUMENTED
  Source: "GraphQL specification (https://spec.graphql.org) - clients specify exact data needs"
  Additional: "Apollo GraphQL best practices guide"
  Confidence: HIGH

GPT-4 (Round 1):
  Claim: "REST is simpler to implement for our team"
  Evidence Type: EMPIRICAL
  Source: "Team survey: 5/5 engineers have REST experience, 0/5 have GraphQL experience"
  Additional: LOGICAL - "Learning curve adds 2-3 weeks to timeline"
  Confidence: MEDIUM-HIGH

Gemini (Round 1):
  Claim: "GraphQL reduces over-fetching and improves mobile performance"
  Evidence Type: PRECEDENT + EMPIRICAL
  Source: "GitHub moved to GraphQL (2016) - reduced mobile data transfer by 40%"
  Additional: "Shopify reports 30% reduction in API calls"
  Confidence: MEDIUM
```

### 1.4 Critique Methodology

When critiquing another agent's position, follow this structure:

**1. Identify the claim:**
```
"Agent X claims that [specific statement]"
```

**2. Evaluate the evidence:**
```
"This claim is backed by [evidence type] evidence"
"Strength assessment: [HIGH/MEDIUM/LOW]"
```

**3. Provide counter-evidence (if disagreeing):**
```
"Counter-evidence [same or stronger type]:"
"[Your evidence and sources]"
```

**4. Propose alternative or synthesis:**
```
"Given both perspectives, I propose [alternative]"
OR "I concede this point because [reasoning]"
```

**Example - Critique in Action:**

```markdown
GPT-4 critiques Claude (Round 2):

1. CLAIM IDENTIFIED:
   "Claude claims GraphQL provides better flexibility"

2. EVIDENCE EVALUATION:
   Evidence Type: DOCUMENTED
   Strength: HIGH (official spec + established guides)
   Assessment: This claim is well-supported

3. COUNTER-EVIDENCE:
   "However, I present EMPIRICAL counter-evidence:

   Source: Team capability assessment
   - 0/5 engineers have GraphQL experience
   - Estimated learning curve: 2-3 weeks
   - Project timeline: 8 weeks total
   - Impact: 25-37% of timeline spent on learning

   Source: LOGICAL reasoning
   - Flexibility benefits only matter if requirements are uncertain
   - Our requirements are well-defined (see: product spec v2.1)
   - Therefore: Flexibility vs. Implementation speed tradeoff"

4. SYNTHESIS PROPOSAL:
   "For THIS project, REST is more appropriate because:
   - Timeline constraint (8 weeks) makes learning curve significant
   - Requirements are well-defined (less need for flexibility)
   - Team experience reduces implementation risk

   HOWEVER: For future projects with uncertain requirements and longer
   timelines, GraphQL would be worth the investment.

   I update my position to: REST for MVP, evaluate GraphQL for v2.0"
```

### 1.5 Confidence Scoring Based on Evidence

```yaml
confidence_calculation:

  multiple_documented_sources:
    confidence: HIGH (0.85-0.95)
    example: "3 RFCs + 2 official guides support this claim"

  single_documented_or_strong_empirical:
    confidence: MEDIUM-HIGH (0.70-0.84)
    example: "RFC 7231 specifies this behavior"
    example: "Our benchmark shows 10K qps sustained"

  precedent_plus_logical:
    confidence: MEDIUM (0.55-0.69)
    example: "Stripe does X + logical reasoning why it applies to us"

  logical_only:
    confidence: MEDIUM-LOW (0.40-0.54)
    example: "First-principles reasoning without empirical backing"

  preferential:
    confidence: LOW (0.25-0.39)
    example: "Team preference or aesthetic judgment"

  speculative:
    confidence: VERY LOW (0.10-0.24)
    example: "Hypothesis without supporting data"
```

---

## 2. Quantitative Convergence Metrics

### 2.1 The Problem

"Consensus reached" is subjective without measurement. Questions:
- How close are agents to agreement?
- Is debate making progress or going in circles?
- When is "close enough" to stop?

### 2.2 Three Convergence Metrics

#### Metric 1: Semantic Similarity Score

**What it measures:** How similar are agent responses to each other?

**Calculation (conceptual):**
```python
def calculate_semantic_similarity(agent_responses):
    """
    Embed each response, calculate pairwise cosine similarity
    Returns: 0.0 (completely different) to 1.0 (identical)
    """
    embeddings = [embed(response) for response in agent_responses]
    similarities = []

    for i in range(len(embeddings)):
        for j in range(i+1, len(embeddings)):
            sim = cosine_similarity(embeddings[i], embeddings[j])
            similarities.append(sim)

    return mean(similarities)
```

**Interpretation:**
- **0.00-0.40:** Strong disagreement, positions far apart
- **0.41-0.60:** Moderate disagreement, some common ground
- **0.61-0.79:** Converging, significant overlap
- **0.80-1.00:** Consensus reached, strong agreement

**Threshold:** `>= 0.80` triggers consensus

**Example tracking:**

```
Round 1: Semantic Similarity = 0.38
  Claude:  "Use microservices for scalability"
  GPT-4:   "Use monolith for simplicity"
  Gemini:  "Use serverless for cost optimization"
  → Positions far apart, continue debate

Round 2: Semantic Similarity = 0.67
  Claude:  "Use modular monolith, extract services if needed"
  GPT-4:   "Start with monolith, plan service boundaries"
  Gemini:  "Monolithic architecture with clear domain separation"
  → Converging around "modular monolith" concept

Round 3: Semantic Similarity = 0.84
  Claude:  "Modular monolith with domain-driven design boundaries"
  GPT-4:   "Monolith structured as modules with extraction plan"
  Gemini:  "Modular monolith approach, extract if team scales"
  → CONSENSUS REACHED (similarity >= 0.80)
```

#### Metric 2: Position Shift Tracking

**What it measures:** How much did each agent update their position?

**Calculation (conceptual):**
```python
def calculate_position_shift(prev_response, curr_response):
    """
    Compare agent's response from previous round to current round
    Returns: 0.0 (no change) to 1.0 (complete reversal)
    """
    prev_emb = embed(prev_response)
    curr_emb = embed(curr_response)

    # Lower similarity = bigger shift
    shift = 1.0 - cosine_similarity(prev_emb, curr_emb)
    return shift
```

**Interpretation:**
- **0.00-0.10:** Minimal change, position stable
- **0.11-0.30:** Refinement, small updates
- **0.31-0.60:** Significant update, substantial change
- **0.61-1.00:** Major shift, large position change

**Threshold for diminishing returns:** Average shift `< 0.05` means debate is no longer productive

**Example tracking:**

```
Round 1 → Round 2:
  Claude:  0.42 (significant shift: microservices → modular monolith)
  GPT-4:   0.18 (refinement: monolith → monolith with planning)
  Gemini:  0.55 (major shift: serverless → modular monolith)
  Average: 0.38 (healthy progress)

Round 2 → Round 3:
  Claude:  0.12 (small refinement: added DDD terminology)
  GPT-4:   0.15 (small refinement: added extraction plan)
  Gemini:  0.10 (minimal change: added scaling condition)
  Average: 0.12 (still making progress)

Round 3 → Round 4:
  Claude:  0.03 (negligible)
  GPT-4:   0.02 (negligible)
  Gemini:  0.04 (negligible)
  Average: 0.03 (< 0.05 threshold → STOP, diminishing returns)
```

#### Metric 3: Evidence Convergence

**What it measures:** Are agents citing the same evidence sources?

**Calculation (conceptual):**
```python
def calculate_evidence_convergence(agent_citations):
    """
    Track citation overlap across agents
    Returns: 0.0 (all different sources) to 1.0 (all same sources)
    """
    all_citations = [set(agent_cites) for agent_cites in agent_citations]

    common = set.intersection(*all_citations)
    total_unique = set.union(*all_citations)

    return len(common) / len(total_unique) if total_unique else 0.0
```

**Interpretation:**
- **0.00-0.30:** No common ground, different evidence bases
- **0.31-0.59:** Some overlap, partial agreement
- **0.60-1.00:** Strong evidence consensus, citing similar sources

**Threshold:** `>= 0.60` indicates strong evidence agreement

**Example tracking:**

```
Round 1 Evidence:
  Claude:  ["Martin Fowler (Microservices)", "AWS Architecture Guide"]
  GPT-4:   ["YAGNI principle", "Internal team survey"]
  Gemini:  ["Serverless patterns", "AWS Lambda docs"]

  Common: {} (0 shared)
  Total unique: {5 sources}
  Evidence Convergence: 0.0 / 5 = 0.00

Round 2 Evidence:
  Claude:  ["Modular monolith (Fowler)", "Domain-Driven Design book", "Team size research"]
  GPT-4:   ["Team size research", "Conway's Law", "Shopify monolith case"]
  Gemini:  ["Team size research", "Shopify monolith case"]

  Common: {"Team size research", "Shopify monolith case"} (2 shared)
  Total unique: {6 sources}
  Evidence Convergence: 2 / 6 = 0.33

Round 3 Evidence:
  Claude:  ["DDD book", "Team size research", "Modular monolith pattern"]
  GPT-4:   ["Modular monolith pattern", "Team size research", "Migration planning"]
  Gemini:  ["Modular monolith pattern", "Team size research"]

  Common: {"Team size research", "Modular monolith pattern"} (2 shared)
  Total unique: {4 sources}
  Evidence Convergence: 2 / 4 = 0.50

Round 4 Evidence:
  Claude:  ["Modular monolith pattern", "Team size research", "DDD boundaries"]
  GPT-4:   ["Modular monolith pattern", "Team size research", "Extraction planning"]
  Gemini:  ["Modular monolith pattern", "Team size research"]

  Common: {"Team size research", "Modular monolith pattern"} (2 shared)
  Total unique: {4 sources}
  Evidence Convergence: 2 / 4 = 0.50

Note: While not reaching 0.60 threshold, the SEMANTIC SIMILARITY of 0.84
indicates consensus despite diverse evidence sources supporting similar conclusions.
```

### 2.3 Combined Convergence Decision Logic

```yaml
convergence_rules:

  consensus_reached:
    condition: |
      (semantic_similarity >= 0.80) AND
      (evidence_convergence >= 0.60 OR position_shift < 0.10)
    action: "End debate, document consensus"
    confidence: HIGH
    display: "✓ CONSENSUS REACHED"

  consensus_with_diverse_evidence:
    condition: |
      (semantic_similarity >= 0.80) AND
      (evidence_convergence < 0.60)
    action: "End debate, document consensus + diverse evidence base"
    confidence: MEDIUM-HIGH
    display: "✓ CONSENSUS REACHED (diverse evidence paths)"
    note: "Agents agree on conclusion via different reasoning"

  diminishing_returns:
    condition: |
      (position_shift < 0.05 for 2+ consecutive rounds) AND
      (semantic_similarity < 0.80)
    action: "End debate, escalate to human"
    confidence: MEDIUM
    display: "⚠ DIMINISHING RETURNS - Human decision needed"
    reason: "Debate not making progress toward consensus"

  productive_debate:
    condition: |
      (position_shift >= 0.05) AND
      (semantic_similarity < 0.80)
    action: "Continue debate (new round)"
    confidence: VARIES
    display: "↻ CONTINUE DEBATE (making progress)"
    reason: "Positions still shifting, consensus not yet reached"

  premature_consensus_check:
    condition: |
      (semantic_similarity > 0.85) AND
      (round_number <= 2)
    action: "Flag for devil's advocate review"
    confidence: LOW
    display: "⚠ EARLY CONSENSUS - Verify not groupthink"
    reason: "Quick agreement may indicate insufficient exploration"

  divergence_alert:
    condition: |
      (semantic_similarity < previous_round_similarity - 0.10)
    action: "Flag divergence, investigate new information"
    confidence: VARIES
    display: "⚠ POSITIONS DIVERGING - New evidence introduced?"
    reason: "Positions moving apart instead of converging"
```

### 2.4 User-Facing Display

**During debate, show metrics clearly:**

```
═══════════════════════════════════════════════════════════
                    DEBATE PROGRESS
═══════════════════════════════════════════════════════════

Round 3 Complete

Convergence Metrics:

  Semantic Similarity:     0.84  ████████░░  84%  ✓
    Threshold: 0.80 (consensus)
    Status: CONSENSUS REACHED

  Position Shift (R2→R3):  0.12  █░░░░░░░░░  12%  ↻
    Previous: 0.38 (R1→R2)
    Trend: Slowing (healthy - approaching consensus)

  Evidence Convergence:    0.50  █████░░░░░  50%  ~
    Threshold: 0.60 (strong agreement)
    Status: Moderate overlap
    Note: Agents reaching similar conclusions via different evidence

═══════════════════════════════════════════════════════════
                   CONSENSUS REACHED
═══════════════════════════════════════════════════════════

Converged Position:
  "Modular monolith architecture with clear domain boundaries.
   Plan extraction points for future microservices if team scales."

Supporting Evidence (cited across agents):
  ✓ Team size research (Conway's Law) - 3/3 agents
  ✓ Modular monolith pattern (Fowler) - 3/3 agents
  ~ DDD principles - 2/3 agents
  ~ Shopify case study - 2/3 agents

Confidence: HIGH (0.84)

Recommendation: Accept consensus and proceed to implementation planning.
═══════════════════════════════════════════════════════════
```

---

## 3. Quality Tracking & Post-Mortem Integration

### 3.1 The Problem

Debates don't improve over time without feedback:
- Which evidence types actually predicted correct decisions?
- Which agents/panels were most accurate?
- Did more debate rounds help or just waste tokens?

### 3.2 Three-Stage Learning Process

#### Stage 1: Capture Rich Debate Metadata

During debate, record everything:

```yaml
debate_record:
  session_id: "proj-2024-10-dashboard-api"
  project_name: "Dashboard Redesign"
  topic: "REST vs GraphQL API choice"
  timestamp_start: "2024-10-21T10:00:00Z"
  timestamp_end: "2024-10-21T10:23:00Z"

  rounds:
    - round_number: 1
      timestamp: "2024-10-21T10:00:00Z"
      duration_seconds: 180

      agent_positions:
        - agent: "Claude-Sonnet-3.5"
          panel: "Architecture"
          position: "GraphQL for flexible querying"
          evidence_types: ["DOCUMENTED", "PRECEDENT"]
          evidence_citations:
            - "GraphQL specification (https://spec.graphql.org)"
            - "GitHub API v4 uses GraphQL"
          confidence: 0.75
          tokens_used: 450

        - agent: "GPT-4"
          panel: "Architecture"
          position: "REST for team familiarity and simplicity"
          evidence_types: ["EMPIRICAL", "LOGICAL"]
          evidence_citations:
            - "Team survey: 5/5 engineers have REST exp, 0/5 GraphQL"
            - "Learning curve: est. 2-3 weeks"
          confidence: 0.80
          tokens_used: 420

        - agent: "Gemini-Pro"
          panel: "Product"
          position: "GraphQL reduces mobile data transfer"
          evidence_types: ["PRECEDENT", "EMPIRICAL"]
          evidence_citations:
            - "GitHub: 40% reduction in mobile data"
            - "Shopify: 30% reduction in API calls"
          confidence: 0.70
          tokens_used: 380

      metrics:
        semantic_similarity: 0.42
        evidence_convergence: 0.0
        position_shift: null  # First round

      user_input: null  # User observing

    - round_number: 2
      # ... similar structure
      metrics:
        semantic_similarity: 0.71
        evidence_convergence: 0.33
        position_shift: 0.35

    - round_number: 3
      metrics:
        semantic_similarity: 0.83
        evidence_convergence: 0.50
        position_shift: 0.12

  final_consensus:
    decision: "Use REST API with OpenAPI specification"
    rationale: |
      Team experience (EMPIRICAL) and timeline constraints outweigh
      GraphQL flexibility benefits for MVP. GraphQL reconsidered for v2.0.
    confidence: 0.83

    supporting_evidence:
      - type: "EMPIRICAL"
        citation: "Team survey: 5/5 REST experience, 0/5 GraphQL"
        weight: 0.85

      - type: "DOCUMENTED"
        citation: "OpenAPI tooling reduces boilerplate"
        weight: 0.90

      - type: "LOGICAL"
        citation: "8-week timeline: 2-3 week learning curve = 25-37% impact"
        weight: 0.60

    dissenting_opinions: []

    escalation: false
    human_override: false

  token_efficiency:
    total_tokens: 3840
    rounds: 3
    avg_tokens_per_round: 1280
    consensus_reached: true
```

#### Stage 2: Track Implementation Reality

As project unfolds, track what actually happens:

```yaml
implementation_tracking:
  project_id: "proj-2024-10-dashboard-api"
  debate_id: "debate-rest-vs-graphql"
  decision_made: "Use REST API with OpenAPI"

  timeline:
    - week: 1
      event: "OpenAPI spec defined"
      status: "on_track"
      note: "Codegen working well, team velocity high"

    - week: 2
      event: "First endpoints implemented"
      status: "on_track"
      note: "REST familiarity helping - no blockers"

    - week: 3
      event: "Frontend requests flexible filtering"
      status: "new_requirement"
      note: "Want to filter/sort any field dynamically (GraphQL-like)"
      impact: "Need custom query parser"
      surprise_factor: 0.7  # Moderately unexpected

    - week: 4
      event: "Building custom query DSL"
      status: "technical_debt"
      note: "Essentially building mini-GraphQL"
      time_cost: "3 additional days"
      tokens_impacted: "GraphQL evidence was correct about flexibility needs"

    - week: 6
      event: "Frontend requests batch loading"
      status: "new_requirement"
      note: "N+1 query problems, need DataLoader pattern"
      impact: "Adding batch endpoint logic"
      time_cost: "2 additional days"

    - week: 8
      event: "API shipped"
      status: "completed"
      note: "Shipped on time, but with query complexity tech debt"
      overall_assessment: "75% success"

  post_mortem_assessment:
    decision_accuracy: 0.75

    what_went_right:
      - aspect: "Team velocity"
        validation: "EMPIRICAL evidence validated"
        note: "REST familiarity did accelerate initial development"
        evidence_type_accuracy: "EMPIRICAL: 100%"

      - aspect: "Tooling benefits"
        validation: "DOCUMENTED evidence validated"
        note: "OpenAPI codegen saved significant time"
        evidence_type_accuracy: "DOCUMENTED: 100%"

    what_went_wrong:
      - aspect: "Flexibility requirements"
        validation: "PRECEDENT evidence was dismissed but relevant"
        note: "GitHub's flexible querying needs mirrored our requirements"
        evidence_type_accuracy: "PRECEDENT: missed (should have weighted higher)"

      - aspect: "Query complexity"
        validation: "LOGICAL evidence incomplete"
        note: "Debate focused on learning curve, missed query pattern analysis"
        evidence_type_accuracy: "LOGICAL: 50% (incomplete reasoning)"

    lessons_learned:
      - lesson: "Validate query requirements explicitly during API debates"
        actionable: "Add to PM agent's required questions"
        estimated_impact: "+15% decision accuracy for future API debates"

      - lesson: "PRECEDENT evidence (GitHub, Shopify) was more relevant than weighted"
        actionable: "Increase PRECEDENT weight from 0.70 to 0.75"
        estimated_impact: "+5% decision accuracy"

      - lesson: "Need 'Requirements Validation' skill in panel"
        actionable: "Create new skill for surfacing implicit requirements"
        estimated_impact: "+10% decision accuracy"
```

#### Stage 3: Learn and Update System

Post-mortem analysis updates future debates:

```yaml
learning_updates:
  project: "proj-2024-10-dashboard-api"

  # UPDATE 1: Evidence Type Weights
  evidence_weight_updates:
    PRECEDENT:
      old_weight: 0.70
      new_weight: 0.75
      reason: "GitHub GraphQL precedent was dismissed but proved relevant"
      projects_analyzed: 3
      accuracy_improvement: "+5%"

    LOGICAL:
      old_weight: 0.60
      new_weight: 0.58
      reason: "Logical reasoning missed query pattern complexity"
      projects_analyzed: 3
      note: "Still valuable but not sufficient alone"

  # UPDATE 2: Agent/Panel Calibration
  agent_calibration_updates:
    claude_sonnet:
      domain: "API Design"
      debates: 5
      accuracy: 0.78
      note: "Strong on patterns, sometimes misses practical constraints"

    gpt4:
      domain: "API Design"
      debates: 5
      accuracy: 0.85
      note: "Good at team/timeline constraints, strong practical focus"

    gemini_pro:
      domain: "API Design - Product Angle"
      debates: 5
      accuracy: 0.72
      note: "Good precedent research, could validate requirements better"

  # UPDATE 3: Required Questions
  pm_agent_question_updates:
    debate_topic: "API Design"

    new_required_questions:
      - question: "What are the expected query patterns and filtering needs?"
        reason: "3/5 API debates missed query complexity"
        effectiveness_estimate: 0.85
        priority: "HIGH"

      - question: "Will frontend need batch loading or complex relationships?"
        reason: "N+1 query problems surfaced in 2/5 projects"
        effectiveness_estimate: 0.75
        priority: "MEDIUM"

    updated_questions:
      - question: "What's the team's experience level?"
        old_effectiveness: 0.80
        new_effectiveness: 0.92
        note: "Consistently predictive across 5 projects"

  # UPDATE 4: Skill Recommendations
  skill_recommendations:
    - skill_name: "Requirements Validation Expert"
      reason: "Would have caught missing query requirements"
      evidence: "3 projects had implicit requirements missed during debate"
      expected_improvement: "+10% decision accuracy"
      priority: "HIGH"

    - skill_name: "API Pattern Specialist"
      reason: "Deep API expertise would surface edge cases"
      evidence: "Query patterns, batch loading, caching consistently missed"
      expected_improvement: "+8% decision accuracy"
      priority: "MEDIUM"

  # UPDATE 5: Debate Round Efficiency
  debate_efficiency_analysis:
    project: "proj-2024-10-dashboard-api"
    rounds: 3
    consensus_reached: true
    decision_accuracy: 0.75

    observation: |
      Despite consensus (semantic similarity 0.83), decision had gaps.
      More rounds might not have helped - problem was MISSING SKILL
      (requirements validation), not insufficient debate.

    recommendation: |
      For API debates: Always include Requirements Validation skill
      rather than extending debate rounds.
```

### 3.3 How Learning Compounds Over Time

**Project 1: Initial weights (no learning)**
```yaml
Evidence weights: DOCUMENTED: 0.90, EMPIRICAL: 0.85, PRECEDENT: 0.70, LOGICAL: 0.60
Agent accuracy: Unknown
Required questions: 5 (standard)
Debate accuracy: 65%
```

**Project 5: After 4 project learnings**
```yaml
Evidence weights: DOCUMENTED: 0.92, EMPIRICAL: 0.88, PRECEDENT: 0.75, LOGICAL: 0.58
Agent accuracy: Calibrated per domain
Required questions: 8 (added 3 based on learnings)
Recommended skills: +2 (Requirements Validation, API Patterns)
Debate accuracy: 78% (+13%)
```

**Project 10: After 9 project learnings**
```yaml
Evidence weights: Highly tuned per domain
Agent accuracy: Precise calibration with confidence intervals
Required questions: 12 (domain-specific question library)
Recommended skills: +5 (comprehensive skill suggestions)
Debate accuracy: 85% (+20% from baseline)
```

**The compounding effect:**
- Each project teaches the system
- Evidence weights refine
- Question library grows
- Skill recommendations improve
- Agent calibration tightens
- **Result: Continuous accuracy improvement**

### 3.4 Post-Mortem Report Template

After each project, generate this report:

```markdown
═══════════════════════════════════════════════════════════
           POST-MORTEM: Debate Quality Analysis
═══════════════════════════════════════════════════════════

Project: Dashboard Redesign
Debate Topic: REST vs GraphQL API choice
Decision: Use REST API with OpenAPI
Date: 2024-10-21
Outcome Assessment: 75% accurate

───────────────────────────────────────────────────────────
DEBATE METRICS
───────────────────────────────────────────────────────────

Rounds: 3
Final Semantic Similarity: 0.83 (consensus reached)
Final Evidence Convergence: 0.50 (moderate)
Total Tokens: 3,840

Efficiency: ✓ Good (reached consensus in 3 rounds)

───────────────────────────────────────────────────────────
EVIDENCE PERFORMANCE
───────────────────────────────────────────────────────────

EMPIRICAL Evidence:
  Cases used: 2
  Accuracy: 100% ✓✓
  Examples:
    ✓ "Team has REST experience" - validated during implementation
    ✓ "OpenAPI tooling benefits" - validated, saved time

DOCUMENTED Evidence:
  Cases used: 3
  Accuracy: 100% ✓✓
  Examples:
    ✓ "OpenAPI specification" - worked as expected

PRECEDENT Evidence:
  Cases used: 2
  Accuracy: 50% ⚠
  Examples:
    ✗ "GitHub GraphQL flexibility" - DISMISSED but was RELEVANT
    ✓ "Shopify API patterns" - partially validated

  ⚠ LEARNING: PRECEDENT weight should increase 0.70 → 0.75

LOGICAL Evidence:
  Cases used: 2
  Accuracy: 75% ~
  Examples:
    ✓ "Learning curve impacts timeline" - correct reasoning
    ✗ "Query patterns analysis" - INCOMPLETE reasoning

───────────────────────────────────────────────────────────
AGENT PERFORMANCE
───────────────────────────────────────────────────────────

Claude (Architecture Panel):
  Initial: GraphQL
  Final: REST (updated position)
  Accuracy: 70%
  Note: Good pattern recognition, but GraphQL flexibility
        argument was actually valid (discovered later)

GPT-4 (Architecture Panel):
  Initial: REST
  Final: REST
  Accuracy: 85% ✓
  Note: Strong on team constraints, timeline impact

Gemini (Product Panel):
  Initial: GraphQL for mobile benefits
  Final: REST with note to reconsider
  Accuracy: 70%
  Note: Mobile benefits valid but not weighted enough

───────────────────────────────────────────────────────────
WHAT WENT RIGHT
───────────────────────────────────────────────────────────

✓ Team velocity assessment was accurate
✓ Timeline constraint reasoning was sound
✓ OpenAPI tooling benefits materialized
✓ Debate reached consensus efficiently (3 rounds)

───────────────────────────────────────────────────────────
WHAT WENT WRONG
───────────────────────────────────────────────────────────

✗ Query pattern requirements not surfaced during debate
✗ Flexible filtering needs discovered week 3 (surprise)
✗ GraphQL PRECEDENT evidence dismissed but was relevant
✗ N+1 query problems discovered week 6 (surprise)

Impact: 5 additional days of development (12.5% timeline impact)

───────────────────────────────────────────────────────────
LESSONS LEARNED
───────────────────────────────────────────────────────────

1. ADD REQUIRED QUESTION:
   "What are the expected query patterns and filtering needs?"

   Reason: 3/5 API debates missed this
   Expected improvement: +15% accuracy

2. UPDATE EVIDENCE WEIGHT:
   PRECEDENT: 0.70 → 0.75

   Reason: GitHub/Shopify examples proved more relevant
   Expected improvement: +5% accuracy

3. ADD SKILL TO PANEL:
   "Requirements Validation Expert"

   Reason: Implicit requirements consistently missed
   Expected improvement: +10% accuracy

───────────────────────────────────────────────────────────
SYSTEM UPDATES APPLIED
───────────────────────────────────────────────────────────

✓ Evidence weights updated
✓ PM agent questions expanded
✓ Skill recommendation added
✓ Agent calibration refined (API design domain)

───────────────────────────────────────────────────────────
PROJECTED IMPACT ON FUTURE DEBATES
───────────────────────────────────────────────────────────

Current accuracy (API debates): 75%
Expected accuracy (with updates): 85%
Improvement: +10 percentage points

Next API debate will:
  • Ask 3 new questions about query patterns
  • Weight PRECEDENT evidence higher
  • Suggest "Requirements Validation Expert" skill
  • Have better agent calibration

═══════════════════════════════════════════════════════════
```

---

## 4. Integration with Existing Systems

### 4.1 Integration with SPEC.md Section 7.3

The enhanced debate mechanics extend the existing Debate Mode:

**Existing flow (preserved):**
1. User asks question → Models respond → Debate begins
2. Rounds continue until consensus/timeout/user stops
3. Truth-seeking philosophy maintained

**New additions:**
- Evidence tagging required
- Convergence metrics displayed
- Learning captured for post-mortem

**Backward compatible:** Old-style debates still work, but new debates benefit from enhancements.

### 4.2 Integration with CONSENSUS_ALGORITHMS.md

New consensus algorithm added: `evidence_based_debate`

This algorithm uses all three enhancements:
- Requires evidence tagging
- Uses quantitative convergence metrics
- Feeds into post-mortem learning

See CONSENSUS_ALGORITHMS.md for full YAML specification.

### 4.3 Integration with POST_MORTEM_SYSTEM.md

Post-mortem system now tracks:
- Debate quality metrics
- Evidence type accuracy
- Agent/panel calibration
- Required questions effectiveness

Feeds learning back into future debates.

See POST_MORTEM_SYSTEM.md Section "Debate Quality Metrics" for details.

---

## 5. Token Budget Impact

### 5.1 Token Costs

**Evidence-based debate overhead:**
```
Standard debate round: ~400 tokens per agent
Enhanced debate round: ~550 tokens per agent (+37.5%)

Breakdown:
  - Evidence tagging: +50 tokens
  - Source citations: +60 tokens
  - Confidence scoring: +20 tokens
  - Structured critique: +20 tokens
```

**Convergence metrics calculation:**
```
Per round: ~200 tokens (embedding + similarity calculation)
Total for 3-round debate: ~600 tokens overhead
```

**Post-mortem tracking:**
```
Per project: ~1,500 tokens (comprehensive analysis)
Amortized across project: minimal impact
```

**Total overhead:**
```
3-round debate:
  Standard: 3 rounds × 3 agents × 400 tokens = 3,600 tokens
  Enhanced: 3 rounds × 3 agents × 550 tokens + 600 metrics = 5,550 tokens

Overhead: +1,950 tokens (+54%)
```

### 5.2 ROI Analysis

**Cost:** +1,950 tokens per debate

**Benefit:**
- 8-15% accuracy improvement (research-backed)
- Fewer implementation surprises
- Better decisions save 10-100x tokens in future rework

**Example:**
- Debate cost: 5,550 tokens
- Decision accuracy: 85% (vs 70% without)
- Avoided rework: Catching query requirements early saves ~15,000 tokens of implementation discussion/debugging

**ROI:** 3-10x return on enhanced debate token investment

---

## 6. User Experience

### 6.1 Enabling Enhanced Debate

**Option 1: Use evidence_based_debate consensus algorithm**
```bash
$ roundtable config set-algorithm evidence_based_debate
✓ Enhanced debate mechanics enabled
```

**Option 2: Constitution-level requirement**
```yaml
constitution:
  debate_policy:
    require_evidence: true
    track_convergence: true
    enable_learning: true
```

**Option 3: Per-debate flag**
```bash
$ roundtable debate --enhanced
```

### 6.2 During Debate Display

Users see clear progress indicators:

```
═══════════════════════════════════════════════════════════
                      ROUND 2
═══════════════════════════════════════════════════════════

Claude:
  Position: "Modular monolith with service boundaries"
  Evidence: [DOCUMENTED] Domain-Driven Design (Evans, 2003)
            [PRECEDENT] Shopify monolith case study
  Confidence: HIGH (0.82)

GPT-4:
  Position: "Monolith with planned extraction points"
  Evidence: [EMPIRICAL] Team size research (Conway's Law)
            [LOGICAL] Smaller teams benefit from simpler architecture
  Confidence: MEDIUM-HIGH (0.78)

───────────────────────────────────────────────────────────
CONVERGENCE METRICS
───────────────────────────────────────────────────────────
Semantic Similarity:    0.71  ███████░░░  71%  ↻
Position Shift (R1→R2): 0.35  ███░░░░░░░  35%  ↻
Evidence Convergence:   0.33  ███░░░░░░░  33%  ~

Status: CONVERGING (continue debate)
═══════════════════════════════════════════════════════════
```

### 6.3 Post-Debate Summary

```
═══════════════════════════════════════════════════════════
                   DEBATE COMPLETE
═══════════════════════════════════════════════════════════

Consensus: "Modular monolith architecture"
Rounds: 3
Confidence: HIGH (0.84)
Token efficiency: Good (5,550 tokens)

Evidence Summary:
  Most cited: Team size research (3/3 agents)
  Strongest: EMPIRICAL + DOCUMENTED convergence

This decision has been logged for post-mortem analysis.
When project completes, we'll assess accuracy and update
the learning system.

═══════════════════════════════════════════════════════════
```

---

## 7. Research Foundation

This enhancement is based on:

**Primary Source:**
Du, Y., et al. (2023). "Improving Factuality and Reasoning in Language Models through Multiagent Debate"

**Key Findings Applied:**
- Multi-agent debate improves accuracy 8-15% across tasks
- Structured argumentation with evidence outperforms single-agent reasoning
- Multiple debate rounds allow position refinement and convergence
- Agents update positions based on critiques (not just restating)

**Roundtable Adaptations:**
- Evidence classification system (6 types)
- Quantitative convergence detection (3 metrics)
- Post-mortem learning loop (continuous improvement)
- Integration with existing Constitution and Consensus systems

---

## 8. Future Enhancements

### 8.1 Potential V2 Features

**Evidence strength learning:**
- ML model learns which evidence types predict accuracy in which domains
- Auto-adjusts weights based on historical performance

**Automated devil's advocate:**
- If consensus reached too quickly, system generates counter-arguments
- Prevents groupthink and premature closure

**Cross-project learning:**
- Learn from community: "For projects like yours, X evidence type has Y accuracy"
- Marketplace of debate insights

**Real-time fact-checking:**
- Verify DOCUMENTED claims against sources automatically
- Flag EMPIRICAL claims that contradict known data

### 8.2 Research Questions

1. **Optimal round count:** What's the sweet spot for debate rounds vs token efficiency?
2. **Evidence type hierarchy:** Should weights vary by domain (e.g., security debates weight DOCUMENTED higher)?
3. **Convergence thresholds:** Are 0.80/0.60/0.05 thresholds optimal across all debate types?
4. **Learning decay:** How long until learned weights become stale and need refresh?

---

## Status

**Version:** 1.0
**Status:** Active
**Applies to:** Roundtable V1.1+
**Research basis:** Du et al. (2023) - Multiagent Debate
**Integration:** SPEC.md Section 7.3, CONSENSUS_ALGORITHMS.md, POST_MORTEM_SYSTEM.md

---

**Remember:** Enhanced debate costs ~54% more tokens but delivers 8-15% accuracy improvement and 3-10x ROI through better decisions.
