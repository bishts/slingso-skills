#!/usr/bin/env bash
# Builds the claude.ai fallback: a zip of the skill folder, for
# Settings > Customize > Skills > Upload (the zip holds the folder itself,
# with SKILL.md inside it). Output: dist/slingso-skill-<version>.zip, plus
# dist/slingso-skill.zip, the GitHub Release asset the setup prompt links
# (releases/latest/download/slingso-skill.zip).
#
#   scripts/build-zip.sh            build
#   scripts/build-zip.sh --check    build, then list the zip and verify it
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(cd "$here/.." && pwd)"
skill_dir="$root/skills/slingso"
dist="$root/dist"

[ -f "$skill_dir/SKILL.md" ] || { echo "No SKILL.md at $skill_dir" >&2; exit 1; }

# The frontmatter name must match the folder name (Agent Skills spec).
name="$(sed -n 's/^name:[[:space:]]*//p' "$skill_dir/SKILL.md" | head -1)"
[ "$name" = "slingso" ] || { echo "SKILL.md name is '$name', expected 'slingso'" >&2; exit 1; }

version="$(sed -n 's/^[[:space:]]*version:[[:space:]]*"\{0,1\}\([^"]*\)"\{0,1\}[[:space:]]*$/\1/p' "$skill_dir/SKILL.md" | head -1)"
[ -n "$version" ] || { echo "No metadata version in SKILL.md" >&2; exit 1; }

plugin_version="$(sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' "$root/.claude-plugin/plugin.json" | head -1)"
if [ "$plugin_version" != "$version" ]; then
  echo "Version mismatch: SKILL.md $version, plugin.json $plugin_version" >&2
  exit 1
fi

mkdir -p "$dist"
out="$dist/slingso-skill-$version.zip"
rm -f "$out"
(cd "$root/skills" && zip -qr -X "$out" slingso -x '*.DS_Store')
cp "$out" "$dist/slingso-skill.zip"
echo "$out"
echo "$dist/slingso-skill.zip"

if [ "${1:-}" = "--check" ]; then
  unzip -l "$out"
  unzip -Z1 "$out" | grep -qx 'slingso/SKILL.md' || { echo "zip is missing slingso/SKILL.md" >&2; exit 1; }
  refs="$(unzip -Z1 "$out" | grep -c '^slingso/references/.*\.md$')"
  echo "references: $refs"
fi
