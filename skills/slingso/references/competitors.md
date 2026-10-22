# competitors: the comparison set

## When

"Who are we up against?", "what is Brand X doing", "who beats us on 'best trail shoe'", "slingso competitors".

## Calls, in order

1. `competitors_list`: the pins. Each row's `intelligence` is its latest snapshot where the plan includes it (null before the first capture).
2. `get_performance_summary`: Shelf Share and Purchase Likelihood for pinned competitors.
3. For one of your products: `products_get` → `competitor_intelligence` (Growth): each pinned competitor product's price, sellers and rating.
4. For "who else shows up": `observations_list` (recent, `limit` 50) and read the brands in the product rows.

## Tell the user

- The pinned set with their numbers beside yours, one line each. A pending pin: "reading their site". A refused one: its reason, once, with the fix.
- Brand intelligence (Starter weekly, Growth daily): promotions and retailers, only what changed.
- Product intelligence (Growth, daily): price by seller, discounts, stock and rating for pinned competitor products, only what changed.
- When asked how fresh it is: `captured_at`, and `next_update_at` for when the next one lands.
- Unpinned brands that keep appearing: name up to three and offer one pin, default yes: "Pin Brand X?"

Pin a brand with its website: the one Google gave in onboarding's proposal, or the one the user gives. If a brand has none, ask the user once. Never supply a website from memory. After pinning, say only "Slingso is reading their sites."

Never promise or describe numbers, scores or Narrative Accuracy for competitors as a result of pinning or reading their sites.

On Free, names come exactly as the assistants wrote them, duplicates included. Add one line: "Starter merges these into real brands."

## Walls

- Brand intelligence on Free: "Competitor brand intelligence comes with Starter."
- Product intelligence below Growth: "Competitor product intelligence (price, stock, sellers) comes with Growth."
- Suggestions on Free: never call `competitors_suggest`.

## If it fails

- No pins: "No competitors pinned. Pin the brands that keep showing up?"
