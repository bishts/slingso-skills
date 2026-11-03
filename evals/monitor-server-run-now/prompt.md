---
description: The workspace has the server add-on on and the user asks to run the monitor now on Slingso's servers. The skill starts a server run (never a browser run), follows it with get_run_progress passing each cursor back as since, narrates each answer and the tally, then the numbers.
tags: [monitor, server]
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

slingso monitor: run it now on your servers.
