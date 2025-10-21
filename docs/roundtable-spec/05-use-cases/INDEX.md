# Use Cases Index

This directory contains comprehensive use cases organized by feature and architecture layer:

---

## 🎯 START HERE: Real-World Session Walkthrough

### [USE_CASES_CLI_SESSION.md](USE_CASES_CLI_SESSION.md)
**Complete end-to-end example: myFive dating app vision meeting**

Watch Roundtable in action from start to finish:
- Generic Meeting Facilitator greets user (detects meeting type)
- Facilitator brings in PM to specialize for product vision
- PM introduces process (minimal words)
- User describes vision (myFive dating app: 5-match limit)
- 4 specialist panels form and debate (Product UX, Safety, Technical, Business)
- Panels ask hard questions, identify gaps, pressure-test assumptions
- PM synthesizes learning into Phase 1 development package
- Developers get concrete spec, roadmap, success criteria, and token budget

**Time:** 15-20 minutes to read
**Best for:** Understanding the full meeting flow, seeing how panels work in practice, learning what Phase 1 output looks like

---

## Documentation Structure

### [USE_CASES_BASIC_FLAT_MODEL.md](USE_CASES_BASIC_FLAT_MODEL.md)
**Original spec validation use cases - the foundation**

These are use cases that work with the basic Roundtable model where multiple models respond to prompts and are synthesized. Useful for understanding:
- How spec iteration works
- How modes (Relevant Order, Moderator, Debate) help refine specs
- How different personas use Roundtable for decision-making

**Key personas:**
- UC-1: Startup Founder (MVP planning)
- UC-2: Enterprise Architect (complex system design)
- UC-3: Solo Developer (feature design iteration)
- UC-4: Product Manager (requirement discovery)
- UC-5: Tech Lead (refactor evaluation)

**Best for:** Understanding basic Roundtable workflows and mode selection

---

### [USE_CASES_SKILLS.md](USE_CASES_SKILLS.md)
**Skills system: Reusable expertise as first-class artifacts**

These use cases showcase how the Skills system (Layer 0) enables flexible expert composition:
- How skills are composed into different configurations
- How skill versioning enables safe evolution
- How skills support team formation and learning

**Key scenarios:**
- UC-S1: Financial Services - Assembling skills from multiple sources (internal, marketplace, open-source)
- UC-S2: Skill Updates - Discovering a new threat and publishing an updated skill version
- UC-S3: Cross-Organization Marketplace - Healthcare compliance skills shared across organizations
- UC-S4: Automatic Team Formation - V2 future where Roundtable learns which skill combinations work best

**Best for:** Understanding how skills enable reusable, versioned, shareable expertise

---

### [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md)
**Expert panels with multi-agent teams per domain**

These use cases showcase the power of having multiple agents work together as domain experts:
- How panels reach internal consensus
- When and why cross-domain escalations occur
- How within-domain debate produces better decisions than individual agents

**Key scenarios:**
- UC-P1: Financial Services - Security panel (Threat Modeling + Compliance) reaches consensus on authentication
- UC-P2: Startup Product - UX panel (Interaction Design + Accessibility) debates design approach
- UC-P3: Healthcare - Security panel vetoes UX proposal, compromise found

**Best for:** Understanding how domain expertise is leveraged through panel structure

---

### [USE_CASES_CONSTITUTIONS.md](USE_CASES_CONSTITUTIONS.md)
**Pre-defined governance frameworks for different project types**

Constitutions eliminate the "how do we decide?" meta-debate by specifying governance upfront:
- Panel composition per project type
- Consensus algorithms appropriate to context
- Constraints and escalation rules

**Key scenarios:**
- UC-C1: Startup MVP - Product-Centric Fast Constitution (speed matters)
- UC-C2: Healthcare SaaS - Security-First Veto Constitution (compliance is absolute)
- UC-C3: Enterprise Refactor - Democratic Majority Constitution (multiple voices valued)
- UC-C4: Custom Constitution - Policy-Driven organization-specific governance

**Best for:** Understanding how Constitution pre-agreements eliminate deliberation friction

---

### [USE_CASES_CONSENSUS_ALGORITHMS.md](USE_CASES_CONSENSUS_ALGORITHMS.md)
**Different algorithms for different decision contexts**

Same question, different algorithms = different outcomes. Understand when each algorithm is appropriate:
- Democratic Majority (balanced perspectives)
- Security-First Veto (safety-critical decisions)
- Product-Centric Fast (timeline-constrained)
- Comprehensive Synthesis (research/documentation priority)

**Key scenarios:**
- UC-A1: Same question under four different algorithms
- UC-A2: Breaking ties with different algorithms
- UC-A3: Changing algorithms mid-project as context changes

**Best for:** Understanding governance flexibility and trade-offs between different decision-making models

---

## How to Use These Documents

### For Quick Understanding:
Start with [USE_CASES_BASIC_FLAT_MODEL.md](USE_CASES_BASIC_FLAT_MODEL.md) - it shows the foundation.

### For Implementation Planning:
Read [USE_CASES_SKILLS.md](USE_CASES_SKILLS.md) to understand skill composition.
Then [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md) to see skills in action within panels.
Then [USE_CASES_CONSTITUTIONS.md](USE_CASES_CONSTITUTIONS.md) for governance setup.

### For Deep Dives:
Each use case document is self-contained and can be read independently.

### For Reference:
When designing your own project, find the most similar use case and adapt its Constitution and consensus algorithm.

---

## Feature Relationship

```
USE_CASES_BASIC_FLAT_MODEL.md
└─ Foundation: Models respond independently
   ├─ Output modes: Relevant Order, Moderator, Debate
   └─ Result: Spec grows through iteration

USE_CASES_SKILLS.md
└─ Layer 0: Reusable expertise definitions
   ├─ Skill composition and versioning
   ├─ Marketplace and sharing
   ├─ Natural training differences emerge through skill selection
   └─ Result: Skills enable panel formation and team learning

USE_CASES_EXPERT_PANELS.md
└─ Layer 2: Multiple agents per domain (uses skills from Layer 0)
   ├─ Within-panel consensus
   ├─ Cross-domain escalation
   ├─ Panel composition defined by skills
   └─ Result: Clearer domain expertise

USE_CASES_CONSTITUTIONS.md
└─ Layer 1: Governance frameworks (references skills from Layer 0)
   ├─ Panel composition via skills
   ├─ Consensus algorithm selection
   ├─ Constraints enforcement
   └─ Result: Smooth deliberation without meta-debate

USE_CASES_CONSENSUS_ALGORITHMS.md
└─ Decision strategies: Context-appropriate algorithms
   ├─ Algorithm selection per project type
   ├─ Algorithm evolution mid-project
   └─ Result: Decisions reflect project values
```

---

## Persona Quick-Reference

| Persona | Best Document | Key Use Case |
|---------|---|---|
| Startup Founder | USE_CASES_BASIC_FLAT_MODEL (UC-1) + USE_CASES_CONSTITUTIONS (UC-C1) | Fast MVP decisions with product authority |
| Enterprise Architect | USE_CASES_BASIC_FLAT_MODEL (UC-2) + USE_CASES_CONSENSUS_ALGORITHMS (UC-A1) | Complex decisions with multiple perspectives |
| Solo Developer | USE_CASES_BASIC_FLAT_MODEL (UC-3) + USE_CASES_EXPERT_PANELS (UC-P2) | Design exploration and debate |
| Product Manager | USE_CASES_BASIC_FLAT_MODEL (UC-4) | Requirement discovery and unknowns surfacing |
| Tech Lead (Refactor) | USE_CASES_BASIC_FLAT_MODEL (UC-5) + USE_CASES_CONSENSUS_ALGORITHMS (UC-A2) | Risk-based decision making |
| CISO / Security Lead | USE_CASES_EXPERT_PANELS (UC-P1) + USE_CASES_CONSTITUTIONS (UC-C2) | Security consensus and veto authority |
| Healthcare Product | USE_CASES_EXPERT_PANELS (UC-P3) + USE_CASES_CONSTITUTIONS (UC-C2) | Compliance-first governance |

---

## Reading Sequence by Goal

### Goal: "I want to understand Roundtable basics"
1. Read: USE_CASES_BASIC_FLAT_MODEL.md (all 5 use cases)
2. Time: ~30 minutes
3. Outcome: Know how basic deliberation works

### Goal: "I need to set up my first project"
1. Read: USE_CASES_BASIC_FLAT_MODEL.md (skim modes)
2. Read: USE_CASES_SKILLS.md (understand available skills)
3. Read: USE_CASES_CONSTITUTIONS.md (find matching template)
4. Read: USE_CASES_EXPERT_PANELS.md (understand panel dynamics with skills)
5. Time: ~60 minutes
6. Outcome: Ready to `roundtable init` with appropriate Constitution and skills

### Goal: "I want to master Roundtable governance"
1. Read: All documents in order (foundation → skills → panels → constitutions → algorithms)
2. Focus on: USE_CASES_SKILLS + USE_CASES_CONSTITUTIONS + USE_CASES_CONSENSUS_ALGORITHMS
3. Time: ~2.5 hours
4. Outcome: Can compose skills, create custom Constitutions, and implement custom algorithms

### Goal: "I need help with specific decision"
1. Search across all documents for similar scenario
2. Adapt that Constitution and algorithm
3. Reference the use case in your spec for rationale

---

## Document Evolution

These use cases were created to validate Roundtable's architecture enhancements:

**V1 (Basic Model):**
- USE_CASES_BASIC_FLAT_MODEL.md - 5 foundational use cases

**V2 (Expert Panels + Constitutions + Skills Layer):**
- Added: USE_CASES_EXPERT_PANELS.md (multi-agent domain expertise)
- Added: USE_CASES_CONSTITUTIONS.md (governance frameworks)
- Added: USE_CASES_CONSENSUS_ALGORITHMS.md (decision algorithms)
- Added: USE_CASES_SKILLS.md (reusable expertise as first-class artifacts)
- Updated: USE_CASES_BASIC_FLAT_MODEL.md (integrated Constitution references)
- Result: Complete four-layer architecture (Layer 0: Skills → Layer 1: Constitution → Layer 2: Panels → Layer 3: Engine)

**Future (Marketplace + Learning + Community):**
- V2+ marketplace integration with versioning and publishing
- Learned team composition based on deliberation outcomes
- Community-contributed skills and Constitutions
- Marketplace templates with success stories and metrics

---

## Contributing Use Cases

To contribute a use case:

1. Choose category:
   - Basic flat model scenario → USE_CASES_BASIC_FLAT_MODEL.md
   - Skill composition/reusability scenario → USE_CASES_SKILLS.md
   - Multi-agent panel scenario → USE_CASES_EXPERT_PANELS.md
   - Constitution/governance scenario → USE_CASES_CONSTITUTIONS.md
   - Decision-making algorithm scenario → USE_CASES_CONSENSUS_ALGORITHMS.md

2. Follow format:
   ```markdown
   ### UC-X#: [Title]

   ### Persona
   - Name, role, context

   ### Scenario
   ```
   [Detailed example with system output]
   ```

   ### Key Insight
   What makes this a good use case?
   ```

3. Ensure:
   - Real-world applicable
   - Shows unique aspect of Roundtable
   - Includes actual deliberation (not just setup)
   - Clear outcome and learning

---

## Quick Decision Table: Which Constitution?

| Project Type | Constitution | Why |
|---|---|---|
| Startup MVP (shipping fast) | Startup MVP | Product authority, 4-panel lean setup |
| Enterprise System | Enterprise Hybrid | Multiple voices, complex decisions |
| Healthcare/Regulated | Healthcare HIPAA | Security veto, compliance enforcement |
| SaaS Product | SaaS (B2B) | Scalability focus, reliability critical |
| Internal Tool | Quick Start | Default, sensible for all small projects |
| Custom Org | [Custom] | Encode org-specific policies |

---

## Links to Reference Docs

For deeper understanding of underlying concepts:
- **Skills System:** See [SKILLS.md](SKILLS.md)
- **Expert Panels:** See [EXPERT_PANELS.md](EXPERT_PANELS.md)
- **Consensus Algorithms:** See [CONSENSUS_ALGORITHMS.md](CONSENSUS_ALGORITHMS.md)
- **Constitutions:** See [CONSTITUTIONS.md](CONSTITUTIONS.md)
- **System Architecture:** See [SPEC.md](SPEC.md)
