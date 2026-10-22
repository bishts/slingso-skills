# check: one query across the assistants, now

## When

"How does ChatGPT answer 'best running shoes for flat feet'?", "slingso check <query>", or any one-off question about what the assistants say right now.

## Calls, in order

1. Take the query from the user's words. If it is unclear, ask once: "Check '<your best reading>'?"
2. Pick the assistants: the workspace's monitored assistants (`workspace_get` → `schedule.assistants`), or all of `plan.assistants_catalogue` if none are set. No workspace yet: ChatGPT, Google AI Mode, Google AI Overviews and Gemini.
3. Pick the browser per [browser.md](browser.md): the one the user asked for, else one that opens its own fresh browser.
4. For each assistant: a new temporary chat, the query exactly as the user wrote it, wait for the full answer.
5. Read the answers yourself. No extraction rows and no server calls are needed.

Unframed: never add a persona or context to the query.

## Tell the user

Per assistant, three lines at most: who it recommends first, whether the brand appears (and where), anything it gets wrong about the brand. Then one line comparing them. Quote the assistant's words when a claim matters. Never invent what an answer said.

## Not a monitoring run

`check` writes nothing. It is not recorded and does not move any number. If the user wants it kept, ask: "Add this query to your monitoring?" On yes, `scenarios_create` with the query and its stage (ask the stage only if it is not obvious; default to your best reading). It is then asked on every monitor run.

Recording this answer as an observation needs a monitor run: run [monitor.md](monitor.md) for it instead.

## Walls

None. `check` runs in this AI assistant on every plan, and works before onboarding.

## If it fails

- No browser: offer to give the user the query to paste into each assistant, then read the answers they paste back.
- An assistant blocks (captcha, sign-in wall, limit): say which and what it showed, and skip it. The user can sign in and ask again.
