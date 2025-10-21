# User Interaction Control Levels

## Overview

Different users need different levels of control over deliberation:

- **Founders who are busy** - Want results without constant involvement
- **Founders who are detail-oriented** - Want to guide every decision
- **Teams collaborating** - Want oversight but not micro-management
- **Domain experts** - Want deep technical control

Roundtable supports all of these through **Interaction Control Levels**.

---

## The Five Levels

### Level 0: Full Auto (Hands-Off)

**For:** Users who trust the system and don't have time for involvement

**How it works:**
```
You: "Build a spec for a note-taking app"
PM: "I'm assembling panels and running full deliberation.
     I'll send you the complete spec when done."
[30-60 minutes]
PM: "Spec complete. Ready for review?"
```

**What happens:**
- Project Manager runs intake conversation (by itself, asking clarifying questions)
- Panels deliberate without user input
- Decisions made autonomously
- Spec synthesized and output

**Best for:**
- Straightforward projects with clear scope
- Users who can't be available during session
- Time-constrained scenarios
- Second opinions (running it in parallel)

**Risk:**
- Might miss important user context
- Could head in wrong direction without course correction

**Mitigation:**
- Thorough intake questions by Project Manager
- Post-session review: User can say "wait, I meant..."
- Ability to re-run discussion with corrections

**Example Session:**
```
User: "Build a note-taking app"

[Auto-Intake]
PM to itself: "Note-taking app. Let me ask..."
PM questions (simulated user responses):
  - "For individual or teams?" → User description suggests individuals
  - "Competing with Notion?" → User mentions simpler is better
  - "Mobile?" → User wants cross-platform

[Auto-Deliberation]
Panels form: Product, Architecture, UX (no Security for notes app)
Product: "Core MVP: create, organize, search notes"
Architecture: "Simple database, sync across devices"
UX: "Markdown + WYSIWYG editing options"
Security: (skipped)

[Output]
PM: "Spec complete. Here's what emerged:
  - Core features: create, organize, search, sync
  - Architecture: Cloud-based, mobile-first
  - UX: Dual editing modes"
```

**Configuration:**
```yaml
interaction_level: auto
auto_panel_formation: true
auto_deliberation_time: 60_minutes
post_session_review: true
```

---

### Level 1: Checkpoint Control

**For:** Users who want oversight but don't need constant involvement

**How it works:**
```
You: "Build a spec for a note-taking app"
PM: "Panels assembled. Starting deliberation..."

[After each deliberation round]
PM: "Round 1 decisions ready for review. Approve to continue?"

You: Review, approve, or adjust
```

**User Touchpoints:**
```
START:
User: Describe vision
PM: "Understood. Proceed with this? [YES] [ADJUST]"

CHECKPOINTS (after each round):
PM: "Round X Decisions:
     ✓ Decision 1
     ✓ Decision 2
     ? Decision 3 (needs approval)

     Continue? [YES] [ADJUST] [DEEP DIVE]"

USER OPTIONS AT EACH CHECKPOINT:
- "YES" - Great, continue deliberating
- "ADJUST" - Tweak this decision, then continue
- "DEEP DIVE" - Talk to panels about this more
- "PAUSE" - Stop here, I'll review before continuing
```

**What Happens Per Round:**
```
ROUND 1: Feature Scope
PM: "Panels decided: MVP features are notes, organization, search"
You: "Approve"

ROUND 2: Architecture
PM: "Panels decided: Cloud backend + mobile client"
You: "Approve"

ROUND 3: Sync Strategy
PM: "Conflict: Architecture wants eventual consistency,
      Product wants real-time. Resolved with: Smart sync.
      Approve?"
You: "Can you explain more? What's smart sync?"
PM: "Sure. Let me dive deeper with Architecture panel..."

ROUND 3 DEEP-DIVE: Smart Sync Explained
Architecture: "Real-time = battery drain on mobile.
              Smart sync = push when app active, poll when inactive.
              Best of both worlds."
You: "Got it. Approve."

ROUND 4: Offline Capability
...
```

**Best for:**
- Projects with some complexity
- Users who want informed oversight
- Risk-averse decision-making
- Building confidence in decisions

**Configuration:**
```yaml
interaction_level: checkpoint
checkpoint_frequency: per_round
pause_required_for: major_decisions
allow_deep_dives: true
deep_dive_panel: selected_panel_or_all
```

**Timeline Impact:**
- Adds 1-2 minutes per checkpoint
- Total time: 60-90 minutes instead of 30-60 minutes
- Worth it for confidence and course-correction

---

### Level 2: Active Participation

**For:** Users who want regular involvement but let experts deliberate

**How it works:**
```
You: "Build a spec for a note-taking app"
PM: "Panels ready. What should we focus on first?"

You: "Privacy is really important. Make sure that's covered."
PM: "Got it. Security, this is a core concern for the user."

[Deliberation proceeds with your concerns in context]

You: [Appears in chat periodically]
     "Wait, that approach won't work because..."
     "Can we consider this instead?"
     "I want to talk to the UX person about..."
```

**User Touchpoints:**
```
BEFORE:
User: Describes vision
User: Sets priorities/concerns
User: Specifies interaction preference

DURING:
PM: "Panels deliberating. Feel free to jump in anytime."

User can:
  - Ask clarifying questions
  - Redirect discussion ("Focus on X, defer Y")
  - Propose alternatives
  - Ask for deeper analysis
  - Override decisions (rare)
  - Join specific panel discussions

AFTER EACH ROUND:
User: Reviews, comments, proposes next focus
PM: Incorporates user feedback into next round
```

**Interaction Flow:**
```
Round 1: Feature Scope
Product decides: "MVP features: notes, organize, search"
User: "What about tagging? Is that in MVP?"
Product: "Good point. Can add to MVP or V2?"
User: "MVP. Tagging is how I find notes"
Product: "Updated. MVP includes tags"

Round 2: Architecture
Architecture proposes: "Firebase backend"
User: "I want to avoid vendor lock-in. Options?"
Architecture: "Self-hosted + cloud both possible. Tradeoffs:
              Self-hosted = control but ops burden
              Cloud = simplicity but vendor lock-in"
User: "Let's do self-hosted but with migration path"
Architecture: "Updated approach"

Round 3: Sync
UX: "Users expect real-time across devices"
User: "How much battery does that cost?"
Architecture: "20-30% drain on mobile"
User: "That's too much. Can we do eventual consistency?"
PM: "This is a tradeoff. Real-time UX vs. battery.
     What matters more?"
User: "Battery. Users use my app all day. Drain is deal-breaker"
PM: "Panels updated with this constraint"
```

**Best for:**
- Passionate founders
- Complex projects requiring guidance
- Teams that want user involvement
- Decisions with significant tradeoffs

**Configuration:**
```yaml
interaction_level: active
user_presence: available_throughout
override_capability: allowed
can_propose_alternatives: true
can_redirect_focus: true
deep_dive_access: all_panels
response_time_expected: <5_minutes
```

**Time Impact:**
- User commitment: 30-45 minutes active involvement
- Total time: 90-120 minutes
- Slower but more aligned with user vision

---

### Level 3: Co-Creation

**For:** Domain experts or co-founders wanting deep technical input

**How it works:**
```
You: [Architect with strong opinions]
     "Here's my rough architecture sketch"

PM: "Let me map this to panels..."

You: [Deep collaboration with panels]
     "Why are we using that framework?"
     "What about this alternative?"
     "Let me sketch a different approach"

Panels: "That's interesting. Let's explore it"

[True co-creation with expert panels]
```

**Interaction Model:**
```
User can:
  - Propose architectures
  - Debate panel members
  - Request specific approaches
  - Reject recommendations
  - Escalate technical disagreements
  - Iterate on decisions

Panels treat user as:
  - Technical expert peer
  - Co-decision-maker
  - Authority on project direction
  - Able to override if justified

Output is negotiated, not decided by panels
```

**Example Session:**
```
USER: "I've been thinking about the architecture.
      Here's my sketch..." [Shows diagram]

ARCHITECTURE PANEL: "Interesting approach. Let's analyze:
  Strengths:
  - Direct sync, no intermediate broker
  - Reduces latency
  - Simple operational model

  Concerns:
  - Harder to scale beyond 10 users
  - Complex conflict resolution
  - Requires custom sync logic"

USER: "Scaling beyond 10 users is future problem.
      For MVP, this approach is simpler. What about
      conflict resolution?"

ARCH: "CRDT? Operational Transform? Custom merge?"

USER: "CRDT is overkill. How about last-write-wins
      with timestamp? Users rarely edit simultaneously."

ARCH: "That works for this scale. Plus if user sees
      conflict, they can resolve manually."

USER: "Exactly. And we can improve post-launch."

ARCH: "Updated approach with your input"

USER: [To UX Panel]
      "This sync strategy means eventual consistency.
      How do we show that to users?"

UX: "Loading states, sync indicators,
     'synced' confirmation"

USER: "Perfect. How long for sync?"

ARCH: "1-3 seconds typically"

USER: "Show that to users? Like '(synced 2s ago)'"

UX: "Good idea. Builds confidence."
```

**Best for:**
- Technical founders
- CTO-level users
- Research projects
- Novel architectures
- Teams that want user expertise integrated

**Configuration:**
```yaml
interaction_level: co_creation
user_presence: continuous
technical_depth: deep
override_capability: full
can_propose_alternatives: true
panels_treat_as: peer_expert
negotiation_required: true
```

**Time Impact:**
- User commitment: 60-90 minutes continuous
- Total time: 120-180 minutes
- Longest but most aligned with expert users

---

### Level 4: Custom Mode

**For:** Special scenarios (research, novel projects, team deliberations)

**Description:**
User defines exactly what they want:

```yaml
interaction_level: custom
rules:
  - user_must_approve: all_architectural_decisions
  - user_can_propose: alternative_implementations
  - panels_involved: [architecture, security]  # skip product, ux
  - decision_override: full
  - deep_dive_access: all_panels
  - checkpoint_required: true
  - user_present_during: key_rounds_only

# Custom constraints
constraints:
  - no_cloud_services_allowed
  - open_source_first
  - three_letter_variable_names_forbidden  # joke, but possible

# Custom agenda
agenda:
  - "How do we minimize dependencies?"
  - "What's the simplest possible architecture?"
  - "Can this run on bare metal?"
```

**Best for:**
- Unique requirements
- Multi-user deliberations
- Specialized projects
- When standard levels don't fit

---

## Switching Levels During Session

Users can change their level mid-session:

```
You start at Level 1 (Checkpoint)
After Round 2: "This is actually complex. I want to dive deeper"
Switch to Level 2 (Active Participation)

After Round 4: "I think I understand now. Let me just review final decisions"
Switch to Level 1 (Checkpoint)

End of session: "Before I make this decision, I want to talk to Architecture"
Switch to Level 3 (Co-Creation) for one round
```

**How it works:**
```
You: "Can I switch to active participation?"
PM: "Of course. I'll shift. What would you like to know?"

Flexible, no re-starting required
```

---

## Choosing Your Level

### Decision Matrix

| Scenario | Recommended Level |
|----------|---|
| "I'm busy, need fast spec" | Level 0: Auto |
| "I want oversight but trust experts" | Level 1: Checkpoint |
| "I have concerns to inject" | Level 2: Active |
| "I have strong opinions on architecture" | Level 3: Co-Creation |
| "I have weird requirements" | Level 4: Custom |

### Questions to Ask Yourself

```
Q1: How much time do I have right now?
  <10 min → Level 0
  10-30 min → Level 1
  30-60 min → Level 2
  60+ min → Level 3

Q2: How confident am I in my vision?
  Very confident → Level 0
  Somewhat → Level 1
  Uncertain → Level 2
  Technical expertise → Level 3

Q3: Do I have specific concerns I want injected?
  No → Level 0 or 1
  Yes, but general → Level 1
  Yes, specific → Level 2
  Yes, detailed alternatives → Level 3

Q4: Do I want to control the output?
  Trust experts → Level 0 or 1
  Want oversight → Level 1 or 2
  Want involvement → Level 2
  Want co-creation → Level 3
```

**Example Decision:**

```
I'm a founder with 30 minutes right now.
I have a vision but want expert input.
I want to approve major decisions.
→ Level 1: Checkpoint Control is right

I'm a technical founder with deep architecture opinions.
I have 2 hours available.
I want to co-design the architecture.
→ Level 3: Co-Creation is right
```

---

## Multiple Stakeholders

What if different people are involved?

### Scenario 1: Solo Founder

```
Decision: Level 1 (Checkpoint)
- Founder reviews each checkpoint
- Approves or adjusts
- Balanced involvement
```

### Scenario 2: Co-Founders

```
Decision: Level 1 + Level 3 hybrid

Setup:
- Founder A (Product) joins Level 1
- Founder B (Technical) joins Level 3

Flow:
- Session starts at Level 1
- Founder B joins for architecture round
- Shifts to Level 3 for that round
- Back to Level 1 for remaining rounds
```

### Scenario 3: Team (No Technical Founder)

```
Decision: Level 0 + Team Review

Setup:
- System runs at Level 0 (Auto)
- Team reviews output together
- If concerns, can re-run at Level 1 or 2

Benefit:
- Gives team shared understanding
- Democratizes spec creation
```

### Scenario 4: Enterprise (Multiple Stakeholders)

```
Decision: Level 1 with multi-stakeholder checkpoints

Setup:
- Product leader reviews checkpoints
- Security lead joins security round
- Architect joins architecture round
- Finance reviews budget implications

Flow:
- Round 1: Product lead reviews
- Round 2: Architect + Product lead review
- Round 3: Security lead joins
- Round 4: All stakeholders review final

Benefit:
- Everyone involved without full participation
- Specialized review at relevant points
```

---

## Project Manager Adaptation

The Project Manager adapts based on interaction level:

### Level 0 (Auto)
PM asks questions to itself, synthesizes output without user input

### Level 1 (Checkpoint)
PM pauses after each round, summarizes, waits for approval

### Level 2 (Active)
PM stays in conversation mode, user can interrupt anytime

### Level 3 (Co-Creation)
PM acts as facilitator between user and panels, less mediator role

### Level 4 (Custom)
PM follows user's custom rules exactly

---

## Technical Implementation

### V1 (CLI)

```
roundtable init --interaction-level checkpoint
# Runs with checkpoints, prompts for approval

roundtable init --interaction-level auto
# Runs without prompts, outputs to file

User input: CLI prompts after each checkpoint
```

### V2+ (Web/Mobile)

```
Web UI:
- Interaction level selector on setup
- Chat interface for Level 2 (Active)
- Real-time collaboration for Level 3/4
- Notification system for checkpoints

Mobile:
- Simpler: Level 0 and 1 mainly
- Notifications for checkpoints
- One-tap approval
```

---

## Anti-Patterns

### Anti-Pattern 1: Choosing Wrong Level

```
Problem: Domain expert choosing Level 0 (Auto)
Result: Frustrated, feels out of control

Solution: Recommend Level 3 based on expertise

Problem: Busy founder choosing Level 3 (Co-Creation)
Result: Overwhelmed, session takes 3 hours

Solution: Recommend Level 0 or 1 based on availability
```

### Anti-Pattern 2: Micro-Managing at Level 1

```
Problem: User at Level 1 approves every small detail
Result: Takes 3 hours, defeats purpose

Solution: PM says "These are implementation details.
          Approve concept and let us decide details?"
```

### Anti-Pattern 3: Not Engaging at Level 3

```
Problem: User at Level 3 but doesn't participate
Result: Defeats the purpose, might as well be Level 0

Solution: PM asks questions to draw user in
```

---

## Summary: Right Level for Right User

**Level 0 (Auto):** Trust and speed
**Level 1 (Checkpoint):** Balanced oversight
**Level 2 (Active):** Regular involvement
**Level 3 (Co-Creation):** Expert input
**Level 4 (Custom):** Special scenarios

Choose based on:
- Time availability
- Confidence in vision
- Need for control
- Expertise level

Switch anytime: Flexible, adaptive to user needs.

---

## Why This Matters

Not all users think the same way. Not all projects need the same involvement.

Roundtable's strength is that it works for:
- **Busy founders** (Level 0)
- **Thoughtful founders** (Level 1)
- **Engaged founders** (Level 2)
- **Technical founders** (Level 3)
- **Weird edge cases** (Level 4)

One tool. Many ways to use it. All effective.
