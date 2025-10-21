# Roundtable Implementation Roadmap

**Status:** Specification complete, ready for implementation

**Token Budget:** 150,000-200,000 tokens across all phases

**Human Oversight:** ~40-60 hours total (architects, code review, QA coordination)

---

## 🎯 Vision

Build a CLI/Terminal application that enables structured multi-model AI deliberation for spec creation. Users input vague ideas, panels debate in real-time, specs emerge organically.

---

## 📋 Phase Breakdown

### Phase 1: Foundation & CLI Shell (~35,000 tokens)

**Objective:** Build minimal working CLI that can run a meeting session end-to-end

**Deliverables:**
- [ ] Terminal UI framework (clean, keyboard-navigable)
- [ ] Meeting Facilitator (generic meeting entry point)
- [ ] Context passing between phases
- [ ] Basic file I/O for session logs

**Estimated Effort:**
- Architecture & design: 6,000 tokens
- CLI implementation: 15,000 tokens
- Facilitator agent shell: 8,000 tokens
- Testing & iteration: 6,000 tokens

**Success Criteria:**
- User can start a meeting
- Facilitator asks "What would you like to discuss?"
- Context is captured and logged

**Tech Stack:**
- Language: TypeScript/Python (TBD)
- CLI Framework: Inquirer/Rich/Click
- Session Storage: JSON files (v1)

---

### Phase 2: Panel Formation & Agent Orchestration (~45,000 tokens)

**Objective:** Implement the panel debate system with parallel agent execution

**Deliverables:**
- [ ] Panel definition system (what panels exist, which agents to use)
- [ ] LLM integration layer (Claude, GPT, Gemini, Grok)
- [ ] Parallel execution engine (run agents simultaneously)
- [ ] Facilitator synthesis logic (group responses by theme)
- [ ] Round management (Round 1 → User Input → Round 2+)

**Estimated Effort:**
- LLM API integration: 12,000 tokens
- Panel orchestration: 15,000 tokens
- Parallel execution engine: 10,000 tokens
- Facilitator synthesis logic: 8,000 tokens

**Success Criteria:**
- All 4 panels can be called simultaneously
- Responses are grouped by facilitator
- Round flow works (Round 1 → synthesis → user input → Round 2)

**Tech Stack:**
- LLM APIs: OpenAI, Anthropic, Google, xAI
- Concurrency: asyncio (Python) or Promise.all (Node)
- Response parsing: JSON from LLM outputs

---

### Phase 3: Spec Output & Package Generation (~35,000 tokens)

**Objective:** Generate complete development packages from debate outcomes

**Deliverables:**
- [ ] Spec template system (standardized formats)
- [ ] Phase 1 development package generation
- [ ] Token budget calculation & reporting
- [ ] Markdown/PDF export

**Estimated Effort:**
- Spec generation logic: 12,000 tokens
- Package assembly: 10,000 tokens
- Export formats: 8,000 tokens
- Templates & examples: 5,000 tokens

**Success Criteria:**
- Complete Phase 1 package can be generated from debate
- Token budgets are calculated and displayed
- Exportable as markdown + JSON

**Tech Stack:**
- Template engine: Jinja2/Handlebars
- PDF generation: wkhtmltopdf or Puppeteer
- JSON/YAML handling: Native

---

### Phase 4: Polish & Integration (~25,000 tokens)

**Objective:** Production-ready CLI with full user experience

**Deliverables:**
- [ ] Session management (save/resume/list sessions)
- [ ] User preferences & configuration
- [ ] Error handling & recovery
- [ ] Help system & documentation
- [ ] Performance optimization
- [ ] Beta user testing & iteration

**Estimated Effort:**
- Session management: 8,000 tokens
- Configuration system: 5,000 tokens
- Error handling: 4,000 tokens
- Documentation & help: 4,000 tokens
- Performance & polish: 4,000 tokens

**Success Criteria:**
- CLI is intuitive and keyboard-friendly
- Sessions can be saved and resumed
- All error cases handled gracefully
- Complete user documentation

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              Roundtable CLI                          │
├─────────────────────────────────────────────────────┤
│  Terminal UI Layer (Rich/Inquirer)                  │
│  - User input handling                              │
│  - Output formatting                                │
│  - Session navigation                               │
├─────────────────────────────────────────────────────┤
│  Meeting Orchestration Layer                        │
│  - Facilitator (detects meeting type)               │
│  - PM (organizes panels)                            │
│  - Session manager (tracks state)                   │
├─────────────────────────────────────────────────────┤
│  Agent Execution Layer                              │
│  - LLM API clients (Claude, GPT, Gemini, Grok)      │
│  - Parallel execution engine                        │
│  - Round manager (1 → synthesis → 2+)               │
│  - Consensus algorithms                             │
├─────────────────────────────────────────────────────┤
│  Spec Generation Layer                              │
│  - Template engine                                  │
│  - Package generator                                │
│  - Token budget calculator                          │
│  - Export engine (MD/PDF/JSON)                      │
├─────────────────────────────────────────────────────┤
│  Data Layer                                         │
│  - Session storage (JSON/SQLite)                    │
│  - Configuration store                              │
│  - Skill/Constitution definitions                   │
│  - Template library                                 │
└─────────────────────────────────────────────────────┘
```

---

## 📈 Dependency Graph

```
Phase 1: Foundation
  ↓
Phase 2: Panel Formation & Agent Orchestration
  ├─ requires Phase 1 CLI shell
  ├─ requires Phase 1 context passing
  ↓
Phase 3: Spec Output
  ├─ requires Phase 2 debate outcomes
  ├─ requires Phase 2 round management
  ↓
Phase 4: Polish & Integration
  ├─ requires Phase 3 generation
  ├─ requires Phase 1-3 stability
```

**All phases CAN run in sequence or partially in parallel:**
- Phase 2 can begin while Phase 1 CLI shell is complete
- Phase 3 can prototype templates while Phase 2 is in progress
- Phase 4 polish can begin once any phase is functionally complete

---

## 🎯 Success Metrics

### Phase 1
✅ CLI launches and can capture user input
✅ Session data persists across runs
✅ Navigation is smooth and responsive

### Phase 2
✅ All 4 panel types can be executed
✅ Responses return within reasonable time (<30s)
✅ Round 2 agents see other agents' Round 1 responses

### Phase 3
✅ Complete spec generated from myFive example
✅ Token budgets calculated correctly
✅ PDF export is clean and readable

### Phase 4
✅ Beta users can run complete session independently
✅ Session resume works without data loss
✅ All error cases caught and recovered

---

## 🔑 Key Implementation Decisions (TBD)

- [ ] **Language:** TypeScript (Node.js) or Python?
  - Consideration: LLM SDK availability, deploy ease, dev team preference

- [ ] **LLM API Strategy:** Direct API calls or use SDK wrapper?
  - Consideration: Rate limiting, error handling, cost tracking

- [ ] **Database:** JSON files v1, or SQLite from start?
  - Consideration: Scalability, query needs, deployment

- [ ] **UI Framework:** Rich (Python) vs Inquirer (Node) vs custom?
  - Consideration: Responsiveness, keyboard support, customization

- [ ] **Deployment:** Standalone CLI binary, npm package, or Docker?
  - Consideration: Installation ease, update mechanism, portability

---

## 📅 Timeline Estimate (with parallelization)

**Assuming 1-2 developers working in parallel:**

- **Week 1:** Phase 1 (CLI foundation) - ~35K tokens
- **Week 2:** Phase 2 (Panel orchestration) - ~45K tokens (can start end of Week 1)
- **Week 3:** Phase 3 (Spec generation) - ~35K tokens (can start mid-Week 2)
- **Week 4:** Phase 4 (Polish) - ~25K tokens
- **Week 5:** Integration testing, beta launch

**Total:** ~4-5 weeks with 2 developers, ~140K tokens

---

## 🚀 First Implementation Task (Day 1)

**Start with Phase 1A: CLI Foundation**

```
1. Set up project structure
   - TypeScript/Python setup
   - CLI framework installed
   - Git initialized

2. Build terminal hello world
   - CLI runs
   - Accepts user input
   - Displays output

3. Implement meeting facilitator stub
   - Asks "What would you like to discuss?"
   - Captures response
   - Saves to session file

4. Test end-to-end
   - Start CLI
   - Enter some text
   - Verify saved
```

**Estimated Effort:** 1-2 days of work (~3,000-5,000 tokens)

---

## 📝 Next Steps

1. **Choose implementation language** (TypeScript or Python?)
2. **Set up development environment** (repo structure, dependencies)
3. **Design data models** (Session, Round, Response, Spec)
4. **Implement Phase 1A** (minimal CLI)
5. **Daily standups** (what was done, what's next, blockers)

---

## 📖 Reference Documents

- **Full Spec:** [.claude/docs/roundtable-spec/00-core/SPEC.md](./.claude/docs/roundtable-spec/00-core/SPEC.md)
- **CLI Use Case:** [.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md](./.claude/docs/roundtable-spec/05-use-cases/CLI_SESSION.md)
- **Token Estimation:** [.claude/CLAUDE.md](./.claude/CLAUDE.md)
- **Agent Integration:** [.claude/docs/roundtable-spec/01-agents/DEVELOPER_AGENT_INTEGRATION.md](./.claude/docs/roundtable-spec/01-agents/DEVELOPER_AGENT_INTEGRATION.md)
- **Consensus Algorithms:** [.claude/docs/roundtable-spec/00-core/CONSENSUS_ALGORITHMS.md](./.claude/docs/roundtable-spec/00-core/CONSENSUS_ALGORITHMS.md)

---

## ⚡ Critical Path Items

**MUST complete before Phase 2:**
- [ ] CLI can receive user input
- [ ] Session data persists
- [ ] Context passes between components

**MUST complete before Phase 3:**
- [ ] Agents can be called via API
- [ ] Responses are parsed correctly
- [ ] Round system works

**MUST complete before Phase 4:**
- [ ] Specs generate from real debate data
- [ ] Token budgets calculate correctly
- [ ] Exports are readable

---

## 🤔 Open Questions

1. Which language - TypeScript or Python?
2. Should we use existing LLM SDKs or direct API calls?
3. What's the priority - feature completeness or polish?
4. How many concurrent users on day 1?
5. Should we build web UI alongside CLI, or CLI-only first?

---

## 📞 Getting Started

1. Read this roadmap
2. Read [README.md](./README.md) for context
3. Read [.claude/docs/roundtable-spec/GETTING_STARTED.md](./.claude/docs/roundtable-spec/GETTING_STARTED.md) for full spec
4. Choose language & set up environment
5. Start with Phase 1A
6. Daily pushes to git
7. Keep this roadmap updated as you learn

---

**Last Updated:** Oct 21, 2024
**Status:** Ready for implementation
**Token Budget Remaining:** ~150-200K tokens available
