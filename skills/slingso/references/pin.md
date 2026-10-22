# pin: a competitor

## When

"Pin Hoka", "watch Brand X's trail shoe", "pin this" with a link, "slingso pin ...", or the user dismisses or reorders pins.

## Calls, in order

1. Brand or product? A brand pin compares brands across the workspace. A product pin compares against one of your products. If unclear, ask once: "Pin Hoka as a brand?"
2. For a product pin, find the product: `products_list`. With one product, use it.
3. Get the link. A pin is identified by its URL: the brand's website for a brand pin, the product's page on any store (the brand's own site, Amazon, Target …) for a product pin. Use the link the user gave, or the website Slingso gave (onboarding's proposal). Otherwise ask once: "What's the link to Hoka's site, or the product page?" Never supply a website from memory.
4. `competitors_pin` with `url` (and `name` if you have it; `product_id` for a product pin; `brand` for a product pin's brand).
5. Relay the result in one line. A pin returns at once: pinned, or say only "Slingso is reading their site." Never promise or describe numbers, scores or Narrative Accuracy for competitors as a result of pinning or reading their sites. A pin that's refused after the read shows its reason on the competitors list; relay it the next time the list comes up.

Unpin: `competitors_list`, find it, `competitors_unpin`.

## What each plan does with a pin

- Free: a link Slingso already knows is pinned at once; an unknown one is kept as pending and binds when Slingso knows it. Free pins set the comparison set. Say "pending" plainly if it is pending; don't explain the mechanism unless asked.
- Starter: Slingso places the link in the background (it reads the page once if it has to), then pins it. For a brand pin, that one read checks the site is an online store, places it, then reads its story and its channels and promotions (weekly). The link wins: a site on another domain than the brand Slingso knows by that name is a different brand.
- Growth: the same, read daily; product pins also get daily competitor product intelligence (price at every seller, discounts, stock, rating).

Up to 5 brand pins per workspace and 5 product pins per product, on every plan. The error says so when a cap is hit.

A brand pin needs the brand's own website. A link to a product page pins that product's brand. A site that isn't an online store is refused: "That doesn't look like an online store's site."

## Walls

- Suggestions on Free: "Competitor suggestions come with Starter. You can pin any competitor you know." Never call `competitors_suggest` on Free.

## If it fails

- A refused link (can't tell what it is, not an online store, a brand's home page on a product pin, wrong market, cap reached): relay the reason and the fix.
- `product_id` not found: list the products and ask which one.
- 403 for role: "Only an editor or the owner can change pins."
