# slingso (installer)

Copies the Slingso skill into your favorite AI assistant's skills folder (Claude Code by default), and updates it. It never touches the network, and never connects anything: it prints the steps to add Slingso's MCP.

```bash
npx slingso install              # Claude Code: ~/.claude/skills/slingso
npx slingso update               # replace an older installed version
npx slingso uninstall
npx slingso install --dry-run    # show the files and the target; write nothing
npx slingso install --dir <path> # any other harness's skills folder
npx slingso version
```

`--force` replaces whatever is at the target (it refuses a folder that isn't the Slingso skill otherwise).

Not published yet (`"private": true`). From the repo: `node installer/bin/slingso.js install`, or `npm link` inside `installer/` to get the `slingso` command.

## Harnesses

| Harness | Skills folder | How |
|---|---|---|
| Claude Code | `~/.claude/skills/` | default; then `claude mcp add --transport http slingso https://agents.slingso.com/mcp` and `/mcp` to sign in. The Claude plugin is the better route there: it bundles the MCP |
| Any harness that reads Agent Skills (`SKILL.md` folders) | its own folder | `--dir <folder>`; connect `https://agents.slingso.com/mcp` as a remote HTTP MCP server with OAuth in that harness |

Only Claude Code's path is built in, because it is the only one documented and tested here. Add a harness to `src/harnesses.js` once its skills path is confirmed in its own docs.

## Staleness

The skill checks `loader_min_version` from Slingso on every session and tells the user to run `npx slingso update` when it is too old.

## Tests

```bash
cd installer && npm test
```

`node:test`, no dependencies; every test runs against a temporary home folder.

## Packing

`npm pack` runs `scripts/bundle-skill.js`, which copies `../skills/slingso` into `skill/` (ignored by git) so the package carries the skill.
