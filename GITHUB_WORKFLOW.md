# GitHub Project Workflow - Roundtable CLI

## Repository
**URL:** https://github.com/AlexZan/roundtable-cli
**Visibility:** Private
**Owner:** AlexZan

---

## Project Structure

### GitHub Project Board
**URL:** https://github.com/users/AlexZan/projects/2
**Name:** Roundtable Development

### Milestones (7 Total)

| Milestone | Token Estimate | Status | Description |
|-----------|---|---|---|
| **Phase 1A: Validation Prototype** | ~15K | ✅ Complete | 2-agent debate, basic CLI, testing |
| **Phase 1B: Panel System** | ~25K | 🔄 Next | Skills, panels, multiple agents |
| **Phase 1C: Multiple LLMs** | ~15K | ⏸️ Planned | GPT-4, Gemini, Grok support |
| **Phase 1D: Synthesis & PM** | ~30K | ⏸️ Planned | PM agent, spec generation |
| **Phase 2: Advanced Features** | ~45K | ⏸️ Planned | Enhanced debate, multimodal |
| **Phase 3: Production Polish** | ~25K | ⏸️ Planned | Session management, UX |
| **Phase 4: Learning Systems** | ~20K | ⏸️ Planned | Post-mortem, feedback loops |

**Total System:** ~175K tokens estimated

---

## Issues Created

### Active Issues

**Issue #1:** ✅ Phase 1A Complete Implementation
- **Milestone:** Phase 1A
- **Status:** Completed
- **Labels:** `phase-1a`, `completed`
- Documents completed prototype work

**Issue #2:** 🔥 User Testing - PRIORITY
- **Milestone:** Phase 1A
- **Status:** Open (unblocked - API credits added)
- **Labels:** `phase-1a`, `testing`
- **Blocks:** Issue #3 (Phase 1B planning)
- **Action Required:** Run 5 test prompts, document findings

### Planning Issues

**Issue #3:** Phase 1B Planning
- **Milestone:** Phase 1B
- **Blocked by:** Issue #2
- **Labels:** `phase-1b`, `planning`

**Issue #4:** Phase 1C - Multiple LLMs
- **Milestone:** Phase 1C
- **Blocked by:** Phase 1B
- **Labels:** `phase-1c`, `planning`

**Issue #5:** Phase 1D - PM Agent & Spec Gen
- **Milestone:** Phase 1D
- **Blocked by:** Phase 1B, 1C
- **Labels:** `phase-1d`, `planning`

**Issue #6:** Phase 2 - Enhanced Debate & Multimodal
- **Milestone:** Phase 2
- **Blocked by:** Phase 1D
- **Labels:** `phase-2`, `planning`

**Issue #7:** Phase 3 - Production Polish
- **Milestone:** Phase 3
- **Blocked by:** Phase 2
- **Labels:** `phase-3`, `planning`

**Issue #8:** Phase 4 - Learning Systems
- **Milestone:** Phase 4
- **Blocked by:** Phase 3
- **Labels:** `phase-4`, `planning`

---

## Labels Reference

| Label | Color | Purpose |
|-------|-------|---------|
| `phase-1a` | Green | Phase 1A work |
| `phase-1b` | Blue | Phase 1B work |
| `phase-1c` | Purple | Phase 1C work |
| `phase-1d` | Red | Phase 1D work |
| `phase-2` | Orange | Phase 2 work |
| `phase-3` | Yellow | Phase 3 work |
| `phase-4` | Dark Blue | Phase 4 work |
| `testing` | Light Purple | Testing & validation |
| `planning` | Light Blue | Planning & design |
| `completed` | Cyan | Completed work |

---

## Workflow

### For High-Level Planning (Strategic Agent)

1. **Phase Planning:**
   - Create scope document (following CLAUDE.md guidelines)
   - Break phase into sub-tasks
   - Create token estimates
   - Update relevant GitHub issues

2. **Milestone Tracking:**
   - Close issues when phase complete
   - Update milestone descriptions
   - Create retrospective documents

3. **Decision Documentation:**
   - Use issues for architectural decisions
   - Link related issues
   - Tag with appropriate labels

### For Tactical Implementation (Development Agents)

1. **Pick Issues:**
   - Check GitHub issues for assigned work
   - Read issue description for context
   - Follow scope as defined

2. **Work on Feature:**
   - Create feature branch if needed
   - Implement changes
   - Run tests
   - Commit with clear message

3. **Update Progress:**
   - Comment on issue with progress
   - Close issue when complete
   - Reference issue in commit message (`#N`)

### For Testing & Validation

1. **Run Tests:**
   - Follow test plans in issues
   - Document results as issue comments
   - Create new issues for bugs found

2. **Document Findings:**
   - Update relevant docs (PROTOTYPE_LEARNINGS.md)
   - Comment on blocking issues
   - Recommend next steps

---

## Current Priority

**#1 Priority: Issue #2 - User Testing**

**Why:** Blocks all Phase 1B planning. Need to validate Phase 1A approach works before investing ~125K tokens in expansion.

**Who:** User or testing agent
**When:** Now (API credits added)
**Duration:** 30-45 minutes
**Cost:** ~$0.10-0.25

**Test Plan:** `roundtable-cli/TEST_PLAN.md`

**Output:**
1. Test results in `PROTOTYPE_LEARNINGS.md`
2. Decision: Proceed to 1B / Iterate 1A / Rethink
3. Close Issue #2
4. Unblock Issue #3 (Phase 1B planning)

---

## Phase Progression Flow

```
Phase 1A (Complete)
    ↓
User Testing (#2) ← YOU ARE HERE
    ↓
Phase 1B Planning (#3)
    ↓
Phase 1B Implementation
    ↓
Phase 1C Implementation (#4)
    ↓
Phase 1D Implementation (#5)
    ↓
Phase 2 (#6)
    ↓
Phase 3 (#7)
    ↓
Phase 4 (#8)
```

---

## API Key Protection

**Protected Files (in .gitignore):**
- `.env`
- `.env.local`
- `.env.*.local`
- `roundtable-cli/.env`

**Verification:**
```bash
# Check what's tracked
git ls-files | grep env

# Should return nothing (all .env files ignored)
```

---

## Quick Commands

```bash
# View all issues
gh issue list

# View specific milestone
gh issue list --milestone "Phase 1A: Validation Prototype"

# Create new issue
gh issue create --title "..." --milestone "..." --label "..."

# Close issue
gh issue close <number>

# View project board
gh project view 2

# Push changes
git add .
git commit -m "Description (#issue-number)"
git push
```

---

## Links

- **Repository:** https://github.com/AlexZan/roundtable-cli
- **Project Board:** https://github.com/users/AlexZan/projects/2
- **Issues:** https://github.com/AlexZan/roundtable-cli/issues
- **Milestones:** https://github.com/AlexZan/roundtable-cli/milestones

---

## For Strategic Agent (Me)

**My Role:**
- High-level planning & architecture
- Phase scope definition
- Gap analysis & recommendations
- Decision documentation
- Roadmap updates

**I Create:**
- Phase planning documents
- Scope definitions (following CLAUDE.md)
- Architecture decision records
- Retrospectives
- Token estimates

**I Update:**
- GitHub issues (planning level)
- Milestones
- Roadmap documents
- Spec documents

---

## For Tactical Agents (Other Agents)

**Their Role:**
- Implement defined features
- Fix bugs
- Write tests
- Update config files
- Code reviews

**They Work On:**
- Specific GitHub issues
- Clear, scoped tasks
- Following defined architecture
- Tactical code changes

---

**Last Updated:** 2024-10-22
**Next Review:** After Issue #2 (User Testing) completes
