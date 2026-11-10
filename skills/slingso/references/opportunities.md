# opportunities: find the ones that matter most

`slingso opportunities` (it was `analyse`; `slingso analyse` still works). Slingso's work ends at the opportunity: each one is a brief (the evidence, the reasoning, what it should change) that the brand's team acts on.

## When

- "slingso opportunities", "slingso analyse", "what should we do", after a check, or a scheduled task.
- With Autopilot on, Slingso also finds the opportunities on its own every 7 days once there are 100 new answers. A look here is an extra one: it reads the same new answers as Slingso's next look and never moves its schedule. Say that once, in a line, before you start.

## Calls, in order

1. `get_analysis_window` (page 1). Keep `session_token`, `contract`, `memory`, `readings` and `sufficiency`: only page 1 carries them. Each page also has answers as facts (`observations`: `id`, `scenario_id`, `provider`, what the answer said) and their queries (`scenarios`).
2. Read every page (`page: 2` up to `pages`) before you reason.
3. Nothing new (`observation_count` is 0 and `memory.pending_evidence` is empty): say "Nothing new since the last look.", `complete_analysis` with summary "nothing new", and offer `check` if it is due.
3a. Too little to go on (`sufficiency.enough` is false: fewer than 100 new answers since the last analysis): before reasoning, tell the user in one line, from `sufficiency` (for example: "This would be an early read: 64 new answers since the last look; a full one needs 100."). Then ask: look now as an early read, or wait? Go ahead if they say so; a scheduled task goes ahead without asking. Below the bar, every opportunity's body opens with "Early read:", and its confidence stays low.
4. `artifacts_list` (`status: open`, `roots: true`): the open opportunities. Never propose one that is already open; if new evidence strengthens it, say so in your summary.
5. Reason (the method below), then write the opportunities with `artifacts_create`, up to 25 per call:

```json
{ "session_token": "...", "items": [
  { "artifact_type": "opportunity", "action_dimension": "content", "metadata": { "priority": "high" },
    "title": "...", "body": "...",
    "evidence": [ { "observation_id": 7801, "quote": "400 mg of magnesium per serving" } ] } ] }
```

6. Fold memory with `memory_update` (below).
7. `complete_analysis` with `session_token` and a one-paragraph `summary`. With Autopilot off this advances the window; with it on, Slingso's own window stays where it is.

Opportunities written here are recorded as found in your assistant; Slingso's own are found by Slingso.

`contract` is what every opportunity and the memory write must meet, pinned to this workspace. Meet it exactly; the rest of this page is how.

## What each opportunity carries

- **One move, as a brief.** A title that says what to do. A body with what is happening, the evidence, the reasoning (why the assistants answer this way) and the move. The brand's team creates from it, so make it complete enough to act on without you.
- **Its evidence.** One or more `observation_id`s from the window, each with a short line quoted from that answer. The body names the assistant and the question too.
- **Its kind** (`action_dimension`): something the brand publishes (`content`, `product`), a signal it earns (`reviews`, `editorial`, `community`, `creator`, `pr`), or a decision it makes (`price`, `distribution`, `promotion`).
- **Its basis.** The body's last line names what it was drawn from, in `sufficiency`'s numbers: "Based on 10 answers from 1 check over 1 day." Slingso records the same basis on the opportunity itself.
- **Its priority** (`metadata.priority`). `high`: a wrong claim or an absence on a decision question, on more than one assistant. `medium`: one assistant, or an early-funnel gap. `low`: a single answer; call it a lead.

## Grounding

- **The brand's words come from its own site.** Suggested copy uses only what `memory.brand_soul` and `memory.products` say. When an answer adds a detail the site never states, report the gap ("your site states no dose; assistants are guessing 400 mg"); don't turn the guess into copy.
- **Assistants are quoted, not believed.** Write "ChatGPT says it runs narrow", never "it runs narrow".
- **Compare only with what you hold.** A comparison with a competitor needs that competitor's own site: its story in `memory.competitors`. Without it, don't compare.
- **Numbers are Slingso's.** Shelf Share, Purchase Likelihood and Narrative Accuracy come from `readings` (the trend from `get_performance_summary`). Never compute or estimate one.
- **Nothing invented.** No product, price, claim, source or number the window, memory or readings don't contain.

## Method

1. **Where the brand stands**, per question and assistant: absent, listed low, the top pick, or dismissed. Absence on comparison, validation and purchase questions costs the most.
2. **What is said wrong**: claims on the brand's rows marked `contradicted`, and `factual_errors`. One wrong claim repeated across assistants is usually the strongest opportunity.
3. **What is said that the site doesn't say**: claims marked `unverified`. The move is to state the brand's own fact on its site, not to repeat the assistant's.
4. **Who wins and why**: the top pick when it isn't the brand, and the reason the answer gives. The cited sources show where assistants learn it. `memory.competitors` says what each pinned rival tells on its own site; never score or rate a rival.
5. **Group by cause.** Answers that share a cause become one opportunity.
6. **Check memory before writing.** House rules and the reasons people gave for rejecting opportunities are binding. Something published recently may not show yet; say so instead of proposing it again.
7. **No data is not absence.** An assistant with no answers in the window tells you nothing about that assistant.

## Memory

No request folds memory on the server; this session does.

1. `memory.pending_evidence` lists feedback (rejections, revisions) and outcomes (published, done), each with `at`, `section`, `line`.
2. Rewrite the Brand Memory document (`memory.brand_memory`) to hold that evidence and what this window showed. Update lines; don't append a log.
3. Send:

```json
{ "session_token": "...", "items": [
  { "action": "update_brand_memory", "body": "<the whole new document>",
    "lock_version": <memory.brand_memory_lock_version, 0 before the first one>, "distilled_through": "<the newest `at` you folded in>" } ] }
```

   Add `{ "action": "add_belief", "statement": "...", "evidence": "..." }` for a pattern across several answers, and `confirm_watchlist_item` or `expire_watchlist_item` when the window settles something on `memory.watchlist`.
   If the brand keeps making the same correction and memory has no rule for it, add `{ "action": "propose_house_rule", "rule": "<one sentence>" }`. It waits for a person; offer to decide it now ([teach.md](teach.md)).

### Memory changed while you worked

1. The memory write is refused as stale, with the current version. The other items report their own results; don't resend accepted ones.
2. `memory_read`, then merge: start from the current document, add what you learned, keep what the other session added; where they disagree, keep the newer evidence.
3. Resend only the Brand Memory item with the new version.
4. Refused again: stop writing memory; the evidence stays pending. Say: "Brand Memory changed twice while I worked. The opportunities are saved; I'll fold the notes in next time." Then `complete_analysis`.

## Tell the user

One line per new opportunity, highest priority first: title and kind, found in your assistant. Then one question: "Want me to draft the content ones from their briefs?" (only when `content` or `product` ones exist; default yes). With teammates (`members_list` shows more than one), ask instead: "Leave them for the team to review?"

## Walls

None. Every plan can find opportunities in its own AI assistant.

## If it fails

- Slingso is already looking at this workspace (refused as already running): say "Slingso is finding your opportunities now. They'll be in your inbox in a few minutes." and stop. Don't retry; offer to go through them once they land ([review.md](review.md)).
- The session expired: `get_analysis_window` again (it resumes when it can), then resend what wasn't accepted.
- An opportunity refused: the message names what's missing. Fix that item and resend it.
- Role: "Only an editor or the owner can look for opportunities."
