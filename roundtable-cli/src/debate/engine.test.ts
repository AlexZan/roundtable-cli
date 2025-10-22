/**
 * Unit tests for DebateEngine
 * Uses mocked ClaudeClient to test debate logic without API calls
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DebateEngine } from './engine.js';
import { ClaudeClient } from '../llm/claude.js';
import type { DebateConfig, LLMResponse } from '../types.js';

// Mock the ClaudeClient module
vi.mock('../llm/claude.js', () => {
  return {
    ClaudeClient: vi.fn().mockImplementation(() => {
      return {
        sendRequest: vi.fn()
      };
    })
  };
});

describe('DebateEngine', () => {
  let debateEngine: DebateEngine;
  let mockClaudeClient: any;

  const mockConfig: DebateConfig = {
    maxRounds: 2,
    agentConfigs: [
      {
        id: 'agent-arch',
        name: 'Architecture Expert',
        model: 'claude-3-5-sonnet-20241022',
        systemPrompt: 'You are an architecture expert'
      },
      {
        id: 'agent-product',
        name: 'Product Expert',
        model: 'claude-3-5-sonnet-20241022',
        systemPrompt: 'You are a product expert'
      }
    ]
  };

  beforeEach(() => {
    // Create mock responses for ClaudeClient
    mockClaudeClient = {
      sendRequest: vi.fn()
    };

    // Setup mock implementation for sendRequest
    mockClaudeClient.sendRequest.mockImplementation(async (request: any, model: string) => {
      const isArchAgent = request.systemPrompt.includes('architecture');
      const isRound2 = request.context !== undefined;

      const response: LLMResponse = {
        content: isArchAgent
          ? (isRound2
              ? 'Architecture Round 2: Considering product perspective, we should balance scalability with user needs.'
              : 'Architecture Round 1: Focus on scalability and technical design.')
          : (isRound2
              ? 'Product Round 2: Considering architecture perspective, we should prioritize core features first.'
              : 'Product Round 1: Focus on user needs and feature prioritization.'),
        tokensUsed: isRound2 ? 150 : 120
      };

      return response;
    });

    // Replace the ClaudeClient constructor to return our mock
    (ClaudeClient as any).mockImplementation(() => mockClaudeClient);

    debateEngine = new DebateEngine(mockConfig);
  });

  describe('runDebate', () => {
    it('should execute 2 rounds of debate', async () => {
      const userPrompt = 'Build a todo app with offline sync';

      const session = await debateEngine.runDebate(userPrompt);

      expect(session.rounds).toHaveLength(2);
      expect(session.metadata.roundCount).toBe(2);
    });

    it('should create valid session structure', async () => {
      const userPrompt = 'Build a blog with comments';

      const session = await debateEngine.runDebate(userPrompt);

      expect(session.id).toMatch(/^session-\d+$/);
      expect(session.prompt).toBe(userPrompt);
      expect(session.createdAt).toBeInstanceOf(Date);
      expect(session.rounds).toBeDefined();
      expect(session.metadata).toBeDefined();
    });

    it('should track total tokens used', async () => {
      const userPrompt = 'Build a dating app';

      const session = await debateEngine.runDebate(userPrompt);

      // 2 agents × 2 rounds: Round 1 (120 + 120) + Round 2 (150 + 150) = 540
      expect(session.metadata.tokensUsed).toBe(540);
    });

    it('should track duration', async () => {
      const userPrompt = 'Build a game platform';

      const session = await debateEngine.runDebate(userPrompt);

      expect(session.metadata.duration).toBeGreaterThanOrEqual(0);
      expect(typeof session.metadata.duration).toBe('number');
    });

    it('should track agent count', async () => {
      const userPrompt = 'Build a healthcare app';

      const session = await debateEngine.runDebate(userPrompt);

      expect(session.metadata.agentCount).toBe(2);
    });
  });

  describe('Round 1: Initial responses', () => {
    it('should execute agents in parallel', async () => {
      const userPrompt = 'Build a todo app';

      const session = await debateEngine.runDebate(userPrompt);
      const round1 = session.rounds[0];

      expect(round1.number).toBe(1);
      expect(round1.responses).toHaveLength(2);
    });

    it('should include both agent responses', async () => {
      const userPrompt = 'Build a blog';

      const session = await debateEngine.runDebate(userPrompt);
      const round1 = session.rounds[0];

      const agentIds = round1.responses.map(r => r.agentId);
      expect(agentIds).toContain('agent-arch');
      expect(agentIds).toContain('agent-product');
    });

    it('should indicate no context in Round 1', async () => {
      const userPrompt = 'Build a chat app';

      const session = await debateEngine.runDebate(userPrompt);
      const round1 = session.rounds[0];

      round1.responses.forEach(response => {
        expect(response.context.sawOtherResponses).toBe(false);
        expect(response.context.otherResponseIds).toBeUndefined();
      });
    });

    it('should call LLM without context for Round 1', async () => {
      const userPrompt = 'Build a dating app';

      await debateEngine.runDebate(userPrompt);

      // First two calls (Round 1) should have no context
      const firstCall = mockClaudeClient.sendRequest.mock.calls[0][0];
      const secondCall = mockClaudeClient.sendRequest.mock.calls[1][0];

      expect(firstCall.context).toBeUndefined();
      expect(secondCall.context).toBeUndefined();
    });
  });

  describe('Round 2: Context-aware responses', () => {
    it('should provide Round 1 context to agents', async () => {
      const userPrompt = 'Build a game platform';

      await debateEngine.runDebate(userPrompt);

      // Third and fourth calls (Round 2) should have context
      const thirdCall = mockClaudeClient.sendRequest.mock.calls[2][0];
      const fourthCall = mockClaudeClient.sendRequest.mock.calls[3][0];

      expect(thirdCall.context).toBeDefined();
      expect(thirdCall.context).toContain('Architecture Round 1');
      expect(thirdCall.context).toContain('Product Round 1');

      expect(fourthCall.context).toBeDefined();
    });

    it('should indicate agents saw other responses', async () => {
      const userPrompt = 'Build a healthcare app';

      const session = await debateEngine.runDebate(userPrompt);
      const round2 = session.rounds[1];

      round2.responses.forEach(response => {
        expect(response.context.sawOtherResponses).toBe(true);
      });
    });

    it('should contain different content than Round 1', async () => {
      const userPrompt = 'Build a todo app';

      const session = await debateEngine.runDebate(userPrompt);
      const round1 = session.rounds[0];
      const round2 = session.rounds[1];

      const archRound1 = round1.responses.find(r => r.agentId === 'agent-arch')?.content;
      const archRound2 = round2.responses.find(r => r.agentId === 'agent-arch')?.content;

      expect(archRound2).not.toBe(archRound1);
      expect(archRound2).toContain('Round 2');
    });
  });

  describe('Parallel execution', () => {
    it('should call both agents in each round', async () => {
      const userPrompt = 'Build a blog';

      await debateEngine.runDebate(userPrompt);

      // Should have 4 total calls: 2 agents × 2 rounds
      expect(mockClaudeClient.sendRequest).toHaveBeenCalledTimes(4);
    });

    it('should pass correct system prompts to each agent', async () => {
      const userPrompt = 'Build a chat app';

      await debateEngine.runDebate(userPrompt);

      const allCalls = mockClaudeClient.sendRequest.mock.calls;

      // Check that architecture agent got correct system prompt
      const archCalls = allCalls.filter((call: any) =>
        call[0].systemPrompt.includes('architecture')
      );
      expect(archCalls).toHaveLength(2); // Once per round

      // Check that product agent got correct system prompt
      const productCalls = allCalls.filter((call: any) =>
        call[0].systemPrompt.includes('product')
      );
      expect(productCalls).toHaveLength(2); // Once per round
    });
  });

  describe('Context building', () => {
    it('should format context with agent perspectives', async () => {
      const userPrompt = 'Build a dating app';

      await debateEngine.runDebate(userPrompt);

      const round2Call = mockClaudeClient.sendRequest.mock.calls[2][0];
      const context = round2Call.context;

      expect(context).toContain('[Architecture Expert\'s perspective]');
      expect(context).toContain('[Product Expert\'s perspective]');
      expect(context).toContain('In the previous round');
    });

    it('should include instruction to consider other perspectives', async () => {
      const userPrompt = 'Build a game platform';

      await debateEngine.runDebate(userPrompt);

      const round2Call = mockClaudeClient.sendRequest.mock.calls[2][0];
      const context = round2Call.context;

      expect(context).toContain('considering these other perspectives');
      expect(context).toContain('You may agree, disagree, or build upon');
    });
  });

  describe('Token tracking', () => {
    it('should track tokens per agent response', async () => {
      const userPrompt = 'Build a blog';

      const session = await debateEngine.runDebate(userPrompt);

      session.rounds.forEach(round => {
        round.responses.forEach(response => {
          expect(response.tokensUsed).toBeGreaterThan(0);
          expect(typeof response.tokensUsed).toBe('number');
        });
      });
    });

    it('should accumulate tokens across rounds', async () => {
      const userPrompt = 'Build a todo app';

      const session = await debateEngine.runDebate(userPrompt);

      const round1Tokens = session.rounds[0].responses.reduce((sum, r) => sum + r.tokensUsed, 0);
      const round2Tokens = session.rounds[1].responses.reduce((sum, r) => sum + r.tokensUsed, 0);
      const totalTokens = session.metadata.tokensUsed;

      expect(totalTokens).toBe(round1Tokens + round2Tokens);
    });
  });

  describe('Error handling', () => {
    it('should propagate API errors', async () => {
      mockClaudeClient.sendRequest.mockRejectedValueOnce(
        new Error('API error: Rate limit exceeded')
      );

      const userPrompt = 'Build a chat app';

      await expect(debateEngine.runDebate(userPrompt)).rejects.toThrow();
    });
  });
});
