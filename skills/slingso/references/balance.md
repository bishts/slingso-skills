# balance: the prepaid balance

Server checks run on any plan: Slingso asks the queries on its servers, in the workspace's market, at $0.015 a run, from a prepaid balance. The owner tops it up on the billing page. Checks in the user's AI assistant are free and never touch it. At zero, server checks pause.

## When

"How much balance is left?", "top up", "will my checks stop?", "can Slingso run my checks?", "slingso balance".

## Calls, in order

1. `get_balance`.
2. `prepaid` false: relay its `message` in one line.
3. Otherwise say: balance in dollars, price per run, and roughly how long it lasts at the current schedule (queries × personas × assistants × runs a month × price per run; get counts from `scenarios_list`, `personas_list` and `workspace_get`). Say it is an estimate. With server checks off (`schedule.server_checks` false), say the balance is only spent once they're on.
4. Top-ups: any whole-dollar amount from `topup_min_cents` to `topup_max_cents` (say them in dollars), with `topup_suggestions_cents` as quick picks. Top-ups are manual, on the dashboard's billing page: https://www.slingso.com/workspace/<code>/billing. Never collect card details in chat.

When the balance runs out, server checks pause and an email goes out. Nothing else changes: data, schedule and analysis stay as they are.

Never call it "credits". It is a prepaid balance in dollars. Never say it expires or that it doesn't. If asked: unused balance isn't refunded.

## Walls

- Not the owner: "Only the owner can see billing."

## If it fails

- 403: the not-owner wall.
