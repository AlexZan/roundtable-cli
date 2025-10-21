# Roundtable: Use Cases for Spec Iteration

Use cases are organized by:
1. User persona
2. Problem being solved
3. Expected workflow
4. Spec validation (what this teaches us about the spec)

---

## UC-1: Startup Founder - MVP Feature Planning

### Persona
- Alex: Founder of an early-stage startup (2 months in)
- Building a project management tool
- Has rough vision, needs to communicate it to engineers
- No budget for expensive iteration cycles

### Constitution
Uses: **Startup MVP** (from marketplace)
```yaml
consensus: product_centric_fast
timeline: 8 weeks
budget: $80k
panels:
  - product (1 agent - decision maker)
  - architecture (1 agent - practical engineer)
  - data (1 agent)
  - ux (1 agent)
```

### Problem
"I know what I want but can't articulate it well enough for developers to build without constant back-and-forth. Every assumption leads to rework."

### Scenario

```
Week 1: Alex sets up Roundtable

$ roundtable new my-pm-tool --constitution "Startup MVP"
✓ Constitution loaded: product_centric_fast
✓ Timeline constraint: 8 weeks
✓ Budget constraint: $80k
✓ Panels ready: 4 (lightweight, fast consensus)

Alex sits down with Roundtable

Alex: "I'm building a project management tool. Key features:
  - Real-time task updates across team
  - Integrations with Slack and GitHub
  - Mobile-first design
  What's the architecture for something like this?"

[Relevant Order Mode Response - Panel View]

┌─────────────────────────────────────────────────────┐
│ ROUND 1: "Design the real-time architecture"      │
├─────────────────────────────────────────────────────┤
│                                                      │
│ 🏗️  ARCHITECTURE PANEL      [1,245 tokens] ▼       │
│ 👥 UX PANEL                 [834 tokens] ▼         │
│ 📊 DATA PANEL               [1,089 tokens] ▼       │
│ 🎯 PRODUCT PANEL            [567 tokens] ▼         │
│                                                      │
│            Total: 3,735 tokens (~$0.03)             │
└─────────────────────────────────────────────────────┘

[Alex clicks ARCHITECTURE PANEL]

Architecture Panel Consensus:
Claude (Primary): "WebSocket + Redis pub/sub for MVP. Firebase if ops burden too high."
(+823 tokens)

Architecture Agent 2: "Agreed. Also SSE is viable fallback for browsers."
(+422 tokens)

✓ Panel Consensus REACHED (HIGH confidence)
  Decision: WebSocket + Redis OR Firebase Realtime
  Rationale: Both handle real-time, Redis cheaper for your scale

[Spec auto-updated]
Architecture → WebSocket or SSE for real-time (pending user constraint input)
Integrations → Slack API + GitHub webhooks
Missing questions → Added to Unresolved

Alex follows up: "We're targeting 50-100 concurrent users initially."

[Relevant Order Mode Again]

Claude: "50-100 users = you can use simple pub/sub. Consider Firebase Realtime
or Pusher if you don't want ops burden..."

GPT-4: "At that scale, WebSocket + Redis pub/sub works. But overkill? Polling
every 5s might be cost-effective..."

Gemini: "50-100 means you CAN build this simply. Key question: What's your
tolerance for staleness? 1s lag vs 5s lag?"

[New spec section: Constraints]
- Scale: 50-100 concurrent users
- Acceptable latency: TBD (impacts architecture choice)
- Team size: 2 engineers initially

Alex: "Our team can handle moderate ops. We'd rather have real-time than not.
Can we use a simple managed service?"

[Moderator Mode - Alex explicitly asks for synthesis]

"All models agree: At 50-100 users with 2-person team and real-time requirement,
a managed service (Firebase, Supabase, or Pusher) is more pragmatic than building
infrastructure.

Claude emphasizes: Allows focus on product, not ops
GPT-4 emphasizes: Lower initial cost than custom WebSocket server
Gemini emphasizes: Reduces complexity, fewer failure modes

Recommendation: Start with Firebase Realtime (simplest), migrate if costs prohibitive.
Reassess at 500 concurrent users."

[Spec updated with architecture decision and rationale]

Week 2: Alex describes auth flow to engineers

Alex: "How should we handle auth? We have GitHub users and workspace invites."

[Relevant Order Mode]

Claude: "GitHub OAuth for initial auth, then workspace invites via email.
Session management in Redis or managed service..."

GPT-4: "Start with GitHub OAuth only. Invite workflow can wait for MVP."

Gemini: "Question: Can you delete workspaces? Can users be in multiple workspaces?
Permission model?"

[This surfaces requirements not in original spec]

[Spec now includes]
- Auth: GitHub OAuth primary flow
- Workspaces: Single per user initially (TBD for multi-workspace)
- Permissions: TBD (pending workspace sharing decisions)

[Debate Mode - implicitly triggered by conflicting model suggestions]

Claude: "If they grow, multi-workspace becomes essential. Build it now."
GPT-4: "That's overengineering MVP. Do single-workspace, refactor later."
Gemini: "Data model supports both easily. Data layer can be future-proof, UI/auth can be simple."

[Result: Clear decision with tradeoffs documented]
"Decision: Single-workspace MVP (faster to market)
Contingency: If user demand for multi-workspace high, upgrade needed.
Data model: Designed to support multi-workspace without breaking changes."
```

### Spec Validation

**What this teaches us:**
1. ✅ Panel system with collapsed token counts reduces decision fatigue
2. ✅ Within-panel consensus (both agents agreeing) builds confidence
3. ✅ Product-centric consensus algorithm accelerates MVP decisions
4. ✅ Fast startup template from marketplace eliminates setup time
5. ✅ Token cost tracking helps Alex understand AI expense for budget
6. ✅ Spec grows through questions being surfaced by models

### Key Insight: Constitution-Driven Governance

By using the "Startup MVP" Constitution at project start:
- Alex immediately knew which panels would respond (not all)
- Product panel had explicit decision authority (no endless debates)
- Consensus algorithm optimized for fast decisions (democratic_majority with 4 lean panels)
- Timeline constraint (8 weeks) was built into governance, not imposed later

This **eliminates meta-debates about "how do we decide"** - the Constitution already answered that.

---

## UC-2: Enterprise Architect - Complex System Design

### Persona
- Jordan: Senior architect at financial services company
- Designing new internal trading platform
- High stakes: wrong decision = millions in losses
- Wants consensus before implementation

### Problem
"We have 3 teams with different opinions on architecture. We need all perspectives represented fairly, but someone needs to synthesize recommendations."

### Scenario

```
Jordan initiates roundtable with custom model configuration:

roundtable.config.yml:
  - claude: "Financial systems specialist"
  - gpt-4: "Performance and scalability expert"
  - gemini: "Compliance and risk assessment"

Jordan: "We're building a new trading platform.
Current legacy system has: DB2, COBOL, Java middle-layer, custom messaging.
Options: Lift & shift to cloud, gradual modernization, or complete rewrite.
Requirements: <50ms latency for trades, PCI-DSS compliance, 99.99% uptime."

[Relevant Order Mode]

Claude (0.96): "Legacy system has proven reliability. Lift & shift to cloud
buys you time. 3-year migration plan from there. DB2 modernization is hard."

GPT-4 (0.91): "Rewrite is expensive/risky. Lift & shift costs 2x on cloud.
Gradual modernization = hybrid approach. Route hot paths to new system, legacy
handles rest. You control risk."

Gemini (0.88): "PCI-DSS with legacy systems is complex audit story. Cloud
helps compliance, but only if you architect for it. Regulatory approval for
rewrite vs lift-shift differs."

[Model disagreement is CLEAR]

Jordan: "Let's go to moderator mode. Synthesize this."

[Moderator Mode]

"Consensus: Lift & shift alone is insufficient (doesn't modernize you).
Rewrite alone is too risky (regulatory, financial, team risk).
All models converge: Hybrid approach over 2-3 years.

Areas of agreement:
- Phased approach required
- Cloud is necessary (compliance + ops)
- Legacy DB2 is legacy, not endpoint

Areas of divergence:
Claude prioritizes: Proven system stability
GPT-4 prioritizes: Cost optimization and risk control
Gemini prioritizes: Regulatory approval and audit story

Recommended path:
Year 1: Lift & shift legacy to cloud (proves compliance can work)
Year 2-3: Route high-value/high-latency trades to new system
Contingency: If regulatory feedback negative, extend year 1 focus

Risk assessment:
High: Lift & shift succeeds technically but costs more than expected
Medium: New trading engine can't hit latency targets (validation needed)
Medium: Team skill gap in new tech stack"

[Jordan and team review. New questions emerge]

Jordan: "What about the messaging layer? That's our biggest technical debt."

[Relevant Order Mode - specialized follow-up]

Claude: "Messaging is hard. Options: Keep legacy, wrap with adapters + new system
uses event bus. Or: Kafka/RabbitMQ replacement (big effort)."

GPT-4: "If you're migrating trades to new system gradually, you need event-driven
architecture. Legacy messaging won't scale across systems. Budget Kafka migration."

Gemini: "Regulatory question: What audit trail is required? Messaging layer
determines this. Legacy might not give compliance visibility you'll need."

[Spec Section Added: Messaging Architecture]
- Current: Legacy proprietary system
- Decision needed: Wrap or replace?
- Constraints: Audit trail, compliance visibility
- Models recommend: Replace with Kafka (higher upfront cost, long-term better)

Jordan: "Moderator, help us decide messaging: wrap vs. replace?"

[Moderator Mode - Focused Decision]

"Consensus: Replace, not wrap. Reasoning:
1. Wrapping extends technical debt lifecycle
2. Compliance benefits of transparent event bus
3. Kafka has mature ops story your team can learn

Cost tradeoff:
Wrap: Lower initial (3 months), higher 5-year cost (continuous hack tax)
Replace: Higher initial (6 months), lower 5-year cost (clean, auditable)

Recommendation: Replace. Timeline: Parallel to year 1 lift & shift."

[Spec Updated with Messaging Architecture Decision]
```

### Spec Validation

**What this teaches us:**
1. ✅ Moderator mode valuable for enterprise decision-making (multiple stakeholders)
2. ✅ Cost/timeline considerations integrated naturally
3. ✅ Risk assessment section missing from spec format
4. ⚠️ **Gap: How do we track "dependent decisions"?** (Messaging depends on trading engine architecture)
5. ⚠️ **Gap: Should spec include implementation roadmap/phases?**
6. ✅ Models with specific roles (compliance) very valuable

### Iterations Needed

- [ ] Add "Risk Assessment" section to spec format
- [ ] Add "Implementation Timeline/Phases" section
- [ ] Document decision dependencies and critical path
- [ ] Consider "decision prerequisite" tracking (can't decide X without deciding Y first)

---

## UC-3: Solo Developer - Iterating Feature Design

### Persona
- Sam: Indie developer, building productivity app solo
- Uncertain about UX approach for new "recurring tasks" feature
- Wants to explore options before building

### Problem
"I have 3 different ways this could work. I want the models to debate pros/cons so I pick the right one before implementing."

### Scenario

```
Sam: "I'm adding recurring tasks. Here are my three approaches:

Approach A: Calendar-style interface. Click day/week pattern. Recurrence rule in
UI. Simple, clear.

Approach B: Natural language. 'Every Tuesday and Friday', 'biweekly on Mondays'.
Parsed by AI. More flexible, less predictable.

Approach C: Templates + builder. Save patterns as templates, quick-apply. Good
for power users, might confuse beginners.

Which is best?"

[Explicit Debate Mode Request]

Claude (Initial): "A is best for general users. Low error rate, discoverable.
But limited expressiveness. B and C are for power users."

GPT-4 (Initial): "B is actually better. Users already describe recurrence
naturally. Better accessibility than calendar click-drag. C is bloat."

Gemini (Initial): "A + C combination is ideal. Calendar UI for common patterns
(weekly, biweekly). Save favorites. B's NLP adds complexity, unreliable parsing."

[Round 1 Critique]

Claude on GPT-4: "NLP parsing fails silently. User thinks they set weekly,
actually set something else. Trust failure."

GPT-4 on Claude: "Calendar interface is web-1.0. Mobile users hate click-dragging
patterns. Natural language scales to mobile better."

Claude on Gemini: "A+C works, but two UI paths confuse users. When do I use
calendar vs. templates?"

Gemini on GPT-4: "NLP parsing errors → confusion. You'd need conversational
fallback UI anyway. Why not start there?"

GPT-4 on Gemini: "Two UI paths also confusing, plus maintenance burden."

Gemini to All: "Actually, the question isn't binary. What if calendar UI is
built on templates under the hood? Users don't see complexity."

[Round 2: Building on insights]

Claude: "That's clever. Calendar UI + backend templates means we get A's UX
and C's flexibility. B's natural language could be add-on later."

GPT-4: "If calendar UI is robust, that works. My concern: most calendar UI for
recurrence sucks (Gmail's version is confusing). Hard to get right."

Gemini: "Then we test calendar UI heavily before launch. But architecture-wise,
templates as foundation is sound."

[Convergence Reached]

Claude: "I think we've converged. Approach A's interface, built on C's template
architecture, B as future enhancement. Sam, does this align with your vision?"

[Spec Section: Recurring Tasks Feature Design]
Decision: Calendar UI (Approach A) built on template architecture (Approach C)
Rationale:
  - Clear UX for users (no confusion about when to use what)
  - Flexible backend (can add NLP parsing later without redesign)
  - Test calendar UI thoroughly before launch (known hard problem)
Future consideration: NLP natural language parsing (V2 of feature)
Risk: Calendar UI implementation complexity (need expert or library)

[Sam saves decision, continues with implementation confidence]
```

### Spec Validation

**What this teaches us:**
1. ✅ Debate mode naturally shows "synthesis emerges through dialogue"
2. ✅ Models building on each other's points valuable
3. ⚠️ **Gap: We need "Considered Approaches" section** (tracks alternatives and why rejected)
4. ✅ Convergence criterion clear (all agree on synthesis)
5. ⚠️ **Gap: Should we track "Future Considerations" separately?**

### Iterations Needed

- [ ] Add "Considered Approaches" section (show all options, show why chosen)
- [ ] Rename "Out of Scope" → "Future Considerations" (more positive framing)
- [ ] Document "implementation risks" associated with chosen approach

---

## UC-4: Product Manager - Requirement Discovery

### Persona
- Riley: PM at mid-size SaaS company
- Scope creep is constant problem
- Needs to surface hidden requirements before they break MVP

### Problem
"Every time we ship, we discover requirements we missed. I want models to ask the questions I'm forgetting to ask."

### Scenario

```
Riley: "New feature: AI-powered meeting summaries. Users upload meeting recordings,
get transcript + summary. What am I missing?"

[Relevant Order Mode]

Claude (0.92): "Requirements hiding here: Multiple speakers (diarization)?
Accuracy for jargon? Speaker identification? Multi-language? Timestamps in
summary? Integrations (Slack post summary)? Storage/retention?"

GPT-4 (0.88): "Privacy/compliance: HIPAA if healthcare? GDPR for EU users?
Data retention policy? Who can download transcripts? Audit logs? Encryption
in transit/at rest?"

Gemini (0.85): "UX/Product questions: Summary length (1 min? 5 min?)? Ability
to customize summary focus? Search transcripts? Redo summary with different
parameters? Cost model for users (pay per summary)?"

[Spec Auto-updated with 30+ questions Riley hadn't considered]

[Unresolved Questions Section Now Includes]
- Speaker diarization required?
- Multi-language support?
- GDPR compliance needed?
- Search transcripts?
- Summary customization?
- Cost model?

Riley: "Okay, let's narrow. GDPR yes. Multi-language no. Speaker ID yes.
Summary customization for V1 is no. What are the highest-priority unknown
unknowns?"

[Moderator Mode - Synthesis with constraints]

"Given your constraints, highest-priority unknowns:
1. Accuracy requirement for technical meetings (medical/legal terminology)
   - Riley needs to test accuracy before shipping
2. Storage strategy (encrypted, compliant)
   - Impacts infrastructure choice significantly
3. Rate limiting (cost control for yourself, fairness for users)
   - Determines MVP economics
4. Transcript search (users will expect this, not in scope but should plan for)
   - Impacts data model design

Recommendation: Define accuracy acceptance criteria before MVP.
Fail fast on this technical risk."

[Spec now includes]
- Acceptance criteria: Accuracy threshold TBD (test on 10 real meetings)
- Storage: GDPR-compliant, encrypted (AWS S3 + server-side encryption)
- Rate limiting: 5 summaries/day initially (re-evaluate based on costs)
- Future: Transcript search (requires Vector DB, V2)

Riley: "How long will accuracy testing take?"

[This becomes a project timeline question, captured in spec]
```

### Spec Validation

**What this teaches us:**
1. ✅ Models asking questions works as intended for requirement discovery
2. ✅ Moderator mode helps prioritize among unknowns
3. ⚠️ **Gap: Spec needs "Test Plan" or "Acceptance Criteria" section**
4. ⚠️ **Gap: "Implementation Timeline" tied to unknown unknowns**
5. ✅ Constraints (GDPR, multi-language) narrow scope effectively

### Iterations Needed

- [ ] Add "Acceptance Criteria / Test Plan" section
- [ ] Add "Technical Risks & Validation" section (early testing priorities)
- [ ] Link timeline to risk validation milestones

---

## UC-5: Technical Debt - Refactor Evaluation

### Persona
- Taylor: Tech lead, 3-year-old codebase
- Considering major refactoring effort
- Engineering team split on whether it's worth it

### Problem
"Should we refactor the authentication system? Some think it's too risky, others think it's critical. I need a clear recommendation."

### Scenario

```
Taylor: "We have a legacy JWT auth system. Issues: no refresh token rotation,
sessions not invalidated on logout properly, password reset flow is hacky.
Options: Patch it with minimal changes, full refactor, or replace with
managed service (Auth0).

Constraints: 2-person team, 6-week window, can't break existing 2M users.

What should we do?"

[Moderator Mode - From the start (known to be contentious)]

Claude: "This is security-critical code. Patching = technical debt accumulates.
Long-term answer: full refactor or managed service. Short-term: managed service
safer (Auth0 has battle-tested system, you focus on integration)."

GPT-4: "Managed service introduces vendor lock-in and $500/month cost. Full
refactor is risky with 2 people. Compromise: Patch the most critical issues
(session invalidation), plan full refactor for next quarter."

Gemini: "Risk assessment: Current system breaks = all users affected. Refactor
breaks = rollback possible but painful. Managed service breaks = vendor
incident (rare but devastating). Which risk acceptable?"

[Moderator Synthesis]

"No consensus yet. This requires explicit decision from you (risk tolerance).

The models present three valid options with different risk profiles:

Option A (Managed Service - Auth0):
Pros: Battle-tested, reduces ops burden, security well-maintained
Cons: Vendor lock-in, $6k/year cost, integration work (4-5 weeks)
Risk: Vendor incident affects all 2M users
Best for: Risk-averse, want to buy security

Option B (Full Refactor):
Pros: Own your auth, no vendor risk, addresses all issues
Cons: 2-person team = high risk, 6-8 weeks timeline, could break existing system
Risk: Implementation bugs = security holes in your system
Best for: High-confidence team, willing to accept delay for control

Option C (Patch + Plan):
Pros: Low immediate risk, fixes most critical issues, buys time
Cons: Technical debt continues, not sustainable 2-3 years
Risk: Future audits/breaches caused by incomplete fixes
Best for: Buying time until team expands

Recommendation: Your call based on risk tolerance. Ask team: 'If this goes
wrong, what's the cost?' That determines best option."

Taylor: "If auth breaks, we lose customer trust. What if we split the difference?
Patch the most critical, plan managed service evaluation for next quarter?"

[Debate Mode - Evaluate this hybrid]

Claude: "Hybrid works. Session invalidation is critical fix (1-2 weeks). Then
evaluate Auth0 while system runs stable."

GPT-4: "Agree, but deprioritize. Session invalidation is medium risk. Refresh
token rotation more urgent (easier to exploit)."

Gemini: "Good planning. Explicitly document what we're NOT fixing and why it's
acceptable risk."

[Convergence]

Claude: "I think Taylor's hybrid is sound. Phase 1: Patch refresh token +
session invalidation (2 weeks, low risk, managed service evaluation in parallel.
Phase 2: Migration if Auth0 evaluation positive."

[Spec Updated with Hybrid Decision]

Architecture Decision: Two-phase approach
Phase 1: Patch critical auth issues (refresh token, session invalidation)
  Timeline: 2 weeks
  Risk: Medium (complex session logic)
  Validation: Security review before deploy

Phase 2: Evaluate managed service (Auth0 or similar)
  Timeline: Research + POC (3 weeks, next quarter)
  Decision criteria: Cost, integration complexity, team comfort

Deferred to Phase 2: Full refactor discussion
  Rationale: Gather data on managed service feasibility first
```

### Spec Validation

**What this teaches us:**
1. ✅ Moderator mode excellent for risk assessment and tradeoffs
2. ✅ Models helping structure decision alternatives
3. ⚠️ **Gap: Decision framework missing** (how do we formally evaluate options?)
4. ✅ Phased decisions work well (defer to next phase)
5. ⚠️ **Gap: "Risks & Mitigations" section needed**

### Iterations Needed

- [ ] Add "Decision Framework" section (how options are evaluated)
- [ ] Add "Risks & Mitigations" section (structured risk register)
- [ ] Add "Phase/Timeline" section (if phased approach)

---

## Summary: Spec Iteration Findings

### Major Gaps Found

| Gap | Impact | Priority |
|-----|--------|----------|
| Missing "Risks & Mitigations" section | High - risk not being tracked | P0 |
| Missing "Considered Approaches" section | Medium - context on decisions lost | P1 |
| Missing "Acceptance Criteria" section | High - how do you know when done? | P0 |
| Missing "Technical Debt Decisions" | Medium - refactor tradeoffs unclear | P2 |
| Spec format is too freeform | Medium - harder to parse/validate | P1 |
| No decision dependency tracking | Medium - parallelization hard to see | P2 |
| Future vs. deferred not distinguished | Low - minor clarity issue | P3 |

### Mode Effectiveness

| Mode | Best For | Issues Found |
|------|----------|--------------|
| Relevant Order | Initial exploration, question discovery | Works as intended |
| Moderator | Risk assessment, decision synthesis | Needs decision framework |
| Debate | Explicit disagreement, convergence | Works well, needs explicit triggering |

### Key Validations

✅ **Multi-model diversity works** - Each model catches aspects others miss (security, UX, ops, architecture)

✅ **Spec creation with models reduces unknowns** - Hidden requirements surfaced proactively

✅ **Debate/synthesis reaches consensus** - Models building on each other's points

⚠️ **Risk assessment critical** - Most decisions have risk tradeoffs that need explicit documentation

⚠️ **User input required at decision points** - Not all decisions can be synthesized by models

---

## Recommendations for Spec Refinement (Next Session)

1. **Add required sections** (Risks & Mitigations, Acceptance Criteria, Considered Approaches)
2. **Formalize spec structure** (consider JSON schema for machine parsing)
3. **Create decision framework template** (how to evaluate options)
4. **Add phasing support** (decisions can be Phase 1/2/Future)
5. **Reconsider mode triggering** (should Debate auto-trigger on disagreement?)
