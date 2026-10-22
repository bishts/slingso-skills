# Changelog

Versions match `metadata.version` in `skills/slingso/SKILL.md`, the plugin's `version`
and the release tag.

## Unreleased

- Onboarding's competitor proposal is what Google AI Mode names for the brand in its market; the skill proposes those plus brands the queries name, never its own picks, and says so while Slingso is still finding them.
- Onboarding fixes from the live test: a paid workspace stops at the checkout link until paid; competitors are brand-level rivals plus brands the queries name, pinned in one quick write while Slingso reads their sites; the persona is who the shopper is and how they decide; the schedule names the assistants without counting them and proposes the timezone it can tell (`date +%z` in Claude Code); the wait is "Your first check", polled with `setup_progress` about every 30 seconds, with facts and the AI Shelf Index line only there.
- The skill never names tools, fields, endpoints or error codes to the user.
- Analysis written fresh: every opportunity carries its evidence (observation ids with quoted lines); what the brand says comes only from its own site; assistants are quoted, never believed; no comparison without the rival's own site. Review shows the evidence; drafts follow the same grounding.
- Onboarding's first check runs on Slingso's servers, on every plan: confirming the queries starts it; persona, competitors and schedule follow while it runs; setup ends on its results (a new `results` step). The skill opens setup with what the site read found, shows the check's progress between steps, and never runs the first monitor in a browser.

## 0.2.0 (unreleased)

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
