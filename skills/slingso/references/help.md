# help: the commands

## When

"slingso help", "/slingso help", "/slingso" with no command (after onboarding), "what can slingso do?".

## Calls

`get_session` only: skip the briefing the routing table would otherwise fetch. No other call, no writes.

## Tell the user

The commands as one short table, grouped, a few words each:

| Group | Command | Does |
|---|---|---|
| Set up | `init` | set up your brand |
| | `competitors` | who you're up against: suggestions and pins |
| | `teach` | a house rule in one sentence |
| Monitor | `check` | one query across the AI Shopping Channel, now |
| | `monitor` | run everything due, or run now on Slingso's servers |
| | `brief` | the briefing, your shelf and what the AI Shopping Channel says |
| Analyse | `analyse` | find opportunities |
| Create | `create` | write or revise what an opportunity needs |
| | `review` | decide on opportunities, record what went live |
| Settings | `schedule` | when the monitor runs, who does the work, the balance |
| | `export` | every recorded answer, as CSV or JSON |

Then one line: "Also: `status`, `switch`, `invite`, `help`." Say them as "slingso <command>"; in the Claude plugin each of the eleven is also its own slash command (`/slingso:monitor`).

Then one line naming what the plan walls off, from `get_session`'s plan, only if anything: on Free, "Teammates and more products come with Starter." On Starter, "Persona simulation and daily intelligence come with Growth." Add, once, on any plan: "Slingso's servers can monitor and analyse for you on any plan, from a balance." Nothing more about plans.

End with one suggested next command, from `get_session` alone: onboarding unfinished → `init`; otherwise skip the suggestion (do not call anything else to find one).

## Walls

None.
