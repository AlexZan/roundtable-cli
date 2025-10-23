# Creating Custom Panels

This guide explains how to create custom expert panels for Roundtable.

## What are Panels?

Panels are groups of expert skills that work together on specific types of projects. A panel defines:
- **Which experts participate** (via skill IDs)
- **When to use this panel** (via keywords for auto-detection)
- **How many agents** to create

## When to Create a Custom Panel

Create a custom panel when:
- You frequently work on a specific project type
- You need a specific combination of expertise
- Default panels don't match your workflow

Examples:
- "E-commerce Platform" panel (architecture + product + ux + security)
- "Machine Learning Project" panel (data-engineering + architecture + product)
- "DevOps Automation" panel (devops + architecture + security)

## YAML Format

Panels are defined in `.roundtable/panels/*.yaml` files.

### Required Fields

```yaml
id: unique-panel-id              # Lowercase, hyphens only
name: Human Readable Panel Name   # Display name
description: When to use this panel
version: 1.0.0                    # Semantic versioning
skillIds:                         # List of skill IDs
  - skill1
  - skill2
  - skill3
```

### Optional Fields

```yaml
keywords:                         # For auto-detection (highly recommended!)
  - keyword1
  - keyword2

agentCount: 3                    # Usually equals skillIds.length

tags:                            # For categorization
  - tag1

author: Your Name                # Maintainer info
```

## Choosing Skills for Your Panel

### Optimal Panel Size

- **2 skills**: Minimal, may lack diversity
- **3-4 skills**: ✅ Recommended - good balance
- **5 skills**: Maximum recommended
- **6+ skills**: May be too many perspectives

### Skill Selection Strategy

Choose skills that provide **complementary perspectives**:

✅ **Good combinations:**
- **Full Stack Web**: architecture + ux + security + product (4 distinct domains)
- **Data Platform**: architecture + data-engineering + security (focused on data)
- **Mobile App**: architecture + ux + product (mobile-specific concerns)

❌ **Avoid redundancy:**
- Don't include multiple skills from the same domain
- Don't include skills with overlapping responsibilities

### Coverage Check

Does your panel cover:
- [ ] Technical implementation? (architecture, engineering)
- [ ] User perspective? (ux, product)
- [ ] Risks and compliance? (security)

## Keywords for Auto-Detection

Keywords help Roundtable automatically select the right panel based on user prompts.

### Best Practices

**1. Include project type keywords:**
```yaml
keywords:
  - web
  - website
  - webapp
```

**2. Include technology keywords:**
```yaml
keywords:
  - react
  - node
  - frontend
  - backend
```

**3. Include domain keywords:**
```yaml
keywords:
  - ecommerce
  - shopping
  - cart
  - payment
```

### Comprehensive Example

```yaml
keywords:
  # Project types
  - web
  - website
  - webapp
  # Tech stack
  - react
  - vue
  - angular
  - node
  - express
  - django
  # Patterns
  - spa
  - pwa
  - api
  - rest
  - graphql
```

More keywords = better auto-detection, but stay relevant to your panel's expertise.

## Example: E-commerce Panel

```yaml
id: ecommerce-platform
name: E-commerce Platform Panel
description: Expert panel for e-commerce and online shopping platforms
version: 1.0.0

skillIds:
  - architecture
  - product
  - ux
  - security

keywords:
  # Domain
  - ecommerce
  - shopping
  - store
  - retail
  - marketplace
  # Features
  - cart
  - checkout
  - payment
  - inventory
  - orders
  - catalog
  - products
  # Tech
  - stripe
  - paypal
  - shopify

tags:
  - ecommerce
  - web

agentCount: 4

author: Your Name
```

## Testing Your Panel

### 1. Validate Skills Exist

Make sure all skills in `skillIds` are defined:

```bash
ls .roundtable/skills/
# Check that each skill in your panel exists
```

### 2. Test Auto-Detection

```bash
cd roundtable-cli
node -e "import('./src/panels/selector.js').then(m => m.detectPanel({prompt: 'Build an e-commerce store with shopping cart'}, {panelsDir: '../.roundtable/panels'}).then(r => console.log('Detected:', r.panel?.name, 'Confidence:', r.confidence, 'Matched:', r.matchedKeywords)))"
```

Expected output: Your panel should be detected with good confidence.

### 3. Run Test Debate

```bash
npm run dev
# Enter a prompt matching your panel's keywords
# Verify your panel is detected
# Check that all experts participate
```

### 4. Verify Expert Mix

After running a debate:
- ✅ Each expert should have distinct perspective
- ✅ Experts should reference their domain knowledge
- ✅ Round 2 should show experts engaging with each other
- ✅ No redundant or overlapping responses

## Validation Rules

### ID Format
- ❌ `E-Commerce_Panel` (uppercase, special chars)
- ✅ `ecommerce-panel` (lowercase, hyphens)

### Version Format
- ❌ `1.0` (not semver)
- ✅ `1.0.0` (semantic versioning)

### Skill Count
- ⚠️ 1 skill: Warning (panels work best with 3-5)
- ✅ 2-5 skills: Recommended
- ⚠️ 6+ skills: Warning (may be too many)

### Agent Count Mismatch
If `agentCount` doesn't match `skillIds.length`, you'll get a warning.

## Auto-Detection Confidence

When Roundtable detects your panel, confidence is based on keyword matching:

- **0.8-1.0**: High confidence (many keywords matched)
- **0.5-0.8**: Medium confidence (some keywords matched)
- **0.0-0.5**: Low confidence (few keywords matched)

If confidence is too low:
1. Add more relevant keywords
2. Add technology-specific keywords
3. Add domain-specific terminology

## Common Mistakes

### 1. Too Few Keywords

❌ **Bad:**
```yaml
keywords:
  - web
```

✅ **Good:**
```yaml
keywords:
  - web
  - website
  - webapp
  - frontend
  - backend
  - react
  - node
  - api
```

### 2. Wrong Skill IDs

❌ **Bad:**
```yaml
skillIds:
  - architecture-expert  # Wrong - uses display name
```

✅ **Good:**
```yaml
skillIds:
  - architecture  # Correct - uses skill ID
```

### 3. Redundant Skills

❌ **Bad:**
```yaml
skillIds:
  - frontend-expert
  - react-expert
  - ux-expert
  # All focus on frontend - too much overlap
```

✅ **Good:**
```yaml
skillIds:
  - architecture  # Technical structure
  - ux            # User experience
  - product       # Business value
  # Complementary perspectives
```

### 4. Missing Keywords

Without keywords, your panel won't be auto-detected. Always include at least 5-10 relevant keywords.

## Advanced: Alternative Panels

You can create multiple panels for the same domain with different focuses:

**ecommerce-mvp.yaml** (minimal):
```yaml
skillIds:
  - product
  - architecture
keywords: [ecommerce, mvp, simple, basic]
```

**ecommerce-enterprise.yaml** (comprehensive):
```yaml
skillIds:
  - architecture
  - product
  - ux
  - security
  - data-engineering
keywords: [ecommerce, enterprise, scalable, complex]
```

Roundtable will detect the best match based on the user's prompt.

## Next Steps

- See existing panels in `.roundtable/panels/` for examples
- Read [Creating Skills](./CREATING_SKILLS.md) to create custom experts
- Check `.roundtable/panels/custom-example.yaml` for a well-commented template

---

**Questions or issues?** Check the Roundtable documentation or open an issue.
