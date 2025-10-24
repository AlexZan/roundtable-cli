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

  /**
   * Create a new session for interactive debate
   */
  createSession(userPrompt: string): Session {
    const sessionId = `session-${Date.now()}`;
    return {
      id: sessionId,
      createdAt: new Date(),
      prompt: userPrompt,
      rounds: [],
      metadata: {
        tokensUsed: 0,
        duration: 0,
        agentCount: this.config.agentConfigs.length,
        roundCount: 0,
        startTime: Date.now()
      }
    };
  }

  /**
   * Execute the next round in an interactive debate session
   * @param session - The current session
   * @param additionalPrompt - Optional user input to add context for this round
   */
  async executeNextRound(session: Session, additionalPrompt?: string): Promise<void> {
    const roundNumber = session.rounds.length + 1;
    const previousRound = session.rounds[session.rounds.length - 1];

    let round: Round;

    if (roundNumber === 1) {
      // Round 1: Initial responses
      console.log('   Agents analyzing prompt...');
      round = await this.executeRound(1, session.prompt, null);
    } else {
      // Round 2+: Within-skill debate with optional user input
      console.log(`\n⚙️  Running Round ${roundNumber}...\n`);

      // Build conversation history for this round
      // Include user feedback as a proper part of the conversation, not just context
      let roundPrompt = session.prompt;
      const baseContext = additionalPrompt
        ? `User said: "${additionalPrompt}"\n\n`
        : '';

      round = await this.executeRoundWithSkillContext(
        roundNumber,
        roundPrompt,
        previousRound,
        baseContext
      );
    }

    session.rounds.push(round);
    session.metadata.roundCount++;
    session.metadata.tokensUsed += round.responses.reduce((sum, r) => sum + r.tokensUsed, 0);
  }

  /**
   * Add new agents to an ongoing session
   * New agents will participate in subsequent rounds with full context
   *
   * @param session - The current session
   * @param newAgentConfigs - Array of new agent configurations to add
   */
  addAgents(session: Session, newAgentConfigs: typeof this.config.agentConfigs): void {
    // Add new agents to the engine's config
    this.config.agentConfigs.push(...newAgentConfigs);

    // Update session metadata
    session.metadata.agentCount = this.config.agentConfigs.length;

    // Store which agents were added and when (for tracking)
    if (!session.metadata.agentAdditions) {
      session.metadata.agentAdditions = [];
    }

    session.metadata.agentAdditions.push({
      roundNumber: session.rounds.length,
      agentIds: newAgentConfigs.map(a => a.id),
      agentNames: newAgentConfigs.map(a => a.name)
    });
  }

  /**
   * Finalize the session by updating duration
   */
  finalizeSession(session: Session): void {
    session.metadata.duration = Date.now() - (session.metadata as any).startTime;
    delete (session.metadata as any).startTime;
  }

  async runDebate(userPrompt: string): Promise<Session> {
    const session = this.createSession(userPrompt);

    // Round 1: Initial responses (parallel)
    await this.executeNextRound(session);

    // Round 2: Agents see same-skill responses (within-skill debate)
    await this.executeNextRound(session);

    this.finalizeSession(session);
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
          skillDomain: agentConfig.metadata.skillDomain,
          model: agentConfig.model
        } : { model: agentConfig.model }
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
   * @param baseContext - Optional context to prepend (e.g., user feedback)
   */
  private async executeRoundWithSkillContext(
    roundNumber: number,
    userPrompt: string,
    previousRound: Round,
    baseContext: string = ''
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

      // Build context from same-skill agents only (with optional base context)
      const context = this.buildContextForSkill(sameSkillResponses, agentConfig, baseContext);

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
          skillDomain: agentConfig.metadata.skillDomain,
          model: agentConfig.model
        } : { model: agentConfig.model }
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
   * @param baseContext - Optional context to prepend (e.g., user feedback)
   */
  private buildContextForSkill(
    sameSkillResponses: AgentResponse[],
    currentAgent: typeof this.config.agentConfigs[0],
    baseContext: string = ''
  ): string {
    // If there's user feedback/context, always include it first
    if (sameSkillResponses.length === 0) {
      if (baseContext) {
        return `${baseContext}You are the only expert in your domain. Based on the user's input above, provide your response.`;
      }
      return 'No other experts in your domain participated in the previous round.';
    }

    // Filter out the current agent's own response if present
    const otherResponses = sameSkillResponses.filter(r => r.agentId !== currentAgent.id);

    if (otherResponses.length === 0) {
      if (baseContext) {
        return `${baseContext}You are the only expert in your domain. Based on the user's input above, provide your response.`;
      }
      return 'You are the only expert in your domain. Provide your analysis independently.';
    }

    const contextParts = otherResponses.map((response) => {
      return `[${response.agentName}'s perspective]:\n${response.content}\n`;
    });

    const skillDomain = currentAgent.metadata?.skillDomain || 'your domain';
    const skillContext =
      `In the previous round, other ${skillDomain} experts provided these perspectives:\n\n` +
      contextParts.join('\n---\n\n') +
      `\n\nNow, considering these perspectives from your fellow ${skillDomain} experts, ` +
      `provide your updated analysis. You may:\n` +
      `- Agree with points made and explain why\n` +
      `- Respectfully disagree and present alternative views\n` +
      `- Build upon ideas and add nuance\n` +
      `- Identify areas of consensus or remaining disagreement\n\n` +
      `Focus on ${skillDomain} concerns and reach the best conclusion for this domain.`;

    return baseContext + skillContext;
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
