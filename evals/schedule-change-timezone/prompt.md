---
description: Setup is done but no schedule was set (no timezone was known when it was confirmed), and the user asks for checks on four assistants. In Claude Code the skill reads the offset it can tell (date +%z) and folds it into the when question (weekly, Monday 09:00 suggested) so the answer confirms it, and offers to change it. One question; nothing set yet.
tags: [schedule, timezone]
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Bash]
---

slingso schedule: check ChatGPT, Google AI Mode, Google AI Overviews and Gemini.
