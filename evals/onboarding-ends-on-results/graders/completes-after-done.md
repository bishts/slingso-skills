---
type: tool_order
before:
  tool: mcp__plugin_slingso_slingso__setup_progress
  input_match: '"since"\s*:\s*"2026-10-24T09:12:41\.004512Z"'
after:
  tool: mcp__plugin_slingso_slingso__complete_setup_step
  input_match: '"results"'
---
Results completes only once the check is done.
