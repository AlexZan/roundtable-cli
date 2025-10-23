/**
 * LLM Provider Types and Interfaces
 * Phase 1C: Multi-LLM Support
 */

import type { LLMRequest, LLMResponse } from '../types.js';

/**
 * LLM Provider Interface
 * All LLM clients (Claude, GPT-4, Gemini, Grok) must implement this
 */
export interface LLMProvider {
  /**
   * Provider name (e.g., "anthropic", "openai", "google", "xai")
   */
  readonly providerName: string;

  /**
   * Send a request to the LLM
   * @param request - The prompt, system prompt, and context
   * @param model - The specific model to use (e.g., "gpt-4-turbo")
   * @returns The response content and token usage
   */
  sendRequest(request: LLMRequest, model: string): Promise<LLMResponse>;

  /**
   * Check if API key is configured for this provider
   * @returns true if API key is available
   */
  isConfigured(): boolean;

  /**
   * Get available models for this provider
   * @returns Array of model IDs this provider supports
   */
  getAvailableModels(): string[];
}

/**
 * Model capabilities and metadata
 */
export interface ModelInfo {
  /** Unique model ID (e.g., "gpt-4-turbo", "claude-opus-4") */
  id: string;

  /** Provider name */
  provider: 'anthropic' | 'openai' | 'google' | 'xai';

  /** Display name */
  name: string;

  /** Model capabilities */
  capabilities: {
    reasoning: number;     // 1-10 scale
    creativity: number;    // 1-10 scale
    speed: number;         // 1-10 scale
    contextWindow: number; // in tokens
  };

  /** Cost per 1M tokens */
  cost: {
    input: number;  // USD per 1M input tokens
    output: number; // USD per 1M output tokens
  };

  /** Is this model currently available? */
  available: boolean;

  /** Additional notes or use cases */
  notes?: string;
}

/**
 * Model registry configuration
 */
export interface ModelRegistry {
  /** All available models */
  models: ModelInfo[];

  /** Default model to use if none specified */
  defaultModel: string;
}

/**
 * Model selection criteria
 */
export interface ModelSelectionCriteria {
  /** Prefer models with high reasoning capability */
  reasoning?: boolean;

  /** Prefer models with high creativity */
  creativity?: boolean;

  /** Prefer faster models */
  speed?: boolean;

  /** Maximum cost per 1M tokens (input + output average) */
  maxCost?: number;

  /** Required minimum context window */
  minContextWindow?: number;

  /** Specific provider preference */
  preferredProvider?: 'anthropic' | 'openai' | 'google' | 'xai';
}
