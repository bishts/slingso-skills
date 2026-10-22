#!/usr/bin/env bash
# Builds the ChatGPT / Codex plugin ZIP for OpenAI's plugin directory
# (developers.openai.com/plugins/deploy/submission): the portable layout,
# with plugin.json and mcp.json at the root, the skill under skills/ and the
# icons under assets/. Output: dist/slingso-openai-plugin-<version>.zip
#
#   scripts/build-openai-plugin.sh            build
#   scripts/build-openai-plugin.sh --check    build, then list the zip
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(cd "$here/.." && pwd)"
src="$root/openai"
dist="$root/dist"

version="$(sed -n 's/^[[:space:]]*version:[[:space:]]*"\{0,1\}\([^"]*\)"\{0,1\}[[:space:]]*$/\1/p' "$root/skills/slingso/SKILL.md" | head -1)"
manifest_version="$(sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' "$src/plugin.json" | head -1)"
if [ "$manifest_version" != "$version" ]; then
  echo "Version mismatch: SKILL.md $version, openai/plugin.json $manifest_version" >&2
  exit 1
fi

stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT
cp "$src/plugin.json" "$src/mcp.json" "$stage/"
mkdir -p "$stage/skills" "$stage/assets"
cp -R "$root/skills/slingso" "$stage/skills/slingso"
cp "$src/assets/icon.png" "$stage/assets/icon.png"
cp "$src/assets/icon.png" "$stage/assets/logo.png"

mkdir -p "$dist"
out="$dist/slingso-openai-plugin-$version.zip"
rm -f "$out"
(cd "$stage" && zip -qr -X "$out" . -x '*.DS_Store')
echo "$out"

if [ "${1:-}" = "--check" ]; then
  unzip -l "$out"
fi
