/**
 * Agent factory - creates agent configurations from skills
 * Phase 1C: Updated to support per-agent model selection
 * Phase 1C Extended: Updated to support multi-model panel diversity
 */

import type { AgentConfig } from '../types.js';
import type { Skill } from '../skills/types.js';
import type { Panel } from '../panels/types.js';
import { loadSkillById } from '../skills/loader.js';
import { getModelRegistry } from '../llm/registry.js';

/**
 * Creates an agent configuration from a skill definition
 *
 * @param skill - The skill to create an agent from
 * @param model - The LLM model to use for this agent
 * @param index - Optional index for multi-model agents (for unique IDs)
 * @returns Agent configuration
 */
export function createAgentFromSkill(skill: Skill, model: string, index?: number): AgentConfig {
  const agentId = index !== undefined ? `agent-${skill.id}-${index}` : `agent-${skill.id}`;

  return {
    id: agentId,
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

/**
 * Creates multiple agent configurations from a panel
 * Phase 1C Extended: Supports multi-model panel diversity
 *
 * If panel.modelDiversity is enabled:
 * - Creates multiple agents per skill based on skillModelMap
 * - Each skill gets 2-3 agents with different models for richer debate
 * - Agent IDs are unique: agent-architecture-0, agent-architecture-1, etc.
 *
 * If panel.modelDiversity is not enabled:
 * - Falls back to single agent per skill behavior
 *
 * @param panel - The panel to create agents from
 * @param options - Options for skill loading and model selection
 * @returns Array of agent configurations
 */
export async function createAgentsFromPanel(
  panel: Panel,
  options?: Omit<CreateAgentsOptions, 'modelMap'>
): Promise<AgentConfig[]> {
  const agents: AgentConfig[] = [];
  const registry = getModelRegistry();
  const defaultModel = options?.defaultModel || registry.getDefaultModel();
  const skillsDir = options?.skillsDir;

  // Check if model diversity is enabled
  if (panel.modelDiversity?.enabled && panel.modelDiversity.skillModelMap) {
    // Multi-model panel: Create multiple agents per skill
    for (const skillId of panel.skillIds) {
      const skill = await loadSkillById(skillId, { skillsDir });
      const models = panel.modelDiversity.skillModelMap[skillId];

      if (!models || models.length === 0) {
        // No models specified for this skill, use default
        const model = defaultModel;
        if (!registry.isModelAvailable(model)) {
          throw new Error(
            `\n❌ Default model "${model}" is not available for skill "${skillId}".\n` +
            `   → Check model availability in registry\n`
          );
        }

        const agent = createAgentFromSkill(skill, model);
        agents.push(agent);
        continue;
      }

      // Create multiple agents for this skill (one per model)
      for (let i = 0; i < models.length; i++) {
        const model = models[i];

        // Verify model is available
        if (!registry.isModelAvailable(model)) {
          const modelInfo = registry.getModel(model);
          if (modelInfo) {
            const provider = modelInfo.provider;
            throw new Error(
              `\n❌ Cannot create agent #${i} for skill "${skillId}" (${skill.name}).\n` +
              `   → Assigned model "${model}" is not available.\n` +
              `   → Model assigned via panel's modelDiversity.skillModelMap\n` +
              `   → Provider "${provider}" is not configured.\n` +
              `   → Set ${provider.toUpperCase()}_API_KEY in .env\n` +
              `   → Or update the panel's model assignments\n`
            );
          } else {
            throw new Error(
              `\n❌ Cannot create agent #${i} for skill "${skillId}" (${skill.name}).\n` +
              `   → Unknown model "${model}".\n` +
              `   → Check .roundtable/models.json for available models\n`
            );
          }
        }

        const agent = createAgentFromSkill(skill, model, i);
        agents.push(agent);
      }
    }
  } else {
    // Single-model panel: Fall back to one agent per skill
    for (const skillId of panel.skillIds) {
      const skill = await loadSkillById(skillId, { skillsDir });
      const model = defaultModel;

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
  }

  return agents;
}
