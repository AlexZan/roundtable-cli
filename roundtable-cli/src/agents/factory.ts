/**
 * Agent factory - creates agent configurations from skills
 * Phase 1C: Updated to support per-agent model selection
 */

import type { AgentConfig } from '../types.js';
import type { Skill } from '../skills/types.js';
import { loadSkillById } from '../skills/loader.js';
import { getModelRegistry } from '../llm/registry.js';

/**
 * Creates an agent configuration from a skill definition
 *
 * @param skill - The skill to create an agent from
 * @param model - The LLM model to use for this agent
 * @returns Agent configuration
 */
export function createAgentFromSkill(skill: Skill, model: string): AgentConfig {
  return {
    id: `agent-${skill.id}`,
    name: skill.name,
    model,
    systemPrompt: skill.systemPrompt,
    metadata: {
      skillId: skill.id,
      skillVersion: skill.version,
      skillDomain: skill.domain
    }
  };
}

/**
 * Options for creating agents from skills
 */
export interface CreateAgentsOptions {
  /** Directory containing skill definitions */
  skillsDir?: string;

  /** Model to use for all agents (if modelMap not provided) */
  defaultModel?: string;

  /** Map of skillId → model for per-agent model selection */
  modelMap?: Record<string, string>;
}

/**
 * Creates multiple agent configurations from skill IDs
 *
 * @param skillIds - Array of skill IDs to load
 * @param modelOrOptions - Model string for all agents, or options object
 * @param legacyOptions - Legacy options for backward compatibility
 * @returns Array of agent configurations
 */
export async function createAgentsFromSkills(
  skillIds: string[],
  modelOrOptions?: string | CreateAgentsOptions,
  legacyOptions?: { skillsDir?: string }
): Promise<AgentConfig[]> {
  const agents: AgentConfig[] = [];
  const registry = getModelRegistry();

  // Parse options for backward compatibility
  let skillsDir: string | undefined;
  let defaultModel: string;
  let modelMap: Record<string, string> | undefined;

  if (typeof modelOrOptions === 'string') {
    // Legacy API: createAgentsFromSkills(skillIds, model, options)
    defaultModel = modelOrOptions;
    skillsDir = legacyOptions?.skillsDir;
  } else {
    // New API: createAgentsFromSkills(skillIds, options)
    const options = modelOrOptions || {};
    defaultModel = options.defaultModel || registry.getDefaultModel();
    skillsDir = options.skillsDir;
    modelMap = options.modelMap;
  }

  for (const skillId of skillIds) {
    const skill = await loadSkillById(skillId, { skillsDir });

    // Determine model for this agent
    const model = modelMap?.[skillId] || defaultModel;

    // Verify model is available
    if (!registry.isModelAvailable(model)) {
      const modelInfo = registry.getModel(model);
      if (modelInfo) {
        const provider = modelInfo.provider;
        throw new Error(
          `\n❌ Model "${model}" is not available.\n` +
          `   → Provider "${provider}" is not configured.\n` +
          `   → Set ${provider.toUpperCase()}_API_KEY in .env\n`
        );
      } else {
        throw new Error(
          `\n❌ Unknown model "${model}".\n` +
          `   → Check .roundtable/models.json for available models\n`
        );
      }
    }

    const agent = createAgentFromSkill(skill, model);
    agents.push(agent);
  }

  return agents;
}
