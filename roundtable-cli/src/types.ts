/**
 * Core type definitions for Roundtable CLI prototype
 */

export interface Session {
  id: string;
  createdAt: Date;
  prompt: string;
  rounds: Round[];
  metadata: SessionMetadata;
}

export interface SessionMetadata {
  tokensUsed: number;
  duration: number; // milliseconds
  agentCount: number;
  roundCount: number;
  panelId?: string; // Panel used (if applicable)
  panelName?: string; // Human-readable panel name
  startTime?: number; // Internal tracking for duration calculation
  composedSkills?: string[]; // Skills selected by Meeting Facilitator
  facilitatorReasoning?: string; // Why these skills were chosen
  agentAdditions?: Array<{
    roundNumber: number; // Which round they were added before
    agentIds: string[];
    agentNames: string[];
  }>; // Track dynamically added agents
}

export interface Round {
  number: number;
  responses: AgentResponse[];
  timestamp: Date;
}

export interface AgentResponse {
  agentId: string;
  agentName: string;
  content: string;
  tokensUsed: number;
  context: ResponseContext;
  metadata?: {
    skillId?: string;
    skillDomain?: string;
    model?: string;
  };
}

export interface ResponseContext {
  sawOtherResponses: boolean; // Round 2+ sees Round 1 responses
  otherResponseIds?: string[]; // Which responses did this agent see?
}

export interface DebateConfig {
  maxRounds: number;
  agentConfigs: AgentConfig[];
}

export interface AgentConfig {
  id: string;
  name: string;
  model: string; // e.g., "claude-3-sonnet"
  systemPrompt: string;
  metadata?: {
    skillId?: string;
    skillVersion?: string;
    skillDomain?: string;
    panelId?: string;
  };
}

export interface LLMRequest {
  prompt: string;
  systemPrompt: string;
  context?: string; // Previous round responses
  maxTokens?: number;
}

export interface LLMResponse {
  content: string;
  tokensUsed: number;
}
