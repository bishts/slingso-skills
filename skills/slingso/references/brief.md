# brief: the briefing, the shelf and the narrative

One command, three asks:

- **The briefing** (the default): what's new and what needs this person.
- **The shelf** (also `shelf`): Shelf Share and Purchase Likelihood, where the brand stands.
- **The narrative** (also `narrative`): what the AI Shopping Channel says about the brand, and what it gets wrong.

## The briefing

### When

- The default after `get_session` for a finished workspace.
- "What's new", "slingso brief", "anything for me?", the start of a scheduled task.

### Calls, in order

1. `get_briefing`.
2. Lead with what needs this person, then the rest, in this order. Skip any empty part.

| Part | From | Say |
|---|---|---|
| Needs you | `needs_you[]` | mentions first: "@you on '<title>'". Then decisions waiting and unread comments, one line each |
| New opportunities | `new_opportunities[]` | count, then the top three titles with dimension and who found them ("found by Slingso", "found in your assistant") |
| The shelf | `metrics` | Shelf Share, Narrative Accuracy, Purchase Likelihood: value and change, one line |
| Checks | `monitor` | due or overdue, last check (who did it: the user's assistant or Autopilot), next check |
| Opportunities due | `analysis` | with Autopilot on (`runs_on: server`), when Slingso next looks for opportunities, in one line, from `next`: "Next opportunities: <due_at, in the user's time>." when `enough`; otherwise "Slingso looks once there are 100 new answers (64 so far)." With Autopilot off: skip, unless asked when the last look was |
| House rules | `proposed_house_rules[]` | "The agent suggests N house rules." Offer to decide them ([teach.md](teach.md)) |
| Competitors | `competitor_intelligence` | only when `available`; one line per change worth acting on; `next_update_at` only if asked |
| Who ran what | `recent_runs[]` | only when a teammate or Slingso ran something since this person last looked |

3. End with one question, the most useful next step, default yes:
   - opportunities waiting: "Go through them?" → [review.md](review.md)
   - a check overdue, with Autopilot off: "Check now?" → [check.md](check.md)
   - new checks since the last look, with Autopilot off: "Find your opportunities now?" → [opportunities.md](opportunities.md). With Autopilot on, Slingso finds them on its own; offer a look here only if the user asks.

Keep the whole briefing under 12 lines. Details on request.

### Walls

None. On Free there is no team, so "needs you" holds only decisions.

## The shelf

### When

"How are we doing on ChatGPT?", "what's our Shelf Share", "are we winning on Gemini", "slingso shelf".

### Calls, in order

1. `get_performance_summary` with `days` (default 30). Add `assistant` when the user names one, `product_id` when they name a product (`products_list` to find it).
2. For competitors, the same response carries pinned `competitors`.

### Tell the user

- **Shelf Share**: how much of the AI shelf your products get, against pinned competitors.
- **Purchase Likelihood**: when shoppers are close to buying, how often you would be the pick.
- Value, change over the window, and the trend word the server gives. One line each.
- The pattern that matters, in one line: high Shelf Share and low Purchase Likelihood means you are considered but lose at the decision (price, offer, where to buy, being named the pick). Low Shelf Share and high Purchase Likelihood means you win when found, but are not found enough.

Never explain how the numbers are computed; it is not available to you. If asked, say they are Slingso's measures, computed on its servers from what the assistants said.

Never compute or estimate a number. No data yet: "No numbers yet. Check first?"

### Walls

None. Every plan sees all three numbers.

## The narrative

### When

"What does ChatGPT say about us?", "are they getting our product right", "slingso narrative".

### Calls, in order

1. `get_performance_summary` for `narrative_accuracy` (value, change).
2. `observations_list` with `include_answer: true`, `limit` 20, newest first (add `assistant` or `scenario_id` when the user narrows it). Read the stored claims and answers.
3. `workspace_get` for Brand Soul, and `products_get` for the product's key attributes.

### Tell the user

- Narrative Accuracy: value and change, one line.
- What the assistants get wrong: up to three claims that contradict Brand Soul or the product page, each with the assistant and a short quote.
- What they leave out: up to three key attributes rarely mentioned.
- One question: "Find your opportunities now?" → [opportunities.md](opportunities.md).

Quote; never paraphrase a claim into something stronger. Never invent a claim. Never explain how the score is computed.

### Walls

None.

## If it fails

- 404: the workspace changed or access was removed. Run [switch.md](switch.md).
- Empty briefing on a new workspace: "Nothing yet. Finish setup (`slingso init`) or check now?"
- Unknown product: list the products and ask which one.
- No observations: "Nothing recorded yet. Check first?"
