import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SKILL_NAME = "slingso";

const here = path.dirname(fileURLToPath(import.meta.url));

// The skill ships inside the npm package as skill/ (bundled at pack time);
// in the repo it is read straight from skills/slingso.
export function bundledSkillDir() {
  const candidates = [path.join(here, "..", "skill"), path.join(here, "..", "..", "skills", SKILL_NAME)];
  const found = candidates.find((d) => fs.existsSync(path.join(d, "SKILL.md")));
  if (!found) throw new Error("The Slingso skill is missing from this package. Reinstall it: npx slingso@latest install");
  return found;
}

// Reads `name` and `metadata.version` from SKILL.md frontmatter. Enough YAML
// for our own file: top-level `name:` and an indented `version:`.
export function readSkillMeta(skillDir) {
  const file = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { name: null, version: null };
  const front = match[1];
  const name = front.match(/^name:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim() ?? null;
  const version = front.match(/^\s+version:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim() ?? null;
  return { name, version };
}

export function listFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === ".DS_Store") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, base));
    else if (entry.isFile()) out.push(path.relative(base, full));
  }
  return out;
}

// -1, 0, 1 for dotted numeric versions ("0.10.0" > "0.9.1").
export function compareVersions(a, b) {
  const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
  const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  return 0;
}
