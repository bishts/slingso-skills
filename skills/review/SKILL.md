---
name: review
description: The Slingso review command. Go through the Slingso inbox, decide on opportunities and drafts, and record what went live. Use when the user says "slingso review", "slingso published" or "slingso done", asks what needs them in Slingso, or says a Slingso opportunity is live at a URL.
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Monitor and check in the assistant need a browser on the user's computer, Playwright first (the plugin brings @playwright/mcp; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g - Claude in Chrome). Without one, query monitoring can't be automated with good quality, and answers are pasted, or Slingso's servers run the checks (the server add-on).
metadata:
  version: "0.4.2"
  author: Slingso
---

# Slingso: review

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `review` per the core skill's reference for it: [../slingso/references/review.md](../slingso/references/review.md) (`skill://slingso/references/review.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
