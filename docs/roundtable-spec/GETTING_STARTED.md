# Getting Started with Roundtable: Documentation Guide

Welcome! This guide helps you navigate the Roundtable documentation based on what you want to understand.

---

## 🚀 For First-Time Users: Start Here

### Step 1: Understand the Vision (15 minutes)

**Document:** [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md)

**What you'll learn:**
- Why Roundtable exists
- The meeting room paradigm
- How human creativity is amplified by AI
- The shift from "build fast" to "spec right"

**Key takeaway:** Roundtable helps you go from vague vision to complete spec through structured dialogue with expert panels.

### Step 2: See It In Action (20 minutes)

**Start here - complete walkthrough:**
- **[05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md)** - Real session: myFive dating app vision meeting
  - See: Meeting Facilitator detects meeting type → brings in PM → panels form → debates happen → Phase 1 package created
  - Best way to understand the full flow in 20 minutes
  - **Demonstrates:** Parallel round-based debate, token-based budgeting, spec emergence

**Then choose role-specific examples:**
- **For Founders:** [05-use-cases/BASIC_FLAT_MODEL.md](05-use-cases/BASIC_FLAT_MODEL.md) - UC-1 "Startup Founder"
- **For Architects:** [05-use-cases/EXPERT_PANELS.md](05-use-cases/EXPERT_PANELS.md) - UC-P1 "Financial Services Security"
- **For Product Teams:** [05-use-cases/CONSTITUTIONS.md](05-use-cases/CONSTITUTIONS.md) - UC-C1 "Startup MVP"

**Key takeaway:** See how vague ideas become concrete development packages through structured panel deliberation.

### Step 3: Understand How It Works (20 minutes)

**Documents (pick based on your role):**

- **How specs emerge:** [03-spec-process/ITERATIVE_SPEC_EMERGENCE.md](03-spec-process/ITERATIVE_SPEC_EMERGENCE.md)
  - How panels deliberate and decisions emerge
  - Why this is better than pre-writing specs

- **How the PM orchestrates:** [01-agents/PROJECT_MANAGER_AGENT.md](01-agents/PROJECT_MANAGER_AGENT.md)
  - The Project Manager's role in orchestrating sessions
  - How context is managed and conflicts resolved

- **Your level of involvement:** [00-core/USER_INTERACTION_CONTROL.md](00-core/USER_INTERACTION_CONTROL.md)
  - Choose how hands-on you want to be
  - From fully automated to co-creation

**Key takeaway:** Understand the mechanics of how a Roundtable session works.

### Step 4: Run Your First Session (30-60 minutes)

**Document:** [00-core/SPEC.md](00-core/SPEC.md) - Section 8 "User Workflows"

Follow the workflow for your use case:
- New idea: "From Vague Idea to Spec"
- Testing decision: "Testing Architectural Decision"

---

## 📚 For Deep Understanding: Core Concepts

### The Four-Layer Architecture

```
Layer 0: SKILLS (01-agents/SKILLS.md)
│        Reusable expertise definitions
│
Layer 1: CONSTITUTION (04-governance/CONSTITUTIONS.md)
│        Governance frameworks that reference skills
│
Layer 2: EXPERT PANELS (00-core/EXPERT_PANELS.md)
│        Multi-agent domain teams using skills
│
Layer 3: DELIBERATION ENGINE (00-core/SPEC.md)
│        Orchestrates panels and manages consensus
```

### The Complete Session Flow

```
1. INTAKE PHASE
   Meeting Facilitator detects meeting type
   Project Manager understands your vision
   → See: 01-agents/PROJECT_MANAGER_AGENT.md

2. PANEL FORMATION
   Panels selected based on vision type
   Agents assigned to panels
   → See: 00-core/EXPERT_PANELS.md

3. ROUND-BASED DEBATE
   Round 1: All agents speak in parallel
   Facilitator synthesizes groups concerns
   User responds
   Round 2+: Agents address each other naturally
   → See: 00-core/CONSENSUS_ALGORITHMS.md

4. SPEC EMERGENCE
   Panels deliberate and spec grows organically
   → See: 03-spec-process/ITERATIVE_SPEC_EMERGENCE.md

5. CONVERGENCE
   Conflicts resolved, decisions finalized
   Consensus algorithms apply
   → See: 00-core/CONSENSUS_ALGORITHMS.md

6. POST-MORTEM
   Learning captured, skills improved for future
   → See: 03-spec-process/POST_MORTEM_SYSTEM.md
```

### Token-Based Project Management

**Critical: All estimates use TOKENS, never human time**

```
Token Budget = Computational Work by AI Agents
Human Hours = Separate estimate for planning/QA oversight
Infrastructure = Cloud services, databases, APIs

Example: MVP Project
  48,000 tokens @ $0.01/token = $480
  15 hours @ $50/hour         = $750
  AWS infrastructure          = $2,000
  ────────────────────────────────
  TOTAL:                      = $3,230

vs. Traditional Dev Team: $50K+
```

→ See: [02-agentic-pm/AGENTIC_EXECUTION_PLAN.md](02-agentic-pm/AGENTIC_EXECUTION_PLAN.md#3-cost-model-tokens--human-hours--infrastructure)

---

## 🎯 For Specific Roles

### I'm a Founder/Product Person

**Read in order:**
1. [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md) - Why this matters
2. [00-core/USER_INTERACTION_CONTROL.md](00-core/USER_INTERACTION_CONTROL.md) - Choose your level
3. [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) - See it in action (complete example)
4. [03-spec-process/ITERATIVE_SPEC_EMERGENCE.md](03-spec-process/ITERATIVE_SPEC_EMERGENCE.md) - How decisions emerge

**Key documents:**
- [01-agents/PROJECT_MANAGER_AGENT.md](01-agents/PROJECT_MANAGER_AGENT.md) - Understand facilitation
- [04-governance/CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) - Pre-agree on governance
- [02-agentic-pm/AGENTIC_EXECUTION_PLAN.md](02-agentic-pm/AGENTIC_EXECUTION_PLAN.md) - Token-based budgeting

**Time commitment:** 1-2 hours to fully understand

---

### I'm a Technical Architect

**Read in order:**
1. [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md) - Philosophy
2. [00-core/EXPERT_PANELS.md](00-core/EXPERT_PANELS.md) - How panels work
3. [05-use-cases/EXPERT_PANELS.md](05-use-cases/EXPERT_PANELS.md) - Real example
4. [03-spec-process/ITERATIVE_SPEC_EMERGENCE.md](03-spec-process/ITERATIVE_SPEC_EMERGENCE.md) - Spec emergence
5. [00-core/USER_INTERACTION_CONTROL.md](00-core/USER_INTERACTION_CONTROL.md) - Co-creation mode

**Key documents:**
- [01-agents/SKILLS.md](01-agents/SKILLS.md) - Architecture skill definitions
- [04-governance/CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) - Governance frameworks
- [00-core/CONSENSUS_ALGORITHMS.md](00-core/CONSENSUS_ALGORITHMS.md) - Decision-making logic

**Deep dive:**
- [02-agentic-pm/AGENTIC_PROJECT_MANAGEMENT.md](02-agentic-pm/AGENTIC_PROJECT_MANAGEMENT.md) - Full PM framework

**Time commitment:** 2-3 hours for complete understanding

---

### I'm Building Roundtable (Implementation)

**Start with understanding:**
1. [00-core/SPEC.md](00-core/SPEC.md) - Complete system specification
2. [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) - End-to-end flow example
3. [00-core/EXPERT_PANELS.md](00-core/EXPERT_PANELS.md) - Panel architecture

**Then architecture & integration:**
- [01-agents/DEVELOPER_AGENT_INTEGRATION.md](01-agents/DEVELOPER_AGENT_INTEGRATION.md) - How to integrate external agents
- [01-agents/PROJECT_MANAGER_AGENT.md](01-agents/PROJECT_MANAGER_AGENT.md) - PM orchestration logic
- [00-core/CONSENSUS_ALGORITHMS.md](00-core/CONSENSUS_ALGORITHMS.md) - Decision algorithms

**For learning & improvement:**
- [03-spec-process/POST_MORTEM_SYSTEM.md](03-spec-process/POST_MORTEM_SYSTEM.md) - Skill evolution
- [03-spec-process/CONTEXT_COMPRESSION.md](03-spec-process/CONTEXT_COMPRESSION.md) - Token efficiency

**Implementation roadmap:** See IMPLEMENTATION_ROADMAP.md (at project root)

---

## 📁 Folder Structure

```
00-core/                 Core Roundtable concepts
├── SPEC.md             Main specification
├── VISION_AND_PHILOSOPHY.md
├── EXPERT_PANELS.md
├── CONSENSUS_ALGORITHMS.md
└── USER_INTERACTION_CONTROL.md

01-agents/              Agent definitions
├── PROJECT_MANAGER_AGENT.md
├── DEVELOPER_AGENT_INTEGRATION.md
└── SKILLS.md

02-agentic-pm/          Agentic Project Management Framework
├── AGENTIC_PROJECT_MANAGEMENT.md
├── AGENTIC_EXECUTION_PLAN.md (with token-based cost model)
├── AGENTIC_QUALITY_VALIDATION.md
├── AGENTIC_LEARNING_CAPTURE.md
└── PHASED_DEVELOPMENT.md

03-spec-process/        How specs emerge & evolve
├── ITERATIVE_SPEC_EMERGENCE.md
├── CONTEXT_COMPRESSION.md
├── FEEDBACK_INTEGRATION.md
└── POST_MORTEM_SYSTEM.md

04-governance/          Governance & compliance
├── CONSTITUTIONS.md
└── PROJECT_CHARTER_AND_INITIATION.md

05-use-cases/           Real examples & walkthroughs
├── INDEX.md            (Use case overview)
├── CLI_SESSION.md      (Complete myFive dating app example - START HERE)
├── BASIC_FLAT_MODEL.md
├── CONSENSUS_ALGORITHMS.md
├── CONSTITUTIONS.md
├── EXPERT_PANELS.md
└── SKILLS.md

06-reference/           Analysis & historical docs
├── PMP_ANALYSIS.md
└── PMP_RECOMMENDATIONS_SUMMARY.md
```

---

## ⚡ Quick Links

| I want to... | Read this |
|---|---|
| Understand what Roundtable is | [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md) |
| See a complete example | [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) |
| Learn token-based budgeting | [02-agentic-pm/AGENTIC_EXECUTION_PLAN.md#3-cost-model](02-agentic-pm/AGENTIC_EXECUTION_PLAN.md) |
| Understand panel debate flow | [00-core/SPEC.md](00-core/SPEC.md) (Section 3-4) |
| Build my own Roundtable | [IMPLEMENTATION_ROADMAP.md](../IMPLEMENTATION_ROADMAP.md) |
| Define governance for my project | [04-governance/CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) |
| Create custom skills | [01-agents/SKILLS.md](01-agents/SKILLS.md) |
| Understand consensus algorithms | [00-core/CONSENSUS_ALGORITHMS.md](00-core/CONSENSUS_ALGORITHMS.md) |
| Learn about post-mortems | [03-spec-process/POST_MORTEM_SYSTEM.md](03-spec-process/POST_MORTEM_SYSTEM.md) |

---

## 🎓 Learning Paths

### Fast Track (1 hour)
1. [00-core/VISION_AND_PHILOSOPHY.md](00-core/VISION_AND_PHILOSOPHY.md) - 15 min
2. [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) - 30 min
3. [00-core/SPEC.md](00-core/SPEC.md) (Sections 1-3) - 15 min

### Standard (2-3 hours)
- Fast Track +
- [00-core/EXPERT_PANELS.md](00-core/EXPERT_PANELS.md)
- [00-core/CONSENSUS_ALGORITHMS.md](00-core/CONSENSUS_ALGORITHMS.md)
- [02-agentic-pm/AGENTIC_EXECUTION_PLAN.md](02-agentic-pm/AGENTIC_EXECUTION_PLAN.md)

### Comprehensive (4+ hours)
- Standard + all documents in reading order by role above

---

## 🤔 FAQ

**Q: Where do I start?**
A: Read [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md) first. It shows the complete flow end-to-end.

**Q: What's different about this vs traditional PM?**
A: Token-based budgeting (no human time), parallel agent work, and organic spec emergence through structured debate.

**Q: Can I customize the panels?**
A: Yes - see [04-governance/CONSTITUTIONS.md](04-governance/CONSTITUTIONS.md) and [01-agents/SKILLS.md](01-agents/SKILLS.md).

**Q: How do I measure success?**
A: Vision Adherence Score - see [02-agentic-pm/AGENTIC_QUALITY_VALIDATION.md](02-agentic-pm/AGENTIC_QUALITY_VALIDATION.md).

---

## 📞 Need Help?

- **Architecture questions:** See [00-core/SPEC.md](00-core/SPEC.md)
- **Implementation questions:** See [IMPLEMENTATION_ROADMAP.md](../IMPLEMENTATION_ROADMAP.md)
- **Real example:** See [05-use-cases/CLI_SESSION.md](05-use-cases/CLI_SESSION.md)
- **Historical context:** See [06-reference/](06-reference/)
