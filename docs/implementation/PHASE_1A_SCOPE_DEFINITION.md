# Phase 1A Scope Definition: What's Built vs Deferred

**Purpose:** Clarify exactly what Phase 1A validates so you know what to expect during user testing and what to NOT test yet.

**Status:** ✅ Complete (code) - Awaiting user testing validation
**Estimate:** ~15,000 tokens
**Coverage:** ~4-10% of full Phase 1 specification

---

## At a Glance

| Aspect | Phase 1 Spec | Phase 1A Reality | Status |
|--------|--------------|-----------------|--------|
| **Agents** | 4-5 panels (Architecture, UX, Security, Product, Data) | 2 hardcoded agents | ❌ Deferred |
| **LLMs** | Claude, GPT-4, Gemini, Grok (selectable) | Claude only | ❌ Deferred |
| **Round Flow** | Interactive (user input between rounds) | Fixed 2 rounds, no input | ❌ Deferred |
| **Consensus Check** | Yes (built-in checking) | No (always 2 rounds) | ❌ Deferred |
| **CLI** | Full terminal UI with navigation | Basic prompts (commander/inquirer) | ✅ Minimal |
| **Spec Generation** | Output specs from debate | No spec output | ❌ Deferred |
| **Session Management** | Save/resume/list sessions | Save/list only (no resume) | ⚠️ Partial |

---

## Full Comparison: What's Built vs Deferred

### ✅ BUILT IN PHASE 1A

#### 1. Basic CLI
- **What:** Simple command-line interface using commander + inquirer
- **Features:**
  - `roundtable start` - Create new session
  - `roundtable list` - View previous sessions
  - Interactive prompts for user input
  - Text-based output
- **Spec says:** "Terminal UI framework (clean, keyboard-navigable)"
- **Status:** ✅ Implemented (minimal version)

#### 2. Two-Agent Debate Engine
- **What:** Parallel execution of 2 agents
- **Agents:**
  - Architecture Expert
  - Product Expert
- **Spec says:** "Panels, multiple agents, debate orchestration"
- **What's missing:**
  - Only 2 agents (spec has 4-5 panels with multiple agents each)
  - Agents are hardcoded (not dynamically assembled)
  - No panel formation logic
- **Status:** ✅ Implemented (minimal version)

#### 3. Claude API Integration
- **What:** Send requests to Claude 3.5 Sonnet
- **Features:**
  - ClaudeClient class
  - Token tracking
  - Friendly error messages (credits, auth, rate limits, network)
  - Request/response handling
- **Spec says:** "LLM integration layer (Claude, GPT, Gemini, Grok)"
- **What's missing:**
  - Only Claude (spec requires multiple LLMs)
  - No model registry yet
  - No dynamic model selection
- **Status:** ✅ Implemented (single LLM version)

#### 4. Two-Round Debate Flow
- **What:** Fixed 2-round sequence
  - **Round 1:** Agents respond independently to user prompt
  - **Round 2:** Agents see Round 1 responses from each other
- **Features:**
  - Parallel execution (agents run simultaneously)
  - Context passing between rounds
  - Response tracking
- **Spec says:** "Round management (Round 1 → synthesis → user input → Round 2+)"
- **What's missing:**
  - No user input between rounds
  - Fixed 2 rounds (not based on consensus)
  - No `/continue`, `/done` commands
  - No consensus checking
- **Status:** ✅ Implemented (hardcoded 2-round version)

#### 5. JSON Session Storage
- **What:** Save debate sessions to JSON files
- **Features:**
  - Sessions directory: `roundtable-cli/sessions/`
  - Session ID generation
  - Save session to file
  - Load session by ID
  - List all sessions (sorted by date)
- **Spec says:** "Session storage (JSON files v1)"
- **What's missing:**
  - No session resume/replay
  - No session editing
- **Status:** ✅ Implemented (save/list only)

#### 6. Token Tracking
- **What:** Count tokens used per response
- **Features:**
  - Per-agent token count
  - Per-round totals
  - Session-level aggregation
  - Display in CLI output
  - Save in session JSON
- **Spec says:** "Token budget calculation & reporting"
- **What's missing:**
  - No budget warnings
  - No cost calculation
  - No ROI analysis
- **Status:** ✅ Implemented (tracking only)

#### 7. Friendly Error Messages
- **What:** User-friendly error handling
- **Errors handled:**
  - No API credits → "Add credits at: [link]"
  - Invalid API key → "Check your ANTHROPIC_API_KEY"
  - Rate limit → "Wait a moment and try again"
  - Network error → "Check your internet connection"
  - Generic errors → "API request failed: [message]"
- **Status:** ✅ Implemented

#### 8. Comprehensive Unit Tests
- **What:** 36 unit tests (all passing)
- **Coverage:**
  - SessionManager (11 tests) - Save/load/list/round-trip
  - DebateEngine (19 tests) - Debate flow, token tracking, context
  - Error handling (6 tests) - Friendly error messages
- **Mocking:** All external dependencies mocked (no real API calls)
- **Status:** ✅ Implemented

---

### ❌ DEFERRED TO PHASE 1B+

#### Skills Library (~5K tokens - Phase 1B)
- **What:** Reusable expert definitions
- **Spec says:** "Skills library - Independent, versioned expert definitions"
- **Why deferred:** Not needed for 2 hardcoded agents
- **Will include:**
  - `.roundtable/skills/` directory structure
  - YAML skill definitions
  - Skill loader and validator
  - Example skills (Architecture, Security, UX, Product, Data Eng)
- **Status:** ❌ Not built

#### Panel Formation System (~8K tokens - Phase 1B)
- **What:** Dynamic agent assembly
- **Spec says:** "Panel definition system, dynamic agent instantiation"
- **Why deferred:** Phase 1A uses hardcoded agents
- **Will include:**
  - Panel → skills → models mapping
  - Dynamic panel selection
  - Multi-agent panels (2-4 agents per panel)
  - Panel diversity logic
- **Status:** ❌ Not built

#### Project Manager Agent (~6K tokens - Phase 1D)
- **What:** Session orchestration
- **Spec says:** "PM agent, orchestrates panels, facilitator"
- **Why deferred:** Phase 1A doesn't need orchestration
- **Will include:**
  - Panel assembly logic
  - Round management
  - Synthesis of cross-panel insights
  - User response handling
- **Status:** ❌ Not built

#### Multiple LLMs (~4K tokens - Phase 1C)
- **What:** Support for GPT-4, Gemini, Grok
- **Spec says:** "LLM integration layer (Claude, GPT, Gemini, Grok)"
- **Why deferred:** Phase 1A validates Claude only first
- **Will include:**
  - OpenAI GPT-4 client
  - Google Gemini client
  - xAI Grok client
  - Model registry and routing
  - Unified LLMClient interface
- **Status:** ❌ Not built (model-registry.ts skeleton only)

#### Synthesis Logic (~5K tokens - Phase 1B)
- **What:** Group responses by theme
- **Spec says:** "Facilitator synthesis logic, group responses by theme"
- **Why deferred:** Phase 1A shows raw responses only
- **Will include:**
  - Cross-agent theme detection
  - Consensus point identification
  - Disagreement tracking
  - Cross-domain concern detection
- **Status:** ❌ Not built

#### Spec Generation + Templates (~12K tokens - Phase 1D)
- **What:** Convert debate output to specs
- **Spec says:** "Spec template system, package generation"
- **Why deferred:** Phase 1A focuses on debate quality, not output
- **Will include:**
  - Spec templates (requirements, architecture, UX)
  - Package assembly from debate
  - Token budget reporting
  - Markdown/PDF export
- **Status:** ❌ Not built

#### Constitution System (~4K tokens - Phase 2)
- **What:** Governance rules for debate
- **Spec says:** "Constitution governance layer"
- **Why deferred:** Not needed for simple 2-agent debate
- **Will include:**
  - Constitution definitions
  - Agent behavior rules
  - Decision-making constraints
  - Custom governance modes
- **Status:** ❌ Not built

#### Meeting Facilitator (~6K tokens - Phase 1B)
- **What:** Generic meeting entry point
- **Spec says:** "Meeting Facilitator (generic meeting entry point)"
- **Why deferred:** Phase 1A is project-focused only
- **Will include:**
  - Different meeting types
  - Custom panel selection
  - User interaction modes
  - Flexible orchestration
- **Status:** ❌ Not built

#### Interactive Round Management (~3K tokens - Phase 1B)
- **What:** User input between rounds
- **Spec says:** "User responds to panel output, new round generated"
- **Why deferred:** Phase 1A validates debate first with fixed rounds
- **Will include:**
  - User prompt between rounds
  - `/continue`, `/done`, `/accept` commands
  - Consensus checking
  - User-driven round advancement
- **Status:** ❌ Not built

#### Context Compression (~3K tokens - Phase 2)
- **What:** Phase-to-phase learning transfer
- **Spec says:** "Context compression, later phases build on earlier learnings"
- **Why deferred:** Phase 1A is single-session only
- **Will include:**
  - Session summarization
  - Learning extraction
  - Next-phase context building
- **Status:** ❌ Not built

#### Post-Mortem System (~5K tokens - Phase 4)
- **What:** Learning and improvement tracking
- **Spec says:** "Post-mortem analysis, skill improvement"
- **Why deferred:** Phase 1A focuses on validation
- **Will include:**
  - Session analysis
  - Insight extraction
  - Skill evolution
  - Quality metrics
- **Status:** ❌ Not built

---

## What You Should Test (Phase 1A)

### ✅ DO Test These (They're Implemented)

1. **Can I start a session?**
   - Run `npm run dev start`
   - Enter a prompt
   - Session should start

2. **Do 2 agents respond?**
   - Run a test prompt
   - Should see Architecture Expert response
   - Should see Product Expert response

3. **Are responses different?**
   - Compare Round 1 architecture vs product perspective
   - Look for different viewpoints

4. **Does Round 2 show context?**
   - Round 2 responses should reference Round 1
   - Agents should show they "saw" each other

5. **Are token counts tracked?**
   - Each response shows `(Tokens: XXX)`
   - Session summary shows total tokens

6. **Does session save?**
   - Session JSON file created in `roundtable-cli/sessions/`
   - Session ID shown at end
   - `roundtable list` shows the saved session

7. **Do error messages work?**
   - Try with wrong API key
   - Should show helpful error message

### ❌ DON'T Test These (Not in Phase 1A)

1. **Interactive rounds**
   - ❌ Don't expect user prompts between rounds
   - Phase 1A always runs exactly 2 rounds

2. **Consensus checking**
   - ❌ Don't look for "consensus reached" messages
   - Phase 1A doesn't check consensus

3. **Session resume**
   - ❌ Don't expect to resume/replay sessions
   - `roundtable list` shows past sessions but no resume

4. **Multiple LLMs**
   - ❌ Don't try to select GPT-4 or Gemini
   - Phase 1A is Claude-only

5. **Spec generation**
   - ❌ Don't expect output specs
   - Phase 1A shows debate, not formatted specs

6. **Panel selection**
   - ❌ Don't expect to choose panels
   - Agents are hardcoded (2 only)

7. **Advanced features**
   - ❌ Don't expect Constitution system
   - ❌ Don't expect Post-Mortem learning
   - ❌ Don't expect Synthesis grouping

---

## Test Plan Goals

Based on Phase 1A's actual scope, user testing should answer:

### Primary Questions
1. **Does debate quality look good?**
   - Do agents offer different perspectives?
   - Are responses substantive (not just 200 chars)?
   - Does Round 2 show evolution?

2. **Are token costs reasonable?**
   - Total tokens per session (~1500-2500 expected)
   - Cost per test (~$0.02-0.05)

3. **Is architecture sound?**
   - No crashes or errors
   - Sessions save correctly
   - Token tracking accurate

### Secondary Questions
4. **Should we proceed to Phase 1B?**
   - If debate quality is high → Proceed
   - If debate needs refinement → Iterate 1A
   - If approach is flawed → Rethink

---

## Token Budget Breakdown

| Component | Estimate | Status |
|-----------|----------|--------|
| **CLI** | 2K | ✅ |
| **2-Agent Debate** | 4K | ✅ |
| **Claude API** | 2K | ✅ |
| **2-Round Flow** | 2K | ✅ |
| **Session Storage** | 1.5K | ✅ |
| **Token Tracking** | 1K | ✅ |
| **Error Handling** | 1.5K | ✅ |
| **Testing** | 3K | ✅ |
| **TOTAL BUILT** | **~15K** | ✅ |
| | | |
| **Deferred (Phase 1B+)** | **~120K** | ❌ |
| **TOTAL SYSTEM** | **~140K** | ⏸️ |

---

## Decision Tree: After Testing

Based on user testing results:

```
Does multi-agent debate produce good insights?

├─ YES: Quality is good
│  └─ Proceed to Phase 1B
│     (Add panels, skills, multiple agents)
│
├─ MAYBE: Needs improvement
│  └─ Iterate Phase 1A
│     (Better prompts, different mechanics)
│
└─ NO: Approach is flawed
   └─ Rethink approach
      (Different debate strategy entirely)
```

---

## Summary

**Phase 1A = Minimal Validation Prototype**

- ✅ **Validates:** 2-agent debate works, architecture is sound
- ❌ **Doesn't include:** Interactive rounds, panels, multiple LLMs, spec output
- 🎯 **Test focus:** Debate quality + token costs (not UX or features)
- 📊 **Coverage:** ~4-10% of full Phase 1 spec

**When testing, compare against THIS document, not the full Phase 1 spec.**

---

**Last Updated:** 2024-10-22
**Version:** 1.0
**Created by:** Strategic phase planning process
