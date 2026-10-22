# AGENTS.md

Instructions for coding agents (and people) changing this repo.

## What lives here

The Slingso skill, its playbooks and how it ships. Three layers: this repo is public
(the skill and the playbooks for the work the user's Claude does itself:
`references/extract.md`, `references/analyse.md`); the connector serves contracts and
data (the extraction schema, the analysis contract, the workspace's records and
numbers); Slingso's method (server prompts, guardrails, metric formulas, calibration)
never leaves Slingso and never comes here.

## Rules

- `skills/slingso/` is the one source. Never copy it per assistant; add a manifest or
  an installer entry instead.
- Tool names and arguments must match the server's `tools/list`
  (`evals/mocks/slingso/_tools.json` holds the current one).
- Never write a number the server computes (Shelf Share, Narrative Accuracy, Purchase
  Likelihood) into the skill, an example or an eval as something the skill works out.
- Never put a Slingso prompt, guardrail or formula in this repo, or a paraphrase of one.
  Playbooks are written fresh against the contracts and graded by the same parity
  cases as Slingso's own executors (`evals/cases/`).
- Copy is short: the smallest thing that lets the user act. Rules belong in the error
  that fires, not up front.

## Releasing

1. Bump `metadata.version` in `SKILL.md`, `version` in `.claude-plugin/plugin.json`
   and `installer/package.json` together.
2. `scripts/build-zip.sh --check` (it refuses mismatched versions).
3. Run the evals: `claude plugin eval . --runs 1 --ablation none --no-publish`.
4. Update `CHANGELOG.md`, tag `vX.Y.Z`, attach the zip to the GitHub release.

The Slingso server serves one tagged release, so a tag reaches users when Slingso
deploys it.

## Tests

- `cd installer && npm test`
- Evals: see [evals/README.md](evals/README.md).
