/**
 * Model Registry - Manages available LLM models and providers
 * Phase 1C: Multi-LLM Support
 */

import fs from 'fs';
import path from 'path';
import type { ModelInfo, ModelRegistry, ModelSelectionCriteria, LLMProvider } from './types.js';
import { ClaudeClient } from './claude.js';
import { OpenAIClient } from './openai.js';
import { GeminiClient } from './gemini.js';
import { GrokClient } from './grok.js';

/**
 * LLM Model Registry
 * Loads model configurations and routes requests to appropriate providers
 */
export class LLMModelRegistry {
  private models: Map<string, ModelInfo> = new Map();
  private providers: Map<string, LLMProvider> = new Map();
  private defaultModel: string = 'claude-haiku-4-5-20251001';

  constructor() {
    // Initialize providers
    this.providers.set('anthropic', new ClaudeClient());
    this.providers.set('openai', new OpenAIClient());
    this.providers.set('google', new GeminiClient());
    this.providers.set('xai', new GrokClient());

    // Load model configurations
    this.loadModelConfig();
  }

  /**
   * Load model configurations from .roundtable/models.json
   */
  private loadModelConfig(): void {
    try {
      const configPath = path.join(process.cwd(), '.roundtable', 'models.json');

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf-8');
        const config: ModelRegistry = JSON.parse(configContent);

        // Load models into registry
        for (const model of config.models) {
          this.models.set(model.id, model);
        }

        // Set default model
        if (config.defaultModel) {
          this.defaultModel = config.defaultModel;
        }
      } else {
        // Use built-in defaults if no config file
        this.loadDefaultModels();
      }
    } catch (error) {
      console.warn('⚠️  Failed to load model config, using defaults:', (error as Error).message);
      this.loadDefaultModels();
    }
  }

  /**
   * Load default model configurations
   */
  private loadDefaultModels(): void {
    const defaultModels: ModelInfo[] = [
      // Claude models
      {
        id: 'claude-opus-4-20250514',
        provider: 'anthropic',
        name: 'Claude Opus 4',
        capabilities: {
          reasoning: 10,
          creativity: 9,
          speed: 7,
          contextWindow: 200000
        },
        cost: {
          input: 15,
          output: 75
        },
        available: true,
        notes: 'Most capable Claude model for complex reasoning'
      },
      {
        id: 'claude-sonnet-4-20250514',
        provider: 'anthropic',
        name: 'Claude Sonnet 4',
        capabilities: {
          reasoning: 9,
          creativity: 8,
          speed: 8,
          contextWindow: 200000
        },
        cost: {
          input: 3,
          output: 15
        },
        available: true,
        notes: 'Balanced performance and cost'
      },
      {
        id: 'claude-haiku-4-5-20251001',
        provider: 'anthropic',
        name: 'Claude Haiku 4.5',
        capabilities: {
          reasoning: 8,
          creativity: 7,
          speed: 10,
          contextWindow: 200000
        },
        cost: {
          input: 1,
          output: 5
        },
        available: true,
        notes: 'Fastest and most cost-effective'
      },
      // OpenAI models
      {
        id: 'gpt-4-turbo',
        provider: 'openai',
        name: 'GPT-4 Turbo',
        capabilities: {
          reasoning: 9,
          creativity: 8,
          speed: 7,
          contextWindow: 128000
        },
        cost: {
          input: 10,
          output: 30
        },
        available: true,
        notes: 'Latest GPT-4 with improved performance'
      },
      {
        id: 'gpt-4',
        provider: 'openai',
        name: 'GPT-4',
        capabilities: {
          reasoning: 9,
          creativity: 8,
          speed: 6,
          contextWindow: 8192
        },
        cost: {
          input: 30,
          output: 60
        },
        available: true,
        notes: 'Original GPT-4, very capable'
      },
      // Gemini models
      {
        id: 'gemini-2.0-flash-exp',
        provider: 'google',
        name: 'Gemini 2.0 Flash',
        capabilities: {
          reasoning: 8,
          creativity: 8,
          speed: 9,
          contextWindow: 32000
        },
        cost: {
          input: 0.1,
          output: 0.3
        },
        available: true,
        notes: 'Fast and cost-effective Gemini model'
      },
      {
        id: 'gemini-1.5-pro',
        provider: 'google',
        name: 'Gemini 1.5 Pro',
        capabilities: {
          reasoning: 9,
          creativity: 8,
          speed: 7,
          contextWindow: 2000000
        },
        cost: {
          input: 3.5,
          output: 10.5
        },
        available: true,
        notes: 'Huge context window, great for complex tasks'
      },
      // Grok models
      {
        id: 'grok-beta',
        provider: 'xai',
        name: 'Grok Beta',
        capabilities: {
          reasoning: 8,
          creativity: 9,
          speed: 7,
          contextWindow: 32000
        },
        cost: {
          input: 5,
          output: 15
        },
        available: true,
        notes: 'xAI\'s Grok model with unique perspective'
      }
    ];

    for (const model of defaultModels) {
      this.models.set(model.id, model);
    }
  }

  /**
   * Get model information by ID
   */
  getModel(modelId: string): ModelInfo | undefined {
    return this.models.get(modelId);
  }

  /**
   * Get all available models
   */
  getAllModels(): ModelInfo[] {
    return Array.from(this.models.values());
  }

  /**
   * Get models by provider
   */
  getModelsByProvider(provider: string): ModelInfo[] {
    return Array.from(this.models.values()).filter(m => m.provider === provider);
  }

  /**
   * Get provider client
   */
  getProvider(providerName: string): LLMProvider | undefined {
    return this.providers.get(providerName);
  }

  /**
   * Get provider for a specific model
   */
  getProviderForModel(modelId: string): LLMProvider | undefined {
    const model = this.getModel(modelId);
    if (!model) return undefined;

    return this.providers.get(model.provider);
  }

  /**
   * Check if a model is available (provider is configured)
   */
  isModelAvailable(modelId: string): boolean {
    const model = this.getModel(modelId);
    if (!model || !model.available) return false;

    const provider = this.getProvider(model.provider);
    return provider?.isConfigured() ?? false;
  }

  /**
   * Get all configured (available) models
   */
  getConfiguredModels(): ModelInfo[] {
    return this.getAllModels().filter(model => this.isModelAvailable(model.id));
  }

  /**
   * Get default model ID
   */
  getDefaultModel(): string {
    return this.defaultModel;
  }

  /**
   * Select best model based on criteria
   */
  selectModel(criteria?: ModelSelectionCriteria): string {
    const availableModels = this.getConfiguredModels();

    if (availableModels.length === 0) {
      throw new Error(
        '\n❌ No LLM providers configured.\n' +
        '   → Set at least one API key in .env:\n' +
        '      - ANTHROPIC_API_KEY for Claude\n' +
        '      - OPENAI_API_KEY for GPT-4\n' +
        '      - GOOGLE_API_KEY for Gemini\n' +
        '      - XAI_API_KEY for Grok\n'
      );
    }

    if (!criteria) {
      // Return default if available, otherwise first available model
      const defaultAvailable = availableModels.find(m => m.id === this.defaultModel);
      return defaultAvailable?.id || availableModels[0].id;
    }

    // Filter by criteria
    let candidates = availableModels;

    if (criteria.preferredProvider) {
      const providerModels = candidates.filter(m => m.provider === criteria.preferredProvider);
      if (providerModels.length > 0) {
        candidates = providerModels;
      }
    }

    if (criteria.maxCost) {
      candidates = candidates.filter(m => {
        const avgCost = (m.cost.input + m.cost.output) / 2;
        return avgCost <= criteria.maxCost!;
      });
    }

    if (criteria.minContextWindow) {
      candidates = candidates.filter(m => m.capabilities.contextWindow >= criteria.minContextWindow!);
    }

    if (candidates.length === 0) {
      // No models match criteria, return default
      return availableModels[0].id;
    }

    // Score models based on criteria
    let best = candidates[0];
    let bestScore = 0;

    for (const model of candidates) {
      let score = 0;

      if (criteria.reasoning) score += model.capabilities.reasoning;
      if (criteria.creativity) score += model.capabilities.creativity;
      if (criteria.speed) score += model.capabilities.speed;

      if (score > bestScore) {
        bestScore = score;
        best = model;
      }
    }

    return best.id;
  }

  /**
   * Get summary of available providers
   */
  getProviderStatus(): { provider: string; configured: boolean; models: string[] }[] {
    const status: { provider: string; configured: boolean; models: string[] }[] = [];

    for (const [providerName, provider] of this.providers.entries()) {
      const models = this.getModelsByProvider(providerName).map(m => m.id);
      status.push({
        provider: providerName,
        configured: provider.isConfigured(),
        models
      });
    }

    return status;
  }
}

// Singleton instance
let registryInstance: LLMModelRegistry | null = null;

/**
 * Get the global model registry instance
 */
export function getModelRegistry(): LLMModelRegistry {
  if (!registryInstance) {
    registryInstance = new LLMModelRegistry();
  }
  return registryInstance;
}
