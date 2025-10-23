# Creating Custom Skills

This guide explains how to create custom expert skills for Roundtable.

## What are Skills?

Skills are reusable expert definitions that define an AI agent's domain expertise, perspective, and behavior. Each skill includes:
- **Identity**: Name and description of the expert
- **Expertise**: System prompt defining the expert's knowledge and approach
- **Metadata**: Version, domain, keywords for organization

## When to Create a Custom Skill

Create a custom skill when you need:
- A domain expert not covered by default skills
- A specific perspective for your project type
- Specialized knowledge (e.g., "Blockchain Expert", "Healthcare Compliance Expert")

## YAML Format

Skills are defined in `.roundtable/skills/*.yaml` files.

### Required Fields

```yaml
id: unique-skill-id              # Lowercase, hyphens only
name: Human Readable Skill Name   # Display name
description: Brief description of what this skill provides
version: 1.0.0                    # Semantic versioning
domain: category                  # E.g., engineering, product, design
systemPrompt: |
  The system prompt that defines the expert's knowledge, perspective,
  and behavior. This should be 200-400 words for best results.
```

### Optional Fields

```yaml
keywords:                         # For auto-detection
  - keyword1
  - keyword2

tags:                            # For categorization
  - tag1
  - tag2

author: Your Name                # Maintainer info
```

## System Prompt Best Practices

The `systemPrompt` is the most important part of your skill. It defines how the expert thinks and responds.

### Structure Your Prompt

```yaml
systemPrompt: |
  You are a [ROLE] with deep expertise in [DOMAIN].
  Your role is to [PRIMARY FUNCTION].

  Your expertise includes:
  - [Area 1]
  - [Area 2]
  - [Area 3]

  When participating in discussions:
  1. [Guideline 1]
  2. [Guideline 2]
  3. [Guideline 3]

  Your responses should [STYLE GUIDANCE].
```

### Length Guidelines

- **Minimum**: 50 words (enforced by validator)
- **Recommended**: 200-400 words
- **Too short**: Expert won't have enough context
- **Too long**: Wastes tokens, may lose focus

### What to Include

✅ **Do include:**
- Role and domain expertise
- Areas of knowledge
- Perspective to bring to discussions
- How to approach problems
- Response style guidance

❌ **Don't include:**
- Specific project details (those come in the user prompt)
- Instructions about other experts
- Debate mechanics (handled by engine)

## Example: DevOps Expert

```yaml
id: devops
name: DevOps Expert
description: Expert in CI/CD, infrastructure automation, and operational excellence
version: 1.0.0
domain: engineering

keywords:
  - devops
  - ci/cd
  - deployment
  - kubernetes
  - docker
  - infrastructure

tags:
  - engineering
  - operations

author: Your Name

systemPrompt: |
  You are a DevOps Expert with extensive experience in infrastructure automation,
  CI/CD pipelines, and operational excellence. Your role is to ensure systems are
  deployable, reliable, and maintainable in production.

  Your expertise includes:
  - CI/CD pipeline design (GitHub Actions, GitLab CI, Jenkins)
  - Container orchestration (Kubernetes, Docker Swarm)
  - Infrastructure as Code (Terraform, CloudFormation)
  - Monitoring and observability (Prometheus, Grafana, ELK)
  - Cloud platforms (AWS, GCP, Azure)
  - Security and compliance in deployment
  - Incident response and disaster recovery

  When participating in discussions:
  1. Focus on operational concerns and deployment strategy
  2. Identify automation opportunities
  3. Consider monitoring, logging, and debugging needs
  4. Emphasize reliability and disaster recovery
  5. Balance automation with pragmatism
  6. Think about the full deployment lifecycle

  Your responses should be practical and focused on production readiness,
  operational excellence, and maintainability. Always consider "what happens
  when this goes to production?" and "how will we know if it's working?"
```

## Validation Rules

Your skill YAML will be validated when loaded:

### ID Format
- ❌ `DevOps-Expert` (uppercase, special chars)
- ✅ `devops-expert` (lowercase, hyphens)

### Version Format
- ❌ `1.0` (not semver)
- ✅ `1.0.0` (semantic versioning)

### System Prompt Length
- ❌ < 50 words: Too short, will fail validation
- ⚠️ 50-200 words: Valid but warning (too brief)
- ✅ 200-400 words: Recommended range
- ⚠️ 400+ words: Valid but may be unnecessarily long

## Testing Your Skill

### 1. Validate the YAML

Create your skill file in `.roundtable/skills/your-skill.yaml`, then test loading:

```bash
cd roundtable-cli
node -e "import('./src/skills/loader.js').then(m => m.loadSkillById('your-skill', {skillsDir: '../.roundtable/skills'}).then(s => console.log('✅ Loaded:', s.name)).catch(e => console.error('❌ Error:', e.message)))"
```

### 2. Create a Test Panel

Create `.roundtable/panels/test-panel.yaml`:

```yaml
id: test-panel
name: Test Panel
description: For testing your custom skill
version: 1.0.0
skillIds:
  - your-skill
  - architecture  # Add a second skill for conversation
keywords:
  - test
```

### 3. Run a Test Debate

```bash
npm run dev
# Enter prompt: "test my custom skill"
# Your panel should be detected
```

### 4. Review the Output

Check that your expert:
- ✅ Uses terminology from their domain
- ✅ Provides the perspective you intended
- ✅ Stays in character throughout rounds
- ✅ Engages meaningfully with other experts

## Common Mistakes

### 1. System Prompt Too Vague

❌ **Bad:**
```yaml
systemPrompt: You are a DevOps expert. Help with DevOps things.
```

✅ **Good:**
```yaml
systemPrompt: |
  You are a DevOps Expert specializing in CI/CD automation...
  [200+ words with specific expertise and guidelines]
```

### 2. ID Formatting Issues

❌ **Bad:** `DevOps_Expert`, `devops expert`, `DevOps-Expert`
✅ **Good:** `devops-expert`

### 3. Missing Required Fields

Every skill MUST have: `id`, `name`, `description`, `version`, `domain`, `systemPrompt`

### 4. Copying Prompts Verbatim

Don't copy system prompts from existing skills. Customize for your domain's specific needs.

## Advanced: Skill Diversity

For panels with multiple skills from the same domain, differentiate their perspectives:

- **Backend Expert**: Infrastructure, APIs, data flow
- **Frontend Expert**: UI, state management, performance
- **Full Stack Expert**: Integration, architecture, tradeoffs

Each should have distinct expertise areas in their system prompt.

## Next Steps

- See existing skills in `.roundtable/skills/` for examples
- Read [Creating Panels](./CREATING_PANELS.md) to compose skills into expert groups
- Check `.roundtable/skills/custom-example.yaml` for a well-commented template

---

**Questions or issues?** Check the Roundtable documentation or open an issue.
