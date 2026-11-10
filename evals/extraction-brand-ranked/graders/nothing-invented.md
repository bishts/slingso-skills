---
type: llm
weight: 2
focus: mock_calls
---
Look only at the observations_create call's extraction and citations.
PASS if every product, price, offer, claim and URL in them appears in the answer text. A site the answer names, written as a URL (stridewell.example as https://stridewell.example), counts as appearing. Claim verdicts are judgements, not facts, and don't count; nor does what the brand says is true, written beside a factual error (that comes from Brand Soul).
FAIL if any product, price, offer, claim or URL is not in the answer.
