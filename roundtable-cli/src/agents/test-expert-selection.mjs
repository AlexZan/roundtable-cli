/**
 * Test natural language expert selection parsing
 */

import {
  parseExpertSelection,
  formatSelectionResult
} from './expert-selection.js';

console.log('🧪 Testing Natural Language Expert Selection\n');

// Sample recommendations to test with
const recommendations = [
  { skillId: 'architecture', reason: 'technical design' },
  { skillId: 'security', reason: 'user data protection' },
  { skillId: 'ux', reason: 'user experience' },
  { skillId: 'data-engineering', reason: 'analytics pipelines' }
];

/**
 * Run a test case
 */
function testSelection(input, expectedSkillIds, description) {
  const result = parseExpertSelection(input, recommendations);
  const match = JSON.stringify(result.selectedSkillIds.sort()) ===
                JSON.stringify(expectedSkillIds.sort());

  console.log(`${match ? '✅' : '❌'} ${description}`);
  console.log(`   Input: "${input}"`);
  console.log(`   Expected: [${expectedSkillIds.join(', ')}]`);
  console.log(`   Got: [${result.selectedSkillIds.join(', ')}]`);
  if (!match) {
    console.log(`   ⚠️  MISMATCH`);
  }
  console.log();

  return match;
}

// Test Suite
console.log('='.repeat(60));
console.log('ACCEPT ALL PATTERNS');
console.log('='.repeat(60) + '\n');

testSelection('yes', ['architecture', 'security', 'ux', 'data-engineering'], 'Simple "yes"');
testSelection('all', ['architecture', 'security', 'ux', 'data-engineering'], 'Simple "all"');
testSelection('all of them', ['architecture', 'security', 'ux', 'data-engineering'], '"all of them"');
testSelection('bring in all', ['architecture', 'security', 'ux', 'data-engineering'], '"bring in all"');
testSelection('okay', ['architecture', 'security', 'ux', 'data-engineering'], '"okay"');

console.log('='.repeat(60));
console.log('REJECT ALL PATTERNS');
console.log('='.repeat(60) + '\n');

testSelection('no', [], 'Simple "no"');
testSelection('none', [], 'Simple "none"');
testSelection('skip', [], 'Simple "skip"');
testSelection('none of them', [], '"none of them"');

console.log('='.repeat(60));
console.log('POSITION-BASED SELECTION');
console.log('='.repeat(60) + '\n');

testSelection('first two', ['architecture', 'security'], '"first two"');
testSelection('first one', ['architecture'], '"first one"');
testSelection('last one', ['data-engineering'], '"last one"');
testSelection('first three', ['architecture', 'security', 'ux'], '"first three"');
testSelection('the first 2', ['architecture', 'security'], '"the first 2"');
testSelection('bring in the first two', ['architecture', 'security'], '"bring in the first two"');

console.log('='.repeat(60));
console.log('SKILL NAME SELECTION');
console.log('='.repeat(60) + '\n');

testSelection('just architecture', ['architecture'], '"just architecture"');
testSelection('architecture and security', ['architecture', 'security'], '"architecture and security"');
testSelection('security', ['security'], 'Single skill "security"');
testSelection('ux and data-engineering', ['ux', 'data-engineering'], 'Hyphenated skill');

console.log('='.repeat(60));
console.log('COMPLEX PATTERNS');
console.log('='.repeat(60) + '\n');

testSelection(
  'architecture and security but not ux',
  ['architecture', 'security'],
  '"but not" exclusion'
);

testSelection(
  'all except data-engineering',
  ['architecture', 'security', 'ux'],
  '"except" exclusion'
);

console.log('='.repeat(60));
console.log('EDGE CASES');
console.log('='.repeat(60) + '\n');

testSelection('', [], 'Empty string');
testSelection('maybe', [], 'Unclear input');
testSelection('i dont know', [], 'Unclear phrase');

console.log('='.repeat(60));
console.log('✅ All tests completed');
console.log('='.repeat(60));
