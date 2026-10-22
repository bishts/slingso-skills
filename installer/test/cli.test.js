import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { main, parseArgs } from "../src/cli.js";
import { bundledSkillDir, compareVersions, listFiles, readSkillMeta } from "../src/skill.js";

let home;
let out;
let err;
const io = () => ({ home, out: (l) => out.push(l), err: (l) => err.push(l) });
const skillTarget = () => path.join(home, ".claude", "skills", "slingso");

beforeEach(() => {
  home = fs.mkdtempSync(path.join(os.tmpdir(), "slingso-installer-"));
  out = [];
  err = [];
});
const tempSources = [];
afterEach(() => {
  fs.rmSync(home, { recursive: true, force: true });
  tempSources.splice(0).forEach((d) => fs.rmSync(d, { recursive: true, force: true }));
});

// Install a given version as the starting point, then clear the output.
async function preinstall(version) {
  await main(["install"], { ...io(), source: fakeSource(version) });
  out = [];
  err = [];
}

// A copy of the real skill with another version, to exercise update.
function fakeSource(version) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "slingso-src-"));
  tempSources.push(dir);
  fs.cpSync(bundledSkillDir(), dir, { recursive: true });
  const file = path.join(dir, "SKILL.md");
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/^(\s+version:\s*)"[^"]+"/m, `$1"${version}"`));
  return dir;
}

test("the bundled skill has a name and a version", () => {
  const meta = readSkillMeta(bundledSkillDir());
  assert.equal(meta.name, "slingso");
  assert.match(meta.version, /^\d+\.\d+\.\d+$/);
});

test("install --dry-run lists the files and writes nothing", async () => {
  const code = await main(["install", "--dry-run"], io());
  assert.equal(code, 0);
  assert.match(out[0], /^Would install Slingso .* \(\d+ files\):$/);
  assert.ok(out.some((l) => l.trim() === "SKILL.md"));
  assert.ok(out.some((l) => l.trim() === path.join("references", "monitor.md")));
  assert.equal(fs.existsSync(path.join(home, ".claude")), false);
});

test("install copies every file of the skill into ~/.claude/skills/slingso", async () => {
  const code = await main(["install"], io());
  assert.equal(code, 0);
  const source = bundledSkillDir();
  const files = listFiles(source);
  assert.deepEqual(listFiles(skillTarget()), files);
  for (const f of files) {
    assert.equal(fs.readFileSync(path.join(skillTarget(), f), "utf8"), fs.readFileSync(path.join(source, f), "utf8"));
  }
  assert.ok(out.some((l) => l.includes("claude mcp add --transport http slingso https://agents.slingso.com/mcp")));
  assert.deepEqual(fs.readdirSync(path.dirname(skillTarget())), ["slingso"], "no staging folder left behind");
});

test("installing the same version twice is a no-op", async () => {
  await main(["install"], io());
  out = [];
  const code = await main(["install"], io());
  assert.equal(code, 0);
  assert.match(out[0], /already installed/);
});

test("install over an older version points to update", async () => {
  await preinstall("0.0.9");
  const code = await main(["install"], io());
  assert.equal(code, 1);
  assert.match(err[0], /Run: npx slingso update/);
});

test("update replaces an older version", async () => {
  await preinstall("0.0.9");
  assert.equal(readSkillMeta(skillTarget()).version, "0.0.9");
  const code = await main(["update"], io());
  assert.equal(code, 0);
  assert.equal(readSkillMeta(skillTarget()).version, readSkillMeta(bundledSkillDir()).version);
  assert.match(out[0], /^Updated Slingso 0\.0\.9 to /);
});

test("update --dry-run leaves the old version in place", async () => {
  await preinstall("0.0.9");
  const code = await main(["update", "--dry-run"], io());
  assert.equal(code, 0);
  assert.match(out[0], /^Would install/);
  assert.equal(readSkillMeta(skillTarget()).version, "0.0.9");
});

test("update when current says so and writes nothing", async () => {
  await main(["install"], io());
  const before = fs.statSync(path.join(skillTarget(), "SKILL.md")).mtimeMs;
  out = [];
  const code = await main(["update"], io());
  assert.equal(code, 0);
  assert.match(out[0], /up to date/);
  assert.equal(fs.statSync(path.join(skillTarget(), "SKILL.md")).mtimeMs, before);
});

test("update refuses to downgrade a newer installed skill", async () => {
  await preinstall("9.0.0");
  const code = await main(["update"], io());
  assert.equal(code, 1);
  assert.match(err[0], /newer than this package/);
});

test("update without an install fails with the fix", async () => {
  const code = await main(["update"], io());
  assert.equal(code, 1);
  assert.match(err[0], /Run: npx slingso install/);
});

test("a foreign folder at the target is never overwritten without --force", async () => {
  fs.mkdirSync(skillTarget(), { recursive: true });
  fs.writeFileSync(path.join(skillTarget(), "notes.txt"), "mine");
  assert.equal(await main(["install"], io()), 1);
  assert.equal(await main(["uninstall"], io()), 0, "no SKILL.md: nothing to remove");
  assert.equal(fs.readFileSync(path.join(skillTarget(), "notes.txt"), "utf8"), "mine");
  assert.equal(await main(["install", "--force"], io()), 0);
  assert.equal(readSkillMeta(skillTarget()).name, "slingso");
});

test("uninstall removes the skill", async () => {
  await main(["install"], io());
  assert.equal(await main(["uninstall", "--dry-run"], io()), 0);
  assert.ok(fs.existsSync(skillTarget()));
  assert.equal(await main(["uninstall"], io()), 0);
  assert.equal(fs.existsSync(skillTarget()), false);
});

test("--dir installs into any harness's skills folder", async () => {
  const dir = path.join(home, "other-harness", "skills");
  const code = await main(["install", "--dir", dir], io());
  assert.equal(code, 0);
  assert.ok(fs.existsSync(path.join(dir, "slingso", "SKILL.md")));
  assert.equal(out.some((l) => l.includes("claude mcp add")), false, "Claude Code steps only for Claude Code");
});

test("usage errors exit 2 with the reason", async () => {
  assert.equal(await main([], io()), 2);
  assert.equal(await main(["frobnicate"], io()), 2);
  assert.match(err.join("\n"), /Unknown command "frobnicate"/);
  err = [];
  assert.equal(await main(["install", "--harness", "nope"], io()), 2);
  assert.match(err[0], /Unknown harness "nope".*--dir/);
  err = [];
  assert.equal(await main(["install", "--dir"], io()), 2);
  assert.match(err[0], /--dir needs a value/);
});

test("parseArgs reads flags in any order", () => {
  assert.deepEqual(parseArgs(["--dry-run", "update", "--harness", "claude-code"]), {
    command: "update", harness: "claude-code", dir: null, dryRun: true, force: false, help: false,
  });
});

test("compareVersions orders numerically", () => {
  assert.equal(compareVersions("0.10.0", "0.9.1"), 1);
  assert.equal(compareVersions("0.1.0", "0.1"), 0);
  assert.equal(compareVersions("1.0.0", "1.0.1"), -1);
});

test("version prints the bundled skill version", async () => {
  assert.equal(await main(["version"], io()), 0);
  assert.equal(out[0], readSkillMeta(bundledSkillDir()).version);
});
