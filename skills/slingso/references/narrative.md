# narrative: what the assistants say

## When

"What does ChatGPT say about us?", "are they getting our product right", "slingso narrative".

## Calls, in order

1. `get_performance_summary` for `narrative_accuracy` (value, change).
2. `observations_list` with `include_answer: true`, `limit` 20, newest first (add `assistant` or `scenario_id` when the user narrows it). Read the stored claims and answers.
3. `workspace_get` for Brand Soul, and `products_get` for the product's key attributes.

## Tell the user

- Narrative Accuracy: value and change, one line.
- What the assistants get wrong: up to three claims that contradict Brand Soul or the product page, each with the assistant and a short quote.
- What they leave out: up to three key attributes rarely mentioned.
- One question: "Find the fixes now?" → [analyse.md](analyse.md).

Quote; never paraphrase a claim into something stronger. Never invent a claim. Never explain how the score is computed.

## Walls

None. On Free the claims are checked against Brand Soul only, with no competitor comparison; don't mention it unless asked.

## If it fails

- No observations: "Nothing recorded yet. Run the monitor first?"
