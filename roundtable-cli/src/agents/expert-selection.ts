/**
 * Natural Language Expert Selection Parser
 *
 * Parses user's natural language responses to expert recommendations.
 * Supports patterns like:
 * - "bring in the first two"
 * - "just architecture"
 * - "all of them"
 * - "architecture and security but not ux"
 * - "yes" / "no"
 */

import type { ExpertRecommendation } from './expert-recommendations.js';

export interface SelectionResult {
  /** Selected skill IDs */
  selectedSkillIds: string[];

  /** Whether all recommendations were accepted */
  acceptedAll: boolean;

  /** Whether all recommendations were rejected */
  rejectedAll: boolean;
}

/**
 * Parse natural language expert selection from user input
 *
 * @param userInput - User's natural language response
 * @param recommendations - Available expert recommendations to choose from
 * @returns Parsed selection result
 */
export function parseExpertSelection(
  userInput: string,
  recommendations: ExpertRecommendation[]
): SelectionResult {
  const input = userInput.toLowerCase().trim();

  // Pattern 1: Accept all
  if (matchesAcceptAll(input)) {
    return {
      selectedSkillIds: recommendations.map(r => r.skillId),
      acceptedAll: true,
      rejectedAll: false
    };
  }

  // Pattern 2: Reject all
  if (matchesRejectAll(input)) {
    return {
      selectedSkillIds: [],
      acceptedAll: false,
      rejectedAll: true
    };
  }

  // Pattern 3: Select by position ("first two", "first one", "last one")
  const positionMatch = matchPositionSelection(input, recommendations);
  if (positionMatch) {
    return {
      selectedSkillIds: positionMatch,
      acceptedAll: positionMatch.length === recommendations.length,
      rejectedAll: positionMatch.length === 0
    };
  }

  // Pattern 4: Select by skill name
  const nameMatch = matchSkillNames(input, recommendations);
  if (nameMatch.length > 0) {
    return {
      selectedSkillIds: nameMatch,
      acceptedAll: nameMatch.length === recommendations.length,
      rejectedAll: false
    };
  }

  // Default: If unclear, accept none (user can try again)
  return {
    selectedSkillIds: [],
    acceptedAll: false,
    rejectedAll: true
  };
}

/**
 * Check if input matches "accept all" patterns
 */
function matchesAcceptAll(input: string): boolean {
  const acceptPatterns = [
    /^(yes|yep|yeah|sure|ok|okay)$/,
    /^all( of them)?$/,
    /^bring (in |them )?all$/,
    /^(accept|add) (them )?all$/,
    /^let'?s bring (in |them )?all$/
  ];

  return acceptPatterns.some(pattern => pattern.test(input));
}

/**
 * Check if input matches "reject all" patterns
 */
function matchesRejectAll(input: string): boolean {
  const rejectPatterns = [
    /^(no|nope|none|skip)$/,
    /^none of them$/,
    /^(don'?t|do not) (want|need|bring|add) (any|them)$/,
    /^skip (them )?all$/
  ];

  return rejectPatterns.some(pattern => pattern.test(input));
}

/**
 * Match position-based selection ("first two", "last one", "first and third")
 */
function matchPositionSelection(
  input: string,
  recommendations: ExpertRecommendation[]
): string[] | null {
  // Pattern: "first X" or "first X experts"
  const firstNMatch = input.match(/^(?:bring in |add |select )?(?:the )?first (\w+)(?: experts?)?$/);
  if (firstNMatch) {
    const countWord = firstNMatch[1];
    const count = wordToNumber(countWord);
    if (count !== null) {
      return recommendations.slice(0, count).map(r => r.skillId);
    }
  }

  // Pattern: "last X"
  const lastNMatch = input.match(/^(?:bring in |add |select )?(?:the )?last (\w+)(?: experts?)?$/);
  if (lastNMatch) {
    const countWord = lastNMatch[1];
    const count = wordToNumber(countWord);
    if (count !== null) {
      return recommendations.slice(-count).map(r => r.skillId);
    }
  }

  // Pattern: "first one" / "second one" / "third one"
  const ordinalMatch = input.match(/^(?:bring in |add |select )?(?:the )?(\w+) one$/);
  if (ordinalMatch) {
    const ordinal = ordinalMatch[1];
    const index = ordinalToIndex(ordinal);
    if (index !== null && index < recommendations.length) {
      return [recommendations[index].skillId];
    }
  }

  // Pattern: "1 and 2" or "first and second"
  const multiMatch = input.match(/^(?:bring in |add |select )?(?:the )?(\w+) and (\w+)(?: ones?)?$/);
  if (multiMatch) {
    const first = ordinalToIndex(multiMatch[1]);
    const second = ordinalToIndex(multiMatch[2]);
    if (first !== null && second !== null) {
      const selected = [];
      if (first < recommendations.length) selected.push(recommendations[first].skillId);
      if (second < recommendations.length) selected.push(recommendations[second].skillId);
      return selected;
    }
  }

  return null;
}

/**
 * Match skill names in the input
 * Handles patterns like "just architecture", "security and ux", "architecture but not security"
 */
function matchSkillNames(
  input: string,
  recommendations: ExpertRecommendation[]
): string[] {
  const selected: string[] = [];
  const excluded: string[] = [];

  // Extract available skill IDs
  const availableSkills = recommendations.map(r => r.skillId);

  // Check for exclusions first ("but not X", "except X")
  const exclusionPattern = /(?:but not|except|excluding|without) ([\w\s,-]+)/;
  const exclusionMatch = input.match(exclusionPattern);
  if (exclusionMatch) {
    const excludedText = exclusionMatch[1];
    availableSkills.forEach(skillId => {
      if (excludedText.includes(skillId)) {
        excluded.push(skillId);
      }
    });

    // If "all" is mentioned with exclusions, select all except excluded
    if (/\ball\b/.test(input)) {
      return availableSkills.filter(skillId => !excluded.includes(skillId));
    }
  }

  // Check for explicit skill mentions
  availableSkills.forEach(skillId => {
    // Look for skill ID in input (with word boundaries to avoid partial matches)
    const pattern = new RegExp(`\\b${skillId}\\b`, 'i');
    if (pattern.test(input) && !excluded.includes(skillId)) {
      selected.push(skillId);
    }
  });

  return selected;
}

/**
 * Convert word to number ("one" -> 1, "two" -> 2, etc.)
 */
function wordToNumber(word: string): number | null {
  const numbers: Record<string, number> = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '10': 10
  };

  return numbers[word.toLowerCase()] || null;
}

/**
 * Convert ordinal word to zero-based index
 * ("first" -> 0, "second" -> 1, "1st" -> 0, etc.)
 */
function ordinalToIndex(ordinal: string): number | null {
  const ordinals: Record<string, number> = {
    'first': 0, '1st': 0, '1': 0,
    'second': 1, '2nd': 1, '2': 1,
    'third': 2, '3rd': 2, '3': 2,
    'fourth': 3, '4th': 3, '4': 3,
    'fifth': 4, '5th': 4, '5': 4,
    'sixth': 5, '6th': 5, '6': 5,
    'seventh': 6, '7th': 6, '7': 6,
    'eighth': 7, '8th': 7, '8': 7,
    'ninth': 8, '9th': 8, '9': 8,
    'tenth': 9, '10th': 9, '10': 9
  };

  return ordinals[ordinal.toLowerCase()] ?? null;
}

/**
 * Format selection result for debugging/logging
 */
export function formatSelectionResult(
  result: SelectionResult,
  recommendations: ExpertRecommendation[]
): string {
  if (result.acceptedAll) {
    return `Selected all ${recommendations.length} experts`;
  }

  if (result.rejectedAll) {
    return 'Rejected all experts';
  }

  if (result.selectedSkillIds.length === 0) {
    return 'No experts selected';
  }

  return `Selected: ${result.selectedSkillIds.join(', ')}`;
}
