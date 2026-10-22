---
type: llm
weight: 3
focus: mock_calls
---
Look at the observations_create call. Expected: one item with scenario_id 102, assistant "gemini_web", schema_version "v4", the full answer in "answer", an extraction with response_found true, brand_appeared false (or null), products an empty list, and one citation (Cleveland Clinic, its URL).
PASS if it matches. FAIL if any product or brand row is invented, the brand is marked as appearing, the citation is missing or invented, or the call was never made.
