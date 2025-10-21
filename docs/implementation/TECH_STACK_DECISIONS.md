# Tech Stack Decisions: Roundtable Implementation

**Last Updated:** 2025-10-21
**Status:** Approved for Phase 1+ implementation
**Decision Authority:** Core development team

---

## Executive Summary

**Chosen Stack:** TypeScript + React + Node.js

**Rationale:** Multi-platform from day one with single codebase, shared core logic, and multiple renderers (CLI, web, VSCode, mobile).

**Token Cost Benefit:** Saves ~50K+ tokens in rewrites across Phases 5+ by enabling code reuse across all platforms.

---

## Multi-Platform Vision

Roundtable will exist across multiple platforms:

```
Phase 1-4:  CLI terminal application (React/Ink renderer)
Phase 4+:   Web application (React/DOM renderer)
Phase 5+:   VSCode extension (React/Webview renderer)
Phase 5+:   Mobile app (React Native renderer)
```

The tech stack must support all these from a single codebase or face massive token overhead rebuilding for each platform.

---

## Chosen Architecture: TypeScript + React + Node.js

### Core Components

```
┌────────────────────────────────────────────────────────────┐
│  Shared Core Logic (TypeScript/Node.js)                   │
│  ├─ Agent orchestration engine                            │
│  ├─ Session state management                              │
│  ├─ Debate/consensus algorithms                           │
│  ├─ Specification generation engine                       │
│  └─ Token budget calculator                               │
└────────────────────────────────────────────────────────────┘
         ▲              ▲              ▲              ▲
         │              │              │              │
    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
    │ Terminal │    │   Web   │    │ VSCode  │    │ Mobile  │
    │ UI Layer │    │ UI Layer│    │ UI Layer│    │ UI Layer│
    ├──────────┤    ├──────────┤    ├──────────┤    ├──────────┤
    │ React/Ink│    │ React   │    │ React   │    │ React   │
    │ Renderer │    │ DOM     │    │ Webview │    │ Native  │
    └──────────┘    └──────────┘    └──────────┘    └──────────┘

    Phase 1-4     Phase 4+       Phase 5+        Phase 5+
```

### Why This Architecture

**1. Code Reuse**
- `<DebateRound/>` React component works identically on CLI, web, VSCode, and mobile
- Session state machine shared across all platforms
- API orchestration logic reused everywhere

**2. Developer Velocity**
- Single language (TypeScript) eliminates context switching
- Rich ecosystem of libraries for LLM integration, UI components, testing
- Rapid iteration across all platforms

**3. Token Efficiency**
- Write core once, deploy 4 ways
- No platform-specific rewrites needed
- Future extensions share existing codebase (15-20K tokens per new feature vs 50K+ for separate implementations)

**4. Scaling to Multi-Platform**
- **Phase 1 CLI** → Node.js + React/Ink
- **Phase 4+ Web** → Same TypeScript + React, add Express API layer
- **Phase 5+ VSCode** → VSCode Webview + React (same UI components)
- **Phase 5+ Mobile** → React Native (share business logic)

---

## Rejected Alternatives

### Alternative 1: Rust CLI (Codex model)

**Pros:**
- Single binary distribution
- High performance
- No runtime dependency

**Cons:**
- **Completely unsuitable for multi-platform:**
  - Web: Rust → WASM (requires complete rewrite, different ecosystem)
  - VSCode: Separate Rust implementation needed
  - Mobile: Can't realistically deploy Rust to iOS/Android
- **Result:** 3+ separate codebases, 3+ teams, 3x token cost

**Token cost of going Rust:** ~200K+ additional tokens for rewrites in Phases 4-5

**Verdict:** ❌ Dead-end for multi-platform vision

---

### Alternative 2: Python CLI

**Pros:**
- Fast initial development
- Good CLI libraries (Rich, Click)

**Cons:**
- **Cannot scale to other platforms:**
  - Web: Would need Django/FastAPI backend separate from CLI (split codebase)
  - VSCode: Requires JavaScript/TypeScript (separate UI layer)
  - Mobile: Python doesn't run on iOS/Android
- **Result:** Multiple languages, multiple teams, multiple ecosystems

**Token cost of going Python:** ~180K+ additional tokens for rewrites + new teams learning JavaScript

**Verdict:** ❌ Forces technology debt from day one

---

### Alternative 3: Go CLI

**Pros:**
- Fast compilation
- Single binary
- Good concurrent execution

**Cons:**
- **Same problem as Rust:**
  - Web: Go → API server + separate React UI (split architecture)
  - VSCode: Separate implementation
  - Mobile: Not practical
- **Small ecosystem** for LLM integration and terminal UI

**Token cost of going Go:** ~150K+ for rewrites + API layer plus learning curve

**Verdict:** ❌ Better than Rust/Python, but still creates fragmentation

---

## TypeScript + React + Node.js: Detailed Justification

### 1. CLI Phase (Phase 1)

**Components:**
- **Runtime:** Node.js 18+
- **Language:** TypeScript 5+
- **CLI Framework:** Inquirer.js + Commander.js OR React/Ink
- **Build Tool:** esbuild (fast iteration)
- **Package Manager:** npm or pnpm

**Why TypeScript:**
- Type safety for complex session state management
- Excellent async/await for parallel API calls (Phase 2)
- VSCode integration (debugging, IntelliSense)

**Why React/Ink (if chosen over Inquirer):**
- Direct compatibility with web/VSCode/mobile renderers
- Component reusability pays dividends immediately
- Matches Claude Code's own architecture

---

### 2. Web Phase (Phase 4+)

**Same TypeScript + React, new backend:**
- Express.js or Fastify API server
- React web client (same components as CLI)
- Backend handles: session persistence, LLM API orchestration, concurrent request management
- Deployment: Node.js container or serverless

**Cost:** ~10-15K additional tokens (no core rewrite needed)

---

### 3. VSCode Extension (Phase 5+)

**Leverage existing React components:**
- VSCode Webview renders React UI
- Same session management, state machine, algorithms
- Communication bridge: VSCode API ↔ Node.js backend

**Cost:** ~8-12K additional tokens (mostly integration)

---

### 4. Mobile (Phase 5+)

**React Native for iOS/Android:**
- Share 70-80% of business logic (session, algorithms)
- React Native components mirror React/Ink/DOM structure
- Native APIs only for OS-specific features (notifications, file access)

**Cost:** ~15-20K additional tokens (component adaptation, not rewrite)

---

## LLM Integration

**Critical advantage of TypeScript:**

```
Official SDKs available for:
✅ OpenAI (SDK maintained by OpenAI)
✅ Anthropic (SDK maintained by Anthropic)
✅ Google Gemini (SDK available)
✅ xAI Grok (API + TypeScript clients)

Alternatives:
⚠️ Rust: Community SDKs, not official support
⚠️ Python: Good, but separate from UI layer
```

Node.js SDK ecosystem is mature, battle-tested, production-ready.

---

## Architecture: Shared Core vs Platform-Specific

### Shared (All Platforms)

```typescript
// session.ts - Used everywhere
export class SessionManager {
  createSession(config: SessionConfig): Session
  loadSession(id: string): Promise<Session>
  saveSession(session: Session): Promise<void>
  // Core logic: no platform dependency
}

// debate.ts - Used everywhere
export class DebateEngine {
  executeRound(participants: Agent[]): Promise<Round>
  synthesizeConsensus(rounds: Round[]): Result
  // Pure business logic: no UI dependency
}

// spec.ts - Used everywhere
export class SpecGenerator {
  generateFromSession(session: Session): Specification
  exportToPackage(spec: Spec): Package
  // Transforms data: no rendering dependency
}
```

### Platform-Specific (UI Layer)

```typescript
// Terminal (React/Ink)
export const SessionSelector: React.FC<Props> = (props) => (
  <Box>
    <Text>Select a session:</Text>
    {/* Rendered using Ink terminal renderer */}
  </Box>
)

// Web (React/DOM)
export const SessionSelector: React.FC<Props> = (props) => (
  <div>
    <h2>Select a session:</h2>
    {/* Rendered using DOM renderer */}
  </div>
)

// Mobile (React Native)
export const SessionSelector: React.FC<Props> = (props) => (
  <ScrollView>
    <Text>Select a session:</Text>
    {/* Rendered using React Native */}
  </ScrollView>
)

// Same component, different renderers ✅
```

---

## Token Efficiency Analysis

### Scenario: Building Roundtable across all platforms

**Option A: TypeScript + React (Chosen)**
```
Phase 1-4: Core + CLI       = ~140K tokens
Phase 4+:  Web layer        = ~12K tokens (small addition)
Phase 5+:  VSCode extension = ~10K tokens (integration only)
Phase 5+:  Mobile (RN)      = ~18K tokens (adaptation)
TOTAL: ~180K tokens
```

**Option B: Rust CLI + Python Web + JavaScript VSCode + React Native**
```
Phase 1-4: Rust CLI         = ~140K tokens
Phase 4:   Python backend   = ~50K tokens (new language)
Phase 4:   React web        = ~35K tokens (new team)
Phase 5:   VSCode (JS)      = ~25K tokens (new language)
Phase 5:   React Native     = ~25K tokens
TOTAL: ~275K tokens (53% MORE)
```

**Option C: Go CLI + separate web/VSCode/mobile**
```
Phase 1-4: Go CLI + API     = ~155K tokens
Phase 4:   React web        = ~30K tokens
Phase 5:   VSCode (JS)      = ~20K tokens
Phase 5:   React Native     = ~20K tokens
TOTAL: ~225K tokens (25% MORE)
```

**Chosen approach saves 50-100K tokens across entire project lifecycle.**

---

## Deployment Model

### Phase 1-4: CLI Distribution

**npm package:**
```bash
npm install -g @roundtable/cli
roundtable start
```

**GitHub releases:**
- Binary packages for macOS, Linux, Windows (using esbuild + pkg)
- Alternative: Docker image

---

### Phase 4+: Multi-Distribution

```
CLI: npm package + binaries
Web: Hosted on Vercel/Netlify OR self-hosted Node
VSCode: VSCode Marketplace extension
Mobile: App Store + Google Play Store
```

All share Node.js backend infrastructure.

---

## Decision Matrix

| Factor | TypeScript + React | Rust | Python | Go |
|--------|---|---|---|---|
| **Phase 1 speed** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **LLM SDK support** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Multi-platform** | ⭐⭐⭐ | ❌ | ❌ | ⚠️ |
| **Web scalability** | ⭐⭐⭐ | ⚠️ | ⭐⭐ | ⭐⭐⭐ |
| **VSCode extension** | ⭐⭐⭐ | ❌ | ❌ | ❌ |
| **Mobile support** | ⭐⭐⭐ | ❌ | ❌ | ❌ |
| **Single codebase** | ⭐⭐⭐ | ❌ | ❌ | ❌ |
| **Token efficiency** | ⭐⭐⭐ | ⭐ | ⭐ | ⭐⭐ |

---

## Implementation Strategy

### Phase 1 (CLI Foundation): 35K tokens
- Node.js + TypeScript scaffold
- Session management system
- CLI interaction (Inquirer.js or React/Ink)
- Local JSON file storage

### Phase 2-4 (Core Engine): 105K tokens
- Agent orchestration (shared core logic)
- Debate engine
- Spec generation
- Token budget system

### Phase 4+ (Web Extension): 12K tokens
- Express API server
- React web UI (reuse components from CLI)
- Persistent database (SQLite/PostgreSQL)

### Phase 5+ (VSCode + Mobile): 18-28K tokens
- VSCode webview integration
- React Native mobile app
- All leverage existing TypeScript core

---

## Risk Mitigation

**Q: What if React/Ink performance isn't sufficient for Phase 1 CLI?**
- A: Can start with Inquirer.js, migrate to React/Ink in Phase 2 with ~500 tokens refactoring

**Q: What if VSCode extension requirements emerge incompatible?**
- A: TypeScript + Node.js flexible enough to support any VSCode architecture pattern

**Q: What about performance in web phase?**
- A: Node.js + Express benchmarked at 10K+ requests/sec; backend will be LLM API-bound, not computation-bound

---

## Conclusion

**TypeScript + React + Node.js is the optimal choice** for a project requiring:
- Rapid Phase 1 delivery
- Multi-platform support (CLI → Web → VSCode → Mobile)
- Single codebase, multiple renderers
- LLM SDK maturity and support
- Token efficiency across 5+ phases

**Alternative stacks cost 25-50% MORE tokens while reducing platform flexibility.**

---

## Approval

- **Approved for:** Phase 1+ implementation
- **Decision Date:** 2025-10-21
- **Next Step:** Create project scaffold and Phase 1 architecture document
