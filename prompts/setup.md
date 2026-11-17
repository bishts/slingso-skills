Set up Slingso in this assistant. Do what you can yourself, and give me any step that needs me one at a time, in plain words.

Slingso is two parts: a connector (an MCP server named "slingso" at https://agents.slingso.com/mcp, Streamable HTTP, OAuth sign-in) and a skill named "slingso".

1. Check what you have now, from the tools and skills actually loaded. If both parts are there and signed in, go to step 4.

2. Connect, then add the skill. Follow the line for this app; ask me which app this is if you're not sure.
   - Claude Code. Connect: `/plugin marketplace add bishts/slingso-skills`, then `/plugin install slingso@slingso`. The plugin brings the connector and the skill together. Start a new session, then run /mcp, pick slingso and choose Authenticate. Skill: Nothing more to do: it came with the plugin.
   - Codex CLI. Connect: `codex mcp add slingso --url https://agents.slingso.com/mcp`, then `codex mcp login slingso`. The second command opens the sign-in in the browser. Skill: Install the skill from the zip, so it is there in every session. Zip: https://github.com/bishts/slingso-skills/releases/latest/download/slingso-skill.zip
   - Gemini CLI. Connect: `gemini mcp add --transport http --scope user slingso https://agents.slingso.com/mcp`. Start Gemini CLI, run /mcp auth slingso and sign in. Skill: Nothing to install: the connector serves the skill. Tell me once that Slingso hasn't been tested here.
   - Claude desktop app. Connect: Customize → Plugins → Add → Add marketplace. Enter bishts/slingso-skills and install slingso. Then open the plugin's Connectors tab and connect it. Skill: Nothing more to do: it came with the plugin.
   - ChatGPT desktop app. Connect: `codex mcp add slingso --url https://agents.slingso.com/mcp`, then `codex mcp login slingso`. The app runs on Codex, so these work in it. The second opens the sign-in in the browser. Then start a new chat. Skill: Install the skill from the zip, so it is there in every session. Zip: https://github.com/bishts/slingso-skills/releases/latest/download/slingso-skill.zip
   - Gemini desktop app. Connect: Settings → Connectors → add a custom connector with the URL https://agents.slingso.com/mcp, then sign in. Skill: Settings → Skills → upload the skill zip. Then start a new chat. Zip: https://github.com/bishts/slingso-skills/releases/latest/download/slingso-skill.zip Works, but follows the skill loosely.
   - Grok desktop app. Connect: Connectors → New connector → Custom. Enter https://agents.slingso.com/mcp and sign in. Then start a new chat. Skill: Nothing to install: the connector serves the skill.
   - Anything else: add a remote MCP server at https://agents.slingso.com/mcp, then install the skill from https://github.com/bishts/slingso-skills/releases/latest/download/slingso-skill.zip. Tell me once that Slingso hasn't been tested here. If this app can't install a skill, skip it: the connector serves the skill (skill://slingso/SKILL.md).

3. Sign in. It happens in my browser, with my email and a one-time code. Start it, and tell me to approve it. Never ask me for a password, card or code in this chat.

4. Verify with one free call: `get_session`. Confirm it shows my email. If it fails, tell me the one thing to try next (often: start a new chat).

5. Finish in under 100 words: what's installed, that I'm signed in, and that I say "slingso init" next. Add one line: checks run in a browser on my computer, so this app will ask my permission then, and Slingso's Autopilot can run them for me instead. Don't run checks or anything paid during setup, and don't describe Slingso from memory.
