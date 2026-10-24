# init: onboarding

## When

- `get_session` shows no workspace, or a workspace whose `setup_state.complete` is false.
- The user says "set up Slingso", "slingso init", or asks to redo a step.

Onboarding resumes. Never start over when `setup_state` shows steps done. A finished step can be edited later by naming it ("change my queries").

## Say once, at the start

Open with this, in your own words, in one short message: no more than four lines before the question.

- **What Slingso does:** it asks the AI Shopping Channel (ChatGPT, Google AI Mode, Google AI Overviews, Gemini) the questions the brand's shoppers ask, in its market, and shows whether its products get recommended, why, and what to change.
- **What's needed:** the website, the market and the hero product's page. Three steps: those three answers, a look at what Slingso drafts, then the first check. Nothing is charged on Free.

Then ask the site step's question in the same message. Plans, schedules, personas and how Slingso works in depth come after the first results, only if the user asks or it matters then.

On a resumed setup, skip the overview: one line on where it left off ("Picking up at step 2 of 3: confirm what Slingso drafted.").

## 1. No workspace

`workspace_create` (with no plan: every workspace starts on Free; the plans come with the first results). It exists at once; go to the site step.

- Asked again while a workspace is still onboarding, it returns that workspace: resume it.
- **Refused:** relay the message; it carries the rule (for example, one Free workspace per person).
- **This assistant can't create it** (the call fails for any other reason, or the assistant stops it): don't retry. Hand over `get_session.start_url`: "Start your workspace on the web here: <start_url>. Then say 'slingso init' and I'll pick up the setup."

## 2. Steps

Steps run in this order, on every plan: `site`, `confirm`, `results`. Nothing is asked of an assistant until the user confirms.

**Progress.** "Step 2 of 3: confirm what Slingso drafted." Read state from the `workspace_get` you already make.

**Each step:** show what's there, ask one question with a default, write on "yes" or after edits, then `complete_setup_step` with that step. If the user stops, everything written stays; the next `init` resumes at `setup_state.current`.

### site (website, market and hero product, one message)

1. If `setup_state.site` is absent or `failed`, ask all three in one message, with no default market, listing every label in `get_session`'s `markets`: "What's your brand's website, which market should Slingso watch (<the labels>), and what's your hero product? Send me its page on your site." Never guess the market from the site, the domain or where the user is. The hero is the one product tracked; its page link is enough.
2. `workspace_start_site` with `url`, `geo` (the market's code) and `product_url`. A product page off the brand's own site is refused with the rule: relay it and ask for another.
3. While `setup_state.site.status` is `running`: "Slingso is reading your site and drafting your queries. This takes a minute or two." Check again with `workspace_get`, at most every 30 seconds. When `setup_state.site.progress` is present (Slingso is busy and the read is waiting its turn), relay it as written instead, and keep waiting: a read in line is not stuck.
4. `ready`: `complete_setup_step` `site` if it is not done yet, then go to confirm.
5. `failed`: relay `setup_state.site.error`. If `setup_state.site.retryable` is true, offer to try again; on yes, `workspace_start_site` with the same values. Otherwise (for example, the site doesn't look like an online store) offer to try another URL. If `workspace_start_site` refuses with `attempts_exhausted` (Free's site reads are used), relay its message as written and offer nothing else.

Never re-run a site read that is `ready`.

### confirm (everything Slingso drafted, in one message)

1. If `setup_state.product_draft.status` is `running`, say Slingso is drafting the hero's queries and check `workspace_get` again, at most every 15 seconds. `failed` with no `setup_state.product`: relay its error and ask for the hero's page again (`products_create` with its `url`). `failed` with a product: relay the error and draft five yourself from the product's page, one per stage.
2. Show, in one message, queries first:
   - One line of what Slingso found, from `setup_state.site.summary` ("Slingso read amazinggrass.com: affordable organic greens.").
   - **Queries about the brand** from `setup_state.proposal.brand_queries`, and **queries about the hero** (`setup_state.product`'s name) from `setup_state.proposal.product_queries`, numbered in one list with the stage beside each. Awareness and research queries never name the brand or the product: a shopper at that stage doesn't know them yet.
   - **Competitors** from `setup_state.proposal.competitors` (each a `name` with the `url` of its website from Google's answer), plus every brand a query names. Brand-level rivals; never a retailer, marketplace or publication. Don't add brands from your own knowledge. If `setup_state.competitor_discovery.status` is `running`, say Slingso is still asking Google and go on; `failed` or none: ask which brands they compete with.
   - **Brand Soul** (`workspace_get`) in one line: its first sentence, offering the rest. If `brand_soul_pending` is true, say it is still being drafted and can be edited later; it doesn't hold the step.
3. Ask once: "Keep these, or change anything? Confirming runs your first check: ChatGPT and Google AI Mode answer all ten queries."
4. Write:
   - Queries: `scenarios_create` for each kept query with its `stage`: the brand's with no `product_id`, the hero's with its `product_id`. `scenarios_update` to `inactive` for dropped or edited ones (append-only: an edit is deactivate plus create).
   - Competitors: `competitors_pin` once, with every kept brand and its `url` (no `product_id`): Google's website for a proposed brand, else the one the user gives. For a brand with no website, ask the user once. Never supply a website from memory. Never promise or describe numbers or scores for competitors as a result of pinning.
   - Brand Soul, only if the user changed it: `set_brand_soul` with the whole document.
5. `complete_setup_step` `confirm`. It starts the first check and sets the schedule to weekly, Monday 09:00 in the user's timezone, with an email reminder. Refused with `drafting`: wait 15 seconds, check `workspace_get` once, then retry.

### results (the first check, live)

1. **The wait.** Call it "Your first check", nothing else. Call `setup_progress` about every 20 seconds, passing the `cursor` it last returned as `since`, and keep going until `first_check.status` is `done` or `failed`; don't stop after a few reads. Each time:
   - For each new item in `answers`, one line: "<assistant>, '<query>': <picks, joined>. You: <top pick | #rank | not recommended>." Quote the picks as written; never add products of your own.
   - Then the tally in one line: "You were recommended in <with_you> of <answers> answers. <leader.brand> was in <leader.answers>."
   - No new answers: one line from `first_check.progress` ("14 of 20 answers in."). Once all are in: "All 20 answers in. Finding your opportunities."
   - When `first_check.queued_ahead` is present, Slingso is busy and the check is waiting its turn: relay `first_check.progress` as written and keep waiting. A check in line is not stuck; never offer a retry for it.
   - Before the first answer arrives, share the `fact` after the `lead_in`, quoted as written with the source name, and once the `shelf_index` line with its link. Never repeat a fact; never add a statistic of your own.
   - The user can also watch it on the web: give `setup_state.web_url` once if it is present.
2. `done`: present what it found, as [analyse.md](analyse.md) presents an analysis: the tally, the numbers from `get_performance_summary` (Shelf Share, Purchase Likelihood, Narrative Accuracy; never compute them), then the top opportunities from `artifacts_list` (`status: open`, `roots: true`), highest priority first. Say once that the same opportunities were emailed, and that a first check this small is a starting point.
3. `failed`: relay `setup_state.first_run.error`. If `setup_state.first_run.retry_allowed` is true, offer to try again; on yes, `complete_setup_step` `confirm` restarts it; follow progress as in step 1. Otherwise say the next check runs on their schedule.
4. `complete_setup_step` `results` once it is `done` or `failed`.

## 3. Done: what's next

"Setup done." Then, in a few lines (this is where the plans and the schedule come in):

- **Create what an opportunity needs:** "Ask me to draft it ('draft the guide for the first opportunity'). I'll write it with Slingso's skill, your data and your Brand Soul; you review and approve, then tell me when it's live." ([draft.md](draft.md))
- **Keep it running:** name the next check from `workspace_get`'s `schedule.next_run_at_local` ("Next check: Monday 09:00, with an email reminder."), and that it can change ([schedule.md](schedule.md)). No `next_run_at_local` (setup didn't know the user's timezone): ask when, as [schedule.md](schedule.md) says, weekly on Monday at 09:00 suggested, and `set_schedule`. If this assistant can run scheduled tasks, offer to set one up for it now ([scheduling.md](scheduling.md)); otherwise the email reminder brings them back. With server checks on: "Slingso runs your next check on schedule."
- **Plans, if they ask or it fits:** `get_session.plans`, Free first, each plan's name, price, `for` and `includes` as written; help choose with the three questions in SKILL.md's "Plans". A paid plan: state the monthly fee, then `workspace_choose_plan` and hand over its `checkout_url` ("Pay here on Stripe; nothing was charged here."). Only the owner can choose a paid plan.
- **Later, when you want them:** shopper personas (Growth asks the queries as your shopper), competing products to pin (up to 5 per product), more queries and products.
- **Change anything, any time:** name it ("change my queries", "add a competitor", "move my schedule").


## Walls

- A second product on Free: "Free tracks one product; swap it any time. Starter tracks as many as you like."
- Re-running the site read: "The site read runs once. You can edit Brand Soul, the product and the queries any time."

## If it fails

- A write refused with a reason (bad URL, missing stage, query too long): relay the fix and ask again with the corrected value as the default.
- 403 for role: "Only an editor or the owner can set up this workspace."
- The session ends mid-step: nothing is lost. Next time, `get_session` resumes at `setup_state.current`.
