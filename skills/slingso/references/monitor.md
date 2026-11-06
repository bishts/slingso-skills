# monitor: run everything due

## When

- "slingso monitor", "run the monitor", "run my checks now", a scheduled task, or the briefing says monitoring is due.

Onboarding's first check runs on Slingso's servers, on every plan ([init.md](init.md)); this command is for the checks after it.

## With server checks on: run now on Slingso's servers

`get_monitor_plan`. If `runs_on` is `server`, the server add-on is on: Slingso monitors on its own servers, in the workspace's market. Do not open a browser.

1. One line from `get_briefing`'s `monitor`: when Slingso last ran and when it runs next. Then offer an extra run now, with the estimate (queries × assistants × personas × `price_per_run_usd` from `get_balance`; counts from `scenarios_list` and `workspace_get`): "Run all 12 queries now on Slingso's servers? About $0.31 from the balance." If the user already asked to run now, that is the yes: skip the question. In a scheduled task, don't run; report and stop. If the user only wanted to know where things stand, add what moved (`get_performance_summary`) and stop.
2. On yes: `run_server_checks`, with no `scenario_ids` for every active query, or the `scenario_ids` of the tracked queries the user chose (`scenarios_list`).
   - `started`: "Started: 24 runs, $0.36 from the balance." (`planned`, `cost_usd`).
   - `running`: a server run is already going; nothing new started and nothing charged. Say so and follow that one.
3. Follow it with `get_run_progress` about every 20 seconds, passing the `cursor` it last returned as `since`, until `status` is `completed` or `failed`; don't stop after a few reads. Each time:
   - For each new item in `answers`, one line: "<assistant>, '<query>': <picks, joined>. You: <top pick | #rank | not recommended>." Quote the picks as written; never add products of your own.
   - Then the tally in one line: "You were recommended in <with_you> of <answers> answers. <leader.brand> was in <leader.answers>."
   - No new answers: one line, "<recorded> of <planned> answers in." `queued`: it is waiting its turn on Slingso's servers, not stuck; keep following it.
4. `completed`: the numbers from `get_performance_summary` (never compute them) and what moved, in two lines. Slingso analyses on its own once there are 100 new answers; offer an extra look only if the user wants opportunities now ([analyse.md](analyse.md)).
5. `failed`: relay its message; the next run is on schedule.

Refusals carry the fix; relay it in one line: server checks were turned off meanwhile (offer the browser run below), the balance doesn't cover the run (with the billing page link, https://www.slingso.com/workspace/<code>/billing), or a query isn't tracked (track it first, see [check.md](check.md)).

## Otherwise: run it in the browser

### Before you start

1. `get_monitor_plan`. Note `schema_version`, `key_attributes` and `items` (each is one query on one assistant). No items: "Nothing is due. Next run: <next_run_at>." Stop, unless the user asks to run anyway; then use `check` for single queries.
2. Read [extract.md](extract.md) and `get_extraction_schema` for this workspace's pinned version: the contract every row meets. Never use a copy from memory or from an earlier session.
3. Pick the browser per [browser.md](browser.md): the one the user asked for, else Playwright. No browser: offer the paste route there, or the server add-on (any plan, from a prepaid balance: [schedule.md](schedule.md)). Before the workspace's first browser run, say once: "A run in your browser shows what your browser's location sees, so run it from <market> (or a VPN there)."
4. `claim_work`. Keep `lease_token`. If `resumed` is true, skip every pair in `done[]`: those answers are already stored.
5. State the scope and ask once (skip the question in a scheduled run): "12 queries on 3 assistants: 36 answers, about 20 minutes. Start?"

### For each pair

Group the pairs by assistant. Each assistant gets its own fresh browser and its queries one at a time; different assistants run in parallel when each can have its own browser, else one after another ([browser.md](browser.md)).

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

### Chunking (long runs)

A run can be hundreds of answers. Never hold them all.

- Hold at most one batch of kept rows (about 25).
- When the batch is full, `observations_create` with `lease_token` and `items`. The server stores each full answer, so drop the rows from your working notes once they are accepted.
- After each batch, one progress line: "Batch 3 sent: 75 of 120 answers recorded."
- Call `complete_run` **only after the last batch is accepted.** Never before. Never twice.

### Rejected rows

`observations_create` returns `accepted` and `rejected`, each rejection with its reason.

- A row that doesn't fit the schema: fix that row from the answer you still hold and resend only the rejected rows, once. If it is rejected again, note it and move on.
- "already recorded in the run": skip it; it is stored.
- Unknown scenario or an assistant the workspace doesn't monitor: drop the row; tell the user at the end.

### Finish

1. After the last accepted batch: `complete_run` with `lease_token`. It still closes a run that is short of the plan; Slingso records it as partial ("20 of 30 answers").
2. Report in one or two lines: answers recorded out of planned, and any skipped with why ("20 of 30 answers. Gemini asked for a sign-in, so it was skipped."). Never say skipped pairs are still due: the next monitor asks the whole plan again.
3. Ask one question: "Run the analysis now on everything recorded so far?" (default yes → [analyse.md](analyse.md)).

## Resume and interruptions

- A session that stops mid-run loses nothing that was accepted. Next time: `get_monitor_plan`, `claim_work` (it resumes the same run and lists `done[]`), and continue with the rest.
- Lease expired (409 on `observations_create` or `complete_run`): `claim_work` again, then resend the batch you were holding. Stored answers stay stored.

## Assistant limits

- An assistant shows a captcha, a sign-in wall or a rate limit: say which and what it showed, skip it, finish the others, send the last batch, `complete_run`. The user can sign in or fix it and run the monitor again.
- Never solve captchas or change account settings. If answers look localized outside the workspace's market (`geo`), tell the user once; they decide.

## Walls

None. With server checks on, `monitor` runs on Slingso's servers instead of the browser (above).

## If it fails

- 403 for role: "Only an editor or the owner can run the monitor."
- `observations_create` 422 `batch_too_large`: split into batches of 25.
- Contract 410 (`unknown_version`): stop before running. "This workspace is pinned to a version Slingso no longer serves. Ask the owner to update it." Never extract without the contract.
