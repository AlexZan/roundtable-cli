/**
 * xAI Grok API integration layer
 * Phase 1C: Multi-LLM Support
 *
 * Note: Grok API is compatible with OpenAI API format
 */

import OpenAI from 'openai';
import type { LLMRequest, LLMResponse } from '../types.js';
import type { LLMProvider } from './types.js';

export class GrokClient implements LLMProvider {
  public readonly providerName = 'xai';
  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.XAI_API_KEY || null;

    if (this.apiKey) {
      // Grok uses OpenAI-compatible API
      this.client = new OpenAI({
        apiKey: this.apiKey,
        baseURL: 'https://api.x.ai/v1'
      });
    }
  }

  isConfigured(): boolean {
    return this.client !== null && this.apiKey !== null;
  }

  getAvailableModels(): string[] {
    return [
      'grok-beta',
      'grok-vision-beta'
    ];
  }

  async sendRequest(request: LLMRequest, model: string): Promise<LLMResponse> {
    if (!this.isConfigured() || !this.client) {
      throw new Error(
        '\n🔑 xAI API key not configured.\n' +
        '   → Set XAI_API_KEY in .env\n' +
        '   → Get a key at: https://console.x.ai/\n'
      );
    }

    try {
      // Construct messages array (same as OpenAI format)
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      // Add system message
      if (request.systemPrompt) {
        messages.push({
          role: 'system',
          content: request.systemPrompt
        });
      }

      // Add context if provided
      if (request.context) {
        messages.push({
          role: 'user',
          content: request.context
        });
      }

      // Add main prompt
      messages.push({
        role: 'user',
        content: request.prompt
      });

      const response = await this.client.chat.completions.create({
        model,
        messages,
        max_tokens: request.maxTokens || 1024,
        temperature: 0.7
      });

      // Extract content
      const content = response.choices[0]?.message?.content || '';

      // Calculate tokens used
      const tokensUsed = response.usage?.total_tokens || 0;

      return {
        content,
        tokensUsed
      };
    } catch (error: any) {
      // Provide friendly error messages for common issues
      if (error?.status === 401) {
        throw new Error(
          '\n🔑 Invalid xAI API key.\n' +
          '   → Check your XAI_API_KEY is correct\n' +
          '   → Get a key at: https://console.x.ai/\n'
        );
      }

      if (error?.status === 429) {
        throw new Error(
          '\n⏱️  xAI rate limit exceeded.\n' +
          '   → Wait a moment and try again\n' +
          '   → Or check your usage limits\n'
        );
      }

      if (error?.status === 402 || error?.message?.includes('quota')) {
        throw new Error(
          '\n💳 xAI quota exceeded.\n' +
          '   → Check your account at: https://console.x.ai/\n'
        );
      }

      if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED') {
        throw new Error(
          '\n🌐 Network error connecting to xAI.\n' +
          '   → Check your internet connection\n' +
          '   → Check if api.x.ai is accessible\n'
        );
      }

      // Generic error for unexpected issues
      const errorMessage = error?.message || String(error);
      throw new Error(
        `\n❌ xAI Grok API request failed: ${errorMessage}\n` +
        '   → If this persists, check https://status.x.ai/\n'
      );
    }
  }
}
