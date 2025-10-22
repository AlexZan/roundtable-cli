/**
 * Claude API integration layer
 */

import Anthropic from '@anthropic-ai/sdk';
import { getApiKey } from '../config.js';
import type { LLMRequest, LLMResponse } from '../types.js';

export class ClaudeClient {
  private client: Anthropic;

  constructor() {
    const apiKey = getApiKey();

    this.client = new Anthropic({
      apiKey
    });
  }

  async sendRequest(request: LLMRequest, model: string): Promise<LLMResponse> {
    try {
      // Construct full prompt with context if provided
      let fullPrompt = request.prompt;
      if (request.context) {
        fullPrompt = `${request.context}\n\n---\n\n${request.prompt}`;
      }

      const response = await this.client.messages.create({
        model,
        max_tokens: request.maxTokens || 1024,
        system: request.systemPrompt,
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
      });

      // Extract text content
      const content = response.content
        .filter((block) => block.type === 'text')
        .map((block) => (block as any).text)
        .join('\n');

      // Calculate tokens used (input + output)
      const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;

      return {
        content,
        tokensUsed
      };
    } catch (error: any) {
      // Provide friendly error messages for common issues
      if (error?.status === 400 && error?.message?.includes('credit balance')) {
        throw new Error(
          '\n💳 No API credits available.\n' +
          '   → Add credits at: https://console.anthropic.com/settings/billing\n' +
          '   → Estimated cost: $0.02-0.05 per test session\n'
        );
      }

      if (error?.status === 401) {
        throw new Error(
          '\n🔑 Invalid API key.\n' +
          '   → Check your ANTHROPIC_API_KEY is correct\n' +
          '   → Get a key at: https://console.anthropic.com/\n'
        );
      }

      if (error?.status === 429) {
        throw new Error(
          '\n⏱️  Rate limit exceeded.\n' +
          '   → Wait a moment and try again\n' +
          '   → Or upgrade your plan for higher limits\n'
        );
      }

      if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED') {
        throw new Error(
          '\n🌐 Network error.\n' +
          '   → Check your internet connection\n' +
          '   → Check if anthropic.com is accessible\n'
        );
      }

      // Generic error for unexpected issues
      const errorMessage = error?.message || String(error);
      throw new Error(
        `\n❌ API request failed: ${errorMessage}\n` +
        '   → If this persists, check https://status.anthropic.com/\n'
      );
    }
  }
}
