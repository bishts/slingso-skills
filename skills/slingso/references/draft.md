# draft: write what an opportunity needs

## When

- An open `content` or `product` opportunity, or "draft the first one", "slingso draft".

## Calls, in order

1. Pick the opportunity: `artifacts_list` with `status: open`, `roots: true`. Several: ask which, the highest priority as default.
2. `artifacts_get_brief`: the opportunity and its evidence (what the assistants said), where it goes, the brand's own site facts (Brand Soul, each product's key attributes), the grounding rules, the thread and house rules.
3. Write the draft here, in this assistant. What it says about the brand comes only from its own site: the Brand Soul, the products' key attributes and the brand's own pages. The evidence shows what to answer, never what to claim: a dose, ingredient, price or award only an assistant mentioned stays out. Never invent a claim, a number, a review or a quote.
4. Check it against the bar below. Fix what fails. Do not show the check unless asked.
5. Show the draft. Ask: "Post this draft to the thread?"
6. On yes: `threads_comment` with `kind: draft` and `body` (the full draft). Posting it is the hand-off: there is no approval step. Teammates comment beneath it.

A change after posting is a new draft: post the full new text the same way.

## The bar

- Every fact about the brand traces to its own site (the Brand Soul, a product's key attributes, its pages). Specifics beat adjectives: sizes, materials, prices, what's in the box.
- What an assistant said appears, if at all, as what it said, never as fact.
- A comparison with a competitor uses only facts from that competitor's own site; without it, no comparison.
- It answers the shopper's question the opportunity names, plainly enough for an assistant to quote a sentence of it.
- It sounds like the brand (Brand Soul's voice) and never says what the Brand Soul or a house rule rules out.
- It talks to the shopper. It never mentions AI assistants, Slingso or how it was written.
- No reviews, quotes, ratings, awards or competitor claims you can't source.

## Tell the user

The draft, then one line: where it goes (from the brief). After posting: "Posted. When it's live, tell me the URL."

## Brand-signal and brand-decision opportunities

`reviews`, `editorial`, `community`, `creator`, `pr`, `price`, `distribution`, `promotion` are actions the brand takes. Draft only what the brief asks for (an outreach email, a pitch, a plan). Never draft a price change as if it were decided.

## Walls

None. Drafting happens in this assistant on every plan. Slingso never drafts on its servers.

## If it fails

- The brief is missing facts the draft needs: ask the user for the one fact, default "leave it out".
- The opportunity was dismissed meanwhile: say so, from the thread, and stop.
