import fs from "node:fs";
import path from "node:path";
import { SKILL_NAME, bundledSkillDir, compareVersions, listFiles, readSkillMeta } from "./skill.js";

// Plans and applies install / update / uninstall. Every action returns
// { code, lines }; nothing is written when dryRun is set.

export function install({ skillsDir, dryRun = false, force = false, source = bundledSkillDir() }) {
  const target = path.join(skillsDir, SKILL_NAME);
  const bundled = readSkillMeta(source);
  const installed = readSkillMeta(target);

  if (installed && !force) {
    if (installed.name !== SKILL_NAME) return refuseForeign(target);
    const cmp = compareVersions(installed.version, bundled.version);
    if (cmp === 0) return { code: 0, lines: [`Slingso ${installed.version} is already installed at ${target}.`] };
    return {
      code: 1,
      lines: [`Slingso ${installed.version} is installed at ${target}. Run: npx slingso update`],
    };
  }
  if (!installed && fs.existsSync(target) && !force) return refuseForeign(target);

  return copySkill({ source, target, dryRun, version: bundled.version,
                    done: `${installed ? "Reinstalled" : "Installed"} Slingso ${bundled.version} at ${target}` });
}

export function update({ skillsDir, dryRun = false, force = false, source = bundledSkillDir() }) {
  const target = path.join(skillsDir, SKILL_NAME);
  const bundled = readSkillMeta(source);
  const installed = readSkillMeta(target);

  if (!installed) return { code: 1, lines: [`Slingso isn't installed at ${target}. Run: npx slingso install`] };
  if (installed.name !== SKILL_NAME) return refuseForeign(target);

  const cmp = compareVersions(installed.version, bundled.version);
  if (cmp === 0 && !force) return { code: 0, lines: [`Slingso ${installed.version} is up to date.`] };
  if (cmp > 0 && !force) {
    return {
      code: 1,
      lines: [`The installed skill (${installed.version}) is newer than this package (${bundled.version}). Run: npx slingso@latest update`],
    };
  }
  return copySkill({ source, target, dryRun, version: bundled.version,
                    done: `Updated Slingso ${installed.version} to ${bundled.version} at ${target}` });
}

export function uninstall({ skillsDir, dryRun = false }) {
  const target = path.join(skillsDir, SKILL_NAME);
  const installed = readSkillMeta(target);
  if (!installed) return { code: 0, lines: [`Slingso isn't installed at ${target}. Nothing to remove.`] };
  if (installed.name !== SKILL_NAME) return refuseForeign(target);
  if (dryRun) return { code: 0, lines: [`Would remove ${target}`] };
  fs.rmSync(target, { recursive: true, force: true });
  return { code: 0, lines: [`Removed ${target}`] };
}

function copySkill({ source, target, dryRun, version, done }) {
  const files = listFiles(source);
  if (dryRun) {
    return {
      code: 0,
      lines: [`Would install Slingso ${version} to ${target} (${files.length} files):`, ...files.map((f) => `  ${f}`)],
    };
  }
  // Copy into a sibling temp folder, then swap it in, so a failed copy never
  // leaves a half-written skill behind.
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const staging = `${target}.tmp-${process.pid}-${Date.now()}`;
  try {
    for (const rel of files) {
      const dest = path.join(staging, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(path.join(source, rel), dest);
    }
    fs.rmSync(target, { recursive: true, force: true });
    fs.renameSync(staging, target);
  } catch (err) {
    fs.rmSync(staging, { recursive: true, force: true });
    throw err;
  }
  return { code: 0, lines: [done] };
}

function refuseForeign(target) {
  return {
    code: 1,
    lines: [`${target} exists but isn't the Slingso skill. Move it aside, or pass --force to replace it.`],
  };
}
