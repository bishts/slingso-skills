Set up Slingso in this assistant. Do what you can yourself, and walk me through anything that needs me. I'm not a developer, so give me one step at a time in plain words.

1. Check first. Slingso is two parts: a connector (an MCP server called "slingso", https://agents.slingso.com/mcp) and a skill called "slingso". Look at the tools and skills you actually have now; don't go by what you assume about your app (a desktop app can describe itself as the web version). If both are there and signed in, skip to step 5. Slingso is tested and verified in Claude Code, the Claude desktop app (Cowork and chat), the ChatGPT desktop app and Codex CLI. Anywhere else, tell me once, in a line, that it hasn't been tested here and its data may have gaps or errors, and, if you browse from the cloud rather than my computer, that answers may not show my market.

2. Install. Find my app below and follow its route. If you're not sure which app I'm using, ask me.
   - Claude Code (terminal, or the Code tab of the Claude desktop app): run `/plugin marketplace add bishts/slingso-skills`, then `/plugin install slingso@slingso`. The plugin brings the skill and the connector together. Then start a new session so it loads.
   - Claude desktop app, Cowork, or claude.ai: I do this part by hand. Tell me to open Customize → Plugins → Add → Add marketplace, enter `bishts/slingso-skills`, install "slingso", then open the plugin's Connectors tab and connect it.
   - Gemini app (desktop, or gemini.google.com): I do this part by hand. Tell me to open Settings → Connectors, add a custom connector with the URL `https://agents.slingso.com/mcp` and sign in; then Settings → Skills, and upload the skill file (step 2a). Then start a new chat so both load.
   - ChatGPT (desktop app or chatgpt.com): I do this part by hand. Tell me to open Settings → Apps (or Connectors), turn on Developer mode, then create an app named Slingso with the URL `https://agents.slingso.com/mcp` and OAuth sign-in. If the skill can be added here, use step 2a. Then start a new chat. If Developer mode isn't there, my plan may not include it: say so.
   - Codex: add the remote MCP server `https://agents.slingso.com/mcp` yourself, then install the skill (step 2a).
   - Grok (grok.com or the Grok app): I do this part by hand. Tell me to open Connectors → New connector → Custom, enter `https://agents.slingso.com/mcp` and sign in. Then start a new chat.
   - Any other assistant: add a remote MCP server at `https://agents.slingso.com/mcp` (Streamable HTTP, OAuth sign-in), then install the skill (step 2a). If you can't run commands here, give me the exact clicks instead.
   - Before you decide this assistant can't connect Slingso, tell me where such settings usually are (Settings → Connectors, Apps, Extensions or Skills) and ask me to look. Only if I can't find them, say so plainly and stop.

   2a. The skill. Download https://github.com/bishts/slingso-skills/releases/latest/download/slingso-skill.zip (the `skills/slingso` folder of https://github.com/bishts/slingso-skills) and install it the way this assistant installs skills, or tell me where to upload it, so it's there in every session. If it can't be installed here, tell me in a line: the connector also serves the skill (skill://slingso/SKILL.md), and you'll read it from there at the start of each session.

3. Sign in. Slingso signs in with my email in the browser (a one-time code); there are no API keys or passwords. Start the sign-in (in Claude Code: `/mcp`, select slingso, Authenticate) and tell me to approve it in the browser window that opens.

4. Never ask me for a password, card or code in this chat, and don't start any monitoring, onboarding or paid step during setup. Never describe Slingso, its plans or its features from memory or the web: what Slingso is and does comes from the connector and the skill.

5. Verify with one free, read-only call: `get_session`. Confirm it returns my email. If the call isn't available or fails, tell me what failed and the one thing to try next (for example: start a new chat, or reconnect Slingso in your settings).

6. Finish with a short handoff, under 120 words: what's installed, that I'm signed in, and the next step, which is to say "slingso init" to set up my brand.
