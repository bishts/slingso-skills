# Slingso skill

Your AI Shopping Channel Manager, inside your favorite AI assistant. See how ChatGPT, Google AI Mode, Google AI Overviews and Gemini sell your products, product by product, and what to change.

```text
/plugin marketplace add bishts/slingso-skills
/plugin install slingso@slingso
```

Then say **slingso init**.

## What it does

Slingso is the AI Shopping Channel Manager that runs inside your favorite AI assistant. It shows how ChatGPT, Google AI Mode, Google AI Overviews and Gemini sell your products, product by product.

Your favorite AI assistant asks the queries shoppers ask, reads the answers and finds what to change. Slingso keeps the record: every product, price and seller in each answer, your Brand Soul and memory, your team's threads, and three numbers (Shelf Share, Narrative Accuracy, Purchase Likelihood).

In every answer:

- **Your Shelf Share, product by product:** every product the answer names, whether it's the top pick, whether it's yours, whether the answer warns against it.
- **The price the AI quotes,** beside your own.
- **Who gets the sale:** your own site, Amazon, Walmart or another store.
- **Shopping cards, sources, promotions.**
- **Narrative Accuracy:** every claim about your product checked against your own site.
- **Who took your spot:** every rival the answer puts forward instead.

Say `slingso` and a verb: `init`, `monitor`, `check`, `analyse`, `brief`, `review`, `draft`, `pin`, `teach`, `schedule`, `status` and the rest. The full list is in [SKILL.md](skills/slingso/SKILL.md).

## Install

Every install has two parts: the **MCP** (`https://agents.slingso.com/mcp`, where your record lives) and the **skill** (how your assistant does the work). The Claude plugin carries both.

### Claude Code

```text
/plugin marketplace add bishts/slingso-skills
/plugin install slingso@slingso
```

Run `/mcp` and sign in to Slingso. The plugin also brings Playwright, the browser monitoring uses first (it needs Node.js). Without it, monitoring uses Claude in Chrome, or you paste the answers.

### Claude desktop (Cowork and chat)

**Customize** → **Plugins** → **Add** → **Add marketplace**, enter `bishts/slingso-skills`, install "slingso", then connect it from the plugin's Connectors tab. Monitoring uses Playwright, which the plugin brings (it needs Node.js), else the built-in browser.

### Any other assistant

Paste [prompts/setup.md](prompts/setup.md) into your assistant. It installs what it can and walks you through the rest.

## Tested in

We mark an assistant ✓ once we've run the whole loop in it ourselves: connect, sign in, `slingso init`, a monitor run, the result on the Slingso dashboard. Detail per assistant: [docs/HARNESSES.md](docs/HARNESSES.md).

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

## Updating

Paste [prompts/update.md](prompts/update.md). Slingso tells you in the conversation when your copy is too old.

## Plans

Free, Starter and Growth: [slingso.com/pricing](https://www.slingso.com/pricing). Help: [docs.slingso.com](https://docs.slingso.com).

## License

MIT. See [LICENSE](LICENSE).
