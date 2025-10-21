# Use Cases: Constitutions & Governance Frameworks

Constitutions define how a Roundtable project operates. They specify governance, decision authority, constraints, and escalation rules upfront, eliminating confusion about "how do we decide?"

These use cases showcase how different Constitutions serve different project types.

---

## UC-C1: Startup MVP - Product-Centric Fast Constitution

### Scenario
A founder needs to ship an MVP quickly. Time is the enemy. Lengthy deliberation about "should we debate this?" kills momentum.

```
$ roundtable init bikeshare-app --constitution "Startup MVP"

Constitution Loaded:
=====================
Name: Startup MVP
Consensus Algorithm: product_centric_fast
Panels: 4 (lean)
  - Product (decision authority)
  - Architecture (implementation specialist)
  - Data (schema + queries)
  - UX (design + flows)

Constraints:
  - Timeline: 8 weeks (hard constraint)
  - Budget: $80k (hard constraint)
  - Team: 3 engineers (hard constraint)
  - Tech Debt Acceptance: Up to 3 months old features can be
    deferred for V1.1

Timeline Threat Handling:
  If timeline threatened:
    Product decides: scope reduction OR accept technical debt
  Product's choice is final (no endless deliberation)

Sarah (founder): "We're building a bike sharing app.
                  Real-time bike availability + mobile booking.
                  Ship MVP in 8 weeks."

[ROUND 1: Architecture Makes Proposal]

Architecture Panel:
  "Microservices would be architecturally cleaner.
   Separate services for: bikes, bookings, payments, notifications.
   Timeline: 12 weeks to build and test properly."

  "Alternative: Monolith for MVP, refactor to microservices later.
   Timeline: 6 weeks.
   Technical debt: Yes, but manageable if we doc it."

[PRODUCT DECISION - Not Consensus, Product Decides]

Product Panel:
  "Timeline is 8 weeks (hard constraint).
   Microservices: 12 weeks ❌ (exceeds constraint)
   Monolith: 6 weeks ✓ (under constraint, gives buffer)

   DECISION: Monolith for MVP
   We accept technical debt (will refactor in V1.1)
   Timeline is non-negotiable."

[Architecture Panel Acknowledges]

Architecture:
  "Understood. We'll build monolith, document technical debt,
   plan refactor for Q2 when we have more resources."

Sarah: "Great. Next issue: database choice?"

[ROUND 2: Data Panel Proposal]

Data Panel:
  "PostgreSQL or MongoDB?

   PostgreSQL:
   - Pros: Strong consistency, ACID, complex queries work
   - Cons: Need schema design, scaling requires sharding effort
   - Timeline: 3 days for POC

   MongoDB:
   - Pros: Flexible schema, horizontal scaling easy
   - Cons: Eventual consistency, joining data is complex
   - Timeline: 2 days for POC

   Our recommendation: PostgreSQL (we'll manage scaling later)"

[PRODUCT DECISION - Again, Product Decides]

Product Panel:
  "Data recommends PostgreSQL. Good.
   But I'm asking: Can we ship MVP with either choice?
   Yes? Then PostgreSQL. It's what we know."

Data Panel: "Yes, both work for MVP."

Product Panel: "Decision: PostgreSQL"

Sarah: "Excellent. How long to build this?"

[ROUND 3: Architecture Estimates Timeline]

Architecture Panel:
  "Given monolith + PostgreSQL:
   - Auth system: 1 week
   - Bike availability: 1.5 weeks
   - Booking flow: 1 week
   - Payment integration: 1 week
   - Testing: 1 week
   - Buffer: 1.5 weeks
   Total: 7 weeks"

Product Panel: "Perfect. That fits our 8-week window.
               UX - can you design in parallel?"

UX Panel: "Yes. We're ready to start."

[CONSTITUTION PREVENTED EXTENSIVE DEBATE]

Notice what didn't happen:
❌ "Should we reconsider microservices?"
❌ "What if we hybrid-approached databases?"
❌ "Can we find a middle ground on MongoDB?"

Why? Because the Constitution made clear:
✓ Timeline is hard constraint
✓ Product has authority
✓ "Fast and good enough" beats "perfect and late"

Result:
- 3 key decisions made in 1 day
- All panels aligned on governance
- No debate about "who decides"
- Spec clearly documents "technical debt choices for MVP"
```

### Key Insight: Pre-Agreed Governance

Sarah didn't have to argue about which Constitution to use. She picked "Startup MVP" and all panels automatically knew:
- Product decides when timeline threatened
- We debate within constraints, not the constraints themselves
- Speed is valued over perfection
- This is for MVP, not the final system

This eliminated meta-discussions and focused on actual decisions.

---

## UC-C2: Healthcare SaaS - Security-First Veto Constitution

### Scenario
A healthcare app must prioritize security and compliance. Security can veto decisions. This constitution makes that explicit.

```
$ roundtable init health-saas --constitution "Healthcare HIPAA"

Constitution Loaded:
=====================
Name: Healthcare HIPAA
Consensus Algorithm: security_first_veto (security has veto power)
Panels: 6
  - Security (veto authority)
  - Compliance (enforcement)
  - Architecture
  - Data
  - UX
  - Product

Constraints (all non-negotiable):
  - HIPAA compliance mandatory
  - Audit logging on all PHI access
  - Encryption at rest and in transit
  - Data residency: US only

Escalation: Security concern = immediate halt

Dr. Chen (CTO): "Building electronic health records system.
                First feature: Patient medical history display."

[ROUND 1: Full Panel Response]

Architecture: "Here's how we'd structure it..."
UX: "Here's how patients see it..."
Data: "Here's how we store it..."
Compliance: "HIPAA requirements I see..."
Security: "Threats I identify..."

Product: "Timeline: 6 weeks. Budget: $200k"

[ALL RESPONSES READ BY SECURITY FIRST]

Security Veto?
  Looking at all proposals...
  ✓ No issues with architecture
  ✓ UX looks fine
  ✓ Data encryption is fine
  ✓ Compliance covered it

Security Approval: "Proceed"

[LATER: UX Proposes Change]

UX in Round 5: "To improve UX, let's cache patient names in browser cache.
              Makes page load faster, better autocomplete."

[SECURITY SEES CACHE PROPOSAL]

Security Panel:
  "⚠️ SECURITY VETO
   Caching PHI (patient names) in browser cache violates HIPAA.
   - Browser cache is not encrypted by default
   - Browser history/debugging tools can expose cache
   - This is a clear compliance violation

   DECISION: VETO
   Patient names cannot be cached in browser.
   This proposal is blocked."

[UX MUST RESPOND]

UX to Security:
  "Why don't we need this cache? Let me understand the constraint."

Security:
  "HIPAA rule: PHI must be in encrypted storage with access control.
   Browser cache doesn't provide either. Even if encrypted,
   browser cache violates access control (anyone with computer can view).

   Compliant options:
   1. Encrypted IndexedDB with server-side key management
   2. Server-side cache (no PHI in browser)
   3. Accept slower performance (no caching)

   Which can UX work with?"

UX to Security:
  "Option 2 (server-side cache) works if server is fast enough.
   Let's test. We can do Option 1 if performance is critical.
   Option 3 is last resort."

[ROUND 2: Testing Proposal]

Architecture & Data:
  "Server-side caching of patient names:
   - Cache in Redis (memory-resident)
   - TTL: 5 minutes
   - Encryption: Already encrypted in storage
   - Access logs: HIPAA audit trail maintained

   Performance impact: <10ms additional latency
   UX acceptable? Yes
   Security compliant? Yes"

[SECURITY APPROVES COMPROMISE]

Security Panel:
  "Server-side cached patient names with Redis:
   ✓ PHI remains encrypted
   ✓ Access controlled
   ✓ Audit logged
   ✓ HIPAA compliant

   VETO LIFTED - Proposal approved"

Result:
- UX got performance
- Security got compliance
- Constitution made clear: Security decides when HIPAA is at stake
```

### Why Security-First Matters

Without explicit Constitution:
```
UX proposes cache
Engineering debates
Product wants speed
Security concerned but uncertain of authority
Result: Confusion, rework, or compliance violation
```

With Security-First Constitution:
```
UX proposes cache
Security immediately vetoes (authority clear)
UX and Security explore alternatives
Compromise found that satisfies both
Result: Clear governance, compliant solution, no time wasted
```

---

## UC-C3: Enterprise Refactor - Democratic Majority Constitution

### Scenario
Large organization making major architectural refactoring decision. Many stakeholders, diverse perspectives, but no one has absolute veto. Decisions should be driven by group consensus.

```
$ roundtable init enterprise-refactor --constitution "Enterprise Hybrid"

Constitution Loaded:
=====================
Name: Enterprise Hybrid
Consensus Algorithm: democratic_majority
Panels: 6 (equal voice)
  - Architecture
  - Operations
  - Security
  - Data
  - UX
  - Product

Constraints:
  - Zero downtime requirement
  - 100% data consistency
  - Current service level agreement (99.95% uptime)

Escalation: Majority wins, minorities documented

Question: "Should we refactor monolith to microservices?"

[ROUND 1: All Panels Respond]

Architecture Panel:
  "Microservices: 18 months, $2M investment
   Benefits: Scalability, team autonomy, tech modernization
   Risks: Increased complexity, deployment coordination, observability

   Recommendation: YES (long-term worth it)"

Operations Panel:
  "Microservices deployment & monitoring: new challenges
   - Service discovery, health checks, logging coordination
   - Kubernetes learning curve for our team (2-3 months)

   Recommendation: CAUTIOUS YES
   (But we'll need training budget)"

Security Panel:
  "Microservices: expanded attack surface
   - More services to secure
   - More network boundaries to defend
   - But: Better isolation possible

   Recommendation: YES, WITH REQUIREMENTS
   (Need API gateway, service mesh, audit logging on all calls)"

Data Panel:
  "Data challenges with microservices:
   - Eventual consistency vs current strong consistency
   - Transaction complexity increases
   - Data governance harder

   Recommendation: CONDITIONAL YES
   (Only if we implement strong data governance layer)"

UX Panel:
  "Microservices affect UX teams indirectly
   - Slower API development (more coordination)
   - But: Feature teams move faster (autonomy)

   Recommendation: YES
   (Net benefit for UX after transition)"

Product Panel:
  "Business impact:
   - 18 months = competitors move ahead
   - Cost: $2M = significant investment
   - Benefit: Technical agility long-term

   Recommendation: CAUTIOUS
   (Only if we have clear ROI model)"

[CONSENSUS CHECK]

5 panels: YES or CONDITIONAL YES
1 panel: CAUTIOUS

Democratic Majority Algorithm:
  "Consensus: YES (majority favor)
   Confidence: MEDIUM (Product has concerns, Data has conditions)
   Proceeding with conditions all panels specified"

[CONDITIONS FROM MINORITY/CONDITIONAL PANELS]

Product's Conditions:
  "Prove ROI: Show cost savings from team agility"

Data's Conditions:
  "Implement strong data governance layer first"
  (This becomes a Phase 1 prerequisite)

[DECISION DOCUMENTED]

Spec Entry:
"DECISION: Pursue microservices refactor
Consensus: Democratic Majority (5 of 6 panels support)
Confidence: MEDIUM (Product and Data have reservations)

Conditions:
✓ Product: ROI model validation (before project start)
✓ Data: Data governance layer (Phase 1)
✓ Security: API gateway + service mesh (Phase 1)
✓ Operations: Team training (budget: $50k, 3 months)

Minorities (none - all panels supported direction)"
```

### Key Insight: Democratic vs Autocratic

Democratic majority works when:
- Multiple perspectives are valuable
- No single person has final authority
- Group alignment matters for implementation
- Minorities should be heard, but majority carries decision

---

## UC-C4: Custom Constitution - Policy-Driven Decision Making

### Scenario
An organization creates a custom Constitution encoding their specific policies and risk tolerance.

```
$ roundtable constitution new "AI Fairness First"

Creating Custom Constitution
? Name: AI Fairness First
? Base template: SaaS
? Consensus algorithm: democratic_majority
? Special policies: (yes)

Adding Policies:
================

Policy 1: Algorithmic Fairness Veto
  Trigger: Any decision involving ML models
  Rule: "If fairness expert objects on bias grounds, decision halted"
  Enforcer: fairness_panel

Policy 2: Open Source Licensing
  Trigger: Any external library decision
  Rule: "Only GPL 2.0, MIT, Apache 2.0, or BSD licenses allowed"
  Enforcer: legal_panel

Policy 3: Privacy by Design
  Trigger: Any data collection feature
  Rule: "Data minimization principle: collect only essential data"
  Enforcer: privacy_panel

Policy 4: Performance Budget
  Trigger: Any feature that impacts load time
  Rule: "P99 latency cannot increase by >100ms without removal"
  Enforcer: product_panel

Policy 5: Code Review Requirement
  Trigger: Any architectural decision
  Rule: "All code review comments must be addressed or explicitly overridden with rationale"
  Enforcer: architecture_panel

Custom Constitution Saved!

[WHEN CONSTITUTION IS USED]

$ roundtable init ml-product --constitution "AI Fairness First"

Constitution Loaded:
  Policies: 5 (custom)
  Any ML decision will trigger fairness review
  Any external lib triggers license check
  Any data collection triggers privacy review
  (etc.)

[POLICY IN ACTION]

Product proposes: "Use TensorFlow for recommendations"

License Check Triggered (Policy 2):
  TensorFlow uses Apache 2.0 license
  ✓ Approved (on whitelist)

Fairness Check Triggered (Policy 1):
  Fairness panel reviews: "Could this recommendation algo discriminate?"

  Analysis: "Recommendations trained on user behavior"
  Concern: "User feedback data has demographic bias from past"

  Recommendation: "Add fairness audit step before launch
                  Ensure no demographic disparity in recommendations"

  Status: ✓ Approved (with fairness audit added to timeline)

Performance Check Triggered (Policy 4):
  "ML model inference adds 50ms to API call"
  Current latency: 100ms
  Proposed: 150ms
  Budget: +100ms allowed

  Status: ✓ Within budget
```

### Custom Constitutions Enable Organizations to Encode Values

Instead of "we always think about fairness," the Constitution makes it automatic. Every ML decision is reviewed. No discussion needed about "should we check for bias?"

---

## Summary: Constitutions Transform Governance

| Decision Challenge | Without Constitution | With Constitution |
|---|---|---|
| "Who decides?" | Unclear, leads to conflict | Pre-agreed per Constitution |
| Timeline pressure | Endless debate about tradeoffs | Product decides (authority clear) |
| Security concern | Someone veto, unclear authority | Security veto explicit (or not) |
| Minority concerns | Lost in majority voice | Democratic majority captures all |
| Organizational values | Inconsistent application | Policies encoded, automatic |
| New projects | Reinvent governance each time | Reuse proven Constitution |
| Scaling decisions | Process breaks with more projects | Constitution scales |

---

## Open Questions About Constitutions

1. **Evolution:** How do organizations update Constitutions as they learn?
2. **Conflicts:** What if two Constitutions on same team conflict?
3. **Learning:** Can Constitutions learn from past decisions?
4. **Customization depth:** Can individual projects override Constitution rules?
5. **Certification:** Should organizations certify "this Constitution is reviewed and approved"?
