# Getting Started with Roundtable: Documentation Guide

Welcome! This guide helps you navigate the Roundtable documentation based on what you want to understand.

---

## 🚀 For First-Time Users: Start Here

### Step 1: Understand the Vision (15 minutes)

**Document:** [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md)

**What you'll learn:**
- Why Roundtable exists
- The meeting room paradigm
- How human creativity is amplified by AI
- The shift from "build fast" to "spec right"

**Key takeaway:** Roundtable helps you go from vague vision to complete spec through structured dialogue with expert panels.

### Step 2: See It In Action (20 minutes)

**Start here - complete walkthrough:**
- **[USE_CASES_CLI_SESSION.md](USE_CASES_CLI_SESSION.md)** - Real session: myFive dating app vision meeting
  - See: Meeting Facilitator detects meeting type → brings in PM → panels form → debates happen → Phase 1 package created
  - Best way to understand the full flow in 20 minutes

**Then choose role-specific examples:**
- **For Founders:** [USE_CASES_BASIC_FLAT_MODEL.md](USE_CASES_BASIC_FLAT_MODEL.md) - UC-1 "Startup Founder"
- **For Architects:** [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md) - UC-P1 "Financial Services Security"
- **For Product Teams:** [USE_CASES_CONSTITUTIONS.md](USE_CASES_CONSTITUTIONS.md) - UC-C1 "Startup MVP"

**Key takeaway:** See how vague ideas become concrete development packages through structured panel deliberation.

### Step 3: Understand How It Works (20 minutes)

**Documents (pick based on your role):**

- **How specs emerge:** [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md)
  - How panels deliberate and decisions emerge
  - Why this is better than pre-writing specs

- **How the facilitator works:** [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md)
  - The Project Manager's role in orchestrating sessions
  - How context is managed and conflicts resolved

- **Your level of involvement:** [USER_INTERACTION_CONTROL.md](USER_INTERACTION_CONTROL.md)
  - Choose how hands-on you want to be
  - From fully automated to co-creation

**Key takeaway:** Understand the mechanics of how a Roundtable session works.

### Step 4: Run Your First Session (30-60 minutes)

**Document:** [SPEC.md](SPEC.md) - Section 8 "User Workflows"

Follow the workflow for your use case:
- New idea: "From Vague Idea to Spec"
- Testing decision: "Testing Architectural Decision"

---

## 📚 For Deep Understanding: Core Concepts

### The Four-Layer Architecture

```
Layer 0: SKILLS
│        Reusable expertise definitions
│        → See: [SKILLS.md](SKILLS.md)
│
Layer 1: CONSTITUTION
│        Governance frameworks that reference skills
│        → See: [CONSTITUTIONS.md](CONSTITUTIONS.md)
│
Layer 2: EXPERT PANELS
│        Multi-agent domain teams using skills
│        → See: [EXPERT_PANELS.md](EXPERT_PANELS.md)
│
Layer 3: DELIBERATION ENGINE
│        Orchestrates panels and manages consensus
│        → See: [SPEC.md](SPEC.md) - Sections 4-5
```

### The Complete Session Flow

```
1. INTAKE PHASE
   Project Manager understands your vision
   → See: [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md) - Phase 1

2. SPEC EMERGENCE PHASE
   Panels deliberate and spec grows organically
   → See: [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md)

3. CONVERGENCE PHASE
   Conflicts resolved, decisions finalized
   → See: [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) - Phase 3

4. POST-MORTEM PHASE
   Learning captured, skills improved for future
   → See: [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md)
```

### The Learning Loop

```
Each Session Creates:
  ├─ Immediate Output: Complete Spec
  └─ Compounding Output: Skill Improvements

Skills Improve Over Time:
  Session 1 → Post-Mortem → Skills v1.1 →
  Session 2 (better) → Post-Mortem → Skills v1.2 →
  Session 3 (even better) → ...

→ See: [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md)
```

---

## 🎯 For Specific Roles

### I'm a Founder/Product Person

**Read in order:**
1. [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md) - Why this matters
2. [USER_INTERACTION_CONTROL.md](USER_INTERACTION_CONTROL.md) - Choose your level
3. [USE_CASES_BASIC_FLAT_MODEL.md](USE_CASES_BASIC_FLAT_MODEL.md) - See it in action
4. [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) - How decisions emerge

**Key documents:**
- [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md) - Understand facilitation
- [CONSTITUTIONS.md](CONSTITUTIONS.md) - Pre-agree on governance

**Time commitment:** 1-2 hours to fully understand

---

### I'm a Technical Architect

**Read in order:**
1. [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md) - Philosophy
2. [EXPERT_PANELS.md](EXPERT_PANELS.md) - How panels work
3. [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) - Spec emergence
4. [USER_INTERACTION_CONTROL.md](USER_INTERACTION_CONTROL.md) - Co-creation mode

**Key documents:**
- [SKILLS.md](SKILLS.md) - Architecture skill definitions
- [CONSTITUTIONS.md](CONSTITUTIONS.md) - Governance
- [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md) - See architecture decisions

**Time commitment:** 2-3 hours for deep understanding

---

### I'm Implementing Roundtable (Developer/Engineer)

**Read in order:**
1. [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md) - Context
2. [SPEC.md](SPEC.md) - Complete system spec
3. [EXPERT_PANELS.md](EXPERT_PANELS.md) - Panel management
4. [CONSTITUTIONS.md](CONSTITUTIONS.md) - Constitution loading
5. [SKILLS.md](SKILLS.md) - Skill loading and application
6. [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md) - Learning loop

**Key documents:**
- [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md) - Facilitator design
- [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) - Session flow
- [CONSENSUS_ALGORITHMS.md](CONSENSUS_ALGORITHMS.md) - Algorithm options

**Time commitment:** 4-6 hours for implementation readiness

---

### I'm Contributing Skills to the Marketplace

**Read in order:**
1. [SKILLS.md](SKILLS.md) - Skill system overview
2. [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md) - Context briefing
3. [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md) - Skill improvement loop
4. [USE_CASES_SKILLS.md](USE_CASES_SKILLS.md) - Skills in action

**Key documents:**
- [CONSTITUTIONS.md](CONSTITUTIONS.md) - How skills are composed
- [EXPERT_PANELS.md](EXPERT_PANELS.md) - How panels use skills

**Time commitment:** 2-3 hours

---

## 🗺️ Topic-Based Navigation

### Understanding Core Concepts

**What is Roundtable?**
→ [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md) + [SPEC.md](SPEC.md) Section 3

**How do AI models collaborate?**
→ [EXPERT_PANELS.md](EXPERT_PANELS.md) + [SPEC.md](SPEC.md) Section 5

**How do decisions get made?**
→ [CONSENSUS_ALGORITHMS.md](CONSENSUS_ALGORITHMS.md) + [CONSTITUTIONS.md](CONSTITUTIONS.md)

**How does the system learn?**
→ [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md)

---

### Practical Workflows

**I have a vague idea, how do I turn it into a spec?**
→ [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) + [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md)

**I need to involve my team - how do we set that up?**
→ [USER_INTERACTION_CONTROL.md](USER_INTERACTION_CONTROL.md) + [CONSTITUTIONS.md](CONSTITUTIONS.md)

**How do I choose which experts to involve?**
→ [EXPERT_PANELS.md](EXPERT_PANELS.md) + [SKILLS.md](SKILLS.md)

**I want my team to see how the AI experts think**
→ [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md)

---

### Advanced Topics

**How do I customize governance for my org?**
→ [CONSTITUTIONS.md](CONSTITUTIONS.md) Section 8 (Custom Constitutions)

**How do I create or improve a skill?**
→ [SKILLS.md](SKILLS.md) + [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md)

**I want to understand the facilitation process deeply**
→ [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md)

**What are the architectural tradeoffs?**
→ [SPEC.md](SPEC.md) Section 4 + [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) Example Session

---

### Project Management for Agentic Systems

**How do I plan and execute agentic projects?**
→ [AGENTIC_PROJECT_MANAGEMENT.md](AGENTIC_PROJECT_MANAGEMENT.md) - Core framework for agent-driven development

**How do I structure phases and allocate token budgets?**
→ [AGENTIC_EXECUTION_PLAN.md](AGENTIC_EXECUTION_PLAN.md) - Practical guide to execution planning

**How do I measure quality in agentic systems?**
→ [AGENTIC_QUALITY_VALIDATION.md](AGENTIC_QUALITY_VALIDATION.md) - Core metric: Vision Adherence vs. Cost

**How do I capture learning from agentic phases?**
→ [AGENTIC_LEARNING_CAPTURE.md](AGENTIC_LEARNING_CAPTURE.md) - Systematic knowledge preservation and reuse

---

## 📖 Complete Documentation Map

### Conceptual Documents (Philosophy & Design)
- [VISION_AND_PHILOSOPHY.md](VISION_AND_PHILOSOPHY.md) - Why Roundtable exists
- [SPEC.md](SPEC.md) - Complete system specification

### How It Works (Mechanics)
- [ITERATIVE_SPEC_EMERGENCE.md](ITERATIVE_SPEC_EMERGENCE.md) - How specs grow
- [PROJECT_MANAGER_AGENT.md](PROJECT_MANAGER_AGENT.md) - Facilitation role
- [POST_MORTEM_SYSTEM.md](POST_MORTEM_SYSTEM.md) - Learning loop

### User Control & Customization
- [USER_INTERACTION_CONTROL.md](USER_INTERACTION_CONTROL.md) - Your involvement level
- [CONSTITUTIONS.md](CONSTITUTIONS.md) - Governance frameworks
- [CONSENSUS_ALGORITHMS.md](CONSENSUS_ALGORITHMS.md) - Decision algorithms

### System Architecture
- [EXPERT_PANELS.md](EXPERT_PANELS.md) - Multi-agent domain teams
- [SKILLS.md](SKILLS.md) - Reusable expertise as artifacts

### Use Cases (Real-World Examples)
- [USE_CASES_INDEX.md](USE_CASES_INDEX.md) - Navigation guide for all use cases
- [USE_CASES_CLI_SESSION.md](USE_CASES_CLI_SESSION.md) - **START HERE**: Complete end-to-end session walkthrough (myFive dating app)
- [USE_CASES_BASIC_FLAT_MODEL.md](USE_CASES_BASIC_FLAT_MODEL.md) - Foundation scenarios
- [USE_CASES_EXPERT_PANELS.md](USE_CASES_EXPERT_PANELS.md) - Multi-agent examples
- [USE_CASES_CONSTITUTIONS.md](USE_CASES_CONSTITUTIONS.md) - Governance examples
- [USE_CASES_CONSENSUS_ALGORITHMS.md](USE_CASES_CONSENSUS_ALGORITHMS.md) - Algorithm examples
- [USE_CASES_SKILLS.md](USE_CASES_SKILLS.md) - Skills system examples

### Project Management for Agentic Systems
- [AGENTIC_PROJECT_MANAGEMENT.md](AGENTIC_PROJECT_MANAGEMENT.md) - Core PM framework for AI agents
- [AGENTIC_EXECUTION_PLAN.md](AGENTIC_EXECUTION_PLAN.md) - Planning and structuring agentic phases
- [AGENTIC_QUALITY_VALIDATION.md](AGENTIC_QUALITY_VALIDATION.md) - Quality metrics for agentic systems
- [AGENTIC_LEARNING_CAPTURE.md](AGENTIC_LEARNING_CAPTURE.md) - Systematic learning preservation

---

## ⏱️ Time Commitment by Goal

### "I want to understand Roundtable in one hour"
1. VISION_AND_PHILOSOPHY.md (15 min)
2. USE_CASES_CLI_SESSION.md (20 min) - **FASTEST WAY**: See the whole system in action
3. ITERATIVE_SPEC_EMERGENCE.md (25 min)

**Outcome:** Understand what Roundtable does, how sessions work, what Phase 1 output looks like

---

### "I want to run my first session"
1. VISION_AND_PHILOSOPHY.md (15 min)
2. USE_CASES_CLI_SESSION.md (20 min) - See what a real session looks like end-to-end
3. USER_INTERACTION_CONTROL.md (10 min)
4. Run your session (30-60 min) - Start with similar vision to myFive example

**Outcome:** Successfully create a spec through deliberation, understand what output to expect

---

### "I want to master Roundtable"
1. All conceptual documents (1 hour)
2. All mechanics documents (1.5 hours)
3. All architecture documents (1 hour)
4. Review use cases relevant to your role (1 hour)
5. Practice sessions (ongoing)

**Outcome:** Deep understanding of system, ready to customize and extend

---

### "I'm implementing Roundtable"
1. Core reading (4 hours) - see "Implementing Roundtable" section above
2. Architecture deep-dive (2 hours) - SPEC.md Sections 4-5
3. Review implementation examples (1 hour) - USE_CASES_*
4. Implementation planning (2+ hours)

**Outcome:** Ready to implement

---

## 🎓 Learning Paths by Persona

### Path 1: Founder (No Technical Background)

```
Day 1:
  • Morning: VISION_AND_PHILOSOPHY (15 min)
  • Morning: USER_INTERACTION_CONTROL (10 min)
  • Afternoon: Run your first session (60 min)
  • Evening: ITERATIVE_SPEC_EMERGENCE (30 min)

Day 2:
  • Morning: EXPERT_PANELS (20 min)
  • Morning: PROJECT_MANAGER_AGENT (20 min)
  • Afternoon: Run second session with new understanding (60 min)
  • Evening: POST_MORTEM_SYSTEM (20 min)

Day 3:
  • Pick two use cases relevant to your project
  • Run refined sessions based on learning
```

---

### Path 2: Technical Founder / Architect

```
Day 1:
  • Morning: VISION_AND_PHILOSOPHY (15 min)
  • Morning: SPEC.md Sections 1-5 (45 min)
  • Afternoon: EXPERT_PANELS (30 min)
  • Afternoon: ITERATIVE_SPEC_EMERGENCE (30 min)

Day 2:
  • Morning: SKILLS (30 min)
  • Morning: CONSTITUTIONS (30 min)
  • Afternoon: USER_INTERACTION_CONTROL (20 min)
  • Afternoon: PROJECT_MANAGER_AGENT (30 min)

Day 3:
  • Full session at Co-Creation level (90 min)
  • POST_MORTEM_SYSTEM (30 min)
  • Plan skill customizations for next session
```

---

### Path 3: Team Lead (Multiple Stakeholders)

```
Day 1:
  • VISION_AND_PHILOSOPHY (15 min)
  • ITERATIVE_SPEC_EMERGENCE (30 min)
  • CONSTITUTIONS (30 min)

Day 2:
  • Run team alignment session at Checkpoint level (90 min)
  • Review EXPERT_PANELS (20 min)
  • USER_INTERACTION_CONTROL (20 min)

Day 3:
  • Run full team deliberation session
  • POST_MORTEM_SYSTEM (30 min)
```

---

## 🔗 Document Relationships

```
VISION_AND_PHILOSOPHY
    └─ Why? How? The philosophy

PROJECT_MANAGER_AGENT ─── ITERATIVE_SPEC_EMERGENCE
    └─ Who facilitates?        └─ How does spec grow?

USER_INTERACTION_CONTROL
    └─ What's my involvement level?

CONSTITUTIONS ─── SKILLS ─── EXPERT_PANELS
    └─ Governance      └─ Expertise      └─ Teams

POST_MORTEM_SYSTEM ─── SKILLS (feedback loop)
    └─ Learning               └─ Improvement

PHASED_DEVELOPMENT ─── CONTEXT_COMPRESSION
    └─ Phase structure         └─ Context efficiency

SPEC.md (complete system architecture)
    └─ Technical details of all above

USE_CASES_* (see all concepts in action)
    └─ Real-world examples

AGENTIC PROJECT MANAGEMENT FRAMEWORK (FOR EXECUTION):
    ├─ AGENTIC_PROJECT_MANAGEMENT (Framework & principles)
    ├─ AGENTIC_EXECUTION_PLAN (Planning & token budgeting)
    ├─ AGENTIC_QUALITY_VALIDATION (Measuring vision adherence)
    └─ AGENTIC_LEARNING_CAPTURE (Preserving learning)
```

---

## ✅ Checklist: Before Your First Session

- [ ] Read VISION_AND_PHILOSOPHY.md
- [ ] Choose your USER_INTERACTION_CONTROL level
- [ ] Read USE_CASES_BASIC_FLAT_MODEL.md - find one like your project
- [ ] Review ITERATIVE_SPEC_EMERGENCE.md - understand the flow
- [ ] Optional: Read EXPERT_PANELS.md if you want domain detail
- [ ] Optional: Read PROJECT_MANAGER_AGENT.md for facilitation understanding
- [ ] Ready to start? Open CLI and run `roundtable init`

---

## ❓ FAQ

**Q: Which document should I read first?**
A: VISION_AND_PHILOSOPHY.md always. It explains why Roundtable exists.

**Q: I'm busy, what's the minimum I need to read?**
A: VISION_AND_PHILOSOPHY (15 min) + one use case (15 min). Then jump in.

**Q: I want to implement this, where do I start?**
A: SPEC.md (complete spec) + PROJECT_MANAGER_AGENT.md (facilitation).

**Q: I want to customize governance for my team.**
A: CONSTITUTIONS.md Section 8 (Custom Constitutions).

**Q: How do skills improve over time?**
A: POST_MORTEM_SYSTEM.md - explains the learning loop.

**Q: I don't have time to read all this.**
A: Start with VISION_AND_PHILOSOPHY.md (15 min), then dive in. Learn by doing.

---

## 📞 Need Help?

- **Conceptual question:** Check VISION_AND_PHILOSOPHY.md or relevant use case
- **Practical question:** Check USER_INTERACTION_CONTROL.md or project workflow in SPEC.md
- **Technical question:** Check SPEC.md or PROJECT_MANAGER_AGENT.md for system design
- **Use case question:** Check USE_CASES_INDEX.md for similar scenario

---

## 🚀 Next Steps

1. **Choose a path above** based on your role
2. **Start reading** with recommended documents
3. **Run your first session** - learning by doing is most effective
4. **Review POST_MORTEM_SYSTEM** after your session to plan improvements
5. **Iterate** - each session teaches you more

Welcome to Roundtable. Let's build something great.
