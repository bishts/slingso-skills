---
type: tool_order
before:
  tool: mcp__plugin_slingso_slingso__run_server_checks
after:
  tool: mcp__plugin_slingso_slingso__get_run_progress
---
Progress is read after the run starts.
