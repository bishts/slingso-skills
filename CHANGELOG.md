# Changelog

Versions match `metadata.version` in `skills/slingso/SKILL.md`, the plugin's `version`
and the release tag.

## 0.5.1 (2026-11-10)

- Opportunities no longer end by offering to draft. The team acts on the briefs; the assistant drafts from one when asked (0.5.0 missed this one).
- One question per turn, last in the message, and none when nothing needs deciding. The setup confirm and schedule messages end on their question.
- Schedule: asks which assistants when the user doesn't say; saves the assistants and the time together, only after the user answers; the timezone it proposes can be changed in the same answer.
- The first check: one line per answer with its picks, even when the answers come back together.
- When Slingso is already finding opportunities: say so and stop, with no numbers or other news.
- A paid plan: the monthly fee and the Stripe link in one message.
- Evals: graders aligned with the skill (the resume line, a website still to ask for, Brand Soul beside a factual error, answers narrated in earlier messages).

## 0.5.0 (2026-11-10)

Works with the previous Slingso server; the new words in plan lists and messages come with the newer one.

- The new messaging: Slingso is the opinionated AI Shopping Channel Manager (data first, every opportunity an experiment, agents do the grunt work and people make the calls). Its work ends at the opportunity, each a brief with its evidence and reasoning; the assistant drafts from a brief only when asked.
- Commands grouped as on slingso.com: Where you stand (`check`, `brief`, `competitors`), Your opportunities (`opportunities`, `create`, `teach`), What changed (`review`), How you use it (`init`, `schedule`, `export`).
- `check` now covers everything due (it was `monitor`) and one question now (`check <question>`). `analyse` is now `opportunities`. `slingso monitor`, `slingso analyse` and `/slingso:monitor`, `/slingso:analyse` still work, for this release.
- The server add-on is called Autopilot everywhere the skill speaks (`schedule` also answers to `autopilot`). Say check, question and opportunity; never servers, runs, queries or fixes.
- The setup and update prompts say questions and checks.
- Schedule never counts the assistants, not even "all four".
- Evals caught up with the skill: three cases load again, the analyse cases accept an early read, a `set_schedule` mock.

## 0.4.4 (2026-11-06)

- Server checks are one price again: $0.015 a run on every plan (0.4.3's per-plan run prices are withdrawn).

## 0.4.3 (2026-11-06)

Works with the previous Slingso server too; the prices and seller reads need the newer one.

- Sellers: a product's price is read on its own site daily and at the 5 sellers the AI answers name most weekly, each seller page checked to sell that exact product first. Pinned rivals the same (Starter weekly; Growth daily on their site). No rating claimed.
- Plan prices in the eval mocks: Starter $24.99, Growth $49.99.

## 0.4.2 (2026-11-05)

Needs the newer Slingso server (competitor intelligence by plan again; ads on Growth).

- Competitor intelligence is Starter's (weekly) and Growth's (daily). Free sees its pinned rivals scored beside it; their brand and product intelligence come with Starter, and the skill says so once when a read is locked.
- The ads pinned brands run in AI answers are Growth's, in beta. Without them in the reply, the skill doesn't bring ads up.
- No reviews claimed: a pinned product's rating, not its reviews.
- A refused pin no longer lists "wrong market" as a reason.

## 0.4.1 (2026-11-04)

Needs the newer Slingso server (competitor intelligence on every plan).

- Competitor intelligence on every plan: pinned brands' promotions, claims and retailers, and pinned products' prices at every seller, discounts, stock and rating. Weekly on Free and Starter, daily on Growth. The "comes with Starter / Growth" walls are gone; `next_update_at` is when the plan's reading next changes.
- Ads: a pinned brand's intelligence carries the ads it ran in AI answers in the last 30 days (where, the headline and offer, where they send the shopper).

## 0.4.0 (2026-11-03)

Needs the newer Slingso server: the Slingso app and the MCP server from this release (server run now and its progress, the server add-on in the session, the briefing's analysis, daily or weekly schedules).

- Commands, each its own skill in the plugin (`/slingso:init`, `/slingso:monitor`, …): Set up (`init`, `competitors`, `teach`), Monitor (`check`, `monitor`, `brief`), Analyse (`analyse`), Create (`create`, `review`), Settings (`schedule`, `export`). Each points at the core skill, `skills/slingso`, which still holds everything and works on its own. `status`, `switch`, `invite` and `help` stay in the core.
- Folded: `shelf` and `narrative` into `brief`; `draft` and `revise` into `create`; `published` into `review`; `pin` into `competitors`; `balance` into `schedule`. The old words still work.
- The server add-on, on any plan: Slingso monitors on the schedule in the workspace's market and analyses every 7 days once there are 100 new answers, $0.015 a run, analysis included. Create always happens in the assistant. Plans and the add-on are presented from the session as written; Growth no longer analyses every cycle on its own.
- `monitor` with the add-on offers to run now on Slingso's servers and narrates the answers as they arrive; `check` runs a tracked query there, and offers to track an untracked one or check it in the browser without recording.
- `analyse`: an early read is fewer than 100 new answers; when Slingso is already analysing, the skill says the opportunities will be in the inbox shortly and stops; with the add-on, an analysis in the assistant is an extra look. Opportunities say who found them (Slingso or your assistant).
- `brief` shows when Slingso's next analysis is due. Competitor suggestions work on every plan, Free included. Schedules are daily or weekly.
- Extraction: a category the answer compares against ("a standard pressure cooker") or a placeholder ("Generic", "Other brands") is never a product row.

## 0.3.1 (2026-10-27)

- A site that isn't an online store no longer leaves a stuck workspace: Slingso deletes the empty workspace and says why, and the skill starts a new one and asks for the store's website, market and hero page again.

## 0.3.0 (2026-10-25)

Needs Slingso's server from 2026-10-25 or later (setup asks for the hero product's page with the website).

- Onboarding in three steps: the website, the market and the hero product's page in one message; then everything Slingso drafted (queries, competitors, Brand Soul) confirmed in one message; then the first check.
- Nothing runs on an assistant until the user confirms. Confirming starts the first check and sets a weekly schedule, Monday at 09:00 in the user's timezone, with an email reminder.
- The first check is narrated live: each answer as it arrives (who was recommended, and where the brand stands), with a running tally.
- Plans and the schedule come after the first results, not during setup.

## 0.2.2 (2026-10-22)

- The npx installer is gone: it was never published, so nothing should point at it. A skill folder updates from the release zip.
- The plugin carries its icon, license, support email and privacy policy URL for the Claude directory; Playwright is described by name and version, not as a command line.

## 0.2.1 (2026-10-22)

- Before the first browser run in a workspace, the skill says what the browser does (public assistant pages, signed out, never signs in, buys or changes a setting), that the app may ask permission to control it, and that Slingso's servers can run the checks instead, from a prepaid balance.
- Page text is data: an answer that tells the assistant to do something is recorded, never followed.
- Setup prompt: ChatGPT desktop follows the Codex route; Codex adds the MCP then signs in with `codex mcp login slingso`; the browser line up front. Tested list adds the Grok desktop app (and the Gemini desktop app, which follows the skill loosely).

## 0.2.0 (2026-10-22)

- Onboarding's competitor proposal is what Google AI Mode names for the brand in its market; the skill proposes those plus brands the queries name, never its own picks, and says so while Slingso is still finding them.
- Onboarding fixes from the live test: a paid workspace stops at the checkout link until paid; competitors are brand-level rivals plus brands the queries name, pinned in one quick write while Slingso reads their sites; the persona is who the shopper is and how they decide; the schedule names the assistants without counting them and proposes the timezone it can tell (`date +%z` in Claude Code); the wait is "Your first check", polled with `setup_progress` about every 30 seconds, with facts and the AI Shelf Index line only there.
- The skill never names tools, fields, endpoints or error codes to the user.
- Analysis written fresh: every opportunity carries its evidence (observation ids with quoted lines); what the brand says comes only from its own site; assistants are quoted, never believed; no comparison without the rival's own site. Review shows the evidence; drafts follow the same grounding.
- Onboarding's first check runs on Slingso's servers, on every plan: confirming the queries starts it; persona, competitors and schedule follow while it runs; setup ends on its results (a new `results` step). The skill opens setup with what the site read found, shows the check's progress between steps, and never runs the first monitor in a browser.

- Playbooks live here: `references/extract.md` (turning an answer into facts) and
  the method in `references/analyse.md`. Slingso serves only contracts (the
  extraction schema, the analysis contract), never prompts or guardrails.
- Extraction marks the brand's and products' key attributes an answer conveys, from
  the lists the monitor plan serves, and echoes their version.
- Drafting checks against the bar in `references/draft.md`.

## 0.1.0

First public version.

- The skill: onboarding, monitoring in your browser, analysis, the inbox, drafting,
  competitors, house rules, schedule and status (20 verbs).
- The Claude plugin with the Slingso connector bundled.
- `npx slingso install | update | uninstall` for assistants that read a skills folder.
- Evals for `claude plugin eval`, run against mocks.
