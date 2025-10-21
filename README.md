# Roundtable: Multi-Model AI Deliberation System

**Roundtable** is a collaborative meeting platform where multiple AI models debate and pressure-test ideas in real-time, transforming vague visions into complete, validated specifications.

Instead of building wrong and iterating expensively, Roundtable helps you **specify right, then build**.

---

## 🎯 What Problem Does It Solve?

### Traditional Approach
```
Founder has vague idea
  → Spends weeks writing spec
  → Hands to dev team
  → 3 months of building
  → Realizes spec was wrong
  → Pivots & rebuilds
  → 6 months wasted
```

### Roundtable Approach
```
Founder has vague idea
  → Joins structured meeting with AI panels
  → Expert panels debate & pressure-test in real-time
  → Complete, validated spec emerges in 1-2 hours
  → Dev team builds confident product
  → Launch on-time, on-spec
```

---

## ⚡ Quick Start

**For Users:** See [.claude/docs/roundtable-spec/GETTING_STARTED.md](./.claude/docs/roundtable-spec/GETTING_STARTED.md)

**For Developers:** See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)

**For the Complete Spec:** Browse [.claude/docs/roundtable-spec/](./.claude/docs/roundtable-spec/)

---

## 🏗️ Project Structure

```
AgentRoundTableCLI/
├── .claude/
│   ├── CLAUDE.md                    Token-based estimation conventions
│   └── docs/
│       └── roundtable-spec/         Complete Roundtable specification
│           ├── 00-core/             Core concepts
│           ├── 01-agents/           Agent definitions
│           ├── 02-agentic-pm/       Agentic PM framework
│           ├── 03-spec-process/     Spec emergence & evolution
│           ├── 04-governance/       Governance & constitutions
│           ├── 05-use-cases/        Real examples
│           ├── 06-reference/        Historical analysis
│           └── GETTING_STARTED.md   Navigation guide
├── IMPLEMENTATION_ROADMAP.md         Build plan
└── README.md                         This file
```

---

## 🔑 Key Concepts

### Parallel Round-Based Debate
- **Round 1:** All agents speak simultaneously (no artificial sequencing)
- **Facilitator Synthesis:** Groups concerns by theme
- **User Input:** Single response to grouped concerns
- **Round 2+:** Agents see both user response AND other agents' responses, address naturally
- **Result:** Continuous dialogue until consensus or user says `/done`

### Token-Based Budgeting
**All estimates use TOKENS, never human time**

```
Cost = Agent Tokens + Human Hours + Infrastructure

Example: MVP Project
  48,000 tokens @ $0.01/token  = $480
  15 hours @ $50/hour          = $750
  AWS infrastructure           = $2,000
  ─────────────────────────────────
  TOTAL:                       = $3,230

vs. Traditional Dev Team: ~$50,000+
```

See: [.claude/CLAUDE.md](./.claude/CLAUDE.md)

### Expert Panels
Not roles - just different AI models selected for their thinking styles:
- **Claude** (depth & nuance)
- **ChatGPT** (reasoning & rigor)
- **Gemini** (pattern recognition & data)
- **Grok** (contrarian & edge cases)

Each panel debates independently, then synthesis emerges.

### Vision Adherence Score
Primary quality metric: **How well does the output match the user's vision at what cost?**

Not timeline-based, not feature-count-based. Pure alignment.

---

## 📖 Documentation Map

| Want to... | Read this |
|---|---|
| **Understand the system** | [.claude/docs/roundtable-spec/GETTING_STARTED.md](./.claude/docs/roundtable-spec/GETTING_STARTED.md) |
| **See a complete example** | [.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md](./.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md) |
| **Learn token budgeting** | [.claude/CLAUDE.md](./.claude/CLAUDE.md) |
| **Build Roundtable** | [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) |
| **Understand panels** | [.claude/docs/roundtable-spec/00-core/EXPERT_PANELS.md](./.claude/docs/roundtable-spec/00-core/EXPERT_PANELS.md) |
| **Learn PM framework** | [.claude/docs/roundtable-spec/02-agentic-pm/](./claude/docs/roundtable-spec/02-agentic-pm/) |
| **Define governance** | [.claude/docs/roundtable-spec/04-governance/CONSTITUTIONS.md](./.claude/docs/roundtable-spec/04-governance/CONSTITUTIONS.md) |

---

## 🚀 Implementation Status

### Specification: ✅ Complete
- [x] Core system design
- [x] Parallel debate mechanism
- [x] Token-based cost model
- [x] Token-based execution plans
- [x] Quality validation framework
- [x] Learning capture system
- [x] End-to-end CLI example
- [x] Agentic PM framework
- [x] Organized documentation

### Implementation: ⏳ Ready to begin
- [ ] Phase 1: CLI/Terminal UI
- [ ] Phase 2: Agent Orchestration
- [ ] Phase 3: Spec Output & Packages
- [ ] Phase 4: LLM API Integration

See: [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)

---

## 💡 Core Philosophy

> Roundtable amplifies human creativity, not replaces it.
>
> Instead of solo founders wrestling with decisions, or expensive teams debating slowly, Roundtable brings multiple expert perspectives to bear simultaneously - then lets humans decide.
>
> The result: Better specs, shipped faster, with less wasted capital.

---

## 🎓 Learning Paths

### Fast Track (1 hour)
1. This README
2. [.claude/docs/roundtable-spec/GETTING_STARTED.md](./.claude/docs/roundtable-spec/GETTING_STARTED.md) - First-time users section
3. [.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md](./.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md) - See it in action

### Standard (2-3 hours)
- Fast Track +
- [.claude/docs/roundtable-spec/00-core/SPEC.md](./.claude/docs/roundtable-spec/00-core/SPEC.md) - Full specification
- [.claude/docs/roundtable-spec/00-core/CONSENSUS_ALGORITHMS.md](./.claude/docs/roundtable-spec/00-core/CONSENSUS_ALGORITHMS.md) - Decision making
- [.claude/docs/roundtable-spec/02-agentic-pm/AGENTIC_EXECUTION_PLAN.md](./.claude/docs/roundtable-spec/02-agentic-pm/AGENTIC_EXECUTION_PLAN.md) - Token budgeting

### Comprehensive (4+ hours)
- Standard +
- All documents in [.claude/docs/roundtable-spec/](./.claude/docs/roundtable-spec/) by role

---

## 🤝 Contributing

This is a **specification-first** project. The implementation roadmap is in [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md).

### To Contribute
1. Read the spec first
2. Check the implementation roadmap for what phase to work on
3. Follow token-based estimation (see CLAUDE.md)
4. Update documentation as you go
5. Maintain the 6-folder structure

---

## 📞 Questions?

- **How does it work?** → [GETTING_STARTED.md](./.claude/docs/roundtable-spec/GETTING_STARTED.md)
- **Show me an example** → [CLI_SESSION.md](./.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md)
- **What should I build first?** → [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)
- **I want to customize it** → [CONSTITUTIONS.md](./.claude/docs/roundtable-spec/04-governance/CONSTITUTIONS.md)

---

## 📄 License

[Add your license here]

---

## 🙏 Acknowledgments

Built with token-based estimation conventions from CLAUDE.md and agentic project management framework. Inspired by deliberative democracy, expert panels, and the need for better spec practices in software development.
