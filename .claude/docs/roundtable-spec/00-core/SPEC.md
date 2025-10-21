# Roundtable: Multi-Model Deliberation System for Vision Specification

## 1. Executive Summary

Roundtable is a CLI/VS Code extension that enables collaborative vision specification creation through multi-model deliberation. Instead of iterating on a partially-built product, users create increasingly precise specifications through structured dialogue with multiple AI models that debate, synthesize, and refine ideas toward convergence.

**Core Premise:** Specification is the new source of truth. The closer a spec resembles a user's vision, the faster and cheaper implementation becomes. Multi-model deliberation reduces the cost of spec refinement.

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

## 3. Core Concept: The Roundtable

### Purpose
A "roundtable" is a structured conversation space where multiple AI models collaborate on spec creation through different interaction modes.

### Key Insight
Different models have different:
- Training data and knowledge cutoffs
- Architectural strengths (reasoning, creativity, technical depth)
- Blindspots and biases
- Consensus-building patterns

Leveraging this diversity during planning reduces downstream implementation rework.

---

## 4. System Architecture

### 4.1 Four-Layer Architecture

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

### 4.2 Core Components

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

### 4.3 Data Flow: Single User Input

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

## 5. Operating Modes

### 5.1 Relevant Order Mode (Default)

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

### 5.2 Moderator Mode

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

### 5.3 Debate Mode

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

## 6. Spec Artifact Management

### 6.1 Spec Format

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

### 6.2 Spec Evolution

- Spec lives in project (e.g., `spec.md`)
- Each deliberation round updates spec
- Change history tracked (what changed, why, which models influenced)
- Linked to model responses for traceability

---

## 7. Constitution System

### 7.1 What is a Constitution?

A Constitution defines **governance for a roundtable project**. It specifies:
- **Who** participates (expert panels and agents)
- **How** decisions are made (consensus algorithm)
- **What** constraints apply (timeline, budget, compliance)
- **When** to escalate (governance rules)

Constitutions are **shareable, versioned, and customizable** - enabling a marketplace of reusable governance templates.

### 7.2 Constitution Structure (YAML)

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

### 7.3 Pre-Prompt System

See EXPERT_PANELS.md for detailed pre-prompt structure including:
- Domain boundaries (what this role owns)
- Cross-domain triggers (when to escalate)
- Consensus instructions (how to debate within panel)

### 7.4 Quick-Start: Default Constitution

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

## 8. User Workflows

### 8.1 Workflow: From Vague Idea to Spec

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

### 8.2 Workflow: Testing Architectural Decision

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

## 9. Platform Strategy: CLI-First, Then Web/Mobile

### 9.1 V1: CLI-Only

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

### 9.2 V2+: Web/Mobile Interfaces

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

### 9.3 Why CLI-First?

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

## 10. Success Criteria

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

## 11. V1 vs V2: Phased Approach to Panel Intelligence + UI

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

## 12. Scope: V1 (CLI-Only)

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

## 13. Non-Functional Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| API Latency | <15s per round | Accept parallel model calls |
| Token Budget | <50k per round | Manage context carefully |
| Cost per Round | <$2 USD | Use efficient models for moderator |
| Spec File Size | <100KB | Markdown should stay human-readable |
| Context Retention | Full conversation | All models see same history |

---

## 14. Open Questions for Iteration

1. **Ranking Algorithm:** How exactly do we rank "relevance"? Learn from feedback? Fixed heuristics?
2. **Debate Convergence:** When does debate stop? Consensus only? Timeout? Max disagreement delta?
3. **Moderator Implementation:** Should moderator be a separate model or meta-prompt to Claude?
4. **Spec Format:** Markdown, JSON, DSL? How structured vs freeform?
5. **Team Workflows:** Is V1 solo user only, or multi-user from start?
6. **Implementation Integration:** How does spec hand off to coding agents? (V2 concern)
7. **Model Mix:** Should users mix closed (Claude/GPT-4) + open (Llama) models?
8. **Cost Model:** Freemium? Subscription? Per-roundtable? Per-token?

---

## 15. References & Research

See `/docs/studies/` for foundational research:
- `Multi_Agent_Debate_Accuracy.pdf` - MIT research on debate mechanics
- `Roundtable_Policy_Weighted_Consensus.pdf` - Weighting and consensus frameworks
- `MARE_Requirements_Engineering.pdf` - Multi-agent requirements engineering
- `Multi_Agent_Coordination_Challenges.pdf` - Coordination and alignment issues
