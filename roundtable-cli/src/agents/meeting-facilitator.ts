/**
 * Meeting Facilitator - Dynamically composes expert panels based on user intent
 *
 * Replaces static panel keyword matching with AI-based panel composition.
 * Analyzes user's request and selects 3-5 relevant skills from available skills.
 */

import Anthropic from '@anthropic-ai/sdk';
import { loadAllSkills } from '../skills/loader.js';
import type { Skill } from '../skills/types.js';

export interface PanelComposition {
  /** Selected skill IDs for the panel */
  skillIds: string[];

  /** Reasoning for why these skills were selected */
  reasoning: string;

  /** Skills that would be helpful but aren't available */
  missingSkills?: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
}

export interface MeetingFacilitatorOptions {
  /** Directory containing skill definitions */
  skillsDir?: string;

  /** API key for the facilitator LLM */
  apiKey?: string;

  /** Model to use for facilitation (defaults to claude-haiku-4-5-20251001) */
  model?: string;
}

/**
 * Meeting Facilitator Agent
 *
 * Analyzes user intent and dynamically composes expert panels from available skills.
 */
export class MeetingFacilitator {
  private client: Anthropic;
  private model: string;

  constructor(options: MeetingFacilitatorOptions = {}) {
    const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY not found. Set it in your environment or .env file.'
      );
    }

    this.client = new Anthropic({ apiKey });
    this.model = options.model || 'claude-haiku-4-5-20251001';
  }

  /**
   * Compose a panel for the given user request
   *
   * @param userPrompt - What the user wants to discuss
   * @param options - Facilitator options
   * @returns Panel composition with selected skills
   */
  async composePanel(
    userPrompt: string,
    options: MeetingFacilitatorOptions = {}
  ): Promise<PanelComposition> {
    // Load all available skills
    const skillsDir = options.skillsDir || '.roundtable/skills';
    const availableSkills = await loadAllSkills({ skillsDir });

    // Build skill descriptions for the facilitator
    const skillDescriptions = Array.from(availableSkills.values()).map(skill => ({
      id: skill.id,
      name: skill.name,
      domain: skill.domain,
      description: skill.description
    }));

    // Create facilitator prompt
    const systemPrompt = this.buildFacilitatorPrompt(skillDescriptions);

    // Call LLM to compose panel
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `User request: "${userPrompt}"\n\nCompose an expert panel for this discussion.`
        }
      ]
    });

    // Parse response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from facilitator');
    }

    return this.parseComposition(content.text, availableSkills);
  }

  /**
   * Build the system prompt for the facilitator
   */
  private buildFacilitatorPrompt(skills: Array<{ id: string; name: string; domain: string; description: string }>): string {
    const skillList = skills.map(skill =>
      `- ${skill.id}: ${skill.name} (${skill.domain}) - ${skill.description}`
    ).join('\n');

    return `You are a Meeting Facilitator for Roundtable, a multi-agent deliberation system.

Your job: Analyze what the user wants to discuss and compose an expert panel from available skills.

## Available Skills

${skillList}

## Your Task

1. **Analyze the user's request** - What topic/problem are they discussing?
2. **Identify needed expertise** - What 3-5 types of experts would be most valuable?
3. **Select skills** - Choose 3-5 skill IDs from the available skills that best match
4. **Explain your reasoning** - Why these specific experts?
5. **Identify gaps** - Are there any missing skills that would be helpful?

## Output Format

Respond with JSON in this exact format:

\`\`\`json
{
  "skillIds": ["skill-1", "skill-2", "skill-3"],
  "reasoning": "Brief explanation of why these experts were chosen",
  "missingSkills": [
    {
      "id": "suggested-skill-id",
      "name": "Suggested Skill Name",
      "reason": "Why this would be helpful"
    }
  ]
}
\`\`\`

## Guidelines

- **Select 3-5 skills** (not more, not less)
- **Prioritize diversity** - Different perspectives enrich debate
- **Match to intent** - If discussing history, don't select software experts
- **Be specific** - Explain why each expert adds value
- **Identify gaps** - If key expertise is missing, suggest what's needed
- **Only use available skills** - Don't hallucinate skill IDs

## Examples

**User:** "I want to discuss the fall of the Roman Empire"
**Response:**
\`\`\`json
{
  "skillIds": [],
  "reasoning": "No relevant skills available. This requires history and political science expertise.",
  "missingSkills": [
    {
      "id": "history",
      "name": "Historian",
      "reason": "Expert in historical analysis and understanding of civilizations"
    },
    {
      "id": "political-science",
      "name": "Political Scientist",
      "reason": "Expert in analyzing governmental structures and political dynamics"
    },
    {
      "id": "military-strategy",
      "name": "Military Strategist",
      "reason": "Expert in understanding military campaigns and their impact on empires"
    }
  ]
}
\`\`\`

**User:** "Build a web application with authentication"
**Response:**
\`\`\`json
{
  "skillIds": ["architecture", "security", "ux", "product"],
  "reasoning": "Architecture for system design, Security for authentication implementation, UX for user experience, Product for feature prioritization and user needs.",
  "missingSkills": []
}
\`\`\`

Now respond with ONLY the JSON, no additional text.`;
  }

  /**
   * Parse the facilitator's response into a PanelComposition
   */
  private parseComposition(responseText: string, availableSkills: Map<string, Skill>): PanelComposition {
    try {
      // Extract JSON from response (may be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                       responseText.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, responseText];

      const jsonText = jsonMatch[1] || responseText;
      const parsed = JSON.parse(jsonText.trim());

      // Validate structure
      if (!parsed.skillIds || !Array.isArray(parsed.skillIds)) {
        throw new Error('Response missing skillIds array');
      }

      if (!parsed.reasoning || typeof parsed.reasoning !== 'string') {
        throw new Error('Response missing reasoning string');
      }

      // Validate that all skill IDs exist
      const invalidSkills = parsed.skillIds.filter((id: string) => !availableSkills.has(id));
      if (invalidSkills.length > 0) {
        throw new Error(`Facilitator selected non-existent skills: ${invalidSkills.join(', ')}`);
      }

      return {
        skillIds: parsed.skillIds,
        reasoning: parsed.reasoning,
        missingSkills: parsed.missingSkills || []
      };
    } catch (error: any) {
      throw new Error(`Failed to parse facilitator response: ${error.message}\n\nResponse was: ${responseText}`);
    }
  }
}
