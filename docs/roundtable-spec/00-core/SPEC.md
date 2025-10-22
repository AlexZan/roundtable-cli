# Roundtable: Multi-Model Deliberation System for Structured AI Meetings

## 1. Executive Summary

Roundtable is a CLI/VS Code extension that enables collaborative decision-making and planning through multi-model deliberation. Instead of single-perspective decision-making, users create increasingly precise plans and specifications through structured dialogue with multiple AI models that debate, synthesize, and refine ideas toward convergence.

### Primary Use Case: Project Vision & Specification

Roundtable was designed for **software development teams** creating project visions and specifications. Instead of iterating on a partially-built product, users create increasingly precise specifications through deliberation, and the specification guides autonomous agent implementation with minimal assumptions.

**Core Premise:** Specification is the new source of truth. The closer a spec resembles a user's vision, the faster and cheaper implementation becomes. Multi-model deliberation reduces the cost of spec refinement.

### General Use Case: Any High-Stakes Decision or Plan

But Roundtable applies to **any scenario where structured, multi-perspective debate produces better outcomes:**

- **Marketing Plans** - Multiple perspectives on positioning, messaging, channels
- **Business Plans** - Strategy, unit economics, go-to-market approach
- **Medical Diagnostics** - Multiple medical perspectives on diagnosis and treatment
- **Risk Analysis** - Multiple expert perspectives on potential risks and mitigations
- **Technical Architecture** - Multiple architectural perspectives on tradeoff decisions
- **Policy Development** - Multiple stakeholder perspectives on complex policy decisions

**Key Innovation:** Roundtable is not just a spec-creation tool—it's a **learning system** that compounds value across deliberations. Each session produces both immediate output (a decision/plan) and compounding output (improved expertise for future sessions).

---

## 2. Problem Statement

### Current State
- Developers work with AI to turn ideas into products, but often skip rigorous spec creation
- Iteration happens at the implementation level (expensive, slow)
- Single model perspective misses edge cases and alternative approaches
- Developers must synthesize their own version after talking to one AI

### Proposed Solution
A structured deliberation environment where:
- Multiple foundation models (Claude, GPT-4, Gemini, Llama) participate in specification
- Each model's diverse training and strengths surface different perspectives
- Debate and synthesis happen during spec creation (cheap), not during implementation (expensive)
- Spec output guides autonomous agent implementation with minimal assumptions

---

## 3. Core Principles

### 3.1 Token-Based Estimation (Not Human Time)

**Fundamental principle:** All work is estimated and tracked in tokens, not human hours.

**Why?**
- AI agents process tokens, not hours
- Human time estimations assume 8-hour days, sequential work, breaks
- Token budgets enable parallel execution and real cost visibility
- Makes Roundtable fundamentally different from traditional project management

**Application:**
- "This task: 12,000 tokens" (not "3 hours")
- Enables multiple agents to work in parallel within token windows
- Cost = Agent Tokens + Human Hours + Infrastructure (each tracked separately)
- Decisions optimized for token efficiency, not arbitrary time constraints

See [CLAUDE.md](.claude/CLAUDE.md) for complete token-based estimation framework.

### 3.2 Learning Systems Create Compounding Value

**Three interconnected learning loops:**

1. **Post-Mortem System** - Each session improves expertise
   - After deliberation completes, analyze what happened
   - Identify valuable insights and skill improvements
   - Update skills for next session (+1-5% effectiveness per cycle)
   - Effect: Skills improve, decisions improve, specs improve

2. **Context Compression** - Later phases build on earlier learnings
   - Phase 1 generates 2+ hours of deliberation
   - Compressed to 1-2 paragraphs for Phase 2
   - Phase 2 doesn't re-debate settled questions
   - Effect: Each phase faster and more focused than previous

3. **Feedback Integration** - Implementation validates/refines decisions
   - Phase 1 ships → real users test → feedback collected
   - Feedback becomes input to Phase 2 planning
   - Phase 2 benefits from what users actually do (not assumptions)
   - Effect: Product direction informed by reality, not guesses

**Result:** After 3-5 phases, decision confidence increases by 15-30%, time-to-decision decreases 40-60%.

### 3.3 Parallel Execution Over Sequential

**Default assumption:** Multiple agents work in parallel, not in sequence.

- All panels respond to each prompt simultaneously
- No artificial sequencing (Agent A → Agent B → Agent C)
- Consensus emerges naturally from parallel debate
- Token budgets allow: 3+ large tasks or 5-7 small tasks per 100K window

**Implication:** Traditional PM's "critical path" thinking doesn't apply. Instead, optimize for token efficiency within parallel windows.

---

## 4. Core Concept: The Roundtable

### 4.1 Purpose

A "roundtable" is a structured conversation space where multiple AI models collaborate on spec creation through different interaction modes.

### 4.2 Key Insight

Different models have different:
- Training data and knowledge cutoffs
- Architectural strengths (reasoning, creativity, technical depth)
- Blindspots and biases
- Consensus-building patterns

Leveraging this diversity during planning reduces downstream implementation rework.

---

### 4.3 Four-Layer Architecture

```
┌────────────────────────────────────────────────────────┐
│         LAYER 0: SKILLS LIBRARY                        │
│  Independent, versioned expert definitions             │
│  ├─ .roundtable/skills/security/                       │
│  ├─ .roundtable/skills/architecture/                   │
│  ├─ .roundtable/skills/ux/                             │
│  └─ Shareable via git/marketplace                      │
└──────────────┬───────────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────────┐
│         LAYER 1: CONSTITUTION                          │
│  Governance rules that reference Skills               │
│  Panels → Agents → Skills                             │
└──────────────┬───────────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────────┐
│         LAYER 2: EXPERT PANELS                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ Architecture │  │ UX Expert    │  │ Security    │ │
│  │ Panel        │  │ Panel        │  │ Panel       │ │
│  │ (Multi-agent)│  │ (Multi-agent)│  │ (Multi-agnt)│ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│  (Each agent uses a Skill)                            │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ Data Eng     │  │ Product      │                   │
│  │ Panel        │  │ Panel        │                   │
│  │ (Multi-agent)│  │ (Multi-agent)│                   │
│  └──────────────┘  └──────────────┘                   │
└──────────────┬───────────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────────┐
│         LAYER 3: DELIBERATION ENGINE                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│  │Mode Router │  │Context Mgr │  │Consensus   │      │
│  │            │  │            │  │Algorithm   │      │
│  └────────────┘  └────────────┘  └────────────┘      │
│  ┌────────────────────────────────────────────────┐   │
│  │  Response Processing & Cross-Domain Checking  │   │
│  │  • Panel-level consensus                      │   │
│  │  • Relevance scoring                          │   │
│  │  • Cross-domain concern detection             │   │
│  │  • Debate mechanics                           │   │
│  └────────────────────────────────────────────────┘   │
└──────────────┬───────────────────────────────────────┘
               │
        ┌──────▼─────┐
        │OUTPUT       │
        ├─────────────┤
        │Panel Notes  │
        │Consensus    │
        │Decision Log │
        │Spec Updates │
        └─────────────┘
```

### 4.4 The Deliberation Flywheel

```
Phase N Roundtable
    ↓
Session produces: Spec + Insights
    ↓
Post-Mortem Analysis
    ↓
Skills improve for Phase N+1
    ├─ Architecture skill: +1-2% effectiveness
    ├─ Product skill: +1-2% effectiveness
    ├─ UX skill: +1-2% effectiveness
    └─ Overall: Decisions get better
    ↓
Phase N Implementation
    ↓
Real user feedback collected
    ↓
Context compressed + Feedback integrated
    ↓
Phase N+1 Session (with compounded learning)
    ├─ Uses better skills
    ├─ Knows what worked/didn't
    ├─ Builds on validated foundation
    └─ Faster, more confident decisions
    ↓
Result: Each phase dramatically better than previous
```

This flywheel is why Roundtable doesn't just create specs—it creates a self-improving system.

### 4.5 Core Components

**Layer 0: Skills** (Expert Definitions)
- Independent, versioned expert definitions
- Reusable across projects (not embedded in Constitution)
- Shareable via git/marketplace
- Define domain knowledge + system prompts
- Enable standardization across projects
- See SKILLS.md for complete documentation

**Layer 1: Constitution** (Governance Framework)
- Defines who participates (panels with skills-assigned agents)
- Defines how decisions are made (consensus algorithm)
- Defines what constraints apply
- Enables marketplace sharing and reuse

**Layer 2: Expert Panels** (Multi-Agent Expertise)
- Each panel contains multiple agents in the same domain
- Each agent references a **Skill** for expertise definition
- Independent context memory per panel
- **V1: No role assignment** - agents contribute from natural training differences
- **V2+: Teams within panels** - explicit sub-specializations based on V1 learnings
- Automatic cross-domain concern detection

**Layer 3: Deliberation Engine** (Orchestration & Consensus)
- Routes user prompts to appropriate panels
- Loads skills for each agent
- Manages individual context for each panel
- Detects cross-domain impacts
- Applies customizable consensus algorithms
- Produces organized output artifacts

### 4.6 Data Flow: Single User Input

```
USER WRITES: "Design the authentication flow"
                    │
                    ├─→ [Constitution Check]
                    │    • Load Constitution (governance rules)
                    │    • Identify affected panels
                    │    • Load consensus algorithm
                    │
                    ├─→ [Panel Routing]
                    │    • Security Panel: 2 agents respond
                    │    • Architecture Panel: 2 agents respond
                    │    • Other panels: Only if cross-domain impact likely
                    │
                    ├─→ [Parallel Panel Execution]
                    │    For each panel:
                    │    • Load panel context (all prior responses)
                    │    • Apply domain-specific pre-prompts
                    │    • Query all agents independently
                    │    • Compute panel consensus
                    │
                    ├─→ [Cross-Domain Check]
                    │    • Security raises concern about localStorage
                    │    • Mark for UX Panel escalation
                    │    • UX Panel responds to concern
                    │
                    ├─→ [Apply Consensus Algorithm]
                    │    • Merge panel-level consensus
                    │    • Apply governance rules
                    │    • Identify unresolved areas
                    │
                    ├─→ [Output Based on Mode]
                    │    Relevant Order: Show each panel (collapsed)
                    │                    Display token counts
                    │                    Allow drill-down
                    │    Moderator:     Synthesize panel consensus
                    │                    Show decision rationale
                    │    Debate:        Auto-generate cross-panel debate
                    │
                    └─→ ORGANIZE NOTES + UPDATE SPEC
```

---

## 5. Session Management

### 5.1 Consensus Failure and Escalation

**If agents cannot reach consensus** (disagreement persists after 3+ rounds):

**User Options:**
1. **Accept partial consensus** - Proceed with majority view, note the divergence
2. **Intervene with context** - Provide additional information to resolve disagreement
3. **Bring in additional agents** - Add specialized agents to break deadlock
4. **Defer decision** - Mark as "Phase 2+" and move forward on settled items
5. **Accept human override** - User makes the call, document rationale

**Implementation:**
- Constitution specifies escalation behavior (see CONSTITUTIONS.md)
- Default: After 3 rounds of debate, moderator flags for user decision
- User explicitly accepts outcome or intervenes

### 5.2 Session Control: /stop Command

**If user wants to stop deliberation mid-session:**

```bash
user: "Actually, let me think about this differently"
/stop
user: "New approach: what if we..."
```

**What happens:**
- `​/stop` command halts agent processing immediately
- Incomplete rounds are discarded
- Context is preserved for next prompt
- Session remains open; user can continue or start new topic

**Use cases:**
- Realize direction is wrong mid-session
- Get new information that changes the approach
- Refocus on core question after tangent

### 5.3 Stakeholder Review and Approval

**After each session: Spec Review & Diff**

```
Session Output
    ↓
Generate: spec.md (new) + spec-diff.md (what changed)
    ↓
Share with stakeholders/product owner
    ↓
Stakeholder reviews and approves
    ↓
Can proceed to implementation (if approved)
    ↓
OR send back to session with feedback
```

**What gets reviewed:**
- Complete specification (requirements, architecture, decisions)
- Change log (what's new vs previous version)
- Unresolved questions (decisions still pending)
- Risk flags (areas needing validation)

**Approval workflow:**
- Stakeholder can ask questions → returned to session with context
- Stakeholder can request changes → new session with focused topic
- Stakeholder approves → proceed to implementation

### 5.4 Facilitator Role and Monitoring

**The session facilitator (human or PM agent) ensures:**

1. **Stay on track**
   - Monitor conversation for topic drift
   - Flag if discussion goes off intended objectives
   - Gently redirect without interrupting deliberation

2. **Maintain focus**
   - Are we answering the right question?
   - Are we at appropriate scope for this phase?
   - Are we introducing unnecessary complexity?

3. **Escalate appropriately**
   - If consensus seems impossible, flag early
   - If key stakeholders' concerns being ignored, escalate
   - If technical concerns blocking progress, surface explicitly

4. **Document context**
   - Track why decisions were made
   - Note unresolved questions for next phase
   - Record assumptions that need validation

**Implementation:**
- Facilitator sees same chat as user
- Can use `/pause` to reflect during session
- Provides summary at key decision points
- No direct control over agents (does not interrupt)

---

## 6. Project Management Philosophy

### 6.1 Why Roundtable PM is NOT Traditional PM

**Traditional PM assumes:**
- Linear, sequential work (critical path)
- Human hours as primary currency
- Scope, schedule, budget as independent constraints
- Risks managed through documentation and mitigation plans

**Roundtable PM assumes:**
- Parallel, token-bounded work
- Agent tokens as primary currency (plus human hours and infrastructure)
- Scope, schedule, budget are interdependent (optimize tokens first)
- Risks handled through deliberation + learning loops
- Early feedback validation replaces extensive documentation

**Key differences:**

| Aspect | Traditional PM | Roundtable PM |
|--------|---|---|
| **Estimation** | "3 months, 5 people, $200K" | "85,000 tokens agents + 40 human hours + $5K infra" |
| **Risk Management** | Risk register + mitigation plans | Post-mortem learning + feedback validation |
| **Change Control** | Formal change request process | /stop + refocus + next session |
| **Schedule** | Gantt chart with dependencies | Phase-based with context compression |
| **Cost Model** | Headcount × rate × duration | Agent tokens + human hours + infrastructure |
| **Decision Making** | Stage-gate approval | Continuous deliberation with stakeholder review |
| **Quality** | Testing plans, metrics dashboards | Learning systems + post-mortem improvements |

### 6.2 Default Roundtable PM Skill

The default PM skill included with Roundtable:

**Does:**
✓ Facilitate deliberation (keep on track, summarize)
✓ Manage phase transitions (compressed context, feedback integration)
✓ Coordinate stakeholder review
✓ Track token budgets and costs
✓ Run post-mortems and capture learning

**Does NOT:**
✗ Create risk registers or mitigation plans
✗ Build Gantt charts or critical paths
✗ Enforce stage-gate processes
✗ Manage teams through traditional hierarchy
✗ Use human hours as primary scheduling metric

**Why this works:**
- Roundtable produces clear specs → less assumption, fewer implementation risks
- Post-mortem learning + feedback loops replace traditional risk management
- Context compression + phased approach replaces detailed scheduling
- Token budgeting is more accurate than human hour estimation

### 6.3 Custom PM Skills

Users can absolutely create custom PM skills:

```yaml
# Example: Enterprise PM Skill
skills/pm/enterprise-compliance:
  description: "PM for regulated industries"
  includes:
    - Risk register maintenance
    - Compliance checkpoints
    - Audit trail documentation
    - SOC2/ISO requirements tracking

# Example: Startup PM Skill
skills/pm/rapid-iteration:
  description: "PM for fast-moving startups"
  includes:
    - Weekly shipments
    - Tight token budgets
    - Market feedback priority
    - Ruthless scope management
```

Users can mix-and-match PM skills, creating custom Constitutions that enforce whatever PM discipline they need. Roundtable is unopinionated about PM; the default is just one option.

---

## 7. Operating Modes

### 7.1 Relevant Order Mode (Default)

**What happens:**
1. User writes prompt
2. Each model generates response
3. System ranks by relevance to the current spec/conversation
4. Displayed in order: highest relevance first

**Output format:**
```
=== RELEVANT ORDER ===

[1] Claude (0.92 relevance)
    → Response here...
    → Why this ranking: Strong architectural thinking, directly addresses spec ambiguity

[2] GPT-4 (0.87 relevance)
    → Response here...
    → Why this ranking: Good operational considerations, secondary to arch

[3] Gemini (0.75 relevance)
    → Response here...
    → Why this ranking: Valid but less directly applicable
```

**Ranking criteria:**
- Direct relevance to current spec ambiguities
- Addresses previous unresolved questions
- Introduces novel considerations
- Follows conversation thread coherently

---

### 7.2 Moderator Mode

**What happens:**
1. User writes prompt
2. Each model generates response
3. A specialized Moderator agent receives all responses
4. Moderator synthesizes into single coherent response

**Output format:**
```
=== MODERATOR SYNTHESIS ===

[Moderator Analysis]
Claude prioritizes X and Y
GPT-4 emphasizes Y and Z
Gemini adds consideration W

[Synthesis]
The three perspectives converge on: [unified recommendation]

Areas of agreement: [list]
Areas of divergence: [list]
   → Claude believes X because...
   → GPT-4 counters with Z because...
   → Recommended approach: [moderator's integration]

Open questions for human: [list]
```

**Moderator role:**
- Pre-prompted to be fair arbiter, not just summarizer
- Identifies genuine disagreement vs semantic difference
- Suggests resolution paths
- Flags when human input is needed

---

### 7.3 Debate Mode

**What happens:**
1. User writes prompt (or asks for comparison/is uncertain)
2. Models generate initial responses
3. Debate round 1: Each model critiques others' responses
4. Debate round 2: Models respond to critiques
5. Continue until convergence or timeout

**Output format:**
```
=== DEBATE MODE ===

[Initial Stances]
Claude: "This should be event-driven because..."
GPT-4:  "This should be request-response because..."
Gemini: "Hybrid approach makes sense because..."

[Round 1: Critiques]
Claude on GPT-4: "Request-response creates X problem..."
GPT-4 on Claude: "Event-driven introduces Y complexity..."
Gemini: "Both have merit, here's why hybrid..."

[Round 2: Responses]
Claude: "On the X problem, we can mitigate by..."
GPT-4:  "Gemini's hybrid actually means..."

[Convergence Analysis]
Agreement reached: Event-driven core with request-response facades
Remaining concerns: [list]
Human decision needed on: [list]
```

**Debate mechanics:**
- Explicitly truth-seeking, not just contrarian
- Models can agree/concede/build on each other
- Rounds continue until: consensus reached, no new arguments, timeout, OR user types `/continue`
- Tracks which points were most convincing

**Round flow:**
- User responds to panel output
- Panels see both user response AND other agents' responses
- New round automatically generated unless consensus/escalation/timeout triggered
- User can force additional round with `/continue` command
- User can end discussion with `/done` or `/accept` commands

---

### 7.3.1 Enhanced Debate Mode (V1.1+)

**Research-backed enhancements:** Based on "Improving Factuality and Reasoning in Language Models through Multiagent Debate" (Du et al., 2023), which demonstrated **8-15% accuracy improvements** through structured multi-agent deliberation.

**Three major enhancements:**

#### Evidence-Based Argumentation

Agents must tag claims with evidence types and provide sources:

```
Claude: "GraphQL provides better flexibility"
  Evidence Type: DOCUMENTED
  Source: GraphQL specification (https://spec.graphql.org)
  Confidence: HIGH

GPT-4: "REST is simpler for our team"
  Evidence Type: EMPIRICAL
  Source: Team survey - 5/5 engineers have REST experience
  Confidence: MEDIUM-HIGH
```

**Evidence types:** DOCUMENTED (0.90), EMPIRICAL (0.85), PRECEDENT (0.70), LOGICAL (0.60), PREFERENTIAL (0.40), SPECULATIVE (0.20)

#### Quantitative Convergence Metrics

Three metrics tracked per round:

1. **Semantic Similarity:** How similar are agent responses? (>0.80 = consensus)
2. **Position Shift:** How much did agents update views? (<0.05 = diminishing returns)
3. **Evidence Convergence:** Are agents citing same sources? (>0.60 = strong agreement)

**Display during debate:**
```
═══ CONVERGENCE METRICS ═══
Semantic Similarity:    0.84  ████████░░  84%  ✓ CONSENSUS
Position Shift (R2→R3): 0.12  █░░░░░░░░░  12%  ↻ Slowing
Evidence Convergence:   0.50  █████░░░░░  50%  ~ Moderate
```

#### Post-Mortem Learning Loop

After project completion, system learns:
- Which evidence types predicted accurate decisions?
- Which agents/panels were most accurate?
- What questions should have been asked?

**Learning compounds over time:**
- Project 1: 65% debate accuracy
- Project 5: 78% debate accuracy (+13%)
- Project 10: 85% debate accuracy (+20%)

**For complete details:** See [ENHANCED_DEBATE_MECHANICS.md](../03-spec-process/ENHANCED_DEBATE_MECHANICS.md)

**Token cost:** Enhanced debate uses ~54% more tokens but delivers 8-15% accuracy improvement and 3-10x ROI through better decisions.

**Enabling:** Use `evidence_based_debate` consensus algorithm or set `debate_policy: require_evidence: true` in Constitution.

---

## 8. Spec Artifact Management

### 8.1 Spec Format

**Primary format:** Markdown with structured sections

```markdown
# Spec: Real-Time Collaborative Editor

## Vision
[User's mental model converted to text]

## Core Requirements
- [Requirement 1]
- [Requirement 2]

## Architecture Decisions
- Decision: Event-driven core
  - Rationale: [why this was chosen]
  - Models agree: Claude, Gemini
  - Model concerns: GPT-4 raised X concern (mitigated by...)

## Unresolved Questions
- Q1: [question]
  - Claude suggests: [option A]
  - GPT-4 suggests: [option B]
  - Status: Needs human decision

## Constraints
- [Constraint 1]
- [Constraint 2]

## Out of Scope
- [Item]

## Iteration History
- Round 1: Initial spec from Claude + GPT-4 debate
- Round 2: Added Gemini perspective on scalability
```

### 8.2 Spec Evolution

- Spec lives in project (e.g., `spec.md`)
- Each deliberation round updates spec
- Change history tracked (what changed, why, which models influenced)
- Linked to model responses for traceability

### 8.3 Multimodal Input Support (V1.2+)

**Research foundation:** Based on "Tokenize and Embed ALL for Multi-modal Large Language Models" (TEAL), which demonstrates that unified tokenization across modalities enables LLMs to process diverse input types without architectural changes.

**Supported modalities:**

#### Images (V1.2)
- **Use cases:** UI wireframes, architecture diagrams, mockups, screenshots
- **Token cost:** ~2,000-3,000 tokens per image
- **Capabilities:** Visual hierarchy analysis, accessibility checks, diagram understanding
- **Models:** GPT-4 Vision, Claude 3, Gemini Pro Vision

**Example:**
```
User uploads: 3 wireframe options (PNG)
UX Panel (vision-capable):
  → Analyzes visual hierarchy, information density
  → Checks WCAG contrast ratios
  → Measures whitespace and balance
  → Provides objective scores (8.5/10, 6.2/10, 7.8/10)

Token cost: 7,500 input vs 2,000 for text description
Benefit: 10x more accurate analysis
```

#### Audio (V1.3)
- **Use cases:** User interviews, stakeholder meetings, customer feedback
- **Token cost:** ~500 tokens per minute
- **Capabilities:** Theme synthesis, pain point identification, tone analysis
- **Processing:** Whisper transcription + speaker diarization

**Example:**
```
User uploads: 3 user interviews (30 min each)
Product Panel (audio-capable):
  → Identifies themes: "Export too slow" (18 mentions)
  → Detects emotional cues: frustration, enthusiasm
  → Prioritizes by frequency + severity
```

#### Documents (V1.3)
- **Use cases:** Requirements PDFs, research papers, competitive analysis
- **Token cost:** ~1.5x text extraction
- **Capabilities:** Structure analysis, gap detection, cross-reference validation

**Example:**
```
User uploads: 20-page requirements PDF
Product Panel:
  → Analyzes structure (completeness: 65%)
  → Identifies gaps: missing success metrics, vague SLAs
  → Validates cross-references
```

**Token budget considerations:**
- Images: Expensive but justified for visual decisions
- Audio: High cost but captures tone and implicit themes
- Documents: Moderate cost for automated analysis

**Modality-aware routing:**
- Panels declare required/preferred modalities
- System routes to vision-capable models when images present
- Graceful degradation when modalities unavailable

**Configuration:**
```yaml
multimodal:
  image:
    enabled: true
    quality: "high"  # high, medium, low
  audio:
    enabled: true
    transcription: "whisper"
  documents:
    enabled: true
```

**For complete details:** See [MULTIMODAL_INPUT_HANDLING.md](MULTIMODAL_INPUT_HANDLING.md)

**ROI:** While multimodal inputs cost 2-5x more tokens than text, they deliver 10x more accurate analysis for visual, audio, and document-heavy use cases.

---

## 9. Constitution System

### 9.1 What is a Constitution?

A Constitution defines **governance for a roundtable project**. It specifies:
- **Who** participates (expert panels and agents)
- **How** decisions are made (consensus algorithm)
- **What** constraints apply (timeline, budget, compliance)
- **When** to escalate (governance rules)

Constitutions are **shareable, versioned, and customizable** - enabling a marketplace of reusable governance templates.

### 9.2 Constitution Structure (YAML)

```yaml
constitution:
  name: "Standard E-Commerce"
  version: "1.0"

  # PANELS: Who participates and how?
  panels:
    architecture:
      agents:
        - model: claude-opus
          role_template: "enterprise-architect-v1"
        - model: gpt-4
          role_template: "enterprise-architect-v1"

    ux:
      agents:
        - model: claude-opus
          role_template: "ux-designer-v1"
        - model: gpt-4
          role_template: "ux-designer-v1"

    security:
      agents:
        - model: claude-opus
          role_template: "security-architect-v1"

    data:
      agents:
        - model: claude-opus
          role_template: "data-engineer-v1"
        - model: claude-sonnet
          role_template: "data-engineer-v1"

    product:
      agents:
        - model: gpt-4
          role_template: "product-manager-v1"

  # CONSENSUS: How do we decide?
  consensus_algorithm: "democratic_majority"  # or reference custom file

  # CONSTRAINTS: What are the rules?
  constraints:
    - name: "Timeline"
      value: "12 weeks"
      enforced_by: "product"
    - name: "Budget"
      value: "$500k"
      enforced_by: "product"
    - name: "Security Standards"
      value: "OWASP Top 10, SOC2"
      enforced_by: "security"

  # ESCALATION: How do we handle disagreement?
  escalation:
    - if: "cross_domain_concern_raised"
      then: "affected_panels_respond"
      timeout: 2  # rounds
      fallback: "moderator_decides"

    - if: "unresolved_after_3_rounds"
      then: "human_review_required"

    - if: "security_veto"
      then: "halt_and_require_override"
```

### 9.3 Pre-Prompt System

See EXPERT_PANELS.md for detailed pre-prompt structure including:
- Domain boundaries (what this role owns)
- Cross-domain triggers (when to escalate)
- Consensus instructions (how to debate within panel)

### 9.4 Quick-Start: Default Constitution

```bash
$ roundtable new my-project
? Select Constitution template:
  ❯ Default (Quick Start)
    Industry: E-Commerce
    Industry: Healthcare
    Industry: SaaS
    Custom...

✓ Using Default Constitution
✓ Panels configured: 5
✓ Ready to deliberate!
```

Users can create projects instantly with sensible defaults, then customize later.

---

## 10. User Workflows

### 10.1 Workflow: From Vague Idea to Spec

```
User: "I want to build something like Figma but for code"

[Relevant Order Mode]
Claude (0.95): "This means collaborative real-time code editor with design canvas..."
GPT-4 (0.88): "Building in browser means WebSocket + CRDT..."
Gemini (0.82): "You'll need multiplayer conflict resolution..."

User: "How do we handle merge conflicts?"

[Moderator Mode → Synthesis]
"All models agree CRDT is foundational.
Claude emphasizes operational transform as alternative.
GPT-4 points out CRDT libraries exist.
Recommendation: Use existing CRDT library (Yjs or Automerge)"

User: "But what about performance at 100 concurrent users?"

[Debate Mode → Explicit disagreement]
Claude vs GPT-4: Event-driven vs polling
Gemini: "Both work, but event-driven scales better"
Result: Architecture decision made with tradeoff analysis

[Spec Updated]
Architecture → Event-driven with WebSocket + Yjs CRDT
Known scalability boundary: 100 concurrent users tested
```

### 10.2 Workflow: Testing Architectural Decision

```
User asks question that reveals spec ambiguity:
"Wait, how do we handle offline editing?"

[Debate Mode Triggered]
Claude: "Sync on reconnect with CRDT handles this"
GPT-4: "But what about conflict UI for users?"
Gemini: "Need offline queue + conflict resolution UI"

Output updates spec with discovered requirement:
"Requirements → Add: Offline queue visualization + merge conflict UI"
```

---

## 11. Platform Strategy: CLI-First, Then Web/Mobile

### 11.1 V1: CLI-Only

Roundtable V1 is **CLI-first and CLI-only**. This approach:
- ✅ Reduces complexity (focus on core deliberation engine)
- ✅ Faster time to market (no UI framework dependencies)
- ✅ Works for developers (natural audience for CLI tools)
- ✅ Enables rapid iteration (easier to change CLI than UI)
- ✅ Separates concerns (engine ≠ interface)

**V1 CLI Commands:**
```bash
roundtable init my-project                    # Create new roundtable
roundtable ask "Design user auth flow"        # Prompt panels
roundtable mode relevant-order                # View mode: collapsed panels
roundtable mode moderator                     # View mode: synthesized
roundtable spec show                          # Display current spec
roundtable spec export --format markdown      # Export spec to file
roundtable spec export --format json          # Export for programmatic use
roundtable config show                        # Show Constitution
roundtable notes export --format markdown     # Export organized notes
```

**V1 CLI Output:**
```
┌─────────────────────────────────────────────────┐
│ ARCHITECTURE PANEL         [2,847 tokens] ▼   │
│ UX PANEL                   [1,234 tokens] ▼   │
│ SECURITY PANEL             [3,456 tokens] ▼   │
│ DATA PANEL                 [2,106 tokens] ▼   │
│ PRODUCT PANEL              [892 tokens] ▼     │
└─────────────────────────────────────────────────┘
```

### 11.2 V2+: Web/Mobile Interfaces

**V2: Web UI** (after CLI is stable)
- Same deliberation engine (backend)
- Web interface (React/Vue/Svelte)
- Real-time panel updates
- Collaborative editing of specs
- Export to multiple formats

**V2+: Mobile App** (after web is stable)
- Mobile-optimized UI
- Works on iOS/Android
- Offline support where possible
- Push notifications for panel updates

**V3+: VS Code Extension** (after web/mobile established)
- Embedded Roundtable in editor
- Inline spec editing
- Quick access to panels from editor
- Integration with codebase context

### 11.3 Why CLI-First?

```
Data Flow Architecture:
┌─────────────────────────────────────┐
│   Deliberation Engine (Core)        │
│   ├─ Panel orchestration            │
│   ├─ Consensus algorithms           │
│   ├─ Cross-domain logic             │
│   └─ Spec management                │
└────────┬────────────────────────────┘
         │
    ┌────┴────────┬──────────────┬──────────────┐
    │             │              │              │
┌───▼──┐      ┌──▼────┐    ┌───▼────┐    ┌───▼────┐
│ CLI  │      │ Web   │    │ Mobile │    │ VS Code│
│ V1   │      │ V2    │    │ V2+    │    │ V3+    │
└──────┘      └───────┘    └────────┘    └────────┘
```

**Key principle:** Separate the engine (deliberation logic) from the interface (CLI, web, mobile, IDE).

V1 focuses on building a rock-solid engine via CLI.
V2+ adds interfaces as needed, reusing the same engine.


---

## 12. Default Agents and Skills (V1 Development)

### 12.0 Overview

Roundtable V1 ships with **default agents and skills** that enable immediate use for **software development teams** (our target user base). These defaults are:

1. **Ready-to-use** - Users don't need to configure agents from scratch
2. **Customizable** - Users can replace or extend with custom skills
3. **Software-dev focused** - Panels, roles, and expertise tuned for typical software projects
4. **Not exclusive** - Other users (marketers, medical professionals, etc.) can create custom skills for their domains

### 12.1 Default Meeting Facilitator

**Component:** PM (Project Manager) Agent
- Manages session flow and keeps deliberation on track
- Monitors for scope drift and off-topic discussion
- Synthesizes decision points and summaries
- Flags consensus issues or escalation needs
- Tracks timeline and manages stakeholder communication

**Customizable via:** Constitution and PM skill configuration

### 12.2 Default PM Agent

**Component:** Project Management Skill (default Roundtable PM, not traditional PM)
- Facilitates transitions between phases
- Tracks token budgets and costs
- Manages post-mortem processes
- Coordinates stakeholder review
- Handles context compression for next phases

**Note:** This is token-based, learning-system PM—NOT traditional PMBOK-style PM.

### 12.3 Default Expert Panels (Software Development)

**V1 includes pre-configured panels for typical software projects:**

```
├─ ARCHITECTURE PANEL
│  ├─ Systems/Infrastructure Architecture
│  ├─ Data Architecture
│  └─ (Agents: Claude Opus, GPT-4)
│
├─ UX PANEL
│  ├─ UX Design & User Research
│  ├─ Interaction Design
│  └─ (Agents: Claude Sonnet, Gemini)
│
├─ PRODUCT PANEL
│  ├─ Product Management
│  ├─ Market Positioning
│  └─ (Agents: GPT-4, Claude Opus)
│
├─ SECURITY PANEL
│  ├─ Security Architecture
│  ├─ Threat Modeling
│  └─ (Agents: Claude Opus)
│
└─ ENGINEERING PANEL
   ├─ Backend Engineering
   ├─ Frontend Engineering
   └─ (Agents: Claude Sonnet, GPT-4)
```

**Each panel member uses a corresponding Skill** (see below)

### 12.4 Default Skills (Software Development)

**V1 includes pre-built skills for:**

- **architecture/systems-architect** - Full-stack architecture thinking
- **architecture/data-architect** - Database and data architecture
- **ux/interaction-designer** - UX/UI and user research
- **product/product-manager** - Product strategy and roadmap
- **security/threat-modeler** - Threat modeling and security architecture
- **engineering/backend-engineer** - Backend systems and infrastructure
- **engineering/frontend-engineer** - Frontend, mobile, client-side

**Each skill includes:**
- Domain expertise definition
- Questions to ask during intake
- Areas to probe and validate
- Cross-domain concerns to flag
- Guidance on consensus building

### 12.5 Customization Examples

**Users can create alternative setups:**

```yaml
# Marketing Plan Deliberation
# (User creates custom skills/panels)

panels:
  marketing:
    - market-research-analyst
    - brand-strategist
    - growth-marketer

  business:
    - financial-analyst
    - business-strategist
    - competitive-analyst
```

```yaml
# Medical Diagnostic Deliberation
# (User creates custom skills/panels)

panels:
  clinical:
    - primary-care-physician
    - specialist-cardiologist
    - specialist-neurologist

  diagnostic:
    - pathologist
    - radiologist-interpretive
```

**The engine is domain-agnostic.** Default software-dev panels are just one example.

### 12.6 Default Constitution

**V1 ships with "Standard Software Development" Constitution:**

```yaml
constitution:
  name: "Software Development (Default)"

  panels:
    architecture: [claude-opus, gpt-4]
    ux: [claude-sonnet, gemini]
    product: [gpt-4, claude-opus]
    security: [claude-opus]
    engineering: [claude-sonnet, gpt-4]

  consensus_algorithm: "democratic_majority"

  escalation:
    - if: "unresolved_after_3_rounds"
      then: "human_review_required"

    - if: "security_concern_raised"
      then: "affected_panels_respond"
```

Users can:
- Use as-is (immediate productivity)
- Customize panels (add/remove agents or panels)
- Create alternative Constitutions for different project types
- Stack multiple Constitutions (run marketing + technical deliberation separately)

---

## 13. Phased Development Strategy

### 13.1 Default: Single-Pass with Phase 1

**Default mode for Roundtable V1:**
- Single comprehensive roundtable session
- Produces one phase (Phase 1) specification
- Phase 1 includes: MVP + POC (proof of concept feature)
- Delivered to developers for implementation
- Users get implementation feedback → informs future phases (if wanted)

**Think of it as:** One deep deliberation session → one complete spec → one implementation cycle

### 13.2 When to Use Phased Development

Switch to **explicit phased planning** ONLY if your project is:

1. **Complex** - Has multiple distinct capabilities/domains to validate
   - Example: "Build collaboration platform" (too broad for one phase)
   - Better: Phase 1 "single-user foundation", Phase 2 "team features"

2. **Trying to prove multiple things** - Each phase needs different validation
   - Example: Phase 1 proves "offline-sync is viable", Phase 2 proves "team collaboration works"
   - Each phase is a complete hypothesis test

3. **Dependent features** - Later features build on earlier ones
   - Example: Phase 2 depends on Phase 1 foundation
   - Justifies waiting for Phase 1 feedback before designing Phase 2

**Do NOT use phased if:**
- ✗ You can describe complete vision in one session
- ✗ Features are independent (can build in any order)
- ✗ You want complete solution before any implementation

### 13.3 Phase 1: The Only Default Phase

**Key principle:** Phase 1 is the only "required" phase.

```
User Vision
    ↓
Phase 1 Roundtable Session (mandatory)
    ├─ Creates spec with MVP + POC
    ├─ MVP = minimum usable version
    └─ POC = what we're proving/validating
    ↓
Phase 1 Implementation
    ↓
User Review → Do we need Phase 2?
    ├─ YES: "This works, let's extend"  → Phase 2 session (with Phase 1 context)
    ├─ NO: "This is enough"  → Done
    └─ MAYBE: "Let's validate with users first"  → Get feedback → Inform Phase 2
```

**Phase 1 always includes:**
- Complete spec for that scope
- Architecture decisions validated through deliberation
- Explicit constraints (what's NOT in Phase 1)
- Clear success criteria
- Handoff to developers

**Phase 2+ are optional:**
- Only created if Phase 1 + user feedback + market signal justify continuation
- Each phase starts with compressed context from previous phases
- Learning compounds (skills improve, decisions get better)

### 13.4 Phase 1 Structure (MVP + POC)

Every Phase 1 must define:

**MVP (Minimum Viable Product):**
```
The smallest complete, shippable thing.
Not "basic features" but "core value realized"

Examples:
- Note app: Create, edit, search notes (one user)
- Task manager: Create, organize, complete tasks
- Collaboration tool: View shared content (read-only first)
```

**POC (Proof of Concept):**
```
What technical innovation does THIS phase validate?
What assumption are we testing?

Examples:
- Note app: "Offline-first sync works without data loss"
- Task manager: "Real-time updates sync under 500ms"
- Collab tool: "Conflict-free updates with CRDT"
```

**NOT in Phase 1:**
```
Explicit constraints on what's explicitly deferred.
Users know these are Phase 2/3/later

Examples:
- Note app: No team features (Phase 2), no rich media (Phase 3)
- Task manager: No permissions (Phase 2), no templates (Phase 3)
- Collab tool: No advanced permissions (Phase 2), no SSO (Phase 3)
```

### 13.5 Context Compression Between Phases

The key to phased efficiency: **Context Compression**

```
Phase 1 Roundtable (2+ hours of deliberation)
    ↓
Compress to essentials:
├─ Settled architectural decisions (1-2 sentences)
├─ Validated technical approaches (1 sentence)
├─ Performance baselines (1 sentence)
├─ User preferences discovered (1 sentence)
└─ Explicit constraints confirmed (1 sentence)
    ↓
Phase 2 doesn't re-debate Phase 1
Phase 2 builds on validated foundation
Phase 2 focused on new questions (team sync, not offline sync)
```

**Without compression:** Phase 2 wastes 30+ minutes re-understanding Phase 1
**With compression:** Phase 2 immediately productive

---

## 13. Success Criteria

### For Individual Deliberation Round
- [ ] All configured panels responded
- [ ] Responses ranked/synthesized appropriately
- [ ] New information surfaced vs previous rounds
- [ ] Ambiguities identified or resolved

### For Complete Spec
- [ ] No "assumptions" remain (turned into explicit decisions or questions)
- [ ] All panels converged on core architecture
- [ ] Unresolved questions explicitly marked
- [ ] Constraints documented
- [ ] Implementation team could build from this spec with <X assumptions

---

## 14. V1 vs V2: Phased Approach to Panel Intelligence + UI

### V1 Philosophy: Natural Training Differences Without Role Bias

**Core idea:** Instead of assigning roles (e.g., "Claude is threat modeling expert"), let agents contribute from their natural training.

**V1 Approach:**
```
Panel Setup (Simple):
  security:
    agents:
      - claude-opus
      - gpt-4
    # No role assignment - they are just security experts

Pre-prompts (Minimal):
  You are a security expert.
  Contribute your natural perspective across the full security domain.
  Don't limit yourself to a predetermined role.

Result:
  - Claude naturally thinks systematically about threats + architecture
  - GPT-4 naturally thinks about compliance + practical implementation
  - Authentic debate emerges from different thinking styles
  - We collect data on which models excel at what
```

**Benefits:**
- ✅ Authentic contributions (no role-play)
- ✅ Produces better debate (genuine differences, not scripted)
- ✅ Less implementation complexity (no role templates)
- ✅ Creates foundation data for V2

### V2+ Philosophy: Evidence-Based Team Formation

After V1 projects, we form explicit teams based on observed patterns.

**V2 Approach:**
```
Analyze V1 Behavior:
  When answering security questions:
  - Claude naturally focused on threat modeling 40% of the time
  - GPT-4 naturally focused on compliance 45% of the time
  - Both covered all areas, but with different emphasis

Form Teams (Based on Data):
  security:
    threat_modeling_team:
      agents: [claude-opus, gemini]
      learned_focus: "attack analysis, vulnerabilities"
    compliance_team:
      agents: [gpt-4, claude-sonnet]
      learned_focus: "standards, audit trails"

Result:
  - Teams have deeper expertise (specialized by evidence, not assumption)
  - Better performance (agents focus on strengths)
  - Still authentic (based on V1 behavior, not guesses)
```

**Benefits:**
- ✅ Informed specialization (based on V1 data, not assumptions)
- ✅ Deeper expertise (agents focus on proven strengths)
- ✅ Evolutionary (learning builds over time)
- ✅ Evidence-driven (not philosophical)

---

## 15. Scope: V1 (CLI-Only)

### In Scope
**Skills System (Layer 0):**
- [ ] Skill YAML format and structure
- [ ] Local skill files (.roundtable/skills/)
- [ ] Official skill library (bundled with V1)
  - Architecture skills
  - UX skills
  - Security skills
  - Data skills
  - Product skills
- [ ] Skill documentation and examples
- [ ] CLI commands: `roundtable skill list/show`

**Constitution System (Layer 1):**
- [ ] Constitution system (YAML-based governance)
- [ ] Skill referencing in Constitutions
- [ ] Default Constitution template (quick-start)

**Expert Panels (Layer 2):**
- [ ] Multi-agent expert panels
- [ ] 2-3 foundational models (Claude, GPT-4)
- [ ] Panels reference skills (not embedded pre-prompts)
- [ ] Independent context memory per panel
- [ ] Cross-domain concern detection
- [ ] Panel-level consensus algorithms

**Deliberation Engine (Layer 3):**
- [ ] Mode Router (Relevant Order, Moderator modes)
- [ ] Consensus algorithm execution
- [ ] Response processing and ranking
- [ ] Token count visibility for all responses
- [ ] Organized notes output (expert notes by panel)
- [ ] Spec file generation and updates

**CLI Interface (Only):**
- [ ] CLI commands for initialization, prompting, mode switching
- [ ] Text-based output to terminal (ASCII tables, formatted text)
- [ ] Export to Markdown and JSON
- [ ] Configuration management via YAML files
- [ ] Local skill management

### Out of Scope (Future Versions)

**V2: Web UI**
- [ ] Web interface (React/Vue/Svelte)
- [ ] Real-time panel updates
- [ ] Collaborative spec editing
- [ ] Web-based mode switching

**V2+: Mobile App**
- [ ] iOS/Android native apps
- [ ] Mobile-optimized UI
- [ ] Push notifications

**V2+: Advanced Features**
- [ ] Team formation (after V1 behavior analysis)
- [ ] Skill composition (combining multiple skills)
- [ ] Git repository skill references (github:org/skills/...)
- [ ] Skill marketplace publishing and discovery
- [ ] Skill versioning enforcement (semver)
- [ ] Skill testing framework
- [ ] Auto-Debate mode
- [ ] Custom consensus algorithm DSL
- [ ] Constitution marketplace/sharing

**V3+: IDE Integration**
- [ ] VS Code extension
- [ ] Inline spec editing in editor

**Future (TBD timing)**
- [ ] Model fine-tuning
- [ ] Team/multi-user workflows
- [ ] Integration with implementation tools
- [ ] Spec-to-code generation
- [ ] Debate mode with inter-panel argumentation

---

## 16. Non-Functional Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| API Latency | <15s per round | Accept parallel model calls |
| Token Budget | <50k per round | Manage context carefully |
| Cost per Round | <$2 USD | Use efficient models for moderator |
| Spec File Size | <100KB | Markdown should stay human-readable |
| Context Retention | Full conversation | All models see same history |

---

## 17. Open Questions for Iteration

1. **Ranking Algorithm:** How exactly do we rank "relevance"? Learn from feedback? Fixed heuristics?
2. **Debate Convergence:** When does debate stop? Consensus only? Timeout? Max disagreement delta?
3. **Moderator Implementation:** Should moderator be a separate model or meta-prompt to Claude?
4. **Spec Format:** Markdown, JSON, DSL? How structured vs freeform?
5. **Team Workflows:** Is V1 solo user only, or multi-user from start?
6. **Implementation Integration:** How does spec hand off to coding agents? (V2 concern)
7. **Model Mix:** Should users mix closed (Claude/GPT-4) + open (Llama) models?
8. **Cost Model:** Freemium? Subscription? Per-roundtable? Per-token?

---

## 18. References & Research

### Learning and Evolution Documents

For deeper understanding of how Roundtable creates compounding value:

**Post-Mortem System** - How skills improve
- Location: `docs/roundtable-spec/03-spec-process/POST_MORTEM_SYSTEM.md`
- Describes: Session analysis, skill improvements, learning capture

**Context Compression** - How phases build efficiently
- Location: `docs/roundtable-spec/03-spec-process/CONTEXT_COMPRESSION.md`
- Describes: Carrying knowledge across phases, preventing re-debate

**Feedback Integration** - How implementation informs product
- Location: `docs/roundtable-spec/03-spec-process/FEEDBACK_INTEGRATION.md`
- Describes: QA feedback → Phase 2 planning loop

**Phased Development** - Complete phased strategy
- Location: `docs/roundtable-spec/02-agentic-pm/PHASED_DEVELOPMENT.md`
- Describes: Single-pass vs phased, phase planning, phase structure

### Reference Research

See `/docs/studies/` for foundational research:
- `Multi_Agent_Debate_Accuracy.pdf` - MIT research on debate mechanics
- `Roundtable_Policy_Weighted_Consensus.pdf` - Weighting and consensus frameworks
- `MARE_Requirements_Engineering.pdf` - Multi-agent requirements engineering
- `Multi_Agent_Coordination_Challenges.pdf` - Coordination and alignment issues
