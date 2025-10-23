/**
 * OpenAI API integration layer
 * Phase 1C: Multi-LLM Support
 */

import OpenAI from 'openai';
import type { LLMRequest, LLMResponse } from '../types.js';
import type { LLMProvider } from './types.js';

export class OpenAIClient implements LLMProvider {
  public readonly providerName = 'openai';
  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || null;

    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey
      });
    }
  }

  isConfigured(): boolean {
    return this.client !== null && this.apiKey !== null;
  }

  getAvailableModels(): string[] {
    return [
      'gpt-4-turbo',
      'gpt-4-turbo-preview',
      'gpt-4',
      'gpt-4-0613',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k'
    ];
  }

  async sendRequest(request: LLMRequest, model: string): Promise<LLMResponse> {
    if (!this.isConfigured() || !this.client) {
      throw new Error(
        '\n🔑 OpenAI API key not configured.\n' +
        '   → Set OPENAI_API_KEY in .env\n' +
        '   → Get a key at: https://platform.openai.com/api-keys\n'
      );
    }

    try {
      // Construct messages array
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
          '\n🔑 Invalid OpenAI API key.\n' +
          '   → Check your OPENAI_API_KEY is correct\n' +
          '   → Get a key at: https://platform.openai.com/api-keys\n'
        );
      }

      if (error?.status === 429) {
        throw new Error(
          '\n⏱️  OpenAI rate limit exceeded.\n' +
          '   → Wait a moment and try again\n' +
          '   → Or check your usage limits\n'
        );
      }

      if (error?.status === 402 || error?.message?.includes('quota')) {
        throw new Error(
          '\n💳 OpenAI quota exceeded.\n' +
          '   → Add credits at: https://platform.openai.com/account/billing\n' +
          '   → Check usage at: https://platform.openai.com/usage\n'
        );
      }

      if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED') {
        throw new Error(
          '\n🌐 Network error connecting to OpenAI.\n' +
          '   → Check your internet connection\n' +
          '   → Check if api.openai.com is accessible\n'
        );
      }

      // Generic error for unexpected issues
      const errorMessage = error?.message || String(error);
      throw new Error(
        `\n❌ OpenAI API request failed: ${errorMessage}\n` +
        '   → If this persists, check https://status.openai.com/\n'
      );
    }
  }
}
