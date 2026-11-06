# competitors: the comparison set, suggestions and pins

One command for who the brand is up against: the pinned set and their intelligence, suggestions for who to pin, and pinning or unpinning (also `pin`, `unpin`).

## The comparison set

### When

"Who are we up against?", "what is Brand X doing", "who beats us on 'best trail shoe'", "slingso competitors".

### Calls, in order

1. `competitors_list`: the pins. Each row's `intelligence` is its latest snapshot on Starter and Growth (null before the first capture, and always null on Free).
2. `get_performance_summary`: Shelf Share and Purchase Likelihood for pinned competitors.
3. For one of your products: `products_get` → `competitor_intelligence`: each pinned competitor product's price, sellers and rating. When `available` is false, say once that it comes with the plan in `unlock`.
4. For "who else shows up": `observations_list` (recent, `limit` 50) and read the brands in the product rows.

### Tell the user

- The pinned set with their numbers beside yours, one line each. A pending pin: "reading their site". A refused one: its reason, once, with the fix.
- Brand intelligence: promotions and retailers, only what changed.
- Ads a pinned brand ran in AI answers (`intelligence.ads`, Growth, beta): where it ran, the headline and offer, and where it sends the shopper. Newest first; say "no ads seen" only when asked. Without `ads`, the plan doesn't include them: don't mention ads unless asked.
- Product intelligence: price by seller, discounts, stock and rating for pinned competitor products, only what changed.
- When asked how fresh it is: `captured_at`, and `next_update_at` for when it next changes (weekly on Starter, daily on Growth).
- Unpinned brands that keep appearing: name up to three and offer one pin, default yes: "Pin Brand X?"

Never promise or describe numbers, scores or Narrative Accuracy for competitors as a result of pinning or reading their sites.

## Suggestions

### When

"Who should we pin?", "suggest competitors", "who are we missing?". Every plan.

### Calls, in order

1. `competitors_list` (what's pinned) and `observations_list` (recent, `limit` 50): the brands the AI Shopping Channel puts forward that aren't pinned, most frequent first. Only brands the recorded answers name: never add one from your own knowledge.
2. Name up to five, each with how often it showed up, and ask one question, default yes: "Pin Brooks and Hoka?" Nothing recorded yet: say so and offer to run the monitor.
3. On yes: pin them (below). To leave them for the team to decide on the dashboard instead, `competitors_suggest` with their names (and a `url` when you have one); a person pins or dismisses each.

## Pin and unpin

### When

"Pin Hoka", "watch Brand X's trail shoe", "pin this" with a link, "slingso pin ...", or the user dismisses or reorders pins.

### Calls, in order

1. Brand or product? A brand pin compares brands across the workspace. A product pin compares against one of your products. If unclear, ask once: "Pin Hoka as a brand?"
2. For a product pin, find the product: `products_list`. With one product, use it.
3. Get the link. A pin is identified by its URL: the brand's website for a brand pin, the product's page on any store (the brand's own site, Amazon, Target …) for a product pin. Use the link the user gave, or the website Slingso gave (onboarding's proposal). Otherwise ask once: "What's the link to Hoka's site, or the product page?" Never supply a website from memory.
4. `competitors_pin` with `url` (and `name` if you have it; `product_id` for a product pin; `brand` for a product pin's brand). Several at once: one call with every item.
5. Relay the result in one line. A pin returns at once: pinned, or say only "Slingso is reading their site." A pin that's refused after the read shows its reason on the competitors list; relay it the next time the list comes up.

Unpin: `competitors_list`, find it, `competitors_unpin`.

### What each plan does with a pin

- Every plan: Slingso places the link in the background (it reads the page once if it has to), merges it into the real brand or product, then pins it. The link wins: a site on another domain than the brand Slingso knows by that name is a different brand. Say "pending" plainly while it is pending; don't explain the mechanism unless asked.
- Every plan: each pin is scored beside you (Shelf Share and Purchase Likelihood).
- Starter and Growth, once read: a brand pin gets brand intelligence (its story, its retailers and its promotions), a product pin product intelligence (price on its own site and at its top 5 sellers, discounts, stock). Weekly on Starter; on Growth its site daily, its sellers weekly. Growth also gets the ads pinned brands run (beta).

Up to 5 brand pins per workspace and 5 product pins per product, on every plan. The error says so when a cap is hit.

A brand pin needs the brand's own website. A link to a product page pins that product's brand. A site that isn't an online store is refused: "That doesn't look like an online store's site."

## If it fails

- No pins: "No competitors pinned. Pin the brands that keep showing up?"
- A refused link (can't tell what it is, not an online store, a brand's home page on a product pin, cap reached): relay the reason and the fix.
- `product_id` not found: list the products and ask which one.
- 403 for role: "Only an editor or the owner can change pins."
