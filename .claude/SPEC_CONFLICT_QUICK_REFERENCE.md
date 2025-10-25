# Spec Conflict Quick Reference

**TL;DR:** MD spec is source of truth. Before implementing any feature: check if it conflicts with `docs/roundtable-spec/`. If yes, ask user about the divergence.

## Quick Flowchart

```
Start work on GitHub issue
    ↓
Read issue completely
    ↓
Find relevant spec section
(grep in docs/roundtable-spec/)
    ↓
Read spec section completely
    ↓
Does it match spec?
├─ YES → Proceed with implementation
├─ NO → STOP, show user conflict ⚠️
└─ PARTIAL → Ask for clarification
```

## How to Find Relevant Spec

**Quick search commands:**

```bash
# Find spec files
ls docs/roundtable-spec/00-core/

# Search for keywords
grep -r "keyword" docs/roundtable-spec/

# Common files:
# - EXPERT_PANELS.md (panels, agents, roles, consensus)
# - CONSENSUS_ALGORITHMS.md (how panels agree)
# - VISION_AND_PHILOSOPHY.md (design principles)
# - USER_INTERACTION_CONTROL.md (CLI/UX patterns)
```

## When You Find a Conflict

**Don't implement.** Show user:

```
⚠️ SPEC CONFLICT DETECTED

Issue: #XX - [Title]
Conflicts with: [FILENAME.md, section X]

SPEC SAYS: [Quote the spec]

ISSUE PROPOSES: [Quote the issue]

CONFLICT: [One sentence explaining incompatibility]

Ask user:
1. Should we defer this?
2. Should we update the spec?
3. Is there a compromise?

If proceeding differently: I'll update the spec to explain why.
```

## After User Approves Divergence

1. **Update spec file** - Add "Changed from Original Spec" section
2. **Reference in commit** - "Updates EXPERT_PANELS.md section X (diverge from V1 spec)"
3. **Add to Lessons Learned** - If it's significant architectural change

## Examples

### ✅ NO CONFLICT - Proceed

```
Spec: "Panels respond to direct questions"
Issue: "Add email notifications for panel responses"
Status: Enhancement, not conflict → Implement
```

### ❌ CONFLICT - Ask User First

```
Spec: "V1: One agent per skill per panel"
Issue: "Multi-model panels with 2-3 agents per skill"
Status: Changes core design → STOP and ask user
```

```
Spec: "Agents contribute naturally (no role assignment)"
Issue: "Pre-assign agent roles: Claude=Threat, GPT=Compliance"
Status: Different approach → STOP and ask user
```

## Real Example: Issue #33

**Current status:**
- ✅ Spec defines: One agent per skill (V1 design philosophy)
- ✅ Issue #33 proposes: 2-3 models per skill (multi-model panel)
- ❓ Status: NEEDS USER DECISION

**What agent should do:**
1. Read EXPERT_PANELS.md section 6
2. See V1 design: one agent per panel
3. See Issue #33: multiple agents per skill
4. Present conflict to user
5. If user approves: Update EXPERT_PANELS.md with "Multi-Model Enhancement" section
6. Reference update in commit message

## Files to Update When Diverging

```
docs/roundtable-spec/00-core/EXPERT_PANELS.md
  → Add "Changed from Original Spec" section explaining why

.claude/CLAUDE.md
  → If architectural: add to Lessons Learned
  → Update version number
```

## Token Efficiency

- **Checking spec upfront:** ~500-1,000 tokens
- **Fixing conflict after implementation:** ~5,000-15,000 tokens
- **ROI:** 5x-15x token savings

## One-Line Rule

**Before implementing: Does this match the spec? If no, ask user why we're diverging.**
