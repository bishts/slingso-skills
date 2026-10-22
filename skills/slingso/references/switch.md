# switch: change workspace

## When

"Switch to Brand B", "which brands do I have", "slingso switch", or `get_session` shows several workspaces and no default.

## Calls, in order

1. `get_session` → `workspaces[]`.
2. One workspace: say it is the only one.
3. The user named one: match by name or code. Several matches: ask which, the closest as default.
4. No name given: list them (name, plan, role, one line each) and ask: "Switch to <first one that isn't current>?"
5. `set_default_workspace` with its code. Use that code as `workspace` from now on.
6. Then route as in SKILL.md: unfinished setup resumes onboarding; otherwise the briefing.

## Walls

None. Each workspace keeps its own plan.

## If it fails

- 404: "You're no longer a member of that workspace." Show the others.
