---
name: opportunities
description: The Slingso opportunities command. Read the answers Slingso recorded since the last time and find the opportunities that matter most, each a brief with its evidence and reasoning. Use when the user says "slingso opportunities", "slingso analyse" (or analyze), or asks Slingso what to do next to win more AI Shopping Channel answers.
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Checks in the assistant need a browser on the user's computer, Playwright first (the plugin brings @playwright/mcp; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g. Claude in Chrome). Without one, checks can't be automated with good quality: answers are pasted, or Autopilot (Slingso checking for the user, from a prepaid balance) does the checking.
metadata:
  version: "0.5.0"
  author: Slingso
---

# Slingso: opportunities

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `opportunities` per the core skill's reference for it: [../slingso/references/opportunities.md](../slingso/references/opportunities.md) (`skill://slingso/references/opportunities.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
