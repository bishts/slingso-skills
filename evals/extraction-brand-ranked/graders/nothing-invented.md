---
type: llm
weight: 2
focus: mock_calls
---
Look only at the observations_create call's extraction and citations.
PASS if every product, price, offer, claim and URL in them appears in the answer text. A site the answer names, written as a URL (stridewell.example as https://stridewell.example), counts as appearing. Claim verdicts are judgements, not facts, and don't count.
FAIL if any product, price, offer, claim or URL is not in the answer.
