---
description: The Brand Memory write is refused as stale. The skill re-reads memory, merges in the other session's line, retries once with the new lock_version, and still closes the session.
tags: [analyse, memory]
max_turns: 35
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill]
---

slingso analyse
