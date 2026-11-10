# review: decide on opportunities and record what went live

Two asks, one command:

- **Go through the open opportunities** (the default).
- **Record what went live** (also `published`, `done`).

## Go through the open opportunities

### When

"Go through the inbox", "what needs me", "slingso review", or the briefing offered it.

### Calls, in order

1. `threads_list`. Work through `needs_you[]` first, mentions first.
2. For each thread: `threads_get` (this marks it read for this person). Show:
   - the title, dimension and who found it ("found by Slingso" or "found in your assistant", from `found_by`),
   - what is happening and the move, in two or three lines from the opportunity body,
   - its evidence (`artifacts_get` on the opportunity): up to three quoted lines, each with the assistant and the query ("ChatGPT, on 'best magnesium for sleep': \"400 mg per serving\""). These are what the assistants said, not facts about the brand.
   - the latest draft on the thread, if there is one, in full,
   - new comments since this person last looked, one line each, with who wrote them.
3. Ask one question with a default. For a `content` or `product` opportunity: "Draft it now?" For the others: "Will you act on it?"
4. Act on the answer:

| The user says | Call | Note |
|---|---|---|
| draft it | → [create.md](create.md) | posting the draft is the hand-off; nothing to approve first |
| done, or live at a URL | `artifacts_done` (`url?`, `note?`) | see "Record what went live" below |
| no, not for us | `artifacts_dismiss` (`reason?`) | ask "Why? One line helps next time." once; the reason teaches Slingso |
| comment, or @someone | `threads_comment` (`body`, `mentions?`) | for teammates, not instructions to you |
| skip, later | nothing | it stays open |

5. Next thread. After the last one: one line with the tally ("2 drafted, 1 done, 1 dismissed").

An opportunity is open, done or dismissed. There is no approve step: drafting it, doing it or dismissing it is the decision. Nothing runs on the server.

## Record what went live

### When

"It's live at <url>", "we did the price change", "slingso published", "slingso done".

### Calls, in order

1. Find the thread: the one the user names, or `artifacts_list` with `status: open`, `roots: true`. Several: ask which, newest as default.
2. Record it with `artifacts_done`:
   - Live at a URL: `url` (and `note?`).
   - Done without a URL (a price change, a retailer listing, outreach sent): a one-line `note`.
   - Already done, and now there is a URL: `artifacts_done` again with the `url`.
   - Decided against it: that is dismissing (above).
3. "Recorded. Slingso will show what moved." Nothing else runs now. The next look reads it.

Never mark something published that the user hasn't confirmed. Never guess a URL. Slingso never publishes for you: the brand publishes on its own site and records the URL here.

## Walls

None. Every plan decides in chat and on the dashboard; both go through the same path.

## If it fails

- `noop: true`: a teammate already dismissed it. Say who, from the thread, and move on.
- Ambiguous mention (422 with `candidates`): ask which person, one question, the first candidate as default.
- An invalid URL: ask again with the corrected URL as the default.
- 403 for role: "Viewers can comment but not dismiss or mark done. Ask an editor or the owner."
