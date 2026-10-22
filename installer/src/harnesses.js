import os from "node:os";
import path from "node:path";

// Where each harness reads personal skills. Only harnesses whose path is
// documented are listed; any other harness takes --dir <its skills folder>.
export const HARNESSES = {
  "claude-code": {
    label: "Claude Code",
    skillsDir: (home) => path.join(home, ".claude", "skills"),
    nextSteps: [
      "Easier: /plugin marketplace add bishts/slingso-skills brings all of this in one step.",
      "Connect Slingso:",
      "  claude mcp add --transport http slingso https://agents.slingso.com/mcp",
      "Add Playwright, the browser monitoring uses first (needs Node.js):",
      "  claude mcp add playwright -- npx -y @playwright/mcp@0.0.83 --isolated",
      "Then run /mcp in Claude Code, sign in to Slingso, and say: slingso init",
    ],
  },
};

export const DEFAULT_HARNESS = "claude-code";

export function skillsDirFor({ harness = DEFAULT_HARNESS, dir, home = os.homedir() }) {
  if (dir) return path.resolve(dir);
  const entry = HARNESSES[harness];
  if (!entry) {
    const known = Object.keys(HARNESSES).join(", ");
    throw new UsageError(`Unknown harness "${harness}". Known: ${known}. For another assistant, pass --dir <its skills folder>.`);
  }
  return entry.skillsDir(home);
}

export class UsageError extends Error {}
