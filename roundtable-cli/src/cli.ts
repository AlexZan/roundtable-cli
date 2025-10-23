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
import { detectPanel } from './panels/selector.js';
import { createAgentsFromPanel, createAgentsFromSkills } from './agents/factory.js';
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

    // Detect panel from user prompt
    console.log('\n🔍 Analyzing your request...\n');

    const detectionResult = await detectPanel(
      { prompt: answers.prompt },
      { panelsDir: '../.roundtable/panels' }
    );

    let agentConfigs: AgentConfig[];
    let panelInfo: { id?: string; name?: string } = {};

    if (detectionResult.panel) {
      // Panel detected
      panelInfo = {
        id: detectionResult.panel.id,
        name: detectionResult.panel.name
      };

      console.log(`✅ Detected: ${detectionResult.panel.name}`);
      console.log(`   Matched keywords: ${detectionResult.matchedKeywords.join(', ')}`);
      console.log(`   Confidence: ${(detectionResult.confidence * 100).toFixed(0)}%\n`);

      // Create agents from panel (Phase 1C Extended: supports multi-model diversity)
      agentConfigs = await createAgentsFromPanel(
        detectionResult.panel,
        { skillsDir: '../.roundtable/skills' }
      );

      // Add panel ID to agent metadata
      agentConfigs.forEach(agent => {
        if (agent.metadata) {
          agent.metadata.panelId = detectionResult.panel!.id;
        }
      });

      // Display agent panel
      if (detectionResult.panel.modelDiversity?.enabled) {
        // Multi-model panel: Group agents by skill
        console.log(`👥 Expert Panel (${agentConfigs.length} agents from ${detectionResult.panel.skillIds.length} skills):\n`);

        const agentsBySkill = new Map<string, typeof agentConfigs>();
        for (const agent of agentConfigs) {
          const skillId = agent.metadata?.skillId || 'unknown';
          if (!agentsBySkill.has(skillId)) {
            agentsBySkill.set(skillId, []);
          }
          agentsBySkill.get(skillId)!.push(agent);
        }

        for (const [skillId, agents] of agentsBySkill) {
          const skillDomain = agents[0]?.metadata?.skillDomain || 'general';
          console.log(`   ${skillDomain} (${agents.length} agents):`);
          for (const agent of agents) {
            const modelName = agent.model;
            console.log(`     • ${agent.name} - ${modelName}`);
          }
          console.log('');
        }
      } else {
        // Single-model panel: Display flat list
        console.log(`👥 Expert Panel (${agentConfigs.length} experts):`);
        for (const agent of agentConfigs) {
          const skillDomain = agent.metadata?.skillDomain || 'general';
          const modelName = agent.model;
          console.log(`   • ${agent.name} (${skillDomain}) - ${modelName}`);
        }
        console.log('');
      }

    } else {
      // No panel detected - use fallback
      console.log(`⚠️  No panel matched. Using default experts.\n`);

      agentConfigs = await createAgentsFromSkills(
        ['architecture', 'product'],
        { skillsDir: '../.roundtable/skills' }
      );
    }

    console.log(`📋 Your prompt: "${answers.prompt}"\n`);

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

      // Add panel metadata to session
      if (panelInfo.id) {
        session.metadata.panelId = panelInfo.id;
        session.metadata.panelName = panelInfo.name;
      }

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
