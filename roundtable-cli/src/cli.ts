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
import { MeetingFacilitator } from './agents/meeting-facilitator.js';
import { createAgentsFromSkills } from './agents/factory.js';
import { selectModels, showModelSelectionSummary } from './config/model-selector.js';
import {
  containsExpertRecommendations,
  parseExpertRecommendations,
  formatRecommendationsForUser
} from './agents/expert-recommendations.js';
import { parseExpertSelection } from './agents/expert-selection.js';
import type { AgentConfig, Round, Session } from './types.js';

/**
 * Display a single round's responses
 */
function displayRound(round: Round): void {
  console.log(`\n🔄 Round ${round.number}:\n`);

  for (const response of round.responses) {
    // Format model name for display
    const modelName = response.metadata?.model ? formatModelName(response.metadata.model) : 'Unknown Model';
    console.log(`\n👤 ${response.agentName} (${modelName}):`);
    console.log(`   ${response.content}`);
    console.log(`   (Tokens: ${response.tokensUsed})`);
  }
}

/**
 * Check for expert recommendations and handle dynamic expert addition
 * Returns true if experts were added, false otherwise
 */
async function handleExpertRecommendations(
  round: Round,
  session: Session,
  debateEngine: DebateEngine
): Promise<boolean> {
  // Check each agent's response for expert recommendations
  for (const response of round.responses) {
    if (containsExpertRecommendations(response.content)) {
      const recommendations = parseExpertRecommendations(response.content);

      if (recommendations.length === 0) {
        continue; // False positive, no actual recommendations
      }

      // Display recommendations to user
      console.log(formatRecommendationsForUser(recommendations, response.agentName));

      // Prompt user for selection
      const { selection } = await inquirer.prompt([
        {
          type: 'input',
          name: 'selection',
          message: 'Which experts would you like to add? (e.g., "first two", "all", "architecture and security", "none"):',
          default: 'all'
        }
      ]);

      // Parse user's selection
      const selectionResult = parseExpertSelection(selection, recommendations);

      if (selectionResult.rejectedAll || selectionResult.selectedSkillIds.length === 0) {
        console.log('\n⏭️  Continuing without adding new experts\n');
        return false;
      }

      // Create agents from selected skills
      console.log(`\n🔄 Adding ${selectionResult.selectedSkillIds.length} expert(s)...\n`);

      try {
        const newAgentConfigs = await createAgentsFromSkills(
          selectionResult.selectedSkillIds,
          { skillsDir: '../.roundtable/skills' }
        );

        // Add agents to debate engine
        debateEngine.addAgents(session, newAgentConfigs);

        // Display added experts
        console.log(`✅ Added ${newAgentConfigs.length} expert(s) to the panel:\n`);
        for (const agent of newAgentConfigs) {
          const skillDomain = agent.metadata?.skillDomain || 'general';
          console.log(`   • ${agent.name} (${skillDomain})`);
        }
        console.log('');

        return true;
      } catch (error: any) {
        console.error(`\n❌ Error adding experts: ${error.message}\n`);
        return false;
      }
    }
  }

  return false; // No recommendations found
}

/**
 * Format model identifier into a human-readable name
 */
function formatModelName(model: string): string {
  // Handle Claude models
  if (model.includes('claude')) {
    if (model.includes('sonnet-4')) return 'Claude Sonnet 4';
    if (model.includes('haiku-4-5')) return 'Claude Haiku 4.5';
    if (model.includes('haiku-4')) return 'Claude Haiku 4';
    if (model.includes('opus')) return 'Claude Opus';
    return 'Claude';
  }

  // Handle OpenAI models
  if (model.includes('gpt-4-turbo')) return 'GPT-4 Turbo';
  if (model.includes('gpt-4')) return 'GPT-4';
  if (model.includes('gpt-3.5')) return 'GPT-3.5';

  // Handle Gemini models
  if (model.includes('gemini')) {
    if (model.includes('pro')) return 'Gemini Pro';
    return 'Gemini';
  }

  // Fallback: return original model name
  return model;
}

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

    // First-run: Prompt for model selection if preferences don't exist
    const { needsFirstTimeSetup } = await import('./config/model-selector.js');
    if (await needsFirstTimeSetup()) {
      console.log('👋 First time setup: Let\'s select which models you want to use\n');
      const preferences = await selectModels();
      showModelSelectionSummary(preferences);
    }

    // User intake - get topic first
    const { prompt: userPrompt } = await inquirer.prompt([
      {
        type: 'input',
        name: 'prompt',
        message: 'What would you like to discuss at the roundtable today?',
        validate: (input: string) => input.length > 0 || 'Please enter a topic'
      }
    ]);

    // Use Meeting Facilitator to compose panel dynamically
    console.log('\n🤝 Meeting Facilitator is analyzing your request...\n');

    const facilitator = new MeetingFacilitator();
    const composition = await facilitator.composePanel(userPrompt, {
      skillsDir: '../.roundtable/skills'
    });

    // Check if any skills were selected
    if (composition.skillIds.length === 0) {
      // No available skills matched
      console.log('⚠️  No suitable experts available for this topic.\n');
      console.log(`💡 ${composition.reasoning}\n`);

      if (composition.missingSkills && composition.missingSkills.length > 0) {
        console.log('📋 Suggested skills to create:\n');
        for (const missing of composition.missingSkills) {
          console.log(`   • ${missing.name} (${missing.id})`);
          console.log(`     ${missing.reason}\n`);
        }
        console.log('Create these skill files in .roundtable/skills/ to discuss this topic.\n');
      }

      console.log('👋 Cannot proceed without relevant experts. Exiting.\n');
      return;
    }

    // Display panel composition
    console.log('✅ Expert panel composed:\n');
    console.log(`   ${composition.reasoning}\n`);

    // Display missing skills if any
    if (composition.missingSkills && composition.missingSkills.length > 0) {
      console.log('💡 Additional expertise that would be helpful:\n');
      for (const missing of composition.missingSkills) {
        console.log(`   • ${missing.name}: ${missing.reason}`);
      }
      console.log('');
    }

    // Create agents from composed skill list
    const agentConfigs = await createAgentsFromSkills(
      composition.skillIds,
      { skillsDir: '../.roundtable/skills' }
    );

    // Display agent panel
    console.log(`👥 Expert Panel (${agentConfigs.length} experts):\n`);
    for (const agent of agentConfigs) {
      const skillDomain = agent.metadata?.skillDomain || 'general';
      const modelName = agent.model;
      console.log(`   • ${agent.name} (${skillDomain}) - ${modelName}`);
    }
    console.log('');

    // Now that panel composition is shown, ask if ready to proceed
    const { proceed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Ready to start deliberation?',
        default: true
      }
    ]);

    if (!proceed) {
      console.log('\n👋 Session cancelled\n');
      return;
    }

    console.log(`\n📋 Your prompt: "${userPrompt}"\n`);

    // Create debate engine and session manager
    const debateEngine = new DebateEngine({
      maxRounds: 10, // Safety limit for interactive mode
      agentConfigs
    });

    const sessionManager = new SessionManager();

    try {
      // Create session for interactive debate
      console.log('⚙️  Running Round 1...\n');
      const session = debateEngine.createSession(userPrompt);

      // Add panel composition metadata to session
      session.metadata.composedSkills = composition.skillIds;
      session.metadata.facilitatorReasoning = composition.reasoning;

      // Round 1: Initial responses
      await debateEngine.executeNextRound(session);

      // Display Round 1 results
      displayRound(session.rounds[0]);

      // Check for expert recommendations after Round 1
      await handleExpertRecommendations(session.rounds[0], session, debateEngine);

      // Interactive rounds loop
      let continueDebate = true;
      while (continueDebate && session.rounds.length < debateEngine['config'].maxRounds) {
        console.log('\n' + '─'.repeat(60));

        const { userInput } = await inquirer.prompt([
          {
            type: 'input',
            name: 'userInput',
            message: 'Your feedback (or type /complete to finish):',
            default: ''
          }
        ]);

        // Check if user wants to complete
        if (userInput.trim() === '/complete' || userInput.trim() === '') {
          continueDebate = false;
          break;
        }

        // Run next round with user feedback
        console.log(`\n⚙️  Running Round ${session.rounds.length + 1}...\n`);
        await debateEngine.executeNextRound(session, userInput);

        // Display latest round
        const latestRound = session.rounds[session.rounds.length - 1];
        displayRound(latestRound);

        // Check for expert recommendations after each round
        await handleExpertRecommendations(latestRound, session, debateEngine);
      }

      // Finalize session
      debateEngine.finalizeSession(session);

      // Display completion message
      console.log('\n📊 Deliberation Complete!\n');
      console.log('═'.repeat(60));

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

program
  .command('models')
  .description('Select which LLM models to use')
  .action(async () => {
    console.log('\n🤖 Model Selection\n');

    try {
      // Show interactive model selector
      const preferences = await selectModels();

      // Show summary
      showModelSelectionSummary(preferences);
    } catch (error: any) {
      console.error(`\n❌ Error: ${error.message}\n`);
      process.exit(1);
    }
  });

program.parse();
