# Context Compression: Carrying Knowledge Across Phases

## Overview

**Context Compression** is the mechanism that prevents later phases from re-debating settled questions.

When Phase 1 ends, we don't throw away the session transcript. Instead, we **compress it** into digestible learnings that Phase 2 can build on.

This is the key to making phased development efficient.

---

## The Problem It Solves

### Without Context Compression

```
PHASE 1 SESSION (2 hours)
Product: "Should we use offline-first or cloud-first?"
Architecture: "Offline-first because users are remote"
Security: "Cloud-first is simpler security model"
Product: "But users need offline capability"
Architecture: "CRDT sync can work with offline-first"
[30 minutes of debate]
DECISION: Offline-first with CRDT sync

PHASE 2 SESSION (without context)
Product: "Should we support real-time collaboration?"
Architecture: "Let me think about offline support first..."
Product: "Wait, we already decided offline-first in Phase 1"
Architecture: "Let me re-read Phase 1 transcript..."
[Wasting time re-reading and re-understanding]

30 minutes spent re-understanding what Phase 1 already settled.
```

### With Context Compression

```
PHASE 1 SESSION (2 hours)
[...same debate as above...]
DECISION: Offline-first with CRDT sync

COMPRESSION:
"Phase 1 validated offline-first architecture with CRDT sync.
Supports distributed teams. Foundation is solid."
(1 paragraph instead of 2-hour transcript)

PHASE 2 SESSION (starts with context)
PM: "Phase 1 validated offline-first architecture."
Architecture: "Great, let's extend that for team sync"
Product: "Real-time collaboration on that foundation?"
[Immediately productive, building on Phase 1]
```

Saved 30 minutes that would be wasted re-understanding Phase 1.

---

## What Gets Compressed

### Tier 1: Settled Architectural Decisions

**Keep because:** Future phases depend on them
**Compress to:** One sentence summary

```
FULL PHASE 1 DELIBERATION:
Security: "We should use end-to-end encryption for notes"
Product: "That adds complexity. How much?"
Architecture: "Additional sync overhead of ~10%"
Security: "Users' privacy is non-negotiable"
Product: "Is 10% acceptable?"
UX: "Users won't notice 10% latency"
Product: "OK, let's do E2E encryption"

COMPRESSED FOR PHASE 2:
"Phase 1 implemented E2E encryption for notes,
 adding 10% sync overhead but providing user privacy."

Why compress: Phase 2 doesn't need to re-debate this.
Trust Phase 1's decision. Use this as foundation.
```

### Tier 2: Validated Technical Approaches

**Keep because:** Phase 2 will extend them
**Compress to:** Technical summary + performance baseline

```
FULL PHASE 1 DELIBERATION:
[Detailed discussion of SQLite vs. cloud DB vs. local IndexedDB]
Architecture: "SQLite works well at 10K notes per user"
[Performance testing discussion]
[Scaling discussion]
DECISION: SQLite local storage

COMPRESSED FOR PHASE 2:
"Phase 1 uses SQLite for local storage, validated at 10K+ notes.
Performs well on mobile and desktop. Scales to 100K notes."

Why compress: Phase 2 knows what to expect. Can focus on
extending SQLite for team scenario, not re-debating storage.
```

### Tier 3: Performance Baselines

**Keep because:** Phase 2 must meet or improve them
**Compress to:** Key metrics only

```
FULL PHASE 1:
[Detailed performance testing metrics]
Latency: 50-100ms
Battery impact: 3% per hour
Sync time: <1s for 100 notes
Memory: 50MB average

COMPRESSED FOR PHASE 2:
"Phase 1 baselines: <100ms latency, 3% battery/hr, <1s sync,
50MB memory on average device."

Why compress: Phase 2 teams should not exceed these numbers.
Single number per metric. Easy reference.
```

### Tier 4: User Preferences Discovered

**Keep because:** Phase 2 UX should respect them
**Compress to:** Actionable preferences only

```
FULL PHASE 1 QA:
[Long feedback list from testing]
- Users preferred manual sync over automatic
- Users wanted sync history visible
- Users appreciated offline indicators
- Users didn't care about update timestamps

COMPRESSED FOR PHASE 2:
"Users prefer: manual sync triggers, visible sync history,
offline indicators. Can skip: detailed timestamps."

Why compress: Phase 2 UX inherits these preferences
for consistency and user satisfaction.
```

### Tier 5: Scope Boundaries Confirmed

**Keep because:** Phase 2 needs to know what Phase 1 chose NOT to do
**Compress to:** List of deferred features

```
FULL PHASE 1:
[Discussion of what's out of scope]
- No permissions model (Phase 2)
- No sharing (Phase 2)
- No real-time updates (Phase 2)
- No advanced search (Phase 3)

COMPRESSED FOR PHASE 2:
"Phase 1 scope: Single-user, no sharing, no permissions,
no real-time. All phase 2+ features."

Why compress: Phase 2 knows what to add without guessing.
Clear handoff between phases.
```

---

## What Doesn't Get Compressed

### Open Questions

```
KEEP (Don't compress):
- "Should we add offline search?"
- "How many notes can users create?"
- "What's the notification strategy?"

Why: These should be REVISITED in Phase 2, not forgotten.
Keep as explicit questions for next session.
```

### Critical Issues

```
KEEP (Don't compress):
- "Conflict resolution UI was confusing"
- "Search doesn't handle special characters"
- "Mobile performance needs work"

Why: Phase 2 must know about Phase 1 issues.
These are PRE-REQUISITES for moving forward.
```

### Unvalidated Assumptions

```
KEEP (Don't compress):
- "Assuming 10,000 concurrent users (not validated)"
- "Assuming users accept 5-second sync latency"
- "Assuming users prefer privacy over performance"

Why: If these assumptions are wrong, Phase 2 can catch it.
