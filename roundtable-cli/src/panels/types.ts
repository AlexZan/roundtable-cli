/**
 * Type definitions for the Panel System
 *
 * Panels compose multiple skills into expert groups that collaborate
 * on specific types of projects.
 */

/**
 * Configuration for multi-model panel diversity
 * Phase 1C Extended: Enables 2-3 diverse models per skill for richer deliberation
 */
export interface ModelDiversityConfig {
  /** Whether model diversity is enabled for this panel */
  enabled: boolean;

  /** Number of models per skill (default: 2) */
  modelsPerSkill?: number;

  /**
   * Strategy for model selection:
   * - 'auto-diverse': System automatically picks diverse models based on capabilities
   * - 'explicit': Use skillModelMap to explicitly assign models per skill
   */
  strategy?: 'auto-diverse' | 'explicit';

  /**
   * Explicit model assignments per skill (when strategy is 'explicit')
   * Example: { architecture: ['claude-sonnet-4-5', 'gpt-4-turbo'], ux: ['claude-haiku', 'gemini-pro'] }
   */
  skillModelMap?: Record<string, string[]>;
}

/**
 * A panel represents a group of skills that work together
 * to provide comprehensive expertise for a specific domain or project type.
 */
export interface Panel {
  /** Unique identifier for the panel (e.g., 'full-stack-web') */
  id: string;

  /** Human-readable name (e.g., 'Full Stack Web Development Panel') */
  name: string;

  /** Brief description of when to use this panel */
  description: string;

  /** Semantic version (e.g., '1.0.0') */
  version: string;

  /** List of skill IDs that compose this panel */
  skillIds: string[];

  /** Keywords that trigger auto-selection of this panel */
  keywords?: string[];

  /** Optional: Recommended agent count (defaults to skillIds.length) */
  agentCount?: number;

  /** Optional: Tags for categorization */
  tags?: string[];

  /** Optional: Author/maintainer information */
  author?: string;

  /** Optional: Model diversity configuration (Phase 1C Extended) */
  modelDiversity?: ModelDiversityConfig;
}

/**
 * Metadata about a panel, excluding detailed configuration.
 * Useful for displaying panel information in selection UI.
 */
export interface PanelMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  skillIds: string[];
  keywords?: string[];
  agentCount?: number;
  tags?: string[];
  author?: string;
  modelDiversity?: ModelDiversityConfig;
}

/**
 * Context used for panel selection and auto-detection
 */
export interface PanelSelectionContext {
  /** The user's prompt/query */
  prompt: string;

  /** Optional: Explicitly requested panel ID */
  panelId?: string;

  /** Optional: Project type hint */
  projectType?: string;

  /** Optional: Additional keywords to consider */
  additionalKeywords?: string[];
}

/**
 * Result of panel validation
 */
export interface PanelValidationResult {
  /** Whether the panel is valid */
  valid: boolean;

  /** Error messages if invalid */
  errors: string[];

  /** Warning messages (non-fatal issues) */
  warnings: string[];
}

/**
 * Options for loading panels
 */
export interface PanelLoaderOptions {
  /** Directory to load panels from (default: '.roundtable/panels') */
  panelsDir?: string;

  /** Whether to validate panels on load (default: true) */
  validate?: boolean;

  /** Whether to cache loaded panels (default: true) */
  cache?: boolean;
}

/**
 * Result of panel auto-detection
 */
export interface PanelDetectionResult {
  /** The detected panel (or undefined if no match) */
  panel?: Panel;

  /** Confidence score (0-1) for the detection */
  confidence: number;

  /** Keywords that matched from the prompt */
  matchedKeywords: string[];

  /** Alternative panels that could also work */
  alternatives?: Array<{
    panel: Panel;
    confidence: number;
    matchedKeywords: string[];
  }>;
}
