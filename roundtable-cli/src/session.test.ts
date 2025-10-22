/**
 * Unit tests for SessionManager
 * Tests file-based session storage without API calls
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SessionManager } from './session.js';
import type { Session } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test session directory
const TEST_SESSIONS_DIR = path.join(__dirname, '..', 'sessions-test');

describe('SessionManager', () => {
  let sessionManager: SessionManager;

  // Create test session helper
  const createTestSession = (id: string = 'test-session-123'): Session => ({
    id,
    createdAt: new Date('2024-10-22T10:00:00Z'),
    prompt: 'Test prompt for unit testing',
    rounds: [
      {
        number: 1,
        responses: [
          {
            agentId: 'agent-1',
            agentName: 'Test Agent 1',
            content: 'First response from agent 1',
            tokensUsed: 100,
            context: { sawOtherResponses: false }
          },
          {
            agentId: 'agent-2',
            agentName: 'Test Agent 2',
            content: 'First response from agent 2',
            tokensUsed: 120,
            context: { sawOtherResponses: false }
          }
        ],
        timestamp: new Date('2024-10-22T10:00:10Z')
      },
      {
        number: 2,
        responses: [
          {
            agentId: 'agent-1',
            agentName: 'Test Agent 1',
            content: 'Second response from agent 1',
            tokensUsed: 110,
            context: {
              sawOtherResponses: true,
              otherResponseIds: ['agent-2']
            }
          },
          {
            agentId: 'agent-2',
            agentName: 'Test Agent 2',
            content: 'Second response from agent 2',
            tokensUsed: 115,
            context: {
              sawOtherResponses: true,
              otherResponseIds: ['agent-1']
            }
          }
        ],
        timestamp: new Date('2024-10-22T10:00:20Z')
      }
    ],
    metadata: {
      tokensUsed: 445,
      duration: 20000,
      agentCount: 2,
      roundCount: 2
    }
  });

  beforeEach(async () => {
    sessionManager = new SessionManager();
    // Clean up sessions directory before each test
    const sessionsDir = path.join(__dirname, '..', 'sessions');
    try {
      await fs.rm(sessionsDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore if doesn't exist
    }
  });

  afterEach(async () => {
    // Clean up sessions directory after each test
    const sessionsDir = path.join(__dirname, '..', 'sessions');
    try {
      await fs.rm(sessionsDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore if doesn't exist
    }
  });

  describe('saveSession', () => {
    it('should save session to JSON file', async () => {
      const session = createTestSession();
      const filepath = await sessionManager.saveSession(session);

      expect(filepath).toContain('test-session-123.json');

      // Verify file exists
      const fileContent = await fs.readFile(filepath, 'utf-8');
      const savedSession = JSON.parse(fileContent);

      expect(savedSession.id).toBe('test-session-123');
      expect(savedSession.prompt).toBe('Test prompt for unit testing');
      expect(savedSession.rounds).toHaveLength(2);
    });

    it('should create sessions directory if it does not exist', async () => {
      const session = createTestSession('new-session-456');
      const filepath = await sessionManager.saveSession(session);

      expect(filepath).toBeTruthy();

      // Verify directory was created
      const dirExists = await fs.stat(path.dirname(filepath));
      expect(dirExists.isDirectory()).toBe(true);
    });

    it('should serialize Date objects correctly', async () => {
      const session = createTestSession();
      const filepath = await sessionManager.saveSession(session);

      const fileContent = await fs.readFile(filepath, 'utf-8');
      const savedSession = JSON.parse(fileContent);

      // Dates should be serialized as ISO strings
      expect(typeof savedSession.createdAt).toBe('string');
      expect(savedSession.createdAt).toBe('2024-10-22T10:00:00.000Z');
    });
  });

  describe('loadSession', () => {
    it('should load and deserialize session from JSON file', async () => {
      const originalSession = createTestSession('load-test-789');
      await sessionManager.saveSession(originalSession);

      const loadedSession = await sessionManager.loadSession('load-test-789');

      expect(loadedSession.id).toBe('load-test-789');
      expect(loadedSession.prompt).toBe('Test prompt for unit testing');
      expect(loadedSession.rounds).toHaveLength(2);
      expect(loadedSession.metadata.tokensUsed).toBe(445);
    });

    it('should re-hydrate Date objects correctly', async () => {
      const originalSession = createTestSession('date-test-101');
      await sessionManager.saveSession(originalSession);

      const loadedSession = await sessionManager.loadSession('date-test-101');

      expect(loadedSession.createdAt).toBeInstanceOf(Date);
      expect(loadedSession.rounds[0].timestamp).toBeInstanceOf(Date);
      expect(loadedSession.rounds[1].timestamp).toBeInstanceOf(Date);
    });

    it('should throw error for non-existent session', async () => {
      await expect(
        sessionManager.loadSession('non-existent-session')
      ).rejects.toThrow('Failed to load session');
    });
  });

  describe('listSessions', () => {
    it('should return empty array when no sessions exist', async () => {
      const sessions = await sessionManager.listSessions();
      expect(sessions).toEqual([]);
    });

    it('should list all saved sessions', async () => {
      const session1 = createTestSession('session-1');
      const session2 = createTestSession('session-2');
      const session3 = createTestSession('session-3');

      await sessionManager.saveSession(session1);
      await sessionManager.saveSession(session2);
      await sessionManager.saveSession(session3);

      const sessions = await sessionManager.listSessions();

      expect(sessions).toHaveLength(3);
      expect(sessions.map(s => s.id)).toContain('session-1');
      expect(sessions.map(s => s.id)).toContain('session-2');
      expect(sessions.map(s => s.id)).toContain('session-3');
    });

    it('should sort sessions by creation date (newest first)', async () => {
      const session1 = createTestSession('old-session');
      session1.createdAt = new Date('2024-10-20T10:00:00Z');

      const session2 = createTestSession('new-session');
      session2.createdAt = new Date('2024-10-22T10:00:00Z');

      const session3 = createTestSession('middle-session');
      session3.createdAt = new Date('2024-10-21T10:00:00Z');

      await sessionManager.saveSession(session1);
      await sessionManager.saveSession(session2);
      await sessionManager.saveSession(session3);

      const sessions = await sessionManager.listSessions();

      expect(sessions[0].id).toBe('new-session');
      expect(sessions[1].id).toBe('middle-session');
      expect(sessions[2].id).toBe('old-session');
    });

    it('should ignore non-JSON files in sessions directory', async () => {
      const session = createTestSession('valid-session');
      await sessionManager.saveSession(session);

      // Create a non-JSON file in sessions directory
      const sessionsDir = path.join(__dirname, '..', 'sessions');
      await fs.writeFile(path.join(sessionsDir, 'README.txt'), 'Test file');

      const sessions = await sessionManager.listSessions();

      expect(sessions).toHaveLength(1);
      expect(sessions[0].id).toBe('valid-session');

      // Clean up
      await fs.unlink(path.join(sessionsDir, 'README.txt'));
    });
  });

  describe('round-trip', () => {
    it('should save and load session with identical data', async () => {
      const originalSession = createTestSession('roundtrip-test');

      await sessionManager.saveSession(originalSession);
      const loadedSession = await sessionManager.loadSession('roundtrip-test');

      // Compare all fields
      expect(loadedSession.id).toBe(originalSession.id);
      expect(loadedSession.prompt).toBe(originalSession.prompt);
      expect(loadedSession.rounds.length).toBe(originalSession.rounds.length);
      expect(loadedSession.metadata.tokensUsed).toBe(originalSession.metadata.tokensUsed);
      expect(loadedSession.metadata.duration).toBe(originalSession.metadata.duration);

      // Compare round data
      expect(loadedSession.rounds[0].number).toBe(1);
      expect(loadedSession.rounds[0].responses[0].agentName).toBe('Test Agent 1');
      expect(loadedSession.rounds[0].responses[0].tokensUsed).toBe(100);

      expect(loadedSession.rounds[1].responses[0].context.sawOtherResponses).toBe(true);
    });
  });
});
