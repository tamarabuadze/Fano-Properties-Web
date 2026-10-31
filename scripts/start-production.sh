#!/bin/sh
# Railway start: update the database first, then start the site.
# prisma db push refuses changes that would lose data, and a failure here
# stops the deploy before the new code goes live.
set -e

export DIRECT_URL="${DIRECT_URL:-$DATABASE_URL}"

pnpm --filter @fano/db exec prisma db push --skip-generate
exec pnpm --filter @fano/web start
