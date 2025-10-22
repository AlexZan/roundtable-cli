/**
 * Unit tests for ClaudeClient error handling
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClaudeClient } from './claude.js';
import type { LLMRequest } from '../types.js';
import Anthropic from '@anthropic-ai/sdk';

// Mock the Anthropic SDK
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        messages: {
          create: vi.fn()
        }
      };
    })
  };
});

describe('ClaudeClient - Error Handling', () => {
  let client: ClaudeClient;
  let mockCreate: any;

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    client = new ClaudeClient();
    mockCreate = (client as any).client.messages.create;
  });

  describe('Friendly error messages', () => {
    it('should provide friendly message for low credits', async () => {
      const creditError: any = new Error('Your credit balance is too low to access the Anthropic API');
      creditError.status = 400;

      mockCreate.mockRejectedValueOnce(creditError);

      const request: LLMRequest = {
        prompt: 'Test',
        systemPrompt: 'Test',
        maxTokens: 100
      };

      await expect(client.sendRequest(request, 'claude-3-5-sonnet-20241022'))
        .rejects
        .toThrow(/💳 No API credits available/);

    });

    it('should provide friendly message for invalid API key', async () => {
      const authError: any = new Error('Invalid API key');
      authError.status = 401;

      mockCreate.mockRejectedValueOnce(authError);

      const request: LLMRequest = {
        prompt: 'Test',
        systemPrompt: 'Test',
        maxTokens: 100
      };

      await expect(client.sendRequest(request, 'claude-3-5-sonnet-20241022'))
        .rejects
        .toThrow(/🔑 Invalid API key/);
    });

    it('should provide friendly message for rate limits', async () => {
      const rateLimitError: any = new Error('Rate limit exceeded');
      rateLimitError.status = 429;

      mockCreate.mockRejectedValueOnce(rateLimitError);

      const request: LLMRequest = {
        prompt: 'Test',
        systemPrompt: 'Test',
        maxTokens: 100
      };

      await expect(client.sendRequest(request, 'claude-3-5-sonnet-20241022'))
        .rejects
        .toThrow(/⏱️  Rate limit exceeded/);
    });

    it('should provide friendly message for network errors', async () => {
      const networkError: any = new Error('getaddrinfo ENOTFOUND api.anthropic.com');
      networkError.code = 'ENOTFOUND';

      mockCreate.mockRejectedValueOnce(networkError);

      const request: LLMRequest = {
        prompt: 'Test',
        systemPrompt: 'Test',
        maxTokens: 100
      };

      await expect(client.sendRequest(request, 'claude-3-5-sonnet-20241022'))
        .rejects
        .toThrow(/🌐 Network error/);
    });

    it('should provide generic message for unknown errors', async () => {
      const unknownError = new Error('Something unexpected happened');

      mockCreate.mockRejectedValueOnce(unknownError);

      const request: LLMRequest = {
        prompt: 'Test',
        systemPrompt: 'Test',
        maxTokens: 100
      };

      await expect(client.sendRequest(request, 'claude-3-5-sonnet-20241022'))
        .rejects
        .toThrow(/❌ API request failed/);
    });
  });

  describe('Constructor', () => {
    it('should require API key', () => {
      delete process.env.ANTHROPIC_API_KEY;

      expect(() => new ClaudeClient()).toThrow(
        'ANTHROPIC_API_KEY environment variable is required'
      );

      // Restore for other tests
      process.env.ANTHROPIC_API_KEY = 'test-key';
    });
  });
});
