# Scheduling: a task in the user's own AI assistant (optional)

The schedule itself lives in Slingso ([schedule.md](schedule.md)): the day, the time and the "Remind me" email. With server checks off, the user's AI assistant runs the monitor; where the surface can run a scheduled task, you may offer one as an extra, so the monitor runs on its own at that time. With server checks on (any plan), Slingso runs it on its servers; no task is needed.

Offer it once, after the schedule is set, only on a surface that can do it. Never present it as the reminder setting.

## The task's prompt

Use the same prompt everywhere:

> Run Slingso for workspace <code>: monitor what is due, then analyse. Do not ask questions; use the defaults. At the end, post a three-line summary.

A scheduled run never asks the user anything. Every question's default is taken. Anything that needs a person (a decision, a missing fact) is left in the inbox.

## Per surface

| Surface | How | Notes |
|---|---|---|
| Claude desktop app (Cowork) | a scheduled task, at the schedule's day and time (`schedule.next_run_at_local`) | the desktop must be on and online for the browser. If the surface lets you create the task, create it and show its name; if not, tell the user the three fields to fill: name "Slingso monitor", schedule, the prompt above |
| Claude Code | a scheduled agent (routine) or the user's own cron calling `claude -p "<the prompt>"` | the monitor needs a browser tool (Playwright first, else Claude in Chrome); without one the run can only analyse |
| claude.ai web, mobile | no recurring browser run | the "Remind me" email covers it; the user runs `slingso monitor` from a desktop when reminded |
| Other CLI harnesses | the harness's own scheduler, if any | same prompt; same browser requirement |

If the surface cannot schedule, say nothing about tasks: the "Remind me" email is the reminder.

## When a scheduled run can't monitor

No browser, or the desktop was offline: analyse anyway if there are new runs, and leave the monitor due. The reminder email (if on) comes at the next scheduled time.

## Changing the schedule

Always through [schedule.md](schedule.md): it updates Slingso and the task together. Never leave a task running at a different day or time from `schedule`.
