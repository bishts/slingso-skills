# Harnesses

Where the Slingso skill runs, and what each assistant needs. An assistant counts as
supported once the whole loop works in it: connect, sign in, `slingso init`, a monitor
run in the browser, the result on the Slingso dashboard.

Desktop apps and CLIs come first: they drive a browser on the user's own computer, so
answers show what the user's market sees. An assistant with a cloud browser sees its
server's location instead (the market at the least is off), so it ranks last, and the
skill tells the user an untested assistant's data may have gaps.

| Assistant | MCP | Skill | Browser for `monitor` | Status | Last verified |
|---|---|---|---|---|---|
| Claude Code | bundled in the plugin (`.mcp.json`); `/mcp` to sign in | the plugin (`.claude-plugin/`) | Playwright (bundled), else Claude in Chrome | at launch, tested | 2026-10-15 |
| Claude desktop (Cowork and chat) | bundled in the plugin | the plugin | Playwright (bundled), else the built-in browser | tested | 2026-10-19 |
| ChatGPT desktop | runs on Codex: `codex mcp add slingso --url https://agents.slingso.com/mcp`, then `codex mcp login slingso` (adding alone leaves it "Not logged in", with no tools) | Codex skills folder, from the release zip | the desktop app's browser | tested: the setup prompt alone installs and signs in | 2026-10-22 |
| Codex CLI | `codex mcp add slingso --url https://agents.slingso.com/mcp`, then `codex mcp login slingso` | Codex skills folder, from the release zip | Playwright (`npx -y @playwright/mcp@0.0.83 --isolated` in its MCP settings) | tested | 2026-10-19 |
| Gemini desktop | custom connector in Settings → Connectors | upload in Settings → Skills | the desktop app's browser | works, follows the skill loosely | 2026-10-19 |
| Grok desktop | custom connector in Connectors → New connector → Custom, `https://agents.slingso.com/mcp` | per the setup prompt | not yet checked | tested: the setup prompt alone installs it | 2026-10-22 |
| Cursor, Gemini CLI, OpenCode, GitHub Copilot | remote HTTP MCP server with OAuth, in that tool's MCP settings | `npx slingso install --dir <its skills folder>` | Playwright (`npx -y @playwright/mcp@0.0.83 --isolated` in its MCP settings) | not tested | |
| claude.ai | custom connector, `https://agents.slingso.com/mcp` | upload `slingso-skill-<version>.zip` | Claude in Chrome | not tested | |
| Perplexity | its own app and connector model | | cloud browser | later | |

Without a browser, `check` falls back to asking you to paste an answer, and
`monitor` waits until one is available.

## Test next

Assistants that can drive Playwright on the user's computer, in this order:

1. Claude Code and Claude desktop, again, with the bundled Playwright as the monitor's browser
2. Cursor
3. Codex CLI
4. Gemini CLI (or Antigravity CLI, which replaced it)
5. OpenCode
6. GitHub Copilot CLI
7. Cowork (its sandbox's network rules decide whether Playwright works)

Cloud-browser assistants (ChatGPT, Gemini app, Perplexity) and claude.ai on its own come after.

## Adding an assistant

1. Confirm the assistant's skills folder in its own docs.
2. Add it to `installer/src/harnesses.js` with its next steps.
3. Run the loop above end to end, from the market the answers should show, then add a row here with the date.
4. List it in the README.

## What each install carries

| Path | For |
|---|---|
| `skills/slingso/` | every assistant: `SKILL.md` and `references/` |
| `.claude-plugin/`, `.mcp.json` | Claude Code and Claude desktop: skill and MCP in one install |
| `installer/` | assistants that read a skills folder (`npx slingso install`) |
| `scripts/build-zip.sh` | the claude.ai upload, attached to each release |
