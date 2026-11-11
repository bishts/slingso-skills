# Slingso skill

The opinionated AI Shopping Channel Manager for e-commerce brands, in your favorite AI assistant. See what ChatGPT, Google AI Mode, Google AI Overviews and Gemini tell your shoppers. Get the opportunities that matter most, and see what improved after you act.

```text
/plugin marketplace add bishts/slingso-skills
/plugin install slingso@slingso
```

Then say **slingso init**.

## What it does

Slingso is the opinionated AI Shopping Channel Manager for e-commerce brands. It shows how ChatGPT, Google AI Mode, Google AI Overviews and Gemini sell your products, product by product, and brings you the opportunities that matter most, each a brief with its evidence and reasoning.

In your favorite AI assistant, the assistant asks the questions shoppers ask, reads the answers and finds the opportunities. Slingso's work ends at the opportunity: your team creates and publishes, and your assistant can draft from a brief if you ask. Slingso keeps the record: every product, price and seller in each answer, your Brand Soul and memory, your team's threads, and three numbers (Shelf Share, Narrative Accuracy, Purchase Likelihood).

In every answer:

- **Your Shelf Share, product by product:** every product the answer names, whether it's the top pick, whether it's yours, whether the answer warns against it.
- **The price the AI quotes,** beside your own.
- **Who gets the sale:** your own site, Amazon, Walmart or another store.
- **Shopping cards, sources, promotions.**
- **Narrative Accuracy:** every claim about your product checked against your own site.
- **Who took your spot:** every rival the answer puts forward instead.

Who does the checking is your choice, on any plan: your assistant (free), or Autopilot (Slingso checks on your schedule, in your market, and finds your opportunities every 7 days once there are 100 new answers, paid per check from a prepaid balance). Drafting from a brief always happens in your assistant, when you ask.

## Commands

Say `slingso` and a command (`slingso check`). In the Claude plugin each one is also its own slash command (`/slingso:check`). The old words `monitor` and `analyse` still work. The core skill, [skills/slingso](skills/slingso/SKILL.md), holds them all, so a single-skill install works the same.

### Where you stand

| Command | Does |
|---|---|
| `check` | Checks every question due, in your browser or now on Autopilot; `check <question>` asks one now. |
| `brief` | The briefing, your Shelf Share and what the AI Shopping Channel says. |
| `competitors` | Who you're up against: suggestions, pins and their intelligence. |

### Your opportunities

| Command | Does |
|---|---|
| `opportunities` | Finds the ones that matter most in the new answers, each a brief. |
| `create` | Drafts from an opportunity's brief, in your assistant, or revises a draft. |
| `teach` | Saves a house rule every opportunity and draft follows. |

### What changed

| Command | Does |
|---|---|
| `review` | Decides on opportunities and records what went live. |

### How you use it

| Command | Does |
|---|---|
| `init` | Sets up your brand: website, market and hero product, then the first check. |
| `schedule` | When Slingso checks, Autopilot on or off, and the balance. |
| `export` | Every recorded answer, as CSV or JSON. |

Also: `status`, `switch`, `invite` and `help` (`slingso help` lists them all).

## Install

Every install has two parts: the **MCP** (`https://agents.slingso.com/mcp`, where your record lives) and the **skill** (how your assistant does the work). The Claude plugin carries both.

### Claude Code

```text
/plugin marketplace add bishts/slingso-skills
/plugin install slingso@slingso
```

Run `/mcp` and sign in to Slingso. Checks run in Playwright when it is one of your MCP servers (`claude mcp add playwright -- npx -y @playwright/mcp@0.0.83 --isolated`; it needs Node.js), else in Claude in Chrome, or you paste the answers.

### Claude desktop (Cowork and chat)

**Customize** → **Plugins** → **Add** → **Add marketplace**, enter `bishts/slingso-skills`, install "slingso", then connect it from the plugin's Connectors tab. Checks run in the built-in browser, or in Playwright when it is one of your MCP servers.

### Any other assistant

Paste [prompts/setup.md](prompts/setup.md) into your assistant. It installs what it can and walks you through the rest. A skills folder needs only `skills/slingso` (the release zip); the command folders beside it are optional shortcuts.

## Tested in

We mark an assistant ✓ once we've run the whole loop in it ourselves: connect, sign in, `slingso init`, a check, the result on the Slingso dashboard. Detail per assistant: [docs/HARNESSES.md](docs/HARNESSES.md).

Slingso works best in an assistant that runs on your own computer (a desktop app or a CLI), because the AI Shopping Channel's answers depend on where you ask from. We haven't tested the others, so their data may have gaps or errors. An assistant that browses from the cloud sees its server's location, not your market.

| Assistant | Runs on | Status | Checked |
|---|---|---|---|
| Claude Code | your computer | ✓ | 2026-10-15 |
| Claude desktop (Cowork and chat) | your computer | ✓ | 2026-10-19 |
| ChatGPT desktop | your computer | ✓ (paste the setup prompt) | 2026-10-22 |
| Codex CLI | your computer | ✓ | 2026-10-19 |
| Gemini desktop | your computer | works, follows the skill loosely | 2026-10-19 |
| Grok desktop | your computer | ✓ (paste the setup prompt) | 2026-10-22 |
| Cursor, Gemini CLI, OpenCode, GitHub Copilot | your computer | not yet tested | |
| claude.ai | the web | not yet tested | |
| Perplexity | the cloud | not yet tested | |

## What this plugin runs and sends

- **The Slingso MCP** at `https://agents.slingso.com/mcp`. You sign in with your email (OAuth). It holds your workspace: your brand and products, the shopping questions you track, the answers your checks record, and the opportunities drawn from them. The assistant reads and writes these only through its tools.
- **Playwright** (the `@playwright/mcp` server), only when you have added it to your assistant yourself and a check runs there (not on Autopilot). The plugin doesn't install it. It opens a fresh, signed-out browser on your computer and visits public AI assistant pages (chatgpt.com, google.com, gemini.google.com), types each tracked question and reads the answer. The facts it extracts go to the Slingso MCP. It never signs in to your accounts, buys anything or changes a setting.
- **Nothing else.** The plugin starts no program on your computer, reads no credentials or files from it, and sends data nowhere besides the Slingso MCP.

[Privacy policy](https://www.slingso.com/privacy) · [Terms](https://www.slingso.com/terms) · [Support](https://docs.slingso.com) · support@slingso.com

## Updating

Paste [prompts/update.md](prompts/update.md). Slingso tells you in the conversation when your copy is too old.

## Plans

Free, Starter and Growth: [slingso.com/pricing](https://www.slingso.com/pricing). Help: [docs.slingso.com](https://docs.slingso.com).

## Publisher

Slingso is a product of Intelligent Motion, Inc.

## License

MIT. See [LICENSE](LICENSE).
