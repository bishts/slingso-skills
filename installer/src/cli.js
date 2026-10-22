import { DEFAULT_HARNESS, HARNESSES, UsageError, skillsDirFor } from "./harnesses.js";
import { install, uninstall, update } from "./install.js";
import { bundledSkillDir, readSkillMeta } from "./skill.js";

const USAGE = `Usage: slingso <command> [options]

Commands
  install      copy the Slingso skill into your favorite AI assistant's skills folder
  update       replace an installed skill with this version
  uninstall    remove the skill
  version      print this package's skill version

Options
  --harness <name>  which assistant: ${Object.keys(HARNESSES).join(", ")} (default ${DEFAULT_HARNESS})
  --dir <path>      install into this skills folder instead (any assistant)
  --dry-run         show what would change; write nothing
  --force           replace whatever is at the target
  -h, --help        this help`;

export function parseArgs(argv) {
  const opts = { command: null, harness: DEFAULT_HARNESS, dir: null, dryRun: false, force: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--dry-run": opts.dryRun = true; break;
      case "--force": opts.force = true; break;
      case "-h": case "--help": opts.help = true; break;
      case "--harness": case "--dir": {
        const value = argv[++i];
        if (!value || value.startsWith("--")) throw new UsageError(`${arg} needs a value.`);
        opts[arg.slice(2)] = value;
        break;
      }
      default:
        if (arg.startsWith("-")) throw new UsageError(`Unknown option ${arg}.`);
        if (opts.command) throw new UsageError(`One command at a time (got "${opts.command}" and "${arg}").`);
        opts.command = arg;
    }
  }
  return opts;
}

export async function main(argv, { home, out = console.log, err = console.error, source } = {}) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (e) {
    if (!(e instanceof UsageError)) throw e;
    err(e.message);
    err(USAGE);
    return 2;
  }
  if (opts.help || !opts.command) {
    out(USAGE);
    return opts.help ? 0 : 2;
  }

  try {
    if (opts.command === "version") {
      out(readSkillMeta(source ?? bundledSkillDir()).version);
      return 0;
    }
    const actions = { install, update, uninstall };
    const action = actions[opts.command];
    if (!action) throw new UsageError(`Unknown command "${opts.command}".`);

    const skillsDir = skillsDirFor({ harness: opts.harness, dir: opts.dir, home });
    const result = action({ skillsDir, dryRun: opts.dryRun, force: opts.force, ...(source ? { source } : {}) });
    result.lines.forEach((l) => (result.code === 0 ? out : err)(l));

    const steps = HARNESSES[opts.harness]?.nextSteps;
    if (result.code === 0 && opts.command === "install" && !opts.dryRun && !opts.dir && steps) {
      out("");
      steps.forEach((l) => out(l));
    }
    return result.code;
  } catch (e) {
    if (e instanceof UsageError) {
      err(e.message);
      return 2;
    }
    err(e.message);
    return 1;
  }
}
