# CLAUDE.md: Roundtable Project Development Conventions

## Overview

This document establishes conventions for Claude (and other AI agents) **developing the Roundtable project codebase**.

**CRITICAL DISTINCTION:**

- **This file (CLAUDE.md):** Development instructions for Claude building Roundtable
- **.claude/skills/project-manager/:** Runtime instructions for Roundtable agents at runtime

**DO NOT MIX THEM.** Development conventions and runtime agent behavior are completely separate concerns.

---

## Commit Review Policy

**MANDATORY:** Never commit changes until the user has reviewed and explicitly approved them.

This applies to **ALL commits**, regardless of size, complexity, or perceived safety.

**Process:**
1. Make changes to files
2. Show user the diff or staged changes
3. Ask: "Is this correct? Should I commit?"
4. Wait for explicit approval
5. Only then run `git commit`

**Why:** The user needs visibility and control over what goes into their codebase.

---

## Suggesting Implementation Phases

If a user asks you to implement something large (e.g., "Start implementing Phase 1"), and you think it should be broken into smaller pieces, suggest it clearly and conversationally:

**Example:**
```
User: "Start implementing Phase 1"

Agent: "Phase 1 is quite large. I see from the GitHub issues that
it's already split into Phase 1A, 1B, 1C, etc.

Which would you like to start with? Or should we tackle multiple
phases in sequence?"
```

If the user agrees to split the work, then proceed. Don't create documentation unless asked. The phases are already tracked on GitHub—use those as your reference.

**Key principle:** Communicate, get approval, then execute. Don't create planning documents unless the user specifically requests them.

---

## Status

**Convention Status:** Active and in effect
**Applies To:** All Roundtable development work going forward
**Updated:** 2024-10-22
**Version:** 2.0 (Separated dev conventions from runtime agent behavior)

---

**Remember:** Development conventions stay in CLAUDE.md. Runtime behavior goes in .claude/skills/.
