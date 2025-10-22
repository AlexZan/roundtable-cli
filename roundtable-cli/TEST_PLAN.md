# Phase 1A Prototype - User Testing Plan

**Goal:** Validate core architecture and debate mechanics through manual testing

**Duration:** ~30-45 minutes

**Prerequisites:**
- ANTHROPIC_API_KEY environment variable set
- Dependencies installed (`npm install`)

---

## Setup

```bash
cd roundtable-cli
npm install
export ANTHROPIC_API_KEY=your-key-here  # or $env:ANTHROPIC_API_KEY on Windows
```

---

## Test Session Structure

For each test prompt:

1. Run: `npm run dev start`
2. Enter the test prompt
3. Observe output carefully
4. Document findings in PROTOTYPE_LEARNINGS.md

**What to observe:**
- ✅ Do agents take different positions?
- ✅ Does Round 2 show agents responding to each other?
- ✅ Are token costs reasonable (~1500-2500 per session)?
- ✅ Is CLI flow smooth and clear?
- ✅ Does session save correctly?
- ⚠️ Any errors or unexpected behavior?

---

## Test Prompts

### Test 1: Simple Use Case (Baseline)

**Prompt:** "A blog with comments"

**Expected Behavior:**
- Architecture Expert: Focus on data model, scalability
- Product Expert: Focus on user features, moderation
- Token budget: ~1200-1800 tokens

**Questions to Answer:**
- Do agents debate or just list features?
- Is there any disagreement or tension?
- Does Round 2 add value?

---

### Test 2: Medium Complexity (Trade-offs)

**Prompt:** "A todo app with offline sync"

**Expected Behavior:**
- Architecture Expert: Debate sync strategies (CRDT, last-write-wins, operational transform)
- Product Expert: Balance offline UX vs. complexity
- Token budget: ~1800-2500 tokens

**Questions to Answer:**
- Do agents identify trade-offs?
- Do they reference each other's points in Round 2?
- Is there meaningful convergence or divergence?

---

### Test 3: Complex with Constraints (Conflict Test)

**Prompt:** "A real-time multiplayer game platform that must scale to 10M concurrent users on a $5K/month infrastructure budget"

**Expected Behavior:**
- Architecture Expert: Emphasize technical constraints (WebRTC, regional servers)
- Product Expert: May push back on constraint feasibility
- Token budget: ~2000-3000 tokens

**Questions to Answer:**
- Do agents disagree on feasibility?
- Does Product Expert challenge Architecture's assumptions?
- Does Round 2 resolve the tension or deepen it?

---

### Test 4: Ambiguous Requirements (Clarification Test)

**Prompt:** "An app for teams"

**Expected Behavior:**
- Both agents should identify missing information
- Should ask clarifying questions about domain, team size, use case
- Token budget: ~1500-2000 tokens

**Questions to Answer:**
- Do agents recognize ambiguity?
- Do they ask similar or different clarifying questions?
- Is the output helpful for refining requirements?

---

### Test 5: Domain-Specific (Expertise Test)

**Prompt:** "A healthcare appointment scheduling system with HIPAA compliance"

**Expected Behavior:**
- Architecture Expert: Focus on security, audit logs, encryption
- Product Expert: Focus on user workflows, reminders, no-shows
- Token budget: ~2000-2800 tokens

**Questions to Answer:**
- Do agents demonstrate domain knowledge?
- Do they identify compliance requirements?
- Is the debate grounded in healthcare realities?

---

## Success Criteria

### Must Pass (Blockers if failing)
- [ ] Agents provide different perspectives (not identical responses)
- [ ] Round 2 shows agents saw Round 1 context
- [ ] No API errors or crashes
- [ ] Sessions save to JSON files correctly
- [ ] Token usage is within budget (~1500-2500 per session)

### Should Pass (Concerns if failing)
- [ ] Agents reference each other's points in Round 2
- [ ] Debate shows some tension or disagreement
- [ ] CLI flow is intuitive (no confusion)
- [ ] Output is readable and well-formatted

### Nice to Have (Deferred if failing)
- [ ] Agents identify trade-offs explicitly
- [ ] Convergence or divergence is measurable
- [ ] Output could be used directly for spec generation

---

## Documentation Template

After each test, fill in this section in PROTOTYPE_LEARNINGS.md:

```markdown
### Test Session [#]

**Prompt:** "[exact prompt used]"

**Rounds:** 2
**Tokens:** [total from output]
**Duration:** [seconds from output]

**Architecture Expert Round 1:**
[1-2 sentence summary of position]

**Product Expert Round 1:**
[1-2 sentence summary of position]

**Architecture Expert Round 2:**
[Did they respond to Product's points? How?]

**Product Expert Round 2:**
[Did they respond to Architecture's points? How?]

**Observations:**
- ✅ What worked well
- ⚠️ What could be better
- ❌ What failed

**Key Insight:**
[One sentence: What did this test reveal?]
```

---

## After All Tests

### Step 1: Analyze Findings

Review all 5 test sessions and answer:

1. **Does multi-agent debate add value?**
   - If YES → Proceed to Phase 1B
   - If NO → Rethink approach (maybe agents need different prompts?)

2. **Is 2 rounds sufficient?**
   - If YES → Keep design
   - If NO → Consider 3-4 round architecture

3. **Are token costs reasonable?**
   - If YES → Current design is economical
   - If NO → Need to optimize prompt size or round count

4. **Is JSON storage sufficient?**
   - If YES → Keep for Phase 1
   - If NO → Plan database migration for Phase 2

### Step 2: Make Decision

Based on findings, choose one:

**Option A: Proceed to Phase 1B** (if prototype validates approach)
- Add more agents (beyond just 2)
- Add panel system (not hardcoded)
- Add spec generation from debate output

**Option B: Iterate on Phase 1A** (if issues found)
- Adjust agent prompts
- Change round count
- Refine context passing between rounds

**Option C: Rethink Approach** (if fundamental issues)
- Consider different architecture
- Re-evaluate multi-agent value proposition

### Step 3: Document Recommendations

Fill in the "Recommendations for Phase 1B" section of PROTOTYPE_LEARNINGS.md with specific action items.

---

## Automated Testing (Later)

After user testing validates the approach, add:

### Unit Tests (Phase 1B)
```typescript
// Example: src/llm/__tests__/claude.test.ts
test('ClaudeClient handles API errors gracefully', async () => {
  // Test error handling
});

// Example: src/session/__tests__/session.test.ts
test('SessionManager saves and loads sessions correctly', async () => {
  // Test persistence
});
```

### E2E Tests (Phase 2)
```typescript
// Example: tests/e2e/debate-flow.test.ts
test('Full debate flow from CLI to session save', async () => {
  // Simulate CLI interaction
  // Verify output format
  // Check session file created
});
```

---

## Timeline

**User Testing (Now):** 30-45 minutes
- Run 5 test prompts
- Document findings
- Make Phase 1B decision

**Unit Testing (Phase 1B):** After user testing validates approach
**E2E Testing (Phase 2):** After panel system and multi-LLM support added

---

**Ready to test?** Run `npm run dev start` and try Test 1!
