# Iterative Spec Emergence: How Specs Grow Through Deliberation

## Overview

Traditional spec approach:
```
You write → Spec is static → Developers implement
(assumes you knew everything upfront)
```

Roundtable spec emergence approach:
```
You describe vision → Panels deliberate → Spec emerges
(assumes experts will surface what you didn't know)
```

This document explains how specs grow iteratively through structured deliberation, with decisions emerging rather than being pre-specified.

---

## The Core Principle

**Specs aren't documents to write. They're discoveries to make.**

When you describe your vision to a team of experts, they immediately start asking questions you didn't know to ask:
- "How will users access this?"
- "What if two users try to do this simultaneously?"
- "Does this have compliance implications?"
- "What's the fallback if this fails?"

These questions **force you to make decisions**. Through those decisions, a specification emerges.

---

## Three Phases of Spec Emergence

### Phase 1: Vision to Outline (Input Phase)

**User Input:**
```
"I want to build a project management tool where teams
can collaborate on tasks, with real-time updates and
offline capability for remote workers."
```

**Project Manager Extracts:**

Explicit Requirements:
- Team collaboration on tasks
- Real-time updates
- Offline capability

Implicit Constraints:
- Remote teams (distributed)
- Worker-focused (productivity)
- Real-time + offline = complex sync problem

**Initial Outline:**
```
FEATURES:
- Tasks
- Team collaboration
- Real-time sync
- Offline access

CONSTRAINTS:
- Distributed teams (latency tolerance)
- Real-time expectations (sync speed important)
- Offline requirement (data must exist locally)
- Worker productivity (UX speed critical)
```

This outline is deliberately incomplete. That's the point.

### Phase 2: Deliberation to Discovery (Elaboration Phase)

**Panels Begin Questions:**

PRODUCT PANEL asks: "What's the MVP? Can't ship everything"
- Forces: Priority decisions
- Result: MVP features clarified

ARCHITECTURE PANEL asks: "How do we sync real-time + offline?"
- Forces: Architectural decisions
- Result: Sync strategy decided (CRDT? Event log? Last-write-wins?)

SECURITY PANEL asks: "Who owns the data? Authentication?"
- Forces: Identity decisions
- Result: User/team auth model decided

UX PANEL asks: "Offline - what happens when reconnected?"
- Forces: UX decisions
- Result: Conflict resolution UI specified

**Spec Grows Round by Round:**

```
After Round 1:
✓ MVP defined (tasks, assignees, due dates)
✓ Full features listed (comments, attachments, sharing)
✓ Sync mechanism chosen (eventual consistency CRDT)

After Round 2:
✓ Offline conflict handling specified (CRDT merge)
✓ Real-time protocol chosen (WebSocket for connected clients)
✓ User authentication model (OAuth + session)

After Round 3:
✓ Data ownership model (team-level encryption)
✓ Sync retry strategy (exponential backoff)
✓ UX for offline conflicts (show both versions, let user choose)

After Round 4:
✓ Performance baselines (sync latency <500ms)
✓ Battery considerations (batched sync, not continuous)
✓ Network resilience (queue updates when offline)
```

Spec is 80% complete now. The remaining 20% will emerge as panels drill down.

### Phase 3: Conflicts to Resolution (Refinement Phase)

**When Panels Disagree:**

```
CONFLICT 1: Real-time Expectations
Product: "Users expect instant updates (Google Docs style)"
Architecture: "True real-time with offline is hard.
              Could do 1-2 second sync instead"
UX: "Users won't notice 1-2 second delay if we hide it"

Resolution: "Real-time for local edits, eventual consistency
            for remote updates (1-2s propagation)"
Spec Update: "Updates visible instantly locally, sync within 2s network"

---

CONFLICT 2: Offline Scope
Product: "Full app works offline"
Architecture: "Creating new tasks offline is complex without server auth.
              Reading cached tasks works, creating needs sync confirmation"
Security: "Creating tasks offline needs temporary queue, post-sync"

Resolution: "Read-only offline, write-with-sync approach. UI shows
            'queued for sync when online'"
Spec Update: "Offline mode: read cached tasks only. Create/edit queued.
            Clear user feedback on pending actions."

---

CONFLICT 3: Encryption Overhead
Security: "Team-level encryption for shared tasks"
Architecture: "Encryption slows sync, especially on mobile"
UX: "Users won't accept slow interface"

Resolution: "Encrypt sensitive data (task content). Use indexed
            encryption (encryption at field-level, not full DB)"
Spec Update: "Selective encryption: task titles/content encrypted,
            metadata (due date, assignee) indexed for search"
```

Each conflict resolved is a spec detail clarified.

---

## Spec Emergence Structure

### What Emerges Organically (Don't Pre-specify)

These shouldn't be decided by the user upfront. Let experts surface them:

```
ARCHITECTURAL DECISIONS:
- Sync mechanism (CRDT? Event log? Last-write-wins?)
- Protocol choices (WebSocket? Server-Sent Events? Polling?)
- Database strategy (Relational? Document? Graph?)
- Offline storage (SQLite? Local IndexedDB? Both?)

SECURITY MODEL:
- Authentication flow (OAuth? Session? JWT?)
- Encryption scope (End-to-end? Server-side? Field-level?)
- Authorization model (Team-based? Permission-based?)
- Data residency (Which regions? Compliance?)

UX PATTERNS:
- Conflict resolution UI (Show both? Last-write? Ask user?)
- Loading states (Spinner? Skeleton? Progressive load?)
- Offline indicators (Banner? Icon? Just work silently?)
- Error handling (Toast? Modal? Inline?)

PERFORMANCE BASELINES:
- Sync latency targets (Real-time? 1-2s? 5s?)
- Batch sizes (How many updates per sync?)
- Network resilience (Retry strategy?)
- Battery considerations (Mobile power impact?)
```

These emerge through deliberation because:
1. Experts understand tradeoffs better than users
2. Context matters (platform, network, user expectations)
3. Decisions interconnect (sync choice affects encryption choice)

### What User Should Decide Upfront (Or Early)

```
VISION & GOALS:
- What problem does this solve?
- Who uses it? (Individual? Team? Enterprise?)
- What's the unique value?

CONSTRAINTS:
- Timeline / launch date
- Budget / resource constraints
- Target platforms (web? mobile? both?)
- Regulatory requirements (HIPAA? SOC2? GDPR?)

BUSINESS MODEL:
- Who pays? (Users? Enterprise? Free?)
- Pricing (Freemium? Subscription? One-time?)
- Support model (Self-serve? Premium support?)

CORE FEATURES:
- What's in MVP? (User definitely knows this)
- What's future? (Willing to defer)
- What's "never"? (Out of scope forever)

INTERACTION LEVEL:
- Hands-off or hands-on oversight?
- Any decisions user wants to make?
- Any decisions user wants us to make?
```

---

## How Spec Emerges in Practice

### Session Structure for Emergence

```
SETUP PHASE (5 min):
- Project Manager understands vision
- Panels assembled and briefed

EXPLORATION PHASE (20 min):
- Round 1: "What are the main features?"
- Round 2: "How do they work together?"
- Round 3: "What constraints matter?"

ELABORATION PHASE (30 min):
- Round 4: "How do we sync real-time + offline?"
- Round 5: "How do users authenticate?"
- Round 6: "What's the fallback when things fail?"

CONFLICT RESOLUTION PHASE (15 min):
- Addresses disagreements
- Forces tradeoff decisions
- Clarifies boundaries

SYNTHESIS PHASE (10 min):
- Project Manager organizes decisions
- Creates coherent spec structure
- Identifies dependencies

REVIEW PHASE (5 min):
- "Does this match your vision?"
- "Any decisions to revisit?"
- Ready to implement
```

### Example: Task Management App Emergence

**SETUP:**

User: "I want a task management app for remote teams"
PM: "Tell me about your team. How many? What's the workflow?"
User: "5-20 people teams, mostly distributed. Async-first culture"

Panels Assembled:
- Product (feature prioritization)
- Architecture (sync complexity)
- UX (remote collaboration patterns)
- No Security (no sensitive data mentioned yet)

**ROUND 1: Core Features**

Product asks: "What can users do?"

Emerges:
```
Core (Must-have):
- Create tasks
- Assign to team members
- Set due dates
- Mark complete

Nice-to-have (V2):
- Comments
- Attachments
- Recurring tasks
- Timeline view
```

UX adds: "Need real-time feedback that teammates see your changes"

Emerges:
```
MVP Feature List:
- Create/edit/delete tasks (real-time)
- View team tasks (real-time)
- Assign/comment (real-time)
- Complete/archive (real-time)
```

**ROUND 2: Team Collaboration**

Architecture asks: "Multiple users editing same task simultaneously?"

Forces: Conflict resolution decision

Emerges:
```
Conflict Resolution:
- Same task edited by Alice and Bob while offline
- Both reconnect
- How to merge changes?

Option A: Last-write-wins (simpler, loses data)
Option B: Show both, user chooses (complex, preserves intent)
Option C: CRDT merge (complex, preserves changes)

Decision: Option C (CRDT) for authenticity, prevents data loss
```

**ROUND 3: Real-Time Sync**

Product asks: "When does user see teammate's changes?"

Forces: Sync latency decision

Emerges:
```
Real-Time Sync Strategy:
- Option A: True real-time (WebSocket, always connected)
  Pro: Instantaneous, collaborative feel
  Con: Battery drain on mobile, always needs connection

- Option B: Periodic sync (every 2-5 seconds)
  Pro: Balanced, works on poor networks
  Con: Updates delayed, feels less real-time

- Option C: Smart sync (event-driven + polling fallback)
  Pro: Best of both worlds
  Con: More complex

Decision: Option C (Smart sync)
- Push updates when connected (WebSocket)
- Poll every 5s as fallback
- Batches updates for efficiency
```

**ROUND 4: Offline Capability**

UX asks: "Can I create tasks on plane? What happens?"

Forces: Offline write strategy

Emerges:
```
Offline Strategy:
- Local-first with eventual sync
- Can create tasks offline
- Queue for sync when reconnected
- UUID-based task identification

Offline Limitations:
- Can't assign to teammate (validation needs server)
- Can see cached team tasks only
- Comments queued for sync

UI Feedback:
- "queued" badge on tasks created offline
- "synced" confirmation when posted
- Error states if sync fails
```

**ROUND 5: Mobile Considerations**

Architecture asks: "Mobile battery impact?"

Forces: Performance/optimization decision

Emerges:
```
Mobile Optimization:
- Sync batched every 30 seconds (not continuous)
- WebSocket only when app active
- Polling when backgrounded (if at all)
- Local SQLite for fast task loading
- Push notifications instead of polling for reminders
```

**ROUND 6: Failure Resilience**

Security/Architecture asks: "What if sync fails?"

Forces: Error handling and retry strategy

Emerges:
```
Sync Failure Handling:
- Exponential backoff (1s → 2s → 4s → 8s)
- Max retries: 10 times over 1 hour
- After 1 hour failure: Show error to user
- User can retry manually
- Unsync'd changes stored locally

Data Integrity:
- Each update has timestamp + device ID
- Server validates before merging
- Orphaned updates expire after 7 days
```

**SYNTHESIS:**

After all rounds, Project Manager organizes:

```
FEATURES (what users do):
✓ Create, edit, delete tasks
✓ Assign to team members
✓ Set due dates, mark complete
✓ Real-time team visibility
✓ Offline-first workflow
✓ Conflict-free merge (CRDT)

ARCHITECTURE (how it works):
✓ Local SQLite storage
✓ Smart sync (WebSocket + polling)
✓ CRDT conflict resolution
✓ Event-based architecture
✓ Exponential backoff retry

USER EXPERIENCE:
✓ Real-time feedback for own actions
✓ 5-second propagation for team changes
✓ "Queued" indicator for offline actions
✓ Sync status visibility
✓ Clear offline/online boundaries

CONSTRAINTS & TRADEOFFS:
✓ Eventual consistency (not real-time true)
✓ Can't assign offline (needs validation)
✓ Mobile: 30-second sync batching
✓ Sync retry: 1-hour timeout

DECISIONS MADE:
✓ CRDT for conflict resolution
✓ Smart sync over always-connected
✓ Local-first + eventual sync
✓ Event-based architecture
✓ Mobile-optimized batching
```

### Spec is Complete

User now has:
- Complete feature list
- Architectural decisions made
- UX patterns documented
- Performance baselines
- Tradeoff analysis
- Implementation roadmap

All emerged through deliberation. Nothing was pre-specified that could be discovered.

---

## Benefits of Iterative Emergence

### 1. Discovers What You Don't Know You Don't Know

```
User thinking: "I need a task app"
Without experts: Misses offline complexity, sync challenges
With deliberation: Architects discover CRDT needs, UX discovers
                   conflict resolution UI challenges
Result: Spec is comprehensive, not superficial
```

### 2. Expert Perspectives Are Baked In

```
Without deliberation: User writes spec, developer says
                      "I can't implement this"
With deliberation: Architecture ensures feasibility from start
                   UX ensures usability from start
                   Security ensures safety from start
Result: Spec is implementable and good quality
```

### 3. Tradeoffs Are Explicit

```
Without deliberation: "Make it real-time" (user doesn't know
                      cost: battery drain, complexity, server load)
With deliberation: "Real-time costs X, eventual consistency costs Y,
                   smart-sync balances both"
Result: User makes informed decision with full cost picture
```

### 4. Prevents Spec Rewrite During Implementation

```
Without emergence: Developer reads spec, discovers gap, asks for
                  clarification (week 3 delay)
With emergence: Gaps discovered during deliberation, resolved before
                development starts
Result: Development starts with complete understanding
```

### 5. Emerges Natural Order of Decisions

```
Decisions don't have to be independent. Architecture choice
affects UX choice affects Security choice.

Deliberation forces natural order:
- First decide: What are we building? (Product)
- Then decide: How do we build it? (Architecture)
- Then decide: How do we secure it? (Security)
- Then decide: How do we make it usable? (UX)

Result: Decisions are interdependent and coherent
```

---

## Patterns in Spec Emergence

### Pattern 1: Architecture Drives Everything

```
Architecture decision: "CRDT for conflict resolution"
  → UX derives: "Show conflict resolution UI"
  → Product derives: "Can create tasks offline"
  → Security derives: "Encryption per update"
  → Performance derives: "Sync batching"

One architectural choice cascades through entire spec.
```

### Pattern 2: UX Surfaces Implementation Challenges

```
UX asks: "What happens when sync fails?"
  → Surfaces need for error UI
  → Surfaces need for retry logic
  → Surfaces need for local queue persistence
  → Would be missed if UX didn't ask

UX perspective catches practical implementation needs.
```

### Pattern 3: Security Constraints Are Non-Negotiable

```
Security says: "Need encryption for task content"
Architecture: "Costs performance"
UX: "Still works if we show loading"

Final decision: "Encrypt, accept slight UX delay, show loading state"

Security constraint became architectural decision became UX pattern.
```

### Pattern 4: Product Forces Prioritization

```
Product decides: "MVP is core features only, no comments/attachments"
Architecture: "That simplifies sync significantly"
UX: "That means simpler UI too"
Timeline: "4-month launch now achievable"

Product prioritization unlocks feasibility. Scope drives architecture.
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: User Over-Specifies

```
Problem: User comes with detailed spec, doesn't listen to experts
Result: Experts not involved, spec quality suffers

Solution: Project Manager asks: "Is this a requirement or idea?"
          If idea, let experts propose alternatives
          If requirement, ask "why?" to understand constraint
```

### Anti-Pattern 2: Too Much Deliberation

```
Problem: Panels debate the same decision for 30 minutes
Result: No emergence, just infinite discussion

Solution: Project Manager says: "You've identified the tradeoff.
          Let's move forward with X, knowing Y is the cost"
```

### Anti-Pattern 3: Spec Not Converging

```
Problem: After 5 rounds of deliberation, spec still vague
Result: Nothing emerged

Solution: Check if Project Manager is synthesizing effectively
          Check if panels are actually deliberating or just talking
          Check if user is providing enough context
```

### Anti-Pattern 4: Decisions Contradict Each Other

```
Problem: Architecture says "use document DB", Security says
         "need relational for audit trail", contradictions emerge
Result: Spec has built-in conflict

Solution: Better facilitation to identify these early
          Ask: "Will this architectural choice conflict with
               security or UX requirements?"
```

---

## Spec Emergence Timeline

### Short Projects (4 weeks to MVP)

```
Session 1: Intake + Panels + Deliberation (1.5 hours)
  → Scope ruthlessly limited
  → MVP features only
  → Simple architecture
  → Spec complete

Implementation: 3.5 weeks
```

### Medium Projects (3-6 months)

```
Session 1: Intake + Initial Deliberation (2 hours)
  → MVP scope defined
  → Architecture foundation
  → Main constraints identified

Week 2: Architecture Deep-Dive Session (2 hours)
  → Sync strategy detailed
  → API design
  → Database schema

Week 3: UX Workshop Session (2 hours)
  → Interaction patterns
  → Error handling UX
  → Offline UX

Spec emerges over 3 weeks through multiple deliberations
Implementation: Months 2-6
```

### Large Projects (6-12 months)

```
Phase 1: MVP Deliberation (2 hours)
  → Core features
  → Basic architecture
  → Foundation spec

Phase 2: Infrastructure Deliberation (2 hours)
  → Scalability requirements
  → Performance baselines
  → Deployment strategy

Phase 3: Security & Compliance (2 hours)
  → Regulatory requirements
  → Security architecture
  → Audit requirements

Phase 4: Full System Specification (2 hours)
  → Integration patterns
  → Monitoring/alerting
  → Operations model

Spec emerges over 2-3 months through deliberation cycle
Implementation: Months 4-12
```

---

## Why This Works

Specs aren't something you write. They're something you discover through structured conversation with smart people who know different domains.

Roundtable makes that conversation:
- **Structured** - Panels focused on their domain
- **Productive** - Time-boxed, decision-focused
- **Comprehensive** - Multiple perspectives ensure nothing missed
- **Quality** - Expert input ensures implementability

The spec that emerges is better than any spec one person could write upfront.

---

## Next Steps

After spec emerges:

1. **Review** - User reviews emergence, confirms decisions
2. **Finalize** - Project Manager creates clean spec document
3. **Implement** - Developers implement with clear spec
4. **Post-Mortem** - Learn what could improve for next project
5. **Skills Update** - Improvements feed back into expert skills

Spec emergence is the beginning of the learning cycle.
