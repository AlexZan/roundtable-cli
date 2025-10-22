#!/usr/bin/env node

/**
 * Roundtable CLI - Entry point
 * Phase 1 Foundation Prototype
 */

import 'dotenv/config';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { DebateEngine } from './debate/engine.js';
import { SessionManager } from './session.js';
import { getApiKey } from './config.js';
import type { AgentConfig } from './types.js';

const program = new Command();

program
  .name('roundtable')
  .description('Multi-model AI deliberation system')
  .version('0.1.0');

program
  .command('start')
  .description('Start a new Roundtable deliberation session')
  .action(async () => {
    console.log('\n🎯 Welcome to Roundtable - Multi-model AI Deliberation\n');

    // Get and validate API key
    try {
      getApiKey();
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }

    // User intake
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'prompt',
        message: 'What would you like to build?',
        validate: (input: string) => input.length > 0 || 'Please enter a description'
      },
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Ready to start deliberation?',
        default: true
      }
    ]);

    if (!answers.proceed) {
      console.log('\n👋 Session cancelled\n');
      return;
    }

    // Configure agents for prototype (2 simple agents)
    // Using Haiku 4.5 for cost-effective testing ($1/$5 per MTok vs Sonnet's $3/$15)
    const agentConfigs: AgentConfig[] = [
      {
        id: 'agent-1',
        name: 'Architecture Expert',
        model: 'claude-haiku-4-5-20251001',
        systemPrompt: `You are an architecture expert participating in a deliberation about a software project.

Analyze the project from an architecture perspective:
- Consider scalability, maintainability, and technical constraints
- Identify potential technical challenges
- Suggest architectural patterns that fit the requirements

Keep your response focused and concise (2-3 paragraphs).`
      },
      {
        id: 'agent-2',
        name: 'Product Expert',
        model: 'claude-haiku-4-5-20251001',
        systemPrompt: `You are a product expert participating in a deliberation about a software project.

Analyze the project from a product perspective:
- Consider user needs and market fit
- Identify core features vs nice-to-haves
- Suggest a phased rollout approach

Keep your response focused and concise (2-3 paragraphs).`
      }
    ];

    console.log('\n🤖 Initializing deliberation with 2 agents...\n');
    console.log(`   📋 Your prompt: "${answers.prompt}"\n`);

    // Create debate engine and session manager
    const debateEngine = new DebateEngine({
      maxRounds: 2,
      agentConfigs
    });

    const sessionManager = new SessionManager();

    try {
      // Run the debate
      console.log('⚙️  Running Round 1...\n');
      const session = await debateEngine.runDebate(answers.prompt);

      // Display results
      console.log('\n📊 Deliberation Complete!\n');
      console.log('═'.repeat(60));

      for (const round of session.rounds) {
        console.log(`\n🔄 Round ${round.number}:\n`);

        for (const response of round.responses) {
          console.log(`\n👤 ${response.agentName}:`);
          console.log(`   ${response.content.substring(0, 200)}...`);
          console.log(`   (Tokens: ${response.tokensUsed})`);
        }
        console.log('\n' + '─'.repeat(60));
      }

      // Summary
      console.log(`\n📈 Session Summary:`);
      console.log(`   Total Rounds: ${session.metadata.roundCount}`);
      console.log(`   Total Tokens: ${session.metadata.tokensUsed}`);
      console.log(`   Duration: ${(session.metadata.duration / 1000).toFixed(1)}s`);

      // Save session
      const savedPath = await sessionManager.saveSession(session);
      console.log(`\n💾 Session saved: ${savedPath}\n`);

    } catch (error: any) {
      // Display the error message (already formatted by ClaudeClient)
      console.error(error.message || error);
      console.log('\n💡 Need help? Check the troubleshooting section in README.md\n');
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List previous sessions')
  .action(async () => {
    const sessionManager = new SessionManager();
    const sessions = await sessionManager.listSessions();

    if (sessions.length === 0) {
      console.log('\n📁 No previous sessions found\n');
      return;
    }

    console.log(`\n📁 Previous Sessions (${sessions.length}):\n`);
    for (const session of sessions) {
      console.log(`   ${session.id}`);
      console.log(`   Created: ${new Date(session.createdAt).toLocaleString()}`);
      console.log(`   Prompt: "${session.prompt.substring(0, 60)}..."`);
      console.log('');
    }
  });

program.parse();
