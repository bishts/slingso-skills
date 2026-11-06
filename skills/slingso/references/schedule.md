# schedule: when the monitor runs, who does the work, the balance

The one place for when the monitor runs (which AI Shopping Channels, daily or weekly, the day and time, the timezone), who does the work (the user's assistant, or the server add-on), the reminder email, and the prepaid balance the add-on runs on (also `balance`).

## The schedule

### When

"Monitor weekly", "every Monday at 9", "add Gemini", "remind me by email", "stop reminding me", "I'm in UTC-04:00 now", "run my checks on your servers", "slingso schedule". Setup sets the first schedule itself when it knows the user's timezone (weekly, Monday 09:00, with a reminder); set or change it here.

### Calls, in order

1. `workspace_get` → `schedule` (`assistants`, `cadence`, `day`, `time`, `utc_offset`, `remind`, `server_checks`, `next_run_at_local`) and `plan.assistants_catalogue`. `get_session` → `user.utc_offset`.
2. Show the schedule in the user's time, with every assistant on the plan and which are on: "Available: ChatGPT, Google AI Mode, Google AI Overviews, Gemini. On: ChatGPT and Gemini, every Monday at 09:00 (UTC+05:30), with a reminder email." Name the assistants; never count them. Ask one question with the change as default. The user can switch assistants on or off any time.
   - No schedule yet (`cadence` null) or the user asks to change when: suggest weekly on Monday at 09:00, or daily, another day or time. Schedules are daily or weekly.
   - Timezone: if `user.utc_offset` is null, propose the offset you can tell: in Claude Code, run `date +%z` (+0530 is UTC+05:30); elsewhere, the user's local time if you know it. Fold it into the question so the answer confirms it; the user can change it. If you can't tell, ask for it inside that question ("…at 09:00 your time? Which timezone, for example UTC+05:30?").
3. `set_schedule` with what changed:
   - `assistants` from the catalogue;
   - `cadence`: `daily` or `weekly`;
   - `day`: a weekday for weekly (`monday`); none for daily;
   - `time`: `HH:MM`, 24-hour, in the user's time;
   - `utc_offset`: the user's timezone as `UTC+05:30`. Send it whenever you send a time and the user's saved offset is null or has changed. Turn a city or zone name into its current offset yourself;
   - `remind` (when the user's assistant runs the checks): `true` emails the workspace owner at that time; `false` stops the email;
   - `server_checks`: `true` turns the server add-on on; `false` hands the work back to the user's assistant.
4. Confirm from the response: "Next run: Monday 19 Oct, 09:00 (UTC+05:30)." (`schedule.next_run_at_local`).

## Who does the work

The workspace's choice, on any plan (`schedule.server_checks`). Present the add-on from `get_session.server_addon` (`includes`, `price_per_run_usd`) as written, and the Monitor / Analyse / Create table in SKILL.md's "Plans and the server add-on" when the user asks what changes.

- **Off: the user's assistant.** The time is when the monitor is due and when the owner is reminded (if `remind`). The assistant runs it in a browser on the user's computer, and analyses when asked. Free.
- **On: the server add-on.** Slingso monitors on its servers at that time, in the workspace's market, and analyses every 7 days once there are 100 new answers, and emails the opportunities. The user can also run checks now, on demand ([monitor.md](monitor.md)). Create still happens in the assistant. Never send `remind` (it's refused: there's nothing to remind). Every run is $0.015 from the prepaid balance; analysis costs nothing extra. Say the estimate when turning it on, or when the cadence or assistants grow: queries × personas × assistants × runs a month × $0.015. At zero balance, server checks pause.

Turning it on needs a balance. Without one, Slingso refuses with the fix: relay it with the billing page link (https://www.slingso.com/workspace/<code>/billing).

Either way the record is the same, so switching continues the same history.

Intelligence (competitor brand and product) runs on the plan's own cycle: weekly on Starter, daily on Growth. It is not set here.

Where this assistant can run scheduled tasks, see [scheduling.md](scheduling.md) (only without the add-on).

## The balance

The add-on runs from a prepaid balance in dollars: $0.015 a run, on any plan. The owner tops it up on the billing page. Checks in the user's AI assistant are free and never touch it.

### When

"How much balance is left?", "top up", "will my checks stop?", "can Slingso run my checks?", "slingso balance".

### Calls, in order

1. `get_balance`.
2. `prepaid` false: relay its `message` in one line.
3. Otherwise say: balance in dollars, price per run, and roughly how long it lasts at the current schedule (queries × personas × assistants × runs a month × price per run; get counts from `scenarios_list`, `personas_list` and `workspace_get`). Say it is an estimate. With server checks off (`schedule.server_checks` false), say the balance is only spent once they're on.
4. Top-ups: any whole-dollar amount from `topup_min_cents` to `topup_max_cents` (say them in dollars), with `topup_suggestions_cents` as quick picks. Top-ups are manual, on the dashboard's billing page: https://www.slingso.com/workspace/<code>/billing. Never collect card details in chat.

When the balance runs out, server checks pause and an email goes out. Nothing else changes: data and schedule stay as they are.

Never call it "credits". It is a prepaid balance in dollars. Never say it expires or that it doesn't. If asked: unused balance isn't refunded.

## Walls

- The balance, not the owner: "Only the owner can see billing."

## If it fails

The error says what to send: an assistant not in the catalogue (it lists the ones available), a cadence other than daily or weekly, a day or time it can't read, or a missing `utc_offset`. Ask for that one thing and send again.

- 403 for role on the schedule: "Only an editor or the owner can change the schedule."
- 403 on the balance: the not-owner wall.
