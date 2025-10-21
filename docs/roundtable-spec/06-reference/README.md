# 06-REFERENCE: Research, Analysis, and Reference Materials

## Purpose

This folder contains **research, analysis, academic references, and archived materials**. It provides the scholarly foundation and external context for Roundtable design decisions.

## What Goes Here

**REFERENCE DOCUMENTATION:**
- Academic research and citations
- External analysis and comparisons
- Market/competitive analysis
- Foundational studies
- Archived materials with explanations
- Technical benchmarks and research

## Subfolders

### /archived-pmp-analysis

**Status:** Archived - Not part of active Roundtable specification

**Purpose:** Contains analysis of how traditional Project Management differs from Roundtable PM

**Contents:**
- **PMP_ANALYSIS.md** - Detailed comparison of Roundtable vs. PMBOK
- **PMP_RECOMMENDATIONS_SUMMARY.md** - Summary of traditional PM recommendations
- **README.md** - Why these are archived and when to use them

**When to reference:**
- If building traditional PM compliance into Roundtable
- If creating enterprise PM skills
- If justifying why Roundtable PM differs from traditional PM

**Note:** These are kept for reference, but Roundtable intentionally does NOT follow traditional PMBOK practices.

## What Doesn't Go Here

- **Not here:** Core specifications (→ 00-core/)
- **Not here:** Agent/skill definitions (→ 01-agents/)
- **Not here:** Active governance (→ 04-governance/)
- **Not here:** Use cases (→ 05-use-cases/)

## Research References Available

### Foundational Research (referenced in SPEC.md Section 18)

- **Multi_Agent_Debate_Accuracy.pdf** - MIT research on debate mechanics
- **Roundtable_Policy_Weighted_Consensus.pdf** - Weighting and consensus frameworks
- **MARE_Requirements_Engineering.pdf** - Multi-agent requirements engineering
- **Multi_Agent_Coordination_Challenges.pdf** - Coordination and alignment issues

These are referenced in SPEC.md Section 15 (now 18).

## Contributing Guidelines

When adding to 06-reference:

1. **Are you adding academic research?** → Add here
2. **Are you archiving obsolete materials?** → Add with README
3. **Are you providing external context?** → Add here
4. **Are you comparing to external frameworks?** → Add here

5. **Are you documenting core concepts?** → Go to 00-core/
6. **Are you explaining a process?** → Go to 03-spec-process/
7. **Are you creating an example?** → Go to 05-use-cases/

## Format for Archived Materials

When archiving materials that are no longer active, create a subfolder with:

1. **Original documents** - The archived materials
2. **README.md** - Explanation of why archived
   - What it contained
   - When to reference it
   - Why it's not active
   - When it might become active again

## Citation Format

When referencing research, use:

```
**Paper Title** - [Author/Institution]
- Location: [Link or path]
- Summary: [1-2 sentence summary]
- Relevance: [Why this matters to Roundtable]
```

## Important Notes

### Archived vs. Obsolete

- **Archived** - Still valid knowledge, but not part of active spec
  - Example: PMP_ANALYSIS.md (valid analysis, but we don't follow PMBOK)
  - Keep for reference and potential future use

- **Obsolete** - No longer relevant or superseded
  - Should rarely be in documentation
  - If present, mark clearly as obsolete

### Roundtable Philosophy on Tradition

Documents in this folder should clarify:
- Roundtable is NOT trying to replace traditional practices wholesale
- Some practices (like risk management, change control) are addressed differently
- Traditional PM skills CAN be created as custom skills
- Users can enforce traditional practices via Constitutions

See SPEC.md Section 6 for complete PM philosophy.

## Questions to Ask Before Adding Here

- Is this research or external reference?
- Is this archival material with explanation?
- Is this active specification? (→ No, then belongs here)
- Would this help teams understand Roundtable's foundations?

If these are reference/research materials → This belongs in 06-reference/

## How This Folder Stays Organized

1. **Keep active research up-to-date** - If research changes, update references
2. **Archive with context** - Explain why materials are archived
3. **Link to active documentation** - Reference-docs should link to SPEC.md
4. **Maintain scholarly standards** - Use proper citations and sources
5. **Regular review** - Quarterly check if references are still relevant

## See Also

- [SPEC.md Section 18](../00-core/SPEC.md#18-references--research) - References section in main spec
- [README.md](../README.md) - Overall documentation structure
