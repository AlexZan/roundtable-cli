# Phase 1B: Panel System & Skills - Scope Definition

**Status:** Proposed (Awaiting User Approval)
**Created:** 2024-10-22
**Phase:** 1B of 4 (Phase 1 sub-phases)
**Dependencies:** Phase 1A complete ✅

---

## Scope Clarification (Following CLAUDE.md Guidelines)

### What WILL Be Built (Estimate: ~25,000 tokens)

#### 1. Skills Library System (~6,000 tokens)

**Purpose:** Independent, reusable expert definitions that can be versioned and shared.

**Components:**
- Skills directory structure: `.roundtable/skills/`
- YAML skill definition format
- Skill metadata (name, description, version, domain)
- System prompt templates per skill
- Skill loader and validator
- 5 example skills:
  - `architecture.yaml` - Software architecture expert
  - `security.yaml` - Security and compliance expert
  - `ux.yaml` - User experience expert
  - `product.yaml` - Product strategy expert
  - `data-engineering.yaml` - Data pipeline expert

**Token Breakdown:**
- Directory structure + loader: 1,500 tokens
- YAML format definition: 1,000 tokens
- Skill validator: 1,500 tokens
- 5 example skills: 2,000 tokens (400 each)

**Files Created:**
- `roundtable-cli/src/skills/loader.ts` - Skill loading logic
- `roundtable-cli/src/skills/validator.ts` - Skill validation
- `roundtable-cli/src/skills/types.ts` - Skill interfaces
- `.roundtable/skills/*.yaml` - 5 skill definitions
- `roundtable-cli/src/skills/loader.test.ts` - Tests

#### 2. Panel Definition System (~5,000 tokens)

**Purpose:** Define which skills compose a panel and when to use each panel.

**Components:**
- Panel YAML format
- Panel metadata (name, description, skills required)
- Panel selection logic (based on project type)
- 3 example panels:
  - `full-stack-web.yaml` - Architecture + UX + Security + Product
  - `data-platform.yaml` - Architecture + Data Eng + Security
  - `mobile-app.yaml` - Architecture + UX + Product

**Token Breakdown:**
- Panel format definition: 1,500 tokens
- Panel selector logic: 2,000 tokens
- 3 example panels: 1,500 tokens (500 each)

**Files Created:**
- `roundtable-cli/src/panels/types.ts` - Panel interfaces
- `roundtable-cli/src/panels/selector.ts` - Panel selection
- `.roundtable/panels/*.yaml` - 3 panel definitions
- `roundtable-cli/src/panels/selector.test.ts` - Tests

#### 3. Multi-Agent Panel Execution (~8,000 tokens)

**Purpose:** Support 3-5 agents per panel instead of just 2 hardcoded agents.

**Components:**
- Dynamic agent instantiation from skills
- Agent diversity within panels (different prompts, same skill)
- N-agent parallel execution (upgrade from 2)
- Intra-panel response grouping
- Agent metadata tracking (skill, panel, role)

**Token Breakdown:**
- Dynamic agent creation: 2,500 tokens
- N-agent execution engine: 3,000 tokens
- Response grouping: 1,500 tokens
- Tests: 1,000 tokens

**Files Modified:**
- `roundtable-cli/src/debate/engine.ts` - Support N agents
- `roundtable-cli/src/types.ts` - Add skill/panel metadata
- `roundtable-cli/src/debate/engine.test.ts` - Update tests

**Files Created:**
- `roundtable-cli/src/agents/factory.ts` - Agent creation from skills
- `roundtable-cli/src/agents/factory.test.ts` - Tests

#### 4. Enhanced CLI Integration (~4,000 tokens)

**Purpose:** Let users select panels or use auto-detection.

**Components:**
- Panel selection prompt (interactive)
- Auto-detection based on keywords
- Display panel composition before debate
- Show agent count and skills used

**Token Breakdown:**
- CLI panel selection: 2,000 tokens
- Auto-detection logic: 1,500 tokens
- Display formatting: 500 tokens

**Files Modified:**
- `roundtable-cli/src/cli.ts` - Add panel selection

#### 5. Documentation & Examples (~2,000 tokens)

**Components:**
- Skills creation guide
- Panel definition guide
- Example custom skill
- Example custom panel

**Files Created:**
- `docs/guides/CREATING_SKILLS.md`
- `docs/guides/CREATING_PANELS.md`
- `.roundtable/skills/custom-example.yaml`
- `.roundtable/panels/custom-example.yaml`

---

### What Will Be DEFERRED (To Phase 1C+)

#### ❌ Multiple LLM Support (~15,000 tokens)
**Deferred to:** Phase 1C
**Reason:** Phase 1B focuses on panel/skill architecture. Once that's solid, adding multiple LLMs is a natural extension.

**What's deferred:**
- GPT-4/GPT-4 Turbo client
- Google Gemini client
- xAI Grok client
- Model registry JSON
- Cross-LLM agent assignment

#### ❌ PM Agent Orchestration (~6,000 tokens)
**Deferred to:** Phase 1D
**Reason:** PM agent needs panel system to exist first. This phase builds the foundation.

**What's deferred:**
- Project Manager agent logic
- Meeting facilitation
- Cross-panel synthesis
- Decision tracking

#### ❌ Spec Generation (~12,000 tokens)
**Deferred to:** Phase 1D
**Reason:** Spec templates require understanding of full debate output. Get panel system working first.

**What's deferred:**
- Spec template system
- Package generation
- Markdown/PDF export
- Token budget reporting

#### ❌ Constitution System (~4,000 tokens)
**Deferred to:** Phase 2
**Reason:** Governance rules are advanced feature. Get basic multi-agent panels working first.

**What's deferred:**
- Constitution YAML format
- Consensus algorithms
- Voting mechanisms
- Veto rules

#### ❌ Context Compression (~3,000 tokens)
**Deferred to:** Phase 2
**Reason:** Needed for multi-phase projects. Single-session debates don't need this yet.

#### ❌ Enhanced Debate Mechanics (~10,000 tokens)
**Deferred to:** Phase 2
**Reason:** Evidence tagging, convergence metrics are optimizations. Core panel system first.

#### ❌ Multimodal Support (~15,000 tokens)
**Deferred to:** Phase 2
**Reason:** Images, audio, documents are advanced inputs. Text-only debate first.

---

### Scope Calculation

**Phase 1 Complete (from IMPLEMENTATION_ROADMAP.md):** ~85,000 tokens
- Phase 1A: ~15,000 tokens ✅
- Phase 1B: ~25,000 tokens (this phase)
- Phase 1C: ~15,000 tokens
- Phase 1D: ~30,000 tokens

**Phase 1B Coverage:**
- Phase 1B tokens: 25,000
- Phase 1 total tokens: 85,000
- Phase 1B as % of Phase 1: **29.4%**

**Full System Coverage:**
- Full system estimate: ~175,000 tokens
- After Phase 1B: 15K (1A) + 25K (1B) = 40,000 tokens
- Coverage: **22.9% of full system**

**Honest Assessment:**
Phase 1B implements core architectural components (Skills, Panels, Multi-Agent) that unlock Phase 1C/1D. This is foundational infrastructure, not just incremental features.

---

### Implementation Phases (Sub-tasks)

**Week 1: Skills Library** (~6K tokens)
1. Define skill YAML format
2. Implement loader and validator
3. Create 5 example skills
4. Write tests

**Week 2: Panel System** (~5K tokens)
1. Define panel YAML format
2. Implement panel selector
3. Create 3 example panels
4. Write tests

**Week 3: Multi-Agent Execution** (~8K tokens)
1. Dynamic agent factory
2. N-agent parallel execution
3. Response grouping
4. Update debate engine
5. Write tests

**Week 4: CLI & Documentation** (~6K tokens)
1. Panel selection UI
2. Auto-detection
3. Documentation guides
4. Polish and testing

---

### Success Criteria

Phase 1B is complete when:

- ✅ Skills can be loaded from `.roundtable/skills/*.yaml`
- ✅ Panels can be loaded from `.roundtable/panels/*.yaml`
- ✅ Users can select a panel or use auto-detection
- ✅ 3-5 agents execute in parallel based on panel definition
- ✅ Session output shows which skills/panel were used
- ✅ All new tests passing (95%+ coverage)
- ✅ Documentation complete (skills + panels guides)

**Not required for Phase 1B:**
- ❌ Multiple LLMs (Claude only is fine)
- ❌ PM agent synthesis
- ❌ Spec generation
- ❌ Constitution governance

---

### Risk Assessment

**Medium Risks:**
1. **YAML format complexity** - Keep simple, avoid over-engineering
2. **Panel selection UX** - Auto-detection might not work well initially
3. **N-agent token costs** - 5 agents × 2 rounds = 10 LLM calls (monitor costs)

**Mitigation:**
1. Start with minimal YAML, add fields as needed
2. Provide manual override for panel selection
3. Test with 3 agents first, then scale to 5

**Low Risks:**
- Skills/panels are just configuration, not complex logic
- Agent factory is straightforward (map skill → agent config)
- Testing strategy already proven in Phase 1A

---

### Token Budget Detail

| Component | Input | Processing | Output | Total |
|-----------|-------|------------|--------|-------|
| Skills Library | 1,500 | 2,500 | 2,000 | 6,000 |
| Panel System | 1,000 | 2,500 | 1,500 | 5,000 |
| Multi-Agent Exec | 2,000 | 4,000 | 2,000 | 8,000 |
| CLI Integration | 1,000 | 2,000 | 1,000 | 4,000 |
| Documentation | 500 | 500 | 1,000 | 2,000 |
| **TOTAL** | **6,000** | **11,500** | **7,500** | **25,000** |

**Contingency:** 10% buffer = 2,500 tokens
**Adjusted Estimate:** 25,000-27,500 tokens

---

### Dependencies & Blockers

**Completed Dependencies:**
- ✅ Phase 1A prototype validated
- ✅ User testing confirms approach works
- ✅ TypeScript + Node.js stack proven
- ✅ Claude API integration working

**No Blockers:**
All dependencies satisfied, ready to proceed.

---

### Next Steps After Phase 1B

**Phase 1C: Multiple LLM Support** (~15K tokens)
- Add GPT-4, Gemini, Grok clients
- Model registry
- Cross-LLM agent diversity

**Phase 1D: PM Agent & Spec Generation** (~30K tokens)
- PM agent orchestration
- Synthesis logic
- Spec template system
- Package generation

**Then Phase 1 Complete:** 85K tokens total → Full foundation ready

---

## Approval Required

**Following CLAUDE.md guidelines, I need explicit confirmation:**

```
PROPOSED SCOPE: Phase 1B

WILL BUILD:
  1. Skills library system (6K tokens)
  2. Panel definition system (5K tokens)
  3. Multi-agent execution (8K tokens)
  4. Enhanced CLI integration (4K tokens)
  5. Documentation guides (2K tokens)

TOTAL: ~25,000 tokens

WILL DEFER:
  - Multiple LLMs (Phase 1C)
  - PM agent (Phase 1D)
  - Spec generation (Phase 1D)
  - Constitution (Phase 2)
  - Context compression (Phase 2)
  - Enhanced debate (Phase 2)
  - Multimodal (Phase 2)

COVERAGE: ~29% of Phase 1, ~23% of full system

PURPOSE: Build foundational architecture (skills/panels/multi-agent)
that unlocks Phases 1C and 1D.

NEXT PHASE: 1C (Multiple LLMs) after 1B complete

CONFIRM: Does this scope match your expectations for Phase 1B?
```

**Please confirm or request changes.**

---

**Status:** Awaiting User Approval
**Last Updated:** 2024-10-22
