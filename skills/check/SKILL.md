---
name: check
description: The Slingso check command. Ask the AI Shopping Channel (ChatGPT, Google AI Mode, Google AI Overviews, Gemini) every question that's due and record the answers product by product, or one shopping question right now, in the user's browser or on Autopilot. Use when the user says "slingso check", "slingso check <question>", "slingso monitor", "run my Slingso checks", or the Slingso check is due.
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Checks in the assistant need a browser on the user's computer, Playwright first (the plugin brings @playwright/mcp; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g. Claude in Chrome). Without one, checks can't be automated with good quality: answers are pasted, or Autopilot (Slingso checking for the user, from a prepaid balance) does the checking.
metadata:
  version: "0.5.0"
  author: Slingso
---

# Slingso: check

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `check` per the core skill's reference for it: [../slingso/references/check.md](../slingso/references/check.md) (`skill://slingso/references/check.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
