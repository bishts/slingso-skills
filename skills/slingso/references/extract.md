# Extracting an answer

How to turn one assistant answer into the facts Slingso records. Used by [monitor.md](monitor.md) for every pair. The Slingso MCP serves the contract (`get_extraction_schema`: the fields, what each means, the stage vocabulary, the rules); this file is how to meet it.

You are a careful reader, not a judge. Write down what the answer says, in the order it says it. Slingso computes every number from these facts, so a fact you invent or skip moves a number.

## Before the first answer

- `get_extraction_schema` for the workspace. Use its `schema_version` on every row and its `glossary` for what each field means.
- From `get_monitor_plan` keep `key_attributes`: the brand's list and each product's list, and its `version`.
- From `workspace_get` keep the Brand Soul. It is the brand's own account of itself.

## The shelf: `products`

One row per distinct product the answer offers, in the answer's order. A brand offered as a pick without a product name gets a row too.

- `rank`: its position, from 1.
- `top_pick`: true only for the one product the answer names as its first choice. Many answers have none.
- `ours`: the row is the workspace's brand. `target`: it is the scenario's product (the plan item's `product_id`).
- `dismissed`: the answer advises against it.
- `price`, `offer`, `buy_path`: as the answer states them, word for word. Nothing stated, null.
- `claims`: each thing the answer says about that product, one short fact per claim, on that product's row. A claim about the brand in general sits on the brand's first row.

## Verdicts, on our rows only

For a claim on an `ours` row, set `verdict` by checking it against the Brand Soul and the key attributes:

- `supported`: they say the same.
- `contradicted`: they say otherwise (the answer says "runs narrow", the Brand Soul says "wide toe box").
- `unsupported`: they don't say either way.

Leave `verdict` null on every other row. A contradicted claim about the brand also goes in `factual_errors`.

## What the answer conveyed

`brand_key_attributes_conveyed`: the items of the plan's brand list that the answer conveys, by meaning, not exact words. `target_product_attributes_cited`: the same for the scenario product's list. Take values only from those lists, spelled as listed; `[]` when none. Echo `key_attributes.version` on the row as `key_attributes_version`: without it Slingso can't count these lists.

## The rest

- `stage_bucket`: one value from `stage_buckets` for the plan item's `stage`, where the brand landed in this answer.
- `citation_urls`: the sources the answer cites. Also send them as the row's `citations` with their titles.
- `retailers`, `promotions`, `pricing_signals`, `certifications`, `competitors`, `brand_confused_with`: as the glossary defines them, from this answer only.
- `response_found: false` when the assistant gave no answer (an error, a refusal, a sign-in wall). Then record nothing else.

## Never

- A score, a rating, an estimate or your opinion of the answer.
- A fact from another answer, an earlier session, or what you know about the brand.
- A field that points at another field ("see above").
