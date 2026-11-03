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

- `skills/slingso/` is the one source: the core skill, with every command's full
  reference. Never copy it per assistant; add a manifest instead (`.claude-plugin/`,
  `openai/`).
- Every other folder in `skills/` is a command skill (`skills/monitor/` …): frontmatter
  `name` equal to the folder, a description that names Slingso and the command, and a
  thin body that points at the core skill and its reference, both as a relative link and
  as `skill://slingso/…` (the MCP server serves each folder as `skill://<name>/`, where a
  relative link across skills doesn't resolve). Never copy rules into them.
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

1. Bump `metadata.version` in `skills/slingso/SKILL.md` (and the "This skill is
   version" line), every command skill's `metadata.version`, `references/status.md`,
   `version` in `.claude-plugin/plugin.json` and `openai/plugin.json` together.
2. `scripts/build-zip.sh --check` (it refuses mismatched versions, a command skill
   whose name isn't its folder, and broken links in the core skill).
3. Run the evals: `claude plugin eval . --runs 1 --ablation none --no-publish`.
4. Update `CHANGELOG.md`, tag `vX.Y.Z`, attach the zip to the GitHub release.

The Slingso server serves one tagged release, so a tag reaches users when Slingso
deploys it.

## Keep in sync with Slingso and the MCP server

This repo, the Slingso app (Rails, the `/internal/mcp` API) and the MCP server
(`bishts/slingso-mcp`) ship as one product and must always match:

- A change to a tool's name, input or behaviour lands in all three in the same piece
  of work: Rails, the MCP server's tool schema and description, and every reference
  here that uses it (plus `evals/mocks/slingso/_tools.json`).
- When the skill changes, cut a release tag. The MCP server serves the skill from the
  tag named in its `config/skills_dir`, so a change reaches no one until the server
  points at the new tag.
- Deploy order: Rails, then the MCP server with its `skills_dir` moved to the new tag.
- A release that needs a newer server says so at the top of its changelog entry.

## Tests

- `claude plugin validate .`
- Evals: see [evals/README.md](evals/README.md).
