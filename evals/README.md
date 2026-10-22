# Slingso skill evals

Cases for `claude plugin eval` (Claude Code 2.1.269+), in its directory format: one folder per case with `prompt.md` (frontmatter + the user's message) and `graders/*.md`. The Slingso connector is mocked under `mocks/slingso/` (the server name in `../.mcp.json`), so no case calls the real server.

Format reference: https://code.claude.com/docs/en/plugin-evals

## Run

From the repo root:

```bash
# smoke pass: every case once, no baseline arm
claude plugin eval . --runs 1 --ablation none --no-publish -j 4

# the real measurement: 3 runs per case, with and without the plugin
claude plugin eval . --no-publish -j 4

# one case
claude plugin eval . --case analyse-stale-memory --runs 1 --ablation none
```

Add `--trust-plugin` in CI. Results land in `evals/results/` (ignored by git). A full smoke pass costs about $2.

## Cases

| Case | What it holds the skill to |
|---|---|
| `onboarding-no-workspace` | `get_session` first; the short overview once ("does the thinking"); `workspace_create` with no plan; then one question, the website and the market together; no plan question yet; never "credits" |
| `onboarding-site-and-market-one-message` | `slingso init` at the Site step asks for the website and the market together in one message, listing the served markets, no guess; no site read before the answer |
| `onboarding-market-given` | a named market goes to `workspace_start_site` as `geo`, and the one line about a browser run showing its location's answers |
| `onboarding-brand-in-one` | resumes at the brand step ("2 of 6"): what the site read found, then Brand Soul, the five brand queries and the proposed competitors in one message, one question that "yes" answers and that asks for the hero's page; nothing written before it |
| `onboarding-brand-competitors` | brand step: brand-level rivals from the proposal (with Google's websites) plus the brand a proposed query names; a retailer is never proposed; no website from memory; nothing pinned or completed before "yes" |
| `onboarding-product-unbranded-queries` | product step after Slingso couldn't draft the hero's queries: the skill drafts five, one per stage; awareness and research queries never name the brand or its products; nothing written yet |
| `onboarding-edit-a-query` | editability at the product step: number 3 of the hero's drafted queries replaced, the kept four and the new one created with a stage and the hero's `product_id`, the old wording never written, Brand Soul left alone, `product` completed after the write, then the plan step with one question |
| `onboarding-plan-choice` | plan step, the user picks Starter: `workspace_choose_plan` with `diy_paid`, the monthly fee stated with the Stripe link, nothing charged here, then the schedule step with one question |
| `onboarding-schedule-default` | the schedule step (while the first check runs on the server): the user picks, first which assistants (ChatGPT, Google AI Mode, Google AI Overviews, Gemini), listed by name as a choice, never counted, never one yes/no on the whole schedule; no facts between steps; one question; nothing set yet |
| `onboarding-schedule-timezone` | assistants already named, timezone unknown: in Claude Code the skill reads `date +%z` and folds the offset into the when question (weekly, Monday 09:00 suggested) (run with `--allow-tools Bash`) |
| `onboarding-ends-on-results` | the last step: the first check ran on Slingso's servers; the skill presents its numbers and opportunities, completes `results`, never claims a browser run |
| `help-lists-verbs` | `/slingso help` lists the verbs grouped, one line on what the plan walls off, calls nothing but `get_session` |
| `free-never-suggests` | Free never calls `competitors_suggest` and never pins names the user didn't give; the one-line wall |
| `stale-skill-version` | `loader_min_version` newer than the skill: stop, say how to update, no briefing |
| `check-unframed` | no browser: the paste route, the query exactly as written, nothing recorded, no invented answers |
| `extraction-brand-ranked` | extraction against the served schema: rows in answer order, top pick, ours, claims on the right row, citations, the full answer, no scores; `claim_work` before the batch, `complete_run` once, after it |
| `extraction-brand-absent` | an answer with no products records an empty shelf; nothing invented |
| `analyse-opportunities` | opportunities carry `action_dimension` and their `evidence` (observation ids with quoted lines), respect the rejection feedback in memory, use the server's numbers; Brand Memory written with the read `lock_version` and `distilled_through`; the session closed last |
| `analyse-grounded-dose` | grounding: a dose only an assistant stated is a finding, never a pitch; assistants quoted as assistants; no comparison without the rival's site; evidence on every opportunity |
| `analyse-stale-memory` | a 409 on Brand Memory → `memory_read`, merge (keep the other session's line and this session's learning), retry once with the new `lock_version`, still close the session |

## Fixtures

- `mocks/slingso/_tools.json`: the Slingso server's real `tools/list` response (names, descriptions, input schemas, annotations; 58 tools). Refresh it when the server's tools change, then copy the suite mocks into `eval-fixtures/browser-choice/` (its README has the command).
- Every plan's assistant catalogue is `chatgpt`, `google_ai_mode`, `google_aio`, `gemini_web`; onboarding's steps are `site`, `brand`, `product`, `plan`, `schedule`, `results`.
- `cases/extraction/*.yml`, `cases/analysis/`: the parity cases Slingso grades its own extractor and analysis on; the `extraction-*` and `analyse-*` cases use their answers and window verbatim. Brand domains use `.example`.
- `mocks/slingso/fixtures/extraction_schema.json`: a stand-in for the extraction schema. It keeps the field names and shapes the skill's playbook uses; the glossary, stage vocabulary and rules are placeholders. The real schema is served by `get_extraction_schema` at runtime.
- `mocks/slingso/fixtures/analysis_window.json`: the window. Its `contract` is a stand-in: the version, required fields, `action_dimension` values and evidence shape are real; the rules are placeholders. The real contract comes with `get_analysis_window` at runtime.
- No prompts or guardrails: Slingso never serves them. The skill's own playbooks (`references/extract.md`, `references/analyse.md`) are what the cases test.
- Case `mocks/` folders override the suite's mocks file by file. Never leave an empty `mocks/slingso/` folder in a case: it turns off every suite mock for that case.

## Writing graders

- Prefer `tool_used`, `tool_order` and `regex` graders. MCP tools are named `mcp__plugin_slingso_slingso__<tool>`.
- `target: mock_calls` includes the mocks' answers too (the extraction schema lists the refused score fields), so assert on a tool's input with `tool_used` + `input_match` instead.
- Keep `llm` graders short and about one thing. With a large mocked window the default judge is noisy; `--judge-model sonnet` is steadier.
- `type: agent` mocks (`artifacts_create`, the stale `memory_update`) answer per call. Their answers are saved under `results/<run>/mock-recordings/`; copy them into the case's `mocks/.replay/slingso/` to make CI runs repeatable.

## Browser choice (a fixture plugin)

Mocks only stand in for servers the plugin declares, and a user's own MCP servers never load in a run. `eval-fixtures/browser-choice/` is the same skill with Playwright and Claude in Chrome declared (never started, every tool mocked), for one case: the user asks for Playwright, and the skill must not touch Claude in Chrome.

```bash
claude plugin eval eval-fixtures/browser-choice --runs 1 --ablation none --no-publish --trust-plugin
```
