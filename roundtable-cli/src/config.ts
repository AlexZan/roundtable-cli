/**
 * Configuration management for Roundtable CLI
 * Handles API key setup and validation
 */

/**
 * Get the Anthropic API key from environment
 *
 * Checks:
 * 1. ANTHROPIC_API_KEY environment variable
 *
 * @returns The API key if found
 * @throws Error with helpful setup instructions if not found
 */
export function getApiKey(): string {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const setupInstructions = `
⚠️  No Anthropic API key found.

SETUP STEPS:

1️⃣  Get your API key:
   → https://console.anthropic.com/settings/keys
   → (You may need to create an Anthropic account first)

2️⃣  Set the environment variable:

   macOS / Linux:
     export ANTHROPIC_API_KEY="sk-ant-..."

   Windows PowerShell:
     $env:ANTHROPIC_API_KEY="sk-ant-..."

   Or create a .env file in this directory:
     ANTHROPIC_API_KEY=sk-ant-...

3️⃣  Make sure you have credits:
   → https://console.anthropic.com/settings/billing
   → (Add at least $5 to your account)

4️⃣  Try again:
   npm run dev start

Need help?
  → Read the README: https://github.com/anthropics/roundtable-cli#byok-bring-your-own-key
  → Troubleshooting: https://github.com/anthropics/roundtable-cli#troubleshooting
`;

    throw new Error(setupInstructions);
  }

  // Basic validation: Anthropic keys start with "sk-ant-" and have sufficient length
  if (!apiKey.startsWith('sk-ant-') || apiKey.length < 20) {
    const invalidKeyError = `
⚠️  API key format appears invalid.

Your ANTHROPIC_API_KEY should:
  - Start with "sk-ant-"
  - Be at least 50+ characters long

Current key: "${apiKey.substring(0, Math.min(15, apiKey.length))}..."

Please check:
  1. You copied the entire key (should be ~50+ characters)
  2. You're using a valid Anthropic API key
  3. The key hasn't expired

Get a new key:
  → https://console.anthropic.com/settings/keys

For more help, see the README troubleshooting section.
`;

    throw new Error(invalidKeyError);
  }

  return apiKey;
}

/**
 * Validate that the API key has proper format
 * (Used internally by getApiKey, but exposed for testing)
 */
export function validateApiKeyFormat(key: string): boolean {
  return key.startsWith('sk-ant-') && key.length > 20;
}
