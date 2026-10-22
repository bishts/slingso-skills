// prepack: copies ../skills/slingso into ./skill so the published package
// carries the skill. Never run by the CLI itself.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(here, "..", "..", "skills", "slingso");
const target = path.join(here, "..", "skill");

if (!fs.existsSync(path.join(source, "SKILL.md"))) {
  console.error(`No skill at ${source}`);
  process.exit(1);
}
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true, filter: (p) => !p.endsWith(".DS_Store") });
console.log(`Bundled ${source} -> ${target}`);
