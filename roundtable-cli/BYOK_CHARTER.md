# Roundtable CLI: Bring Your Own Key (BYOK) Charter

## Mission Statement

Roundtable CLI is built on the principle of **user control, transparency, and trust**. This charter documents our binding commitment to unrestricted Bring Your Own Key (BYOK) support.

---

## The BYOK Commitment

We commit to the following principles, in perpetuity:

### ✅ 1. BYOK Will Never Be Paywalled

- Users can supply their own Anthropic (or other provider) API keys at no additional cost
- BYOK functionality will remain **completely free**, forever
- There will be **no premium tier that restricts BYOK**
- No subscription required to use your own API keys

### ✅ 2. Core Multi-Agent Functionality Always Supports User API Keys

- All core debate mechanics, agent orchestration, and deliberation features work with BYOK
- Future premium features (if any) will be **additive only**
- Premium features will never gatekeep core BYOK functionality
- You can always run the full Roundtable experience with your own keys

### ✅ 3. No Bait-and-Switch Policy

- If we ever add bundled/trial credits alongside BYOK, both will coexist
- We will never deprecate or restrict BYOK for past or present users
- Users who start with BYOK will never be forced to switch models
- No surprise changes to feature availability for BYOK users

### ✅ 4. This Is a Binding Project Principle

- This charter is as binding as our codebase
- Not a marketing promise subject to business decisions
- Not a "while supplies last" offer that can be withdrawn
- Violation of this charter would be a fundamental breach of project values

---

## Why This Matters

### The Cursor Precedent

In 2024, Cursor IDE famously restricted "Bring Your Own Key" functionality for free users, requiring a paid subscription to access features that previously worked with user API keys. This decision:

- **Betrayed user trust** - Users had invested in workflows assuming BYOK would always be free
- **Created vendor lock-in** - Once workflows were built on Cursor, switching was painful
- **Sparked community backlash** - Users migrated to Cline and Windsurf en masse
- **Demonstrated fragility** - A business decision can override platform promises

Roundtable will never do this.

### Our Guarantee

Unlike Cursor, Anthropic competitors, or closed-source tools:

**Roundtable CLI is open source.**

If we ever violate this charter, the community can:
1. Fork the project
2. Continue the version before the violation
3. Maintain their own version forever

This is your protection. A fork is harder to maintain than operating within our charter.

---

## How We'll Honor This Commitment

### 1. Code-Level Transparency

- Core BYOK functionality is in the open-source codebase
- Anyone can audit that BYOK is not restricted
- Anyone can verify we haven't added license checks or remote restrictions
- No hidden "phone home" code that disables BYOK

### 2. Documented in Project Governance

- This charter appears in the repository, not just marketing materials
- Referenced in PHASED_DEVELOPMENT.md
- Included in contributor guidelines
- Not subject to unilateral removal

### 3. Multi-Agent Oversight

- Major architectural changes go through community review
- Significant business decisions are transparent
- Changes to authentication or key handling require explicit charter updates
- Charter updates require version bumps and deprecation periods

### 4. Deprecation Policy (If Ever Needed)

If we ever need to make a breaking change (extremely unlikely):

1. **2-year deprecation period minimum**
   - Not a surprise, not a rushed timeline
   - Gives users time to adapt

2. **Full grandfathering**
   - Existing installations continue to work
   - No forced upgrades

3. **Community fork path**
   - Open-source means you have an exit route
   - If we break this charter, fork the last good version

---

## What BYOK Means for You

### Setup

```bash
# Get your Anthropic API key from https://console.anthropic.com/
export ANTHROPIC_API_KEY="sk-ant-..."

# Install Roundtable
npm install -g roundtable-cli

# Start deliberating - no additional setup needed
roundtable start
```

### You Control Your Costs

- Every API call uses **your** Anthropic account
- You see exactly what you're spending
- No surprise charges or hidden fees
- You can set spending limits in your Anthropic console

### You Control Your Data

- Deliberations run locally (unless you explicitly save to cloud)
- Session data stays on your machine
- No telemetry or usage tracking of your content
- Your debates are your intellectual property

### You Control Your Future

- You're not locked in to Roundtable's business model
- If we change course, you can fork
- If you want to run your own model, you can integrate it
- You have optionality

---

## What This Doesn't Mean

### BYOK is not "Free to Run"

You pay the Anthropic API directly. Roundtable CLI is free software, but running it costs money (typically $0.01-0.05 per deliberation session, depending on agent count and debate rounds).

### BYOK is not "No Signup Required"

You still need:
1. An Anthropic account (free to create at https://console.anthropic.com/)
2. API billing enabled (minimum $5 credit, then pay-as-you-go)
3. An API key from your Anthropic console

### BYOK is not "Unlimited Features"

Some features might be premium-only (e.g., cloud dashboard, collaboration, managed agents). But **core multi-agent debate will always be in BYOK**.

### This Charter is Not a Service Level Agreement (SLA)

We don't promise:
- Uptime (it's open source, you host it)
- Support (community-driven, not guaranteed)
- Feature completeness (we're still building)
- Performance guarantees (depends on your hardware)

We only promise: BYOK will stay free and unrestricted.

---

## FAQ

### Q: Will you ever add a premium tier?

**A:** Possibly. But premium features would be additive (dashboards, hosted agents, collaboration). Core BYOK debate is forever free. See our [Phased Development Plan](./docs/implementation/PHASED_DEVELOPMENT.md).

### Q: What if Roundtable gets acquired?

**A:** This charter is binding. A new owner would have to honor it. If they don't, users can fork the last good version. Open source is your protection.

### Q: What if you need the money?

**A:** Totally fair question. We'd explore:
- Optional donations
- Premium additive features (not restricting BYOK)
- Enterprise support/consulting
- Hosted managed service (separate from BYOK CLI)

But we would NOT restrict BYOK to make money. That violates this charter.

### Q: What if another AI company offers a better API?

**A:** Roundtable supports multiple LLMs (or will). You can use your own keys from any provider. We're not locked into Anthropic (though we dogfood Claude because it's great).

### Q: Can I fork and modify Roundtable?

**A:** Yes! The license is MIT. Fork away. The only thing you can't do is use our trademarks or claim we endorse your fork.

### Q: What if this charter is unclear?

**A:** Great question. Ambiguities are resolved in favor of the user. If it's unclear whether something violates BYOK, assume it does and it's not allowed.

---

## The Bottom Line

We understand your skepticism. You've seen other tools promise openness and deliver lock-in.

**Roundtable is different because:**

1. We've codified this commitment in writing
2. We've acknowledged the Cursor precedent explicitly
3. We've made it open source (so you have an exit)
4. We've bound it to our governance, not just marketing

**Try us. If we break this promise, fork us. Either way, you win.**

---

## References

- **See also:** [Phased Development Plan](./docs/implementation/PHASED_DEVELOPMENT.md) - Our long-term vision
- **See also:** [Contributing Guide](./CONTRIBUTING.md) - How to participate in governance
- **License:** [MIT](./LICENSE) - Full legal text
- **Repository:** [GitHub](https://github.com/anthropics/roundtable-cli)

---

**Charter Status:** Active and binding as of 2024-10-22
**Version:** 1.0
**Last Updated:** 2024-10-22
