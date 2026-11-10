---
name: teach
description: The Slingso teach command. Save a house rule in one sentence that every Slingso opportunity and draft follows, or decide the house rules Slingso proposed. Use when the user says "slingso teach" or gives Slingso a standing instruction ("never mention discounts", "always call it a serum").
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Checks in the assistant need a browser on the user's computer, Playwright first (the plugin brings @playwright/mcp; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g. Claude in Chrome). Without one, checks can't be automated with good quality: answers are pasted, or Autopilot (Slingso checking for the user, from a prepaid balance) does the checking.
metadata:
  version: "0.5.0"
  author: Slingso
---

# Slingso: teach

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `teach` per the core skill's reference for it: [../slingso/references/teach.md](../slingso/references/teach.md) (`skill://slingso/references/teach.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
