import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getApiKey, validateApiKeyFormat } from './config.js';

describe('Config Module', () => {
  const originalEnv = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    // Clear the environment variable before each test
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    // Restore the original environment variable
    if (originalEnv) {
      process.env.ANTHROPIC_API_KEY = originalEnv;
    } else {
      delete process.env.ANTHROPIC_API_KEY;
    }
  });

  describe('getApiKey()', () => {
    it('should return the API key when ANTHROPIC_API_KEY is set', () => {
      const testKey = 'sk-ant-test-1234567890';
      process.env.ANTHROPIC_API_KEY = testKey;

      const key = getApiKey();
      expect(key).toBe(testKey);
    });

    it('should throw an error when ANTHROPIC_API_KEY is not set', () => {
      delete process.env.ANTHROPIC_API_KEY;

      expect(() => getApiKey()).toThrow();
      expect(() => getApiKey()).toThrowError(/ANTHROPIC_API_KEY/i);
    });

    it('should throw an error when API key format is invalid', () => {
      // Key doesn't start with "sk-ant-"
      process.env.ANTHROPIC_API_KEY = 'invalid-key-format';

      expect(() => getApiKey()).toThrow();
      expect(() => getApiKey()).toThrowError(/format.*invalid/i);
    });

    it('should throw an error when API key is too short', () => {
      // Starts with "sk-ant-" but is too short
      process.env.ANTHROPIC_API_KEY = 'sk-ant-abc';

      expect(() => getApiKey()).toThrow();
      expect(() => getApiKey()).toThrowError(/format.*invalid/i);
    });

    it('error message should include setup instructions', () => {
      delete process.env.ANTHROPIC_API_KEY;

      try {
        getApiKey();
      } catch (error: any) {
        expect(error.message).toContain('console.anthropic.com');
        expect(error.message).toContain('export ANTHROPIC_API_KEY');
        expect(error.message).toContain('$env:ANTHROPIC_API_KEY');
      }
    });
  });

  describe('validateApiKeyFormat()', () => {
    it('should return true for valid API keys', () => {
      const validKey = 'sk-ant-v0cJq5vU9cMtestkeythatislongenough';
      expect(validateApiKeyFormat(validKey)).toBe(true);
    });

    it('should return false for keys that do not start with sk-ant-', () => {
      expect(validateApiKeyFormat('sk-openai-test')).toBe(false);
      expect(validateApiKeyFormat('invalid-key')).toBe(false);
    });

    it('should return false for keys that are too short', () => {
      expect(validateApiKeyFormat('sk-ant-abc')).toBe(false);
      expect(validateApiKeyFormat('sk-ant-')).toBe(false);
    });

    it('should return true for realistic Anthropic API keys', () => {
      // These are realistic-looking keys (not real ones)
      const realisticKey = 'sk-ant-v0cJq5vU9cMtY7xK2wP3qRs4tUvWxYzAbCdEfGhIjKlMnOpQr';
      expect(validateApiKeyFormat(realisticKey)).toBe(true);
    });
  });
});
