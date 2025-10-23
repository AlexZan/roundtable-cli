/**
 * Google Gemini API integration layer
 * Phase 1C: Multi-LLM Support
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMRequest, LLMResponse } from '../types.js';
import type { LLMProvider } from './types.js';

export class GeminiClient implements LLMProvider {
  public readonly providerName = 'google';
  private client: GoogleGenerativeAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || null;

    if (this.apiKey) {
      this.client = new GoogleGenerativeAI(this.apiKey);
    }
  }

  isConfigured(): boolean {
    return this.client !== null && this.apiKey !== null;
  }

  getAvailableModels(): string[] {
    return [
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-pro'
    ];
  }

  async sendRequest(request: LLMRequest, model: string): Promise<LLMResponse> {
    if (!this.isConfigured() || !this.client) {
      throw new Error(
        '\n🔑 Google API key not configured.\n' +
        '   → Set GOOGLE_API_KEY in .env\n' +
        '   → Get a key at: https://makersuite.google.com/app/apikey\n'
      );
    }

    try {
      const genModel = this.client.getGenerativeModel({ model });

      // Construct full prompt with system prompt and context
      let fullPrompt = '';

      if (request.systemPrompt) {
        fullPrompt += `${request.systemPrompt}\n\n`;
      }

      if (request.context) {
        fullPrompt += `${request.context}\n\n---\n\n`;
      }

      fullPrompt += request.prompt;

      const result = await genModel.generateContent(fullPrompt);
      const response = result.response;

      // Extract content
      const content = response.text();

      // Calculate tokens used (Gemini provides token counts)
      const tokensUsed = (response as any).usageMetadata?.totalTokenCount ||
                         Math.ceil(content.length / 4); // Fallback estimate

      return {
        content,
        tokensUsed
      };
    } catch (error: any) {
      // Provide friendly error messages for common issues
      if (error?.status === 401 || error?.message?.includes('API key')) {
        throw new Error(
          '\n🔑 Invalid Google API key.\n' +
          '   → Check your GOOGLE_API_KEY is correct\n' +
          '   → Get a key at: https://makersuite.google.com/app/apikey\n'
        );
      }

      if (error?.status === 429 || error?.message?.includes('quota')) {
        throw new Error(
          '\n⏱️  Google API quota exceeded.\n' +
          '   → Wait a moment and try again\n' +
          '   → Or check your usage limits\n'
        );
      }

      if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED') {
        throw new Error(
          '\n🌐 Network error connecting to Google AI.\n' +
          '   → Check your internet connection\n' +
          '   → Check if generativelanguage.googleapis.com is accessible\n'
        );
      }

      // Generic error for unexpected issues
      const errorMessage = error?.message || String(error);
      throw new Error(
        `\n❌ Google Gemini API request failed: ${errorMessage}\n` +
        '   → If this persists, check https://status.cloud.google.com/\n'
      );
    }
  }
}
