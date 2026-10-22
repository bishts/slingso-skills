# published: record what went live

## When

"It's live at <url>", "we did the price change", "slingso published", "slingso done".

## Calls, in order

1. Find the thread: the one the user names, or `artifacts_list` with `status: open`, `roots: true`. Several: ask which, newest as default.
2. Record it with `artifacts_done`:
   - Live at a URL: `url` (and `note?`).
   - Done without a URL (a price change, a retailer listing, outreach sent): a one-line `note`.
   - Already done, and now there is a URL: `artifacts_done` again with the `url`.
   - Decided against it: that is dismissing, see [review.md](review.md).
3. "Recorded." Nothing else runs now. The next analysis reads it.

Never mark something published that the user hasn't confirmed. Never guess a URL.

## Walls

None. Slingso never publishes for you: the brand publishes on its own site and records the URL here.

## If it fails

- An invalid URL: ask again with the corrected URL as the default.
- 403 for role: "Only an editor or the owner can record outcomes."
