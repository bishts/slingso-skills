# schedule: monitor runs

The one place for when the monitor runs: which AI Shopping Channels, how often, the day and time, the timezone, who runs the checks, and whether to remind the owner.

## When

"Monitor weekly", "every Monday at 9", "add Gemini", "remind me by email", "stop reminding me", "I'm in UTC-04:00 now", "run my checks on your servers", "slingso schedule", or onboarding's `schedule` step.

## Calls, in order

1. `workspace_get` → `schedule` (`assistants`, `cadence`, `day`, `time`, `utc_offset`, `remind`, `server_checks`, `next_run_at_local`) and `plan.assistants_catalogue`. `get_session` → `user.utc_offset`.
2. Show the schedule in the user's time, with every assistant on the plan and which are on: "Available: ChatGPT, Google AI Mode, Google AI Overviews, Gemini. On: ChatGPT and Gemini, every Monday at 09:00 (UTC+05:30), with a reminder email." Ask one question with the change as default. The user can switch assistants on or off any time. In onboarding's `schedule` step the user picks instead: which assistants, then when ([init.md](init.md)).
3. `set_schedule` with what changed:
   - `assistants` from the catalogue;
   - `cadence`: `daily`, `weekly` or `monthly`;
   - `day`: a weekday for weekly (`monday`), a day of the month 1 to 28 for monthly; none for daily;
   - `time`: `HH:MM`, 24-hour, in the user's time;
   - `utc_offset`: the user's timezone as `UTC+05:30`. Send it whenever you send a time and the user's saved offset is null or has changed. Turn a city or zone name into its current offset yourself;
   - `remind` (when the user's assistant runs the checks): `true` emails the workspace owner at that time; `false` stops the email;
   - `server_checks`: `true` has Slingso's servers run the checks at that time, from the prepaid balance; `false` hands them back to the user's assistant.
4. Confirm from the response: "Next run: Monday 19 Oct, 09:00 (UTC+05:30)." (`schedule.next_run_at_local`).

## Who runs the checks

The workspace's choice, on any plan (`schedule.server_checks`):

- Off: the time is when the monitor is due and when the owner is reminded (if `remind`). The user's AI assistant runs it, in a browser on their computer.
- On: Slingso runs it on its servers at that time, in the workspace's market; never send `remind` (it's refused: there's nothing to remind). Every run is $0.015 from the prepaid balance; say the estimate when turning them on, or when the cadence or assistants grow: queries × personas × assistants × runs a month × $0.015. At zero balance, server checks pause.

Turning them on needs a balance. Without one, Slingso refuses with the fix: relay it with the billing page link (https://www.slingso.com/workspace/<code>/billing).

Intelligence (competitor brand and product) runs on the plan's own cycle: weekly on Starter, daily on Growth. It is not set here.

## Walls

None. Every plan sets its own schedule.

## If it fails

The error says what to send: an assistant not in the catalogue (it lists the ones available), a day or time it can't read, or a missing `utc_offset`. Ask for that one thing and send again.

- 403 for role: "Only an editor or the owner can change the schedule."
