#!/usr/bin/env bash
# Links the real skill into the browser-choice eval fixture before its run.
# The link isn't committed: the Claude plugin directory doesn't read symlinks.
#
#   scripts/link-eval-fixture.sh
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ln -sfn ../../skills "$root/eval-fixtures/browser-choice/skills"
echo "Linked eval-fixtures/browser-choice/skills -> ../../skills"
