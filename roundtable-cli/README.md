# Roundtable CLI - Phase 1 Prototype

**Status:** Phase 1 Foundation Prototype
**Version:** 0.1.0
**Purpose:** Validate core architecture and debate mechanics

## What This Prototype Does

This is a minimal proof-of-concept that demonstrates:
- ✅ CLI interface for starting deliberation sessions
- ✅ Two agents (Architecture + Product experts) debating a user prompt
- ✅ Two-round debate: Round 1 (initial) → Round 2 (agents see each other's responses)
- ✅ Session persistence (saved to JSON files)
- ✅ Token tracking and cost awareness

## Project Structure

```
roundtable-cli/
├── src/
│   ├── cli.ts              # CLI entry point (commander + inquirer)
│   ├── types.ts            # TypeScript interfaces
│   ├── session.ts          # Session management (save/load JSON)
│   ├── llm/
│   │   └── claude.ts       # Claude API integration
│   └── debate/
│       └── engine.ts       # Basic debate orchestration
├── sessions/               # Saved session files (JSON)
├── package.json
├── tsconfig.json
└── README.md
```

## BYOK: Bring Your Own Key

**Roundtable CLI is completely free to use with your own Anthropic API key.**

You supply your API key, you control your costs, and your data stays yours. We're committed to never restricting or paywalling Bring Your Own Key (BYOK) functionality—unlike some tools that have done a bait-and-switch.

**See our [BYOK Charter](./BYOK_CHARTER.md) for our binding commitment** to keeping BYOK free forever.

### Why BYOK?

- ✅ **Zero cost to use the tool** - Roundtable CLI itself is free
- ✅ **You control your spending** - Costs are low ($0.02-0.05 per deliberation)
- ✅ **You control your data** - Sessions stay on your machine
- ✅ **You have an exit** - Open source means you can fork if we ever change
- ✅ **No vendor lock-in** - Your API key works with any implementation

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd roundtable-cli
npm install
```

### 2. Get Your Anthropic API Key

1. **Create/login to Anthropic account:**
   - Visit: https://console.anthropic.com/
   - Sign up or log in

2. **Get your API key:**
   - Go to: https://console.anthropic.com/settings/keys
   - Click "Create Key"
   - Copy the key (starts with `sk-ant-`)

3. **Enable billing:**
   - Go to: https://console.anthropic.com/settings/billing
   - Add at least $5 in credits
   - (Estimated cost: $0.02-0.05 per deliberation)

### 3. Set Environment Variable

**Option A: Temporary (this session only)**

macOS/Linux:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

Windows PowerShell:
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-..."
```

**Option B: Permanent (all future sessions)**

macOS/Linux - Add to shell profile:
```bash
# Edit ~/.zshrc (or ~/.bashrc for older systems)
nano ~/.zshrc

# Add this line:
export ANTHROPIC_API_KEY="sk-ant-..."

# Save, exit, and reload:
source ~/.zshrc
```

Windows PowerShell - Add to profile:
```powershell
# Edit PowerShell profile:
notepad $PROFILE

# Add this line:
$env:ANTHROPIC_API_KEY="sk-ant-..."

# Save, exit, and reload PowerShell
```

**Option C: Use .env file**

Create `.env` in the project directory:
```bash
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env
```

(Note: `.env` is git-ignored for security)

**Verify it worked:**
```bash
# macOS/Linux:
echo $ANTHROPIC_API_KEY

# Windows PowerShell:
echo $env:ANTHROPIC_API_KEY
```

Should output your API key (starting with `sk-ant-`)

### 4. Run the CLI

```bash
# Development mode (with tsx for hot reload):
npm run dev start

# Or build and run:
npm run build
npm start
```

## Usage

### Start a new deliberation session

```bash
$ npm run dev start

🎯 Welcome to Roundtable - Multi-model AI Deliberation

? What would you like to build? A todo app with offline sync
? Ready to start deliberation? Yes

🤖 Initializing deliberation with 2 agents...

   📋 Your prompt: "A todo app with offline sync"

⚙️  Running Round 1...

   Agents analyzing prompt...

⚙️  Running Round 2 (agents see each other's responses)...

📊 Deliberation Complete!

══════════════════════════════════════════════════════════

🔄 Round 1:

👤 Architecture Expert:
   [Response about offline sync architecture...]
   (Tokens: 450)

👤 Product Expert:
   [Response about product features...]
   (Tokens: 420)

────────────────────────────────────────────────────────

🔄 Round 2:

👤 Architecture Expert:
   [Updated response considering product perspective...]
   (Tokens: 380)

👤 Product Expert:
   [Updated response considering architecture...]
   (Tokens: 390)

────────────────────────────────────────────────────────

📈 Session Summary:
   Total Rounds: 2
   Total Tokens: 1640
   Duration: 8.2s

💾 Session saved: ./sessions/session-1234567890.json
```

### List previous sessions

```bash
$ npm run dev list

📁 Previous Sessions (3):

   session-1234567890
   Created: 10/22/2024, 2:15:30 PM
   Prompt: "A todo app with offline sync"
```

## What's Implemented

### ✅ Phase 1A Complete
- [x] Project structure and TypeScript configuration
- [x] CLI framework (Commander + Inquirer)
- [x] Claude API integration
- [x] Basic 2-agent debate engine
- [x] 2-round debate flow (Round 1 → Round 2 with context)
- [x] Session persistence (JSON files)
- [x] Token tracking
- [x] Session listing

### ⏳ Deferred to Later Phases
- [ ] Enhanced debate mechanics (evidence tagging, convergence metrics)
- [ ] Multimodal input support (images, audio, documents)
- [ ] Panel formation logic
- [ ] Multiple LLM support (GPT-4, Gemini, etc.)
- [ ] PM agent orchestration
- [ ] Constitution system
- [ ] Spec generation from debate output
- [ ] Production polish and error handling

## Architecture Decisions Made

### TypeScript + Node.js
- **Why:** Multi-platform compatibility (CLI → Web → VSCode → Mobile)
- **Trade-off:** Slightly slower than compiled languages, but better ecosystem

### Claude 4.5 Haiku
- **Why:** Fast, cost-efficient model for MVP validation (saves tokens vs Sonnet)
- **Trade-off:** Only one LLM in prototype (multi-LLM deferred to Phase 1C)

### JSON File Storage
- **Why:** Simple, no database needed for prototype
- **Trade-off:** Won't scale to many sessions, but fine for validation

### Parallel Agent Execution
- **Why:** Faster than sequential, matches spec vision
- **Trade-off:** All agents must finish before moving to next round

## Testing the Prototype

### Example Prompts to Try

1. **Simple:**
   - "A blog with comments"
   - "A weather app"

2. **Medium complexity:**
   - "A todo app with offline sync"
   - "A collaborative note-taking app"

3. **Complex:**
   - "A real-time multiplayer game platform"
   - "A healthcare appointment scheduling system"

### What to Look For

- Do agents actually debate or just agree?
- Does Round 2 show agents reacting to each other?
- Are token costs reasonable? (expect ~1500-2500 tokens per session)
- Is the CLI interaction smooth?
- Does session data save correctly?

## Token Budget

**Estimated cost per test run:** $0.02 - $0.05
**Phase 1 development:** ~15K tokens (~$15-30 in API fees)

## Next Steps

After validating this prototype:

1. **Document learnings** (see PROTOTYPE_LEARNINGS.md)
2. **Decide on Phase 1B** (expand to full Phase 1 or iterate?)
3. **Add more LLMs** (GPT-4, Gemini)
4. **Implement panel system** (not just 2 hardcoded agents)
5. **Add spec generation** (turn debate output into structured spec)

## Development

### Type checking
```bash
npm run type-check
```

### Build
```bash
npm run build
```

### Run built version
```bash
npm start
```

## Troubleshooting

### 💳 "No API credits available"
**Error:** `Your credit balance is too low to access the Anthropic API`

**Solution:**
1. Go to https://console.anthropic.com/settings/billing
2. Add credits (minimum $5)
3. Estimated cost: $0.02-0.05 per test session

### 🔑 "Invalid API key" or "ANTHROPIC_API_KEY environment variable not set"
**Solution:**
1. Get your API key from https://console.anthropic.com/
2. Set it in `.env` file:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```
3. Or set as environment variable:
   ```bash
   # Windows PowerShell:
   $env:ANTHROPIC_API_KEY="your-key-here"

   # macOS/Linux:
   export ANTHROPIC_API_KEY=your-key-here
   ```

### ⏱️ "Rate limit exceeded"
**Solution:**
- Wait 1-2 minutes and try again
- Or upgrade your plan for higher rate limits at https://console.anthropic.com/settings/plans

### 🌐 "Network error"
**Solution:**
- Check your internet connection
- Check if https://anthropic.com is accessible
- Try disabling VPN if you're using one

### 🐛 "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall:
rm -rf node_modules package-lock.json
npm install
```

### ❓ Other Issues
- Check Anthropic API status: https://status.anthropic.com/
- Review logs in the error message
- Open an issue: [link to your GitHub repo]

## Learnings Document

See [PROTOTYPE_LEARNINGS.md](../docs/implementation/PROTOTYPE_LEARNINGS.md) after completing testing.

---

## Licensing

Roundtable CLI uses a **dual licensing model**:

### Open Source License (Free)
**For everyone:** Personal use, open-source projects, internal business use
- License: MIT + Commons Clause
- Cost: FREE
- See [LICENSE](./LICENSE)

### Commercial License (Paid)
**For companies integrating Roundtable into commercial products**
- For IDE integrations, cloud services, SaaS platforms, etc.
- Licensing fee negotiated based on integration scale
- Includes priority support and updates
- See [COMMERCIAL_LICENSE_AGREEMENT.md](./COMMERCIAL_LICENSE_AGREEMENT.md)

### Not sure which license you need?
Read our [LICENSING_POLICY.md](./LICENSING_POLICY.md) for detailed guidance.

**Contact for licensing questions:** licensing@roundtable.ai

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) if available.

By contributing, you agree that your contributions will be licensed under the
same MIT + Commons Clause license.

---

**Built with:** TypeScript, Node.js, Commander, Inquirer, Anthropic SDK
**License:** MIT + Commons Clause (see [LICENSE](./LICENSE))
**Last Updated:** 2024-10-22
