/**
 * Unit tests for Skills Library system
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import {
  loadSkill,
  loadSkillById,
  loadAllSkills,
  getAvailableSkills,
  clearSkillCache,
  getCacheSize
} from './loader.js';
import { validateSkill } from './validator.js';
import type { Skill } from './types.js';

// Test data directory
const TEST_SKILLS_DIR = '.test-skills';

describe('Skill Validator', () => {
  describe('validateSkill', () => {
    it('should validate a complete valid skill', () => {
      const validSkill: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'A test skill for validation',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation. ' +
          'It contains multiple sentences and provides adequate context for the skill. ' +
          'This ensures the word count requirement is met for proper validation.'
      };

      const result = validateSkill(validSkill);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject skill missing required fields', () => {
      const invalidSkill = {
        id: 'test-skill',
        name: 'Test Skill'
        // Missing: description, version, domain, systemPrompt
      };

      const result = validateSkill(invalidSkill);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: description');
      expect(result.errors).toContain('Missing required field: version');
      expect(result.errors).toContain('Missing required field: domain');
      expect(result.errors).toContain('Missing required field: systemPrompt');
    });

    it('should reject skill with invalid ID format', () => {
      const invalidSkill: Skill = {
        id: 'Test_Skill!',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation. ' +
          'It contains multiple sentences and provides adequate context for the skill.'
      };

      const result = validateSkill(invalidSkill);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('lowercase letters'))).toBe(true);
    });

    it('should reject skill with invalid version format', () => {
      const invalidSkill: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation. ' +
          'It contains multiple sentences and provides adequate context for the skill.'
      };

      const result = validateSkill(invalidSkill);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('semantic versioning'))).toBe(true);
    });

    it('should reject skill with too short system prompt', () => {
      const invalidSkill: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'Too short'
      };

      const result = validateSkill(invalidSkill);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('too short'))).toBe(true);
    });

    it('should warn about short but valid system prompt', () => {
      const skill: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a system prompt with just enough words to be valid but ' +
          'not enough to avoid a warning about being too short for production use.'
      };

      const result = validateSkill(skill);
      expect(result.valid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.includes('short'))).toBe(true);
    });

    it('should validate optional fields correctly', () => {
      const skillWithOptional: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation. ' +
          'It contains multiple sentences and provides adequate context for the skill.',
        keywords: ['test', 'validation'],
        tags: ['testing', 'example'],
        author: 'Test Author'
      };

      const result = validateSkill(skillWithOptional);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid array fields', () => {
      const invalidSkill: any = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation.',
        keywords: 'not-an-array'
      };

      const result = validateSkill(invalidSkill);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('must be an array'))).toBe(true);
    });
  });
});

describe('Skill Loader', () => {
  beforeEach(async () => {
    // Clear cache before each test
    clearSkillCache();

    // Create test directory
    await fs.mkdir(TEST_SKILLS_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.rm(TEST_SKILLS_DIR, { recursive: true, force: true });
  });

  describe('loadSkill', () => {
    it('should load a valid skill from YAML file', async () => {
      const testSkill: Skill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'A test skill',
        version: '1.0.0',
        domain: 'testing',
        systemPrompt: 'This is a test system prompt with enough words to pass validation. ' +
          'It contains multiple sentences and provides adequate context for the skill.'
      };

      const filePath = path.join(TEST_SKILLS_DIR, 'test-skill.yaml');
      await fs.writeFile(
        filePath,
        `id: test-skill
name: Test Skill
description: A test skill
version: 1.0.0
domain: testing
systemPrompt: |
  This is a test system prompt with enough words to pass validation successfully.
  It needs at least twenty words to avoid validation errors in our test suite.
  It contains multiple sentences and provides adequate context for the skill.
`
      );

      const skill = await loadSkill(filePath, { skillsDir: TEST_SKILLS_DIR });
      expect(skill.id).toBe('test-skill');
      expect(skill.name).toBe('Test Skill');
      expect(skill.version).toBe('1.0.0');
    });

    it('should throw error for non-existent file', async () => {
      await expect(
        loadSkill(path.join(TEST_SKILLS_DIR, 'non-existent.yaml'))
      ).rejects.toThrow('Skill file not found');
    });

    it('should throw error for invalid YAML', async () => {
      const filePath = path.join(TEST_SKILLS_DIR, 'invalid.yaml');
      await fs.writeFile(filePath, 'invalid: yaml: content: [');

      await expect(loadSkill(filePath)).rejects.toThrow();
    });

    it('should cache skills when cache is enabled', async () => {
      const filePath = path.join(TEST_SKILLS_DIR, 'cached.yaml');
      await fs.writeFile(
        filePath,
        `id: cached-skill
name: Cached Skill
description: A cached skill
version: 1.0.0
domain: testing
systemPrompt: |
  This is a test system prompt with enough words to pass validation successfully.
  It needs at least twenty words to avoid validation errors in our test suite.
  It contains multiple sentences and provides adequate context.
`
      );

      expect(getCacheSize()).toBe(0);

      await loadSkill(filePath, { cache: true });
      expect(getCacheSize()).toBe(1);

      await loadSkill(filePath, { cache: true });
      expect(getCacheSize()).toBe(1); // Still 1, loaded from cache
    });

    it('should not cache when cache is disabled', async () => {
      const filePath = path.join(TEST_SKILLS_DIR, 'uncached.yaml');
      await fs.writeFile(
        filePath,
        `id: uncached-skill
name: Uncached Skill
description: An uncached skill
version: 1.0.0
domain: testing
systemPrompt: |
  This is a test system prompt with enough words to pass validation successfully.
  It needs at least twenty words to avoid validation errors in our test suite.
`
      );

      await loadSkill(filePath, { cache: false });
      expect(getCacheSize()).toBe(0);
    });
  });

  describe('loadSkillById', () => {
    it('should load skill by ID', async () => {
      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'architecture.yaml'),
        `id: architecture
name: Architecture Expert
description: Software architecture expert
version: 1.0.0
domain: engineering
systemPrompt: |
  You are an architecture expert with deep knowledge of system design.
  You provide guidance on scalability, maintainability, and best practices.
`
      );

      const skill = await loadSkillById('architecture', {
        skillsDir: TEST_SKILLS_DIR
      });

      expect(skill.id).toBe('architecture');
      expect(skill.name).toBe('Architecture Expert');
    });
  });

  describe('loadAllSkills', () => {
    it('should load all skills from directory', async () => {
      // Create multiple skill files
      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'skill1.yaml'),
        `id: skill1
name: Skill 1
description: First skill
version: 1.0.0
domain: test
systemPrompt: |
  This is skill 1 with enough words to pass validation tests successfully.
  It must have at least twenty words to avoid validation errors here.
`
      );

      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'skill2.yaml'),
        `id: skill2
name: Skill 2
description: Second skill
version: 1.0.0
domain: test
systemPrompt: |
  This is skill 2 with enough words to pass validation tests successfully.
  It must have at least twenty words to avoid validation errors here.
`
      );

      const skills = await loadAllSkills({ skillsDir: TEST_SKILLS_DIR });

      expect(skills.size).toBe(2);
      expect(skills.has('skill1')).toBe(true);
      expect(skills.has('skill2')).toBe(true);
    });

    it('should skip invalid skills but load valid ones', async () => {
      // Create one valid and one invalid skill
      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'valid.yaml'),
        `id: valid
name: Valid Skill
description: A valid skill
version: 1.0.0
domain: test
systemPrompt: |
  Valid system prompt with enough words to pass validation successfully here.
  This needs to be at least twenty words long to meet requirements.
`
      );

      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'invalid.yaml'),
        `id: invalid
name: Invalid Skill
# Missing required fields
`
      );

      const skills = await loadAllSkills({ skillsDir: TEST_SKILLS_DIR });

      expect(skills.size).toBe(1);
      expect(skills.has('valid')).toBe(true);
      expect(skills.has('invalid')).toBe(false);
    });

    it('should throw error if skills directory does not exist', async () => {
      await expect(
        loadAllSkills({ skillsDir: './non-existent-dir' })
      ).rejects.toThrow('Skills directory not found');
    });
  });

  describe('getAvailableSkills', () => {
    it('should return skill metadata without full content', async () => {
      await fs.writeFile(
        path.join(TEST_SKILLS_DIR, 'meta-skill.yaml'),
        `id: meta-skill
name: Meta Skill
description: Skill for metadata test
version: 2.0.0
domain: metadata
keywords:
  - test
  - metadata
tags:
  - testing
author: Test Author
systemPrompt: |
  This is a system prompt that should not appear in metadata responses at all.
  It must be at least twenty words long to pass our validation rules.
`
      );

      const metadata = await getAvailableSkills({ skillsDir: TEST_SKILLS_DIR });

      expect(metadata).toHaveLength(1);
      expect(metadata[0].id).toBe('meta-skill');
      expect(metadata[0].name).toBe('Meta Skill');
      expect(metadata[0].version).toBe('2.0.0');
      expect(metadata[0].keywords).toEqual(['test', 'metadata']);
      expect(metadata[0].author).toBe('Test Author');
      expect((metadata[0] as any).systemPrompt).toBeUndefined();
    });
  });

  describe('Cache management', () => {
    it('should clear cache', async () => {
      const filePath = path.join(TEST_SKILLS_DIR, 'cache-test.yaml');
      await fs.writeFile(
        filePath,
        `id: cache-test
name: Cache Test
description: Testing cache
version: 1.0.0
domain: test
systemPrompt: |
  System prompt for cache test with enough words to pass validation here successfully.
  We need at least twenty words for this to work properly.
`
      );

      await loadSkill(filePath, { cache: true });
      expect(getCacheSize()).toBeGreaterThan(0);

      clearSkillCache();
      expect(getCacheSize()).toBe(0);
    });
  });
});

describe('Real Skills Integration', () => {
  // Skills are at repo root, so from roundtable-cli we need to go up one level
  const REAL_SKILLS_DIR = '../.roundtable/skills';

  it('should load architecture skill from real directory', async () => {
    const skill = await loadSkillById('architecture', {
      skillsDir: REAL_SKILLS_DIR
    });

    expect(skill.id).toBe('architecture');
    expect(skill.name).toContain('Architecture');
    expect(skill.domain).toBe('engineering');
    expect(skill.systemPrompt.length).toBeGreaterThan(100);
  });

  it('should load all 5 example skills', async () => {
    const skills = await loadAllSkills({ skillsDir: REAL_SKILLS_DIR });

    expect(skills.size).toBeGreaterThanOrEqual(5);
    expect(skills.has('architecture')).toBe(true);
    expect(skills.has('security')).toBe(true);
    expect(skills.has('ux')).toBe(true);
    expect(skills.has('product')).toBe(true);
    expect(skills.has('data-engineering')).toBe(true);
  });

  it('should validate all example skills', async () => {
    const skills = await loadAllSkills({ skillsDir: REAL_SKILLS_DIR });

    for (const [id, skill] of skills.entries()) {
      const validation = validateSkill(skill);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
      // Optionally log warnings
      if (validation.warnings.length > 0) {
        console.log(`Warnings for ${id}:`, validation.warnings);
      }
    }
  });
});
