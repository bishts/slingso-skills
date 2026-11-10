# check: everything due, or one question now

`slingso check` with no question checks everything due (it was `monitor`; `slingso monitor` still works). `slingso check <question>` asks one question now.

## When

- Everything due: "slingso check", "slingso monitor", "run my checks now", a scheduled task, or the briefing says a check is due. Onboarding's first check runs on its own, on every plan ([init.md](init.md)); this is for the checks after it.
- One question: "How does ChatGPT answer 'best running shoes for flat feet'?", "slingso check <question>", or any one-off question about what the assistants say right now. Take the question from the user's words. If it is unclear, ask once: "Check '<your best reading>'?" Unframed: never add a persona or context to it.

## Everything due

### With Autopilot on: check now

`get_monitor_plan`. If `runs_on` is `server`, Autopilot is on: Slingso checks for the user, in the workspace's market. Do not open a browser.

1. One line from `get_briefing`'s `monitor`: when Slingso last checked and when it checks next. Then offer an extra check now, with the estimate (questions × assistants × personas × $0.015; counts from `scenarios_list` and `workspace_get`): "Check all 12 questions now on Autopilot? About $0.36 from the balance." If the user already asked to check now, that is the yes: skip the question. In a scheduled task, don't run; report and stop. If the user only wanted to know where things stand, add what moved (`get_performance_summary`) and stop.
2. On yes: `run_server_checks`, with no `scenario_ids` for every active question, or the `scenario_ids` of the tracked questions the user chose (`scenarios_list`).
   - `started`: "Started: 24 checks, $0.36 from the balance." (`planned`, `cost_usd`).
   - `running`: an Autopilot check is already going; nothing new started and nothing charged. Say so and follow that one.
3. Follow it with `get_run_progress` about every 20 seconds, passing the `cursor` it last returned as `since`, until `status` is `completed` or `failed`; don't stop after a few reads. Each time:
   - For each new item in `answers`, one line: "<assistant>, '<query>': <picks, joined>. You: <top pick | #rank | not recommended>." Quote the picks as written; never add products of your own.
   - Then the tally in one line: "You were recommended in <with_you> of <answers> answers. <leader.brand> was in <leader.answers>."
   - No new answers: one line, "<recorded> of <planned> answers in." `queued`: it is waiting its turn, not stuck; keep following it.
4. `completed`: the numbers from `get_performance_summary` (never compute them) and what moved, in two lines. On Autopilot, Slingso finds the opportunities on its own once there are 100 new answers; offer an extra look only if the user wants opportunities now ([opportunities.md](opportunities.md)).
5. `failed`: relay its message; the next check is on schedule.

Refusals carry the fix; relay it in one line: Autopilot was turned off meanwhile (offer the browser check below), the balance doesn't cover the check (with the billing page link, https://www.slingso.com/workspace/<code>/billing), or a question isn't tracked (track it first, see "One question" below).

### Otherwise: check in the browser

#### Before you start

1. `get_monitor_plan`. Note `schema_version`, `key_attributes` and `items` (each is one query on one assistant). No items: "Nothing is due. Next check: <next_run_at>." Stop, unless the user asks to check anyway; then check single questions ("One question" below).
2. Read [extract.md](extract.md) and `get_extraction_schema` for this workspace's pinned version: the contract every row meets. Never use a copy from memory or from an earlier session.
3. Pick the browser per [browser.md](browser.md): the one the user asked for, else Playwright. No browser: offer the paste route there, or Autopilot (any plan, from a prepaid balance: [schedule.md](schedule.md)). Before the workspace's first browser check, say once: "A check in your browser shows what your browser's location sees, so check from <market> (or a VPN there)."
4. `claim_work`. Keep `lease_token`. If `resumed` is true, skip every pair in `done[]`: those answers are already stored.
5. State the scope and ask once (skip the question in a scheduled run): "12 questions on 3 assistants: 36 answers, about 20 minutes. Start?"

#### For each pair

Group the pairs by assistant. Each assistant gets its own fresh browser and its questions one at a time; different assistants run in parallel when each can have its own browser, else one after another ([browser.md](browser.md)).

1. Open a **new temporary chat** on that assistant (memory off, history off). One chat per query. Never reuse a chat: earlier turns change the answer.
2. Paste `query` **exactly as written**. No persona, no context, no follow-up.
3. Wait until the answer finishes, including any product cards and sources.
4. Capture the answer's full text and its citations (title, URL).
5. Extract per [extract.md](extract.md): the product rows in answer order, the claims on their rows, the key attributes conveyed, and the other fields the contract lists. Facts only. Never add scores: the contract refuses them and the server computes every metric.
6. Keep only this row:

```json
{ "scenario_id": 12, "assistant": "chatgpt", "captured_at": "<ISO time>", "schema_version": "<from the plan>",
  "key_attributes_version": "<key_attributes.version from the plan>",
  "answer": "<the full answer text>",
  "extraction": { "...": "fields per the extraction contract" },
  "citations": [{ "title": "...", "url": "https://...", "source": "web" }] }
```

7. Let everything else go: page snapshots, screenshots, notes. Do not carry them into the next query.

#### Chunking (long runs)

A run can be hundreds of answers. Never hold them all.

- Hold at most one batch of kept rows (about 25).
- When the batch is full, `observations_create` with `lease_token` and `items`. The server stores each full answer, so drop the rows from your working notes once they are accepted.
- After each batch, one progress line: "Batch 3 sent: 75 of 120 answers recorded."
- Call `complete_run` **only after the last batch is accepted.** Never before. Never twice.

#### Rejected rows

`observations_create` returns `accepted` and `rejected`, each rejection with its reason.

- A row that doesn't fit the schema: fix that row from the answer you still hold and resend only the rejected rows, once. If it is rejected again, note it and move on.
- "already recorded in the run": skip it; it is stored.
- Unknown scenario or an assistant the workspace doesn't monitor: drop the row; tell the user at the end.

#### Finish

1. After the last accepted batch: `complete_run` with `lease_token`. It still closes a run that is short of the plan; Slingso records it as partial ("20 of 30 answers").
2. Report in one or two lines: answers recorded out of planned, and any skipped with why ("20 of 30 answers. Gemini asked for a sign-in, so it was skipped."). Never say skipped pairs are still due: the next check asks the whole plan again.
3. Ask one question: "Find your opportunities now, from everything recorded so far?" (default yes → [opportunities.md](opportunities.md)).

### Resume and interruptions

- A session that stops mid-run loses nothing that was accepted. Next time: `get_monitor_plan`, `claim_work` (it resumes the same run and lists `done[]`), and continue with the rest.
- Lease expired (409 on `observations_create` or `complete_run`): `claim_work` again, then resend the batch you were holding. Stored answers stay stored.

### Assistant limits

- An assistant shows a captcha, a sign-in wall or a rate limit: say which and what it showed, skip it, finish the others, send the last batch, `complete_run`. The user can sign in or fix it and check again.
- Never solve captchas or change account settings. If answers look localized outside the workspace's market (`geo`), tell the user once; they decide.

## One question

### With Autopilot on

When the workspace has Autopilot on (`workspace_get` → `schedule.server_checks`, or `get_monitor_plan` → `runs_on: server`):

1. Find the question in `scenarios_list` (active, the same wording).
2. **Tracked:** ask once, with the estimate (assistants × $0.015): "Check it now on Autopilot? About $0.06 from the balance, recorded with your checks." On yes, `run_server_checks` with its `scenario_ids: [id]`, then follow and narrate it with `get_run_progress` exactly as "Everything due" above does (pass each `cursor` back as `since`), and end with the per-assistant summary below.
3. **Not tracked:** ask one question, default track: "Track this question (Slingso checks it now and every time), or check it in your browser without recording?"
   - Track: `scenarios_create` with the question and its stage (ask the stage only if it is not obvious; default to your best reading), then `run_server_checks` with the new id, as above.
   - Browser: the steps below. Nothing is recorded.

### In the browser

With Autopilot off, before onboarding, or when the user chose the browser:

1. Pick the assistants: the workspace's monitored assistants (`workspace_get` → `schedule.assistants`), or all of `plan.assistants_catalogue` if none are set. No workspace yet: ChatGPT, Google AI Mode, Google AI Overviews and Gemini.
2. Pick the browser per [browser.md](browser.md): the one the user asked for, else one that opens its own fresh browser.
3. For each assistant: a new temporary chat, the question exactly as the user wrote it, wait for the full answer.
4. Read the answers yourself. No extraction rows and no server calls are needed.

A browser check writes nothing. It is not recorded and does not move any number. If the user wants it kept, ask: "Add this question to your checks?" On yes, `scenarios_create` with the question and its stage. It is then asked on every check. Recording this answer needs a full check: run "Everything due" above for it instead.

### Tell the user

Per assistant, three lines at most: who it recommends first, whether the brand appears (and where), anything it gets wrong about the brand. Then one line comparing them. Quote the assistant's words when a claim matters. Never invent what an answer said.

## Walls

None. `check` runs in this AI assistant on every plan, and a single question works before onboarding. With Autopilot on, Slingso does the checking instead of the browser (above).

## If it fails

- 403 for role: "Only an editor or the owner can run checks."
- `observations_create` 422 `batch_too_large`: split into batches of 25.
- Contract 410 (`unknown_version`): stop before running. "This workspace is pinned to a version Slingso no longer serves. Ask the owner to update it." Never extract without the contract.

- No browser: offer to give the user the question to paste into each assistant, then read the answers they paste back. With Autopilot on, offer to track it and check it on Autopilot instead.
- An assistant blocks (captcha, sign-in wall, limit): say which and what it showed, and skip it. The user can sign in and ask again.
- An Autopilot check refused (Autopilot off, balance too low, question not tracked): relay the fix in one line.
