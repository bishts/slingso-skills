# Slingso tools

Every tool is on the Slingso MCP and takes `workspace` (the workspace code), except `get_session`. Names may carry a client prefix (`mcp__slingso__get_session`, `slingso:get_session`). If the server lists a slightly different name for the same job, use the server's name.

Responses are `{ data, message?, noop? }`. `noop: true` means it was already done; treat it as success. Errors are `{ error: { code, message } }`; the message says how to fix it.

## Session and workspace

| Tool | Use | Returns |
|---|---|---|
| `get_session` | first call of every session | `user` (with `utc_offset`, null until given), `default_workspace`, `workspaces[]` (code, name, role, plan, `setup_state`), `markets[]` (`code`, `label`), `plans[]` (`name`, `display_name`, `tagline`, `price_monthly_usd`, `checkout`, `for`, `includes`, and `price_per_run_usd` for server checks), `start_url`, `server_version`, `loader_min_version` |
| `set_default_workspace` | `switch` | the new default |
| `workspace_create` | no workspace yet: `geo?`; every workspace starts on Free | the workspace (code, name, role, plan, `setup_state`) |
| `workspace_choose_plan` | onboarding's plan step: `plan` (`diy_free`, `diy_paid` Starter, `diy_paid_autopilot` Growth; paid: owner only) | `setup_state`, plus `checkout_url` for Starter or Growth (setup carries on; the plan changes when the payment lands) |
| `workspace_get` | workspace detail | name, website, geo, plan, `server_loops`, `schedule` (`assistants`, `cadence`, `day`, `time`, `utc_offset`, `remind`, `server_checks`, `next_run_at`, `next_run_at_local`), `skill_version`, `brand_soul`, `brand_soul_pending`, `setup_state` |
| `workspace_update` | name, website (owner) | the workspace |
| `set_brand_soul` | replace Brand Soul (editor) | the Brand Soul |
| `set_schedule` | `assistants`, `cadence` (`daily`, `weekly`, `monthly`), `day` (weekday, or 1-28), `time` (`HH:MM`), `utc_offset` (`UTC+05:30`, saved on the user), `remind` (email the owner at that time; refused with server checks on), `server_checks` (Slingso's servers run the checks, from the prepaid balance, any plan; refused without a balance) | the workspace |
| `workspace_start_site` | start the Site read: `url`, `geo` (the market the user chose; required) | `setup_state`; then poll `workspace_get` until `setup_state.site.status` is `ready` or `failed` |
| `complete_setup_step` | mark one onboarding step done: `site`, `brand` (needs the hero product; drafts its queries), `product` (needs its queries; starts the first check), `plan`, `schedule`, `results` | `setup_state` |
| `setup_progress` | the wait while the first check runs, about every 30 seconds | `step`, `first_check` (`status`, `recorded`, `planned`, `progress`), `analysis` (`waiting`, `running`, `done`, `failed`), and while it runs `lead_in`, `fact` (`text`, `source`, `url`), `shelf_index` (`text`, `url`) |

`setup_state` carries `current`, `complete`, `steps[]`, `payment` (`status: pending`, `checkout_url`) while a paid plan's payment hasn't landed, `site` (`status`, `url`, `geo`, `error?`) and `proposal` (the Site read's drafts).

`plan` carries `name`, `display_name`, `autopilot`, `entity_resolution` (Starter and up), `brand_intelligence`, `assistants_catalogue`, `tracked_products_cap`.

Plan names: `diy_free` (Free), `diy_paid` (Starter), `diy_paid_autopilot` (Growth).

## Resources (batch create: `{ items: [...] }`, up to 25)

| Tool | Notes |
|---|---|
| `products_list`, `products_get`, `products_create` (`url`, `name?`), `products_update` (`status`: `active`, `inactive`) | Free tracks 1 product, Starter 10, Growth 20. `products_get` carries `competitor_intelligence` on Growth (`available`, `next_update_at`, `competitors[]` with price, sellers, rating) |
| `personas_list`, `personas_get`, `personas_create` (`name`, `description`), `personas_update` | context for analysis on every plan; on Growth Slingso asks the queries as them |
| `scenarios_history` (`scenario_id`, `days?`: 7, 14, 30, 90) | one query over time: `summary`, `per_engine`, `answers[]`, `top_competitors` |
| `scenarios_list`, `scenarios_get`, `scenarios_create` (`query`, `stage`, `product_id?`, `persona_id?`), `scenarios_update` (`status`) | `stage` is one of `awareness`, `research`, `comparison`, `validation`, `purchase`. One persona per query; without one it is asked as an anonymous shopper (`persona`). Queries never change: to edit one or ask it as another persona, deactivate it and create the new one |
| `competitors_list`, `competitors_pin` (`url`, `name?`, `product_id?`, `brand?`), `competitors_unpin` | pins, identified by `url` (the brand's site, or the product's page on any store); brand pin when `product_id` is empty (a product page then pins its brand). Each listed pin carries `intelligence` (latest snapshot or null) where the plan includes it. A pin returns at once: `pinned`, or `pending` while Slingso reads the site, then `pinned` or `refused` (with `refusal`, the reason) |
| `competitors_suggest` (`url?` or `name`, `product_id?`, `brand?`) | Starter and up only. Never on Free |
| `members_list`, `members_invite` (`email`, `role`) | invite is owner only, Starter and up |

## Monitor

| Tool | Use | Returns |
|---|---|---|
| `get_monitor_plan` | what is due | `runs_on` (`your_assistant` or `server`), `assistants`, `cadence`, `next_run_at`, `schema_version`, `key_attributes` (`version`, `brand[]`, `products{id: []}`), `items[]` (`scenario_id`, `product_id`, `stage`, `assistant`, `geo`, `query`) |
| `claim_work` | open or resume the run | `run_id`, `lease_token`, `resumed`, `lease_expires_at`, `done[]` (`scenario_id`, `assistant`) |
| `observations_create` | `{ lease_token, items }`, up to 25; each item echoes `key_attributes_version` | `accepted[]`, `rejected[]` with reasons, `lease_expires_at` |
| `complete_run` | `{ lease_token }`, after the last batch | the run (with `coverage`: `planned`, `recorded`, `partial`, `missing[]` when it closed short of the plan), observation count |
| `observations_list` | filters: `type`, `run_id`, `scenario_id`, `assistant`, `since`, `until`, `limit`, `include_answer` | observations |
| `observations_export` | `as`: `csv` or `json` | the export |

## Analyse

| Tool | Use | Returns |
|---|---|---|
| `get_analysis_window` | opens the analysis session; `page?` (default 1), `limit?` (per page, default 25, max 50) | `session_token`, `run_id`, `observation_count`, `page`, `pages`, `scenarios` (`{id: {query, stage}}`), `observations[]` (facts: `id`, `observed_at`, `data`), and on page 1 only `readings` (the window's numbers: `brand`, `products[]`, each with competitors), `contract` (what every opportunity and the Brand Memory write must meet) and `memory` (see below) |
| `memory_read` | memory without a session | the same `memory` block |
| `artifacts_create` | `{ session_token, items }` opportunities, each with `evidence` (`[{ observation_id, quote }]`) | per-item results |
| `memory_update` | `{ session_token, items }` | per-item results; HTTP 409 when Brand Memory is stale |
| `complete_analysis` | `{ session_token, summary? }` | the run, artifact count |

`memory` holds `brand_soul`, `brand_memory`, `brand_memory_lock_version` (0 before the first write), `beliefs`, `watchlist`, `feedback`, `outcomes`, `recurrence`, `channel_intel`, `recent_facts`, `brand_name`, `scenario_count`, `providers`, and `pending_evidence[]` (`at`, `section`, `line`).

`memory_update` actions: `update_brand_memory` (`body`, `lock_version`, `distilled_through?`), `add_belief` (`statement`, `evidence?`), `confirm_watchlist_item` (`id`, `statement`, `evidence?`), `expire_watchlist_item` (`id`, `reason?`), `propose_house_rule` (`rule`; waits for a person).

## House rules

| Tool | Use | Returns |
|---|---|---|
| `house_rules_list` | `status?`: `proposed`, `approved` | `[{ id, rule, status, given_on, added_by }]` |
| `house_rules_teach` | `rule`, one sentence (editor) | the rule, approved |
| `house_rules_decide` | `house_rule_id`, `decision`: `approve` or `dismiss` | the rule; `noop` when already decided |

## Inbox and threads

| Tool | Use |
|---|---|
| `get_briefing` | `needs_you[]` (mentions first), `new_opportunities[]`, `metrics`, `monitor` (due, overdue, last run with its `coverage`), `proposed_house_rules[]`, `competitor_intelligence` (with `next_update_at`), `recent_runs[]` (who ran what) |
| `get_performance_summary` | `days`, `product_id?`, `assistant?` → `shelf_share`, `purchase_likelihood`, `narrative_accuracy` (value, delta, trend), pinned `competitors` |
| `threads_list` | `needs_you[]`, `recent[]` with unread comments and mentions |
| `threads_get` | one thread: the opportunity and its messages, drafts included (type `draft`). `mark_read: false` to peek |
| `threads_comment` | `body`, `mentions?`, `kind?`: `comment` (default) or `draft` (the full draft; posting is the hand-off). An ambiguous mention comes back with `candidates` |
| `artifacts_list`, `artifacts_get` | filters: `artifact_type`, `status`, `dimension`, `roots`, `limit`. `artifacts_get` on an opportunity carries `evidence[]` (`observation_id`, `quote`, `assistant`, `query`) |
| `artifacts_get_brief` | what a draft for this opportunity needs: the opportunity with its `evidence`, `thread` (drafts so far are its `draft` messages), `brand_soul`, `products[]` (`name`, `url`, `key_attributes`), `grounding` (the rules), `feedback` |
| `artifacts_done` | `url?`, `note?`: the brand acted; with the URL it is published. A done one can add its URL later |
| `artifacts_dismiss` | `reason?`: the brand won't do it; the reason teaches Slingso |

Opportunity statuses: `open`, `done` (with `published_url` when it went live), `dismissed`.

`action_dimension` (required on every opportunity): `content`, `product` (you can draft these) · `reviews`, `editorial`, `community`, `creator`, `pr` (brand signals) · `price`, `distribution`, `promotion` (brand decisions).

## Served contracts (pinned per workspace)

| Resource | Tool form, if the client has no resource support |
|---|---|
| `extraction_schema` (fields, glossary, stage vocabulary, rules) | `get_extraction_schema` |
| `expertise` (the pin, the versions served, the contract versions) | `get_expertise` |

The analysis contract comes with `get_analysis_window` (page 1, `contract`). The playbooks for meeting them are in this skill: [extract.md](extract.md) and [analyse.md](analyse.md).

`workspace_set_skill_version` (`version`) moves the workspace's pin: onto a new release, or back to an earlier one after a bad release. Only when the user asks; pick from `get_expertise`'s versions.

## Billing

| Tool | Use |
|---|---|
| `get_balance` | owner only. `prepaid`, `balance_cents`, `price_per_run_usd`, `topup_suggestions_cents`, `topup_min_cents`, `topup_max_cents` |

Plan changes (upgrade, Starter ⇄ Growth, **Move to Free**), top-ups, card and invoices happen on the billing page; no tool changes a plan. Give the owner the link: https://www.slingso.com/workspace/<code>/billing. Move to Free keeps the paid plan until the end of the period, then the workspace is on Free; its data and prepaid balance stay, and server checks keep running from the balance.

## Error codes you will meet

| Code | Means | Do |
|---|---|---|
| 401 `unknown_user` | the Slingso MCP is not signed in | ask the user to reconnect Slingso |
| 403 | role or plan | say who can do it, or the plan that includes it, in one sentence |
| 404 `workspace_not_found` | not a member, or no such code | run `switch` |
| 409 | lease or session expired, invalid state, stale Brand Memory | see the verb's failure section |
| 410 `unknown_version` | the pinned expertise version is retired | tell the user; `status` shows the pin and how to move it |
| 422 | a row or field failed validation; the message names it | fix that item and resend only the failed items |
| 422 `batch_too_large` | more than 25 items | split the batch |
