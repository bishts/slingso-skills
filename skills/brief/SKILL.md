---
name: brief
description: The Slingso brief command. The briefing (what's new and what needs you), the shelf (Shelf Share and Purchase Likelihood) and the narrative (what the AI Shopping Channel says about the brand, Narrative Accuracy). Use when the user says "slingso brief", "slingso shelf" or "slingso narrative", or asks Slingso how the brand is doing in ChatGPT, Google AI Mode, Google AI Overviews or Gemini.
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Checks in the assistant need a browser on the user's computer, Playwright first (the @playwright/mcp server, when it is among the assistant's own MCP servers; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g. Claude in Chrome). Without one, checks can't be automated with good quality: answers are pasted, or Autopilot (Slingso checking for the user, from a prepaid balance) does the checking.
metadata:
  version: "0.5.3"
  author: Slingso
---

# Slingso: brief

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `brief` per the core skill's reference for it: [../slingso/references/brief.md](../slingso/references/brief.md) (`skill://slingso/references/brief.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
