#!/usr/bin/env bash
# Vercel skips the build on exit 0. Build if there is no reliable comparison.
set -u

previous_sha=${VERCEL_GIT_PREVIOUS_SHA:-}
current_sha=${VERCEL_GIT_COMMIT_SHA:-HEAD}

if [ -z "$previous_sha" ] || ! git cat-file -e "${previous_sha}^{commit}" 2>/dev/null || ! git cat-file -e "${current_sha}^{commit}" 2>/dev/null; then
  exit 1
fi

git diff --quiet "$previous_sha" "$current_sha" -- .
