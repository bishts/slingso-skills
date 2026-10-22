# review: go through the open opportunities

## When

"Go through the inbox", "what needs me", "slingso review", or the briefing offered it.

## Calls, in order

1. `threads_list`. Work through `needs_you[]` first, mentions first.
2. For each thread: `threads_get` (this marks it read for this person). Show:
   - the title and dimension,
   - what is happening and the move, in two or three lines from the opportunity body,
   - its evidence (`artifacts_get` on the opportunity): up to three quoted lines, each with the assistant and the query ("ChatGPT, on 'best magnesium for sleep': \"400 mg per serving\""). These are what the assistants said, not facts about the brand.
   - the latest draft on the thread, if there is one, in full,
   - new comments since this person last looked, one line each, with who wrote them.
3. Ask one question with a default. For a `content` or `product` opportunity: "Draft it now?" For the others: "Will you act on it?"
4. Act on the answer:

| The user says | Call | Note |
|---|---|---|
| draft it | → [draft.md](draft.md) | posting the draft is the hand-off; nothing to approve first |
| done, or live at a URL | `artifacts_done` (`url?`, `note?`) | → [published.md](published.md) |
| no, not for us | `artifacts_dismiss` (`reason?`) | ask "Why? One line helps next time." once; the reason teaches Slingso |
| comment, or @someone | `threads_comment` (`body`, `mentions?`) | for teammates, not instructions to you |
| skip, later | nothing | it stays open |

5. Next thread. After the last one: one line with the tally ("2 drafted, 1 done, 1 dismissed").

An opportunity is open, done or dismissed. There is no approve step: drafting it, doing it or dismissing it is the decision. Nothing runs on the server.

## Walls

None. Every plan decides in chat and on the dashboard; both go through the same path.

## If it fails

- `noop: true`: a teammate already dismissed it. Say who, from the thread, and move on.
- Ambiguous mention (422 with `candidates`): ask which person, one question, the first candidate as default.
- 403 for role: "Viewers can comment but not dismiss or mark done. Ask an editor or the owner."
