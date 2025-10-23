/**
 * Agent factory - creates agent configurations from skills
 */

import type { AgentConfig } from '../types.js';
import type { Skill } from '../skills/types.js';
import { loadSkillById } from '../skills/loader.js';

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
 * Creates multiple agent configurations from skill IDs
 *
 * @param skillIds - Array of skill IDs to load
 * @param model - The LLM model to use for all agents
 * @param options - Loader options for skills
 * @returns Array of agent configurations
 */
export async function createAgentsFromSkills(
  skillIds: string[],
  model: string,
  options?: { skillsDir?: string }
): Promise<AgentConfig[]> {
  const agents: AgentConfig[] = [];

  for (const skillId of skillIds) {
    const skill = await loadSkillById(skillId, options);
    const agent = createAgentFromSkill(skill, model);
    agents.push(agent);
  }

  return agents;
}
