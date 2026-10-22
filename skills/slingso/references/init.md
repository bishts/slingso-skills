# init: onboarding

## When

- `get_session` shows no workspace, or a workspace whose `setup_state.complete` is false.
- The user says "set up Slingso", "slingso init", or asks to redo a step.

Onboarding resumes. Never start over when `setup_state` shows steps done. A finished step can be edited later by naming it ("change my queries").

## Say once, at the start

Open with this overview, in your own words, in one message. Keep it short: a few lines, then the steps as a list.

- **What Slingso does:** it watches how the AI Shopping Channel (ChatGPT, Google AI Mode, Google AI Overviews, Gemini) recommends and describe the brand's products to shoppers, in the brand's market, product by product: whether each is the top pick and its Shelf Share, the price the AI quotes, which seller gets the sale (see "What Slingso captures" in SKILL.md). It shows where the brand stands, why, and what to change, to increase the brand's (and its products') Shelf Share, Narrative Accuracy and Purchase Likelihood. Slingso simulates the real world (shopper personas, consumer shopping behaviour, and competition: full product, price, place and promotions intelligence) to help e-commerce brands actually increase sales and brand equity in the AI Shopping Channel.
- **How it works:** "Your assistant does the thinking, powered by Slingso's skills and quality data. Slingso keeps the record, makes collaboration with your team or agency seamless, brings curated competitive data and measures improvements over time." Slingso asks the assistants the questions shoppers ask, reads the answers, and turns them into opportunities.
- **What's needed:** the brand's website and market, its hero product's page, and about ten minutes. Nothing is charged on Free.
- **The steps:** the six in section 2, each in a few words: Website and market, Your brand, Your hero product, Your plan, Your schedule, First results.
- **Good to know (say all three):**
  - The first check is small on purpose: ten queries on ChatGPT and Google AI Mode, so 20 answers. Its opportunities are a starting point; they get deeper as checks add data.
  - Slingso runs this first check on its own servers, in the brand's market. After that, checks run in this assistant in a browser on the user's computer, so answers reflect where that browser is (a VPN if they watch another market), or, on any plan, Slingso keeps running them on its servers from a prepaid balance.
  - Shopper personas and competing products come after setup.
- **Control:** "Setup follows these steps, but you decide everything. Change any proposal at each step, and anything later too: Brand Soul, products, queries, competitors and schedule."

On a resumed setup, skip the overview: one line on where it left off ("Picking up at step 3 of 6: Your hero product.").

## 1. No workspace

`workspace_create` (with no plan: every workspace starts on Free; the plan is chosen at step 4, after the user has seen what Slingso finds). It exists at once; go to the site step.

- Asked again while a workspace is still onboarding, it returns that workspace: resume it.
- **Refused:** relay the message; it carries the rule (for example, one Free workspace per person).
- **This assistant can't create it** (the call fails for any other reason, or the assistant stops it): don't retry. Hand over `get_session.start_url`: "Start your workspace on the web here: <start_url>. Then say 'slingso init' and I'll pick up the setup."

## 2. Steps

Steps run in this order, on every plan: `site`, `brand`, `product`, `plan`, `schedule`, `results`.

Confirming the product's queries starts the first check on Slingso's servers: all ten queries on ChatGPT and Google AI Mode. It runs while the user chooses a plan and a schedule, then Slingso analyses the answers to find opportunities. Setup ends on those results.

**Progress.** "Step 2 of 6: Your brand." Once the first check is running, add its progress from `setup_state.first_run.progress` ("Step 5 of 6: Your schedule. Your first check: 14 of 20 answers in."). Read it from the `workspace_get` you already make; never poll just for it between steps, and share no facts between steps.

**Start of each step:** the step's name and number, then its "Tell the user" line (one or two sentences: what the step does and why it matters). Then the proposal.

**Each step:** show the proposal, ask one question with a default, write on "yes" or after edits, then `complete_setup_step` with that step. **End of each step:** one line on what happens next. If the user stops, everything written stays; the next `init` resumes at `setup_state.current`.

### site (website and market, one message)

Tell the user: Slingso reads the brand's website to learn what it sells and how it talks. The market decides where the assistants are asked from: their answers differ by country.

1. If `setup_state.site` is absent or `failed`, ask both in one message, with no default market, listing every label in `get_session`'s `markets`: "What's your brand's website, and which market should Slingso watch: <the labels>?" Never guess the market from the site, the domain or where the user is.
2. `workspace_start_site` with `url` and `geo` (the market's code).
3. While `setup_state.site.status` is `running`: "Slingso is reading your site. This takes a minute or two." Check again with `workspace_get`, at most every 30 seconds. When `setup_state.site.progress` is present (Slingso is busy and the read is waiting its turn), relay it as written instead, and keep waiting: a read in line is not stuck.
4. `ready`: `complete_setup_step` `site` if it is not done yet. Next: "Slingso drafted your Brand Soul, five queries and your competitors."
5. `failed`: relay `setup_state.site.error`. If `setup_state.site.retryable` is true (the site was slow to answer, or Slingso had a problem), offer to try again; on yes, `workspace_start_site` with the same `url` and `geo`. Otherwise (for example, the site doesn't look like an online store) offer to try another URL. If `workspace_start_site` refuses with `attempts_exhausted` (Free's site reads are used), relay its message as written and offer nothing else.

Never re-run a site read that is `ready`.

### brand (Brand Soul, brand queries, competitors, and the hero product's page)

Tell the user: drafted from the site. Brand Soul is how the brand sees itself and sounds; every draft Slingso suggests follows it. The queries ask about the brand and its category, one per shopping stage. The competitors are the brands Slingso watches beside theirs, found by asking Google AI Mode about the brand in its market.

1. Open with one line of what Slingso found, from `setup_state.site.summary` ("Slingso read amazinggrass.com: affordable organic greens.").
2. Show, in one message:
   - **Brand Soul** (`workspace_get`): short ones in full; long ones as headings with the first line of each, offering the rest. If `brand_soul_pending` is true, say it is still being drafted and check back.
   - **The brand queries** from `setup_state.proposal.brand_queries` (or `scenarios_list` with no product, once written), numbered with the stage beside each. Awareness and research queries never name the brand: a shopper at that stage doesn't know it yet.
   - **The competitors** from `setup_state.proposal.competitors` (up to five, each a `name` with the `url` of its website from Google's answer), plus every brand a query names. Brand-level rivals; never a retailer, marketplace or publication. Don't add brands from your own knowledge. If `setup_state.competitor_discovery.status` is `running`, say Slingso is still asking Google, check `setup_progress` once more, then go on with whatever is there; `failed` or none: ask which brands they compete with.
3. Ask once: "Keep these, or change anything? And what's your hero product: send me its page on your site." The hero is the one product tracked; its page link is enough.
4. Write:
   - Brand Soul, if changed: `set_brand_soul` with the whole document.
   - Queries: `scenarios_create` for each kept query with its `stage` and no `product_id`; `scenarios_update` to `inactive` for dropped or edited ones (append-only: an edit is deactivate plus create).
   - Competitors: `competitors_pin` once, with every kept brand and its `url` (no `product_id`): Google's website for a proposed brand, else the one the user gives. For a brand with no website, ask the user once. Never supply a website from memory. Say only "Slingso is reading their sites." Relay a refusal as it comes. Never promise or describe numbers or scores for competitors as a result of pinning.
   - The hero: `products_create` with its `url` (the name is optional; Slingso reads it from the page). A page elsewhere than the brand's own site is refused with the rule; relay it. A different hero later: create the new one, then `products_update` the old one to `inactive`.
5. `complete_setup_step` `brand`. Next: "Slingso is reading your product's page and drafting five queries about it."
   - Refused with `soul_pending` (Brand Soul still drafting): wait a few seconds, check `workspace_get` once, then retry. If the user hasn't seen this Brand Soul, show it and ask once before retrying.

### product (the hero product's queries)

Tell the user: five queries about the hero product, one per shopping stage. Confirming them starts the first check: all ten queries on ChatGPT and Google AI Mode, on Slingso's servers.

1. While `setup_state.product_draft.status` is `running`: "Slingso is drafting your product's queries." Check `workspace_get` again, at most every 15 seconds. `failed`: relay its error and draft five yourself from the product's page (one per stage).
2. Show the product (`setup_state.product`: name and page) and the queries from `setup_state.proposal.product_queries`, numbered with the stage beside each. Awareness and research queries never name the brand or the product.
3. Ask once: "Keep these, or change anything? Confirming starts your first check."
4. `scenarios_create` for each kept query with its `stage` and the hero's `product_id`.
5. `complete_setup_step` `product`. Next: "Your first check is running. Next, your plan."

### plan

Tell the user: the first check is running. Everything so far works on Free; paid plans add a team, more products, competitor intelligence, or Slingso's own analysis every cycle.

1. Show what Slingso has so far, in a few lines: the Brand Soul, the ten queries (five about the brand, five about the hero product), the competitors being read, the first check running.
2. Show `get_session.plans`, Free first: each plan's name, price, `for` and `includes`, as written. Help choose with the three questions in SKILL.md's "Plans" (team and products, who does the analysis, who runs the checks). Default Free.
3. Ask: "Stay on Free, or pick Starter or Growth?"
4. `workspace_choose_plan` with the plan (`diy_free`, `diy_paid` for Starter, `diy_paid_autopilot` for Growth).
   - **Free:** done. Next: "Now, when Slingso checks again."
   - **Starter or Growth:** first state the terms: the monthly fee, debited every month. Then hand over the `checkout_url` the tool returns: "Pay here on Stripe; nothing was charged here. We'll carry on with your schedule meanwhile." Only the owner can choose a paid plan; relay a refusal.
   - Later, `setup_state.plan.status` turns `paid` once the payment lands. Mention it once when you next read it.

### schedule

Tell the user: which assistants Slingso checks and when, after this first check. Checks run in this assistant with a reminder by email, or, on any plan, Slingso runs them on its servers from a prepaid balance.

Two short questions, one at a time. First which assistants, then when.

1. Which assistants: name every assistant in `plan.assistants_catalogue` and say which are on (`schedule.assistants`), then let the user pick one or more; never count them, never a yes/no on the whole schedule: "Available on your plan: ChatGPT, Google AI Mode, Google AI Overviews, Gemini. On now: ChatGPT and Google AI Mode. Which should Slingso check regularly?" If the user already named them, skip to 2.
2. Timezone: `get_session` → `user.utc_offset`. If it is null, propose the offset you can tell: in Claude Code, run `date +%z` (+0530 is UTC+05:30); elsewhere, the user's local time if you know it. Fold it into the when question so the answer confirms it; the user can change it. If you can't tell, ask for it inside that question ("…at 09:00 your time? Which timezone, for example UTC+05:30?"). Turn a city or zone name into its current UTC offset yourself.
3. When: daily, weekly or monthly, the day and the time, weekly on Monday at 09:00 suggested: "When? Every Monday at 09:00 (UTC+05:30) suggested, or daily, monthly, another day or time." Add one plan line:
   - Server checks off (the default): "We'll email you a reminder then." ("Remind me" on.)
   - Server checks on (`schedule.server_checks`): "Slingso runs it then." Add the run estimate ([schedule.md](schedule.md)).
   If the user asks Slingso to run the checks, or watches a market they aren't in, send `server_checks: true`; without a balance it's refused with the fix: relay it with the billing link ([balance.md](balance.md)).
4. `set_schedule` with `assistants`, `cadence`, `day`, `time`, `utc_offset` and `remind` (server checks off) or `server_checks: true`. Read back `schedule.next_run_at_local` in one line.
5. `complete_setup_step` `schedule`. Next: "Your first results."

### results

Tell the user: the first check's answers, read and analysed: where the brand stands on the AI shelf, and the first opportunities to act on.

1. The wait. Call it "Your first check", nothing else. `setup_progress` about every 30 seconds, one line each time: "Your first check: 14 of 20 answers in." Once all are in: "Your first check: all 20 answers in. Finding your opportunities."
   - When `first_check.queued_ahead` is present, Slingso is busy and the check is waiting its turn: relay `first_check.progress` as written ("Busy right now: you're in line, 3 ahead.") and keep waiting. A check in line is not stuck; never offer a retry for it.
   - With a progress line, share its `fact` after the `lead_in`, quoted as written, with the source name. Never repeat a fact; never add a statistic of your own.
   - Once per wait, the `shelf_index` line with its link.
   - Facts and that line belong to this wait only, never between steps.
2. `done`: present what it found, as [analyse.md](analyse.md) presents an analysis: the numbers from `get_performance_summary` (Shelf Share, Purchase Likelihood, Narrative Accuracy; never compute them), then the opportunities from `artifacts_list` (`status: open`, `roots: true`), highest priority first. Say once that the same opportunities were emailed, and that a first check this small is a starting point.
3. `failed`: relay `setup_state.first_run.error`. If `setup_state.first_run.retry_allowed` is true, offer to try again; on yes, `complete_setup_step` `product` restarts it; check progress as in step 1. Otherwise say the next check runs on their schedule.
4. `complete_setup_step` `results` once it is `done` or `failed`.

## 3. Done: what's next

"Setup done." Then, in a few lines:

- **Create what an opportunity needs:** "Ask me to draft it ('draft the guide for the first opportunity'). I'll write it with Slingso's skill, your data and your Brand Soul; you review and approve, then tell me when it's live." ([draft.md](draft.md))
- **Run checks on schedule:** with server checks off, if this assistant can run scheduled tasks, offer to set one up for the schedule now ([scheduling.md](scheduling.md)); otherwise the email reminder brings them back. With server checks on: "Slingso runs your next check on schedule."
- **Later, when you want them:** shopper personas (Growth asks the queries as your shopper), competing products to pin (up to 5 per product), more queries and products.
- **Change anything, any time:** name it ("change my queries", "add a competitor", "move my schedule").

Then name the next check in one line ("Next check: Monday 09:00, with a reminder by email.").

## Walls

- A second product on Free: "Free tracks one product; swap it any time. Starter tracks as many as you like."
- Re-running the site read: "The site read runs once. You can edit Brand Soul, the product and the queries any time."

## If it fails

- A write refused with a reason (bad URL, missing stage, query too long): relay the fix and ask again with the corrected value as the default.
- 403 for role: "Only an editor or the owner can set up this workspace."
- The session ends mid-step: nothing is lost. Next time, `get_session` resumes at `setup_state.current`.
