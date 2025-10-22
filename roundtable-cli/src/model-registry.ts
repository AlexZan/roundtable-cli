/**
 * AI Model Registry - Centralized model definitions and metadata
 *
 * This file provides typed access to all supported AI models across providers.
 * Data source: model-registry.json
 * Last updated: 2025-10-22
 */

import modelRegistryData from './model-registry.json' assert { type: 'json' };

// ============================================================================
// Type Definitions
// ============================================================================

export type Provider = 'openai' | 'anthropic' | 'google' | 'mistral' | 'cohere' | 'meta' | 'xai';

export type ModelCapability =
  | 'text'
  | 'image'
  | 'audio'
  | 'audio-to-text'
  | 'text-to-audio'
  | 'realtime-audio'
  | 'image-generation'
  | 'text-to-image'
  | 'tool-use'
  | 'realtime-search'
  | 'multimodal'
  | 'rag'
  | 'citations'
  | 'native-reasoning';

export interface ModelPricing {
  input: number;
  output: number;
  unit: string;
}

export interface Model {
  id: string;
  name: string;
  tier?: string;
  version?: string;
  releaseDate?: string;
  description?: string;
  contextWindow?: number;
  parameters?: string;
  architecture?: string;
  capabilities?: ModelCapability[];
  specialization?: string;
  pricing?: ModelPricing;
  status?: 'active' | 'beta' | 'preview' | 'training' | 'upcoming' | 'legacy' | 'deprecated';
}

export interface ModelFamily {
  family: string;
  releaseDate?: string;
  specialization?: string;
  models: Model[];
}

export interface ProviderInfo {
  name: string;
  models: Record<string, ModelFamily>;
}

export interface ModelRegistry {
  providers: Record<Provider, ProviderInfo>;
  metadata: {
    note: string;
    knowledgeCutoff: string;
    generatedBy: string;
  };
  lastUpdated: string;
  version: string;
}

// ============================================================================
// Registry Access
// ============================================================================

export const modelRegistry: ModelRegistry = modelRegistryData as ModelRegistry;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all models from a specific provider
 */
export function getProviderModels(provider: Provider): Model[] {
  const providerData = modelRegistry.providers[provider];
  if (!providerData) return [];

  const models: Model[] = [];
  for (const familyKey in providerData.models) {
    const family = providerData.models[familyKey];
    models.push(...family.models);
  }
  return models;
}

/**
 * Get a specific model by ID across all providers
 */
export function getModelById(modelId: string): Model | undefined {
  for (const provider in modelRegistry.providers) {
    const providerData = modelRegistry.providers[provider as Provider];
    for (const familyKey in providerData.models) {
      const family = providerData.models[familyKey];
      const model = family.models.find(m => m.id === modelId);
      if (model) return model;
    }
  }
  return undefined;
}

/**
 * Get all models that match specific capabilities
 */
export function getModelsByCapability(capability: ModelCapability): Model[] {
  const models: Model[] = [];
  for (const provider in modelRegistry.providers) {
    const providerData = modelRegistry.providers[provider as Provider];
    for (const familyKey in providerData.models) {
      const family = providerData.models[familyKey];
      const matchingModels = family.models.filter(m =>
        m.capabilities?.includes(capability)
      );
      models.push(...matchingModels);
    }
  }
  return models;
}

/**
 * Get all models specialized for a specific task
 */
export function getModelsBySpecialization(specialization: string): Model[] {
  const models: Model[] = [];
  for (const provider in modelRegistry.providers) {
    const providerData = modelRegistry.providers[provider as Provider];
    for (const familyKey in providerData.models) {
      const family = providerData.models[familyKey];
      const matchingModels = family.models.filter(m =>
        m.specialization === specialization || family.specialization === specialization
      );
      models.push(...matchingModels);
    }
  }
  return models;
}

/**
 * Get all available model IDs (useful for validation)
 */
export function getAllModelIds(): string[] {
  const ids: string[] = [];
  for (const provider in modelRegistry.providers) {
    const providerData = modelRegistry.providers[provider as Provider];
    for (const familyKey in providerData.models) {
      const family = providerData.models[familyKey];
      ids.push(...family.models.map(m => m.id));
    }
  }
  return ids;
}

/**
 * Validate if a model ID exists
 */
export function isValidModelId(modelId: string): boolean {
  return getModelById(modelId) !== undefined;
}

/**
 * Get models sorted by context window size
 */
export function getModelsByContextWindow(minContext?: number): Model[] {
  const models: Model[] = [];
  for (const provider in modelRegistry.providers) {
    const providerData = modelRegistry.providers[provider as Provider];
    for (const familyKey in providerData.models) {
      const family = providerData.models[familyKey];
      models.push(...family.models.filter(m =>
        m.contextWindow !== undefined &&
        (!minContext || m.contextWindow >= minContext)
      ));
    }
  }
  return models.sort((a, b) => (b.contextWindow || 0) - (a.contextWindow || 0));
}

/**
 * Get models by provider with optional filtering
 */
export function getModels(options?: {
  provider?: Provider;
  capability?: ModelCapability;
  specialization?: string;
  minContext?: number;
  status?: Model['status'];
}): Model[] {
  let models: Model[] = [];

  // Start with all or provider-specific models
  if (options?.provider) {
    models = getProviderModels(options.provider);
  } else {
    models = getAllModelIds().map(id => getModelById(id)!);
  }

  // Apply filters
  if (options?.capability) {
    models = models.filter(m => m.capabilities?.includes(options.capability!));
  }
  if (options?.specialization) {
    models = models.filter(m => m.specialization === options.specialization);
  }
  if (options?.minContext) {
    models = models.filter(m => m.contextWindow && m.contextWindow >= options.minContext!);
  }
  if (options?.status) {
    models = models.filter(m => (m.status || 'active') === options.status);
  }

  return models;
}

// ============================================================================
// Commonly Used Model Constants
// ============================================================================

export const OPENAI_MODELS = {
  // GPT-5 Series
  GPT5_MINIMAL: 'gpt-5-minimal',
  GPT5_LOW: 'gpt-5-low',
  GPT5_MEDIUM: 'gpt-5-medium',
  GPT5_HIGH: 'gpt-5-high',

  // GPT-5 Codex
  GPT5_CODEX_LOW: 'gpt-5-codex-low',
  GPT5_CODEX_MEDIUM: 'gpt-5-codex-medium',
  GPT5_CODEX_HIGH: 'gpt-5-codex-high',

  // Codex Agent
  CODEX_1: 'codex-1',
  CODEX_MINI: 'codex-mini-latest',

  // GPT-4.1
  GPT4_1: 'gpt-4.1',
  GPT4_1_MINI: 'gpt-4.1-mini',
  GPT4_1_NANO: 'gpt-4.1-nano',

  // Reasoning (o-series)
  O3: 'o3',
  O4_MINI: 'o4-mini',
  O4_MINI_HIGH: 'o4-mini-high',

  // GPT-4o
  GPT4O: 'gpt-4o',
  GPT4O_MINI: 'gpt-4o-mini',
} as const;

export const ANTHROPIC_MODELS = {
  // Claude 4.5
  SONNET_4_5: 'claude-sonnet-4-5',
  HAIKU_4_5: 'claude-haiku-4-5',

  // Claude 4.1
  OPUS_4_1: 'claude-opus-4-1',

  // Claude 4
  SONNET_4: 'claude-sonnet-4',
  OPUS_4: 'claude-opus-4',

  // Claude 3.7
  SONNET_3_7: 'claude-3-7-sonnet',
} as const;

export const GOOGLE_MODELS = {
  // Gemini 2.5
  GEMINI_2_5_PRO: 'gemini-2.5-pro',
  GEMINI_2_5_FLASH: 'gemini-2.5-flash',
  GEMINI_2_5_FLASH_LITE: 'gemini-2.5-flash-lite-preview-06-17',
  GEMINI_2_5_IMAGE: 'gemini-2.5-image-preview',

  // Imagen 4
  IMAGEN_4_ULTRA: 'imagen-4-ultra',
  IMAGEN_4_STANDARD: 'imagen-4-standard-preview',
} as const;

export const MISTRAL_MODELS = {
  LARGE_2: 'mistral-large-2',
  MEDIUM_3: 'mistral-medium-3',
  SMALL_3: 'mistral-small-3',
  SMALL_3_1: 'mistral-small-3.1',
  CODESTRAL: 'codestral-25.01',
  CODESTRAL_EMBED: 'codestral-embed-2505',
} as const;

export const COHERE_MODELS = {
  COMMAND_R_PLUS: 'command-r-plus',
  COMMAND_R: 'command-r',
  COMMAND_R7B: 'command-r7b',
  COMMAND_A: 'command-a',
} as const;

export const META_MODELS = {
  LLAMA_4_MAVERICK: 'meta-llama/llama-4-maverick',
  LLAMA_4_SCOUT: 'meta-llama/llama-4-scout',
  LLAMA_4_BEHEMOTH: 'meta-llama/llama-4-behemoth',
  LLAMA_4_REASONING: 'meta-llama/llama-4-reasoning',
} as const;

export const XAI_MODELS = {
  GROK_4: 'grok-4',
  GROK_3: 'grok-3',
  GROK_3_MINI: 'grok-3-mini',
  GROK_CODE_FAST: 'grok-code-fast-1',
  GROK_2_IMAGE: 'grok-2-image-1212',
} as const;

// ============================================================================
// Default Export
// ============================================================================

export default {
  registry: modelRegistry,
  getProviderModels,
  getModelById,
  getModelsByCapability,
  getModelsBySpecialization,
  getAllModelIds,
  isValidModelId,
  getModelsByContextWindow,
  getModels,
  OPENAI_MODELS,
  ANTHROPIC_MODELS,
  GOOGLE_MODELS,
  MISTRAL_MODELS,
  COHERE_MODELS,
  META_MODELS,
  XAI_MODELS,
};
