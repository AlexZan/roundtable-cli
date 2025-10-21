# Post-Mortem System: Skill Improvement Loop

## Overview

A Roundtable session produces two outputs:

1. **Immediate:** A complete spec/decision document
2. **Compounding:** Improvements to the skills that participated

The **Post-Mortem System** is what captures #2. It's how Roundtable learns.

---

## Core Concept: From Deliberation to Learning

```
Session Execution
    ↓
Deliberation Output (spec, decisions)
    ↓
Post-Mortem Analysis (what happened, why)
    ↓
Skill Improvements (captured learning)
    ↓
Better Deliberations (future sessions use improved skills)
```

Each session is training data for the next session.

---

## The Post-Mortem Team

The Post-Mortem Team is a specialized panel that analyzes the just-completed deliberation:

### Composition (Suggested)

- **Moderator** - Facilitates the retrospective
- **Analyst** - Examines what happened
- **Skill Maintainers** - Represent the skills that participated
- **Project Manager** - Reflects on facilitation effectiveness
- **Historian** - Tracks patterns across multiple sessions

### Timeline

Post-Mortem runs **immediately after main deliberation**, while memory is fresh:
- Main deliberation: 30-90 minutes
- Break: 5 minutes
- Post-mortem: 20-40 minutes

### Access

Post-Mortem has access to:
- Full deliberation transcript
- Decision log (what was decided, when, why)
- Timing data (how long did each round take?)
- User feedback (what did the user think about decisions?)
- Outcome metadata (confidence levels, agreement/disagreement scores)

---

## Post-Mortem Questions Framework

### Question 1: What Actually Happened?

**Goal:** Create objective record of what occurred

```
Analysis:
- Timeline of deliberation (what was decided in what order)
- Who contributed what insights
- Where did agreements emerge?
- Where did conflicts emerge?

Example Output:
- Round 1: Product led, Architecture raised concerns → Consensus
- Round 2: Security raised new constraint → Product adjusted
- Round 3: Conflict between Architecture/Security
  - Lasted: 12 minutes
  - Resolution method: Reframing by Project Manager
  - Outcome: Win-win compromise found
```

### Question 2: What Insights Were Valuable?

**Goal:** Identify the "aha" moments and valuable contributions

```
Examples of Valuable Insights:

"Architecture raised mobile performance constraint that wasn't
 considered until round 3. This changed the whole approach."
→ This is valuable for future projects: Ask about mobile early

"Security flagged data privacy issue that Product hadn't considered.
 Led to rethinking data collection strategy."
→ Future Security skill should mention data privacy in intake

"UX suggested involving users in design process early.
 Product had planned to design in vacuum."
→ Future Product skill should emphasize user involvement
```

### Question 3: What Should Future Teams Know?

**Goal:** Extract generalizable lessons

```
Examples:

"Mobile first apps have different performance assumptions than web.
 Include mobile considerations in intake questions"
→ Updates to Architecture skill

"When teams have tight timelines, MVP scope is critical.
 Ask about deadline before suggesting features"
→ Updates to Product skill

"Healthcare compliance is complex but follows predictable patterns.
 Early compliance discussion prevents rework"
→ Improvements to Compliance skill
```

### Question 4: How Did the Experts Perform?

**Goal:** Reflect on skill effectiveness

```
Analysis per skill:

ARCHITECTURE SKILL:
- Strengths: Identified integration complexity early
- Weakness: Missed mobile performance until UX raised it
- Suggestion: Add mobile checklist to intake

PRODUCT SKILL:
- Strength: Stayed focused on user value
- Weakness: Didn't prioritize ruthlessly, wanted everything in MVP
- Suggestion: Add prioritization framework to skill

SECURITY SKILL:
- Strength: Comprehensive threat modeling
- Weakness: Suggested overly strict approach initially
- Suggestion: Add "proportionality to project size" guidance

UX SKILL:
- Strength: Advocated for user experience throughout
- Weakness: Didn't deeply engage with technical constraints
- Suggestion: Deepen understanding of tradeoffs in skill
```

### Question 5: What Patterns Emerge Across Multiple Sessions?

**Goal:** Find cross-session learning (requires tracking multiple sessions)

```
After 5-10 sessions, patterns emerge:

PATTERN 1: Architecture Blindspot
- Mobile performance missed in 3 of 5 projects
- Recommendation: Update Architecture skill to ask about platforms first

PATTERN 2: Security Overreach
- Security teams often too strict initially
- Recommendation: Add "proportionality" principle to Security skill
- Add: "Start strict, then negotiate tradeoffs"

PATTERN 3: Product Under-Prioritization
- Product teams struggle with MVP scope
- Recommendation: Add prioritization framework to Product skill
- Add: "Force ranking: must-have vs. nice-to-have vs. V2"

PATTERN 4: Early User Involvement
- Projects that involved users in intake had better specs
- Recommendation: Make user research a standard step
```

---

## Skill Improvement Capture

### How Improvements Are Captured

When post-mortem identifies an improvement, it's documented as a **Skill Update**:

```yaml
# Example Improvement

project: "AI Recipe App"
session_date: "2024-10-21"
post_mortem_finding: |
  Architecture skill missed mobile performance implications
  until UX raised the issue in round 3. Mobile-first approach
  requires different assumptions about resource constraints.

skill_affected: "architecture/systems-architect"
current_version: "2.0.0"
proposed_improvement: |
  Add "Mobile Architecture Considerations" to intake questions.
  Include checklist:
  - What client platforms? (iOS, Android, web, all?)
  - Performance constraints? (battery, CPU, memory?)
  - Offline capability required?
  - Real-time sync requirements?

implementation: |
  Update skill version to 2.1.0
  Add new section: "Mobile Considerations"
  Include platform-specific performance baselines

confidence_level: "HIGH"
affected_projects: "5-7 similar projects with mobile platforms"
```

### Skill Update Versioning

When improvements are captured:

```
CURRENT SKILL:
architecture/systems-architect: 2.0.0

POST-MORTEM SUGGESTS:
Add mobile performance consideration

BECOMES:
architecture/systems-architect: 2.1.0
  Changes:
    - Added "platform requirements" to intake questions
    - Added mobile performance checklist
    - Updated guidance on battery constraints
```

### Rollout Strategy

```
Option 1: Immediate Update
- Skill updated right away
- Next session gets improved version
- Pro: Latest improvements immediately available
- Con: May not be fully validated

Option 2: Staged Rollout
- Changes proposed in 2.1.0 (candidate)
- Used in 2-3 projects on opt-in basis
- Validated then promoted to 2.2.0 (stable)
- Pro: Changes validated before wide use
- Con: Takes longer to roll out

Recommended: Option 2 for V1
  - Ensures improvements are real
  - Prevents skill drift
  - Builds confidence in skill versioning
```

---

## Post-Mortem Output Sections

### 1. Executive Summary

```
PROJECT: Task Management App
DATE: 2024-10-21
DURATION: 1 hour 15 minutes

KEY OUTCOMES:
✓ Spec emerged covering all domains
✓ No major conflicts (one successfully resolved)
✓ Timeline feasible with focused MVP
✓ Two valuable insights for future projects

SKILL IMPROVEMENTS: 3 proposed
PATTERNS IDENTIFIED: 1 (offline-first requires different architecture thinking)
CONFIDENCE IN DECISIONS: 85% (high)
```

### 2. Decision Log with Reasoning

```
DECISION 1: MVP Includes Basic Recommendations
  Timeline: Round 1, 8 minutes
  Initiated by: Product Panel
  Contested by: Architecture (feasibility concern)
  Resolution: Architecture confirmed 2-3 weeks feasible
  Outcome: Consensus
  Confidence: HIGH
  Reasoning: Value to user outweighs complexity
  Future impact: Drives architecture for ML model

DECISION 2: Device-Local ML Model (Not Cloud)
  Timeline: Round 2, 12 minutes
  Initiated by: Architecture
  Contested by: Product (data loss on app delete)
  Resolution: UX + Architecture compromise: Cache predictions
  Outcome: Consensus with compromise
  Confidence: MEDIUM (V2 will need rethinking)
  Reasoning: Faster MVP, simpler infrastructure
  Constraint: Limits future personalization accuracy

DECISION 3: Performance via Caching (Not Real-Time Inference)
  Timeline: Round 3, 10 minutes
  Initiated by: Architecture (performance concern)
  Contributed by: UX (user feedback requirement), Product (timeline)
  Resolution: Caching + loading state UI
  Outcome: Consensus
  Confidence: HIGH
  Reasoning: Balances user experience with technical feasibility
```

### 3. Skill Contributions

```
PRODUCT SKILL ANALYSIS:
Contributions:
  - Identified MVP scope clearly
  - Advocated for user value (recommendations)
  - Made timeline-conscious tradeoffs
Areas for Improvement:
  - Could have been more ruthless on features
  - Didn't proactively surface business model implications
Proposed Update:
  - Add "business model" considerations to intake
  - Add "ruthless prioritization" framework

ARCHITECTURE SKILL ANALYSIS:
Contributions:
  - Flagged ML complexity early
  - Identified device-local vs. cloud tradeoff
  - Proposed caching solution
Areas for Improvement:
  - Missed mobile performance implications initially
  - Could have engaged more on data persistence tradeoffs
Proposed Update:
  - Add "mobile platform requirements" to intake questions
  - Add mobile performance baselines
  - Earlier engagement with persistent data implications

SECURITY SKILL ANALYSIS:
Contributions:
  - Noted data privacy implications
  - Suggested encryption for sensitive data
Areas for Improvement:
  - Didn't deeply engage (limited security concerns in this project)
  - Could have discussed privacy regulations
No Proposed Update (skills not fully tested)

UX SKILL ANALYSIS:
Contributions:
  - Raised mobile performance from UX perspective
  - Advocated for user feedback incorporation
  - Suggested loading state UX for caching
Areas for Improvement:
  - Limited engagement with technical constraints
Proposed Update:
  - Deepen understanding of architecture tradeoffs
  - Better balance of user needs vs. technical feasibility
```

### 4. Conflict Resolution Effectiveness

```
CONFLICT: "Should ML model be device-local or cloud-based?"

Timeline: Round 2, 12 minutes
Participants: Architecture, Product, UX

Original Positions:
- Architecture: "Local is simpler, faster MVP"
- Product: "Cloud enables better personalization, user data retention"
- UX: "If data is lost on app delete, it's bad user experience"

Resolution Method: Reframing by Project Manager
- PM asked: "What if we do local for MVP, cloud in V2?"
- PM asked: "Can we solve data loss through UX design?"
- Architecture proposed: "Caching predictions maintains UX until V2"

Outcome: Win-win resolution
- Architecture: Gets simple MVP (local model)
- Product: Gets path to cloud (V2 feature)
- UX: Gets data persistence via caching

Effectiveness: HIGH
- Conflict resolved without anyone feeling overruled
- All constraints acknowledged
- Path forward is clear

Learning for Project Manager Skill:
- Reframing as future/present can unlock conflicts
- "MVP vs. V2" thinking helps resolve ambitious requirements
- Temporal thinking (phase over time) often resolves scope conflicts
```

### 5. Proposed Skill Updates

```
UPDATE 1: Architecture Skill
Skill: architecture/systems-architect
Current Version: 2.0.0
Proposed Version: 2.1.0
Type: Enhancement

Change Summary:
Add "Mobile Platform Considerations" section to intake questions

Specific Changes:
1. Add to intake questions:
   - "What client platforms? (iOS, Android, web, all?)"
   - "Performance constraints? (battery, CPU, memory?)"
   - "Offline capability required?"

2. Add mobile performance baselines:
   - Battery impact: Continuous sync = 5-10% battery/hour
   - CPU impact: ML inference on device = 1-3 seconds/operation
   - Mobile networks: 3G latency = 100-500ms

3. Add guidance:
   "Mobile-first architectures have different constraints than server-first.
    Ask platform requirements early. Affects everything downstream."

Confidence: HIGH (validated in session)
Affected Projects: Mobile-first projects (estimated 40% of future projects)
Rollout: Immediate to 2.1.0-candidate, promote to 2.1.0-stable after validation

---

UPDATE 2: Product Skill
Skill: product/product-manager
Current Version: 1.5.0
Proposed Version: 1.6.0
Type: Enhancement

Change Summary:
Add ruthless prioritization framework to MVP scoping

Specific Changes:
1. Must-Have / Nice-to-Have / V2 framework
   - Must-have: Core value prop (1-3 features max)
   - Nice-to-have: Would be great but not core
   - V2: Features that build on MVP success

2. Add to intake:
   "Of your features, which 3 are absolutely essential?
    Everything else goes to nice-to-have or V2."

3. Add guidance:
   "Scope creep is the #1 reason projects miss timelines.
    MVP means minimal, not everything awesome."

Confidence: MEDIUM (observed pattern, needs validation)
Affected Projects: Time-constrained projects (estimated 60% of projects)
Rollout: Candidate version, validate in 2-3 projects before promoting

---

UPDATE 3: UX Skill
Skill: ux/interaction-designer
Current Version: 1.2.0
Proposed Version: 1.3.0
Type: Enhancement

Change Summary:
Deepen understanding of architecture constraints and tradeoffs

Specific Changes:
1. Add architecture context to skill:
   "Understand basic tradeoffs:
   - Real-time vs. eventual consistency
   - Device-local vs. cloud sync
   - Caching vs. fresh data
   - How these affect user experience"

2. Add to collaboration:
   - Work with Architecture early to understand constraints
   - Balance user needs with technical feasibility
   - Propose UX solutions to technical problems

3. Add to evaluation:
   - When Architecture proposes a constraint, ask:
     "Can UX solve this problem differently?"

Confidence: MEDIUM (emerging pattern)
Affected Projects: Complex technical projects (estimated 30% of projects)
Rollout: Candidate version, validate and refine
```

### 6. Cross-Session Pattern Analysis

```
PATTERN 1: Mobile Performance Blindspot in Architecture
Sessions Affected: 3 of 5 projects with mobile component
Root Cause: Architecture skill optimizes for server architecture
Solution: Enhanced intake questions for mobile projects

Recommendation:
- Prioritize UPDATE 1 (Architecture mobile consideration)
- Consider creating specialized "Mobile Architecture" skill for V2+

---

PATTERN 2: Scope Creep in Product Thinking
Sessions Affected: 4 of 5 projects
Root Cause: Product skill didn't have ruthless prioritization framework
Solution: Enhanced product skill with must-have framework

Recommendation:
- Implement UPDATE 2 (Product prioritization)
- Add this to Project Manager intake questions
- Consider timeline as key context variable

---

PATTERN 3: UX Disconnect from Architecture
Sessions Affected: 2 of 5 projects
Root Cause: UX and Architecture aren't collaborating early
Solution: Deeper understanding of tradeoffs in both skills

Recommendation:
- Implement UPDATE 3 (UX architecture awareness)
- Possibly pair UX and Architecture in intake questions
- Improve cross-skill collaboration in all future sessions

---

TREND: Skills Improve Noticeably
After 5 sessions, average decision confidence increased from 78% to 84%
This suggests improvements are working.
```

---

## Post-Mortem Integration Points

### When to Run Post-Mortem

```
SCHEDULE OPTIONS:

Immediate (Recommended):
- Runs right after deliberation
- Memory fresh, details clear
- Improvements captured quickly

Delayed (Optional):
- Runs next day with additional reflection time
- Can collect user feedback on spec quality
- More time for analysis

Streaming (Future):
- Runs continuously during deliberation
- Real-time pattern detection
- Immediate skill adjustment
```

### How Post-Mortem Feeds Back

```
FEEDBACK LOOP 1: Immediate Skill Updates
Session → Post-mortem → Skill v2.1 → Next session uses v2.1

FEEDBACK LOOP 2: Pattern Detection
Session 1 → Observation
Session 2 → Observation
Session 3 → Pattern identified → Skill updated → Sessions 4+ benefit

FEEDBACK LOOP 3: User Feedback
Session → Spec created → User implements → Feedback collected
→ Post-mortem can be re-run with implementation feedback
→ Skill improvements informed by real-world outcomes

FEEDBACK LOOP 4: Marketplace Learning
Session → Improvements → Published to skill marketplace
→ Other organizations use improved skill
→ They report back → Improvements validated
```

---

## Post-Mortem Facilitation

### Facilitator Role

The Post-Mortem Moderator:

1. **Keeps it focused** - Don't re-debate, analyze
2. **Stays objective** - What happened, not judgment
3. **Captures learning** - What should improve?
4. **Documents systematically** - Create actionable updates
5. **Surfaces patterns** - Connects to previous sessions

### Sample Facilitation

```
MODERATOR: "Great deliberation on the task app. Let's reflect.

Round 1: What actually happened?
  Analyst: [Walks through timeline]

Round 2: What insights were valuable?
  Skill Maintainers: [Highlight key contributions]
  Project Manager: [Reflect on facilitation effectiveness]

Round 3: Should we change anything about the skills?
  Architecture: "I missed mobile early. Let's add mobile intake questions"
  Product: "I wanted everything. Should we add prioritization framework?"
  UX: "I didn't understand architecture tradeoffs well"

Round 4: What patterns do we see across all sessions?
  Historian: "This is the third project where mobile was missed"

Round 5: What updates do we propose?
  [Create improvement documentation]

We're done. These improvements help future projects."
```

---

## Preventing Skill Drift

The post-mortem system must protect against drift:

### Risk: Skills Changing Too Much
```
Problem: Every session, skills get updated
Result: Skills become inconsistent, optimization for individual projects

Prevention:
- Use confidence levels (HIGH vs. MEDIUM vs. LOW)
- Use staged rollout (candidate before stable)
- Review patterns across 3+ sessions before updating
- Have skill maintainers review changes for consistency
```

### Risk: Skills Becoming Bloated
```
Problem: Adding so many improvements that skills become overwhelming

Prevention:
- Prioritize improvements by impact
- Archive outdated guidance
- Review skill for clarity annually
- Keep skills focused on their core domain
```

### Risk: Learning From One Project Doesn't Apply Elsewhere
```
Problem: Update based on mobile project hurts non-mobile projects

Prevention:
- Use "scoped" improvements (e.g., "For mobile projects:")
- Conditional guidance ("If platform includes mobile, then:")
- Regular review of improvement applicability
- Feedback mechanism when improvement doesn't help
```

---

## Metrics Tracked by Post-Mortem

```
PER-SESSION METRICS:
- Decision confidence: 0-100% (user's confidence in decisions)
- Consensus quality: How easily was agreement reached?
- Time-to-consensus: How long did each decision take?
- Conflict count: How many disagreements emerged?
- Conflict resolution rate: What % were resolved vs. escalated?

EXPERT-LEVEL METRICS:
- Contribution count: How many insights did each expert provide?
- Early warning rate: How many problems did they flag early?
- Accuracy rate: Were their concerns validated by spec/implementation?
- Collaboration score: How well did they work with other experts?

CROSS-SESSION TRENDS:
- Skill improvement impact: Do improved skills lead to better decisions?
- Decision reuse: Are similar decisions being made again (suggests pattern)?
- User satisfaction: Post-session, does user feel good about decisions?
- Implementation success rate: Do specs lead to successful implementation?

SKILL HEALTH:
- Currency: When was this skill last updated?
- Accuracy: What % of skill guidance proved valuable?
- Adoption: How many sessions use this skill?
- Evolution: Is this skill improving over time?
```

---

## Post-Mortem as Continuous Learning

The post-mortem system enables **organizational learning**:

```
Individual Session
    ↓
Post-Mortem Analysis
    ↓
Skill Improvements
    ↓
Organization Learns
    ↓
Future Projects Benefit

Over time: Experts get better, decisions get better, specs get better
```

This is the flywheel effect. Each session makes the system better for the next session.

---

## Future Evolution

### V2: Automated Post-Mortem Analysis
- AI-powered analysis of deliberation transcript
- Automatic pattern detection
- Suggested skill improvements
- Reduced time from session to improvement

### V3: Real-Time Learning
- Post-mortem runs during session
- Immediate skill adjustment
- Live learning loop
- Adaptive expert panels

### V4: Implementation Feedback
- Track whether spec led to good implementation
- Post-mortem analyzes both deliberation AND implementation results
- Improved skills based on real-world outcomes
- True feedback loop

---

## Summary: Why Post-Mortem Matters

Without post-mortem:
- Each session is standalone
- Mistakes repeat
- Expertise doesn't compound
- Same experts make same errors in future sessions

With post-mortem:
- Each session informs the next
- Patterns are caught and fixed
- Expertise compounds over time
- Experts improve, skills improve, decisions improve

**The post-mortem system is what turns Roundtable from a tool into a learning system.**
