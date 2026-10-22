---
type: regex
target: mock_calls
pattern: "set_schedule|observations_create|artifacts_create|competitors_pin|scenarios_create|complete_setup_step|memory_update|get_briefing|claim_work"
match: not_contains
---
help reads get_session and nothing else: no writes, no briefing.
