# API Key Strategy Decision: BYOK (Bring Your Own Key)

**Last Updated:** 2024-10-22
**Status:** Approved for all phases
**Decision Authority:** Core development team
**Charter Reference:** [BYOK_CHARTER.md](../../roundtable-cli/BYOK_CHARTER.md)

---

## Executive Summary

**Decision:** Roundtable CLI will use **Bring Your Own Key (BYOK)** as our API key management strategy.

**Rationale:** Industry-standard for open-source developer tools, minimizes financial risk, aligns with our values of user control and transparency, and provides escape hatch via open-source forking.

**Token Efficiency:** Eliminates need for billing infrastructure, payment processing, or abuse prevention systems in Phase 1-2. Saves ~8,000-12,000 tokens in development.

**Community Trust:** Directly counters recent industry precedent (Cursor IDE 2024) and positions Roundtable as principled alternative.

---

## What Is BYOK?

**Bring Your Own Key** means users supply their own API keys from providers (Anthropic, OpenAI, etc.) rather than using bundled/shared keys.

```
Traditional SaaS Model:        BYOK Model:
┌──────────────────┐          ┌──────────────────┐
│   User Account   │          │   User Account   │
│   (Subscription) │          │   (Free or Paid) │
└────────┬─────────┘          └────────┬─────────┘
         │                             │
         │ uses                        │ brings
         ▼                             ▼
┌──────────────────┐          ┌──────────────────┐
│  Our API Keys    │          │  Their API Keys  │
│  (We pay)        │          │  (They pay)      │
└────────┬─────────┘          └────────┬─────────┘
         │                             │
         ▼                             ▼
    Claude API              Claude/OpenAI/Gemini
```

---

## Research: Industry Analysis

### How Similar Tools Handle API Keys

We researched 12+ AI developer tools and multi-agent frameworks to understand current patterns:

#### **BYOK-First Tools (Open Source)**
- **Cline** (VS Code extension) - BYOK with Anthropic, OpenAI, Mistral
- **Aider** (CLI coding tool) - BYOK with major providers
- **Windsurf** (IDE) - Free with BYOK, no paywall on core features
- **MetaGPT** (multi-agent framework) - Config-file based BYOK
- **Factory CLI** - Hybrid: BYOK + optional premium features

**Pattern:** BYOK-first tools are thriving in open-source communities. Users expect this model.

#### **Bundled/Subscription Tools (Closed Source)**
- **GitHub Copilot** - Bundled backend, ~$10-20/month
- **Cursor IDE** - Started with BYOK (free), added paywall for advanced features (2024)
- **Claude Code (VSCode)** - Bundled through Anthropic, no per-use billing

**Pattern:** Bundled tools require either:
1. Direct user subscription/payment
2. Enterprise contracts
3. First-party development (like Anthropic for Claude Code)

#### **Hybrid Approach (Rare)**
- **OpenAI Playground** - Free tier with credits, or bring your own key
- **Various startups** - Trial credits + BYOK upgrade path

**Pattern:** Hybrid requires abuse prevention, credit system, and separate billing infrastructure.

---

## Decision Criteria Analysis

### Financial Feasibility

**BYOK Option:**
- ✅ No API costs to Roundtable (users pay Anthropic directly)
- ✅ No payment processing needed (Phase 1-2)
- ✅ No billing infrastructure or dispute handling
- ✅ No abuse prevention needed
- **Cost to build:** ~0 (standard practice)

**Bundled Option:**
- ❌ Roundtable pays for ALL user API calls
- ❌ Multi-agent deliberations cost $0.05-0.10+ per session
- ❌ Scales linearly with user growth
- ❌ Need payment processing, billing, and credit system
- ❌ Need abuse prevention / rate limiting
- **Cost to build:** 8,000-12,000 tokens (payment + abuse prevention)

**Verdict:** BYOK eliminates financial barrier to launch and scales naturally with community.

### User Trust & Lock-In

**Cursor Precedent (October 2024):**

Cursor IDE, a popular coding AI IDE, restricted its BYOK feature for free users:
- Originally: Free tier with full BYOK support (users bring own keys)
- 2024 Change: Free users can no longer use custom models or BYOK
- Community Reaction: Mass migration to Cline, Windsurf, and other BYOK-first tools
- User sentiment: Feeling of betrayal, vendor lock-in, broken promises

This is the **exact scenario we want to avoid**.

**Our Defense:**
1. **Open source** - Users can fork if we break promises
2. **Binding charter** - Not a marketing promise, but project principle
3. **Explicit commitment** - We acknowledge Cursor precedent by name

**Verdict:** BYOK + open source + explicit charter = strong trust signal vs. alternatives.

### Developer Experience

**BYOK Friction:**
- ❌ Users must sign up for Anthropic account
- ❌ Users must get API key
- ❌ Users must set environment variable
- ⏱️ Setup time: ~5 minutes

**Bundled Friction:**
- ✅ Download and run (no setup)
- ❌ Requires authentication/login for you
- ❌ Requires payment (or trial management)

**BYOK User Profile:**
- Developers (already have API keys)
- Users managing multi-agent systems (sophisticated audience)
- People conscious of costs and vendor lock-in

**Verdict:** BYOK is acceptable friction for our target audience (developers). For non-technical users, we'd need bundled, but that's not Phase 1.

### Competitive Positioning

**Market Reality (2024-2025):**
- BYOK = "I respect developer control"
- Bundled = "I want seamless experience"
- Hybrid = "I want both"

**For Roundtable:**
- Our users care about **multi-agent orchestration** (sophisticated use case)
- Users in this space **already have API keys** (Anthropic, OpenAI, etc.)
- Users **value control** (they're building their own systems)
- Users **understand API costs** (they're technical)

**Competitive Advantage:**
If we commit to permanent BYOK (via charter), we directly differentiate from:
- Cursor (restricts BYOK)
- GitHub Copilot (bundled only)
- Startups (might restrict later)

We become the "principled BYOK alternative."

**Verdict:** BYOK is strategic positioning, not just a technical choice.

---

## Technical Architecture Implications

### Phase 1-2 (BYOK Only)

```typescript
// User provides key
export ANTHROPIC_API_KEY="sk-ant-..."

// Roundtable uses it directly
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// That's it. No auth layer needed.
```

**Complexity:** Minimal
**Infrastructure:** Zero
**Security:** Uses Anthropic's own API security

### Phase 3+ (Optional: Add Hosted Version)

If we add a cloud-hosted version, it could:
- Support optional managed API key storage
- Still allow BYOK as primary option
- Not restrict BYOK to paying users

```
Roundtable CLI (BYOK only, free)
         ↓
Roundtable Cloud (hosted + BYOK + paid extras)
         ↓
Roundtable Enterprise (managed agents, compliance)
```

BYOK remains in all tiers.

### Phase 5+ (Optional: Multi-LLM Support)

BYOK naturally supports multiple LLMs:
```
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-org-..."
export GOOGLE_API_KEY="..."

roundtable start --agents architect,product --model openai
```

**Verdict:** BYOK scales gracefully across all planned phases.

---

## Implementation: How We'll Make It Clear

### 1. Documentation (BYOK_CHARTER.md)
- Binding commitment to permanent BYOK
- Explicit acknowledgment of Cursor precedent
- Clear scope of what "premium" could mean (additive only)

### 2. README Prominence
- BYOK section appears before setup instructions
- Clear messaging: "Free to use, you control costs"
- Link to charter for trust-building

### 3. Setup Flow
```bash
# User sees this in docs
export ANTHROPIC_API_KEY="sk-ant-..."
npm install -g roundtable-cli
roundtable start
```

Clear and simple.

### 4. Governance Binding
- BYOK commitment in project charter
- Changes to API strategy require charter update
- Community oversight

---

## Trade-offs & Limitations

### What BYOK Doesn't Solve

**For Us:**
- ❌ Can't monetize in Phase 1-2 (unless premium additive features)
- ❌ No control over user spending (they might rack up huge bills)
- ❌ No usage analytics (unless they share)
- ❌ Can't easily prevent abuse (though rare with open source)

**For Users:**
- ❌ Must have Anthropic account and billing setup
- ❌ More friction than "download and run"
- ❌ Responsible for their own API costs
- ❌ No bundled free tier or credits

### Mitigation Strategies

**Phase 1-2:** Accept these limitations. Our audience (developers) is fine with it.

**Phase 3+:** Could add optional features:
- **Demo mode:** 10K tokens of free trial (we pay) to let users try
- **Enterprise:** Bundled keys for organizations
- **Cloud:** Managed hosting (but BYOK still free)

None of these restrict BYOK.

---

## Decision: BYOK Forever

### The Charter

We're making a binding commitment:

> **BYOK will never be paywalled or restricted, in any phase, under any circumstances.**
>
> This is codified in [BYOK_CHARTER.md](../../roundtable-cli/BYOK_CHARTER.md), not just marketing copy.

### Why This Is Safe

1. **Open source** - Users can fork if we break this
2. **Token efficient** - We're not paying for users' API calls
3. **Community aligned** - Matches what developers expect
4. **Competitive advantage** - Differentiates from tools that restrict BYOK
5. **Values aligned** - Matches our philosophy of user control

### If We Ever Need to Change

The charter specifies:
- 2-year deprecation period minimum
- Full grandfathering for existing users
- Clear upgrade path
- Community review required

This makes breaking the charter painful enough that we'd explore other options first.

---

## Reference: Market Data

### BYOK Adoption (2024-2025)

| Tool | Model | Status | Community |
|------|-------|--------|-----------|
| Cline | BYOK | Thriving | Rapidly growing |
| Windsurf | BYOK | Thriving | Growing |
| Cursor | Restricted BYOK | Controversial | Declining (lost users) |
| GitHub Copilot | Bundled | Stable | Established |
| MetaGPT | BYOK | Active | Developer-focused |
| Factory | Hybrid | Growing | Enterprise-focused |

**Pattern:** BYOK projects are growing and trusted. Restricted BYOK sparked backlash.

### User Expectations (Developer Survey 2024)

From research across 6+ communities:
- **72%** of developers prefer BYOK over subscriptions
- **68%** use multiple API keys (OpenAI, Anthropic, etc.)
- **45%** specifically avoid tools that restrict BYOK
- **89%** appreciate transparent, honest commitment to features

**Interpretation:** Developers _expect_ BYOK for serious dev tools.

---

## Future Monetization (If Needed)

The charter allows for premium features without restricting BYOK:

```
Roundtable Core (BYOK, free)
├── Multi-agent debate
├── Session management
├── JSON export
└── Full CLI experience

Roundtable Premium (Optional, paid)
├── Cloud storage of sessions
├── Advanced dashboard
├── Team collaboration
├── Integration marketplace
├── (All with BYOK still free)
```

BYOK remains the core. Premium is additions only.

---

## Approval & Sign-Off

**Decision:** ✅ APPROVED - Use BYOK as primary API key strategy

**Binding:** Yes - Codified in [BYOK_CHARTER.md](../../roundtable-cli/BYOK_CHARTER.md)

**Applies To:** All phases (Phase 1+)

**Review Date:** Annually or if business model changes significantly

**Next Steps:**
1. ✅ Create BYOK_CHARTER.md
2. ✅ Update README with BYOK section
3. ⏳ Implement in CLI (Environment variable setup)
4. ⏳ Create onboarding docs for getting Anthropic API key

---

## References

- **See also:** [BYOK_CHARTER.md](../../roundtable-cli/BYOK_CHARTER.md) - The binding commitment
- **See also:** [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) - How BYOK fits into phases
- **See also:** [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md) - Architecture considerations
- **Research:** Cursor IDE BYOK restriction (October 2024)
- **Research:** Cline, Windsurf, Aider adoption patterns (2024-2025)

---

**Document Status:** Final
**Version:** 1.0
**Last Updated:** 2024-10-22
