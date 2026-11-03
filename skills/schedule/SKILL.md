---
name: schedule
description: The Slingso schedule command. When the Slingso monitor runs (daily or weekly, which assistants, the time and timezone), who does the work (the user's assistant, or Slingso's servers with the server add-on), the reminder email, and the prepaid balance. Use when the user says "slingso schedule" or "slingso balance", or wants to change when or where Slingso checks run.
license: MIT
compatibility: Needs the Slingso core skill (slingso) and the Slingso MCP (https://agents.slingso.com/mcp). Monitor and check in the assistant need a browser on the user's computer, Playwright first (the plugin brings @playwright/mcp; it needs Node.js), else the user's AI assistant's desktop app's built-in browser or other possibilities for agentic browsing (e.g - Claude in Chrome). Without one, query monitoring can't be automated with good quality, and answers are pasted, or Slingso's servers run the checks (the server add-on).
metadata:
  version: "0.4.0"
  author: Slingso
---

# Slingso: schedule

1. Follow the Slingso core skill first: start the session the same way it says, and keep its rules for every turn. It is the `slingso` skill: [../slingso/SKILL.md](../slingso/SKILL.md) beside this folder, or `skill://slingso/SKILL.md` when you read skills from the Slingso MCP.
2. Then do `schedule` per the core skill's reference for it: [../slingso/references/schedule.md](../slingso/references/schedule.md) (`skill://slingso/references/schedule.md` from the Slingso MCP).

If the core skill can't be found either way, tell the user the Slingso skill is missing and to install it from https://github.com/bishts/slingso-skills.
