# create: draft from an opportunity's brief, or revise a draft

Two asks, one command. Create always happens here, in this assistant, on every plan, with Autopilot on or off. Slingso's own work ends at the opportunity: it never drafts. Drafting here is optional help for the brand's team, who decide what to publish.

- **Draft** (also `draft`): write what an open opportunity needs.
- **Revise** (also `revise`): redo a posted draft with a note.

## Draft

### When

- An open `content` or `product` opportunity, or "draft the first one", "slingso create", "slingso draft".

### Calls, in order

1. Pick the opportunity: `artifacts_list` with `status: open`, `roots: true`. Several: ask which, the highest priority as default.
2. `artifacts_get_brief`: the opportunity and its evidence (what the assistants said), where it goes, the brand's own site facts (Brand Soul, each product's key attributes), the grounding rules, the thread and house rules.
3. Write the draft here, in this assistant. What it says about the brand comes only from its own site: the Brand Soul, the products' key attributes and the brand's own pages. The evidence shows what to answer, never what to claim: a dose, ingredient, price or award only an assistant mentioned stays out. Never invent a claim, a number, a review or a quote.
4. Check it against the bar below. Fix what fails. Do not show the check unless asked.
5. Show the draft. Ask: "Post this draft to the thread?"
6. On yes: `threads_comment` with `kind: draft` and `body` (the full draft). Posting it is the hand-off: there is no approval step. Teammates comment beneath it.

A change after posting is a new draft: post the full new text the same way.

### Tell the user

The draft, then one line: where it goes (from the brief). After posting: "Posted. When it's live, tell me the URL." ([review.md](review.md) records it.)

### Brand-signal and brand-decision opportunities

`reviews`, `editorial`, `community`, `creator`, `pr`, `price`, `distribution`, `promotion` are actions the brand takes. Draft only what the brief asks for (an outreach email, a pitch, a plan). Never draft a price change as if it were decided.

## Revise

### When

- A teammate asked for changes in a thread's comments, or "make it shorter", "redo the FAQ draft", "slingso revise".

### Calls, in order

1. Find the thread: the one the user names, or `threads_list`. Several: ask which, newest as default.
2. `threads_get`: the latest draft and the comments since.
3. `artifacts_get_brief`.
4. Redraft: change what the user or the comments ask for and nothing else. Check it against the bar below.
5. Show the new draft with one line on what changed. Ask: "Post the new draft?"
6. On yes: `threads_comment` with `kind: draft` and the full new text.

## The bar

- Every fact about the brand traces to its own site (the Brand Soul, a product's key attributes, its pages). Specifics beat adjectives: sizes, materials, prices, what's in the box.
- What an assistant said appears, if at all, as what it said, never as fact.
- A comparison with a competitor uses only facts from that competitor's own site; without it, no comparison.
- It answers the shopper's question the opportunity names, plainly enough for an assistant to quote a sentence of it.
- It sounds like the brand (Brand Soul's voice) and never says what the Brand Soul or a house rule rules out.
- It talks to the shopper. It never mentions AI assistants, Slingso or how it was written.
- No reviews, quotes, ratings, awards or competitor claims you can't source.

## Walls

None. Create happens in this assistant on every plan.

## If it fails

- The brief is missing facts the draft needs: ask the user for the one fact, default "leave it out".
- The opportunity was dismissed meanwhile: say so, from the thread, and stop.
- The ask is unclear: ask one question, your best reading as default.
- An ask that conflicts with Brand Soul or a house rule: point to the line and ask which wins.
