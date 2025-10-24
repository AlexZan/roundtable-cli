/**
 * Expert Recommendation Parsing
 *
 * Detects and parses expert recommendations from agent responses.
 * Used for dynamic expert addition during roundtable sessions.
 */

export interface ExpertRecommendation {
  /** Skill ID to load */
  skillId: string;

  /** Reason why this expert is recommended */
  reason: string;
}

/**
 * Detect if a response contains expert recommendations
 *
 * Looks for the pattern:
 * "I recommend we bring in:"
 * " - skill-id (for reason)"
 */
export function containsExpertRecommendations(responseText: string): boolean {
  // Look for recommendation intro phrase
  const introPattern = /I recommend we bring in:/i;

  if (!introPattern.test(responseText)) {
    return false;
  }

  // Check if there are actual recommendations after the intro
  const recommendationPattern = /- (\w+) \(/;
  return recommendationPattern.test(responseText);
}

/**
 * Parse expert recommendations from agent response
 *
 * Extracts skill IDs and reasons from the standard format:
 * "I recommend we bring in:
 *  - architecture (for technical design and system scalability)
 *  - security (for user data protection and authentication)"
 *
 * @param responseText - The agent's response text
 * @returns Array of parsed recommendations, or empty array if none found
 */
export function parseExpertRecommendations(responseText: string): ExpertRecommendation[] {
  const recommendations: ExpertRecommendation[] = [];

  // Pattern matches: "- skill-id (for reason)" or "- skill-id (reason)"
  // Handles with or without "for" prefix
  const recommendationPattern = /- (\w+(?:-\w+)*) \((?:for )?(.*?)\)/g;

  let match;
  while ((match = recommendationPattern.exec(responseText)) !== null) {
    const skillId = match[1];
    const reason = match[2].trim();

    recommendations.push({
      skillId,
      reason
    });
  }

  return recommendations;
}

/**
 * Format expert recommendations for display to user
 *
 * @param recommendations - Parsed recommendations
 * @param agentName - Name of the agent making the recommendation
 * @returns Formatted string for user prompt
 */
export function formatRecommendationsForUser(
  recommendations: ExpertRecommendation[],
  agentName: string
): string {
  const lines = [
    `\n💡 ${agentName} suggests bringing in additional experts:\n`
  ];

  recommendations.forEach((rec, index) => {
    lines.push(`   ${index + 1}. ${rec.skillId} - ${rec.reason}`);
  });

  return lines.join('\n');
}
