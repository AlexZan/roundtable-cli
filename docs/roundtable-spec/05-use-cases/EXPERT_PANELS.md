# Use Cases: Expert Panels & Multi-Agent Deliberation

Expert panels transform Roundtable from "multiple models giving opinions" to "domain experts collaborating and reaching consensus."

These use cases showcase how panels work: agents within the same domain debate each other, panels maintain independent context memory, and cross-domain concerns are automatically escalated.

---

## UC-P1: Enterprise Security Architecture - Multi-Agent Panel Consensus

### Persona
- Sarah: CISO at a $500M financial services company
- Designing authentication for a new trading platform
- Needs security consensus from multiple expert perspectives
- Different LLMs have different training, will naturally think about different aspects

### Problem
"I want security experts to debate and reach consensus on auth design. I'm not assigning them roles - I want their natural expertise to shine through and create authentic debate."

### Scenario

```
$ roundtable init trading-platform --constitution "Financial Services"

Constitution Loaded:
  Panels: 7 (includes 2-agent security panel)
  Security Panel: Claude + GPT-4 (no role assignments)
  Consensus: security_first_veto (security decides)

Sarah: "Design authentication for high-frequency trading platform.
        Requirements:
        - <50ms latency for auth checks
        - PCI-DSS compliance mandatory
        - Zero trust architecture preferred
        - 2FA for critical operations"

[SECURITY PANEL - NATURAL DEBATE]

Round 1 Responses:
(No assigned roles - both agents contribute their full expertise)

Claude:  [2,145 tokens]
  "Let me think about this systematically. I'd analyze:

   1. Threat model: What attacks are we defending against?
      - Token reuse attacks (high severity)
      - Man-in-the-middle attacks
      - Insider threats (trading fraud via token theft)

   2. Technical approach:
      - OAuth2 as foundation (industry standard)
      - Short-lived tokens (mitigate reuse)
      - TLS 1.3+ (mitigate MITM)
      - Hardware keys for high-privilege (mitigate insider)

   3. Compliance: We'll need audit logging, strong crypto

   Recommendation: OAuth2 + refresh token rotation + certificate pinning
                  Details on compliance logging TBD"

GPT-4:  [1,987 tokens]
  "Good structural thinking. From my perspective:

   The practical compliance requirements I see:
   - PCI-DSS 3.2.1: Strong cryptography
   - FINRA rules: ALL auth events logged with audit trail
   - SEC rules: Document auth decisions for regulators

   Key question: Your short-lived tokens are good security,
                 but audit logging on every token rotation
                 might break your <50ms latency requirement.

   Practical approach:
   - OAuth2 is good
   - Session storage server-side (auditable)
   - Batch logging within 5 minutes (compliant + performant)

   Trade-off: Server-side session state vs stateless JWT"

[PANEL CONSENSUS ALGORITHM: all_agree_or_flag]

Areas of Agreement:
  ✓ OAuth2 is the baseline
  ✓ Logging and audit trail required
  ✓ MFA for critical operations
  ✓ TLS 1.3+ enforcement

Areas of Divergence:
  ✗ Claude: Short-lived tokens (better security)
  ✗ GPT-4: Longer-lived tokens (better performance, still compliant)

  ✗ Claude: Client-side refresh token storage
  ✗ GPT-4: Server-side session state (compliance auditable)

[ROUND 2: Security Panel Debate]

Claude responds to GPT-4:
  "On tokens: Your compliance requirement is valid. Let's compromise:
   30-minute access tokens (good security) + server-side refresh tracking
   (compliance auditable). We can optimize latency with in-memory cache
   of recently verified tokens.

   On audit logging: Batch logging is acceptable if logs guaranteed
   persistent within 5 minutes. Compliance and performance both satisfied."
  [+834 tokens]

GPT-4 responds to Claude:
  "Compromise works for us. 30-minute access tokens are compliant.
   Batched logging within 5 minutes acceptable (tested with FINRA).

   One addition: Log with digital signature so regulators can verify
   logs haven't been tampered with. This is FINRA-required for trading
   systems."
  [+567 tokens]

Claude:
  "Digital signatures on logs - absolutely. Added to threat model anyway.
   I think we have consensus."
  [+234 tokens]

[PANEL CONSENSUS REACHED]

✅ SECURITY PANEL CONSENSUS (HIGH confidence - both agents aligned)

Decision:
  └─ Authentication Approach: OAuth2
     ├─ Access Token TTL: 30 minutes
     ├─ Refresh Tokens: Server-side tracking
     ├─ MFA: Required for critical operations (admin, trade approval)
     ├─ Audit Logging: Batched within 5 minutes
     └─ Log Integrity: Digital signatures (FINRA requirement)

Rationale Merged:
  ├─ Threat Coverage: Token reuse mitigated by short TTL
  ├─ Compliance: Full FINRA/SEC audit trail
  ├─ Performance: In-memory cache keeps <50ms latency
  └─ Confidence: Both security experts fully aligned

Tokens Used: 5,767 total
Cost: ~$0.04
Time Saved: 2 separate security reviews consolidated into 1 panel discussion

[Notes Saved]
experts/security/
  ├─ threat_model.md
  │  └─ Token reuse, MITM, insider threats documented
  ├─ compliance_requirements.md
  │  └─ PCI-DSS, FINRA, SEC requirements logged
  ├─ internal_debate_round_1.md
  │  └─ Initial positions: Claude (short tokens), GPT-4 (server sessions)
  ├─ internal_debate_round_2.md
  │  └─ Compromise found: 30-min tokens + server-side refresh tracking
  └─ consensus_decision.md
     └─ Final approach with rationale

[Spec Auto-Updated]
Auth Section Now Shows:
  "Security Expert Panel (Claude + GPT-4) reached HIGH-confidence consensus:
   OAuth2 with 30-minute access tokens and server-side refresh tracking.
   Both threat modeling and compliance requirements satisfied.
   See security panel notes for detailed reasoning."
```

### Key Insight: Natural Differences Create Better Debate

**Without natural training differences (with forced role assignment):**
```
Sarah assigns:
  - Claude: "You're the threat modeling expert"
  - GPT-4: "You're the compliance expert"

Result:
  - Claude only thinks about threats (what about performance?)
  - GPT-4 only thinks about compliance (what about architecture?)
  - They're playing roles, not thinking authentically
  - Debate is predictable (we prescribed their positions)
```

**With natural training differences (no role assignment):**
```
Sarah sets up panel WITHOUT role assignment:
  - Claude: Security expert (full expertise)
  - GPT-4: Security expert (full expertise)
  - No predetermined specialization

Result:
  - Claude naturally thinks systematically about threats + architecture
  - GPT-4 naturally thinks about practical compliance + performance tradeoffs
  - Both contribute across the domain
  - Authentic debate emerges from different thinking styles
  - Perspectives aren't prescribed, they're discovered
  - We learn: "Claude is naturally good at threat modeling" (data for V2)
```

**Benefits of Natural Approach:**
- ✅ More authentic contributions
- ✅ Less predictable (more surprising insights)
- ✅ Creates data for team formation later (V2)
- ✅ Doesn't limit agent to predetermined role
- ✅ Debate is genuine disagreement, not scripted conflict

### Spec Validation

**What this teaches us:**
1. ✅ Multi-agent panels eliminate need for external synthesis
2. ✅ Agents in same domain can debate productively (both heard)
3. ✅ Compromise emerges through dialogue (not forced by human)
4. ✅ Confidence levels matter (HIGH vs MEDIUM vs LOW consensus)
5. ✅ Notes organized per-panel reduces clutter
6. ✅ Token cost transparent (user sees expert time invested)

---

## UC-P2: Product Startup - UX Panel Internal Debate

### Persona
- Jordan: Product Lead at seed-stage startup
- Designing recurring tasks feature
- Two different approaches, unsure which is better
- Wants UX experts to debate before committing to implementation

### Scenario

```
$ roundtable init todo-app --constitution "SaaS MVP"

Constitution Loaded:
  Panels: 5
  UX Panel: Claude (Interaction Design) + GPT-4 (Accessibility)
  Consensus: democratic_majority

Jordan: "I'm adding recurring tasks. Three approaches:

  A: Calendar-style (click day/pattern)
  B: Natural language ('every Tuesday at 2pm')
  C: Templates + builder

  Which is best?"

[UX PANEL INTERNAL DEBATE]

Round 1:

Claude (Interaction Design):  [1,456 tokens]
  "Approach evaluation:
   - A (Calendar): Clear, WYSIWYG, discoverable
   - B (NLP): Powerful but error-prone, hard to correct
   - C (Templates): Complex, two UI modes confusing

   Recommendation: Approach A (calendar interface)
   Rationale: Best UX for general users, lower error rate"

GPT-4 (Accessibility):  [1,289 tokens]
  "Accessibility review:
   - A (Calendar): Drag-drop is accessibility nightmare
     Mobile users hate it. Keyboard navigation is complex.
   - B (NLP): Natural language is MORE accessible
     Works better on mobile. Voice-friendly.
   - C (Templates): Two UI modes are confusing for cognitive accessibility

   Recommendation: Approach B (natural language)
   Rationale: Most accessible for diverse users"

[PANEL DEBATE - Positions are genuinely different]

Round 2:

Claude to GPT-4:
  "Accessibility point is valid. But NLP parsing fails silently.
   User thinks they set 'every Tuesday' but system parses as 'every day Tuesday'.
   Trust broken.

   Question: Can we combine A and B? Calendar as primary (accessible design),
   NLP as advanced option? That way we get both accessibility AND clarity."
  [+567 tokens]

GPT-4 to Claude:
  "That's actually smart. Calendar UI designed accessibly (focus management,
   keyboard nav) + NLP as 'write it naturally' alternative. Both interfaces
   operate on same backend (templates).

   This solves my accessibility concern while keeping Claude's clarity.
   I could support this."
  [+445 tokens]

Claude:
  "And we can do accessibility testing on BOTH interfaces. Good plan.
   I think we have a consensus."
  [+234 tokens]

[PANEL CONSENSUS REACHED - Through Debate]

✅ UX PANEL CONSENSUS (HIGH confidence - both aligned on hybrid)

Decision:
  └─ Recurring Tasks UX: Hybrid Approach (A + B)
     ├─ Primary: Accessible calendar interface
     ├─ Alternative: Natural language input
     └─ Backend: Template-based (same model for both UIs)

Rationale:
  ├─ Clarity (Calendar) + Accessibility (NLP)
  ├─ Mobile-friendly (both) + Desktop-friendly (both)
  ├─ Error prevention (calendar validation) + Power-user expressiveness (NLP)
  └─ Confidence: HIGH (both experts debated and converged)

Tradeoff: Initial implementation larger (two UIs), but single backend
Accessibility Impact: Improves accessibility over calendar-only approach

[Spec Auto-Updated]
"UX Panel reached consensus on hybrid approach:
 Calendar interface (accessible, clear) + Natural language alternative (powerful).
 See UX panel notes for accessibility vs clarity tradeoff discussion."
```

### Why This Matters

Jordan saved time by letting UX experts debate. Neither expert was "right" - their perspectives were complementary:
- Clarity expert saw value but missed accessibility concerns
- Accessibility expert had valid concern about NLP reliability
- Debate produced synthesis that neither came up with alone

The panel system captures this dialogue and makes it reusable (can refer back to why this decision was made).

---

## UC-P3: Healthcare Startup - Security Panel Vetoes UX Panel

### Scenario
Security and UX panels have conflicting requirements. How does this work?

```
$ roundtable init health-app --constitution "Healthcare HIPAA"

Constitution Loaded:
  Panels: 6
  Security Panel: Claude + GPT-4 (veto power)
  Consensus: security_first_veto

UX Panel proposes: "Store health data in localStorage for offline support"

[CROSS-DOMAIN ESCALATION TRIGGERED]

Security Panel Reviews UX Proposal:
  "⚠️ CONCERN: localStorage proposal violates HIPAA rules.
   - XSS vulnerability exposes PHI
   - No encryption in localStorage
   - No access control on browser storage
   - HIPAA audit would flag this immediately

   STATUS: SECURITY VETO
   This approach cannot proceed without security approval."

[UX PANEL ESCALATED TO RESPOND]

UX Panel Receives Escalation:
  "Security panel raised concern: localStorage HIPAA violation"

UX Response Round 1:
  Claude (Interaction): "We chose localStorage for mobile performance.
                         But security veto is valid - HIPAA requirements trump UX."
  GPT-4 (Accessibility): "Agreed. We need offline support for accessibility,
                          but it can't break compliance."

[COMPROMISE ROUND]

UX Panel proposes alternatives:
  "Options maintaining offline support:
   1. Encrypted IndexedDB (browser-side encryption key from server)
   2. Service Worker cache + HTTPS only (no sensitive data cached)
   3. Local server-side storage (backend proxy for offline)

   Which is acceptable to security?"

[SECURITY PANEL EVALUATES ALTERNATIVES]

Security Response:
  "Option 1 (Encrypted IndexedDB):
    ✓ Better than localStorage (encryption present)
    ✗ Key management problem (where's decryption key?)
    ✗ Still browser-stored PHI

   Option 2 (Service Worker cache):
    ✓ No PHI in browser storage
    ✓ HTTPS-only (encrypted in transit)
    ✓ Aligns with HIPAA requirements

   Option 3 (Local proxy):
    ✓ PHI stays server-side
    ✓ Full compliance
    ✗ Mobile UX problem (depends on connectivity)

   RECOMMENDATION: Option 2 (Service Worker)
   This is HIPAA-compliant AND provides offline support."

[CONSENSUS ACHIEVED ACROSS PANELS]

✅ UX Panel agrees to Option 2
✅ Security Panel approves Option 2
✅ Both panels align on solution

Spec Updated:
  "Offline Support: Service Worker cache (no PHI in browser)
   Decision process: UX and Security panels debated requirements.
   Security veto triggered, compromise found through iteration.
   Final approach: HIPAA-compliant + provides offline support."
```

### Key Insight

The security veto didn't block progress - it **redirected** the discussion toward compliant solutions. UX and Security both got what they needed through structured debate.

---

## Summary: Why Expert Panels Matter

| Scenario | Without Panels | With Panels |
|----------|---|---|
| Two experts with different opinions | Human must synthesize | Experts debate, reach consensus |
| Security concern about UX design | Security complains, unclear resolution | Security veto + constraint escalation + compromise found |
| Accessibility vs performance tradeoff | Separate discussions | Accessibility expert debates perf expert, hybrid emerges |
| Confidence in decisions | Unclear who thinks what | Panel consensus confidence level explicit |
| Decision rationale | Lost between expert opinions | Preserved in panel debate notes |
| Re-asking same question later | Re-discuss | Refer to panel notes, don't re-litigate |
| Token cost | Hidden in multiple separate queries | Visible per-panel |

---

## V1 vs V2: Two Eras of Panels

### V1 (Current Roadmap): Panels Without Role Assignment
**Philosophy:** Let natural training differences emerge

```
Security Panel (V1):
├─ Claude (domain: security, full expertise)
├─ GPT-4 (domain: security, full expertise)
└─ Both think about everything security-related
   └─ Natural differences create authentic debate
   └─ We discover: "Claude is naturally good at threat modeling"
   └─ We collect data for V2 team formation
```

**Example:** UC-P1, UC-P2 in this document

### V2 (Future): Teams Within Panels (Based on V1 Learnings)
**Philosophy:** Use V1 data to form specialized teams

```
Security Panel (V2):
├─ Threat Modeling Team
│  ├─ Claude (learned strength: threat modeling)
│  └─ Gemini (also shows threat focus?)
├─ Compliance Team
│  ├─ GPT-4 (learned strength: compliance)
│  └─ Claude-Sonnet (compliance validation)
└─ Teams coordinate within panel
   └─ Deeper expertise per sub-specialty
   └─ Based on V1 behavioral data, not assumptions
```

**When it happens:** After V1 projects reveal natural strengths

### Why This Progression?

| Aspect | V1 | V2 |
|--------|---|---|
| **Complexity** | Simple (list agents) | Complex (teams) |
| **Assumptions** | Minimal | Based on V1 data |
| **Implementation** | Fast | Takes time to analyze V1 data |
| **Authenticity** | High (no role bias) | High + Informed (role bias based on evidence) |
| **Learning** | Discover natural strengths | Apply discovered patterns |

---

## Open Questions About V1 Panels

1. **Emergence:** How quickly do natural differences emerge in debate?
2. **Measurement:** How do we measure if authentic debate is working?
3. **Transition:** When do we have enough V1 data to form V2 teams?
4. **Validation:** How do we validate V2 teams are better than V1 panels?
5. **Hybrid:** Can we run V1 and V2 in parallel to compare?
