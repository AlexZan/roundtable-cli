/**
 * Type definitions for the Skills Library System
 *
 * Skills are reusable expert definitions that can be composed into panels.
 * Each skill represents a specific domain of expertise with a dedicated system prompt.
 */

/**
 * A skill represents a specific area of expertise that can be used
 * to create an agent with specialized knowledge and perspective.
 */
export interface Skill {
  /** Unique identifier for the skill (e.g., 'architecture', 'security') */
  id: string;

  /** Human-readable name (e.g., 'Software Architecture Expert') */
  name: string;

  /** Brief description of what this skill provides */
  description: string;

  /** Semantic version (e.g., '1.0.0') */
  version: string;

  /** Domain or category (e.g., 'engineering', 'product', 'design') */
  domain: string;

  /** System prompt that defines the expert's knowledge and behavior */
  systemPrompt: string;

  /** Optional: Keywords that help with auto-detection */
  keywords?: string[];

  /** Optional: Tags for categorization */
  tags?: string[];

  /** Optional: Author/maintainer information */
  author?: string;
}

/**
 * Metadata about a skill, excluding the system prompt.
 * Useful for displaying skill information without loading full content.
 */
export interface SkillMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  domain: string;
  keywords?: string[];
  tags?: string[];
  author?: string;
}

/**
 * Result of skill validation
 */
export interface SkillValidationResult {
  /** Whether the skill is valid */
  valid: boolean;

  /** Error messages if invalid */
  errors: string[];

  /** Warning messages (non-fatal issues) */
  warnings: string[];
}

/**
 * Options for loading skills
 */
export interface SkillLoaderOptions {
  /** Directory to load skills from (default: '.roundtable/skills') */
  skillsDir?: string;

  /** Whether to validate skills on load (default: true) */
  validate?: boolean;

  /** Whether to cache loaded skills (default: true) */
  cache?: boolean;
}
