/**
 * Basic debate engine - Phase 1 prototype
 * Phase 1C: Updated to support multiple LLM providers
 * Phase 1C Extended: Updated to support within-skill multi-model debate
 *
 * Implements 2-round debate with skill-based context:
 * - Round 1: All agents respond to user prompt simultaneously
 * - Round 2: Agents see responses from same-skill agents only (within-skill debate)
 */

import { getModelRegistry } from '../llm/registry.js';
import type {
  DebateConfig,
  Session,
  Round,
  AgentResponse,
  LLMRequest
} from '../types.js';

export class DebateEngine {
  private config: DebateConfig;

  constructor(config: DebateConfig) {
    this.config = config;
  }

  async runDebate(userPrompt: string): Promise<Session> {
    const startTime = Date.now();
    const sessionId = `session-${Date.now()}`;

    const session: Session = {
      id: sessionId,
      createdAt: new Date(),
      prompt: userPrompt,
      rounds: [],
      metadata: {
        tokensUsed: 0,
        duration: 0,
        agentCount: this.config.agentConfigs.length,
        roundCount: 0
      }
    };

    // Round 1: Initial responses (parallel)
    console.log('   Agents analyzing prompt...');
    const round1 = await this.executeRound(1, userPrompt, null);
    session.rounds.push(round1);
    session.metadata.roundCount++;
    session.metadata.tokensUsed += round1.responses.reduce((sum, r) => sum + r.tokensUsed, 0);

    // Round 2: Agents see same-skill responses (within-skill debate)
    console.log('\n⚙️  Running Round 2 (within-skill debate)...\n');
    const round2 = await this.executeRoundWithSkillContext(2, userPrompt, round1);
    session.rounds.push(round2);
    session.metadata.roundCount++;
    session.metadata.tokensUsed += round2.responses.reduce((sum, r) => sum + r.tokensUsed, 0);

    // Update duration
    session.metadata.duration = Date.now() - startTime;

    return session;
  }

  private async executeRound(
    roundNumber: number,
    userPrompt: string,
    context: string | null
  ): Promise<Round> {
    const round: Round = {
      number: roundNumber,
      responses: [],
      timestamp: new Date()
    };

    // Execute all agents in parallel
    const registry = getModelRegistry();
    const responsePromises = this.config.agentConfigs.map(async (agentConfig) => {
      const request: LLMRequest = {
        prompt: userPrompt,
        systemPrompt: agentConfig.systemPrompt,
        context: context || undefined,
        maxTokens: 1024
      };

      // Get the appropriate provider for this agent's model
      const provider = registry.getProviderForModel(agentConfig.model);
      if (!provider) {
        throw new Error(`No provider found for model: ${agentConfig.model}`);
      }

      const llmResponse = await provider.sendRequest(request, agentConfig.model);

      const agentResponse: AgentResponse = {
        agentId: agentConfig.id,
        agentName: agentConfig.name,
        content: llmResponse.content,
        tokensUsed: llmResponse.tokensUsed,
        context: {
          sawOtherResponses: context !== null,
          otherResponseIds: context ? round.responses.map(r => r.agentId) : undefined
        },
        metadata: agentConfig.metadata ? {
          skillId: agentConfig.metadata.skillId,
          skillDomain: agentConfig.metadata.skillDomain
        } : undefined
      };

      return agentResponse;
    });

    // Wait for all agents to respond
    const responses = await Promise.all(responsePromises);
    round.responses = responses;

    return round;
  }

  /**
   * Execute a round with skill-based context (Phase 1C Extended)
   * Each agent only sees responses from agents with the same skill
   */
  private async executeRoundWithSkillContext(
    roundNumber: number,
    userPrompt: string,
    previousRound: Round
  ): Promise<Round> {
    const round: Round = {
      number: roundNumber,
      responses: [],
      timestamp: new Date()
    };

    // Group previous responses by skill
    const responsesBySkill = new Map<string, AgentResponse[]>();
    for (const response of previousRound.responses) {
      const skillId = response.metadata?.skillId || 'unknown';
      if (!responsesBySkill.has(skillId)) {
        responsesBySkill.set(skillId, []);
      }
      responsesBySkill.get(skillId)!.push(response);
    }

    // Execute all agents in parallel with skill-specific context
    const registry = getModelRegistry();
    const responsePromises = this.config.agentConfigs.map(async (agentConfig) => {
      const skillId = agentConfig.metadata?.skillId || 'unknown';
      const sameSkillResponses = responsesBySkill.get(skillId) || [];

      // Build context from same-skill agents only
      const context = this.buildContextForSkill(sameSkillResponses, agentConfig);

      const request: LLMRequest = {
        prompt: userPrompt,
        systemPrompt: agentConfig.systemPrompt,
        context,
        maxTokens: 1024
      };

      // Get the appropriate provider for this agent's model
      const provider = registry.getProviderForModel(agentConfig.model);
      if (!provider) {
        throw new Error(`No provider found for model: ${agentConfig.model}`);
      }

      const llmResponse = await provider.sendRequest(request, agentConfig.model);

      const agentResponse: AgentResponse = {
        agentId: agentConfig.id,
        agentName: agentConfig.name,
        content: llmResponse.content,
        tokensUsed: llmResponse.tokensUsed,
        context: {
          sawOtherResponses: sameSkillResponses.length > 0,
          otherResponseIds: sameSkillResponses.map(r => r.agentId)
        },
        metadata: agentConfig.metadata ? {
          skillId: agentConfig.metadata.skillId,
          skillDomain: agentConfig.metadata.skillDomain
        } : undefined
      };

      return agentResponse;
    });

    // Wait for all agents to respond
    const responses = await Promise.all(responsePromises);
    round.responses = responses;

    return round;
  }

  /**
   * Build context for an agent from same-skill responses
   * Phase 1C Extended: Filters responses by skill for within-skill debate
   */
  private buildContextForSkill(
    sameSkillResponses: AgentResponse[],
    currentAgent: typeof this.config.agentConfigs[0]
  ): string {
    if (sameSkillResponses.length === 0) {
      return 'No other experts in your domain participated in the previous round.';
    }

    // Filter out the current agent's own response if present
    const otherResponses = sameSkillResponses.filter(r => r.agentId !== currentAgent.id);

    if (otherResponses.length === 0) {
      return 'You are the only expert in your domain. Provide your analysis independently.';
    }

    const contextParts = otherResponses.map((response) => {
      return `[${response.agentName}'s perspective]:\n${response.content}\n`;
    });

    const skillDomain = currentAgent.metadata?.skillDomain || 'your domain';
    const context =
      `In the previous round, other ${skillDomain} experts provided these perspectives:\n\n` +
      contextParts.join('\n---\n\n') +
      `\n\nNow, considering these perspectives from your fellow ${skillDomain} experts, ` +
      `provide your updated analysis. You may:\n` +
      `- Agree with points made and explain why\n` +
      `- Respectfully disagree and present alternative views\n` +
      `- Build upon ideas and add nuance\n` +
      `- Identify areas of consensus or remaining disagreement\n\n` +
      `Focus on ${skillDomain} concerns and reach the best conclusion for this domain.`;

    return context;
  }

  private buildContextFromRound(round: Round): string {
    const contextParts = round.responses.map((response) => {
      return `[${response.agentName}'s perspective]:\n${response.content}\n`;
    });

    const context =
      `In the previous round, other experts provided these perspectives:\n\n` +
      contextParts.join('\n---\n\n') +
      `\nNow, considering these other perspectives, provide your updated analysis. ` +
      `You may agree, disagree, or build upon the other experts' points.`;

    return context;
  }
}
