# help: the commands

## When

"slingso help", "/slingso help", "/slingso" with no command (after onboarding), "what can slingso do?".

## Calls

`get_session` only: skip the briefing the routing table would otherwise fetch. No other call, no writes.

## Tell the user

The commands as one short table, grouped, a few words each:

| Group | Command | Does |
|---|---|---|
| Where you stand | `check` | check everything due, or one question now (`check <question>`) |
| | `brief` | the briefing, your shelf and what the AI Shopping Channel says |
| | `competitors` | who you're up against: suggestions and pins |
| Your opportunities | `opportunities` | find the ones that matter most, each a brief |
| | `create` | draft from an opportunity's brief, here in your assistant |
| | `teach` | a house rule in one sentence |
| What changed | `review` | decide on opportunities, record what went live |
| How you use it | `init` | set up your brand |
| | `schedule` | when Slingso checks, Autopilot on or off, the balance |
| | `export` | every recorded answer, as CSV or JSON |

Then one line: "Also: `status`, `switch`, `invite`, `help`." Say them as "slingso <command>"; in the Claude plugin each of the ten is also its own slash command (`/slingso:check`). The old words `monitor` and `analyse` still work.

Then one line naming what the plan walls off, from `get_session`'s plan, only if anything: on Free, "Teammates, more products and intelligence on your pinned rivals come with Starter." On Starter, "Persona simulation and daily intelligence come with Growth." Add, once, on any plan: "Autopilot can check and find your opportunities for you on any plan, from a balance." Nothing more about plans.

End with one suggested next command, from `get_session` alone: onboarding unfinished → `init`; otherwise skip the suggestion (do not call anything else to find one).

## Walls

None.
