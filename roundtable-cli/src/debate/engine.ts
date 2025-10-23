/**
 * Basic debate engine - Phase 1 prototype
 * Phase 1C: Updated to support multiple LLM providers
 *
 * Implements simple 2-round debate:
 * - Round 1: All agents respond to user prompt simultaneously
 * - Round 2: All agents see Round 1 responses and can update positions
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

    // Round 2: Agents see each other's responses
    console.log('\n⚙️  Running Round 2 (agents see each other\'s responses)...\n');
    const round1Context = this.buildContextFromRound(round1);
    const round2 = await this.executeRound(2, userPrompt, round1Context);
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
