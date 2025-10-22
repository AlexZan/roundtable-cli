/**
 * Skill validation logic
 *
 * Validates that skill definitions meet required structure and content standards.
 */

import type { Skill, SkillValidationResult } from './types.js';

/**
 * Validates a skill object against required schema
 *
 * @param skill - The skill to validate
 * @returns Validation result with errors and warnings
 */
export function validateSkill(skill: any): SkillValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check that skill is an object
  if (!skill || typeof skill !== 'object') {
    return {
      valid: false,
      errors: ['Skill must be an object'],
      warnings: []
    };
  }

  // Required fields
  const requiredFields: Array<keyof Skill> = [
    'id',
    'name',
    'description',
    'version',
    'domain',
    'systemPrompt'
  ];

  for (const field of requiredFields) {
    if (!skill[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (typeof skill[field] !== 'string') {
      errors.push(`Field '${field}' must be a string`);
    } else if (skill[field].trim() === '') {
      errors.push(`Field '${field}' cannot be empty`);
    }
  }

  // Validate ID format (lowercase, hyphens only)
  if (skill.id && typeof skill.id === 'string') {
    if (!/^[a-z0-9-]+$/.test(skill.id)) {
      errors.push(
        `Skill ID '${skill.id}' must contain only lowercase letters, numbers, and hyphens`
      );
    }
  }

  // Validate version format (semver)
  if (skill.version && typeof skill.version === 'string') {
    if (!/^\d+\.\d+\.\d+$/.test(skill.version)) {
      errors.push(
        `Version '${skill.version}' must follow semantic versioning (e.g., '1.0.0')`
      );
    }
  }

  // Validate system prompt length
  if (skill.systemPrompt && typeof skill.systemPrompt === 'string') {
    const wordCount = skill.systemPrompt.trim().split(/\s+/).length;

    if (wordCount < 50) {
      warnings.push(
        `System prompt is very short (${wordCount} words). Consider adding more detail (recommended: 200-400 words).`
      );
    }

    if (wordCount < 20) {
      errors.push(
        `System prompt is too short (${wordCount} words). Must be at least 20 words.`
      );
    }
  }

  // Validate optional array fields
  const arrayFields: Array<keyof Skill> = ['keywords', 'tags'];
  for (const field of arrayFields) {
    if (skill[field] !== undefined) {
      if (!Array.isArray(skill[field])) {
        errors.push(`Field '${field}' must be an array`);
      } else {
        // Check all items are strings
        const nonStrings = (skill[field] as any[]).filter(
          (item) => typeof item !== 'string'
        );
        if (nonStrings.length > 0) {
          errors.push(`Field '${field}' must contain only strings`);
        }
      }
    }
  }

  // Validate author if present
  if (skill.author !== undefined && typeof skill.author !== 'string') {
    errors.push(`Field 'author' must be a string`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates that a loaded skill structure matches expected format
 * before parsing into a Skill object.
 *
 * @param data - Raw data loaded from YAML
 * @returns Validation result
 */
export function validateSkillStructure(data: any): SkillValidationResult {
  return validateSkill(data);
}
