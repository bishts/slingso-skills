# schedule: when Slingso checks, Autopilot on or off, the balance

The one place for when Slingso checks (which AI Shopping Channels, daily or weekly, the day and time, the timezone), Autopilot on or off (also `autopilot`), the reminder email, and the prepaid balance Autopilot runs on (also `balance`).

## The schedule

### When

"Check weekly", "every Monday at 9", "add Gemini", "remind me by email", "stop reminding me", "I'm in UTC-04:00 now", "turn on Autopilot", "slingso autopilot", "slingso schedule". Setup sets the first schedule itself when it knows the user's timezone (weekly, Monday 09:00, with a reminder); set or change it here.

### Calls, in order

1. `workspace_get` → `schedule` (`assistants`, `cadence`, `day`, `time`, `utc_offset`, `remind`, `server_checks`, `next_run_at_local`) and `plan.assistants_catalogue`. `get_session` → `user.utc_offset`.
2. Show the schedule in the user's time, with every assistant on the plan and which are on: "Available: ChatGPT, Google AI Mode, Google AI Overviews, Gemini. On: ChatGPT and Gemini, every Monday at 09:00 (UTC+05:30), with a reminder email." Name the assistants; never count them (not "four assistants", not "all four"). Ask one question with the change as default; if the user didn't say what to change ("change which assistants you check"), ask which ones, with no default. End on the question.
   - No schedule yet (`cadence` null) or the user asks to change when: suggest weekly on Monday at 09:00, or daily, another day or time. Schedules are daily or weekly.
   - Timezone: if `user.utc_offset` is null, propose the offset you can tell: in Claude Code, run `date +%z` (+0530 is UTC+05:30); elsewhere, the user's local time if you know it. Fold it into the question so the answer confirms it, and say they can give another day, time or timezone. If you can't tell, ask for it inside that question ("…at 09:00 your time? Which timezone, for example UTC+05:30?").
3. Only after the user answers, `set_schedule` once with what changed (with no schedule yet, the assistants and the when together; never save part of it first):
   - `assistants` from the catalogue;
   - `cadence`: `daily` or `weekly`;
   - `day`: a weekday for weekly (`monday`); none for daily;
   - `time`: `HH:MM`, 24-hour, in the user's time;
   - `utc_offset`: the user's timezone as `UTC+05:30`. Send it whenever you send a time and the user's saved offset is null or has changed. Turn a city or zone name into its current offset yourself;
   - `remind` (when the user's assistant runs the checks): `true` emails the workspace owner at that time; `false` stops the email;
   - `server_checks`: `true` turns Autopilot on; `false` hands the checking back to the user's assistant.
4. Confirm from the response: "Next check: Monday 19 Oct, 09:00 (UTC+05:30)." (`schedule.next_run_at_local`).

## Autopilot on or off

The workspace's choice, on any plan (`schedule.server_checks`). Present Autopilot from `get_session.server_addon` (`includes`, `price_per_run_usd`) as written, and the table in SKILL.md's "Plans and Autopilot" when the user asks what changes.

- **Off: the user's assistant checks.** The time is when a check is due and when the owner is reminded (if `remind`). The assistant checks in a browser on the user's computer, and finds opportunities when asked. Free.
- **On: Autopilot.** Slingso checks at that time, in the workspace's market, finds the opportunities every 7 days once there are 100 new answers, and emails them. The user can also check now, on demand ([check.md](check.md)). Drafting from a brief still happens in the assistant, when asked. Never send `remind` (it's refused: there's nothing to remind). Every check is $0.015 from the prepaid balance; finding opportunities costs nothing extra. Say the estimate when turning it on, or when the cadence or assistants grow: questions × personas × assistants × times a month × $0.015. At zero balance, Autopilot pauses.

Turning it on needs a balance. Without one, Slingso refuses with the fix: relay it with the billing page link (https://www.slingso.com/workspace/<code>/billing).

Either way the record is the same, so switching continues the same history.

Intelligence (competitor brand and product) runs on the plan's own cycle: weekly on Starter, daily on Growth. It is not set here.

Where this assistant can run scheduled tasks, see [scheduling.md](scheduling.md) (only with Autopilot off).

## The balance

Autopilot runs from a prepaid balance in dollars: $0.015 a check, on any plan. The owner tops it up on the billing page. Checks in the user's AI assistant are free and never touch it.

### When

"How much balance is left?", "top up", "will my checks stop?", "can Slingso check for me?", "slingso balance".

### Calls, in order

1. `get_balance`.
2. `prepaid` false: relay its `message` in one line.
3. Otherwise say: balance in dollars, price per check, and roughly how long it lasts at the current schedule (questions × personas × assistants × times a month × price per check; get counts from `scenarios_list`, `personas_list` and `workspace_get`). Say it is an estimate. With Autopilot off (`schedule.server_checks` false), say the balance is only spent once it's on.
4. Top-ups: any whole-dollar amount from `topup_min_cents` to `topup_max_cents` (say them in dollars), with `topup_suggestions_cents` as quick picks. Top-ups are manual, on the dashboard's billing page: https://www.slingso.com/workspace/<code>/billing. Never collect card details in chat.

When the balance runs out, Autopilot pauses and an email goes out. Nothing else changes: data and schedule stay as they are.

Never call it "credits". It is a prepaid balance in dollars. Never say it expires or that it doesn't. If asked: unused balance isn't refunded.

## Walls

- The balance, not the owner: "Only the owner can see billing."

## If it fails

The error says what to send: an assistant not in the catalogue (it lists the ones available), a cadence other than daily or weekly, a day or time it can't read, or a missing `utc_offset`. Ask for that one thing and send again.

- 403 for role on the schedule: "Only an editor or the owner can change the schedule."
- 403 on the balance: the not-owner wall.
