# brief: the briefing

## When

- The default after `get_session` for a finished workspace.
- "What's new", "slingso brief", "anything for me?", the start of a scheduled task.

## Calls, in order

1. `get_briefing`.
2. Lead with what needs this person, then the rest, in this order. Skip any empty part.

| Part | From | Say |
|---|---|---|
| Needs you | `needs_you[]` | mentions first: "@you on '<title>'". Then decisions waiting and unread comments, one line each |
| New opportunities | `new_opportunities[]` | count, then the top three titles with dimension |
| The shelf | `metrics` | Shelf Share, Narrative Accuracy, Purchase Likelihood: value and change, one line |
| Monitoring | `monitor` | due or overdue, last run (who ran it), next run |
| House rules | `proposed_house_rules[]` | "The agent suggests N house rules." Offer to decide them ([teach.md](teach.md)) |
| Competitors | `competitor_intelligence` | only when `available`; one line per change worth acting on; `next_update_at` only if asked |
| Who ran what | `recent_runs[]` | only when a teammate or Slingso ran something since this person last looked |

3. End with one question, the most useful next step, default yes:
   - overdue monitor on Free and Starter: "Run the monitor now?"
   - new monitor runs since the last analysis: "Find opportunities now?"
   - opportunities waiting: "Go through them?" → [review.md](review.md)

Keep the whole briefing under 12 lines. Details on request.

## Walls

None. On Free there is no team, so "needs you" holds only decisions.

## If it fails

- 404: the workspace changed or access was removed. Run [switch.md](switch.md).
- Empty briefing on a new workspace: "Nothing yet. Finish setup (`slingso init`) or run the monitor?"
