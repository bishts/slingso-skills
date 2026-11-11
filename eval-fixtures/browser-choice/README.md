# Eval fixture: browser choice

`claude plugin eval` mocks only the servers a plugin declares, and a user's own MCP servers (Playwright, Claude in Chrome) never load in a run. This fixture is the Slingso skill (linked in from `skills/`) with both browser servers declared in `mcp.eval.json`, copied to `.mcp.json` only at eval time (the Claude directory refuses a committed local server), so one case can offer both and check the skill uses the one the user asked for. The servers are never started: every tool is mocked.

```bash
ln -sfn ../../skills eval-fixtures/browser-choice/skills
cp eval-fixtures/browser-choice/mcp.eval.json eval-fixtures/browser-choice/.mcp.json
claude plugin eval eval-fixtures/browser-choice --runs 1 --ablation none --no-publish --trust-plugin
```

`evals/mocks/slingso/` is a copy of the suite's mocks (the eval runner refuses symlinked directories); refresh it with `cp -R evals/mocks/slingso eval-fixtures/browser-choice/evals/mocks/` when the suite's mocks change.

Not shipped: the plugin manifest at the repo root is the real one.
