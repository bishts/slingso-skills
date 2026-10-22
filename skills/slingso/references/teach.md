# teach: a house rule in one sentence

## When

"Never mention discounts", "always call it a serum, not a cream", "slingso teach ...". A house rule is a standing instruction every analysis and draft follows from the next session on. It does not expire.

## Calls, in order

1. Restate the rule as one sentence. If the user gave several, take one at a time.
2. Ask: "Save this house rule: '<rule>'?"
3. `house_rules_teach` with `rule`. A rule the person states is approved at once.
4. Confirm in one line: "Saved. Every analysis and draft follows it from now on."

To see the rules: `house_rules_list`.

## Rules the agent proposed

The agent proposes a house rule when the brand repeats a correction (in `analyse`, through `memory_update` with `propose_house_rule`). A proposal waits for a person and reaches no prompt until approved.

When `get_briefing` lists `proposed_house_rules`, or the user asks, take them one at a time: "The agent suggests a house rule: '<rule>'. Approve it?" Then `house_rules_decide` with `approve` or `dismiss`. People can also decide in the dashboard inbox.

Never approve a proposal without the person's yes.

## Walls

None. Every plan has house rules.

## If it fails

- 403 for role: "Only an editor or the owner can add house rules."
- Refused as too long: split the rule in two and ask again.
- A rule that contradicts Brand Soul: point to the line it contradicts and ask which one wins.
