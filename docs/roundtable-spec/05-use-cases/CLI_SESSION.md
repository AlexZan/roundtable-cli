# CLI Session Walkthrough: myFive Dating App Vision Meeting

**Real example of Roundtable in action - from vague idea to Phase 1 development package**

## Architecture: Generic Meeting → Specialized Based on Intent

Roundtable works for ANY discussion:
- Brainstorming a product idea → Project Manager specializes it
- Debating architectural approaches → Technical Lead joins
- Analyzing a bug / problem → Incident Commander joins
- Team alignment on priorities → Facilitator stays general
- Market research discussion → Strategist joins

**Key insight:** The Meeting Facilitator is always neutral. Only when the user indicates they want to BUILD SOMETHING (project development), does the PM join. For other discussions, specialists join contextually.

This session shows: **Brainstorming → PM Detection → Panel Formation → Dev Package**

---

## Pre-Session: User starts CLI

```bash
$ roundtable start

████████████████████████████████████████████████████████████████
                    ROUNDTABLE v1.0
          Structured Dialogue for Better Decisions
████████████████████████████████████████████████████████████████

[MEETING FACILITATOR]
👋 Hello! I'm your Meeting Facilitator.

What would you like to discuss today?

[USER INPUT PROMPT]
> (Tell me what's on your mind - a topic, idea, decision, problem, etc.)
```

---

## User Indicates Project Development

```
[USER INPUT]
> I want to build a dating app. I have this idea called myFive where
> you can only have 5 active matches at a time. I think it could solve
> the paradox of choice in dating apps.

[MEETING FACILITATOR]
Got it—sounds like you have a product idea you want to develop.

I'm bringing in our Project Manager. They specialize in taking ideas
like yours and turning them into concrete development specifications
through structured panel discussion.

[CONTEXT PASSED TO PM]
────────────────────────────────────────
User Vision (from facilitator notes):
- Product: Dating app called "myFive"
- Core constraint: 5 active matches per user (hard limit)
- Problem solved: Paradox of choice in dating apps
- Positioning: Intentionality over infinite browsing
- Value prop: More meaningful conversations (people focused on 5, not juggling 50)
────────────────────────────────────────

---
```

---

## PM Joins With Context

```
[PROJECT MANAGER AGENT joins the meeting]

[PM]
Hi! I'm the PM. I've reviewed your myFive idea—interesting concept:
intentional matching with a hard 5-match limit.

Here's what we'll do now:

1. I'll clarify a few specifics about your vision
2. Form specialized panels to pressure-test the idea
3. Panels debate and surface potential issues
4. We'll create a development specification you can hand to engineers

Let me start with some clarifications on what you described...

[PM - CLARIFYING QUESTIONS]
1. When someone uses up all 5 matches (all chats end), do they
   automatically get 5 new matches, or do they request new ones?
2. Can either person unmatch, or do both need to consent?
3. What's your revenue model—premium features, subscription, ads?

[USER INPUT]
> 1. They request new matches, we curate the next 5
> 2. Either person can clear a slot anytime
> 3. Haven't thought about revenue yet, maybe freemium

[PM]
Perfect. Now I'm forming 4 specialist panels to debate this vision.
Each will ask hard questions and pressure-test your assumptions.

Forming panels...
```

---

## Phase 3: Panels Form & Begin Deliberation

```
[SYSTEM MESSAGE]

[PM]
Forming 4 debate panels. I'm selecting diverse models for each panel
to challenge your assumptions from multiple angles.

Default: 2-3 models per panel (you can configure)

Available models:
├─ Claude (depth, nuance, systems thinking)
├─ ChatGPT (reasoning, complex analysis)
├─ Gemini (pattern recognition, alternatives)
└─ Grok (contrarian, edge cases, real-time awareness)

Panel 1: PRODUCT & UX DEBATE
├─ Question: Will users actually accept the 5-match constraint?
├─ Models: Claude (depth) + ChatGPT (reasoning) + Grok (contrarian)
└─ Focus: User experience, retention, engagement

Panel 2: SAFETY & TRUST DEBATE
├─ Question: How do we verify users and prevent fraud at scale?
├─ Models: Claude (comprehensive) + Gemini (patterns) + Claude (pragmatic)
└─ Focus: Verification, moderation, legal/privacy

Panel 3: TECHNICAL ARCHITECTURE DEBATE
├─ Question: What's actually hard to build here?
├─ Models: Claude (systems) + ChatGPT (deep reasoning) + Claude (implementation)
└─ Focus: Matching algorithms, real-time systems, data model

Panel 4: BUSINESS & RETENTION DEBATE
├─ Question: How is this actually a viable business?
├─ Models: Claude (strategy) + ChatGPT (business) + Grok (real-time + edge cases)
└─ Focus: Unit economics, monetization, market fit

[PM]
Each panel has 3 models with different strengths. They'll debate,
sometimes agree, sometimes strongly disagree. The goal: expose gaps
and surface assumptions you haven't considered.

Want to adjust panel composition? (Y/n)

[USER INPUT]
> no, looks good
```

---

## Debate Mechanism: Parallel Rounds with Facilitator Synthesis

**How it works:**

1. **Round 1: All agents speak in parallel** (simultaneously)
   - Each agent asks their own questions and makes their own statements
   - No tagging, no explicit agreement/disagreement
   - Just natural reasoning

2. **Facilitator synthesis**
   - Groups similar questions/concerns together
   - Organizes output for clarity
   - Highlights contradictions that need addressing

3. **User responds** to grouped output

4. **Round 2: Agents see both user response AND other agents' responses**
   - Agents naturally address points from other agents if they disagree
   - Disagreements emerge organically in the discourse
   - Fact-checking happens naturally ("Actually, the data shows...")

5. **Repeat** until clarity emerges or go/no-go decision is made

**Key advantage:** Parallel execution, no artificial tagging, natural debate flow

---

## Phase 4: Panel Debates & Questions

### Panel 1: PRODUCT & UX Debate

**Round 1: Facilitator frames, consensus stated, then individual agent responses**

```
[FACILITATOR SUMMARY]

The question we're exploring: Is myFive's 5-match constraint solving a
real UX problem, or does it create new ones? And is the target user real
or aspirational?

[CONSENSUS AREAS]

All three agents agree on these points:
1. The 5-match constraint is interesting but unvalidated
2. Retention mechanics are unclear (what keeps users coming back?)
3. The user definition needs to be specific, not generic
4. This core hypothesis should be tested before building

---

[ROUND 1: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "5 slots as a hard limit creates a UX problem: what do users see when
  they have 3 matches and can't request new ones? Empty slots cause friction."
- "How do you prevent 'waiting for matches' from becoming frustrating vs
  anticipatory? This is critical to the core promise."

[CHATGPT]
- "Who is your actual user? The 'I'm tired of Tinder' demographic exists
  but is small. Is it big enough to build a business?"
- "From acquisition: where do your first 1,000 users come from? Tinder
  users won't switch to a harder product. You need a specific niche."
- "The retention driver question: on Tinder it's dopamine-swipe loops.
  On myFive, what keeps people coming back?"

[GROK]
- "You're describing Hinge but with more constraints. Be honest: are you
  solving a real problem, or a problem you think exists?"
- "Gen Z says they want meaningful connections, but do their *actions*
  prove it? Or do they still just swipe endlessly?"
- "You're betting on a trend without validating it. That's the core risk."

---

[USER INPUT]
> The 5-slot thing is intentional. When you have 5 people, you focus
> instead of getting paralyzed by choice. We're testing this with focus
> groups. And authenticity (verification) is our moat—no bots.

---

**Round 2: Agents see user response + other agents' responses, address naturally**

[FACILITATOR SUMMARY]

User responded: Focus groups are validating the intentionality thesis, and
you see authentication as the moat. But agents want you to prove this with
real user behavior before committing major resources to building.

[CONSENSUS AREAS - ROUND 2]

All three agents now agree on these key points:
1. Focus groups validate what people SAY, not what they DO
2. Landing page MVP test is the right next step ($1-2K, ~5,000 tokens, 50 signups)
3. If you're right about the trend, your opportunity won't disappear during validation
4. Test first, build second—this saves resources and reduces risk

---

[ROUND 2: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "Focus groups are good, but they show what people *say*, not what they
  *do*. Have you considered a landing page MVP or landing page test first?"
- "On the authenticity point: verification is good, but it's table stakes,
  not a moat. Many apps verify now. What's your actual differentiation?"
- Addressing Grok's concern: "The validation point is real. I'd recommend
  a quick validation cycle (~5,000 tokens) before committing major resources
  (~48,000 tokens total). Prove the 'intentionality' thesis with real behavior first."

[CHATGPT]
- "Agree with Claude on focus groups being limited—they bias toward
  'positive' responses. You need behavioral validation."
- "On your TAM question: If you're targeting people who specifically want
  'intentionality,' that's maybe 10-15% of dating app market. Is that
  enough for venture scale?"
- "But Claude's landing page idea is smart. You could validate for ~5,000 tokens
  and $2K infrastructure instead of betting ~48,000 tokens and $3.2K total upfront."

[GROK]
- "Exactly. Test the intentionality hypothesis with 50 people on a landing
  page. Don't build the app yet."
- "I'm hearing good intent but cart-before-horse execution. Landing page
  test, focus groups, then go/no-go decision."
- "If you're right about the trend, the market will still exist in 3 weeks.
  You're not leaving money on the table by validating first."
```

---

### Panel 2: SAFETY & TRUST Debate

**Round 1: Facilitator frames, consensus stated, then individual agent responses**

```
[FACILITATOR SUMMARY]

The core question: How do you verify user identity to prevent catfishing
and fraud, without losing too many users to verification friction?
And what's your legal/operational plan if things go wrong?

[CONSENSUS AREAS]

All three agents agree on these critical points:
1. Verification is essential—fraud could destroy your trust brand instantly
2. You face a tradeoff between friction and fraud prevention
3. Legal review is mandatory before launch (biometric data = compliance)
4. You need a catfishing response protocol *before* you launch, not after

---

[ROUND 1: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "This is trust-critical. Every user needs real identity verification,
  not just profiles. But here's the tradeoff question: What verification
  level do you need?"
- "Photo only? (Low friction, high fraud)"
- "Photo + selfie liveness? (Medium friction, medium fraud)"
- "Photo + ID scan? (High friction, low fraud)"
- "Each has different conversion costs and legal implications. Which are
  you optimizing for?"

[GEMINI]
- "From pattern analysis: Dating apps emphasizing trust have higher
  retention but lower conversion. Zoosk has strong trust but smaller
  scale. Tinder has massive scale but fraud problems."
- "Key question: Are you optimizing for trust first or scale first?"
- "If trust first, users accept friction. But you need to measure if
  they actually do, or you'll lose people at signup."

[GROK]
- "Real talk: Catfishing is your existential risk. One viral catfishing
  incident destroys your trust brand forever."
- "The bigger issue: If you're doing photo + selfie verification, that's
  biometric data storage. GDPR, CCPA, state privacy laws all apply."
- "You need a legal review before launch. This isn't optional. And you
  need a catfishing response protocol BEFORE launch, not after."
- "Who decides if a reported user is fake? What's the appeal process?
  How fast do you respond?"

---

[USER INPUT]
> Photo + selfie verification on signup. We accept friction for trust.
> As for catfishing, we haven't thought through the process yet.

---

**Round 2: Agents see user response + other agents' responses, address naturally**

[FACILITATOR SUMMARY]

User chose: Photo + selfie verification (high friction for trust).
But acknowledged: Catfishing process not yet defined.

Agents now focus on: You need a catfishing response protocol BEFORE launch,
and you need a clear data retention/privacy policy.

[CONSENSUS AREAS - ROUND 2]

All three agents now emphasize:
1. Good choice on photo + selfie verification
2. You MUST define a catfishing response protocol now (not after launch)
3. Data retention policy must be crystal clear (legal + privacy)
4. You need a support team for appeals and moderation
5. Start simple: 24-hour turnaround, one moderator handling ~20 reports/day initially

---

[ROUND 2: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "Good decision on photo + selfie. That's the right tradeoff for your
  positioning."
- "But I'm going to push back on not having a catfishing process. Grok's
  point is critical—you need this *before* launch, not after your first
  bad incident."
- "Simple protocol: User A reports user B → manual review by moderator →
  decision (ban or approve) → notification to both. Takes 24 hours. But
  you need this defined now."
- "One more data retention question: After verification, how long do you
  keep the selfie photos? Delete immediately? After 30 days? That changes
  your legal exposure and storage costs."

[GEMINI]
- "Agree with Claude on the verification choice—that's smart."
- "The privacy pattern I'm seeing globally: Users are increasingly aware
  of data privacy. EU users especially. If you're storing biometric data
  without a crystal-clear privacy policy, you'll get demolished on social
  media."
- "This isn't paranoia—we've seen privacy incidents go viral faster than
  ever. Your privacy policy needs to be simple and honest about what
  happens to their selfie photos."

[GROK]
- "Exactly. Both of you are right. And one more thing: You're going to
  need a support team for appeals. Someone reports User B as fake, but
  User B is actually real. How do they appeal? What's the timeline?"
- "This scales with your user base. 100 users? You can handle appeals
  informally. 10,000 users? You need a process."
- "Keep it simple initially: 24-hour turnaround, one moderator can
  handle maybe 20 reports per day. But define the process now."
```

---

### Panel 3: TECHNICAL ARCHITECTURE Debate

**Round 1: Facilitator frames, consensus stated, then individual agent responses**

```
[FACILITATOR SUMMARY]

The core technical question: How do you build the matching system to
deliver the 5-match constraint reliably, and how does curation actually
work at scale on day 1?

[CONSENSUS AREAS]

All three agents agree on these critical technical points:
1. The 5-match limit creates specific data model and UX constraints
2. Matching algorithm choice (manual vs. rule-based vs. ML) drives architecture
3. Cold start problem is real—you can't have ML on day 1 without data
4. Latency/performance expectations need to be defined upfront

---

[ROUND 1: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "The 5-match limit is a product constraint that becomes a data model
  constraint. How do you enforce it technically?"
- "Option A: Hard limit (can't add 6th match)—breaks if curation is slow"
- "Option B: Soft limit (request queued)—UX gets complex"
- "Option C: Auto-remove oldest—weird for users"
- "Which architecture do you choose?"

[CHATGPT]
- "I think the bigger issue is matching algorithm. You said 'curate
  the next 5'—is that manual or algorithmic?"
- "If manual: Doesn't scale. If algorithmic: You need ML. But ML has
  a cold start problem on day 1."
- "How do you train an ML model when you have zero historical user
  data on launch day?"
- "Is it rule-based on day 1 (age ±X, location <Y) then transition to
  ML? Or are you building ML from the start?"

[GEMINI]
- "And there's the performance question: When users request new matches,
  how long can they wait?"
- "1 second? That's real-time scoring—expensive infrastructure."
- "1 minute? That's batch processing—simpler but less responsive."
- "Overnight? That's not viable for retention."
- "Your matching latency drives your entire architecture."

---

[USER INPUT]
> We want algorithmic matching. ML model that learns from user feedback.
> Response time... users can wait a few minutes for new matches.

---

**Round 2: Agents see user response + other agents' responses, address naturally**

[FACILITATOR SUMMARY]

User wants: Algorithmic matching with ML that learns from feedback.
Users can wait a few minutes for new matches.

Agents now focus: You have a cold start problem. Day 1 you'll have ZERO
user feedback data to train an ML model. You need a hybrid strategy.

[CONSENSUS AREAS - ROUND 2]

All three agents now agree:
1. Cold start problem is real—can't do pure ML on day 1
2. Hybrid approach is best: Rule-based initially → evolve to ML later
3. Start with simple rules: Age ±3 years, location <10 miles, interests overlap
4. Collect user accept/reject signals early, use that data to train ML model later
5. Manual or semi-automated curation is fine initially at small scale (500-1K users)

---

[ROUND 2: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "Algorithmic matching is good, but ChatGPT's cold start question is
  critical. On day 1, you have no user feedback data."
- "What do you do for the first 1,000 users? Pure rule-based matching
  (age, location, interests)? Then transition to ML?"
- "And on the 5-match enforcement: If you're doing algorithmic scoring,
  I'd recommend soft limit architecture."
- "Better: User requests matches → background job scores all candidates →
  shows top 5 → user waits a few minutes. If curation is manual, you
  handle the backlog. If algorithmic, it's instant."

[CHATGPT]
- "Agree with Claude on cold start. You need a day-1 strategy."
- "But I want to push back on manual curation at scale. You said 'we
  curate the next 5'—if that means humans review every match before
  showing to users, you're bottlenecked at ~20 matches per moderator
  per day."
- "How many users do you need to support on day 1? If it's
  100 users, manual curation works. If it's 1,000+, you need algorithmic
  screening or you'll backlog."
- "And Gemini's latency question: A few minutes is fine initially, but
  you'll want to optimize that as you scale."

[GEMINI]
- "Right. And here's the architecture implication: If you're doing
  algorithmic matching, you need to train the model *somewhere*."
- "Do you have historical dating app data to bootstrap? Or are you
  starting from zero?"
- "Most successful apps use hybrid: Rule-based initially, collect signal
  from users (accept/reject), train ML model on that data as it accumulates."
- "That lets you validate the core hypothesis quickly without ML complexity
  upfront, then sophisticate the matching logic later based on real data."
```

---

### Panel 4: BUSINESS & RETENTION Debate

**Round 1: Facilitator frames, consensus stated, then individual agent responses**

```
[FACILITATOR SUMMARY]

The business question: What drives user retention on myFive, and how do
the unit economics actually work for a niche dating app? Is this viable,
or are you betting on an unproven trend?

[CONSENSUS AREAS]

All three agents agree on these critical business points:
1. Dating apps have very different unit economics than other software
2. Your core hypothesis (5-match constraint = intentionality) is unvalidated
3. Retention driver is unclear—you need to know what keeps users coming back
4. Revenue model should be deferred until after validating core hypothesis

---

[ROUND 1: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "Dating apps have very different unit economics than SaaS. This matters
  for your go-to-market strategy."
- "First question: What's your revenue model? Subscription? Premium
  features? Ads?"
- "Second question: What's your target CAC (customer acquisition cost)
  per user?"
- "Third question: What's your expected LTV (lifetime value)? If users
  churn after 2 weeks, your LTV is limited. You need high-value transactions
  or very large cohorts to make it work."

[CHATGPT]
- "I want to dig into retention mechanics. On Tinder, retention comes from
  dopamine—the endless swipe loop. On myFive, what drives retention?"
- "You have 5 matches. You're juggling 5 conversations. Isn't that MORE
  overwhelming, not less? How is that different from Tinder?"
- "That's the core retention risk I see: Your constraint might not actually
  reduce overwhelm—it might just create artificial scarcity."

[GEMINI]
- "Let me check some comparative data here. Current dating app retention
  rates (monthly-over-month):"
- "Tinder: 32% MoM"
- "Hinge: 38% MoM"
- "Bumble: 35% MoM"
- "Average: ~35% MoM (2025 data)"
- "So the real question isn't 'is 30% viable?' It's 'can you hit 35%+ with
  your niche positioning?'"
- "That depends entirely on whether your 5-match constraint actually makes
  people stay longer or churn faster."

---

[USER INPUT]
> We haven't figured out revenue yet. Retention... we think the 5-match
> thing attracts people who want intentionality. But honestly, we haven't
> tested this.

---

**Round 2: Agents see user response + other agents' responses, address naturally**

[FACILITATOR SUMMARY]

User acknowledged: No revenue model yet, and core retention hypothesis is
UNTESTED (only an assumption).

Agents now focus: You MUST validate whether 5-match constraint actually
improves retention before committing major resources to building.

[CONSENSUS AREAS - ROUND 2]

All three agents now strongly agree:
1. You MUST test the core assumption—5 matches = intentionality appeal
2. Landing page MVP is the right approach (~5,000 tokens, $2K infrastructure, 50 signups)
3. Defer revenue model until AFTER validation (focus on hypothesis testing first)
4. Historical pattern: Apps that validate their niche first win long-term
5. Cost of validation (~5,000 tokens, $2K) << cost of building wrong thing (~48,000 tokens, $3.2K total)

---

[ROUND 2: INDIVIDUAL AGENT PERSPECTIVES]

[CLAUDE]
- "The fact that you haven't tested the core assumption is the issue I want
  to highlight."
- "ChatGPT is right: You're assuming 5 matches = less overwhelm. But do Gen Z
  users actually feel less overwhelmed? Or do they feel frustrated by scarcity?"
- "Here's what I'd recommend: Test before building."
- "Step 1: Landing page test (~3,000 tokens, $1.5K infra, 50 sign-ups) - measure interest"
- "Step 2: Focus group interviews (~2,000 tokens, $500 honorariums, 10 people) - understand
  retention drivers"
- "Step 3: Go/no-go decision (1 human hour planning)"
- "If GO: Build the MVP (~48,000 tokens, ~$480 + $750 human hours + $2K infra = $3,230 total)"
- "If NO: Iterate and retest (~5,000 tokens, $2K)"
- "Worst case: You spend ~5,000 tokens and $2K instead of ~48,000 tokens and $3.2K on the wrong idea."

[CHATGPT]
- "Exactly. Claude nailed it. The landing page test is brilliant because it's
  cheap validation."
- "Here's the data point though: Hinge users accept friction for intentionality.
  But Hinge was built on 'designed to be deleted' messaging. Your value
  proposition needs to be equally clear."
- "Without testing, you're guessing. With testing, you're making informed
  decisions."
- "And on revenue: Delay that decision until after you've validated the core
  hypothesis. Focus on testing first, monetization later."

[GEMINI]
- "Agree with both of you. And here's the historical pattern: Dating apps
  that validated their niche FIRST (like Hinge with 'designed to be deleted')
  have much higher retention in that niche."
- "Apps that pivoted mid-way (like OkCupid trying to appeal to everyone)
  ended up diluted and lost their moat."
- "Test your niche positioning now, iterate fast, then build if validated."
```

---

## Model Diversity in Action

**Why multiple models matter:**
- Claude (depth) catches systemic issues, nuanced thinking
- ChatGPT (reasoning) focuses on complex analysis
- Grok (contrarian) pokes holes in assumptions, edge cases, real-time awareness
- Gemini (patterns) references comparative data, alternative frameworks

Single model would miss: Business reasoning, existential contradictions,
comparative patterns, and practical constraints.

Three diverse models per panel = truth revealed through different lenses, thinking styles, and reasoning approaches.

---

## Phase 5: PM Synthesizes & Creates Phase 1 Package

```
[USER REALIZATION - Mid-Meeting]

[USER]
Wait... listening to all this, I'm realizing the scope here is massive.
You've got verification, matching algorithms, moderation, payments...
that's not something we can build in one sprint.

Can we break this into phases? Like, what should we build first, and
what can wait for later?

[PM]
Excellent question. Yes, absolutely—this makes sense to break into phases.

Let me reorganize what we've learned. Based on the panels' input, here's
how I'd structure it:

---

## PHASED APPROACH (User-Requested)

### PHASE 1: Validate Core Hypothesis
Goal: Prove users want the "5-match intentionality" concept

What to build:
- User registration + photo verification (not perfect, just basic)
- 5-match limit (hard constraint)
- Rule-based matching (not ML yet)
- Basic conversation + messaging
- Manual moderation (team reviews reports)

What to defer:
- ML recommendation engine (needs data first)
- Appeals process (too complex for MVP)
- ID verification (can add later)
- Payment system (monetize after validation)

Phase 1 effort: ~13 weeks, 1 engineer

### PHASE 2: Scale & Sophistication (If Phase 1 succeeds)
Goal: Improve matching quality, scale operations

- ML recommendation model (trained on Phase 1 data)
- Automated moderation systems
- ID verification at signup
- Appeals process for safety issues

### PHASE 3: Monetization & Premium Features (Future)
- Payment processing
- Premium tiers (unlimited re-requests, etc.)
- Analytics dashboard

---

Does this phased breakdown make sense? Should we now focus the spec
on PHASE 1 only, or do you want to document all three phases?

[USER INPUT]
> Focus on Phase 1 only. Build that, launch it, see what happens.

[PM]
Perfect. Generating Phase 1 Development Package...
```

---

## Phase 6: Phase 1 Package Output

## SPECIFICATION NOTE: Token-Based Budgeting

**All estimates in this specification use tokens, not human time.**

- Tokens measure computational work done by AI agents
- Human time is estimated separately for planning, QA, and oversight
- Cost breakdown: Token costs + Human hours + Infrastructure costs
- NO time-based estimates (no weeks, days, or hours for agent work)

This specification was generated using agentic project management (see CLAUDE.md).

---

```
================================================================================
                    PHASE 1 DEVELOPMENT PACKAGE
                       myFive Dating App MVP
                    Generated by Roundtable Meeting
================================================================================

PROJECT VISION
──────────────
Dating app with 5-person match limit per user. Goal: Enable meaningful
conversations through intentional matching, not infinite browsing.

PHASE 1 OBJECTIVE
─────────────────
Validate hypothesis: "5-match intentionality resonates with Gen Z users."
```

---

## PHASE 1 SPECIFICATION (User-Approved)

### Feature Set: Phase 1 Focus

1. USER REGISTRATION & VERIFICATION
   ✓ Email signup
   ✓ Photo upload (profile picture)
   ✓ Selfie verification (liveness check for fraud prevention)
   ✓ Basic profile (name, age, bio, interests)

2. MATCHING SYSTEM
   ✓ Rule-based matching (age ±3 years, location < 10 miles, interests overlap)
   ✓ Manual curation process (team verifies before showing to users)
   ✓ 5-active-match limit per user (hard limit - cannot exceed)
   ✓ Request new matches button (triggers curation queue)

3. CONVERSATION SYSTEM
   ✓ 1:1 text messaging
   ✓ Match expiry timer (if no message in 7 days, auto-unmatches)
   ✓ Basic moderation (report button)
   ✓ Conversation history

4. SAFETY & MODERATION
   ✓ Photo verification on signup
   ✓ User reporting (block, report for violation)
   ✓ Manual support queue (team reviews reported users)

---

## TECHNICAL ARCHITECTURE

### Data Model (Core)

```
User {
  id: UUID
  email: string (unique)
  name: string
  age: int
  location: { lat: float, lng: float }
  bio: string
  interests: string[]
  profile_picture: URL
  selfie_verified: boolean
  created_at: timestamp
}

Match {
  id: UUID
  user_a_id: UUID
  user_b_id: UUID
  matched_at: timestamp
  status: "active" | "unmatch_a" | "unmatch_b" | "both_unmatch"
  expires_at: timestamp (7 days from last message)
}

Conversation {
  id: UUID
  match_id: UUID
  messages: Message[]
}

Message {
  id: UUID
  sender_id: UUID
  content: string
  created_at: timestamp
  read_at: timestamp | null
}

MatchQueue {
  id: UUID
  user_id: UUID
  status: "pending" | "ready" | "sent"
  curated_candidates: User[]
  created_at: timestamp
  sent_at: timestamp | null
}
```

### Matching Algorithm (Phase 1)

```
def get_next_5_matches(user: User):
  1. Get all verified users not yet matched with `user`
  2. Filter by age (±3 years from user's age)
  3. Filter by location (< 10 miles from user's location)
  4. Filter by interests (minimum 2 shared interests)
  5. Randomize order (some serendipity)
  6. Return top 5
  7. Add to MatchQueue (status: pending)
  8. Manual verification by curator (team reviews for bad actors)
  9. Mark MatchQueue as "ready"
  10. Notify user "New matches available"
  11. User accepts → create Match entries → show conversation UI
```

### API Endpoints (Phase 1)

```
POST   /auth/signup              → Register + photo upload + selfie verification
POST   /auth/login               → JWT token
GET    /user/:id                 → User profile
PUT    /user/:id                 → Update profile
GET    /matches                  → Current 5 matches
POST   /matches/:id/unmatch      → Remove from 5 slots
POST   /matches/request          → Request new 5 matches
GET    /matches/pending          → Check if new matches ready
POST   /conversations/:match_id  → Send message
GET    /conversations/:match_id  → Get conversation history
POST   /users/:id/report         → Report user for violation
```

---

## SUCCESS CRITERIA FOR LAUNCH

### MUST (Go/No-Go Gates)
□ Mobile-responsive UX (works on iOS + Android browser)
□ 5-match limit enforced (cannot exceed)
□ Selfie verification prevents 95% of obvious fakes
□ Performance: <500ms response time on all APIs (P99)
□ Photo + profile data uploaded correctly

### SHOULD
□ User signup-to-match flow completable in <2 minutes
□ At least 60% of signups proceed through full verification
□ Match request queue clears within 24 hours (curator team keeps up)
□ Conversation stickiness: 30%+ of matches exchange at least 3 messages

### NICE
□ User messaging includes read receipts
□ Basic analytics dashboard (signup funnel, match success rate)
□ Social proof ("200+ matches made this week")

---

## KNOWN RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Cold start: Only 10 users day 1, no good matches | High - nobody uses | Manual seeding: Team creates test accounts, coordinates first matches |
| Selfie verification false rejection rate | Medium - frustration | Liberal approval threshold at launch, refine post-launch based on data |
| Curator team bottleneck (manual curation) | Medium - slow match delivery | Start with small cohort (500 users), curator team manually reviews all 5-match requests |
| Users unmatch faster than expected | Medium - high churn | Monitor match duration stats, adjust age/location filters based on data |
| Privacy concerns (storing selfies) | High - legal/PR | Get legal review before launch, clear privacy policy, delete selfies after verification |

---

## PHASE 1 EXECUTION ROADMAP (Token-Based)

### Phase 1A: Architecture & Design (~8,000 tokens)
- [ ] Database schema setup
- [ ] User registration endpoint + email verification
- [ ] JWT authentication
- [ ] Selfie verification integration (AWS Rekognition or similar)
- [ ] Rule-based matching algorithm design
- [ ] MatchQueue system architecture

### Phase 1B: Backend Implementation (~12,000 tokens)
- [ ] Database schema deployment
- [ ] User registration + verification endpoints
- [ ] Matching logic implementation
- [ ] MatchQueue system + curation backend
- [ ] WebSocket setup for real-time messaging
- [ ] Message storage + retrieval

### Phase 1C: Frontend Implementation (~10,000 tokens)
- [ ] Signup/login flow
- [ ] Match browsing UI (show 5 matches)
- [ ] Conversation UI
- [ ] Responsive design (iOS + Android web)
- [ ] Match expiry automation (7-day rule)
- [ ] Report user flow

### Phase 1D: Safety, Moderation & Ops (~4,000 tokens)
- [ ] Basic blocking system
- [ ] Curator dashboard (for manual match review)
- [ ] Support tools for team
- [ ] Data retention policies (selfie deletion after verification)

### Phase 1E: Testing, QA & Launch (~8,000 tokens)
- [ ] End-to-end testing suite
- [ ] Performance optimization (target <500ms response time P99)
- [ ] Bug fixes and security review
- [ ] Staging environment deployment
- [ ] Production deployment
- [ ] Beta cohort onboarding (500 users)
- [ ] Monitoring and feedback collection

**Total Phase 1 Tokens: ~42,000 tokens** (fits within 48,000 estimate)

---

## PHASE 1 EXECUTION BUDGET (Token-Based, No Dev Teams)

```
PHASE 0: Validation & Planning (Pre-Build)
  Landing page MVP test: 3,000 tokens
  Focus group interviews: 2,000 tokens
  Planning meeting + go/no-go decision: 1 human hour
  ──────────────────────────────────
  Phase 0 Total: ~5,000 tokens + 1 human hour

PHASE 1A: Architecture & Design
  Backend architecture + API design: 8,000 tokens
  Frontend architecture + state mgmt: 6,000 tokens
  Tech lead review & QA plan: 2 human hours
  ──────────────────────────────────
  Phase 1A Total: 14,000 tokens + 2 human hours

PHASE 1B: Implementation
  Backend services implementation: 12,000 tokens
  Frontend UI implementation: 10,000 tokens
  DevOps/infrastructure: 4,000 tokens
  Tech lead oversight: 4 human hours
  ──────────────────────────────────
  Phase 1B Total: 26,000 tokens + 4 human hours

PHASE 1C: Testing, QA & Launch
  Automated testing suite: 5,000 tokens
  API documentation: 3,000 tokens
  QA lead review + bug fix coordination: 3 human hours
  Staging/production deployment: 1 human hour
  ──────────────────────────────────
  Phase 1C Total: 8,000 tokens + 4 human hours

────────────────────────────────────────────
TOTAL PHASE 1 EXECUTION: 48,000 tokens + 15 human hours

COST BREAKDOWN (No Development Teams):
  Agent tokens: 48,000 tokens @ $0.01/token = $480
  Human oversight: 15 hours @ $50/hour = $750
  Infrastructure (AWS, etc): ~$2,000 (database, hosting, verification service)
  ──────────────────────────────────
  TOTAL COST: ~$3,230 (vs. $50K traditional dev team)

Available token budget: 200,000 tokens (1 agent context window)
Remaining after Phase 1: 152,000 tokens for Phase 2 planning
Status: Well within budget ✓
```

---

## WHAT YOU GET TODAY (Handoff Package)

✓ Complete Phase 1 specification (can hand to developers now)
✓ Data model + API endpoints defined
✓ Development roadmap (Phase 1: ~42,000 tokens of execution)
✓ Success criteria (MUST/SHOULD/NICE)
✓ Known risks + mitigations
✓ Development tasks (ready for ticketing)

You can immediately:
1. Hand this package to your dev team
2. They start building Phase 1 MVP without further meetings
3. Complete Phase 1 with ~42,000 tokens of agent work + validated core hypothesis
4. Based on Phase 1 results, plan Phase 2 (ML matching, ID verification, etc.)

---

## WHAT HAPPENS NEXT

After Phase 1 Launch:
1. Monitor key metrics:
   - Signup → verification conversion
   - Match acceptance rate
   - Conversation duration
   - Weekly active users (WAU)

2. Gather user feedback:
   - "5 matches too limiting?"
   - "Waiting for new matches frustrating?"
   - "Worried about fake profiles?"

3. Phase 2 Planning Meeting:
   - Adjust based on Phase 1 learnings
   - Plan Phase 2 features (ML matching, video verification, etc.)
   - Incorporate POST_MORTEM insights from Phase 1

================================================================================
                      END PHASE 1 PACKAGE
                   Ready for Developer Handoff
================================================================================
```

---

## Lessons from This Meeting

### What Roundtable Surfaced That Solo Founder Would Miss

**Solo Founder Path (Without Roundtable):**
1. Start building without thinking through UX for "waiting for matches"
2. Assume ML matching is easy (it's not - cold start problem)
3. Overlook catfishing risk / appeals process (existential for trust)
4. Overlook legal/privacy implications of selfie storage
5. Build full moderation system before understanding user demand
6. Launch to broad audience without validating core hypothesis

**Roundtable Meeting Outcome:**
✓ Caught UX gaps before building
✓ Identified cold start problem before hiring ML engineer
✓ Surfaced trust/safety requirements early
✓ Clarified MVP scope (manual curation instead of ML)
✓ Created risk mitigations before launch
✓ Phase 1 now focuses on hypothesis validation, not feature maximization

### Computational Efficiency & Cost Savings
- Without Roundtable: ~150,000 tokens wasted building wrong features (~$50K+ traditional team), then pivot
- With Roundtable:
  - Validation: ~5,000 tokens (~$2K infrastructure cost)
  - Phase 1 Build: ~48,000 tokens (~$3.2K total: $480 tokens + $750 human hours + $2K infrastructure)
  - **Total: ~53,000 tokens, ~$5.2K** (vs. ~$50K+ traditional dev teams)

---

## Key Insight: Generic Facilitator → Specialized

The user never said "I need a PM"—they said "I have a project vision."

The **Meeting Facilitator** detected the meeting type and brought in the PM.

This is the architectural shift you identified:
- **Layer -1: Meeting Facilitator** (generic entry point for any meeting)
- **Layer 0: Specialization** (based on meeting type, bring in PM, architect, etc.)
- **Layer 1: Expert Panels** (panels formed based on specialization)
- **Layer 2: Deliberation** (panels debate the vision)
- **Layer 3: Output** (Phase 1 package ready for execution)

This makes Roundtable genuinely versatile—brainstorms, product planning, architecture reviews, team alignment, all flow through the same generic facilitator interface.

