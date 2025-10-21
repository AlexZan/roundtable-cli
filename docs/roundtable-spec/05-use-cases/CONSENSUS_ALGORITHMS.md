# Use Cases: Consensus Algorithms & Decision Frameworks

Consensus algorithms define how disagreements are resolved. Different algorithms serve different contexts:
- **Democratic Majority:** All perspectives valued, majority decides
- **Security-First Veto:** Security concerns halt decisions
- **Product-Centric:** Product constraints override technical desires
- **Comprehensive:** All perspectives documented equally

These use cases showcase how algorithm choice affects deliberation and decisions.

---

## UC-A1: Same Question, Three Algorithms, Different Outcomes

### Setup
All three use the same project and question, but with different consensus algorithms.

**Question:** "Should we use WebSockets or HTTP polling for real-time data?"

**Panels (same across all three scenarios):**
- Architecture: "WebSockets more efficient"
- Data: "HTTP polling simpler to scale"
- Product: "WebSockets have higher ops cost"

---

## Scenario A1-1: Democratic Majority Algorithm

```
Consensus Algorithm: democratic_majority
────────────────────────────────────────

Round 1 Responses:
  Architecture: "WebSockets (better tech)"
  Data: "HTTP polling (easier to scale)"
  Product: "Either works, evaluate both"

Vote Tally:
  WebSockets: 1 vote (Architecture)
  HTTP Polling: 1 vote (Data)
  Abstain: 1 vote (Product)

Majority Rule:
  No majority found (1-1-1)
  Escalate to next round

Round 2: Deeper Discussion:
  Architecture: "WebSockets reduce latency 50%, better UX"
  Data: "HTTP polling reduces server load 40%, cheaper"
  Product: "Okay, which is cheaper overall?"

Round 2 Analysis:
  Cost breakdown:
    - WebSockets: Higher ops, lower data costs
    - HTTP polling: Lower ops, higher data/bandwidth costs
  Break-even point: ~100K concurrent users

Product: "We're starting at 10K users. HTTP polling is cheaper NOW.
          Migrate to WebSockets when we hit 50K users."

Revised Vote:
  Architecture: "Still prefer WebSockets architecturally"
  Data: "Agreed, HTTP polling fits our scale"
  Product: "Yes, this makes business sense"

Result: 2-1 majority for HTTP polling

Decision: HTTP polling for MVP
Confidence: MEDIUM (Architecture concerned but outvoted)
Rationale: Cheaper for current scale, revisit at 50K users
Note: Architecture's concern about latency captured for future


Spec Entry:
  "DECISION: HTTP polling for MVP
   Consensus: Democratic Majority (2-1)
   Minority: Architecture prefers WebSockets for latency
   Migration Plan: Revisit when user base hits 50K"
```

**Algorithm Effect:** Architectural concerns noted but not blocking. Pragmatic majority decision wins.

---

## Scenario A1-2: Security-First Veto Algorithm

```
Consensus Algorithm: security_first_veto
────────────────────────────────────────

Note: This question isn't security-critical, so algorithm
      behaves like democratic majority.

Round 1:
  Architecture: "WebSockets"
  Data: "HTTP polling"
  Product: "Either"

Security Check:
  Q: Does either approach create security concerns?
  A: "HTTP polling sends more requests, slightly larger attack surface
      WebSockets maintain persistent connection, potential DoS concern"

Security Assessment: "Both have manageable security implications.
                     No veto triggered. Proceed with democratic majority."

Result: Same as democratic majority scenario (HTTP polling)
```

**Algorithm Effect:** Security steps through and assesses. If no veto-worthy concern, defers to majority vote.

**Different Question - Where Veto Triggers:**

If question were: "Should we accept user-supplied WebSocket payloads?"

Security: "⚠️ VETO - That's code injection vulnerability.
          No WebSocket payload should be user-supplied without validation."

Product & Architecture can't override this veto.
They must redesign to avoid the vulnerability.

---

## Scenario A1-3: Product-Centric Fast Algorithm

```
Consensus Algorithm: product_centric_fast
──────────────────────────────────────────

Round 1:
  Architecture: "WebSockets (better architecture)"
  Data: "HTTP polling (simpler infrastructure)"
  Product: Sets constraint: "Timeline: 4 weeks, Budget: $40k"

Product Decision Framework:
  "Given 4-week timeline:
   - WebSockets: Complex implementation, 3 weeks + 2 weeks ops work = risky
   - HTTP polling: Standard pattern, 2 weeks + 1 week debugging = safe

   DECISION: HTTP polling (fits timeline better)
   Architecture & Data: Can you deliver in this timeline?
   Both: Yes"

Result: HTTP polling
Confidence: HIGH (timeline constraint clear)
Rationale: Fits timeline and budget


Key Difference from Democratic Majority:
  Democratic: "Let's debate, majority wins" (took 2 rounds)
  Product-Centric: "Timeline is constraint, we choose what fits it"
                   (decided in 1 round)
```

**Algorithm Effect:** Faster decision by using constraints as decision criteria instead of debate.

---

## Scenario A1-4: Comprehensive Synthesis Algorithm

```
Consensus Algorithm: comprehensive_synthesis
──────────────────────────────────────────────

Round 1: All panels submit detailed positions

Architecture Position:
  "WebSockets Recommendation
   Pros:
     - 50ms latency vs 500ms (10x better)
     - Single persistent connection
     - Server can initiate updates
   Cons:
     - More complex implementation
     - Stateful servers (scaling harder)
     - Higher ops cost

   Best for: >100K concurrent users OR <100ms latency requirement
   Risk if wrong: Poor user experience, competitive disadvantage"

Data Position:
  "HTTP Polling Recommendation
   Pros:
     - Stateless servers (scales horizontally)
     - Standard architecture (lots of references)
     - Lower infrastructure cost
   Cons:
     - Increased bandwidth (100ms → 500ms latency)
     - More requests, more server load
     - Less responsive UX

   Best for: <10K concurrent users AND relaxed latency needs
   Risk if wrong: Scaling wall at 50K users, UX complaints"

Product Position:
  "Decision criteria: Timeline, Cost, User expectations
   Our situation:
     - Timeline: 4 weeks
     - Budget: $40k
     - Users: Starting at 10K
     - Competitor latency: 300ms

   HTTP polling meets all immediate needs.
   WebSockets valuable future capability.

   Both architectures viable for Phase 1."

No Consensus Forced - All Recorded:

Spec Document Entry:
  "## Real-Time Technology Choice

   ### Considered Approaches:

   #### Approach A: WebSockets
   Advocate: Architecture Panel
   Best suited for: Latency-critical, >100K users
   Implementation cost: High
   Operational cost: High
   Timeline: 5 weeks

   Trade-off: Better user experience, higher complexity
   Risk: Overly complex for current scale

   #### Approach B: HTTP Polling
   Advocate: Data Panel
   Best suited for: Early stage, <50K users
   Implementation cost: Low
   Operational cost: Medium
   Timeline: 2 weeks

   Trade-off: Simpler now, will need migration later
   Risk: UX lag if latency-sensitive users complain

   ### Recommendation for Phase 1:
   Not specified (deferred to implementation team)

   ### Recommendation for Phase 2:
   Based on Phase 1 scale, revisit this decision

   ### Long-term Vision:
   Eventually move to WebSockets as scale increases

   ### Open Questions:
   - How critical is <100ms latency to our users?
   - At what user count does HTTP polling break down?
   - How much time/budget for Phase 2 architecture work?"


Result: Decision deferred
Confidence: COMPREHENSIVE (all perspectives documented)
Use: Implementation team chooses based on Phase 1 learnings
```

**Algorithm Effect:** No forced decision. All perspectives preserved for future reference. Implementation team has full context to make Phase 1/Phase 2 choice.

---

## Comparison: Same Question, Four Different Outcomes

| Algorithm | Decision | Timeline | Confidence | Next Steps |
|-----------|----------|----------|-----------|-----------|
| Democratic Majority | HTTP polling (2-1) | 2 rounds | MEDIUM | Proceed with polling |
| Security-First Veto | (Same, veto didn't trigger) | Same | Same | Proceed with polling |
| Product-Centric Fast | HTTP polling (fits timeline) | 1 round | HIGH | Proceed with polling |
| Comprehensive | Decision deferred (all perspectives documented) | 1 round | HIGH | Implementation team decides Phase 1 vs 2 |

---

## UC-A2: When Algorithms Really Matter - Breaking Tie

### Setup
Architecture and Data fundamentally disagree. Product abstains. Algorithm choice determines outcome.

**Question:** "Microservices or monolith?"

**Panel positions:**
- Architecture: MUST be microservices (scalability, team autonomy)
- Data: MUST be monolith (consistency, transaction simplicity)
- Product: "Either works, whatever ships faster"

---

### Algorithm A2-1: Democratic Majority

```
Vote: 1-1-abstain

Tie-breaking rule in democratic_majority:
  "With abstention, escalate to next round with more detail"

Round 2:

Architecture: "Microservices needed for our scale and team structure"
Data: "Monolith needed for data consistency (we have complex multi-table transactions)"
Product: "Help me understand: Can monolith scale? Can microservices handle our data model?"

Discussion:
  Architecture: "Monolith can scale to 1M users with caching and read replicas"
  Data: "Microservices could work with saga pattern or event sourcing, but complex"
  Product: "Okay, simpler path?"

Architecture: "Monolith is simpler path (2 months vs 3 months to ship)"

Revised positions:
  Architecture: "I prefer microservices architecture-wise, but monolith is pragmatic"
  Data: "Monolith is my preference, and faster to ship"
  Product: "Let's do monolith then"

Result: 3-0 for monolith (Architecture conceded)
Confidence: HIGH (genuine consensus after discussion)
```

---

### Algorithm A2-2: Security-First Veto

```
Security check: Does this decision affect security?
  Microservices: More surface area, harder to audit
  Monolith: Simpler audit, easier access control

Security: "Both are defensible architecturally. No veto.
          Proceed with tiebreaker (democratic majority)."

Result: Same as democratic majority (monolith)
```

---

### Algorithm A2-3: Product-Centric Fast

```
Product decision authority triggered (tie between Architecture and Data)

Product: "Constraint: Ship in 2 months
         - Microservices: 3 months to ship → doesn't fit
         - Monolith: 2 months to ship → fits

         DECISION: Monolith (meets timeline)"

Architecture & Data: Acknowledged

Result: Monolith (decided by constraint, not debate)
Confidence: HIGH (clear decision authority)
Time to decision: 1 round (vs 2 rounds for democratic majority)
```

---

### Algorithm A2-4: Comprehensive Synthesis

```
Both positions documented in full:

Position A (Architecture):
  "Microservices enables team autonomy and future scaling
   Prefer this for long-term health
   Accept monolith if constrained by timeline"

Position B (Data):
  "Monolith handles our complex transactions
   Prefer this for data consistency
   Accept if microservices solves consistency question"

Position C (Product):
  "Timeline/cost sensitive. Either architecture works.
   Seeking guidance on trade-offs."

Spec captures:
  "ARCHITECTURAL DECISION: Monolith vs Microservices (Unresolved)
   Architecture panel: Prefers microservices (scalability, autonomy)
   Data panel: Prefers monolith (transaction consistency)
   Product: Neutral (either works if timeline acceptable)

   Decision criteria not specified.
   Recommend: Phase 1 monolith (simpler), revisit at 1M users"

Result: Decision deferred with full context
Confidence: HIGH (both approaches understood)
Outcome: Team implements with full knowledge of trade-offs
```

---

## Summary: Algorithm Choice Matters

| Situation | Best Algorithm |
|-----------|---|
| Multiple perspectives, no clear authority | Democratic Majority |
| Security/compliance critical | Security-First Veto |
| Timeline/cost constraints | Product-Centric Fast |
| Research/documentation priority | Comprehensive Synthesis |
| Tied decision, need fast resolution | Democratic Majority (tiebreaker + 1 more round) |
| Tied decision with tight timeline | Product-Centric (decide via constraint) |
| Want to preserve all options | Comprehensive (defer decision) |

---

## UC-A3: Changing Algorithms Mid-Project

### Scenario
Project starts with one algorithm, learns from Phase 1, changes for Phase 2.

```
Phase 1: "Startup MVP - product_centric_fast"
  Result: Fast decisions, shipped MVP on time
  Learning: Product authority smooth, no complaints

Phase 2: "Enterprise customer demands features"
  New complexity: Features require trade-offs
  Product alone can't decide (too complex)

  Decision: Change to democratic_majority for Phase 2

$ roundtable config set-algorithm democratic_majority
  Changing algorithm from: product_centric_fast
  To: democratic_majority
  Effective for: Round X onwards

✓ Changed successfully
✓ Past decisions (Round 1-X) unaffected
✓ Future decisions (Round X+1 onwards) use new algorithm

Phase 2 Outcome:
  - More deliberation, but higher quality decisions
  - More time, but stakeholder buy-in
  - Architecture and Data panels get real voice (vs Product override)
```

---

## Open Questions About Consensus Algorithms

1. **Hybrid algorithms:** Can we combine multiple algorithms for different decision types?
2. **Learning:** Should algorithms adapt based on past decision quality?
3. **Override mechanism:** Should consensus be overrideable in crisis situations?
4. **Transparency:** How transparent should algorithm choice be to stakeholders?
5. **Auditing:** Should we track "would decision differ under different algorithm"?
