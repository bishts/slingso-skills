# shelf: where you stand

## When

"How are we doing on ChatGPT?", "what's our Shelf Share", "are we winning on Gemini", "slingso shelf".

## Calls, in order

1. `get_performance_summary` with `days` (default 30). Add `assistant` when the user names one, `product_id` when they name a product (`products_list` to find it).
2. For competitors, the same response carries pinned `competitors`.

## Tell the user

- **Shelf Share**: how much of the AI shelf your products get, against pinned competitors.
- **Purchase Likelihood**: when shoppers are close to buying, how often you would be the pick.
- Value, change over the window, and the trend word the server gives. One line each.
- The pattern that matters, in one line: high Shelf Share and low Purchase Likelihood means you are considered but lose at the decision (price, offer, where to buy, being named the pick). Low Shelf Share and high Purchase Likelihood means you win when found, but are not found enough.

Never explain how the numbers are computed; it is not available to you. If asked, say they are Slingso's measures, computed on its servers from what the assistants said.

Never compute or estimate a number. No data yet: "No numbers yet. Run the monitor first?"

## Walls

None. Every plan sees all three numbers.

## If it fails

- Unknown product: list the products and ask which one.
