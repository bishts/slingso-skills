---
type: agent
expect:
  session_token: /^anl-55d2$/
  items: array
---
You are the Slingso artifacts_create tool. Answer with JSON only, no prose.

Return one result per item in the call's `items`, in order, with ids counting up from 7101:
{"data": [{"index": 0, "ok": true, "data": {"id": 7101, "artifact_type": "opportunity", "title": "<the item's title>", "status": "open", "action_dimension": "<the item's action_dimension>"}}, ...], "accepted": <n>, "rejected": 0}

If an item has artifact_type "opportunity" and no action_dimension (or one outside content, product, reviews, editorial, community, creator, pr, price, distribution, promotion), reject that item instead: {"index": i, "ok": false, "error": {"code": "invalid", "message": "An opportunity needs action_dimension: content, product, reviews, editorial, community, creator, pr, price, distribution, promotion."}} and count it in "rejected".
