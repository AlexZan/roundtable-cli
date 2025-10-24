/**
 * Test expert recommendation parsing
 */

import {
  containsExpertRecommendations,
  parseExpertRecommendations,
  formatRecommendationsForUser
} from './expert-recommendations.js';

console.log('🧪 Testing Expert Recommendation Parsing\n');

// Test 1: Detect recommendations
console.log('Test 1: Detect recommendations');
const responseWithRecs = `
Based on what you've shared, I think we have enough context to move forward.

I recommend we bring in:
 - architecture (for technical design and system scalability)
 - security (for user data protection and authentication)
 - ux (for user experience and interface design)

These experts will help us design a robust solution.
`;

const hasRecs = containsExpertRecommendations(responseWithRecs);
console.log(`  Contains recommendations: ${hasRecs ? '✅' : '❌'} ${hasRecs}`);

// Test 2: Detect no recommendations
console.log('\nTest 2: Detect no recommendations');
const responseNoRecs = `
That's a great idea! Let me ask a few more questions to understand better.

What is your target user base?
`;

const hasNoRecs = containsExpertRecommendations(responseNoRecs);
console.log(`  Contains recommendations: ${!hasNoRecs ? '✅' : '❌'} ${hasNoRecs}`);

// Test 3: Parse recommendations
console.log('\nTest 3: Parse recommendations');
const parsed = parseExpertRecommendations(responseWithRecs);
console.log(`  Found ${parsed.length} recommendations:`);

const expectedRecs = [
  { skillId: 'architecture', reason: 'technical design and system scalability' },
  { skillId: 'security', reason: 'user data protection and authentication' },
  { skillId: 'ux', reason: 'user experience and interface design' }
];

let allMatch = true;
parsed.forEach((rec, index) => {
  const expected = expectedRecs[index];
  const match = rec.skillId === expected.skillId && rec.reason === expected.reason;
  console.log(`  ${match ? '✅' : '❌'} ${rec.skillId}: ${rec.reason}`);
  if (!match) {
    console.log(`     Expected: ${expected.skillId}: ${expected.reason}`);
    allMatch = false;
  }
});

// Test 4: Parse with hyphenated skill IDs
console.log('\nTest 4: Parse hyphenated skill IDs');
const responseHyphenated = `
I recommend we bring in:
 - data-engineering (for analytics and data pipeline design)
 - ml-ops (for model deployment and monitoring)
`;

const parsedHyphenated = parseExpertRecommendations(responseHyphenated);
console.log(`  Found ${parsedHyphenated.length} recommendations:`);
parsedHyphenated.forEach(rec => {
  const validId = /^[\w-]+$/.test(rec.skillId);
  console.log(`  ${validId ? '✅' : '❌'} ${rec.skillId}: ${rec.reason}`);
});

// Test 5: Format for user
console.log('\nTest 5: Format for user display');
const formatted = formatRecommendationsForUser(parsed, 'Product Manager');
console.log(formatted);

// Summary
console.log('\n' + '='.repeat(60));
console.log(`✅ All tests completed`);
console.log('='.repeat(60));
