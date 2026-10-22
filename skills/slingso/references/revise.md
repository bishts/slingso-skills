# revise: redo a draft

## When

- A teammate asked for changes in a thread's comments, or "make it shorter", "redo the FAQ draft", "slingso revise".

## Calls, in order

1. Find the thread: the one the user names, or `threads_list`. Several: ask which, newest as default.
2. `threads_get`: the latest draft and the comments since.
3. `artifacts_get_brief`.
4. Redraft: change what the user or the comments ask for and nothing else. Check it against the bar in [draft.md](draft.md).
5. Show the new draft with one line on what changed. Ask: "Post the new draft?"
6. On yes: `threads_comment` with `kind: draft` and the full new text.

## Walls

None.

## If it fails

- The ask is unclear: ask one question, your best reading as default.
- An ask that conflicts with Brand Soul or a house rule: point to the line and ask which wins.
