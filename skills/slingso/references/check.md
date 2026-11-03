# check: one query across the assistants, now

## When

"How does ChatGPT answer 'best running shoes for flat feet'?", "slingso check <query>", or any one-off question about what the assistants say right now.

Take the query from the user's words. If it is unclear, ask once: "Check '<your best reading>'?" Unframed: never add a persona or context to the query.

## With server checks on

When the workspace has the server add-on on (`workspace_get` → `schedule.server_checks`, or `get_monitor_plan` → `runs_on: server`):

1. Find the query in `scenarios_list` (active, the same wording).
2. **Tracked:** ask once, with the estimate (assistants × $0.015): "Check it now on Slingso's servers? About $0.06 from the balance, recorded with your checks." On yes, `run_server_checks` with its `scenario_ids: [id]`, then follow and narrate it with `get_run_progress` exactly as [monitor.md](monitor.md) does (pass each `cursor` back as `since`), and end with the per-assistant summary below.
3. **Not tracked:** ask one question, default track: "Track this query (Slingso checks it now and on every run), or check it in your browser without recording?"
   - Track: `scenarios_create` with the query and its stage (ask the stage only if it is not obvious; default to your best reading), then `run_server_checks` with the new id, as above.
   - Browser: the steps below. Nothing is recorded.

## In the browser

Without the add-on, before onboarding, or when the user chose the browser:

1. Pick the assistants: the workspace's monitored assistants (`workspace_get` → `schedule.assistants`), or all of `plan.assistants_catalogue` if none are set. No workspace yet: ChatGPT, Google AI Mode, Google AI Overviews and Gemini.
2. Pick the browser per [browser.md](browser.md): the one the user asked for, else one that opens its own fresh browser.
3. For each assistant: a new temporary chat, the query exactly as the user wrote it, wait for the full answer.
4. Read the answers yourself. No extraction rows and no server calls are needed.

A browser check writes nothing. It is not recorded and does not move any number. If the user wants it kept, ask: "Add this query to your monitoring?" On yes, `scenarios_create` with the query and its stage. It is then asked on every monitor run. Recording this answer as an observation needs a monitor run: run [monitor.md](monitor.md) for it instead.

## Tell the user

Per assistant, three lines at most: who it recommends first, whether the brand appears (and where), anything it gets wrong about the brand. Then one line comparing them. Quote the assistant's words when a claim matters. Never invent what an answer said.

## Walls

None. `check` runs in this AI assistant on every plan, and works before onboarding; with the add-on on, a tracked query can run on Slingso's servers.

## If it fails

- No browser: offer to give the user the query to paste into each assistant, then read the answers they paste back. With the add-on on, offer to track it and check it on Slingso's servers instead.
- An assistant blocks (captcha, sign-in wall, limit): say which and what it showed, and skip it. The user can sign in and ask again.
- A server check refused (server checks off, balance too low, query not tracked): relay the fix in one line.
