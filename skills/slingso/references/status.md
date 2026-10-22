# status: workspace, plan, versions

## When

"Which workspace am I in?", "what plan are we on", "is Slingso up to date", "slingso status", or a version check failed.

## Calls, in order

1. `get_session`: user, workspaces, `server_version`, `loader_min_version`.
2. `workspace_get` for the current workspace.

## Tell the user

Five lines at most:

- Workspace: name (code), your role.
- Plan: `plan.display_name`; on Growth, add "Slingso analyses every cycle".
- Setup: done, or "Step N of M: <current step>".
- Monitoring: AI Shopping Channels, cadence, next run, and who runs the checks: "Slingso runs your checks on its servers" when `schedule.server_checks` is on, else "your AI assistant runs them".
- Versions: this skill `0.2.1`, the oldest Slingso accepts (`loader_min_version`), the contract version the workspace is pinned to (`skill_version`, or "current").

## Updating the skill

When `loader_min_version` is newer than `0.2.1`, or a response says an update is required:

The routes are the ones in [prompts/update.md](https://github.com/bishts/slingso-skills/blob/main/prompts/update.md):

| Where Slingso is installed | Update |
|---|---|
| Claude Code plugin (marketplace `slingso`) | `/plugin marketplace update slingso`, then update the slingso plugin from `/plugin` (Installed tab), then start a new session |
| A plugin added in Customize (Cowork, claude.ai, the Claude desktop app) | Customize → Plugins, find the Slingso marketplace, Check for updates (or turn on Sync automatically) |
| A skill folder (copied by hand, or with `npx slingso install`) | replace the `slingso` folder with `skills/slingso` from the latest release (https://github.com/bishts/slingso-skills/releases), or `npx slingso update`; ask before overwriting files the user edited |

Reconnecting the Slingso MCP refreshes its tools, not the skill's files: it is not an update.

## Moving the expertise pin

Only when the user asks ("go back to the last version", "use the new release"):

1. `get_expertise`: the pin and the versions served.
2. Confirm the version with the user in one line.
3. `workspace_set_skill_version` with it, and say what it is now pinned to.

## Walls

None.

## If it fails

- 401: "Slingso isn't connected. Reconnect the Slingso MCP in this assistant's settings, then ask again."
- 422 on `workspace_set_skill_version`: the message lists the versions that exist; offer them.
