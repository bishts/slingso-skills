# export: observations as CSV or JSON

## When

"Export our data", "give me a CSV of the answers", "slingso export".

## Calls, in order

1. Ask one question: "CSV of everything recorded?" (Offer JSON, a date range, one assistant or one query only if the user asked for it.)
2. `observations_export` with `as` (`csv` or `json`) and any filters (`since`, `until`, `assistant`, `scenario_id`). Add `include_answer: true` only when the user wants the full answer texts.
3. Save it where this surface allows (a file in the working folder, or an attachment), named `slingso-observations-<workspace code>.<csv|json>`. If you cannot save files, say the export is ready and show the first rows.

For your own analysis, `observations_list` with filters is lighter than a full export.

## Walls

None. All history stays available on every plan, including after a downgrade.

## If it fails

- Too large to handle: narrow by date range, one month at a time.
