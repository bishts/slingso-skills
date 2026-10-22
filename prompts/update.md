Update my Slingso skill in this assistant to the latest version. Keep my Slingso MCP and sign-in as they are, and don't run any monitoring or analysis while you do it.

1. Work out how Slingso was installed here: the Claude Code plugin (marketplace `slingso`), a plugin added in Customize (Cowork, claude.ai, the Claude desktop app), or a skill folder copied by hand.

2. Update it the matching way:
   - Claude Code plugin: run `/plugin marketplace update slingso`, then update the slingso plugin from `/plugin` (Installed tab), then start a new session so the new version loads.
   - Plugin added in Customize: tell me to open Customize → Plugins, find the Slingso marketplace and use Check for updates (or turn on Sync automatically).
   - Skill copied by hand: replace the `slingso` skill folder with `skills/slingso` from the latest release at https://github.com/bishts/slingso-skills/releases. If I've edited any of its files, show me what changed and ask before overwriting.

3. Don't install a second copy. If you find Slingso installed twice, tell me which one to remove.

4. Refreshing the Slingso MCP updates its tools, not the skill's files, so don't treat a reconnect as an update.

5. Verify: read the skill's version, call `get_session` once (free, read-only), and confirm the skill's version is at least the `loader_min_version` it returns. Tell me the version I'm on now in one line.
