/**
 * Session management - save/load sessions to JSON files
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Session } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SessionManager {
  private sessionsDir: string;

  constructor() {
    // Sessions directory relative to project root
    this.sessionsDir = path.join(__dirname, '..', 'sessions');
  }

  async saveSession(session: Session): Promise<string> {
    try {
      // Ensure sessions directory exists
      await fs.mkdir(this.sessionsDir, { recursive: true });

      const filename = `${session.id}.json`;
      const filepath = path.join(this.sessionsDir, filename);

      // Convert session to JSON (handle Date serialization)
      const sessionData = JSON.stringify(session, null, 2);

      await fs.writeFile(filepath, sessionData, 'utf-8');

      return filepath;
    } catch (error) {
      throw new Error(`Failed to save session: ${error}`);
    }
  }

  async loadSession(sessionId: string): Promise<Session> {
    try {
      const filename = `${sessionId}.json`;
      const filepath = path.join(this.sessionsDir, filename);

      const sessionData = await fs.readFile(filepath, 'utf-8');
      const session = JSON.parse(sessionData) as Session;

      // Re-hydrate Date objects
      session.createdAt = new Date(session.createdAt);
      session.rounds = session.rounds.map(round => ({
        ...round,
        timestamp: new Date(round.timestamp)
      }));

      return session;
    } catch (error) {
      throw new Error(`Failed to load session: ${error}`);
    }
  }

  async listSessions(): Promise<Session[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      const jsonFiles = files.filter(f => f.endsWith('.json'));

      const sessions = await Promise.all(
        jsonFiles.map(async (file) => {
          const filepath = path.join(this.sessionsDir, file);
          const data = await fs.readFile(filepath, 'utf-8');
          const session = JSON.parse(data) as Session;
          session.createdAt = new Date(session.createdAt);
          return session;
        })
      );

      // Sort by creation date (newest first)
      return sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      // If directory doesn't exist yet, return empty array
      return [];
    }
  }
}
