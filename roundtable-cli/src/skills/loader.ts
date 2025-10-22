/**
 * Skill loader - loads skills from YAML files
 */

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { Skill, SkillLoaderOptions, SkillMetadata } from './types.js';
import { validateSkill } from './validator.js';

/**
 * In-memory cache for loaded skills
 */
const skillCache = new Map<string, Skill>();

/**
 * Default options for skill loader
 */
const DEFAULT_OPTIONS: Required<SkillLoaderOptions> = {
  skillsDir: '.roundtable/skills',
  validate: true,
  cache: true
};

/**
 * Loads a single skill from a YAML file
 *
 * @param filePath - Path to the skill YAML file
 * @param options - Loader options
 * @returns The loaded skill
 * @throws Error if file cannot be read or skill is invalid
 */
export async function loadSkill(
  filePath: string,
  options: SkillLoaderOptions = {}
): Promise<Skill> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Check cache first
  if (opts.cache && skillCache.has(filePath)) {
    return skillCache.get(filePath)!;
  }

  try {
    // Read file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse YAML
    const data = yaml.load(fileContent);

    // Validate structure
    if (opts.validate) {
      const validation = validateSkill(data);
      if (!validation.valid) {
        throw new Error(
          `Invalid skill in ${filePath}:\n${validation.errors.join('\n')}`
        );
      }

      // Log warnings if any
      if (validation.warnings.length > 0) {
        console.warn(
          `Warnings for skill ${filePath}:\n${validation.warnings.join('\n')}`
        );
      }
    }

    const skill = data as Skill;

    // Cache if enabled
    if (opts.cache) {
      skillCache.set(filePath, skill);
    }

    return skill;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Skill file not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Loads a skill by ID from the skills directory
 *
 * @param skillId - The skill ID (e.g., 'architecture')
 * @param options - Loader options
 * @returns The loaded skill
 * @throws Error if skill cannot be found or loaded
 */
export async function loadSkillById(
  skillId: string,
  options: SkillLoaderOptions = {}
): Promise<Skill> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const filePath = path.join(opts.skillsDir, `${skillId}.yaml`);
  return loadSkill(filePath, options);
}

/**
 * Loads all skills from the skills directory
 *
 * @param options - Loader options
 * @returns Map of skill ID to skill
 */
export async function loadAllSkills(
  options: SkillLoaderOptions = {}
): Promise<Map<string, Skill>> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const skills = new Map<string, Skill>();

  try {
    // Check if directory exists
    await fs.access(opts.skillsDir);

    // Read all files in directory
    const files = await fs.readdir(opts.skillsDir);

    // Filter for .yaml and .yml files
    const yamlFiles = files.filter(
      (file) => file.endsWith('.yaml') || file.endsWith('.yml')
    );

    // Load each skill
    for (const file of yamlFiles) {
      try {
        const filePath = path.join(opts.skillsDir, file);
        const skill = await loadSkill(filePath, options);
        skills.set(skill.id, skill);
      } catch (error: any) {
        console.error(`Failed to load skill ${file}: ${error.message}`);
        // Continue loading other skills
      }
    }

    return skills;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(
        `Skills directory not found: ${opts.skillsDir}\n` +
          'Create it with: mkdir -p .roundtable/skills'
      );
    }
    throw error;
  }
}

/**
 * Gets metadata for all available skills without loading full content
 *
 * @param options - Loader options
 * @returns Array of skill metadata
 */
export async function getAvailableSkills(
  options: SkillLoaderOptions = {}
): Promise<SkillMetadata[]> {
  const skills = await loadAllSkills(options);
  return Array.from(skills.values()).map((skill) => ({
    id: skill.id,
    name: skill.name,
    description: skill.description,
    version: skill.version,
    domain: skill.domain,
    keywords: skill.keywords,
    tags: skill.tags,
    author: skill.author
  }));
}

/**
 * Clears the skill cache
 */
export function clearSkillCache(): void {
  skillCache.clear();
}

/**
 * Gets the current cache size
 *
 * @returns Number of cached skills
 */
export function getCacheSize(): number {
  return skillCache.size;
}
